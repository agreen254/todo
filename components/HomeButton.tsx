import { cn } from "@/utils/cn";
import { SVGProps } from "react";
import {
  ArrowBigLeft as ArrowBigLeftIcon,
  LucideIcon,
  LucideProps,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const HomeButton = () => {
  return (
    <Button
      className="rounded-full hover:scale-125 transition-all"
      variant="ghost"
      size="icon"
      role="link"
    >
      <Link href="/">
        <ArrowBigLeftIcon
          className="w-8 h-8"
          stroke="hsl(var(--muted-foreground))"
          fill="hsl(var(--muted-foreground))"
        />
      </Link>
    </Button>
  );
};

export default HomeButton;
