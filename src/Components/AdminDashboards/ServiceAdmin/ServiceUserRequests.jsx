import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Trash2, Pencil, X, Check, Save } from 'lucide-react';
import Papa from 'papaparse';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2';

function UserServiceRequest() {

    const [service, setService] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [editRowId, setEditRowId] = useState(null);
    const [editedData, setEditedData] = useState({});

    const handleEditClick = (item) => {
        setEditRowId(item.id);
        setEditedData({ ...item }); // Clone the current row data into state
    };

    const handleInputChange = (e, field) => {
        setEditedData(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSaveClick = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to save these changes?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#15803d',
            cancelButtonColor: '#dc2626',
            confirmButtonText: 'Yes, save it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const formData = new FormData();
                formData.append('userId', editedData.userId);
                formData.append('serviceType', editedData.serviceType);
                formData.append('serviceDesc', editedData.serviceDesc);
                formData.append('memberName', editedData.memberName);
                formData.append('email', editedData.email);
                formData.append('phoneNumber', editedData.phoneNumber);
                formData.append('address', editedData.address);
                formData.append('referralCode', editedData.referralCode);

                axios.put(`http://localhost:8080/api/track-tidy/service/update/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
                    }
                })
                    .then(() => {
                        setService(prev =>
                            prev.map(item => (item.id === id ? { ...editedData } : item))
                        );
                        setEditRowId(null);
                        setEditedData({});
                        Swal.fire(
                            'Saved!',
                            'Your changes have been saved successfully.',
                            'success'
                        );
                    })
                    .catch(() => {
                        Swal.fire(
                            'Error!',
                            'Failed to save changes.',
                            'error'
                        );
                    });
            }
        });
    };

    const handleCancelClick = () => {
        setEditRowId(null);
        setEditedData({});
    };

    useEffect(() => {
        if (!sessionStorage.getItem("access_token")) {
            navigate("/");
        }

        const fetchServices = async () => { // Encapsulate the fetch in an async function
            try {
                const response = await axios.get('http://localhost:8080/api/track-tidy/service/getAll');
                setService(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
        fetchServices();
    }, [navigate]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15803d',
            cancelButtonColor: '#dc2626',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/api/track-tidy/service/delete?id=${id}`)
                    .then(() => {
                        setService(service.filter(item => item.id !== id));
                        Swal.fire(
                            'Deleted!',
                            'Service request has been deleted.',
                            'success'
                        );
                    })
                    .catch(error => {
                        console.error('Error deleting service:', error);
                        Swal.fire(
                            'Error!',
                            'Failed to delete service request.',
                            'error'
                        );
                    });
            }
        });
    };

    const filteredService = service.filter(item =>
        item.serviceType.toLowerCase().includes(search.toLowerCase()) ||
        item.memberName.toLowerCase().includes(search.toLowerCase())
    );

    const generateCSV = () => {
        try {
            console.log('Generate CSV button clicked!');
            const csvData = filteredService.map(item => ({
                "Member ID": item.userId,
                "Service Type": item.serviceType,
                "Service Description": item.serviceDesc,
                "Member Name": item.memberName,
                "Email": item.email,
                "Contact Number": item.phoneNumber,
                "Address": item.address,
                "Referral Code": item.referralCode,
            }));

            const csvString = Papa.unparse(csvData); // Use Papa.unparse directly

            const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", "service_requests_report.csv");
            link.style.visibility = 'hidden'; // Make link invisible
            document.body.appendChild(link); // Append to the document
            link.click();
            document.body.removeChild(link); // Clean up
            URL.revokeObjectURL(url); // Release the object URL
            console.log('CSV Data generated successfully!');
            Swal.fire(
                'Success!',
                'CSV report has been generated successfully.',
                'success'
            );
        } catch (error) {
            console.error('Error generating CSV:', error);
            Swal.fire(
                'Error!',
                'Failed to generate CSV report.',
                'error'
            );
        }
    };

    const generatePDF = () => {
        try {
            console.log('Generate PDF button clicked!');
            const doc = new jsPDF();
            doc.setFontSize(16);
            doc.text("Service Requests Report", 20, 20);

            const tableColumn = [
                "Member ID", "Service Type", "Service Description", "Member Name",
                "Email", "Contact Number", "Address", "Referral Code"
            ];
            const tableRows = filteredService.map(item => [
                item.memberId, item.serviceType, item.serviceDesc, item.memberName,
                item.email, item.phoneNumber, item.address, item.referralCode
            ]);

            try {
                autoTable(doc, { // Use autoTable directly
                    head: [tableColumn],
                    body: tableRows,
                    startY: 30
                });
                doc.save("service_requests_report.pdf");
                console.log('PDF generated successfully!');
                Swal.fire(
                    'Success!',
                    'PDF report has been generated successfully.',
                    'success'
                );
            } catch (error) {
                console.error("Error generating PDF:", error);
                Swal.fire(
                    'Error!',
                    'Failed to generate PDF report.',
                    'error'
                );
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
            Swal.fire(
                'Error!',
                'Failed to generate PDF report.',
                'error'
            );
        }
    };

    return (
        <div className="p-6 bg-green-800 min-h-screen text-green-50">
            <h2 className="text-2xl font-semibold mb-6">Service Requests</h2>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Service Type or Member Name"
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

            <div className="overflow-x-auto bg-green-900 rounded-xl shadow-lg max-h-screen overflow-y-scroll">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-green-700 text-green-100 uppercase text-xs">
                    <tr>
                        {["Service Type", "Service Description", "Member Name", "Email", "Contact Number", "Address", "Referral Code", "Action"].map((header, index) => (
                            <th key={index} className="px-4 py-3 whitespace-nowrap">{header}</th>
                        ))}
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-green-700">
                    {filteredService.map((item, idx) => (
                        <tr key={item.id} className={`${idx % 2 === 0 ? 'bg-green-800' : 'bg-green-900'} hover:bg-green-700 transition`}>
                            {editRowId === item.id ? (
                                <>
                                    <td className="px-4 py-3"><input value={editedData.serviceType}
                                                                     onChange={(e) => handleInputChange(e, 'serviceType')}
                                                                     className="px-2 py-1 rounded text-green-900"/></td>
                                    <td className="px-4 py-3"><input value={editedData.serviceDesc}
                                                                     onChange={(e) => handleInputChange(e, 'serviceDesc')}
                                                                     className="px-2 py-1 rounded text-green-900"/></td>
                                    <td className="px-4 py-3"><input value={editedData.memberName}
                                                                     onChange={(e) => handleInputChange(e, 'memberName')}
                                                                     className="px-2 py-1 rounded text-green-900"/></td>
                                    <td className="px-4 py-3"><input value={editedData.email}
                                                                     onChange={(e) => handleInputChange(e, 'email')}
                                                                     className="px-2 py-1 rounded text-green-900"/></td>
                                    <td className="px-4 py-3"><input value={editedData.phoneNumber}
                                                                     onChange={(e) => handleInputChange(e, 'phoneNumber')}
                                                                     className="px-2 py-1 rounded text-green-900"/></td>
                                    <td className="px-4 py-3"><input value={editedData.address}
                                                                     onChange={(e) => handleInputChange(e, 'address')}
                                                                     className="px-2 py-1 rounded text-green-900"/></td>
                                    <td className="px-4 py-3"><input value={editedData.referralCode}
                                                                     onChange={(e) => handleInputChange(e, 'referralCode')}
                                                                     className="px-2 py-1 rounded text-green-900"/></td>
                                    <td className="px-4 py-3">
                                        <div className="flex space-x-3">
                                            <button onClick={() => handleSaveClick(item.id)}
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
                                    <td className="px-4 py-3">{item.serviceType}</td>
                                    <td className="px-4 py-3">{item.serviceDesc}</td>
                                    <td className="px-4 py-3">{item.memberName}</td>
                                    <td className="px-4 py-3">{item.email}</td>
                                    <td className="px-4 py-3">{item.phoneNumber}</td>
                                    <td className="px-4 py-3">{item.address}</td>
                                    <td className="px-4 py-3">{item.referralCode}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex space-x-3">
                                            <button onClick={() => handleEditClick(item)} className="text-blue-400 hover:text-blue-200 transition">
                                                <Pencil size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-400 hover:text-red-200 transition"
                                            >
                                                <Trash2 size={18} />
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

export default UserServiceRequest;
