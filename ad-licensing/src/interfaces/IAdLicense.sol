// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IAdLicense {
    enum CreatorStatus {
        NEW,
        ACTIVE,
        INACTIVE,
        BLOCKED,
        EXPIRED
    }
    enum VendorStatus {
        PENDING,
        APPROVED,
        REJECTED,
        REVIEW_TERMS
    }
    enum AdTerms {
        REVSHARE,
        SINGLE_PAYMENT_DURATION
    }
    struct AdStatus {
        uint256 lastVendorEdit;
        uint256 lastCreatorEdit;
        uint256 approvedTime;
        uint256 paymentTime;
        uint256 priceOrRevShare; // price in USDC or revshare in basis_points
        uint256 duration; // only used for SINGLE_PAYMENT_DURATION
        AdTerms terms;
        VendorStatus vendorStatus;
        CreatorStatus creatorStatus;
    }

    struct ConversionInfo {
        bytes32 conversionHash;
        uint256 timeOfConversion;
        uint256 creatorRevenue;
        bool reviewed;
    }

    // ===================================================
    // Events
    // ===================================================
    event AdCreated(uint256 indexed id, address indexed vendor);
    event CreatorAdStatusChanged(
        uint256 indexed id,
        CreatorStatus prev_status,
        CreatorStatus new_status
    );
    event VendorAdStatusChanged(
        uint256 indexed id,
        VendorStatus prev_status,
        VendorStatus new_status
    );
    event Conversion(uint256 indexed id, ConversionInfo info);

    // ===================================================
    // Management Functions
    // ===================================================

    /**
     * @notice Adds the conversion info of the ad
     * @param _id The ID of the ad
     * @param _conversionInfo The conversion info
     */
    function convert(
        uint256 _id,
        ConversionInfo calldata _conversionInfo
    ) external;

    /**
     * @param _id The ID of the ad
     * @return The ID of the vendor
     */
    function getVendorId(uint256 _id) external view returns (uint256);

    /**
     * @param _id The ID of the ad
     * @return The ID of the creator
     */
    function getCreatorId(uint256 _id) external view returns (uint256);

    // ===================================================
    // Creator Functions
    // ===================================================
    /**
     * @param _id The ID of the ad
     */
    function adCreated(
        uint256 _id,
        address _vendor,
        AdStatus calldata _status
    ) external;

    function updateAd(uint256 _id, AdStatus calldata _adInfo) external;

    // ===================================================
    // Vendor Functions
    // ===================================================
    function updateVendorAdStatus(
        uint256 _id,
        VendorStatus _newStatus
    ) external;

    function getLicense(uint256 _id) external;

    function approveAdAndGetLicense(uint256 _id) external;
}