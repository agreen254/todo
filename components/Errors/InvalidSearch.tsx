import { Button } from "../ui/button";
import Link from "next/link";

const InvalidSearch = () => {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-3xl font-bold mt-12 ml-4 text-center">
        Error: Invalid Search.
      </h1>
      <div className="flex justify-center mt-2">
        <Link href="/">
          <Button role="link" className="w-[180px]">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InvalidSearch;
