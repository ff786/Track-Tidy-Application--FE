import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Trash2, Pencil } from 'lucide-react';

function ViewInventory() {
  const [inventory, setInventory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("access_token")) {
      navigate("/");
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
    axios.delete(`http://localhost:8080/api/track-tidy/inventory/delete?id=${id}`)
        .then(() => {
          setInventory(inventory.filter(item => item.id !== id));
        })
        .catch(error => {
          console.error('Error deleting inventory item:', error);
        });
  };

  return (
      <div className="p-6 bg-green-800 min-h-screen text-green-50">
        <h2 className="text-2xl font-semibold mb-6">Inventory Items</h2>

        <div className="overflow-x-auto bg-green-900 rounded-xl shadow-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-green-700 text-green-100 uppercase text-xs">
            <tr>
              {[
                "Item Name", "Category", "Quantity",
                "Condition", "Brand", "Purchase Date",
                "Room Location", "Value", "Action"
              ].map((header, index) => (
                  <th key={index} className="px-4 py-3 whitespace-nowrap">{header}</th>
              ))}
            </tr>
            </thead>

            <tbody className="divide-y divide-green-700">
            {inventory.map((item, idx) => (
                <tr key={item.id} className={`${idx % 2 === 0 ? 'bg-green-800' : 'bg-green-900'} hover:bg-green-700 transition`}>
                  <td className="px-4 py-3">{item.itemName}</td>
                  <td className="px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3">{item.quantity}</td>
                  <td className="px-4 py-3">{item.condition}</td>
                  <td className="px-4 py-3">{item.brand}</td>
                  <td className="px-4 py-3">{item.purchaseDate}</td>
                  <td className="px-4 py-3">{item.roomLocation}</td>
                  <td className="px-4 py-3">{item.value}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-3">
                      <button className="text-blue-400 hover:text-blue-200 transition">
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
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default ViewInventory;
