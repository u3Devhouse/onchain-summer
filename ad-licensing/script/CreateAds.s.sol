// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {AdLicensing, IAdLicense} from "../src/AdLicensing.sol";

contract CreateAds is Script {
    function run() public {
        AdLicensing adLicensing = AdLicensing(
            0x194dB537469Bf0b2215F1E796C8db1AF731dCc7f
        );
        vm.startBroadcast();
        adLicensing.createAd(
            0xf11176495d7370DB4d634eb1827dadDB919F62aA,
            bytes32(uint256(1)),
            1_000000,
            30 days,
            IAdLicense.AdTerms.SINGLE_PAYMENT_DURATION
        );
        adLicensing.createAd(
            0xf11176495d7370DB4d634eb1827dadDB919F62aA,
            bytes32(uint256(2)),
            1_000000,
            30 days,
            IAdLicense.AdTerms.SINGLE_PAYMENT_DURATION
        );
        adLicensing.createAd(
            0xf11176495d7370DB4d634eb1827dadDB919F62aA,
            bytes32(uint256(3)),
            10_000,
            30 days,
            IAdLicense.AdTerms.REVSHARE
        );
        adLicensing.createAd(
            0xf11176495d7370DB4d634eb1827dadDB919F62aA,
            bytes32(uint256(4)),
            5_000,
            30 days,
            IAdLicense.AdTerms.REVSHARE
        );
        vm.stopBroadcast();
    }
}
