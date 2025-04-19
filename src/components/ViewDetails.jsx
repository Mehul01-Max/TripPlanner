import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import arrow from "../assets/arrow.svg";
import { Calendar, MapPin, Clock, SquarePen, Plus } from "lucide-react";
import { MenuContext } from "../App";
import { Card } from "./ui/card";
import { daysLeft, formatDate } from "../lib/index";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import ShortUniqueId from "short-unique-id";
import TodoList from "./TodoList";
function ViewDetails() {
  const { id } = useParams();
  const [tripDetail, setTripDetail] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [todo, setTodo] = useState(null);
  const [notes, setNotes] = useState(null);
  const [todoInput, setTodoInput] = useState("");
  const { isOpen, setIsOpen } = useContext(MenuContext);
  const navigate = useNavigate();
  useEffect(() => {
    const trips = localStorage.getItem("trip");
    if (trips) {
      const trip = JSON.parse(trips).filter((trip) => trip.id === id);
      if (trip.length === 1) {
        setTripDetail(trip[0]);
        setNotes(trip[0].notes);
      }
    }
    const fetchTodo = JSON.parse(localStorage.getItem("todos"));
    if (fetchTodo) {
      const filteredTodo = fetchTodo.filter((todo) => {
        return id === todo.tripId;
      });
      setTodo(filteredTodo.length === 0 ? null : filteredTodo);
    }
  }, []);
  const checkBoxClick = (id) => {
    const newTodo = todo.map((t) => {
      if (t.id === id) {
        return { ...t, isDone: !t.isDone };
      }
      return t;
    });
    setTodo(newTodo);
    localStorage.setItem("todos", JSON.stringify(newTodo));
  };
  const onDelete = (id) => {
    const newTodo = todo.filter((t) => {
      return t.id !== id;
    });
    setTodo(newTodo.length === 0 ? null : newTodo);
    localStorage.setItem("todos", JSON.stringify(newTodo));
  };
  const handleNotes = () => {
    const newTrips = JSON.parse(localStorage.getItem("trip")).map((trip) => {
      if (id == trip.id) {
        const k = { ...trip, notes };
        setTripDetail(k);
        return k;
      }
      return trip;
    });
    localStorage.setItem("trip", JSON.stringify(newTrips));
    setIsEditing(false);
  };
  const handleTodo = () => {
    const uid = new ShortUniqueId({ length: 10 });
    const todoList = JSON.parse(localStorage.getItem("todos"));
    let newTodo = [{ id: uid.rnd(), tripId: id, todoInput, isDone: false }];
    if (todoList) {
      newTodo = [
        ...todoList,
        { id: uid.rnd(), tripId: id, todoInput, isDone: false },
      ];
    }
    setTodo(newTodo);
    setTodoInput("");
    localStorage.setItem("todos", JSON.stringify(newTodo));
  };
  return (
    <>
      {!isOpen && (
        <div className="px-8 py-8 flex flex-col gap-4 max-w-(--my-max-width) mx-auto">
          <div className="group">
            <Button
              onClick={() => navigate(-1)}
              className="bg-transparent text-black border hover:bg-[#FA8938] hover:text-white cursor-pointer"
            >
              <img
                src={arrow}
                alt=""
                className="group group-hover:filter group-hover:brightness-0 group-hover:invert w-3 h-3"
              />
              Back to My Trips
            </Button>
          </div>
          {tripDetail && (
            <>
              <div className="flex flex-col gap-1 py-8">
                <h1 className="text-3xl font-extrabold">
                  {tripDetail.tripName}
                </h1>
                <p className="flex text-[#3E668E] text-[15px]">
                  <MapPin size={20} className="pr-1"></MapPin>
                  {tripDetail.destination}
                </p>
              </div>
              <div className="flex flex-col gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <h1 className="font-semibold text-2xl p-6">Trip Details</h1>
                    <div className="p-6 pt-0">
                      <div className="flex items-center gap-2 text-[#3E668E]">
                        <Calendar />
                        <div>
                          <p className="text-black text-md font-semibold">
                            Dates
                          </p>
                          <p className="text-sm">
                            {formatDate(
                              new Date(tripDetail.dates.from),
                              new Date(tripDetail.dates.to)
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[#3E668E] mt-4">
                        <Clock />
                        <div>
                          <p className="text-black text-md font-semibold">
                            Duration
                          </p>
                          <p>
                            {daysLeft(
                              new Date(tripDetail.dates.from),
                              new Date(tripDetail.dates.to)
                            ) + " days"}
                          </p>
                        </div>
                      </div>

                      {daysLeft(new Date(tripDetail.dates.to), new Date()) >
                      0 ? (
                        <div className="mt-3 p-3 bg-red-500 text-white rounded-md flex flex-col justify-center items-center">
                          <p className="font-extrabold text-xl">
                            Trip Completed
                          </p>
                        </div>
                      ) : daysLeft(
                          new Date(tripDetail.dates.from),
                          new Date()
                        ) >= 1 &&
                        daysLeft(new Date(), new Date(tripDetail.dates.to)) >=
                          0 ? (
                        <div className="mt-3 p-3 bg-green-400 text-white rounded-md flex flex-col justify-center items-center">
                          <p className="font-extrabold text-xl">
                            Enjoy your trips!!!
                          </p>
                        </div>
                      ) : daysLeft(
                          new Date(),
                          new Date(tripDetail.dates.from)
                        ) <= 0 &&
                        daysLeft(new Date(), new Date(tripDetail.dates.from)) >=
                          -1 ? (
                        <>
                          <div className="mt-3 p-3 bg-[#FA8938] text-white rounded-md flex flex-col justify-center items-center">
                            <p className="font-extrabold text-xl">
                              Today is the day! Safe travels!
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="mt-3 p-3 bg-[#E6EAEE] rounded-md flex flex-col justify-center items-center">
                            <p className="font-semibold">
                              Countdown to Departure
                            </p>
                            <p className="font-bold text-2xl">
                              {daysLeft(
                                new Date(),
                                new Date(tripDetail.dates.from)
                              ) + " days"}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </Card>
                  <Card>
                    <div className="group p-6 pb-3 flex justify-between items-center">
                      <div>
                        <h1 className="font-semibold text-2xl">Notes</h1>
                        <p className="text-[#3E668E] text-[15px]">
                          Trip notes and important information
                        </p>
                      </div>
                      {!isEditing && (
                        <div
                          className="cursor-pointer p-2 rounded-md hover:bg-[#FA8938] hover:text-white"
                          onClick={() => setIsEditing(!isEditing)}
                        >
                          <SquarePen className="cursor-pointer" />
                        </div>
                      )}
                    </div>
                    <div className="p-6 pt-0">
                      {!isEditing && (
                        <p className="text-[#3E668E] italic">
                          {tripDetail.notes === ""
                            ? "No notes added yet. Click edit to add some."
                            : tripDetail.notes}
                        </p>
                      )}
                      {isEditing && (
                        <div className="flex flex-col gap-2">
                          <Textarea
                            className="resize-none"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                          ></Textarea>
                          <div className="flex justify-end gap-2">
                            <Button
                              className="bg-[#F8FAFD] text-black border hover:bg-[#FA8938] hover:text-white cursor-pointer"
                              onClick={() => setIsEditing(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              className="bg-[#269DD8] hover:bg-[#41A6DC] text-white cursor-pointer"
                              onClick={() => handleNotes()}
                            >
                              Save Notes
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
                <Card>
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-2xl font-bold">To-Do Checklist</h1>
                        <p className="text-[#3E668E] text-[15px]">
                          Keep track of things to do before your trip
                        </p>
                      </div>
                      <p className="text-[#3E668E]">
                        {(todo !== null &&
                          todo.filter((t) => t.isDone).length) ||
                          0}{" "}
                        of {(todo !== null && todo.length) || "0"} Completed
                      </p>
                    </div>
                    {todo && (
                      <Progress
                        className="mt-2"
                        value={
                          (((todo !== null &&
                            todo.filter((t) => t.isDone).length) ||
                            0) /
                            ((todo !== null && todo.length) || 1)) *
                          100
                        }
                      />
                    )}
                  </div>
                  <div className="flex flex-col p-6 pt-0 items-center">
                    <div className="flex gap-2 w-full">
                      <Input
                        placeholder="Add a new todo item..."
                        className="placeholder:text-[#3E668E]"
                        value={todoInput}
                        onChange={(e) => setTodoInput(e.target.value)}
                        onKeyDown={(e) => {
                          e.key === "Enter" ? handleTodo() : null;
                        }}
                      ></Input>
                      <Button
                        className="bg-[#269DD8] text-white hover:bg-[#41A6DC]"
                        onClick={() => handleTodo()}
                      >
                        <Plus />
                        Add
                      </Button>
                    </div>
                    {todo && (
                      <div className="w-full">
                        {todo.map((t) => (
                          <TodoList
                            todoInput={t.todoInput}
                            isDone={t.isDone}
                            key={t.id}
                            checkBoxClick={() => checkBoxClick(t.id)}
                            onDelete={() => onDelete(t.id)}
                          />
                        ))}
                      </div>
                    )}
                    {!todo && (
                      <div className="text-[#3E668E] pt-8 pb-8">
                        No to-do items yet. Add your first one above!
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default ViewDetails;
