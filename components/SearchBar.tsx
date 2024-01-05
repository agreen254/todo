"use client";

import { useContext, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TodoContext from "@/contexts/TodoContext";
import search from "@/utils/search";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const SearchBar = () => {
  const {
    state: { all },
    dispatch,
  } = useContext(TodoContext);

  const router = useRouter();
  const searchParams = useSearchParams();
  const queryString = searchParams.get("q") || "";
  const queryKind = searchParams.get("type") || "";
  const [queryState, setQueryState] = useState(queryString);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`?q=${queryState}`);
  };

  if (!all.length) return;

  return (
    <div>
      <p>{queryKind}</p>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="search" className="hidden">
          Input search term
        </Label>
        <Input
          id="search"
          value={queryState}
          onChange={(e) => setQueryState(e.target.value)}
          placeholder="search todos"
          type="text"
          className="px-3 py-6 w-[min(350px,90vw)]"
        />
        <Button
          variant="ghost"
          size="icon"
          className="translate-y-[-44px] translate-x-[min(305px,calc(90vw-44px))]"
        >
          <Search />
        </Button>
        <div>
          <RadioGroup
            defaultValue="name"
            className="space-x-3 mt-[-30px] mb-4 w-full flex justify-start"
          >
            <span className="flex items-center">
              <RadioGroupItem value="name" id="rName" />
              <Label htmlFor="rName" className="ml-1">
                name
              </Label>
            </span>
            <span className="flex items-center">
              <RadioGroupItem value="description" id="rDescription" />
              <Label htmlFor="rDescription" className="ml-1">
                description
              </Label>
            </span>
            <span className="flex items-center">
              <RadioGroupItem value="dueAt" id="rDueAt" />
              <Label htmlFor="rDueAt" className="ml-1">
                due date
              </Label>
            </span>
          </RadioGroup>
        </div>
      </form>
      {search(queryString, all, 1).map((t) => (
        <p key={t.id + "query"}>
          <span>{t.name}</span>
          <span>{t.id}</span>
        </p>
      ))}
    </div>
  );
};

export default SearchBar;
