"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { FaCheckCircle,FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";



import { FaEye } from 'react-icons/fa';
const RecordListPendingPerClient = () => {
  
  const router=useRouter()
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobId, setJobId] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [date, setDate] = useState("");
  const [customer, setCustomer] = useState("");
  const [carReg, setCarReg] = useState(""); // New state for Car Registration filter
  const [companyName, setCompanyName] = useState(""); // New state for Company Name filter
      const [client, setClient] = useState<any>(null);
  const [jobSuggestions, setJobSuggestions] = useState<any []>([]);
    
    const [customerSuggestions, setCustomerSuggestions] = useState<any []>([]);
    const [carRegSuggestions, setCarRegSuggestions] = useState<any []>([]);
  useEffect(() => {
      const storedClient = sessionStorage.getItem("selectedClient");
      if (storedClient) {
        setClient(JSON.parse(storedClient));
      }
    }, []);

const token = sessionStorage.getItem("Transport Admin AuthToken");
      
  // Fetch data
  useEffect(() => {
    const fetchRecords = async () => {
      try {
      if (!client) return;
        const token = sessionStorage.getItem("Transport Admin AuthToken");
      
        const response = await axios.get("https://zoomautos.co.uk/api/Subcontract", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
        },
          params: { _t: new Date().getTime() } // Add timestamp to bypass cache
      });

const filteredData = response.data.filter((item:any) => item.status === "pending"&& item.customername === client.name && 
(item.customerid ? item.customerid === client.Id : true) // If customerId is empty, fallback to customer name check
);

// Sort the data by today's date (assuming `date` is in ISO format)
const sortedData = filteredData.sort((a: { fromDate: string }, b: { fromDate: string }) => {
  return new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime();
});

setRecords(sortedData);
setFilteredRecords(sortedData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching records:", error);
        setLoading(false);
      }
    };

    fetchRecords();
  },  [client]);

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
  const [companySuggestions, setCompanySuggestions] = useState<any>([]);

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [price, setPrice] = useState("");


  // const handleActivate = async () => {
  //   if (!price || isNaN(price) || price <= 0) {
  //     alert("Please enter a valid price.");
  //     return;
  //   }

  //   try {
  //     await axios.patch(`https://zoomautos.co.uk/api/Subcontract/${selectedJobId}`, {
  //       status: "Active",
  //       price: parseFloat(price),
  //     });

  //     // Re-fetch updated records
  //     const response = await axios.get("https://zoomautos.co.uk/api/Subcontract");
  //     const filteredData = response.data.filter((item) => item.status === "pending");
  //     setRecords(filteredData);

  //     alert("Status updated to active with price: " + price);
  //     closeModal();
  //   } catch (error) {
  //     console.error("Error updating status:", error);
  //   }
  // };

  // const handleActivate = async (jobId) => {
  //   try {
  //     // Ask the user for a price
  //     const price = prompt("Enter the price for this job:");
  
  //     // Ensure the user enters a valid price
  //     if (!price || isNaN(price) || price <= 0) {
  //       alert("Please enter a valid price.");
  //       return;
  //     }
  
  //     // Send the update request with price and status
  //     await axios.patch(`https://zoomautos.co.uk/api/Subcontract/${jobId}`, {
  //       status: "Active",
  //       price: parseFloat(price), // Convert to number
  //     });
  
  //     // Re-fetch the updated records from the server
  //     const response = await axios.get("https://zoomautos.co.uk/api/Subcontract");
  //     const filteredData = response.data.filter((item) => item.status === "pending");
  //     setRecords(filteredData); // Update the records with the latest data
  
  //     alert("Status updated to active with price: " + price);
  //   } catch (error) {
  //     console.error("Error updating status:", error);
  //   }
  // };
    

  // Function to handle delete action
  const [deletionloading,setDeletionLoading]=useState(false);
    const [deletemessage, setdeletemessage]=useState("")
    const handleDelete = async (jobId:any) => {
        setDeletionLoading(true);
        setdeletemessage(`Deleting JobID ${jobId}`);
    try {
      await axios.delete(`https://zoomautos.co.uk/api/Subcontract/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
      },
        params: { _t: new Date().getTime() } // Add timestamp to bypass cache
    });
      setRecords(records.filter((record:any) => record.jobId !== jobId));
      
      alert('Record deleted successfully');
      setDeletionLoading(false);
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  
const openEditModal = (jobId:any) => {
router.push(`/admindashboard/pending/${jobId}/form`)  
};

  // Function to handle view action
  const handleView = (jobId:any) => {
    router.push(`/admindashboard/pending/${jobId}`);
  };
  const handleActive= (jobId:any)=>{
    router.push(`/admindashboard/pending/${jobId}/activationform`)
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='overalls'>
                   <img
                                src="/Pending.png"
                                alt="Logistics Background"
                                className="background-image"
                              />
      <div style={{ padding: '20px', overflowX: 'auto', marginTop: '100px' }}>
      <h1 style={{color:'white'}}>Pending job Records</h1>
      <h1 style={{color:'white'}}>{client.companyName||client.name}</h1>
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
              <option value="MULTI DROP OFF">MULTI DROP OFF</option>
              <option value="RETURN JOB">RETURN JOB</option>
              <option value="ONWARD VEHICLE">ONWARD VEHICLE</option>
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

                      <td>
                      <button className='editdeletebutton' onClick={() => handleView(job.jobId)}><FaEye/> </button>
                        
                        <button className='editdeletebutton' onClick={() => handleDelete(job.jobId)}><MdDeleteOutline/></button>
                        <button className='editdeletebutton' onClick={() => handleActive(job.jobId)}><FaCheckCircle/></button>
                        <button className='editdeletebutton' onClick={() => openEditModal(job.jobId)}><FaEdit/></button>
                        

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

                      <td>
                        <button className='editdeletebutton' onClick={() => handleView(job.jobId)}><FaEye/> </button>
                        <button className='editdeletebutton' onClick={() => handleDelete(job.jobId)}><MdDeleteOutline/></button>
                        <button className='editdeletebutton' onClick={() => handleActive(job.jobId)}><FaCheckCircle/></button>
                        <button className='editdeletebutton' onClick={() => openEditModal(job.jobId)}><FaEdit/></button>

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

                      <td>
                        <button className='editdeletebutton' onClick={() => handleView(job.jobId)}><FaEye/> </button>
                        <button className='editdeletebutton' onClick={() => handleDelete(job.jobId)}><MdDeleteOutline/></button>
                        <button className='editdeletebutton' onClick={() => handleActive(job.jobId)}><FaCheckCircle/></button>
                        <button className='editdeletebutton' onClick={() => openEditModal(job.jobId)}><FaEdit/></button>

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
                      <td>
                        <button className='editdeletebutton' onClick={() => handleView(job.jobId)}><FaEye/> </button>
                        <button className='editdeletebutton' onClick={() => openEditModal(job.jobId)}><FaEdit/></button>
                        <button className='editdeletebutton' onClick={() => handleDelete(job.jobId)}><MdDeleteOutline/></button>
                        <button className='editdeletebutton' onClick={() => handleActive(job.jobId)}><FaCheckCircle/></button>
                        
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
      {/* {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>Enter the price before activating the job:</p>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
            />
            <button className="login-btn" onClick={handleActivate}>
              Confirm & Activate
            </button>
            <button className="close-button" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>

      )} */}
     {deletionloading && (
        <div className='overlayStyle'>
          <div className='loadingStyle'>{deletemessage}</div>
        </div>
      )}

    </div>
  );
};

export default RecordListPendingPerClient;