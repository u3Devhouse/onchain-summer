"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ph1 from "@/public/placeholder/ph1.jpg";
import ph2 from "@/public/placeholder/ph2.jpg";
import ph3 from "@/public/placeholder/ph3.jpg";
import ph4 from "@/public/placeholder/ph4.jpg";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export default function Ads() {
  return (
    <section className="flex flex-row flex-wrap items-center justify-center gap-4 max-w-[1440px] pb-8">
      {dummyData.map((d, i) => (
        <Ad key={i} {...d} />
      ))}
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
};

function Ad(props: AdPropsType) {
  const isNew = props.tags.includes("New");
  const isPending = props.tags.includes("Pending");
  const isApproved = props.tags.includes("Approved");
  const isRejected = props.tags.includes("Rejected");
  const isActive = props.tags.includes("Active");
  return (
    <div className="rounded-3xl border-2 border-gray-500 px-4 py-4 flex flex-row items-stretch gap-2 w-[430px] max-w-[90vw] hover:drop-shadow-md">
      <Link href={`/vendor/ads/${props.id.toString()}`}>
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
          <div className="text-sm text-gray-500">{props.creatorName}</div>
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
          {isActive && (
            <Button variant="outline" className="border-red-500 text-red-500">
              Deactivate
            </Button>
          )}
          {isPending && (
            <>
              <Button variant="outline" className="border-red-500 text-red-500">
                Reject
              </Button>

              <Button
                variant="outline"
                className="border-green-500 text-green-500"
              >
                Approve
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
