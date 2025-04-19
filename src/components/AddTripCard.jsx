import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ShortUniqueId from "short-unique-id";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import DatePickerWithRange from "./ui/date-select";
import { Textarea } from "./ui/textarea";
import { useContext } from "react";
import { MenuContext } from "../App";
import { Navigate, useNavigate } from "react-router-dom";
const formSchema = z.object({
  tripName: z.string().min(2, {
    message: "Trip name must be at least 2 characters.",
  }),
  destination: z.string().min(2, {
    message: "Destination must be at least 2 characters.",
  }),
  dates: z
    .object({
      from: z.date({
        required_error: "Start date is required",
      }),
      to: z.date({
        required_error: "End date is required",
      }),
    })
    .refine((data) => data.from <= data.to, {
      message: "End date cannot be earlier than start date",
      path: ["to"],
    }),
  notes: z.string().optional(),
});

export default function AddTripCard() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tripName: "",
      destination: "",
      dates: {
        from: undefined,
        to: undefined,
      },
      notes: "",
    },
  });
  const navigate = useNavigate();
  function onSubmit(values) {
    const trip = localStorage.getItem("trip");
    const uid = new ShortUniqueId({ length: 10 });
    localStorage.setItem(
      "trip",
      trip
        ? JSON.stringify([...JSON.parse(trip), { id: uid.rnd(), ...values }])
        : JSON.stringify([{ id: uid.rnd(), ...values }])
    );
    navigate("/mytrips");
  }
  const { isOpen, setIsOpen } = useContext(MenuContext);
  return (
    <>
      {!isOpen && (
        <div className="flex flex-col gap-3 max-w-2xl py-[50px] mx-auto p-4">
          <h1 className="font-extrabold text-3xl ">Plan a New Trip</h1>
          <p className="text-[#3E668E] text-lg">
            Fill in the details below to create your new trip
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 my-4 w-full"
            >
              <div className="flex sm:flex-row gap-4 w-full flex-col">
                <FormField
                  control={form.control}
                  name="tripName"
                  className="flex-1"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Trip Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Summer Vacation"
                          className="text-[#3E668E] placeholder:text-[#3E668E]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-[#3E668E]">
                        Give your trip a memorable name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="destination"
                  className="flex-1"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Destination</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Paris, France"
                          {...field}
                          className="text-[#3E668E] placeholder:text-[#3E668E]"
                        />
                      </FormControl>
                      <FormDescription className="text-[#3E668E]">
                        Where are you going?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="dates"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Trip Dates</FormLabel>
                    <FormControl>
                      <DatePickerWithRange
                        selected={field.value}
                        onSelect={field.onChange}
                        className="w-full text-[#3E668E] placeholder:text-[#3E668E]"
                      />
                    </FormControl>
                    <FormDescription className="text-[#3E668E]">
                      Select your trip start and end dates
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any additional notes about your trip..."
                        {...field}
                        className="text-[#3E668E] placeholder:text-[#3E668E] resize-none"
                      />
                    </FormControl>
                    <FormDescription className="text-[#3E668E]">
                      Add any important details, plans, or reminders for your
                      trip
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-[#269DD8]">
                Create Trip
              </Button>
            </form>
          </Form>
        </div>
      )}
    </>
  );
}
