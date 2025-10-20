"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "/api/responsibilities"; // Backend API

const ResponsibilitiesManagement = () => {
  const [responsibilities, setResponsibilities] = useState<any>([]);
  const [newResponsibility, setNewResponsibility] = useState("");
  const [editingResponsibility, setEditingResponsibility] = useState<any>();
  const [updatedResponsibility, setUpdatedResponsibility] = useState("");

  // Fetch responsibilities from backend
  useEffect(() => {
    axios
      .get(API_URL
        ,{ params: { _t: new Date().getTime() } // Add timestamp to bypass cache
       })
      .then((response) => setResponsibilities(response.data))
      .catch((error) => console.error("Error fetching responsibilities:", error));
  }, []);

  // Add new responsibility
  const addResponsibility = () => {
    if (!newResponsibility) return alert("Responsibility cannot be empty!");
    axios
      .post(API_URL, { name: newResponsibility })
      .then((response) => {
        setResponsibilities([...responsibilities, response.data]);
        setNewResponsibility("");
      })
      .catch((error) => console.error("Error adding responsibility:", error));
  };

  // Delete responsibility
  const deleteResponsibility = (id:any) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => setResponsibilities(responsibilities.filter((responsibility:any) => responsibility._id !== id)))
      .catch((error) => console.error("Error deleting responsibility:", error));
  };

  // Update responsibility
  const updateResponsibility = () => {
    if (!updatedResponsibility) return alert("Updated responsibility cannot be empty!");
    axios
      .put(`${API_URL}/${editingResponsibility._id}`, { name: updatedResponsibility })
      .then((response) => {
        setResponsibilities(responsibilities.map((responsibility:any) => responsibility._id === editingResponsibility._id ? response.data : responsibility));
        setEditingResponsibility(null);
        setUpdatedResponsibility("");
      })
      .catch((error) => console.error("Error updating responsibility:", error));
  };

  return (
    <div className="overalls">
      <img src="/Summary.png" alt="Logistics Background" className="background-image2" />
      <div className="review-form" style={{ marginBottom: '400px' }}>
        <h2>Responsibilities Management</h2>

        {/* Add Responsibility */}
        <textarea
          
          placeholder="Enter new responsibility"
          value={newResponsibility}
          onChange={(e) => setNewResponsibility(e.target.value)}
        />
        <button  className="contact-button"onClick={addResponsibility}>Add Responsibility</button>

        {/* Responsibility List */}
        <ul>
          {responsibilities.map((responsibility:any) => (
            <li key={responsibility._id}>
              {editingResponsibility && editingResponsibility._id === responsibility._id ? (
                <>
                  <textarea
                    
                    value={updatedResponsibility}
                    onChange={(e) => setUpdatedResponsibility(e.target.value)}
                  />
                  <button className="contact-button"  onClick={updateResponsibility}>Update</button>
                  <button className="contact-button" onClick={() => setEditingResponsibility(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <h1 className="specialparagraph3">{responsibility.name}</h1>
                  <button
  className="contact-button"
  onClick={() => {
    setEditingResponsibility(responsibility);
    setUpdatedResponsibility(responsibility.name);
  }}
>
  Edit
</button>

                  <button className="contact-button" onClick={() => deleteResponsibility(responsibility._id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResponsibilitiesManagement;
