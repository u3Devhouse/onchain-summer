"use client";

import { Badge } from "@/components/ui/badge";
import ph1 from "@/public/placeholder/ph1.jpg";
import ph2 from "@/public/placeholder/ph2.jpg";
import ph3 from "@/public/placeholder/ph3.jpg";
import ph4 from "@/public/placeholder/ph4.jpg";
import Image, { StaticImageData } from "next/image";

export default function Ads() {
  return (
    <section className="flex flex-row flex-wrap items-center justify-center gap-4 max-w-[1440px]">
      {dummyData.map((d, i) => (
        <Ad key={i} {...d} />
      ))}
    </section>
  );
}

type AdPropsType = {
  image: StaticImageData;
  productName: string;
  creatorName: string;
  terms: string;
  tags: string[];
};

function Ad(props: AdPropsType) {
  const tags = ["Approved", "Active"];
  return (
    <div className="rounded-3xl border-2 border-gray-500 px-4 py-4 flex flex-row items-center gap-2">
      <div className="w-48 h-48 bg-gray-500 rounded-xl flex items-center justify-center overflow-hidden">
        <Image
          src={props.image}
          alt="Product Image"
          className="pointer-events-none"
        />
      </div>
      <div className="flex flex-col items-start justify-center">
        <div className="text-lg font-bold">{props.productName}</div>
        <div className="text-sm text-gray-500">{props.creatorName}</div>
        <div>{props.terms}</div>
        <div className="flex flex-row items-center flex-wrap gap-1 pt-2">
          {props.tags.map((tag) => (
            <Badge variant={tag === "Approved" ? "default" : "outline"}>
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

const dummyData = [
  {
    image: ph1,
    productName: "Awesome Shoes",
    creatorName: "John Doe",
    terms: "Revshare 2%",
    tags: ["Approved", "Active"],
  },
  {
    image: ph2,
    productName: "Runners H1B",
    creatorName: "Jane Smith",
    terms: "One Time - $100",
    tags: ["Pending"],
  },
  {
    image: ph3,
    productName: "Product Name",
    creatorName: "Creator Name",
    terms: "Terms",
    tags: ["Approved", "Active"],
  },
  {
    image: ph4,
    productName: "Product Name",
    creatorName: "Creator Name",
    terms: "Terms",
    tags: ["Approved", "Active"],
  },
];
