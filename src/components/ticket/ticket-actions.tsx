"use client"
import { Download, Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const TicketActions = () => {


    const handleDownloadTicket = () => {
    // In a real app, this would generate and download a PDF ticket
    alert('Ticket download started! Check your downloads folder.');
  };

  return (
    <div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={handleDownloadTicket}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Ticket
          </button>
          {/* <button
            onClick={handleEmailTicket}
            className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            <Mail className="w-5 h-5 mr-2" />
            Email Ticket
          </button> */}
          <button
            className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            <Link href={'/tickets'}>
                <Home className="w-5 h-5 mr-2" />
                Book Another Visit
            </Link>
          </button>
        </div>
    </div>
  )
}

export default TicketActions