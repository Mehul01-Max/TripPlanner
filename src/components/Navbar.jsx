import React from "react";
import home from "../assets/home.svg";
import map from "../assets/map.svg";
import add from "../assets/add.svg";
function Navbar() {
  return (
    <>
      <div className="flex justify-between px-8 py-4 border-b-1 border-[#CDD7E5]">
        <div className="text-[#269DD8] text-2xl font-semibold">
          Trip Planner
        </div>
        <div className="flex justify-center text-center items-center">
          <div className="group p-2 mx-2 rounded-md flex justify-center transition-all duration-300 ease-in-out hover:bg-[#FA8938] items-center hover:text-white">
            <img
              src={home}
              alt=""
              className="transition-all duration-300 ease-in-out group-hover:filter group-hover:brightness-0 group-hover:invert px-2"
            />
            Home
          </div>
          <div className="group p-2 mx-2 rounded-md flex justify-center transition-all duration-300 ease-in-out hover:bg-[#FA8938] items-center hover:text-white">
            <img
              src={map}
              alt=""
              className="transition-all duration-300 ease-in-out group-hover:filter group-hover:brightness-0 group-hover:invert px-2"
            />
            My Trips
          </div>
          <div className="group p-2 mx-2 rounded-md flex justify-center transition-all duration-300 ease-in-out hover:bg-[#FA8938] items-center hover:text-white">
            <img
              src={add}
              alt=""
              className="transition-all duration-300 ease-in-out group-hover:filter group-hover:brightness-0 group-hover:invert px-2"
            />
            Add Trips
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
