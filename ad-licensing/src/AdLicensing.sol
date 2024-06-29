//SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {IAdLicense} from "./interfaces/IAdLicense.sol";

contract AdLicensing is IAdLicense {
    // ===================================================
    // State Variables
    // ===================================================
    mapping(uint256 _adId => address _vendor) private adVendor;
    mapping(uint256 _adId => address _creator) private adCreator;
    mapping(uint256 _adId => AdStatus _adStatus) private adStatus;
    mapping(uint256 _adId => ConversionInfo[] _conversionInfo)
        private adConversionInfo;

    // ===================================================
    // Constants
    // ===================================================
    uint256 private constant BASIS_POINTS = 100_000; // 100%

    // ===================================================
    // Constructor
    // ===================================================
    constructor() {}

    // ===================================================
    // External Functions
    // ===================================================
    // ===================================================
    // Creator Functions
    // ===================================================
    function createAd(
        uint256 _id,
        address _vendor,
        AdStatus calldata _adInfo
    ) external {}

    function updateAd(uint256 _id, AdStatus calldata _adInfo) external {}

    // ===================================================
    // Vendor Functions
    // ===================================================
    function updateVendorAdStatus(
        uint256 _id,
        VendorStatus _newStatus
    ) external {}

    function approveAdAndGetLicense(uint256 _id) external {}

    function getLicense(uint256 _id) external {}
}
