import React from "react";
import {motion} from 'framer-motion';
import ServiceInput from "./UserServiceInput.jsx";
import BookService from "./BookService.jsx";
import ExploreService from "./ExploreService.jsx";
import QAService from "./Q&A-Serivice.jsx";
import TopHeader from "../common/TopHeader/TopHeader.jsx";
import Footer from "../common/Footer/Footer.jsx";

const UserServices = () => {
    return (
        <>
            <TopHeader />
            <motion.div className="relative flex-col bg-green-50 overflow-x-hidden">

                {/* Hero Section */}
                <motion.div
                    className="bg-green-900 shadow-md rounded-lg p-6 hover:shadow-xl transition duration-200"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5 }}
                >
                    <ServiceInput />
                </motion.div>

                {/* Service Booking */}
                <section className="mt-10">
                    <motion.div
                        className="bg-green-800 shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.5 }}
                    >
                        <BookService />
                    </motion.div>
                </section>

                {/* Explore Services */}
                <section className="mt-10">
                    <motion.div
                        className="bg-green-800 shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ExploreService />
                    </motion.div>
                </section>

                {/* Q&A Section */}
                <section className="mt-10">
                    <motion.div
                        className="bg-green-100 shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.5 }}
                    >
                        <QAService />
                    </motion.div>
                </section>

                {/* Footer */}
                <Footer />
            </motion.div>
        </>
    );
};

export default UserServices;
