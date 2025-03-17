import React from 'react'

function inventoryPage() {
  return (
    <div className="p-6 min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-64 w-full" style={{ 
        backgroundImage: `url(https://images.pexels.com/photos/1129413/pexels-photo-1129413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl font-bold text-white text-center">Track Your Belongings in One Place.</h1>
        </div>
      </div>

      <div className="flex items-center justify-center my-6">
        <h2 className="text-3xl font-semibold text-green-600">Our Packages</h2>
      </div>


      {/* Testimonials */}
      <div className="my-12">
        <h2 className="text-3xl font-bold text-center mb-6">What Our Clients Say</h2>
        <div className="flex flex-wrap justify-center">
          <div className="bg-white p-6 shadow-lg rounded-lg max-w-sm mx-4 mb-6" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <p className="text-text">"Amazing service! The staff was very professional and my experience was top-notch."</p>
            <p className="mt-4 font-semibold">- Jane Doe</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default inventoryPage

