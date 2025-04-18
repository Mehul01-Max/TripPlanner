import React, { useContext, useState } from "react";
import home from "../assets/home.svg";
import map from "../assets/map.svg";
import add from "../assets/add.svg";
import { Menu, X } from "lucide-react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { MenuContext } from "../App";
import { cn } from "../lib/utils";

function Navbar() {
  const { isOpen, setIsOpen } = useContext(MenuContext);
  const location = useLocation();

  const tabs = [
    {
      name: "Home",
      href: "/",
      icon: home,
    },
    {
      name: "Add Trip",
      href: "/addtrip",
      icon: add,
    },
    {
      name: "My Trips",
      href: "/mytrips",
      icon: map,
    },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <>
      <div className="flex justify-between px-8 py-4 border-b-1 border-[#CDD7E5] max-w-(--my-max-width) mx-auto">
        <Link to="/">
          <div className="text-[#269DD8] text-2xl font-semibold">
            Trip Planner
          </div>
        </Link>
        <button
          className="flex sm:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X size={24} className="text-[#000000]" />
          ) : (
            <Menu size={24} className="text-[#000000]" />
          )}
        </button>
        <div className="hidden justify-center text-center items-center sm:flex">
          {tabs.map((tab) => (
            <Link to={tab.href} key={tab.name}>
              <div
                className={cn(
                  "group p-2 mx-2 rounded-md flex justify-center transition-all duration-300 ease-in-out items-center",
                  isActive(tab.href)
                    ? "bg-[#269DD8] text-white hover:bg-[#41A6DC]"
                    : "hover:bg-[#FA8938] hover:text-white"
                )}
              >
                <img
                  src={tab.icon}
                  alt=""
                  className={cn(
                    "transition-all duration-300 ease-in-out group-hover:filter group-hover:brightness-0 group-hover:invert px-2",
                    `${isActive(tab.href) ? "filter brightness-0 invert" : ""}`
                  )}
                />
                {tab.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div
        className={`sm:hidden transition-all duration-300 
          ${
            isOpen
              ? "animate-in fade-in slide-in-from-top-5"
              : "animate-out fade-out slide-out-to-top-5 hidden"
          }`}
      >
        <div className="flex flex-col py-2">
          {tabs.map((tab) => {
            return (
              <Link
                to={tab.href}
                key={tab.name}
                onClick={() => setIsOpen(false)}
                className="border rounded-md m-2 border-[#CDD7E5]"
              >
                <div
                  className={cn(
                    "group p-2 mx-2 rounded-md flex justify-center transition-all duration-300 ease-in-out hover:bg-[#FA8938] items-center hover:text-white",
                    `${isActive(tab.href) ? "bg-[#269DD8] text-white" : ""}`
                  )}
                >
                  <img
                    src={tab.icon}
                    alt=""
                    className={cn(
                      "transition-all duration-300 ease-in-out group-hover:filter group-hover:brightness-0 group-hover:invert px-2",
                      `${
                        isActive(tab.href) ? "filter brightness-0 invert" : ""
                      }`
                    )}
                  />
                  {tab.name}
                </div>
              </Link>
            );
          })}
          {/* <Link
            to={{ pathname: "/" }}
            onClick={() => setIsOpen(false)}
            className="border rounded-md m-2 border-[#CDD7E5]"
          >
            <div className="group p-2 mx-2 rounded-md flex justify-center transition-all duration-300 ease-in-out hover:bg-[#FA8938] items-center hover:text-white">
              <img
                src={home}
                alt=""
                className="transition-all duration-300 ease-in-out group-hover:filter group-hover:brightness-0 group-hover:invert px-2"
              />
              Home
            </div>
          </Link>
          <Link
            to={{ pathname: "/mytrips" }}
            onClick={() => setIsOpen(false)}
            className={cn("border rounded-md m-2 border-[#CDD7E5]", `${isActive(tab.href)}`)}
          >
            <div className="group p-2 mx-2 rounded-md flex justify-center transition-all duration-300 ease-in-out hover:bg-[#FA8938] items-center hover:text-white">
              <img
                src={map}
                alt=""
                className="transition-all duration-300 ease-in-out group-hover:filter group-hover:brightness-0 group-hover:invert px-2"
              />
              My Trips
            </div>
          </Link>
          <Link
            to={{ pathname: "/addtrip" }}
            onClick={() => setIsOpen(false)}
            className="border rounded-md m-2 border-[#CDD7E5]"
          >
            <div className="group p-2 mx-2 rounded-md flex justify-center transition-all duration-300 ease-in-out hover:bg-[#FA8938] items-center hover:text-white">
              <img
                src={add}
                alt=""
                className="transition-all duration-300 ease-in-out group-hover:filter group-hover:brightness-0 group-hover:invert px-2"
              />
              Add Trip
            </div>
          </Link> */}
        </div>
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Navbar;
