import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import Papa from 'papaparse';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import AddInventory from "../../HomeInventory/addInventory.jsx";


function AdminViewInventory() {
    const [inventory, setInventory] = useState([]);
    const [search, setSearch] = useState("");
    const [editMode, setEditMode] = useState(null); // Track the currently edited item
    const [editedItem, setEditedItem] = useState({}); // Track the edited data
    const [showModal, setShowModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem("access_token")) {
            navigate("/"); // Redirect to login if no token
        }

        axios.get('http://localhost:8080/api/track-tidy/inventory/getAll')
            .then(response => {
                setInventory(response.data);
            })
            .catch(error => {
                console.error('Error fetching inventory:', error);
            });
    }, [navigate]);

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        axios.delete(`http://localhost:8080/api/track-tidy/inventory/delete?id=${id}`)
            .then(() => {
                setInventory(inventory.filter(item => item.id !== id));
            })
            .catch(error => {
                console.error('Error deleting inventory item:', error);
            });
    };

    const handleEdit = (id, item) => {
        setEditMode(id); // Switch to edit mode for the clicked item
        setEditedItem(item); // Set the edited item data
    };

    const handleSave = (id) => {
        if (!window.confirm("Are you sure you want to save these changes?")) return;

        axios.put(`http://localhost:8080/api/track-tidy/inventory/update?id=${id}`, editedItem)
            .then(() => {
                setInventory(inventory.map(item =>
                    item.id === id ? { ...item, ...editedItem } : item
                ));
                setEditMode(null); // Exit edit mode
            })
            .catch(error => {
                console.error('Error updating inventory item:', error);
            });
    };

    const handleCancelClick = () => {
        setEditMode(null); // Reset to cancel editing
        setEditedItem({}); // Clear the edited item data
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedItem({
            ...editedItem,
            [name]: value
        });
    };

    const filteredInventory = inventory.filter(item =>
        (item.productName?.toLowerCase() ?? '').includes(search.toLowerCase()) ||
        (item.category?.toLowerCase() ?? '').includes(search.toLowerCase())
    );

    const generateCSV = () => {
        const csvData = filteredInventory.map(item => ({
            "Item Name": item.productName,
            "Product Category": item.productCategory,
            "Quantity": item.quantity,
            "Product ID": item.productId,
            "warrantyPeriod": item.warrantyPeriod,
            "Purchase Value": item.productValue,
            "Product Image": item.ProductImage,
        }));

        const csv = Papa.unparse(csvData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.setAttribute("href", url);
        link.setAttribute("download", "inventory_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Inventory Report", 20, 20);

        const tableColumn = [
            "Item Name", "Product Category", "Quantity", "Product Id",
            "Warranty Period", "Purchase Value", "Product Image"
        ];
        const tableRows = filteredInventory.map(item => [
            item.productName, item.productCategory, item.quantity, item.productId,
            item.warrantyPeriod, item.productValue, item.ProductImage
        ]);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 30
        });

        doc.save("inventory_report.pdf");
    };

    return (
        <div className="p-6 bg-green-800 min-h-screen text-green-50">
            <h2 className="text-2xl font-semibold mb-6">Inventory Items</h2>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Item Name or Category"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 rounded-lg text-green-800 bg-green-200 w-full"
                />
            </div>

            {/* Generate Report Buttons */}
            <div className="mb-6 flex items-center">
                <button
                    onClick={() => setIsModalOpen(true)} // Open the modal
                    className="bg-green-600 text-green-50 py-2 px-4 rounded-lg hover:bg-green-500 transition mr-4"
                >
                    + Add Inventory Item
                </button>
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

            {/* Table */}
            <div className="overflow-x-auto bg-green-900 rounded-xl shadow-lg max-h-screen overflow-y-scroll">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-green-700 text-green-100 uppercase text-xs">
                    <tr>
                        {[
                            "Product Name", "Product Category", "Quantity",
                            "Product ID", "Warranty Period", "Product Value", "Product Image", "Action"
                        ].map((header, index) => (
                            <th key={index} className="px-4 py-3 whitespace-nowrap">{header}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-green-700">
                    {filteredInventory.length === 0 ? (
                        <tr>
                            <td colSpan="9" className="text-center py-6 text-green-300">
                                No inventory items found.
                            </td>
                        </tr>
                    ) : (
                        filteredInventory.map((item, idx) => (
                            <tr key={item.id} className={`${idx % 2 === 0 ? 'bg-green-800' : 'bg-green-900'} hover:bg-green-700 transition`}>
                                {editMode === item.id ? (
                                    <>
                                        <td className="px-4 py-3">
                                            <input
                                                type="text"
                                                name="productName"
                                                value={editedItem.productName || item.productName}
                                                onChange={handleChange}
                                                className="px-4 py-2 rounded-lg text-green-800 bg-green-200"
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <input
                                                type="text"
                                                name="productCategory"
                                                value={editedItem.productCategory || item.productCategory}
                                                onChange={handleChange}
                                                className="px-4 py-2 rounded-lg text-green-800 bg-green-200"
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <input
                                                type="number"
                                                name="quantity"
                                                value={editedItem.quantity || item.quantity}
                                                onChange={handleChange}
                                                className="px-4 py-2 rounded-lg text-green-800 bg-green-200"
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <input
                                                type="text"
                                                name="productId"
                                                value={editedItem.productId || item.productId}
                                                onChange={handleChange}
                                                className="px-4 py-2 rounded-lg text-green-800 bg-green-200"
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <input
                                                type="texnumbert"
                                                name="warrantyPeriod"
                                                value={editedItem.warrantyPeriod || item.warrantyPeriod}
                                                onChange={handleChange}
                                                className="px-4 py-2 rounded-lg text-green-800 bg-green-200"
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <input
                                                type="number"
                                                name="productValue"
                                                value={editedItem.productValue || item.productValue}
                                                onChange={handleChange}
                                                className="px-4 py-2 rounded-lg text-green-800 bg-green-200"
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <input
                                                type="img"
                                                name="ProductImage"
                                                value={editedItem.ProductImage || item.ProductImage}
                                                onChange={handleChange}
                                                className="px-4 py-2 rounded-lg text-green-800 bg-green-200 w-full"
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => handleSave(item.id)}
                                                className="text-green-400 hover:text-green-200 mr-4"
                                            >
                                                <Check size={18} />
                                            </button>
                                            <button
                                                onClick={handleCancelClick}
                                                className="text-red-500 hover:text-red-300"
                                            >
                                                <X size={18} />
                                            </button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="px-4 py-3">{item.productName}</td>
                                        <td className="px-4 py-3">{item.productCategory}</td>
                                        <td className="px-4 py-3">{item.quantity}</td>
                                        <td className="px-4 py-3">{item.productId}</td>
                                        <td className="px-4 py-3">{item.warrantyPeriod}</td>
                                        <td className="px-4 py-3">{item.productValue}</td>
                                        <td className="px-4 py-3">
                                            {item.ProductImage ? (
                                                <img src={item.ProductImage} alt="Product" className="w-16 h-16 object-cover rounded" />
                                            ) : (
                                                "No Image"
                                            )}
                                        </td>

                                        <td className="px-4 py-3 flex flex-row">
                                            <button
                                                onClick={() => handleEdit(item.id, item)}
                                                className="text-green-400 hover:text-green-200 mr-4"
                                            >
                                                <Pencil size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-500 hover:text-red-300"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            {/* Add Inventory Modal */}
            {isModalOpen && <AddInventory setIsModalOpen={setIsModalOpen} />}
        </div>
    );
}

export default AdminViewInventory;
