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
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

function MyTripCard({ id, TripName, destination, dates, onClick }) {
  return (
    <Card className="text-sm">
      <div className="flex justify-between p-6 pb-3">
        <h1 className="text-lg font-bold">{TripName}</h1>
        {new Date(dates.to) - new Date() < 0 ? (
          <div className=" px-2 py-1 rounded-full  bg-red-500 text-white text-[12px]">
            compeleted
          </div>
        ) : new Date(dates.to) - new Date() >= 0 &&
          new Date(dates.from) - new Date() <= 0 ? (
          <div className=" px-2 py-1 rounded-full  bg-green-500 text-white text-[12px]">
            ongoing
          </div>
        ) : new Date(dates.from) - new Date() < 604800000 ? (
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

        {daysLeft(new Date(), new Date(dates.from)) <= 0 ? (
          <div className="text-[#000000] py-2 invisible">{"Hello bye"}</div>
        ) : (
          <div className="text-[#000000] py-2 font-semibold">
            {daysLeft(new Date(), new Date(dates.from)) +
              " days until departure"}
          </div>
        )}
      </div>
      <div className="p-6 pt-3">
        <div className="flex justify-between items-center">
          <Link to={`/mytrips/${id}`}>
            <button className="bg-[#F8FAFC] border rounded-md py-2 text-black px-4 cursor-pointer hover:bg-[#FA8938] hover:text-white">
              View Details
            </button>
          </Link>
          <Popover>
            <PopoverTrigger asChild>
              <Trash2
                className="text-red-500 hover:bg-red-50 p-4 border rounded-md border-white cursor-pointer"
                size={52}
              />
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold">Delete Trip</h3>
                <p className="text-sm text-[#3E668E]">
                  Are you sure you want to delete this trip? This action cannot
                  be undone and all associated data will be lost.
                </p>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="destructive"
                    className="text-sm"
                    onClick={() => onClick()}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </Card>
  );
}

export default MyTripCard;
