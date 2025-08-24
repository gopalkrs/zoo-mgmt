"use client";
import { useTicketStore } from "@/store/ticket-store";
import { Calendar, MapPin, Phone, QrCode, Users } from "lucide-react";
import React, { useState } from "react";

const TicketCard = () => {
  const [bookingData] = useState({
    dateOfVisit: "2025-08-25T00:00:00.000Z",
    numberOfAdults: 0,
    numberOfChildren: 3,
    totalPrice: 150,
    _id: "68aad84a4000238352c4e8d3",
    qrCode: "QR123456789",
  });

  const ticket = useTicketStore((state)=>state.ticket);

  if (!ticket) {
    return <div>No ticket data found.</div>;
  }

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl mx-auto">
        {/* Ticket Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold mb-1">Wild Adventure Zoo</h3>
              <p className="text-green-100">Your Gateway to Wildlife</p>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90 mb-1">Booking ID</div>
              <div className="font-mono font-bold">{ticket._id}</div>
            </div>
          </div>
        </div>

        {/* Ticket Body */}
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Visit Details */}
            <div className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Visit Date</div>
                    <div className="font-semibold">
                      {new Date(ticket.dateOfVisit).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Users className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Total Guests</div>
                    <div className="font-semibold">
                      {(ticket?.numberOfAdults) +
                        (ticket?.numberOfChildren)}{" "}
                      People
                    </div>
                  </div>
                </div>
              </div>

              {/* Ticket Breakdown */}
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Ticket Details
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{ticket.numberOfAdults}x Adult</span>
                    <span>{ticket.numberOfChildren}x Child</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                    <span>Total Paid</span>
                    <span className="text-green-600">
                      ₹{ticket.totalPrice}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-6">
              <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                <QrCode className="w-24 h-24 text-gray-800" />
              </div>
              <p className="text-xs text-center text-gray-600 mb-2">
                Scan at entrance
              </p>
              <p className="text-xs font-mono text-gray-500">
                {bookingData.qrCode}
              </p>
            </div>
          </div>
        </div>

        {/* Ticket Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
            <div className="flex items-center mb-2 sm:mb-0">
              <MapPin className="w-4 h-4 mr-1" />
              Wildlife Drive, Navi Mumbai, 400124
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-1" />
              +91-7556789000
            </div>
          </div>
        </div>
      </div>

      {/* Important Information */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6 max-w-2xl mx-auto">
        <h4 className="font-semibold text-yellow-800 mb-3">
          Important Information
        </h4>
        <ul className="text-sm text-yellow-700 space-y-2">
          <li>• Please arrive 15 minutes before your visit time</li>
          <li>• Show this ticket (digital or printed) at the entrance</li>
          <li>
            • Children under 3 enter free but must be accompanied by an adult
          </li>
          <li>• Outside food and drinks are not permitted</li>
          <li>
            • For any changes or cancellations, contact us at least 24 hours in
            advance
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TicketCard;
