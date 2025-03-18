import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { BsInfoCircle } from 'react-icons/bs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const viewInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [noDataMessage, setNoDataMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddClick = () => {
    navigate('/add-in');
  };

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get('');
        setInventory(response.data);
      } catch (error) {
        console.error(error);
        setError('Failed to load packages. Please try again later.');
      }
    };

    fetchInventory();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    const tableColumn = [
      "Product ID",
      "User ID",
      "Product Category",
      "Product Name",
      "Product Value",
      "Quantity",
      "Purchased Date",
    ];
    const tableRows = [];

    inventory.forEach((inventoryItem) => {
      const data = [
        inventoryItem.productid,
        inventoryItem.userid,
        inventoryItem.productcategory,
        inventoryItem.productname,
        inventoryItem.productvalue,
        inventoryItem.quantity,
        inventoryItem.purchasedate,
      ];
      tableRows.push(data);

      doc.setFontSize(10).setTextColor("#333");
      doc.text(`Start Date: ${inventoryItem.start_date}`, 15, doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 60);
      doc.text(`End Date: ${inventoryItem.end_date}`, 15, doc.lastAutoTable ? doc.lastAutoTable.finalY + 15 : 65);
    });

    const date = new Date().toLocaleDateString();

    doc.setFontSize(24).setFont("helvetica", "bold").setTextColor("#4B9CD3");
    doc.text("Track Tidy", 105, 15, { align: "center" });

    doc.setFont("helvetica", "normal").setFontSize(18).setTextColor("#333");
    doc.text("Inventory Details Report", 105, 25, { align: "center" });

    doc.setFont("helvetica", "italic").setFontSize(12).setTextColor("#666");
    doc.text(`Report Generated Date: ${date}`, 105, 35, { align: "center" });

    doc.setDrawColor(0, 0, 0).setLineWidth(0.5);
    doc.line(10, 49, 200, 49);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 70,
      styles: { fontSize: 10, cellPadding: 2 },
      headStyles: {
        fillColor: [44, 62, 80],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        halign: "center",
      },
      bodyStyles: {
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 30 },
        2: { cellWidth: 30 },
        3: { cellWidth: 20 },
        4: { cellWidth: 30 },
        5: { cellWidth: 30 },
        6: { cellWidth: 30 },
        7: { cellWidth: 30 },
      },
      alternateRowStyles: {
        fillColor: [230, 230, 230],
      },
      margin: { top: 80 },
    });

    doc.save(`Inventory-Details-Report_${date}.pdf`);
  };

  // Search function
  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8076/searchpkg?search=${searchQuery}`);
      console.log("Search response:", response);
      if (response.data.length === 0) {
        console.log("No matching packages found.");
        setNoDataMessage('No matching packages found.');
      } else {
        console.log("Matching packages found:", response.data);
        setNoDataMessage('');
        setInventory(response.data);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching packages:", err);
      setLoading(false);
    }
  };

    // Apply search filter
    const applySearchFilter = (inventory) => {
  
      const productid = inventory.productid ? inventory.productid.toLowerCase() : '';
      const productname = inventory.productname ? inventory.productname.toLowerCase() : '';
      const productvalue = inventory.productvalue ? inventory.productvalue.toString() : '';
      const warrantyperiod = inventory.warrantyperiod ? inventory.warrantyperiod.toString() : '';
      const quantity = inventory.quantity ? inventory.quantity.toString() : ''; 
      const purchasedate = inventory.purchasedate ? inventory.purchasedate.toLowerCase() : '';
      const productcategory = inventory.productcategory ? inventory.productcategory.toLowerCase() : '';
       
      return (
        productid.includes(searchQuery.toLowerCase()) ||
        productname.includes(searchQuery.toLowerCase()) ||
        productvalue.includes(searchQuery.toLowerCase()) ||
        warrantyperiod.includes(searchQuery.toLowerCase()) ||
        quantity.includes(searchQuery.toLowerCase()) || 
        purchasedate.includes(searchQuery.toLowerCase()) ||
        productcategory.includes(searchQuery.toLowerCase())
      );
    };

    // Filter reviews based on search query
    const filteredPackages = inventory.filter(applySearchFilter);

  return (

    <div className="flex-grow p-6">
    <div className="flex justify-between items-center ">
<div className="flex items-center justify-between ">
<h1 class=" text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">Inventory <span class="text-green-600 dark:text-green-500">List</span> </h1>
<div className="flex items-center gap-4 ">
<input
  type="text"
  name="searchQuery"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  placeholder="Search here..."
   className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
/>
 <button
  onClick={handleSearch}
  className="relative inline-flex items-center justify-center p-0.5  me-2 overflow-hidden text-sm font-medium text-black-100 rounded-lg group bg-gradient-to-br from-green-900 to-green-500  group-hover:to-green-500 hover:text-white dark:text-black focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
>
  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-black-100 rounded-md group-hover:bg-opacity-0">
      Search
      </span>
</button>  

<button
  onClick={generatePDF}
  className="relative inline-flex items-center justify-center p-0.5  me-2 overflow-hidden text-sm font-medium text-black-100 rounded-lg group bg-gradient-to-br from-green-900 to-green-500  group-hover:to-green-500 hover:text-white dark:text-black focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
>
  <span className="relative px-4 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-black-100 rounded-md group-hover:bg-opacity-0">
      Generate PDF
      </span>
</button>

<button
  className="relative inline-flex items-center justify-center p-0.5  me-2 overflow-hidden text-sm font-medium text-black-100 rounded-lg group bg-gradient-to-br from-green-900 to-green-500  group-hover:to-green-500 hover:text-white dark:text-black focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
  onClick={handleAddClick}
>
  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-black-100 rounded-md group-hover:bg-opacity-0">
        Add
      </span>
    </button>
</div>
</div>
</div> 
{noDataMessage && (
<p className="text-red-500 text-center">{noDataMessage}</p>
)}            
{error && <p className="text-red-600">{error}</p>}

<div className="overflow-x-auto">
<div className="bg-white shadow-md rounded-lg overflow-hidden">
<div className="max-h-[400px] overflow-y-auto">
<table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
  <thead className="bg-gray-100">
    <tr>
      <th className="px-4 py-2 text-left font-semibold">Product ID</th>
      <th className="px-4 py-2 text-left font-semibold">Product Category</th>
      <th className="px-4 py-2 text-left font-semibold">Product Name</th>
      <th className="px-4 py-2 text-left font-semibold">User ID</th>
      <th className="px-4 py-2 text-left font-semibold">Product Quantity</th>
      <th className="px-4 py-2 text-left font-semibold">Product Value</th>
      <th className="px-4 py-2 text-left font-semibold">Purchased Date</th>
      <th className="px-4 py-2 text-left font-semibold">Warranty Period</th>
      <th className="px-8 py-2 text-left font-semibold">Image</th>
      <th className="px-4 py-2 text-left font-semibold">Actions</th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {filteredPackages.map((inventory) => (
      <tr key={pkg._id} className="hover:bg-gray-100 transition duration-150 ease-in-out">
        <td className="px-4 py-2 text-sm text-gray-700">{inventory.productid}</td>
        <td className="px-4 py-2 text-sm text-gray-700">{inventory.productcategory}</td>
        <td className="px-4 py-2 text-sm text-gray-700">{inventory.productname}</td>
        <td className="px-4 py-2 text-sm text-gray-700">{inventory.userid}</td>
        <td className="px-4 py-2 text-sm text-gray-700">{inventory.quantity}</td>
        <td className="px-4 py-2 text-sm text-gray-700">{inventory.productvalue}</td>
        <td className="px-4 py-2 text-sm text-gray-700">{inventory.purchasedate.slice(0, 10)}</td>
        <td className="px-4 py-2 text-sm text-gray-700">{inventory.warrantyperiod}</td>

        <td className="px-4 py-2 text-gray-700">
      <img src={`http://localhost:8076/${inventory.productimage}`}  alt="Package" className='w-24 h-24 object-cover rounded-full' />
          {console.log(`http://localhost:8076/${inventory.productimage}`)}
      </td> 

        <td className="px-6 py-4 text-sm text-gray-700 flex space-x-2">
          <Link 
            className="text-green-600  hover:text-green-800 transition duration-150 ease-in-out"
            to={`/view-in/${inventory._id}`}
            title="View Details"
          >
            <BsInfoCircle size={20} />
            </Link>
          <Link to={`/update-in/${inventory._id}`}>
            <FaEdit className="text-yellow-500 cursor-pointer hover:text-yellow-700" title="Edit" />
          </Link>
          <Link to={`/delete-in/${inventory._id}`}>
            <FaTrash className="text-red-500 cursor-pointer hover:text-red-700" title="Delete" />
          </Link>
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>
</div>
</div>
</div>
  )
}

export default viewInventory
