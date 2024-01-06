"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("query") || "";
  const typeParam = searchParams.get("type") || "";

  return (
    <>
      <h1 className="text-center">This is the search results page.</h1>
      <p>{queryParam}</p>
      <p>{typeParam}</p>
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
