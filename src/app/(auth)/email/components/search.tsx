"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "../icons/search";

export function Search() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Recherche
      </label>
      <input
        className="block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-950 dark:text-white dark:border-gray-800"
        placeholder="Recherche..."
        onChange={(e) => {
          /*
          handleSearch(e.target.value);
          */
        }}
        defaultValue={searchParams.get("q")?.toString()}
      />
      <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 " />
    </div>
  );
}
function useDebouncedCallback(arg0: (term: any) => void, arg1: number) {
  throw new Error("Function not implemented.");
}
