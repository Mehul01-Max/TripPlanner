import React from "react";
import { Checkbox } from "./ui/checkbox";
import { Trash2 } from "lucide-react";
import { cn } from "../lib/utils";
function TodoList({ todoInput, isDone, checkBoxClick, onDelete }) {
  return (
    <>
      <div className="flex justify-between border-b-1 w-full py-3 items-center">
        <div className="flex items-center">
          <Checkbox onClick={() => checkBoxClick()} checked={isDone} />
          <p
            className={cn(
              "ml-4",
              `${isDone ? "line-through text-gray-500" : ""}`
            )}
          >
            {todoInput}
          </p>
        </div>
        <Trash2
          size={17}
          className="hover:text-red-500"
          onClick={() => onDelete()}
        />
      </div>
    </>
  );
}

export default TodoList;
