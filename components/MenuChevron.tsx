import { cn } from "@/utils/cn";
import { ChevronDown } from "lucide-react";

type Props = {
    name: string;
    isOpen: boolean;
}

const MenuChevron = ({ name, isOpen }: Props) => {
  return (
    <span>
      {name}
      <ChevronDown
        className={cn("w-4 h-4 ml-2 inline-block transition-all", isOpen && "rotate-180")}
      />
    </span>
  );
};

export default MenuChevron;
