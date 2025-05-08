import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Trash2, Pencil } from 'lucide-react';
import Papa from 'papaparse';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import autoTable from 'jspdf-autotable';

function UserList() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem("access_token")) {
            navigate("/");
        }

        axios.get('http://localhost:8080/api/track-tidy/admin/getAll')
            .then(response => {
                console.log(response.data);
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, [navigate]);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/api/track-tidy/user/delete?id=${id}`)
            .then(() => {
                setUsers(users.filter(user => user.id !== id));
            })
            .catch(error => {
                console.error('Error deleting user:', error);
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
                    <thead className="bg-green-700 text-green-100 uppercase text-xs position-relative">
                    <tr>
                        {["First Name", "Last Name", "Email", "Contact Number", "Role", "Action"].map((header, index) => (
                            <th key={index} className="px-4 py-3 whitespace-nowrap">{header}</th>
                        ))}
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-green-700">
                    {filteredUsers.map((user, idx) => (
                        <tr key={user.id} className={`${idx % 2 === 0 ? 'bg-green-800' : 'bg-green-900'} hover:bg-green-700 transition`}>
                            <td className="px-4 py-3">{user.firstName}</td>
                            <td className="px-4 py-3">{user.lastName}</td>
                            <td className="px-4 py-3">{user.email}</td>
                            <td className="px-4 py-3">{user.mobileNumber}</td>
                            <td className="px-4 py-3">{user.role}</td>
                            <td className="px-4 py-3">
                                <div className="flex space-x-3">
                                    <button className="text-blue-400 hover:text-blue-200 transition">
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-400 hover:text-red-200 transition"
                                    >
                                        <Trash2 size={18} />
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

export default UserList;
