import React from "react";
import { Button } from "./ui/button";

function DeletePopup() {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center z-40">
        <div className="bg-white max-w-md border rounded-lg p-2">
          <h1 className="font-semibold p-2">Are You Sure?</h1>
          <p className="text-[#3E668E] p-2">
            This action cannot be undone. This will permanently delete the trip
            and all of its data.
          </p>
          <div className="flex justify-end p-2">
            <Button className="border hover:bg-[#FA8938] bg-[#F8FAFD] text-black hover:text-white m-1">
              Cancel
            </Button>
            <Button className="bg-[#EF4444] text-white hover:bg-[#41A7DC] m-1">
              {" "}
              Delete{" "}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeletePopup;
