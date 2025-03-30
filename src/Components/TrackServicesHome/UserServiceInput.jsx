import React, { useState } from "react";
import ServiceLady from "../../assets/ServiceLady.png";

const ServiceInput = () => {
    const [serviceDesc, setServiceDesc] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [memberId, setMemberId] = useState("");
    const [memberName, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [referralCode, setReferralCode] = useState("");
    const [error, setError] = useState("");
    const [step, setStep] = useState(1);

    const handleNext = () => {
        if (!serviceDesc.trim()) {
            setError("Job description is required");
            return;
        }
        setError("");
        setStep(2);
    };

    const handleSubmit = async () => {
        // Validate all the fields
        if (!memberId || !memberName || !address || !email || !phoneNumber) {
            setError("Please fill in all fields.");
            return;
        }
        setError(""); // Clear any previous error messages

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

            // Handle success (you can redirect or show a success message)
            alert("Service request submitted successfully!");
            setStep(1); // Reset the form or navigate elsewhere
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div
            className="relative max-w-full h-auto md:h-120 p-4"
            style={{
                backgroundImage: `url(${ServiceLady})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                borderRadius: "15px",
                backgroundPosition: "top-left",
            }}
        >
            <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-between gap-10 md:gap-20 p-5">
                <div className="relative text-black text-left md:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">Track Tidy Services</h2>
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
                        Reliable care for your home <br />
                        at your fingertips <span className="text-lg font-semibold">using experienced and</span>
                    </h1>
                    <p className="text-lg md:text-xl mb-6">trusted Service Professionals</p>
                </div>

                <div className="relative w-full md:max-w-md bg-white opacity-90 rounded-lg shadow-lg p-5">
                    <div className="bg-black text-white text-lg p-3 rounded-t-lg opacity-80 flex items-center">
                        <h3 className="text-md md:text-lg font-medium">
                            {step === 1 ? "Book your service provider now!" : "Enter Your Details"}
                        </h3>
                    </div>

                    <div className="p-4">
                        <div className="flex mb-6 justify-center md:justify-start">
                            <div className={`flex items-center ${step === 1 ? 'text-blue-500' : 'opacity-50'}`}>
                                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                                    1
                                </div>
                                <span className="ml-2 text-sm font-medium">Service Details</span>
                            </div>
                            <div className="flex-1"></div>
                            <div className={`flex items-center ${step === 2 ? 'text-blue-500' : 'opacity-50'}`}>
                                <div className={`w-8 h-8 rounded-full ${step === 2 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'} flex items-center justify-center font-bold`}>
                                    2
                                </div>
                                <span className="ml-2 text-sm font-medium">Your Details</span>
                            </div>
                        </div>

                        {step === 1 ? (
                            <div className="space-y-4">
                                <div>
                                    <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} className="block w-full bg-white border border-gray-300 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring focus:border-blue-300 text-gray-700">
                                        <option value="" disabled selected hidden>
                                            Select the required service
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
                                </div>

                                <div>
                                    <textarea
                                        className="w-full h-32 px-4 py-2 border border-gray-300 rounded shadow focus:outline-none focus:ring focus:border-blue-300 text-gray-700"
                                        placeholder="Tell us a little bit about the job*"
                                        value={serviceDesc}
                                        onChange={(e) => setServiceDesc(e.target.value)}
                                    ></textarea>
                                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                                </div>

                                <div className="flex justify-between items-center">
                                    <button onClick={handleNext} className="w-full md:w-auto bg-black text-white py-2 px-6 rounded font-medium hover:bg-gray-800 transition">
                                        Next
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded shadow focus:outline-none focus:ring focus:border-blue-300 text-gray-700"
                                    type="text"
                                    placeholder="Member ID"
                                    value={memberId}
                                    onChange={(e) => setMemberId(e.target.value)}
                                />
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded shadow focus:outline-none focus:ring focus:border-blue-300 text-gray-700"
                                    type="text"
                                    placeholder="Name"
                                    value={memberName}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded shadow focus:outline-none focus:ring focus:border-blue-300 text-gray-700"
                                    type="text"
                                    placeholder="Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded shadow focus:outline-none focus:ring focus:border-blue-300 text-gray-700"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded shadow focus:outline-none focus:ring focus:border-blue-300 text-gray-700"
                                    type="text"
                                    placeholder="Contact Number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded shadow focus:outline-none focus:ring focus:border-blue-300 text-gray-700"
                                    type="text"
                                    placeholder="Referral Code"
                                    value={referralCode}
                                    onChange={(e) => setReferralCode(e.target.value)}
                                />

                                <div className="flex justify-between items-center">
                                    <button onClick={() => setStep(1)} className="w-full md:w-auto bg-gray-500 text-white py-2 px-6 rounded font-medium hover:bg-gray-700 transition">
                                        Previous
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        className="w-full md:w-auto bg-black text-white py-2 px-6 rounded font-medium hover:bg-gray-800 transition"
                                    >
                                        Book Service
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceInput;
