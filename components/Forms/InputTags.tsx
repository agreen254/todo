"use client";

import {
  Dispatch,
  SetStateAction,
  forwardRef,
  useContext,
  useState,
} from "react";
import TodoContext from "@/contexts/TodoContext";
import { alphaNumeric } from "@/utils/regex";
import { Input, InputProps } from "../ui/input";
import TagBadge from "../TagBadge";
import { Plus as PlusIcon, X as XIcon } from "lucide-react";
import { cn } from "@/utils/cn";

type InputTagsProps = InputProps & {
  value: string[];
  onChange: Dispatch<SetStateAction<string[]>>;
};

type TagErrors = {
  alphaNumericError: boolean;
  tooLongError: boolean;
};

const InputTags = forwardRef<HTMLInputElement, InputTagsProps>(
  ({ value, onChange, ...props }, ref) => {
    const {
      state: {
        tags: { allTags },
      },
    } = useContext(TodoContext);
    const [current, setCurrent] = useState<string>("");
    const [errors, setErrors] = useState<TagErrors>({
      alphaNumericError: false,
      tooLongError: false,
    });

    const validate = (text: string) => {
      const err: TagErrors = { alphaNumericError: false, tooLongError: false };
      if (!alphaNumeric.test(text)) {
        err.alphaNumericError = true;
      }
      if (text.length > 12) {
        err.tooLongError = true;
      }
      setErrors(err);
      return !err.alphaNumericError && !err.tooLongError;
    };

    const handleAddTags = () => {
      if (current) {
        const processedInput = current.toLowerCase().trim();
        const isValidated = validate(processedInput);

        if (isValidated) {
          const newTags = new Set([...value, processedInput]);
          onChange(Array.from(newTags));
          setCurrent("");
        }
      }
    };

    return (
      <div>
        <div className="flex flex-col space-y-2 mb-4">
          <Input
            placeholder="Enter tags here or add from below"
            value={current}
            onChange={(e) => setCurrent(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (["Enter", ",", " "].includes(e.key)) {
                e.preventDefault();
                handleAddTags();
              }
            }}
            {...props}
            ref={ref}
          />
          {errors.alphaNumericError && (
            <p className="text-destructive text-sm">
              Tags can only contain alphanumeric characters.
            </p>
          )}
          {errors.tooLongError && (
            <p className="text-destructive text-sm">
              Tags must be 12 characters or less.
            </p>
          )}
        </div>
        <div
          className={cn(
            "max-h-[6rem] overflow-y-auto mb-4 px-5 py-3 border-2 dark:border rounded-full hover:ring-ring hover:ring-2 transition-colors"
          )}
        >
          <p className="flex flex-wrap gap-x-2 gap-y-4">
            {value.length === 0 && (
              <span className="text-muted-foreground text-sm italic">
                no tags selected
              </span>
            )}
            {value.map((tag) => (
              <TagBadge
                key={tag}
                tag={tag}
                handleClick={() => onChange(value.filter((v) => v !== tag))}
              >
                {tag}
                <XIcon className="w-4 h-4 ml-1" />
              </TagBadge>
            ))}
          </p>
        </div>
        <div className="space-x-3">
          {allTags.map((tag) => (
            <TagBadge
              key={tag.name}
              tag={tag.name}
              handleClick={() => {
                !value.includes(tag.name) && onChange([...value, tag.name]);
              }}
            >
              {tag.name}
              <PlusIcon className="w-4 h-4 ml-1" />
            </TagBadge>
          ))}
        </div>
      </div>
    );
  }
);

export default InputTags;
