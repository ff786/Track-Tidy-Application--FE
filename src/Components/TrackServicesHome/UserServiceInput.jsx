import React from 'react';
import ServiceLady from './../../assets/ServiceLady.png';

const ServiceInput = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-8 rounded-xl overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between rounded-lg overflow-hidden">

        {/* Left side (Image Section with Overlay) */}
        <div
          className="relative w-full lg:w-1/2 h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${ServiceLady})` }} // Correct image path
        >
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
            <h2 className="text-2xl font-semibold text-center mb-4">Get the Best Service at Home</h2>
            <p className="text-lg text-center">
              Our experts are ready to assist you. Book now to experience top-tier service!
            </p>
          </div>
        </div>

        {/* Right side (Form Section) */}
        <div className="bg-white p-8 rounded-lg w-full lg:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-center text-primary mb-4">QuickHelp</h1>
          <p className="text-lg text-center mt-2 mb-6 text-gray-700">
            Reliable care for your home at your fingertips using experienced and trusted Service Professionals
          </p>
          <div className="text-center mt-6">
            <span className="text-muted">5,000+ Customers</span>
            <span className="mx-4">•</span>
            <span className="text-muted">14,000+ Jobs Done</span>
            <span className="mx-4">•</span>
            <span className="text-muted">4.7 Positive Ratings</span>
          </div>

          <div className="mt-8 space-y-6">
            <h2 className="text-xl font-semibold text-center mb-4">Book your service provider now!</h2>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">1. Service Details</h3>
              <div className="form-group">
                <label className="text-muted mb-2 block">Service Required (Select)*</label>
                <select className="form-control block w-full border border-gray-300 rounded-lg p-3 bg-gray-50">
                  <option value="">Select...</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="electrician">Electrician</option>
                </select>
              </div>

              <div className="form-group">
                <label className="text-muted mb-2 block">Tell us a little bit about the job*</label>
                <textarea
                  className="form-control block w-full border border-gray-300 rounded-lg p-3 bg-gray-50"
                  rows="4"
                  required
                  placeholder="Describe the service required..."
                ></textarea>
              </div>
            </div>

            <div className="text-center mt-6">
              <button className="btn btn-primary w-full py-2 rounded-lg hover:bg-primary-dark transition duration-200">
                Next
              </button>
            </div>

            <div className="mt-4 text-center">
              <span className="text-muted">Mail us instead</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceInput;
