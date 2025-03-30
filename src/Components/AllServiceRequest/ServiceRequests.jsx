import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ServiceRequest() {
    const [service, setService] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem("access_token")) {
            navigate("/");
        }

        axios.get('http://localhost:8080/api/track-tidy/service/getAll')
            .then(response => {
                setService(response.data);
            })
            .catch(error => {
                console.error('Error fetching services:', error);
            });

    }, [navigate]); // Added navigate to dependencies

    return (
        <div className="container mx-auto p-6 bg-white dark:bg-zinc-500">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-zinc-800">
                    <thead>
                    <tr className="w-full h-16 border-text-white dark:border-zinc-200 border-b py-8">
                        {[
                            "Member ID", "Service Type", "Service Description",
                            "Member Name", "Email", "Contact Number",
                            "Address", "Referral Code", "Action"
                        ].map((header, index) => (
                            <th key={index} className="text-left px-6 text-xs font-medium text-zinc-600 dark:text-white uppercase tracking-wider">
                                {header}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-zinc-800 text-zinc-700 dark:text-white">
                    {service.map((item) => (
                        <tr key={item.id} className="border-b border-text-black dark:border-zinc-200">
                            <td className="px-6 py-4">{item.memberId}</td>
                            <td className="px-6 py-4">{item.serviceType}</td>
                            <td className="px-6 py-4">{item.serviceDesc}</td>
                            <td className="px-6 py-4">{item.memberName}</td>
                            <td className="px-6 py-4">{item.email}</td>
                            <td className="px-6 py-4">{item.contactNumber}</td>
                            <td className="px-6 py-4">{item.address}</td>
                            <td className="px-6 py-4">{item.referralCode}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <button className="text-green-600 hover:text-green-900 mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                                        </svg>
                                    </button>
                                    <button className="text-red-600 hover:text-red-900">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ServiceRequest;
