"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ph1 from "@/public/placeholder/ph1.jpg";
import ph2 from "@/public/placeholder/ph2.jpg";
import ph3 from "@/public/placeholder/ph3.jpg";
import ph4 from "@/public/placeholder/ph4.jpg";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useReadContract, useReadContracts, useWriteContract } from "wagmi";
import AdLicensingABI from "@/lib/abi/AdLicensing";
import { adLicensingContract, usdc } from "@/lib/contrats";
import { erc20Abi } from "viem";

export default function Ads() {
  const { data, refetch } = useReadContract({
    abi: AdLicensingABI,
    address: adLicensingContract,
    functionName: "getAllVendorAds",
    args: ["0xf11176495d7370DB4d634eb1827dadDB919F62aA"],
  });

  const { writeContract } = useWriteContract();

  const ads = data?.[0].map((id, idx) => {
    const adData = data[1][idx];
    console.log({ id, adData });
    const tags = [];
    if (
      adData.approvedTime === 0n && //No approved time
      adData.creatorStatus === 0 && // Creator = NEW
      adData.vendorStatus === 0 // Vendor = PENDING
    )
      tags.push("New");
    if (
      // adData.approvedTime > 0n &&
      adData.vendorStatus === 1
    )
      tags.push("Approved");
    if (adData.vendorStatus === 2) tags.push("Rejected");
    if (adData.vendorStatus === 3) tags.push("Review Terms");
    if (adData.creatorStatus === 1) tags.push("Active");
    if (adData.creatorStatus === 2) tags.push("Inactive");
    if (adData.creatorStatus === 3) tags.push("Blocked");
    if (adData.creatorStatus === 4) tags.push("Expired");

    const idData = dummyData.find((d) => d.id === id);
    if (!idData) return null;
    return { ...idData, tags: tags };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10_000);
    return () => clearInterval(interval);
  }, [refetch]);
  return (
    <section className="flex flex-row flex-wrap items-center justify-center gap-4 max-w-[1440px] pb-8">
      {ads?.map((d, i) => {
        if (!d) return null;
        return <Ad key={i} {...d} refetch={refetch} />;
      })}
      <div className="w-full flex items-center justify-center">
        <Button
          onClick={() => {
            writeContract({
              address: usdc,
              abi: erc20Abi,
              functionName: "approve",
              args: [adLicensingContract, 1000_000000n],
            });
          }}
        >
          Approve USDC
        </Button>
      </div>
    </section>
  );
}

type AdPropsType = {
  id: bigint;
  image: StaticImageData;
  productName: string;
  creatorName: string;
  description: string;
  terms: string;
  tags: string[];
  refetch: () => void;
};

function Ad(props: AdPropsType) {
  const { data } = useReadContracts({
    contracts: [
      {
        abi: AdLicensingABI,
        address: adLicensingContract,
        functionName: "getCreator",
        args: [props.id],
      },
    ],
  });
  const isPending =
    props.tags.includes("Pending") || props.tags.includes("New");
  const isApproved = props.tags.includes("Approved");
  const isRejected = props.tags.includes("Rejected");
  const isActive = props.tags.includes("Active");

  const { writeContract: rejectWrite, isPending: rejectLoading } =
    useWriteContract();
  const { writeContract, isPending: loading } = useWriteContract();

  return (
    <div className="rounded-3xl border-2 border-gray-500 px-4 py-4 flex flex-row items-stretch gap-2 w-[430px] max-w-[90vw] hover:drop-shadow-md">
      <Link href={`/vendors/ads/${props.id.toString()}`}>
        <div className="w-48 h-48 bg-gray-500 rounded-xl flex items-center justify-center overflow-hidden">
          <Image
            src={props.image}
            alt="Product Image"
            className="pointer-events-none w-full h-full"
          />
        </div>
      </Link>
      <div className="flex flex-col justify-between">
        <div>
          <div className="text-lg font-bold">{props.productName}</div>
          <div className="text-sm text-gray-500">
            {data?.[0].result
              ? `${data[0].result.slice(0, 4)}...${data[0].result.slice(-4)}`
              : props.creatorName}
          </div>
          <div>{props.terms}</div>
          <div className="flex flex-row items-center flex-wrap gap-1 py-2">
            {props.tags.map((tag, index) => (
              <Badge
                variant={tag === "Approved" ? "default" : "outline"}
                className={cn(tag === "New" ? "bg-green-500 text-white" : "")}
                key={`${tag}-${index}`}
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="text-xs text-gray-500">{props.description}</div>
        </div>
        <div className="flex flex-row flex-wrap items-center gap-2 self-end w-full">
          {/* {isActive && (
            <Button
              variant="outline"
              className="border-red-500 text-red-500"
              disabled={loading}
              onClick={() => {
                writeContract({
                  abi: AdLicensingABI,
                  address: adLicensingContract,
                  functionName: "updateVendorAdStatus",
                  args: [props.id, 2],
                });
              }}
            >
              {loading ? "Deactivating..." : "Deactivate"}
            </Button>
          )} */}
          {isApproved && (
            <Button
              variant="outline"
              className="border-green-500 text-green-500"
              onClick={() => {
                writeContract(
                  {
                    abi: AdLicensingABI,
                    address: adLicensingContract,
                    functionName: "getLicense",
                    args: [props.id],
                  },
                  {
                    onSuccess: () => {
                      props.refetch();
                    },
                  }
                );
              }}
              disabled={loading}
            >
              {loading ? "Activating..." : "Activate"}
            </Button>
          )}
          {isPending && (
            <>
              <Button
                variant="outline"
                className="border-red-500 text-red-500"
                onClick={() => {
                  rejectWrite(
                    {
                      abi: AdLicensingABI,
                      address: adLicensingContract,
                      functionName: "updateVendorAdStatus",
                      args: [props.id, 2],
                    },
                    {
                      onSuccess: () => {
                        props.refetch();
                      },
                    }
                  );
                }}
                disabled={rejectLoading || loading}
              >
                {rejectLoading ? "Rejecting..." : "Reject"}
              </Button>

              <Button
                variant="outline"
                className="border-green-500 text-green-500"
                disabled={loading}
                onClick={() => {
                  writeContract(
                    {
                      abi: AdLicensingABI,
                      address: adLicensingContract,
                      functionName: "updateVendorAdStatus",
                      args: [props.id, 1],
                    },
                    {
                      onSuccess: () => {
                        setTimeout(() => {
                          props.refetch();
                        }, 10_000);
                      },
                    }
                  );
                }}
              >
                {loading ? "Approving..." : "Approve"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const dummyData = [
  {
    id: 1n,
    image: ph1,
    productName: "Awesome Shoes",
    creatorName: "John Doe",
    description: "This is a description of the ad",
    terms: "Revshare 2%",
    tags: ["Approved", "Active"],
  },
  {
    id: 2n,
    image: ph2,
    productName: "Runners H1B",
    creatorName: "Jane Smith",
    description: "This is a description of the ad",
    terms: "One Time - $100",
    tags: ["New", "Pending"],
  },
  {
    id: 3n,
    image: ph3,
    productName: "Product Name#1",
    creatorName: "Rev Track",
    description: "This is a description of the ad",
    terms: "1T - $50",
    tags: ["Approved", "Active"],
  },
  {
    id: 4n,
    image: ph4,
    productName: "Product Name#2",
    creatorName: "Namu Def",
    description: "This is a description of the ad",
    terms: "Terms",
    tags: ["Approved", "Active"],
  },
];
