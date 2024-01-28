import { Separator } from "./ui/separator";

const GradientSeparator = () => {
  return (
    <Separator className="w-[95vw] lg:w-[85vw] my-2 h-[3px] rounded-l-none rounded-tr-md rounded-br-md bg-gradient-to-r from-primary dark:to-cyan-500 to-cyan-300" />
  );
};

export default GradientSeparator;
