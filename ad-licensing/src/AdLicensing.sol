//SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IAdLicense} from "./interfaces/IAdLicense.sol";

contract AdLicensing is IAdLicense, Ownable {
    // ===================================================
    // State Variables
    // ===================================================
    mapping(address => address) private conversionManagerWallet;
    mapping(uint256 _adId => address _vendor) private adVendor;
    mapping(uint256 _adId => address _creator) private adCreator;
    mapping(uint256 _adId => AdStatus _adStatus) private adStatus;
    mapping(uint256 _adId => ConversionInfo[] _conversionInfo)
        private adConversionInfo;
    mapping(address _vendor => uint256[] _adIds) private vendorAdIds;

    uint256 public totalAds;
    address public immutable usdc;
    // ===================================================
    // Constants
    // ===================================================
    uint256 private constant BASIS_POINTS = 100_000; // 100%
    // ===================================================
    // Modifiers
    // ===================================================
    modifier onlyCreator(uint256 _adId) {
        if (adCreator[_adId] != msg.sender) {
            revert AdLicensing__NotCreator();
        }
        _;
    }

    modifier onlyVendor(uint256 _adId) {
        if (adVendor[_adId] != msg.sender) {
            revert AdLicensing__NotVendor();
        }
        _;
    }

    modifier onlyConversionManager() {
        if (conversionManagerWallet[msg.sender] != msg.sender) {
            revert AdLicensing__NotConversionManager();
        }
        _;
    }

    // ===================================================
    // Constructor
    // ===================================================
    constructor(address _usdc) Ownable(msg.sender) {
        usdc = _usdc;
    }

    // ===================================================
    // ===================================================
    // External/Public Functions
    // ===================================================
    // ===================================================
    // ===================================================
    // Management Functions
    // ===================================================
    function convert(
        uint256 id,
        ConversionInfo memory conversionInfo
    ) external onlyConversionManager {
        AdStatus storage currentAd = adStatus[id];
        if (currentAd.terms == AdTerms.REVSHARE) {
            conversionInfo.paymentSuccessful = safeTransferFrom(
                usdc,
                getVendor(id),
                getCreator(id),
                conversionInfo.creatorRevenue
            );
        }
        adConversionInfo[id].push(conversionInfo);
        emit Conversion(id, conversionInfo);
    }

    // ===================================================
    // Creator Functions
    // ===================================================
    function createAd(
        address _vendor,
        bytes32 _adHash,
        uint priceOrRevShare,
        uint duration,
        AdTerms _adTerms
    ) external returns (uint256 _adId) {
        totalAds++;
        _adId = totalAds;
        adVendor[_adId] = _vendor;
        adCreator[_adId] = msg.sender;
        if (_adTerms == AdTerms.SINGLE_PAYMENT_DURATION && duration < 15 days) {
            revert AdLicensing__InvalidDuration();
        }
        adStatus[_adId] = AdStatus({
            lastVendorEdit: block.timestamp,
            lastCreatorEdit: block.timestamp,
            approvedTime: 0,
            paymentTime: 0,
            priceOrRevShare: priceOrRevShare,
            duration: duration,
            terms: _adTerms,
            adHash: _adHash,
            vendorStatus: VendorStatus.PENDING,
            creatorStatus: CreatorStatus.NEW
        });
        vendorAdIds[_vendor].push(_adId);
        emit AdCreated(_adId, _vendor);
    }

    function updateAd(
        uint256 _id,
        AdStatus calldata _adInfo
    ) external onlyCreator(_id) {
        AdStatus storage currentAd = adStatus[_id];
        currentAd.lastCreatorEdit = block.timestamp;
        CreatorStatus currentStatus = getCurrentAdStatus(_id);
        if (currentStatus == CreatorStatus.ACTIVE) {
            revert AdLicensing__AdIsActive();
        }
        currentAd.terms = _adInfo.terms;
        currentAd.duration = _adInfo.duration;
        currentAd.priceOrRevShare = _adInfo.priceOrRevShare;
        currentAd.creatorStatus = CreatorStatus.NEW;
        emit CreatorAdStatusChanged(_id, currentStatus, CreatorStatus.NEW);
    }

    // ===================================================
    // Vendor Functions
    // ===================================================
    function updateVendorAdStatus(
        uint256 _id,
        VendorStatus _newStatus
    ) external onlyVendor(_id) {
        if (_newStatus == VendorStatus.PENDING) {
            revert AdLicensing__InvalidVendorStatus();
        }
        AdStatus storage currentAd = adStatus[_id];
        if (currentAd.vendorStatus == _newStatus) {
            revert AdLicensing__AdStatusAlreadySet();
        }
        currentAd.vendorStatus = _newStatus;
        emit VendorAdStatusChanged(_id, currentAd.vendorStatus, _newStatus);
    }

    function getLicense(uint256 _id) external onlyVendor(_id) {
        AdStatus storage currentAd = adStatus[_id];
        if (currentAd.vendorStatus != VendorStatus.APPROVED) {
            revert AdLicensing__AdNotApproved();
        }
        CreatorStatus currentStatus = getCurrentAdStatus(_id);
        if (currentStatus != CreatorStatus.BLOCKED) {
            revert AdLicensing__AdBlockedByCreator();
        }
        currentAd.creatorStatus = CreatorStatus.ACTIVE;
        currentAd.paymentTime = block.timestamp;
        if (currentAd.terms == AdTerms.SINGLE_PAYMENT_DURATION) {
            safeTransferFrom(
                usdc,
                msg.sender,
                getCreator(_id),
                currentAd.priceOrRevShare
            );
        }
        emit VendorAdStatusChanged(
            _id,
            currentAd.vendorStatus,
            VendorStatus.APPROVED
        );
        emit AdLicensed(_id, msg.sender, getCreator(_id));
    }

    function approveAdAndGetLicense(uint256 _id) external onlyVendor(_id) {
        AdStatus storage currentAd = adStatus[_id];
        if (currentAd.vendorStatus == VendorStatus.APPROVED) {
            revert AdLicensing__AdAlreadyApproved();
        }
        CreatorStatus currentStatus = getCurrentAdStatus(_id);
        if (currentStatus != CreatorStatus.BLOCKED) {
            revert AdLicensing__AdBlockedByCreator();
        }
        emit VendorAdStatusChanged(
            _id,
            currentAd.vendorStatus,
            VendorStatus.APPROVED
        );
        currentAd.vendorStatus = VendorStatus.APPROVED;
        currentAd.approvedTime = block.timestamp;
        currentAd.creatorStatus = CreatorStatus.ACTIVE;
        if (currentAd.terms == AdTerms.SINGLE_PAYMENT_DURATION) {
            safeTransferFrom(
                usdc,
                msg.sender,
                getCreator(_id),
                currentAd.priceOrRevShare
            );
        }
        emit AdLicensed(_id, msg.sender, getCreator(_id));
    }

    // ===================================================
    // ===================================================
    // Private/Internal Functions
    // ===================================================
    // ===================================================
    function safeTransferFrom(
        address token,
        address from,
        address to,
        uint value
    ) internal returns (bool) {
        // bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));
        (bool success, bytes memory data) = token.call(
            abi.encodeWithSelector(0x23b872dd, from, to, value)
        );
        return success && (data.length == 0 || abi.decode(data, (bool)));
    }

    function safeTransfer(address token, address to, uint value) internal {
        // bytes4(keccak256(bytes('transfer(address,uint256)')));
        (bool success, bytes memory data) = token.call(
            abi.encodeWithSelector(0xa9059cbb, to, value)
        );
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            "TransferHelper: TRANSFER_FAILED"
        );
    }

    function safeApprove(address token, address to, uint value) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(
            abi.encodeWithSelector(0x095ea7b3, to, value)
        );
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            "TransferHelper: APPROVE_FAILED"
        );
    }

    // ===================================================
    // ===================================================
    // External/Public VIEW PURE Functions
    // ===================================================
    // ===================================================
    function getVendor(uint256 _id) public view returns (address) {
        return adVendor[_id];
    }

    function getCreator(uint256 _id) public view returns (address) {
        return adCreator[_id];
    }

    function getAllVendorAds(
        address _vendor
    )
        external
        view
        returns (uint256[] memory allIds, AdStatus[] memory idStatuses)
    {
        uint adLength = vendorAdIds[_vendor].length;
        allIds = new uint256[](adLength);
        idStatuses = new AdStatus[](adLength);
        for (uint256 i = 0; i < adLength; i++) {
            allIds[i] = vendorAdIds[_vendor][i];
            idStatuses[i] = adStatus[allIds[i]];
            idStatuses[i].creatorStatus = getCurrentAdStatus(allIds[i]);
        }
    }

    function getAllConversionsForAd(
        uint256 _id
    ) external view returns (ConversionInfo[] memory) {
        return adConversionInfo[_id];
    }

    function getAdStatus(uint256 _id) external view returns (CreatorStatus) {
        return getCurrentAdStatus(_id);
    }

    // ===================================================
    // ===================================================
    // Private/Internal VIEW PURE Functions
    // ===================================================
    // ===================================================
    function getCurrentAdStatus(
        uint256 _id
    ) internal view returns (CreatorStatus) {
        AdStatus storage currentAd = adStatus[_id];
        if (
            currentAd.creatorStatus == CreatorStatus.ACTIVE &&
            currentAd.paymentTime > 0 &&
            currentAd.paymentTime + currentAd.duration < block.timestamp
        ) {
            return CreatorStatus.EXPIRED;
        }
        return currentAd.creatorStatus;
    }
}
