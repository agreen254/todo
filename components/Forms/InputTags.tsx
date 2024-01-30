"use client";

import { Dispatch, SetStateAction, forwardRef, useState } from "react";
import { alphaNumeric } from "@/utils/regex";
import { Input, InputProps } from "../ui/input";
import TagBadge from "../TagBadge";
import { Plus as PlusIcon, X as XIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import { Tag } from "@/utils/types";
import newTag from "@/utils/tags/newTag";
import { useTodo } from "@/providers/TodoProvider";

type InputTagsProps = InputProps & {
  value: string[];
  onChange: Dispatch<SetStateAction<string[]>>;
  activeTags: Tag[];
  setActiveTags: (tags: Tag[]) => void;
};

type TagErrors = {
  alphaNumericError: boolean;
  tooLongError: boolean;
};

const InputTags = forwardRef<HTMLInputElement, InputTagsProps>(
  ({ value, onChange, activeTags, setActiveTags, ...props }, ref) => {
    const {
      state: {
        tags: { allTags },
      },
    } = useTodo();
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
        if (value.find((v) => v === processedInput)) {
          setCurrent("");
          return;
        }

        const isValidated = validate(processedInput);
        const existingTag = allTags.find((t) => t.name === processedInput);

        if (existingTag && isValidated) {
          !value.includes(existingTag.name) &&
            onChange([...value, existingTag.name]);
          !activeTags.includes(existingTag) &&
            setActiveTags([...activeTags, existingTag]);
          setCurrent("");
        } else if (isValidated) {
          const newTags = new Set([...value, processedInput]);
          onChange(Array.from(newTags));
          setActiveTags([
            ...activeTags,
            newTag(processedInput, allTags.length + numNewTags()),
          ]);
          setCurrent("");
        }
      }
    };

    const numNewTags = () => {
      return value.reduce((n, tag) => {
        return allTags.some((t) => t.name === tag) ? n : n + 1;
      }, 0);
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
          <p className="flex flex-wrap gap-y-2">
            {value.length === 0 && (
              <span className="text-muted-foreground text-sm italic">
                no tags selected
              </span>
            )}
            {activeTags.map((tag) => (
              <TagBadge
                key={tag.name}
                tag={tag.name}
                tagObj={tag}
                handleClick={() => {
                  setActiveTags(activeTags.filter((t) => t.name !== tag.name));
                  onChange(value.filter((v) => v !== tag.name));
                }}
              >
                {tag.name}
                <XIcon className="w-4 h-4 ml-1" />
              </TagBadge>
            ))}
          </p>
        </div>
        <div className="flex flex-wrap items-start justify-center md:justify-start gap-y-2">
          {allTags.map((tag) => (
            <TagBadge
              key={tag.name}
              tag={tag.name}
              handleClick={() => {
                !value.includes(tag.name) && onChange([...value, tag.name]);
                !activeTags.includes(tag) &&
                  setActiveTags([...activeTags, tag]);
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

InputTags.displayName = "InputTags";
export default InputTags;
