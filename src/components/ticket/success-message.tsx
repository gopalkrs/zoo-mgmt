import { Check } from 'lucide-react'
import React from 'react'

const SuccessMessage = () => {
  return (
    <div>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ticket Booked Successfully!</h2>
          <p className="text-lg text-gray-600 mb-2">
            Your zoo adventure is confirmed. We can&apos;t wait to see you!
          </p>
          <p className="text-sm text-gray-500">
            Booking ID: <span className="font-mono font-semibold">12344313</span>
          </p>
        </div>
    </div>
  )
}

export default SuccessMessage