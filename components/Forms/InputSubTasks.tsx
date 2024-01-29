"use client";

import { Dispatch, SetStateAction, forwardRef, useState } from "react";
import { SubTask } from "@/utils/types";
import { Button } from "../ui/button";
import { Input, InputProps } from "../ui/input";
import { Check as CheckIcon, X as XIcon } from "lucide-react";
import { cn } from "@/utils/cn";

type InputTagsProps = InputProps & {
  value: string[];
  subTasks: SubTask[];
  setSubTasks: (subTasks: SubTask[]) => void;
  onChange: Dispatch<SetStateAction<string[]>>;
};

type SubTaskErrors = {
  tooLongError: boolean;
};

const InputSubTasks = forwardRef<HTMLInputElement, InputTagsProps>(
  ({ value, onChange, subTasks, setSubTasks, ...props }, ref) => {
    const [current, setCurrent] = useState<string>("");
    const [errors, setErrors] = useState<SubTaskErrors>({
      tooLongError: false,
    });

    const validate = (text: string) => {
      const err: SubTaskErrors = { tooLongError: false };
      if (text.length > 80) {
        err.tooLongError = true;
      }
      setErrors(err);
      return !err.tooLongError;
    };

    const handleAddSubTask = () => {
      if (current) {
        const processedInput = current.toLowerCase().trim();
        const isValidated = validate(processedInput);

        if (isValidated) {
          const newTags = new Set([...value, processedInput]);
          onChange(Array.from(newTags));
          setSubTasks([
            ...subTasks,
            { subTaskName: processedInput, isCompleted: false },
          ]);
          setCurrent("");
        }
      }
    };

    const handleDeleteSubTask = (taskName: string) => {
      onChange(value.filter((v) => v !== taskName));
      setSubTasks(subTasks.filter((st) => st.subTaskName !== taskName));
    };

    const handleCompleteSubTask = (subTask: SubTask, idx: number) => {
      setSubTasks(
        subTasks.toSpliced(idx, 1, {
          subTaskName: subTask.subTaskName,
          isCompleted: subTasks[idx].isCompleted ? false : true,
        })
      );
    };

    return (
      <div>
        <div className="flex flex-col space-y-2 mb-4">
          <Input
            placeholder="Enter subtasks"
            value={current}
            onChange={(e) => setCurrent(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddSubTask();
              }
            }}
            {...props}
            ref={ref}
          />
          {errors.tooLongError && (
            <p className="text-destructive text-sm">
              Subtasks must be 80 characters or less.
            </p>
          )}
        </div>
        {value.length === 0 && (
          <div
            className={cn(
              "max-h-[6rem] overflow-y-auto mb-4 px-5 py-3 border-2 dark:border rounded-full hover:ring-ring hover:ring-2 transition-colors"
            )}
          >
            <p className="flex flex-wrap gap-x-2 gap-y-4">
              <span className="text-muted-foreground text-sm italic">
                no subtasks to show
              </span>
            </p>
          </div>
        )}
        {subTasks.map((subTask, idx) => (
          <div
            key={subTask + idx.toString()}
            className="flex justify-between my-4 py-2 items-center rounded-full border-2 dark:border hover:ring-ring hover:ring-2 transition-colors"
          >
            <div>
              <p className="ml-8">{`${idx + 1}. ${subTask.subTaskName}`}</p>
            </div>
            <div className="min-w-[5rem] ml-2">
              <span>
                <Button
                  className={cn(
                    "h-8 w-8 p-0 mr-2 rounded-full",
                    subTask.isCompleted && "bg-green-600 hover:bg-green-500"
                  )}
                  variant="outline"
                  type="button"
                  onClick={() => handleCompleteSubTask(subTask, idx)}
                >
                  <CheckIcon className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  type="button"
                  className="h-8 w-8 p-0 mr-2 rounded-full"
                  onClick={() => handleDeleteSubTask(subTask.subTaskName)}
                >
                  <XIcon className="w-4 h-4" />
                </Button>
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }
);

InputSubTasks.displayName = "InputSubTasks";
export default InputSubTasks;
