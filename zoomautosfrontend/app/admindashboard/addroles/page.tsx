"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "/api/roles";

interface Role {
  _id: string;
  name: string;
}

const RolesManagement = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [newRole, setNewRole] = useState("");
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [updatedRole, setUpdatedRole] = useState("");

  const token = sessionStorage.getItem("Transport Admin AuthToken");

  // Fetch roles
  useEffect(() => {
    axios
      .get(API_URL, { params: { _t: new Date().getTime() } })
      .then((res) => setRoles(res.data))
      .catch((err) => console.error("Error fetching roles:", err));
  }, []);

  // Add role
  const addRole = () => {
    if (!newRole.trim()) return alert("Role cannot be empty!");
    axios
      .post(
        API_URL,
        { name: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setRoles([...roles, res.data]);
        setNewRole("");
      })
      .catch((err) => console.error("Error adding role:", err));
  };

  // Delete role
  const deleteRole = (id: string) => {
    axios
      .delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => setRoles(roles.filter((r) => r._id !== id)))
      .catch((err) => console.error("Error deleting role:", err));
  };

  // Update role
  const updateRole = () => {
    if (!editingRole) return; // safety check
    if (!updatedRole.trim()) return alert("Updated role cannot be empty!");

    axios
      .put(
        `${API_URL}/${editingRole._id}`,
        { name: updatedRole },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setRoles(roles.map((r) => (r._id === editingRole._id ? res.data : r)));
        setEditingRole(null);
        setUpdatedRole("");
      })
      .catch((err) => console.error("Error updating role:", err));
  };

  return (
    <div className="overalls">
      <img
        src="/Summary.png"
        alt="Logistics Background"
        className="background-image2"
      />
      <div className="review-form" style={{ marginBottom: "400px" }}>
        <h2>Roles Management</h2>

        {/* Add Role */}
        <textarea
          placeholder="Enter new role"
          value={newRole}
          rows={4}
          onChange={(e) => setNewRole(e.target.value)}
        />
        <button className="contact-button" onClick={addRole}>
          Add Role
        </button>

        {/* Role List */}
        <ul>
          {roles.map((role) => (
            <li key={role._id}>
              {editingRole?. _id === role._id ? (
                <>
                  <textarea
                    rows={4}
                    value={updatedRole}
                    onChange={(e) => setUpdatedRole(e.target.value)}
                  />
                  <button className="contact-button" onClick={updateRole}>
                    Update
                  </button>
                  <button
                    className="contact-button"
                    onClick={() => setEditingRole(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h1 className="specialparagraph3">{role.name}</h1>
                  <button
                    className="contact-button"
                    onClick={() => {
                      setEditingRole(role);
                      setUpdatedRole(role.name);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="contact-button"
                    onClick={() => deleteRole(role._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RolesManagement;
