import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { MapPin, Calendar, Pencil, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { formatDate, daysLeft } from "../lib/index";
function MyTripCard({ TripName, destination, dates, onClick }) {
  // const handleDelete = () => {

  // }
  return (
    <Card className="text-sm">
      <div className="flex justify-between p-6 pb-3">
        <h1 className="text-lg font-bold">{TripName}</h1>
        {new Date(dates.from) - new Date() < 604800000 ? (
          <div className=" px-2 py-1 rounded-full  bg-[#FA8938] text-white text-[12px]">
            soon
          </div>
        ) : (
          <div className=" px-2 py-1 rounded-full  bg-[#2EB8B7] text-white text-[12px]">
            upcoming
          </div>
        )}
      </div>
      <div className="text-[#3E668E] p-6 pt-0 pb-2">
        <div className="flex">
          <MapPin className="pr-2"></MapPin>
          <p>{destination}</p>
        </div>
        <div className="flex py-2">
          <Calendar className="pr-2"></Calendar>
          <p className="text-black">
            {formatDate(new Date(dates.from), new Date(dates.to))}
          </p>
        </div>

        {daysLeft(new Date(dates.from)) <= 0 ? (
          <div className="text-[#000000] py-2 invisible">{"Hello bye"}</div>
        ) : (
          <div className="text-[#000000] py-2 font-semibold">
            {daysLeft(new Date(dates.from)) + " days until departure"}
          </div>
        )}
      </div>
      <div className="p-6 pt-3">
        <div className="flex justify-between items-center">
          <button className="bg-[#F8FAFC] border rounded-md py-2 text-black px-4 cursor-pointer hover:bg-[#FA8938] hover:text-white">
            View Details
          </button>
          <Trash2
            className="text-red-500 hover:bg-red-50 p-4 border rounded-md border-white cursor-pointer"
            size={52}
            onClick={onClick}
          />
        </div>
      </div>
    </Card>
  );
}

export default MyTripCard;
