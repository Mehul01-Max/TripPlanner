import { MenuContext } from "../App";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
function Home() {
  const { isOpen, setIsOpen } = useContext(MenuContext);
  return (
    <>
      {!isOpen && (
        <div className="px-8 py-16 flex flex-col gap-4 max-w-(--my-max-width) mx-auto">
          <h1 className="font-extrabold text-5xl">
            Plan your dream <span className="text-[#269DD8]">vacation</span>{" "}
            with ease
          </h1>
          <p className="text-[#3E668E] text-lg">
            Your perfect trip starts here. Organize, track, and make memories.
          </p>
          <div className="flex gap-2">
            <Link to={{ pathname: "/addtrip" }}>
              <button className="py-3 px-7 rounded-md flex justify-center transition-all bg-[#269DD8] text-white duration-300 ease-in-out hover:bg-[#41A6DC] items-center hover:text-white">
                Plan a Trip
              </button>
            </Link>
            <Link to={{ pathname: "/mytrips" }}>
              <button className="py-3 px-7 rounded-md flex justify-center transition-all border border-[#CDD7E5] duration-300 ease-in-out hover:bg-[#FA8938] items-center hover:text-white">
                View My Trips
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
