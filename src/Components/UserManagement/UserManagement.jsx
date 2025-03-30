import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "./VendorForm"; // Ensure this path is correct
import UserImage from "../../assets/user.jpg"; // Ensure this path is correct

const UserManagement = () => {
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setVendors([
      { id: 1, name: "Jane Smith", email: "jane@example.com", role: "Vendor", company: "Acme Corp" },
      { id: 2, name: "Mark Lee", email: "mark@example.com", role: "Vendor", company: "Tech Solutions" },
    ]);
  }, []);

  const addVendor = (newVendor) => {
    setVendors([...vendors, newVendor]);
  };

  const deleteVendor = (vendorId) => {
    setVendors(vendors.filter((vendor) => vendor.id !== vendorId));
  };

  const styles = {
    container: { width: "80%", margin: "0 auto", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "10px" },
    header: { fontSize: "2rem", fontWeight: "600", textAlign: "center", marginBottom: "20px", color: "#333" },
    vendorList: { listStyleType: "none", padding: "0" },
    vendorItem: { display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", padding: "15px", margin: "10px 0", borderRadius: "8px" },
    button: { padding: "8px 12px", fontSize: "0.875rem", border: "none", cursor: "pointer", borderRadius: "5px", transition: "0.3s" },
    editButton: { backgroundColor: "#007bff", color: "white", marginRight: "10px" },
    deleteButton: { backgroundColor: "#e74c3c", color: "white" },
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <h2 style={styles.header}>Vendor Management</h2>
      
      {/* UserForm for Adding Vendors */}
      <UserForm addVendor={addVendor} />
      
      {/* Vendor List */}
      <h3 style={styles.header}>List of Vendors</h3>
      <ul style={styles.vendorList}>
        {vendors.map((vendor) => (
          <li key={vendor.id} style={styles.vendorItem}>
            <span>{vendor.name}</span>
            <span>({vendor.email})</span>
            <span>({vendor.company})</span>
            <button style={{ ...styles.button, ...styles.editButton }} onClick={() => navigate(`/edit-vendor/${vendor.id}`, { state: { vendor } })}>
              Edit
            </button>
            <button style={{ ...styles.button, ...styles.deleteButton }} onClick={() => deleteVendor(vendor.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
