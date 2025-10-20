"use client"
import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';

import { usePathname, useRouter } from "next/navigation";
import { FaEye, FaSkating } from 'react-icons/fa';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { TiTick } from "react-icons/ti";
import { FaCheckCircle,FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";


const RecordListActive = () => {
  
  const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [jobId, setJobId] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [date, setDate] = useState("");
    const [customer, setCustomer] = useState("");
    const [carReg, setCarReg] = useState(""); // New state for Car Registration filter
    const [companyName, setCompanyName] = useState(""); // New state for Company Name filter
    const [jobSuggestions, setJobSuggestions] = useState<any []>([]);
      
      const [customerSuggestions, setCustomerSuggestions] = useState<any []>([]);
      const [carRegSuggestions, setCarRegSuggestions] = useState<any []>([]);
  //  const defaultText = `<h2 style="color:rgb(59, 1, 1);">Good afternoon [Client Name]</h2>
  //         <p><strong>This is to inform you we had been unable to collect your vehicle due to the following reason:</strong></p>
  //         <ul>
  //             <li>Bullet Point 1</li>
  //             <li>Bullet Point 2</li>
  //         </ul>
  //         <p>We made the call yesterday and it has been confirmed collection by the team.<br/>
  //         We also provide the details below:</p>
  //         <ul>
  //             <li><strong>Date of call:</strong> [DateOfCall]</li>
  //             <li><strong>Name of contacted person prior to collection:</strong></li>
  //             <li><strong>Name of dealer on site:</strong></li>
  //             <li><strong>Collection Date:</strong> [CollectionDate]</li>
  //         </ul>
  //         please note that we charge 100% abort fee for late cancellations and aborted movements as per our terms and conditions. If you have any questions or need any assistance fell free to contact us at 
  //         <a href="mailto:enquiries@zoomautos.co.uk">enquiries@zoomautos.co.uk</a>.
  //         `;
  
  //     const [value, setValue] = useState(defaultText);
      const [dateOfCall, setDateOfCall] = useState("");
      const [collectionDate, setCollectionDate] = useState("");
      const quillRef = useRef(null);
  
      // Function to replace placeholders in the text
      // const updateTextWithDate = (type:any, selectedDate:any) => {
      //     if (selectedDate) {
      //         const formattedDate = selectedDate.split("-").reverse().join("/"); // Convert YYYY-MM-DD to DD/MM/YYYY
      //         let updatedText = value;
  
      //         if (type === "DateOfCall") {
      //             updatedText = updatedText.replace("[DateOfCall]", formattedDate);
      //             setDateOfCall(selectedDate);
      //         } else if (type === "CollectionDate") {
      //             updatedText = updatedText.replace("[CollectionDate]", formattedDate);
      //             setCollectionDate(selectedDate);
      //         }
  
      //         setValue(updatedText);
      //     }
      // };
  
      const modules = {
          toolbar: [
              [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              ['bold', 'italic', 'underline'],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean']
          ]
      };
  
  
  const router=useRouter();
const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Modal visibility
  useEffect(() => {
    
    const fetchRecords = async () => {
      const token = sessionStorage.getItem("Transport Admin AuthToken");
      try {
        const response = await axios.get("/api/subcontract", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
        },
          params: { _t: new Date().getTime() } // Add timestamp to bypass cache
      });
      console.log(response)
        
        const filteredData = response.data.filter(
      (item:any) => item.status.toLowerCase() === "active"
    );
const sortedData = filteredData.sort((a: { fromDate: string }, b: { fromDate: string }) => {
  return new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime();
});

setRecords(sortedData);
setFilteredRecords(sortedData);


        setLoading(false);
      } catch (error) {
        console.error('Error fetching records:', error);
        setLoading(false);
      }
    };

    fetchRecords();
  },[]); // ❌ No dependency array
   useEffect(() => {
      const filtered = records.filter((record:any) => {
        const matchesJobId = !jobId || record.jobId.includes(jobId);
        const matchesServiceType = !serviceType || record.servicetype === serviceType;
        const matchesDate = !date || record.fromDate.includes(date);
        const matchesCustomer = !customer || record.customername?.toUpperCase().includes(customer.toUpperCase());
        const matchesCompanyName = !companyName || record.customercompanyName?.toUpperCase().includes(companyName.toUpperCase());
    
        // Match vehicle registration across all service types
        const matchesCarReg =
          !carReg ||
          record.vehicleRegistration?.toUpperCase().includes(carReg.toUpperCase()) || // Standard case
          record.multidropoff?.some((vehicle:any) => vehicle.vehicleRegistration?.toUpperCase().includes(carReg.toUpperCase())) ||
          record.Onwardvehicle?.some((vehicle:any) => vehicle.vehicleRegistration?.toUpperCase().includes(carReg.toUpperCase())) ||
          record.returnvehicles?.some((vehicle:any) => vehicle.vehicleRegistration?.toUpperCase().includes(carReg.toUpperCase())) ||
          record.vehicles?.some((vehicle:any) => vehicle.vehicleRegistration?.toUpperCase().includes(carReg.toUpperCase()));
    
        return matchesJobId && matchesServiceType && matchesDate && matchesCustomer && matchesCompanyName && matchesCarReg;
      });
    
      setFilteredRecords(filtered);
    }, [jobId, serviceType, date, customer, carReg, companyName, records]);
    
  
    // Autocomplete for Job ID
    useEffect(() => {
      if (!jobId) {
        setJobSuggestions([]);
      } else {
        const uniqueJobIds = [...new Set(records.map((record:any) => record.jobId))];
        const matchingJobs = uniqueJobIds.filter((id) => id.includes(jobId));
        setJobSuggestions(matchingJobs);
      
      const normalizedInput = jobId.trim().toUpperCase();
    
        // Check if the input matches an existing registration exactly
        if (uniqueJobIds.includes(normalizedInput)) {
          setJobSuggestions([]); // Clear suggestions if exact match is found
        } else {
          // Otherwise, filter matching suggestions
          const matchingJobs = uniqueJobIds.filter((reg) =>
            reg.includes(normalizedInput)
          );
          setJobSuggestions(matchingJobs);
        }
      }
    }, [jobId, records]);
  
    // Autocomplete for Customer Name
    useEffect(() => {
      if (!customer) {
        setCustomerSuggestions([]);
      } else {
        const uniqueCustomers = [...new Set(records.map((record:any) => record.customername))];
        const matchingCustomers = uniqueCustomers.filter((name) =>
          name && name.toUpperCase().includes(customer.toUpperCase())
        );
        setCustomerSuggestions(matchingCustomers);
      }
    }, [customer, records]);
    const [companySuggestions, setCompanySuggestions] =  useState<any []>([]);
  
    useEffect(() => {
      if (!customer) {
        setCustomerSuggestions([]); // Clear suggestions if input is empty
      } else {
        // Extract unique customer names from records
        const uniqueCustomers = [...new Set(records.map((record:any) => record.customername))];
        
        // Filter customer names that match the input
        const matchingCustomers = uniqueCustomers.filter((name) =>
          name && name.toUpperCase().includes(customer.toUpperCase())
        );
        
        // Set the suggestions
        setCustomerSuggestions(matchingCustomers);
      }
    }, [customer, records]);
  
    useEffect(() => {
      if (!companyName) {
        setCompanySuggestions([]);
      } else {
        const uniqueCompanies = [...new Set(records.map((record:any) => record.customercompanyName))];
        const matchingCompanies = uniqueCompanies.filter((name) =>
          name && name.toUpperCase().includes(companyName.toUpperCase())
        );
        const normalizedInput = companyName.trim().toUpperCase();
    
        // Check if the input matches an existing registration exactly
        if (uniqueCompanies.includes(normalizedInput)) {
          setCompanySuggestions([]); // Clear suggestions if exact match is found
        } else {
          // Otherwise, filter matching suggestions
          const matchingCompanies = uniqueCompanies.filter((reg) =>
            reg.includes(normalizedInput)
          );
          setCompanySuggestions(matchingCompanies);
        }
        
      }
    }, [companyName, records]);
    useEffect(() => {
      if (!carReg) {
        setCarRegSuggestions([]);
      } else {
        // Extract car registrations based on service type
        const allCarRegs = records.flatMap((record:any) => {
          if (record.servicetype === 'ONWARD VEHICLE' && record.Onwardvehicle?.length) {
            return record.Onwardvehicle.map((vehicle:any) => vehicle.vehicleRegistration);
          } 
          else if (record.servicetype === 'MULTI DROP OFF' && record.multidropoff?.length) {
            return record.multidropoff.map((vehicle:any) => vehicle.vehicleRegistration);
          } 
          else if (record.servicetype === 'RETURN JOB') {
            const returnVehicles = record.returnVehicles?.map((vehicle:any) => vehicle.vehicleRegistration) || [];
            const vehicles = record.vehicles?.map((vehicle:any) => vehicle.vehicleRegistration) || [];
            return [...returnVehicles, ...vehicles]; // Merge both arrays
          } 
          else if (record.servicetype === 'STANDARD' && record.vehicleRegistration) {
            return [record.vehicleRegistration];
          }
          return []; // Default case
        });
    
        // Remove duplicates & normalize (trim & lowercase)
        const uniqueCarRegs = [
          ...new Set(
            allCarRegs
              .map((reg) => reg?.trim().toUpperCase()) // Normalize
              .filter(Boolean) // Remove empty values
          )
        ];
    
        // Normalize the input for comparison
        const normalizedInput = carReg.trim().toUpperCase();
    
        // Check if the input matches an existing registration exactly
        if (uniqueCarRegs.includes(normalizedInput)) {
          setCarRegSuggestions([]); // Clear suggestions if exact match is found
        } else {
          // Otherwise, filter matching suggestions
          const matchingCarRegs = uniqueCarRegs.filter((reg) =>
            reg.includes(normalizedInput)
          );
          setCarRegSuggestions(matchingCarRegs);
        }
      }
    }, [carReg, records]); 
   
    // Clear all filters
    const clearFilters = () => {
      setJobId("");
      setServiceType("");
      setDate("");
      setCustomer("");
      setCarReg("");
      setCompanyName("");
    };
  const [deletionloading,setDeletionLoading]=useState(false);
          const [deletemessage, setdeletemessage]=useState("")
      

  // Function to handle delete action
  const handleDelete = async (jobId:any) => {
    setDeletionLoading(true);
      setdeletemessage(`Editing JobID ${jobId}`);
    try {
      await axios.delete(`/api/subcontract/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
      },});
      setRecords(records.filter((record:any) => record.jobId !== jobId)); // Update the state to remove deleted record
      alert('Record deleted successfully');
      setDeletionLoading(false);
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };
  const [jobStatus, setJobStatus] = useState(""); // "Completed" or "Aborted"
  const [abortReason, setAbortReason] = useState(""); // Rich text input
  const openModal = (jobId:any) => {
    
    setSelectedJobId(jobId);
    console.log(jobId)
    setIsEditing(true);
    handleConfirm();
};

// Close modal
const handleCloseModal = () => {
    setIsEditing(false);
    setSelectedJobId(null);
    setJobStatus("");
    setAbortReason("");
    setDateOfCall("");
    setCollectionDate("");
};
   // Handle confirm action
   const token = sessionStorage.getItem("Transport Admin AuthToken");
   const handleConfirm = async () => {
    const formData = records.find((record:any) => record.jobId === selectedJobId);
    
    if (!selectedJobId) {
        console.error("❌ Job record not found.");
        return;
    }

    try {
        if (jobStatus === "Completed") {
          setDeletionLoading(true);
          setdeletemessage(`Marking JobID ${jobId} Completed`);
       
            await axios.patch(`/api/subcontract/${selectedJobId}`, { status: "Completed" }, {
              headers: {
                Authorization: `Bearer ${token}`, // Add JWT token
                "Content-Type": "application/json", // Ensure JSON format
              },
            });

            await axios.post(
  "https://zoomautos.co.uk/api/Email/sendCompletion-email",
  { formData, jobId: selectedJobId } // merge jobId into the body
);

            
        } else if (jobStatus === "Aborted") {
          setDeletionLoading(true);
          setdeletemessage(`Marking JobID ${jobId} Aborted`);
       
            await axios.patch(`/api/subcontract/${selectedJobId}`, {
                status: "Aborted",
                // reason: value,
                dateOfCall,
                collectionDate
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Add JWT token
                "Content-Type": "application/json", // Ensure JSON format
              },
            }
          );
          
        handleCloseModal();

            await axios.post("https://zoomautos.co.uk/api/Email/sendAborted-email", {
              formData,
                jobId: selectedJobId,
                // reason: value
            });

        }

        setRecords(records.filter((record:any) => record.jobId !== selectedJobId));
        

    } catch (error:any) {
        console.error("❌ Error updating status:", error.message);
    }
};
//   const handleComplete = async (jobId) => {
//     try {
//         // Find the job record from the state
        
//         if (!payload) {
//             console.error("❌ Job record not found.");
//             return;
//         }

//         // Update job status to 'Completed' in the database
//         await axios.patch(`/api/subcontract/${jobId}`, { status: 'Completed' });

//         // Remove the completed record from Active list
//         setRecords(records.filter((record) => record.jobId !== jobId));

//         try {
//             // Send job details to email API
//             const response2 = await axios.post(
//                 "https://zoomautos.co.uk/api/Email/sendCompletion-email",
//                 payload, // ✅ Send the object directly, not wrapped in another object
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );

//             if (response2.status === 200) {
//                 console.log("✅ Email sent successfully!");
//             } else {
//                 console.log("⚠️ Unexpected response:", response2.status);
//             }
//         } catch (error) {
//             console.error("❌ Error sending email:", error.response ? error.response.data : error.message);
//         }

//         alert("Status updated to Completed");
//     } catch (error) {
//         console.error("❌ Error updating status:", error);
//     }
// };

  // Function to handle view action
  const handleView = (jobId:any) => {
    // Navigate to the RecordDetails page with jobId as a query parameter
    console.log(jobId);
    router.push(`/admindashboard/active/${jobId}`);
  };
  const handlEdit =(jobId:any)=>{
    router.push(`/admindashboard/active/${jobId}/form`)
  }
  useEffect(() => {
      if (deletionloading) {
        const timer = setTimeout(() => {
          
            setDeletionLoading(false);
            window.location.reload(); // Only reload if success is true
           
        }, 2000);
    
        return () => clearTimeout(timer); // Cleanup on re-render
      }
    }, [deletionloading]); // Runs when `success` or `failure` changes
  if (loading) {
    return <div>Loading...</div>;
  }
  
  

  return (
    <div className='overalls'>
      <img
                          src="/Active.png"
                          alt="Logistics Background"
                          className="background-image"
                        />
      <div style={{ padding: '20px', overflowX: 'auto' , marginTop:'100px'}}>
      <h1 style={{color:'white'}}>Active job Records</h1>
        <div className="filter-container">
          {/* Job ID Filter */}
          <div className="filter-item">
            <input
              type="text"
              placeholder="Search by Job ID..."
              value={jobId}
              onChange={(e) => setJobId(e.target.value)}
            />
            {jobSuggestions.length > 0 && (
              <ul className="suggestions-list">
                {jobSuggestions.map((id, index) => (
                  <li
                    key={index}
                    onClick={() => setJobId(id)}
                    className="suggestion-item"
                  >
                    {id}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Service Type Filter */}
          <div className="filter-item">
            <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
              <option value="">All Service Types</option>
              <option value="STANDARD">STANDARD</option>
              <option value="MultiDrop off">MultiDrop off</option>
              <option value="Return Job">Return Job</option>
              <option value="Onward Vehicle">Onward Vehicle</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="filter-item">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Customer Name Filter */}
          <div className="filter-item">
            <input
              type="text"
              placeholder="Search by Company Name..."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            {companySuggestions.length > 0 && (
              <ul className="suggestions-list">
                {companySuggestions.map((name, index) => (
                  <li
                    key={index}
                    onClick={() => setCompanyName(name)}
                    className="suggestion-item"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Car Registration Filter */}
          <div className="filter-item">
  <input
    type="text"
    placeholder="Search by Car Registration..."
    value={carReg}
    onChange={(e) => setCarReg(e.target.value)}
  />
  {carRegSuggestions.length > 0 && (
    <ul className="suggestions-list">
      {carRegSuggestions.map((reg, index) => (
        <li
          key={index}
          onClick={() => setCarReg(reg)}
          className="suggestion-item"
        >
          {reg}
        </li>
      ))}
    </ul>
  )}
</div>
<div className="filter-item">
  <input
    type="text"
    placeholder="Search by Customer Name..."
    value={customer}
    onChange={(e) => setCustomer(e.target.value)}
  />
  {customerSuggestions.length > 0 && (
    <ul className="suggestions-list">
      {customerSuggestions.map((name, index) => (
        <li
          key={index}
          onClick={() => setCustomer(name)} // Set input value when clicked
          className="suggestion-item"
        >
          {name}
        </li>
      ))}
    </ul>
  )}
</div>

          {/* Clear Filters Button */}
          <div className="filter-item">
            <button className='buttonm' onClick={clearFilters}>Clear Filters</button>
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>Job ID</th>
                <th>Customer</th>
                <th>Service Type</th>
                <th>Movement Type</th>
                <th>Car Make</th>
                <th>Model</th>
                <th>Reg/VIN</th>
                <th>Postcode From</th>
                <th>Postcode To</th>
                <th>Earliest Collection</th>
                <th>Latest Delivery</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((job:any) => (
                <tr key={job.jobId}>
                  {/* Render table rows based on service type */}
                  {job.servicetype === 'ONWARD VEHICLE' && (
                    <>
                      <td>{job.jobId || 'N/A'}</td>
                      <td>{(job.customercompanyName === "" || job.customercompanyName === undefined || job.customercompanyName === null) ? `${job.customername} (Individual)` : job.customercompanyName}</td>
                      <td>{job.servicetype}</td>
                      <td>{job.movement}</td>
                      <td>
                        {job.Onwardvehicle && job.Onwardvehicle.length > 0 ? (
                          job.Onwardvehicle.map((vehicle:any, idx:any) => (
                            <div key={idx}>
                              <li>{vehicle.manufacturer || 'N/A'}</li>
                            </div>
                          ))
                        ) : (
                          <span>No onward vehicles</span>
                        )}
                      </td>
                      <td>
                        {job.Onwardvehicle && job.Onwardvehicle.length > 0 ? (
                          job.Onwardvehicle.map((vehicle:any, idx:any) => (
                            <div key={idx}>
                              <li>{vehicle.model || 'N/A'}</li>
                            </div>
                          ))
                        ) : (
                          <span>No onward vehicles</span>
                        )}
                      </td>
                      
                      <td>
                        {job.Onwardvehicle && job.Onwardvehicle.length > 0 ? (
                          job.Onwardvehicle.map((vehicle:any, idx:any) => (
                            <div key={idx}>
                              <li>{vehicle.vehicleRegistration ||vehicle.vin }</li>
                            </div>
                          ))
                        ) : (
                          <span>No onward vehicles</span>
                        )}
                      </td>
                      <td>
                        {job.Onwardvehicle && job.Onwardvehicle.length > 0 ? (
                          job.Onwardvehicle.map((vehicle:any, idx:any) => (
                            <div key={idx}>
                              <li>{vehicle.collectionAddress?.collectionPostCode || 'N/A'}</li>
                            </div>
                          ))
                        ) : (
                          <span>No onward vehicles</span>
                        )}
                      </td>
                      <td>
                        {job.Onwardvehicle && job.Onwardvehicle.length > 0 ? (
                          job.Onwardvehicle.map((vehicle:any, idx:any) => (
                            <div key={idx}>
                              <li>{vehicle.dropPostCode || 'N/A'}</li>
                            </div>
                          ))
                        ) : (
                          <span>No onward vehicles</span>
                        )}
                      </td>
                      {job.specificFromTime|| job.fromTime!=="ANYTIME" ? (
  <td style={{ color: 'red' }}>
    {new Date(job.fromDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
  </td>
) : (
  <td>{new Date(job.fromDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</td> // Placeholder if specificFromTime is false
)}

{job.specificToTime || job.toTime!=="ANYTIME" ? (
  <td style={{ color: 'red' }}>
    {new Date(job.toDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
  </td>
) : (
  <td>{new Date(job.toDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</td> // Placeholder if job.specificToTime || job.fromTime!=="ANYTIME" is false
)}

                      <td style={{ fontWeight: 700 }}>
                        
  £ {job.price} {job.vat===true ? '+VAT' : 'excl VAT'}  <br />
  {job.additionalCost && (
    <>
     £  {job.additionalCost} (Additional Cost){job.vat===true ? '+VAT' : 'excl VAT'}  <br />
    </>
  )}
</td>

                      <td>
                      <button className='editdeletebutton' onClick={() => handleView(job.jobId)}><FaEye/> </button>
                                          <button className='editdeletebutton' onClick={() => handleDelete(job.jobId)}><MdDeleteOutline/></button>
                                          <button className='editdeletebutton' onClick={() => openModal(job.jobId)}><TiTick/></button>
                                          <button className='editdeletebutton' onClick={() => handlEdit(job.jobId)}><FaEdit/></button>

                      </td>
                    </>
                  )}
                  {job.servicetype === 'RETURN JOB' && (
                    <>
                      <td>{job.jobId || 'N/A'}</td>
                      <td>{(job.customercompanyName === "" || job.customercompanyName === undefined || job.customercompanyName === null) ? `${job.customername} (Individual)` : job.customercompanyName}</td>
                      <td>{job.servicetype}</td>
                      <td>{job.movement}</td>
                      <td>
                        {job.vehicles && job.vehicles.length > 0 ? (
                          job.vehicles.map((vehicle:any, idx:any) => (
                            <div key={idx}>
                              <li>{vehicle.manufacturer || 'N/A'}</li>
                            </div>
                          ))
                        ) : (
                          <span>No onward vehicles</span>
                        )}
                        {job.returnVehicles && job.returnVehicles.length > 0 ? (
                          job.returnVehicles.map((vehicle:any, idx:any) => (
                            <div key={idx}>
                              <li>{vehicle.manufacturer || 'N/A'}</li>
                            </div>
                          ))
                        ) : (
                          <span>No onward vehicles</span>
                        )}
                      </td>
                      <td>
                      {job.vehicles && job.vehicles.length > 0 ? (
                          job.vehicles.map((vehicle:any, idx:any) => (
                            <div key={idx}>
                              <li>{vehicle.model || 'N/A'}</li>
                            </div>
                          ))
                        ) : (
                          <span>No onward vehicles</span>
                        )}
                        {job.returnVehicles && job.returnVehicles.length > 0 ? (
                          job.returnVehicles.map((vehicle:any, idx:any) => (
                            <div key={idx}>
                              <li>{vehicle.model || 'N/A'}</li>
                            </div>
                          ))
                        ) : (
                          <span>No onward vehicles</span>
                        )}
                      </td>
                      
                      <td>
                      {job.vehicles && job.vehicles.length > 0 ? (
                          job.vehicles.map((vehicle:any, idx:any) => (
                            <div key={idx}>
                              <li>{vehicle.vehicleRegistration || vehicle.vin}</li>
                            </div>
                          ))
                        ) : (
                          <span>No onward vehicles</span>
                        )}
                        {job.returnVehicles && job.returnVehicles.length > 0 ? (
                          job.returnVehicles.map((vehicle:any, idx:any) => (
                            <div key={idx}>
                              <li>{vehicle.vehicleRegistration || vehicle.vin}</li>
                            </div>
                          ))
                        ) : (
                          <span>No onward vehicles</span>
                        )}
                      </td>
                      <td>
                     {job.collectionpostCode}
                      </td>
                      <td>
                      {job.dropoffpostCode}
                      
                      </td>
                      {job.specificFromTime|| job.fromTime!=="ANYTIME" ? (
  <td style={{ color: 'red' }}>
    {new Date(job.fromDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
  </td>
) : (
  <td>{new Date(job.fromDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</td> // Placeholder if specificFromTime is false
)}

{job.specificToTime || job.toTime!=="ANYTIME" ? (
  <td style={{ color: 'red' }}>
    {new Date(job.toDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
  </td>
) : (
  <td>{new Date(job.toDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</td> // Placeholder if job.specificToTime || job.fromTime!=="ANYTIME" is false
)}
                      <td style={{ fontWeight: 700 }}>
   
  £ {job.price} {job.vat===true ? '+VAT' : 'excl VAT'}  <br />
  {job.additionalCost && (
    <>
     £  {job.additionalCost} (Additional Cost){job.vat===true ? '+VAT' : 'excl VAT'}  <br />
    </>
  )}
</td>


                      <td>
                      <button className='editdeletebutton' onClick={() => handleView(job.jobId)}><FaEye/> </button>
                                          <button className='editdeletebutton' onClick={() => handleDelete(job.jobId)}><MdDeleteOutline/></button>
                                          <button className='editdeletebutton' onClick={() => openModal(job.jobId)}><TiTick/></button>
                                          <button className='editdeletebutton' onClick={() => handlEdit(job.jobId)}><FaEdit/></button>
                      </td>
                    </>
                  )}
{job.servicetype === 'MULTI DROP OFF' && (
                    <>
                      <td>{job.jobId || 'N/A'}</td>
                      <td>{(job.customercompanyName === "" || job.customercompanyName === undefined || job.customercompanyName === null) ? `${job.customername} (Individual)` : job.customercompanyName}</td>
                      <td>{job.servicetype}</td>
                      <td>{job.movement}</td>
                      <td>
                        {job.multidropoff && job.multidropoff.length > 0 ? (
                          job.multidropoff.map((vehicle:any, idx:any) => (
                            <div key={idx}>
                              <li>{vehicle.manufacturer || 'N/A'}</li>
                            </div>
                          ))
                        ) : (
                          <span>No onward vehicles</span>
                        )}
                      </td>
                      <td>
                      {job.multidropoff && job.multidropoff.length > 0 ? (
                          job.multidropoff.map((vehicle:any, idx:any) => (
                            <div key={idx}>
                              <li>{vehicle.model || 'N/A'}</li>
                            </div>
                          ))
                        ) : (
                          <span>No onward vehicles</span>
                        )}
                      </td>
                      
                      <td>
                      {job.multidropoff && job.multidropoff.length > 0 ? (
                          job.multidropoff.map((vehicle:any, idx:any) => (
                       
                            <div key={idx}>
                              <li>{vehicle.vehicleRegistration ||vehicle.vin }</li>
                            </div>
                          ))
                        ) : (
                          <span>No onward vehicles</span>
                        )}
                      </td>
                      <td>
                          {job.postCode}
                      </td>
                      <td>
                      {job.dropoffpostCode }
                      </td>
                      {job.specificFromTime|| job.fromTime!=="ANYTIME" ? (
  <td style={{ color: 'red' }}>
    {new Date(job.fromDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
  </td>
) : (
  <td>{new Date(job.fromDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</td> // Placeholder if specificFromTime is false
)}

{job.specificToTime || job.toTime!=="ANYTIME" ? (
  <td style={{ color: 'red' }}>
    {new Date(job.toDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
  </td>
) : (
  <td>{new Date(job.toDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</td> // Placeholder if job.specificToTime || job.fromTime!=="ANYTIME" is false
)}
                      <td style={{ fontWeight: 700 }}>
  
  £ {job.price} {job.vat===true ? '+VAT' : 'excl VAT'}  <br />
  {job.additionalCost && (
    <>
     £  {job.additionalCost} (Additional Cost){job.vat===true ? '+VAT' : 'excl VAT'}  <br />
    </>
  )}
</td>


                      <td>
                      <button className='editdeletebutton' onClick={() => handleView(job.jobId)}><FaEye/> </button>
                                          <button className='editdeletebutton' onClick={() => handleDelete(job.jobId)}><MdDeleteOutline/></button>
                                          <button className='editdeletebutton' onClick={() => openModal(job.jobId)}><TiTick/></button>
                                          <button className='editdeletebutton' onClick={() => handlEdit(job.jobId)}><FaEdit/></button>
                      </td>
                    </>
                  )}

                  {/* Render rows for other service types */}
                  {job.servicetype === 'STANDARD' && (
                    <>
                      <td>{job.jobId || 'N/A'}</td>
                      <td>{(job.customercompanyName === "" || job.customercompanyName === undefined || job.customercompanyName === null) ? `${job.customername} (Individual)` : job.customercompanyName}</td>
                      <td>{job.servicetype || 'N/A'}</td>
                      <td>{job.movement}</td>
                      <td>{job.manufacturer || 'N/A'}</td>
                      <td>{job.model || 'N/A'}</td>
                      <td>{job.vehicleRegistration ||job.vin }</td>
                      <td>{job.postCode || 'N/A'}</td>
                      <td>{job.dropoffpostCode || 'N/A'}</td>
                      {job.specificFromTime|| job.fromTime!=="ANYTIME" ? (
  <td style={{ color: 'red' }}>
    {new Date(job.fromDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
  </td>
) : (
  <td>{new Date(job.fromDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</td> // Placeholder if specificFromTime is false
)}

{job.specificToTime || job.toTime!=="ANYTIME" ? (
  <td style={{ color: 'red' }}>
    {new Date(job.toDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
  </td>
) : (
  <td>{new Date(job.toDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</td> // Placeholder if job.specificToTime || job.fromTime!=="ANYTIME" is false
)}
                      <td style={{ fontWeight: 700 }}>
         
  £ {job.price} {job.vat===true ? '+VAT' : 'excl VAT'}  <br />
                     
  {job.additionalCost && (
    <>
     £  {job.additionalCost} (Additional Cost){job.vat===true ? '+VAT' : 'excl VAT'}  <br />
    </>
  )}
</td>

                      <td>
<button className='editdeletebutton' onClick={() => handleView(job.jobId)}><FaEye/> </button>
                                          <button className='editdeletebutton' onClick={() => handleDelete(job.jobId)}><MdDeleteOutline/></button>
                                          <button className='editdeletebutton' onClick={() => openModal(job.jobId)}><TiTick/></button>
                                          <button className='editdeletebutton' onClick={() => handlEdit(job.jobId)}><FaEdit/></button>
                        
                      </td>
                    </>
                  )}
                  
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
      {isEditing && (
    <div className="modal-overlay">
        <div className="modal-container">
        <h3>Select Job Status</h3>

{/* ✅ Radio Buttons for Completed/Aborted */}
<div className='radiocontainer'>

    <label>
        <input type="radio" value="Completed" checked={jobStatus === "Completed"} onChange={() => setJobStatus("Completed")} />
        <span>Completed</span>
    </label>
    <label>
        <input type="radio" value="Aborted" checked={jobStatus === "Aborted"} onChange={() => setJobStatus("Aborted")} />
        <span> Aborted</span>
    </label>
</div>
{/* {jobStatus==="Aborted"&&(
            <form className="modal-form">
                <ReactQuill ref={quillRef} value={value} onChange={setValue} modules={modules} />
                
                            <h3>Select Dates:</h3>
                            <label><strong>Date of Call:</strong></label>
                            <input 
                                type="date" 
                                value={dateOfCall} 
                                onChange={(e) => updateTextWithDate("DateOfCall", e.target.value)} 
                            />
                            
                            <br /><br />
                            
                            <label><strong>Collection Date:</strong></label>
                            <input 
                                type="date" 
                                value={collectionDate} 
                                onChange={(e) => updateTextWithDate("CollectionDate", e.target.value)} 
                            />
                
                            <h3>Preview:</h3>
                            <div dangerouslySetInnerHTML={{ __html: value }} />
            </form>
            )} */}
            <div className="modal-actions">
                <button onClick={handleCloseModal} className="cancel-btn">
                    Cancel
                </button>
                <button onClick={handleConfirm} className="save-btn">
                    Save Changes
                </button>
            </div>
            
        </div>
    </div>

)}
{deletionloading && (
        <div className='overlayStyle'>
          <div className='loadingStyle'>{deletemessage}</div>
        </div>
      )}
    </div>
  );
};

export default RecordListActive;
