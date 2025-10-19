"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { usePathname, useRouter } from "next/navigation";

const RegisteredClientsOnlyTable = () => {
    const [clients, setClients] = useState<any>([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [emailFilter, setEmailFilter] = useState(""); // New email filter
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false); // Modal visibility
    const [selectedClient, setSelectedClient] = useState<any>(); // Client to edit
    const [formData, setFormData] = useState<any>();
    
    const router=useRouter();
    const token = sessionStorage.getItem("Transport Admin AuthToken");
    // Fetch data from the API
    useEffect(() => {
      const fetchData = async () => {
        try {
          const clientsResponse = await axios.get("https://zoomautos.co.uk/api/Signup", {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in headers
          },
            params: { _t: new Date().getTime() } // Add timestamp to bypass cache
        });
          setClients(clientsResponse.data);
          setFilteredClients(clientsResponse.data);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching data:", err);
          setError("Failed to fetch data");
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
  
    
  
    useEffect(() => {
      const filtered = clients.filter((client:any) => {
        // Match company name if searchQuery is provided
        const matchesCompany = searchQuery
          ? client.companyName?.toLowerCase().includes(searchQuery.toLowerCase())
          : true;
    
        // Match email if emailFilter is provided
        const matchesEmail = emailFilter
          ? client.email?.toLowerCase().includes(emailFilter.toLowerCase())
          : true;
    
        return matchesCompany && matchesEmail; // Only return clients that match both filters
      });
    
      setFilteredClients(filtered);
    }, [searchQuery, emailFilter, clients]); // Re-run when any of these change
    
    useEffect(() => {
      if (!searchQuery) {
        setCompanySuggestions([]);
      } else {
        const uniqueCompanyNames = [...new Set(clients.map((client:any) => client.companyName).filter(Boolean))];
        const matchingCompanyNames = uniqueCompanyNames.filter((companyName:any) =>
          companyName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setCompanySuggestions(matchingCompanyNames);
      }
    }, [searchQuery, clients]);

    useEffect(() => {
      // Filter clients based on company name
      const filteredByCompany = searchQuery
        ? clients.filter((client:any) => client.companyName?.toLowerCase().includes(searchQuery.toLowerCase()))
        : clients;
    
      // Extract unique company names for suggestions
      const uniqueCompanyNames = [...new Set(filteredByCompany.map((client:any) => client.companyName).filter(Boolean))];
      setCompanySuggestions(searchQuery ? uniqueCompanyNames : []);
    
      // Extract emails based on the filtered companies
      const uniqueEmails = [...new Set(filteredByCompany.map((client:any) => client.email).filter(Boolean))];
      setEmailSuggestions(uniqueEmails);
    
    }, [searchQuery, clients]); // Runs when searchQuery or clients change
    
    
    useEffect(() => {
      if (!emailFilter) {
        setEmailSuggestions([]);
      } else {
        const uniqueEmails = [...new Set(clients.map((client:any) => client.email).filter(Boolean))];
        const matchingEmails = uniqueEmails.filter((email:any) =>
          email.toLowerCase().includes(emailFilter.toLowerCase())
        );
        setEmailSuggestions(matchingEmails);
      }
      
    }, [emailFilter, clients]);
    
    const handleEditClick = (client:any) => {
      setSelectedClient(client);
      setFormData(client); // Pre-fill form with client data
      setIsEditing(true);
    };
    const handleFormChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveChanges = async () => {
        try {
            await axios.put(`https://zoomautos.co.uk/api/Signup/${selectedClient._id}`, formData
              , {
                headers: {
                  Authorization: `Bearer ${token}`, // Include token in headers
              },
                params: { _t: new Date().getTime() } // Add timestamp to bypass cache
            });

            // Update client in the list
            const updatedClients = clients.map((client:any) =>
                client._id === selectedClient._id ? { ...client, ...formData } : client
            );
            setClients(updatedClients);
            setFilteredClients(updatedClients);
            setIsEditing(false);
        } catch (err) {
            console.error('Error updating client:', err);
        }
    };

    const handleCloseModal = () => {
        setIsEditing(false);
    };
const [companySuggestions, setCompanySuggestions] = useState<any>([]);
const [emailSuggestions, setEmailSuggestions] = useState<any>([]);

const handleCompanySuggestionClick = (companyName:any) => {
  setSearchQuery(companyName);
  setCompanySuggestions([]);
};

const handleEmailSuggestionClick = (email:any) => {
  setEmailFilter(email);
  setEmailSuggestions([]);
};

const handleInputChange = (e:any) => {
  setSearchQuery(e.target.value);
};

const handleEmailChange = (e:any) => {
  setEmailFilter(e.target.value);
};


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
      <>
      <div className='overalls'>
    
        <div style={{ padding: '20px', overflowX: 'auto', marginTop: '80px' }}>
            <h1>Registered Clients</h1>
            <div style={{ padding: "20px" }}>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && (
      <>
        {/* Filters */}
        <div className="filter-container">
          {/* Company Name Filter */}
          <div className="filter-item">
          
            <input
              type="text"
              placeholder="Search by company name..."
              value={searchQuery}
              onChange={handleInputChange}
              style={{
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "100%",
              }}
            />
            {/* Company Suggestions */}
            {companySuggestions.length > 0 && (
              <ul className="suggestions-list">
                {companySuggestions.map((company:any, index:any) => (
                  <li
                    key={index}
                    onClick={() => handleCompanySuggestionClick(company)}
                    className="suggestion-item"
                  >
                    {company}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Email Filter */}
          <div className="filter-item">
            <input
              type="text"
              placeholder="Search by email..."
              value={emailFilter}
              onChange={handleEmailChange}
              
            />
            {/* Email Suggestions */}
            {emailSuggestions.length > 0 && (
              <ul className="suggestions-list">
                {emailSuggestions.map((email:any, index:any) => (
                  <li
                    key={index}
                    onClick={() => handleEmailSuggestionClick(email)}
                    className="suggestion-item"
                    
                  >
                    {email}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </>
    )}
    </div>

            <table >
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Company Name</th>
                        <th>Date Joined</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClients.map((client:any, index:any) => (
                        <tr key={index} style={{ cursor: 'pointer' }}>
                            <td>{client.username || 'N/A'}</td>
                            <td>{client.name || 'N/A'}</td>
                            <td>{client.email || 'N/A'}</td>
                            <td>{client.contactNumber || 'N/A'}</td>
                            <td>{client.companyName || 'N/A'}</td>
                            <td>{
                              client?.createdAt
                              ? new Date(client.createdAt).toLocaleDateString("en-GB") // dd/mm/yyyy format
                              : "N/A"
                              }</td>
                            <td>
                                <button onClick={() => handleEditClick(client)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            
        </div>
        </div>
        
        {isEditing && (
    <div className="modal-overlay">
        <div className="modal-container">
            <h2>Edit Client Details</h2>
            <form className="modal-form">
                {Object.keys(formData).map((key) => (
                    key !== '_id' && key !== 'Id' && key !== 'createdAt' && key !== 'updatedAt' && key !== '__v' &&(
                        <div key={key} style={{ marginBottom: '10px' }}>
                            <label>{key}:</label>
                            <input
                                type="text"
                                name={key}
                                value={formData[key] || ''}
                                onChange={handleFormChange}
                            />
                        </div>
                    )
                ))}
            </form>
            <div className="modal-actions">
                <button onClick={handleCloseModal} className="cancel-btn">
                    Cancel
                </button>
                <button onClick={handleSaveChanges} className="save-btn">
                    Save Changes
                </button>
            </div>
        </div>
    </div>
)}

        </>
        
    );
};

export default RegisteredClientsOnlyTable;
