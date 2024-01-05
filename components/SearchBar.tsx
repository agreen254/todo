"use client";

import { useContext, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TodoContext from "@/contexts/TodoContext";
import search from "@/utils/search";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const SearchBar = () => {
  const queryRef = useRef<HTMLInputElement>(null);

  const {
    state: { all },
    dispatch,
  } = useContext(TodoContext);

  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`?q=${queryRef.current?.value}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="search" className="hidden">
          Input search term
        </Label>
        <Input
          id="search"
          ref={queryRef}
          placeholder="search todos"
          type="text"
          className="px-3 py-6 w-[min(350px,90vw)]"
        />
        <Button
          variant="ghost"
          size="icon"
          className="translate-y-[-45px] translate-x-[min(305px,calc(90vw-44px))]"
        >
          <Search />
        </Button>
      </form>
      {search(query, all, 2).map((t, idx) => (
        <p key={t.id + "query"}>
          <span>{t.name}</span>
          <span>{t.dueAt}</span>
        </p>
      ))}
    </div>
  );
};

export default SearchBar;
