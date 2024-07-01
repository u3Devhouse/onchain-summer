// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {AdLicensing} from "../src/AdLicensing.sol";

contract CounterScript is Script {
    function run() public {
        address usdc;
        if (block.chainid == 8453)
            usdc = 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913;
        else if (block.chainid == 84532)
            usdc = 0x036CbD53842c5426634e7929541eC2318f3dCF7e;
        vm.startBroadcast();
        AdLicensing adLicensing = new AdLicensing(usdc);
        vm.stopBroadcast();
        console.log("AdLicensing deployed at", address(adLicensing));
    }
}
