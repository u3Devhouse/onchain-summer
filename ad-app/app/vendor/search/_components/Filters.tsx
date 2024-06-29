"use client";

import { Badge } from "@/components/ui/badge";

export default function Filters() {
  return (
    <div className="flex flex-wrap gap-2 flex-row items-center px-4 justify-center">
      <Badge variant="greenOutline">New</Badge>
      <Badge variant="default">Active</Badge>
      <Badge variant="outline">Paused</Badge>
      <Badge variant="outline">Review</Badge>
      <Badge variant="outline">Pending</Badge>
      <Badge variant="outline">Rejected</Badge>
      <Badge variant="default">Approved</Badge>
    </div>
  );
}
