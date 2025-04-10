import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const UserList = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Retrieve the registered user from localStorage
  const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));
  console.log("Logged-in User:", registeredUser); // Optional: Debugging

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users")
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data);
      })
      .catch((err) => console.error("Failed to fetch users:", err));
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("User List Report", 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);

    const tableColumn = ["First Name", "Last Name", "Email", "Mobile", "Role"];
    const tableRows = [];

    filteredUsers.forEach((user) => {
      const rowData = [
        user.firstName || "N/A",
        user.lastName || "N/A",
        user.email || "N/A",
        user.mobileNumber || "N/A",
        user.role || "User",
      ];
      tableRows.push(rowData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: "striped",
      headStyles: { fillColor: [15, 192, 180] },
    });

    const date = new Date().toLocaleString();
    doc.text(`Generated on: ${date}`, 14, doc.lastAutoTable.finalY + 10);
    doc.save(`User_Report_${Date.now()}.pdf`);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const updateUserRole = (userId, newRole) => {
    axios
      .put(`http://localhost:8080/api/users/${userId}/role`, { role: newRole })
      .then((res) => {
        console.log("Role updated");
      })
      .catch((err) => console.error("Failed to update role:", err));
  };

  const handleRoleChange = (index, newRole) => {
    const globalIndex = indexOfFirstUser + index;
    const updatedUsers = [...filteredUsers];
    const selectedUser = updatedUsers[globalIndex];
    selectedUser.role = newRole;
    setFilteredUsers(updatedUsers);

    updateUserRole(selectedUser.id, newRole);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">User List</h2>
        <button
          onClick={generatePDF}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Generate PDF
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by name or email..."
        className="w-full mb-4 p-2 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-2">First Name</th>
            <th className="border px-2 py-2">Last Name</th>
            <th className="border px-2 py-2">Email</th>
            <th className="border px-2 py-2">Mobile</th>
            <th className="border px-2 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-2 py-2">{user.firstName}</td>
                <td className="border px-2 py-2">{user.lastName}</td>
                <td className="border px-2 py-2">{user.email}</td>
                <td className="border px-2 py-2">{user.mobileNumber}</td>
                <td className="border px-2 py-2">
                  <select
                    value={user.role || "user"}
                    onChange={(e) => handleRoleChange(index, e.target.value)}
                    className="border rounded px-2 py-1 bg-white"
                  >
                    <option value="user">User</option>
                    <option value="vendor">Vendor</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => paginate(num)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === num
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserList;
