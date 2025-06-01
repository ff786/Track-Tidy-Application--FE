import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Trash2, Pencil, Save, X, Check} from 'lucide-react';
import Papa from 'papaparse';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2';

function UserList() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [editRowId, setEditRowId] = useState(null);
    const [editedData, setEditedData] = useState({});

    const handleCancelClick = () => {
        setEditRowId(null);
        setEditedData({});
    };

    useEffect(() => {
        if (!sessionStorage.getItem("access_token")) {
            navigate("/");
        }

        axios.get('http://localhost:8080/api/track-tidy/admin/getAll')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, [navigate]);

    const handleEditClick = (user) => {
        setEditRowId(user.id);
        setEditedData({ ...user });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditUser = async (id) => {
        // Replace window.confirm with Swal
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to save these changes?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#15803d',
            cancelButtonColor: '#dc2626',
            confirmButtonText: 'Yes, save it!'
        });

        if (!result.isConfirmed) return;

        const updatedUser = {
            firstName: editedData.firstName,
            lastName: editedData.lastName,
            email: editedData.email,
            mobileNumber: editedData.mobileNumber,
            role: editedData.role,
        };

        try {
            await axios.put(
                `http://localhost:8080/api/track-tidy/admin/update/${id}`,
                updatedUser,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
                    }
                }
            );

            setUsers(prev =>
                prev.map(user => (user.id === id ? { ...editedData } : user))
            );
            setEditRowId(null);
            setEditedData({});

            // Show success message
            await Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: 'User information has been updated successfully.',
                timer: 1500,
                showConfirmButton: false
            });

        } catch (error) {
            console.error("Error updating user:", error);
            // Show error message
            await Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to update user information.',
                confirmButtonColor: '#15803d'
            });
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15803d', // green-700
            cancelButtonColor: '#dc2626', // red-600
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/api/track-tidy/admin/delete/${id}`)
                    .then(() => {
                        setUsers(users.filter(user => user.id !== id));
                        Swal.fire(
                            'Deleted!',
                            'Item has been deleted successfully.',
                            'success'
                        );
                    })
                    .catch(error => {
                        console.error('Error deleting user:', error);
                        Swal.fire(
                            'Error!',
                            'Failed to delete the item.',
                            'error'
                        );
                    });
            }
        });
    };

    const filteredUsers = users.filter(user =>
        user.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
    );

    const generateCSV = () => {
        const csvData = filteredUsers.map(user => ({
            "First Name": user.firstName,
            "Last Name": user.lastName,
            "Email": user.email,
            "Contact Number": user.mobileNumber,
            "Role": user.role,
        }));

        const csv = Papa.unparse(csvData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "user_list_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const generatePDF = () => {
        console.log('Generate PDF button clicked!');
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("User List Report", 20, 20);

        const tableColumn = [
            "First Name", "Last Name", "Email", "Contact Number", "Role"
        ];

        const tableRows = filteredUsers.map(user => [
            user.firstName,
            user.lastName,
            user.email,
            user.mobileNumber,
            user.role,
        ]);

        try {
            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 30,
                styles: { fontSize: 10 },
                headStyles: { fillColor: [34, 139, 34] } // Optional green header
            });
            doc.save("user_list_report.pdf");
            console.log('PDF generated successfully!');
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    return (
        <div className="p-6 bg-green-800 text-green-50 rounded-xl pb-6 max-h-fit">
            <h2 className="text-2xl font-semibold mb-6">User List</h2>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Name or Email"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 rounded-lg text-green-800 bg-green-200 w-full"
                />
            </div>

            {/* Generate Report Buttons */}
            <div className="mb-6">
                <button
                    onClick={generateCSV}
                    className="bg-green-600 text-green-50 py-2 px-4 rounded-lg hover:bg-green-500 transition mr-4"
                >
                    Generate CSV Report
                </button>
                <button
                    onClick={generatePDF}
                    className="bg-green-600 text-green-50 py-2 px-4 rounded-lg hover:bg-green-500 transition"
                >
                    Generate PDF Report
                </button>
            </div>

            <div className="overflow-x-auto bg-green-900 rounded-xl shadow-lg max-h-fit overflow-y-scroll">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-green-700 text-green-100 uppercase text-xs">
                    <tr>
                        {["First Name", "Last Name", "Email", "Contact Number", "Role", "Action"].map((header, index) => (
                            <th key={index} className="px-4 py-3">{header}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-green-700">
                    {filteredUsers.map((user, idx) => (
                        <tr key={user.id}
                            className={`${idx % 2 === 0 ? 'bg-green-800' : 'bg-green-900'} hover:bg-green-700`}>
                            {editRowId === user.id ? (
                                <>
                                    <td className="px-4 py-2">
                                        <input
                                            name="firstName"
                                            value={editedData.firstName}
                                            onChange={handleInputChange}
                                            className="bg-green-100 text-green-800 px-2 py-1 rounded w-full"
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <input
                                            name="lastName"
                                            value={editedData.lastName}
                                            onChange={handleInputChange}
                                            className="bg-green-100 text-green-800 px-2 py-1 rounded w-full"
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <input
                                            name="email"
                                            value={editedData.email}
                                            onChange={handleInputChange}
                                            className="bg-green-100 text-green-800 px-2 py-1 rounded w-full"
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <input
                                            name="mobileNumber"
                                            value={editedData.mobileNumber}
                                            onChange={handleInputChange}
                                            className="bg-green-100 text-green-800 px-2 py-1 rounded w-full"
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <input
                                            name="role"
                                            value={editedData.role}
                                            onChange={handleInputChange}
                                            className="bg-green-100 text-green-800 px-2 py-1 rounded w-full"
                                        />
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex space-x-3">
                                            <button onClick={() => handleEditUser(user.id)}
                                                    className="text-green-400 hover:text-green-200 transition">
                                                <Save size={18}/>
                                            </button>
                                            <button onClick={handleCancelClick}
                                                    className="text-red-400 hover:text-red-200 transition">
                                                <X size={18}/>
                                            </button>
                                        </div>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="px-4 py-3">{user.firstName}</td>
                                    <td className="px-4 py-3">{user.lastName}</td>
                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3">{user.mobileNumber}</td>
                                    <td className="px-4 py-3">{user.role}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => handleEditClick(user)}
                                                className="text-blue-400 hover:text-blue-200"
                                            >
                                                <Pencil size={18}/>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="text-red-400 hover:text-red-200"
                                            >
                                                <Trash2 size={18}/>
                                            </button>
                                        </div>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserList;
