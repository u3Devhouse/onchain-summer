"use client";
import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  return (
    <div className="max-w-full lg:max-w-lg px-8 py-8 w-full flex items-center justify-center gap-2">
      <Input placeholder="Search for ads" />
      <Button>
        <FaSearch />
      </Button>
    </div>
  );
}
