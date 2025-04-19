import { createContext, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddTripCard from "./components/AddTripCard";
import MyTrips from "./components/MyTrips";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewDetails from "./components/ViewDetails";

export const MenuContext = createContext();

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MenuContext.Provider value={{ isOpen, setIsOpen }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />}></Route>
            <Route path="/addtrip" element={<AddTripCard />}></Route>
            <Route path="/mytrips" element={<MyTrips />}></Route>
            <Route path="/mytrips/:id" element={<ViewDetails />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </MenuContext.Provider>
  );
}

export default App;
