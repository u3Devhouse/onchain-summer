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
        bytes32 adHash;
        AdTerms terms;
        VendorStatus vendorStatus;
        CreatorStatus creatorStatus;
    }

    struct ConversionInfo {
        bytes32 conversionHash;
        uint256 timeOfConversion;
        uint256 creatorRevenue;
        bool paymentSuccessful;
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
    event AdLicensed(
        uint256 indexed id,
        address indexed vendor,
        address indexed creator
    );

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
    function getVendor(uint256 _id) external view returns (address);

    /**
     * @param _id The ID of the ad
     * @return The ID of the creator
     */
    function getCreator(uint256 _id) external view returns (address);

    // ===================================================
    // Creator Functions
    // ===================================================
    /**
     * @param _vendor The address of the vendor
     * @param _adHash The hash of the ad to tie in with the database
     * @param priceOrRevShare The price in USDC wei or revshare in basis_points
     * @param duration The duration of the ad in seconds
     * @param _adTerms The terms of the ad
     * @return _adId The ID of the ad
     */
    function createAd(
        address _vendor,
        bytes32 _adHash,
        uint priceOrRevShare,
        uint duration,
        AdTerms _adTerms
    ) external returns (uint256 _adId);

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

    // ===================================================
    // Errors
    // ===================================================
    error AdLicensing__NotCreator();
    error AdLicensing__NotVendor();
    error AdLicensing__AdAlreadyApproved();
    error AdLicensing__InvalidDuration();
    error AdLicensing__AdAlreadyActive();
    error AdLicensing__AdIsActive();
    error AdLicensing__AdStatusAlreadySet();
    error AdLicensing__InvalidVendorStatus();
    error AdLicensing__AdNotApproved();
    error AdLicensing__AdBlockedByCreator();
    error AdLicensing__NotConversionManager();
    error AdLicensing__InvalidRevshare();
}
