import { MenuContext } from "../App";
import React, { useContext, useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Search, AlertCircle, Delete } from "lucide-react";
import { Link } from "react-router-dom";
import MyTripCard from "./MyTripCard";
import { Button } from "./ui/button";
import DeletePopup from "./DeletePopup";
import { Popover } from "./ui/popover";
function MyTrips() {
  const { isOpen, setIsOpen } = useContext(MenuContext);
  const [trips, setTrips] = useState([]);
  const [search, setSearch] = useState("");
  // const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const storedTrips = localStorage.getItem("trip");
    if (storedTrips) {
      setTrips(JSON.parse(storedTrips));
    }
  }, []);
  const handleDelete = (id) => {
    // setShowPopup(true);
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
            {trips.map(
              (trip) =>
                (trip.tripName.toLowerCase().includes(search) ||
                  trip.destination.toLowerCase().includes(search)) && (
                  <MyTripCard
                    key={trip.id}
                    id={trip.id}
                    TripName={trip.tripName}
                    destination={trip.destination}
                    dates={trip.dates}
                    onClick={() => handleDelete(trip.id)}
                  />
                )
            )}
          </div>
          {trips.length === 0 ? (
            <div className="flex flex-col justify-center items-center mt-6 py-10 max-w-md m-auto">
              <div className="bg-[#E6EAEE] rounded-full p-3 mb-4">
                <AlertCircle />
              </div>
              <div className="font-bold text-xl mb-2">No trips found</div>
              <div className="text-[#3E668E] text-center mb-6">
                You haven't added any trips yet. Start planning your next
                adventure now!
              </div>
              <Link to="/addtrip">
                <Button className="bg-[#269DD8] text-white hover:bg-[#41A6DC] rounded-md">
                  Create Your Frist Trip
                </Button>
              </Link>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}

export default MyTrips;
