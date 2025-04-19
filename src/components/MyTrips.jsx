import { MenuContext } from "../App";
import React, { useContext, useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import MyTripCard from "./MyTripCard";

function MyTrips() {
  const { isOpen, setIsOpen } = useContext(MenuContext);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const storedTrips = localStorage.getItem("trip");
    if (storedTrips) {
      setTrips(JSON.parse(storedTrips));
    }
  }, []);
  const handleDelete = (id) => {
    const filteredTrips = trips.filter((trip) => trip.id != id);
    setTrips(filteredTrips);
    localStorage.setItem("trip", JSON.stringify(filteredTrips));
  };
  return (
    <>
      {!isOpen && (
        <div className="px-8 py-8 flex flex-col gap-4 max-w-(--my-max-width) mx-auto">
          <div className="flex justify-between">
            <h1 className="font-bold text-3xl">My Trips</h1>
            <Link to="/addtrip">
              <button className="py-2 px-4 bg-[#269DD8] text-white border rounded-md hover:bg-[#41A6DC]">
                Add New Trip
              </button>
            </Link>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#3E668E]" />
            <Input
              type="text"
              placeholder="Search trip by name or destination..."
              className="pl-10 text-[#3E668E] placeholder:text-[#3E668E]"
            />
          </div>
          <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
            {trips.map((trip) => (
              <MyTripCard
                key={trip.id}
                TripName={trip.tripName}
                destination={trip.destination}
                dates={trip.dates}
                onClick={() => handleDelete(trip.id)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default MyTrips;
