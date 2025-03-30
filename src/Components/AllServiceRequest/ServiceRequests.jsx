import React, { useEffect } from 'react';
import axios from 'axios';


function ServiceRequest () {

    useEffect(() => {

        if (!sessionStorage.getItem("access_token")) {
            navigate("/");
        }
        // Fetch data from backend when component mounts
        axios.get('http://api.innobot.dulanga.com/api/innobothealth/claim/getAll')
            .then(response => {
                setMembers(response.data);
            })
            .catch(error => {
                console.error('Error fetching members:', error);
            });

    }, []);

    return (

        <div className="container mx-auto p-6 bg-white dark:bg-zinc-500">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-zinc-800">
                    <thead>
                        <tr className="w-full h-16 border-text-white dark:border-zinc-200 border-b py-8">
                            <th className="text-left pl-8 pr-6 text-xs font-medium text-zinc-600 dark:text-white uppercase tracking-wider">
                                Member ID
                            </th>
                            <th className="text-left px-6 text-xs font-medium text-zinc-600 dark:text-white uppercase tracking-wider">
                                Service Type
                            </th>
                            <th className="text-left px-6 text-xs font-medium text-zinc-600 dark:text-white uppercase tracking-wider">
                                Service Description
                            </th>
                            <th className="text-left px-6 text-xs font-medium text-zinc-600 dark:text-white uppercase tracking-wider">
                                Member Name
                            </th>
                            <th className="text-left px-6 text-xs font-medium text-zinc-600 dark:text-white uppercase tracking-wider">
                                Email
                            </th>
                            <th className="text-left px-6 text-xs font-medium text-zinc-600 dark:text-white uppercase tracking-wider">
                                Contact Number
                            </th>
                            <th className="text-left px-6 text-xs font-medium text-zinc-600 dark:text-white uppercase tracking-wider">
                                Address
                            </th>
                            <th className="text-left px-6 text-xs font-medium text-zinc-600 dark:text-white uppercase tracking-wider">
                                Referral Code
                            </th>
                            <th className="text-left px-6 text-xs font-medium text-zinc-600 dark:text-white uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:text-white">
                        <tr className="text-zinc-700 dark:text-black">
                            <td className="px-8 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                                USER001
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                                Plumbing
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                                Plumbing of Kitchen Taps
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                                Theekshana, Mahesh
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                                mahesh@gmail.com
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                                0771234567
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                                New Kandy Road, Malabe
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                                Crick234
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                                <div className="flex items-center">
                                    <button className="text-green-600 hover:text-green-900 mr-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </button>
                                    <button className="text-red-600 hover:text-red-900">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ServiceRequest;