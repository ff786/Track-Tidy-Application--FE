import React from "react";
import ServiceInput from "./UserServiceInput.jsx";
import BookService from "./BookService.jsx";
import ExploreService from "./ExploreService.jsx";
import QAService from "./Q&A-Serivice.jsx";
import DIYSection from "./DIYService.jsx";

const UserServices = () => {
    return (
        <div className="relative flex-col">

            {/* Hero Section */}
            {/*<section className="max-w-max">*/}
                <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300">
                    <ServiceInput />
             </div>
            {/*   </section>*/}

            {/* Service Booking */}
            <section className="mt-10">
                <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300">
                    <BookService />
                </div>
            </section>

            {/* Explore Services */}
            <section className="mt-10">
                <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300">
                    <ExploreService />
                </div>
            </section>

            {/* Q&A Section */}
            <section className="mt-10">
                <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300">
                    <QAService />
                </div>
            </section>

            {/* DIY Section */}
            <section className="mt-10">
                <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300">
                    <DIYSection />
                </div>
            </section>

        </div>
    );
};

export default UserServices;
