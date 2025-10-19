"use client"
import React, { useState, useEffect } from "react";
import { useDealerAdmin } from "@/components/clientcontext/clientcontext";
import "./accountedit.css"; // Custom styles
import { FaEdit, FaEye, FaEyeSlash, FaCheck, FaTimes } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
type DealerDetails = {
  
  email: string;
  contactNumber: string;
  Address: string;
};
const UserDetails = () => {
  const { dealerDetails, updateDealerDetails, resetPassword } =useDealerAdmin();
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);

  const [isEditing, setIsEditing] = useState({
    email: false,
    contactNumber: false,
    Address: false,
  });
  const [editedValues, setEditedValues] = useState({
    email: "",
    contactNumber: "",
    Address: "",
  });

  useEffect(() => {
    // Sync with the context data when it changes
    if (dealerDetails) {
      setEditedValues({
        email: dealerDetails.email || "",
        contactNumber: dealerDetails.contactNumber || "",
        Address: dealerDetails.Address || "",
      });
    }
  }, [dealerDetails]);

const handleEdit = (field: keyof DealerDetails) => {
  setIsEditing((prevState) => ({
    ...prevState,
    [field]: true,
  }));
};

const handleCancel = (field: keyof DealerDetails) => {
  setEditedValues((prev) => ({
    ...prev,
    [field]: dealerDetails[field], // ✅ No more TS7053 error
  }));

  setIsEditing((prev) => ({
    ...prev,
    [field]: false,
  }));
};

const handleSave = async (field: keyof DealerDetails) => {
  const token = sessionStorage.getItem("authTokenDealer");
  const fieldValue = editedValues[field];

  if (!fieldValue || fieldValue === dealerDetails[field]) return;

  try {
    const response = await fetch(
      `https://zoomautos.co.uk/api/Signup/${dealerDetails.Id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ [field]: fieldValue }),
      }
    );

    if (response.ok) {
      const updatedData = await response.json();
      updateDealerDetails(updatedData.user);
      localStorage.setItem("DealerData", JSON.stringify(updatedData.user));

      setIsEditing((prev) => ({ ...prev, [field]: false }));
    } else {
      console.error("Failed to update field:", field);
    }
  } catch (error) {
    console.error("Error updating dealer details:", error);
  }
};

  const handlePasswordReset = async () => {
    if (!currentPassword || !newPassword) {
      alert("Please fill in both fields.");
      return;
    }
    const token = sessionStorage.getItem("authTokenDealer");

    try {
      const response = await fetch(`https://zoomautos.co.uk/api/reset-password/${dealerDetails.Id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in headers
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        alert("Password updated successfully!");
        setNewPassword("");
        setCurrentPassword("");
      } else {
        const errorMessage = await response.json();
        alert(errorMessage.message || "Failed to update password.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("An error occurred while updating the password.");
    }
  };

  useEffect(() => {
    const storedDealer = localStorage.getItem("DealerData");
    if (storedDealer) {
      updateDealerDetails(JSON.parse(storedDealer)); // Sync with context
    }
  }, []);
  return (
    <div>
      <img
        src="/Background Logistics Homepage.png"
        alt="Logistics Background"
        className="background-image"
      />
      <div className="profile-container">
        <h1 className="profile-title">
          Welcome {dealerDetails.name} <IoMdContact size={26} color="#01103b" />
        </h1>

        <div className="profile-card">
          {/* Name */}
          <div className="profile-row">
            <span className="attribute">Name</span>
            <span className="value">{dealerDetails.name}</span>
          </div>

          {/* Username */}
          <div className="profile-row">
            <span className="attribute">Username</span>
            <span className="value">{dealerDetails.username}</span>
          </div>

          {/* Company */}
          <div className="profile-row">
            <span className="attribute">Company</span>
            <span className="value">{dealerDetails.companyName}</span>
          </div>

          {/* Email */}
          <div className="profile-row">
            <span className="attribute">Email</span>
            {isEditing.email ? (
              <input
                type="email"
                value={editedValues.email} // Binding to state
                onChange={(e) =>
                  setEditedValues({ ...editedValues, email: e.target.value }) // Handle change
                }
                autoFocus
              />
            ) : (
              <span className="value">{dealerDetails.email}</span>
            )}
            <div className="edit-buttons">
              {isEditing.email ? (
                <>
                  <button className="save-btn" onClick={() => handleSave("email")}>
                    <FaCheck />
                  </button>
                  <button className="cancel-btn" onClick={() => handleCancel("email")}>
                    <FaTimes />
                  </button>
                </>
              ) : (
                <button className="edit-btn" onClick={() => handleEdit("email")}>
                  <FaEdit />
                </button>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="profile-row">
            <span className="attribute">Phone</span>
            {isEditing.contactNumber ? (
              <input
                type="text"
                value={editedValues.contactNumber}
                onChange={(e) =>
                  setEditedValues({ ...editedValues, contactNumber: e.target.value })
                }
                autoFocus
              />
            ) : (
              <span className="value">{dealerDetails.contactNumber}</span>
            )}
            <div className="edit-buttons">
              {isEditing.contactNumber ? (
                <>
                  <button className="save-btn" onClick={() => handleSave("contactNumber")}>
                    <FaCheck />
                  </button>
                  <button className="cancel-btn" onClick={() => handleCancel("contactNumber")}>
                    <FaTimes />
                  </button>
                </>
              ) : (
                <button className="edit-btn" onClick={() => handleEdit("contactNumber")}>
                  <FaEdit />
                </button>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="profile-row">
            <span className="attribute">Address</span>
            {isEditing.Address ? (
              <input
                type="text"
                value={editedValues.Address}
                onChange={(e) =>
                  setEditedValues({ ...editedValues, Address: e.target.value })
                }
                autoFocus
              />
            ) : (
              <span className="value">{dealerDetails.Address}</span>
            )}
            <div className="edit-buttons">
              {isEditing.Address ? (
                <>
                  <button className="save-btn" onClick={() => handleSave("Address")}>
                    <FaCheck />
                  </button>
                  <button className="cancel-btn" onClick={() => handleCancel("Address")}>
                    <FaTimes />
                  </button>
                </>
              ) : (
                <button className="edit-btn" onClick={() => handleEdit("Address")}>
                  <FaEdit />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Password Reset Section */}
        <div className="password-reset-card">
          <h3>Reset Password</h3>
          <div className="input-group">
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <button className="eye-icon" onClick={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className="eye-icon" onClick={() => setNewPasswordVisible(!newPasswordVisible)}>
              {newPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button className="reset-btn" onClick={handlePasswordReset}>
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
