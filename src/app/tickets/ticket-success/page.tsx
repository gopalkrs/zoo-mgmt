import SuccessMessage from '@/components/ticket/success-message'
import TicketActions from '@/components/ticket/ticket-actions'
import TicketCard from '@/components/ticket/ticket-card'
import React from 'react'

const TicketSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <SuccessMessage />
        <TicketActions />
        <TicketCard />
        
      </div>
        
    </div>
  )
}

export default TicketSuccess