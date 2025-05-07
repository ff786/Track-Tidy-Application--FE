import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Pencil, Check, X } from "lucide-react";
import Papa from 'papaparse';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import AddGroceryItem from "../../GroceryConnectCommon/AddGroceryItem.jsx";

const AdminViewGrocery = () => {
    const [groceryItems, setGroceryItems] = useState([]);
    const [search, setSearch] = useState("");
    const [editMode, setEditMode] = useState(null);
    const [editedItem, setEditedItem] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const fetchGroceryItems = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/track-tidy/grocery/getAll");
            setGroceryItems(res.data);
        } catch (error) {
            console.error("Failed to fetch grocery items:", error);
        }
    };

    const deleteItem = async (id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;
        try {
            await axios.delete(`http://localhost:8080/api/track-tidy/grocery/delete?id=${id}`);
            fetchGroceryItems();
        } catch (error) {
            console.error("Failed to delete grocery item:", error);
        }
    };

    const handleEdit = (id, item) => {
        setEditMode(id);
        setEditedItem(item);
    };

    const handleSave = (id) => {
        if (!window.confirm("Are you sure you want to save these changes?")) return;
        axios.put(`http://localhost:8080/api/track-tidy/grocery/update?id=${id}`, editedItem)
            .then(() => {
                setGroceryItems(groceryItems.map(item =>
                    item.id === id ? { ...item, ...editedItem } : item
                ));
                setEditMode(null);
            })
            .catch(error => {
                console.error('Error updating grocery item:', error);
            });
    };

    const handleCancelClick = () => {
        setEditMode(null);
        setEditedItem({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedItem({
            ...editedItem,
            [name]: value
        });
    };

    const handleAddItemClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedItem(null);
        setIsModalOpen(false);
        fetchGroceryItems(); // Refresh after modal close
    };

    useEffect(() => {
        fetchGroceryItems();
    }, []);

    const filteredGroceryItems = groceryItems.filter(item =>
        (item.itemName?.toLowerCase() ?? '').includes(search.toLowerCase()) ||
        (item.productId?.toLowerCase() ?? '').includes(search.toLowerCase())
    );

    const generateCSV = () => {
        const csvData = filteredGroceryItems.map(item => ({
            "Item Name": item.itemName,
            "Price": item.price,
            "Product ID": item.productId,
            "Quantity": item.quantity,
            "Expiry Date": item.expiryDate,
            "Image": item.itemImage,
        }));

        const csv = Papa.unparse(csvData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.setAttribute("href", url);
        link.setAttribute("download", "grocery_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Grocery Report", 20, 20);

        const tableColumn = [
            "Item Name", "Price", "Product ID", "Quantity", "Expiry Date", "Image"
        ];
        const tableRows = filteredGroceryItems.map(item => [
            item.itemName, item.price, item.productId, item.quantity, item.expiryDate, item.itemImage
        ]);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 30
        });

        doc.save("grocery_report.pdf");
    };

    const accessToken = sessionStorage.getItem("access_token");

    if (!accessToken) {
        return (
            <div className="text-center text-red-500 font-semibold mt-10">
                Access Denied. Please login to view this page.
            </div>
        );
    }

    return (
        <div className="p-6 bg-green-800 min-h-screen text-green-50">
            <h2 className="text-2xl font-semibold mb-6">Grocery Items</h2>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Item Name or Product ID"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 rounded-lg text-green-800 bg-green-200 w-full"
                />
            </div>

            {/* Add Item and Report Buttons */}
            <div className="mb-6 flex items-center">
                <button
                    onClick={handleAddItemClick}
                    className="bg-green-600 text-green-50 py-2 px-4 rounded-lg hover:bg-green-500 transition mr-4"
                >
                    + Add Grocery Item
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
            <div className="overflow-x-auto bg-green-900 rounded-xl shadow-lg">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-green-700 text-green-100 uppercase text-xs">
                    <tr>
                        {[
                            "Item Name", "Price", "Product ID", "Quantity",
                            "Expiry Date", "Image", "Actions"
                        ].map((header, index) => (
                            <th key={index} className="px-4 py-3 whitespace-nowrap">{header}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-green-700">
                    {filteredGroceryItems.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center py-6 text-green-300">
                                No grocery items found.
                            </td>
                        </tr>
                    ) : (
                        filteredGroceryItems.map((item, idx) => (
                            <tr key={item.id} className={`${idx % 2 === 0 ? 'bg-green-800' : 'bg-green-900'} hover:bg-green-700 transition`}>
                                {editMode === item.id ? (
                                    <>
                                        <td className="px-4 py-3">
                                            <input
                                                type="text"
                                                name="itemName"
                                                value={editedItem.itemName || item.itemName}
                                                onChange={handleChange}
                                                className="px-4 py-2 rounded-lg text-green-800 bg-green-200"
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <input
                                                type="number"
                                                name="price"
                                                value={editedItem.price || item.price}
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
                                                name="expiryDate"
                                                value={editedItem.expiryDate || item.expiryDate}
                                                onChange={handleChange}
                                                className="px-4 py-2 rounded-lg text-green-800 bg-green-200"
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <input
                                                type="text"
                                                name="itemImage"
                                                value={editedItem.itemImage || item.itemImage}
                                                onChange={handleChange}
                                                className="px-4 py-2 rounded-lg text-green-800 bg-green-200 w-full"
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => handleSave(item.id)}
                                                className="text-green-400 hover:text-green-200 mr-2"
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
                                        <td className="px-4 py-3">{item.itemName}</td>
                                        <td className="px-4 py-3">Rs. {item.price}</td>
                                        <td className="px-4 py-3">{item.productId}</td>
                                        <td className="px-4 py-3">{item.quantity}</td>
                                        <td className="px-4 py-3">{item.expiryDate}</td>
                                        <td className="px-4 py-3">
                                            {item.itemImage ? (
                                                <img
                                                    src={item.itemImage}
                                                    alt="Grocery"
                                                    className="h-12 w-12 object-cover rounded"
                                                />
                                            ) : (
                                                "No Image"
                                            )}
                                        </td>
                                        <td className="px-4 py-3 flex gap-2">
                                            <button
                                                onClick={() => handleEdit(item.id, item)}
                                                className="text-yellow-400 hover:text-yellow-500"
                                            >
                                                <Pencil size={18} />
                                            </button>
                                            <button
                                                onClick={() => deleteItem(item.id)}
                                                className="text-red-500 hover:text-red-600"
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

            {isModalOpen && (
                <AddGroceryItem
                    onClose={handleModalClose}
                    selectedItem={selectedItem}
                />
            )}
        </div>
    );
};

export default AdminViewGrocery;
