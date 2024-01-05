"use client";

import { useContext } from "react";
import TodoContext from "@/contexts/TodoContext";
import search from "@/utils/search";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const SearchBar = () => {
  const {
    state: { all },
    dispatch,
  } = useContext(TodoContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("executing search...");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor="search" className="hidden">
        Input search term
      </Label>
      <Input
        id="search"
        placeholder="search todos"
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
  );
};

export default SearchBar;
