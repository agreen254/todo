"use client";

import Link from "next/link";
import TodoNotFound from "@/components/Errors/TodoNotFound";
import { Separator } from "@/components/ui/separator";
import { searchByMap } from "@/utils/maps";
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("query");
  const typeParam = searchParams.get("type") || "";

  const typeRender = searchByMap.get(typeParam);
  if (!typeRender) return <TodoNotFound />;

  return (
    <>
      <h1 className="text-3xl font-medium mt-4 ml-4">
        Showing results for{" "}
        <span className="font-bold">
          {searchByMap.get(typeParam) || typeParam}
        </span>{" "}
        containing<span className="font-bold"> "{queryParam}"</span>
      </h1>
      <Separator className="w-[65vw] h-1 my-2 rounded-r-md bg-primary/50 dark:bg-primary" />
      <div className="flex justify-center">
        <Link
          href="/"
          className="px-3 py-5 bg-slate-500 w-[150px] text-center inline-block rounded-md hover:shadow-md hover:dark:shadow-slate-200"
        >
          Back Home
        </Link>
      </div>
    </>
  );
};

export default SearchPage;
