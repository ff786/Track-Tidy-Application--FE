import React, { useState } from "react";
import { motion } from 'framer-motion';
import Plumbing from "../../assets/plumbingsvrc.png";

const ServiceInput = () => {
    const [serviceDesc, setServiceDesc] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [memberId, setMemberId] = useState("");
    const [memberName, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [referralCode, setReferralCode] = useState("");
    const [errors, setErrors] = useState({});
    const [step, setStep] = useState(1);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // Validation functions
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhone = (phone) => {
        const re = /^\d{10}$/;
        return re.test(phone);
    };

    const handleNext = () => {
        const newErrors = {};

        if (!serviceDesc.trim()) {
            newErrors.serviceDesc = "Job description is required";
        }

        if (!serviceType) {
            newErrors.serviceType = "Please select a service type";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setStep(2);
        }
    };

    const validateStep2 = () => {
        const newErrors = {};

        if (!memberId.trim()) {
            newErrors.memberId = "Member ID is required";
        }

        if (!memberName.trim()) {
            newErrors.memberName = "Name is required";
        }

        if (!address.trim()) {
            newErrors.address = "Address is required";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required";
        } else if (!validatePhone(phoneNumber)) {
            newErrors.phoneNumber = "Phone number must be 10 digits";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleOpenConfirmModal = () => {
        if (validateStep2()) {
            setShowConfirmModal(true);
        }
    };

    const handleSubmit = async () => {
        setShowConfirmModal(false);

        const formData = new URLSearchParams();
        formData.append("jobDescription", serviceDesc);
        formData.append("memberId", memberId);
        formData.append("memberName", memberName);
        formData.append("address", address);
        formData.append("email", email);
        formData.append("phoneNumber", phoneNumber);
        formData.append("referralCode", referralCode);
        formData.append("serviceType", serviceType);
        formData.append("serviceDesc", serviceDesc);

        try {
            const response = await fetch("http://localhost:8080/api/track-tidy/service/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
                },
                body: formData.toString(),
            });

            if (!response.ok) {
                throw new Error("Failed to submit the service request");
            }

            alert("Service request submitted successfully!");
            // Reset form
            setServiceDesc("");
            setServiceType("");
            setMemberId("");
            setName("");
            setAddress("");
            setEmail("");
            setPhoneNumber("");
            setReferralCode("");
            setStep(1);
        } catch (error) {
            setErrors({ submit: error.message });
        }
    };

    return (
        <motion.div
            className="relative max-w-full h-auto md:h-120 p-4"
            style={{
                backgroundImage: `url(${Plumbing})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                borderRadius: "15px",
                backgroundPosition: "top-left",
            }}
        >
            <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-between gap-10 md:gap-80 p-5">
                <div className="relative bg-zinc-300 text-white text-left md:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">Track Tidy Services</h2>
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
                        Reliable care for your home <br />
                        at your fingertips <span className="text-lg font-semibold">using experienced and</span>
                    </h1>
                    <p className="text-lg md:text-xl mb-6">trusted Service Professionals</p>
                </div>

                <div className="relative w-full md:max-w-md bg-green-50 opacity-90 rounded-lg shadow-lg p-5">
                    <div className="bg-green-800 text-white text-lg p-3 rounded-t-lg opacity-90 flex items-center transform transition-transform duration-300 hover:scale-105">
                        <h3 className="text-md md:text-lg font-medium">
                            {step === 1 ? "Book your service provider now!" : "Enter Your Details"}
                        </h3>
                    </div>

                    <div className="p-4">
                        <div className="flex mb-6 justify-center md:justify-start">
                            <div className={`flex items-center ${step === 1 ? 'text-green-800' : 'opacity-50'}`}>
                                <div className="w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center font-bold">
                                    1
                                </div>
                                <span className="ml-2 text-sm font-medium">Service Details</span>
                            </div>
                            <div className="flex-1"></div>
                            <div className={`flex items-center ${step === 2 ? 'text-green-800' : 'opacity-50'}`}>
                                <div className={`w-8 h-8 rounded-full ${step === 2 ? 'bg-green-800 text-white' : 'bg-gray-300 text-gray-600'} flex items-center justify-center font-bold`}>
                                    2
                                </div>
                                <span className="ml-2 text-sm font-medium">Your Details</span>
                            </div>
                        </div>

                        {step === 1 ? (
                            <div className="space-y-4">
                                <div>
                                    <select
                                        value={serviceType}
                                        onChange={(e) => setServiceType(e.target.value)}
                                        className={`block w-full bg-white border ${errors.serviceType ? 'border-red-500' : 'border-green-200'} px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring focus:border-green-100 text-gray-500`}
                                    >
                                        <option value="" disabled selected hidden>
                                            Select the required service *
                                        </option>
                                        <option value="HomeCleaning">Home Cleaning</option>
                                        <option value="SofaCleaning">Sofa Cleaning</option>
                                        <option value="CarpetCleaning">Carpet Cleaning</option>
                                        <option value="MattressCleaning">Mattress Cleaning</option>
                                        <option value="AirConditioning">Air Conditioning</option>
                                        <option value="WashingMachine">Washing Machine Repairing</option>
                                        <option value="Refrigerator">Refrigerator Repairing</option>
                                        <option value="TVRepair">TV Repairing</option>
                                        <option value="electrical">Electrical Work</option>
                                        <option value="plumbing">Plumbing</option>
                                        <option value="painting">Painting</option>
                                        <option value="gardening">Gardening</option>
                                        <option value="floorPolishing">Floor Polishing</option>
                                        <option value="handyman">Handyman</option>
                                    </select>
                                    {errors.serviceType && (
                                        <p className="text-red-500 text-sm mt-1">{errors.serviceType}</p>
                                    )}
                                </div>

                                <div>
                                    <textarea
                                        className={`w-full h-32 px-4 py-2 border ${errors.serviceDesc ? 'border-red-500' : 'border-gray-300'} rounded shadow focus:outline-none focus:ring focus:border-green-100 text-gray-700`}
                                        placeholder="Tell us a little bit about the job *"
                                        value={serviceDesc}
                                        onChange={(e) => setServiceDesc(e.target.value)}
                                    ></textarea>
                                    {errors.serviceDesc && (
                                        <p className="text-red-500 text-sm mt-1">{errors.serviceDesc}</p>
                                    )}
                                </div>

                                <div className="flex justify-between items-center">
                                    <button
                                        onClick={handleNext}
                                        className="w-full md:w-auto bg-green-800 text-white py-2 px-6 rounded font-medium hover:bg-green-700 transform transition-transform duration-300 hover:scale-105"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <input
                                        className={`w-full px-4 py-2 border ${errors.memberId ? 'border-red-500' : 'border-gray-300'} rounded shadow focus:outline-none focus:ring focus:border-green-100 text-gray-700`}
                                        type="text"
                                        placeholder="Member ID *"
                                        value={memberId}
                                        onChange={(e) => setMemberId(e.target.value)}
                                    />
                                    {errors.memberId && (
                                        <p className="text-red-500 text-sm mt-1">{errors.memberId}</p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        className={`w-full px-4 py-2 border ${errors.memberName ? 'border-red-500' : 'border-gray-300'} rounded shadow focus:outline-none focus:ring focus:border-green-100 text-gray-700`}
                                        type="text"
                                        placeholder="Name *"
                                        value={memberName}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    {errors.memberName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.memberName}</p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        className={`w-full px-4 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded shadow focus:outline-none focus:ring focus:border-green-100 text-gray-700`}
                                        type="text"
                                        placeholder="Address *"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                    {errors.address && (
                                        <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded shadow focus:outline-none focus:ring focus:border-green-100 text-gray-700`}
                                        type="email"
                                        placeholder="Email *"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        className={`w-full px-4 py-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded shadow focus:outline-none focus:ring focus:border-green-100 text-gray-700`}
                                        type="tel"
                                        placeholder="Phone Number *"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                    {errors.phoneNumber && (
                                        <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        className={`w-full px-4 py-2 border ${errors.referralCode ? 'border-red-500' : 'border-gray-300'} rounded shadow focus:outline-none focus:ring focus:border-green-100 text-gray-700`}
                                        type="text"
                                        placeholder="Referral Code (Optional)"
                                        value={referralCode}
                                        onChange={(e) => setReferralCode(e.target.value)}
                                    />
                                    {errors.referralCode && (
                                        <p className="text-red-500 text-sm mt-1">{errors.referralCode}</p>
                                    )}
                                </div>

                                <div className="flex justify-between items-center mt-6">
                                    <button
                                        onClick={handleOpenConfirmModal}
                                        className="w-full md:w-auto bg-green-800 text-white py-2 px-6 rounded font-medium hover:bg-green-700 transform transition-transform duration-300 hover:scale-105"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showConfirmModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white text-gray-800 p-8 rounded-lg shadow-xl w-96">
                        <h2 className="text-xl font-semibold mb-4">Confirm Your Details</h2>
                        <p>Please confirm that all details are correct before submitting your service request.</p>
                        <div className="flex justify-between mt-6">
                            <button
                                onClick={handleSubmit}
                                className="bg-green-800 text-white py-2 px-6 rounded font-medium hover:bg-green-700"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="bg-gray-500 text-white py-2 px-6 rounded font-medium hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default ServiceInput;
