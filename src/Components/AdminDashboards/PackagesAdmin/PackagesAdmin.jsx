import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Trash2, ArrowRight } from 'lucide-react';

function PackagesAdmin() {
    const [packages, setPackages] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem("access_token")) {
            navigate("/");
        }

        axios.get('http://localhost:8080/api/track-tidy/package/getAll')
            .then(response => {
                setPackages(response.data);
            })
            .catch(error => {
                console.error('Error fetching packages:', error);
            });
    }, [navigate]);

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this package?")) return;

        axios.delete(`http://localhost:8080/api/track-tidy/package/delete?id=${id}`)
            .then(() => {
                setPackages(packages.filter(pkg => pkg.id !== id));
            })
            .catch(error => {
                console.error('Error deleting package:', error);
            });
    };

    const handleExtend = (id) => {

        axios.post(`http://localhost:8080/api/track-tidy/package/extend/${id}`)
            .then(() => {
                alert("Package extended for another month.");
            })
            .catch(error => {
                console.error('Error extending package:', error);
            });
    };

    const filteredPackages = packages.filter(pkg =>
        (pkg.email?.toLowerCase() ?? '').includes(search.toLowerCase())
    );

    return (
        <div className="p-6 bg-green-800 min-h-screen text-green-50">
            <h2 className="text-2xl font-semibold mb-6">User Packages</h2>

            {/* Search */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Email"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 rounded-lg text-green-800 bg-green-200 w-full"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-green-900 rounded-xl shadow-lg">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-green-700 text-green-100 uppercase text-xs">
                    <tr>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Package Type</th>
                        <th className="px-4 py-3">Total Budget</th>
                        <th className="px-4 py-3">Inventory Budget</th>
                        <th className="px-4 py-3">Grocery Budget</th>
                        <th className="px-4 py-3">Services Budget</th>
                        <th className="px-4 py-3">Subscribed Date</th>
                        <th className="px-4 py-3">Action</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-green-700">
                    {filteredPackages.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center py-6 text-green-300">
                                No packages found.
                            </td>
                        </tr>
                    ) : (
                        filteredPackages.map((pkg, idx) => (
                            <tr key={pkg.id} className={`${idx % 2 === 0 ? 'bg-green-800' : 'bg-green-900'} hover:bg-green-700 transition`}>
                                <td className="px-4 py-3">{pkg.userId}</td>
                                <td className="px-4 py-3">{pkg.packageType}</td>
                                <td className="px-4 py-3">{pkg.packageValue}</td>
                                <td className="px-4 py-3">{pkg.inventoryValue}</td>
                                <td className="px-4 py-3">{pkg.groceryValue}</td>
                                <td className="px-4 py-3">{pkg.serviceValue}</td>
                                <td className="px-4 py-3">{pkg.subscribeDate}</td>
                                <td className="px-4 py-3 flex flex-row">
                                    <button
                                        onClick={() => handleExtend(pkg.id)}
                                        className="text-blue-400 hover:text-blue-200 mr-4"
                                        title="Extend Package"
                                    >
                                        <ArrowRight size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(pkg.id)}
                                        className="text-red-500 hover:text-red-300"
                                        title="Delete Package"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PackagesAdmin;
