const abi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_usdc",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "approveAdAndGetLicense",
    inputs: [
      {
        name: "_id",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "convert",
    inputs: [
      {
        name: "id",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "conversionInfo",
        type: "tuple",
        internalType: "struct IAdLicense.ConversionInfo",
        components: [
          {
            name: "conversionHash",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "timeOfConversion",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "creatorRevenue",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "paymentSuccessful",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createAd",
    inputs: [
      {
        name: "_vendor",
        type: "address",
        internalType: "address",
      },
      {
        name: "_adHash",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "priceOrRevShare",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "duration",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_adTerms",
        type: "uint8",
        internalType: "enum IAdLicense.AdTerms",
      },
    ],
    outputs: [
      {
        name: "_adId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getAdStatus",
    inputs: [
      {
        name: "_id",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint8",
        internalType: "enum IAdLicense.CreatorStatus",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAllConversionsForAd",
    inputs: [
      {
        name: "_id",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct IAdLicense.ConversionInfo[]",
        components: [
          {
            name: "conversionHash",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "timeOfConversion",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "creatorRevenue",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "paymentSuccessful",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAllVendorAds",
    inputs: [
      {
        name: "_vendor",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "allIds",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "idStatuses",
        type: "tuple[]",
        internalType: "struct IAdLicense.AdStatus[]",
        components: [
          {
            name: "lastVendorEdit",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "lastCreatorEdit",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "approvedTime",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "paymentTime",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "priceOrRevShare",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "duration",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "adHash",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "terms",
            type: "uint8",
            internalType: "enum IAdLicense.AdTerms",
          },
          {
            name: "vendorStatus",
            type: "uint8",
            internalType: "enum IAdLicense.VendorStatus",
          },
          {
            name: "creatorStatus",
            type: "uint8",
            internalType: "enum IAdLicense.CreatorStatus",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCreator",
    inputs: [
      {
        name: "_id",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLicense",
    inputs: [
      {
        name: "_id",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getVendor",
    inputs: [
      {
        name: "_id",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "totalAds",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        name: "newOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateAd",
    inputs: [
      {
        name: "_id",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_adInfo",
        type: "tuple",
        internalType: "struct IAdLicense.AdStatus",
        components: [
          {
            name: "lastVendorEdit",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "lastCreatorEdit",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "approvedTime",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "paymentTime",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "priceOrRevShare",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "duration",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "adHash",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "terms",
            type: "uint8",
            internalType: "enum IAdLicense.AdTerms",
          },
          {
            name: "vendorStatus",
            type: "uint8",
            internalType: "enum IAdLicense.VendorStatus",
          },
          {
            name: "creatorStatus",
            type: "uint8",
            internalType: "enum IAdLicense.CreatorStatus",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateVendorAdStatus",
    inputs: [
      {
        name: "_id",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_newStatus",
        type: "uint8",
        internalType: "enum IAdLicense.VendorStatus",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "usdc",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "AdCreated",
    inputs: [
      {
        name: "id",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "vendor",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "AdLicensed",
    inputs: [
      {
        name: "id",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "vendor",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "creator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Conversion",
    inputs: [
      {
        name: "id",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "info",
        type: "tuple",
        indexed: false,
        internalType: "struct IAdLicense.ConversionInfo",
        components: [
          {
            name: "conversionHash",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "timeOfConversion",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "creatorRevenue",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "paymentSuccessful",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CreatorAdStatusChanged",
    inputs: [
      {
        name: "id",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "prev_status",
        type: "uint8",
        indexed: false,
        internalType: "enum IAdLicense.CreatorStatus",
      },
      {
        name: "new_status",
        type: "uint8",
        indexed: false,
        internalType: "enum IAdLicense.CreatorStatus",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "VendorAdStatusChanged",
    inputs: [
      {
        name: "id",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "prev_status",
        type: "uint8",
        indexed: false,
        internalType: "enum IAdLicense.VendorStatus",
      },
      {
        name: "new_status",
        type: "uint8",
        indexed: false,
        internalType: "enum IAdLicense.VendorStatus",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AdLicensing__AdAlreadyActive",
    inputs: [],
  },
  {
    type: "error",
    name: "AdLicensing__AdAlreadyApproved",
    inputs: [],
  },
  {
    type: "error",
    name: "AdLicensing__AdBlockedByCreator",
    inputs: [],
  },
  {
    type: "error",
    name: "AdLicensing__AdIsActive",
    inputs: [],
  },
  {
    type: "error",
    name: "AdLicensing__AdNotApproved",
    inputs: [],
  },
  {
    type: "error",
    name: "AdLicensing__AdStatusAlreadySet",
    inputs: [],
  },
  {
    type: "error",
    name: "AdLicensing__InvalidDuration",
    inputs: [],
  },
  {
    type: "error",
    name: "AdLicensing__InvalidRevshare",
    inputs: [],
  },
  {
    type: "error",
    name: "AdLicensing__InvalidVendorStatus",
    inputs: [],
  },
  {
    type: "error",
    name: "AdLicensing__NotConversionManager",
    inputs: [],
  },
  {
    type: "error",
    name: "AdLicensing__NotCreator",
    inputs: [],
  },
  {
    type: "error",
    name: "AdLicensing__NotVendor",
    inputs: [],
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
  },
] as const;

export default abi;
