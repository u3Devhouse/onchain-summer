# AdLicensing

## Scope

## Scripts

### Deployment Script

```bash
forge script script/AdLicensingDeploy.s.sol -f $BASE_TEST_RPC --broadcast --verify --etherscan-api-key $ETHERSCAN_API_KEY --account basetest
```

### Create Ads Script

```bash
forge script script/CreateAds.s.sol -f $BASE_TEST_RPC --broadcast --account basetest
```
