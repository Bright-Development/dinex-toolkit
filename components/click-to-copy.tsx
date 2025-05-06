"use client";
import { handleCopy } from "@/lib/utils";
import { ClipboardCopy } from "lucide-react";
import React from "react";

type Props = {
  path: string;
};

function ClickToCopy({ path }: Props) {
  return (
    <div className="mx-auto mt-8 max-w-4xl border-t px-4 pt-8">
      <h3 className="mb-2 text-lg font-medium">Installation Command</h3>
      <div className="relative">
        <pre className="overflow-x-auto rounded bg-gray-100 p-4 text-sm">
          {`pnpm dlx shadcn@latest add http://localhost:3000/r/${path}.json`}
        </pre>
        <button
          className="absolute right-2 top-2 rounded bg-primary px-2 py-1 text-white"
          onClick={() =>
            handleCopy(
              `pnpm dlx shadcn@latest add http://localhost:3000/r/${path}.json`,
            )
          }
        >
          <ClipboardCopy />
        </button>
      </div>
    </div>
  );
}

export default ClickToCopy;
