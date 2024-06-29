"use client";
import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  return (
    <div className="max-w-full lg:max-w-lg px-4 py-8 w-full flex items-center justify-center">
      <Input placeholder="Search for ads" />
      <Button>
        <FaSearch />
      </Button>
    </div>
  );
}
