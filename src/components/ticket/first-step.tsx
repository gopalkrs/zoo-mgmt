"use client";
import { useCreateTicket } from "@/queries/create-ticket-api";
import { Calendar, Minus, Plus, Shield, Star, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTicketStore } from "@/store/ticket-store";

type TicketType = "adult" | "child";
const FirstStep = () => {
  const router = useRouter();
  const setTicket = useTicketStore((state)=>state.setTicket);
  const [selectedDate, setSelectedDate] = useState("");

  const { mutate: createTicket } = useCreateTicket();

  const handleCreate = () => {
    createTicket(
      {
        numberOfAdults: ticketCounts.adult,
        numberOfChildren: ticketCounts.child,
        totalPrice: calculateTotal(),
        dateOfVisit: new Date(selectedDate),
      },
      {
        onSuccess: (data) => {
          console.log("Ticket created successfully:", data);
          setTicket(data?.ticket);
          router.push("/tickets/ticket-success");
          router.refresh();
        },
      }
    );
  };

  const ticketTypes: {
    type: TicketType;
    label: string;
    price: number;
    description: string;
  }[] = [
    {
      type: "adult",
      label: "Adult (16+)",
      price: 100,
      description: "General admission",
    },
    {
      type: "child",
      label: "Child (3-15)",
      price: 50,
      description: "General admission",
    },
  ];

  const [ticketCounts, setTicketCounts] = useState<Record<TicketType, number>>({
    adult: 0,
    child: 0,
  });

  const updateTicketCount = (type: TicketType, change: number) => {
    setTicketCounts((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + change),
    }));
  };

  const calculateTotal = () => {
    const ticketTotal = ticketTypes.reduce(
      (sum, ticket) => sum + ticketCounts[ticket.type] * ticket.price,
      0
    );
    return ticketTotal;
  };

  const getTotalTickets = () => {
    return Object.values(ticketCounts).reduce((sum, count) => sum + count, 0);
  };

  return (
    <div className="space-y-8">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Choose Date */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  1
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Choose your preferred date
                </h2>
              </div>

              <div className="max-w-md">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select visit date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                />
              </div>
            </div>
            {/* Step 2: Select Tickets */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  2
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Select tickets
                </h2>
              </div>

              <div className="space-y-4">
                {ticketTypes.map((ticket) => (
                  <div
                    key={ticket.type}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {ticket.label}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {ticket.description}
                      </p>
                      <p className="text-lg font-bold text-green-600">
                        ₹{ticket.price}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateTicketCount(ticket.type, -1)}
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {ticketCounts[ticket.type]}
                      </span>
                      <button
                        onClick={() => updateTicketCount(ticket.type, 1)}
                        className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-4">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Booking Summary
                </h3>

                {/* Selected Date & Time */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3" />
                    <span>{selectedDate || "Select date"}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-3" />
                    <span>{getTotalTickets()} guests</span>
                  </div>
                </div>

                {/* Ticket Breakdown */}
                <div className="border-t pt-4 mb-6">
                  <h4 className="font-semibold mb-3">Tickets</h4>
                  {ticketTypes.map(
                    (ticket) =>
                      ticketCounts[ticket.type] > 0 && (
                        <div
                          key={ticket.type}
                          className="flex justify-between mb-2"
                        >
                          <span>
                            {ticketCounts[ticket.type]}x {ticket.label}
                          </span>
                          <span>
                            ₹
                            {(ticketCounts[ticket.type] * ticket.price).toFixed(
                              2
                            )}
                          </span>
                        </div>
                      )
                  )}
                </div>
                {/* Total */}
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total</span>
                    <span className="text-green-600">
                      ₹{calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Book Button */}
                <button
                  disabled={!selectedDate || getTotalTickets() === 0}
                  className="w-full bg-gradient-to-r from-green-600 to-orange-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 cursor-pointer disabled:transform-none"
                  onClick={handleCreate}
                >
                  Book Now
                </button>

                {/* Trust Indicators */}
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-1" />
                      Secure
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      4.9/5
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstStep;
