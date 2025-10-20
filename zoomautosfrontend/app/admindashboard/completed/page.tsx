"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { FaEye } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
const RecordListCompleted = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
 const router = useRouter(); // Use useHistory for navigation
const path=usePathname();
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [jobId, setJobId] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [date, setDate] = useState("");
    const [customer, setCustomer] = useState("");
    const [carReg, setCarReg] = useState(""); // New state for Car Registration filter
    const [companyName, setCompanyName] = useState(""); // New state for Company Name filter
  const [jobSuggestions, setJobSuggestions] = useState<any []>([]);
        
        const [customerSuggestions, setCustomerSuggestions] = useState<any []>([]);
        const [carRegSuggestions, setCarRegSuggestions] = useState<any []>([]);
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

        const filteredData = response.data.filter((item:any) => item.status.toLowerCase() === "completed"|| item.status.toLowerCase()==="aborted");

        setRecords(filteredData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching records:', error);
        setLoading(false);
      }
    };

    fetchRecords();
  }, [location]);

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
    

  // Function to handle view action
// Function to handle view action
const handleView = (jobId:any) => {
  // Navigate to the RecordDetails page with jobId as a query parameter
  console.log(jobId);
  router.push(`/admindashboard/completed/${jobId}`);
};
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='overalls'>
      <img
                              src="/Completed.png"
                              alt="Logistics Background"
                              className="background-image"
                            />
      <div style={{ padding: '20px', overflowX: 'auto' , marginTop:'100px'}}>
      <h1 style={{color:'white'}}>Completed job Records</h1>
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

          <table >
            
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
                                {job.servicetype === 'ONWARD VEHICLE' && job.status.toLowerCase() ==="completed" && (
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
                                                           {job.vat===true &&(
                          <>
  £ {job.price} +VAT <br />
  </>
  )}
                     {job.vat===false &&(
                          <>
  £ {job.price} excl. VAT<br />
  </>
  )}
  {job.additionalCost && (
    <>
     £  {job.additionalCost} (Additional Cost)
    </>
  )}
</td>

              
                                    <td>
                                    <button className='editdeletebutton' onClick={() => handleView(job.jobId)}><FaEye/> </button>
                                                        
                                                        
                                                        
              
                                    </td>
                                  </>
                                )}
                                {job.servicetype === 'RETURN JOB' && job.status.toLowerCase()==="completed" && (
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
                                                           {job.vat===true &&(
                          <>
  £ {job.price} +VAT <br />
  </>
  )}
                     {job.vat===false &&(
                          <>
  £ {job.price} excl. VAT<br />
  </>
  )}
  {job.additionalCost && (
    <>
     £  {job.additionalCost} (Additional Cost)
    </>
  )}
</td>

                                    <td>
                                    <button className='editdeletebutton' onClick={() => handleView(job.jobId)}><FaEye/> </button>
                                                        
                                                        
                                    </td>
                                  </>
                                )}
              {job.servicetype === 'MULTI DROP OFF' &&  job.status.toLowerCase()==="completed" &&(
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
                           
  £ {job.price}{job.vat===true ? '+VAT' : 'excl VAT'}  <br />
  {job.additionalCost && (
    <>
     £  {job.additionalCost} (Additional Cost){job.vat===true ? '+VAT' : 'excl VAT'}  <br />
    </>
  )}
</td>

              
                                    <td>
                                    <button className='editdeletebutton' onClick={() => handleView(job.jobId)}><FaEye/> </button>
                                                        
                                                        
                                    </td>
                                  </>
                                )}
              
                                {/* Render rows for other service types */}
                                {job.servicetype === 'STANDARD' && job.status.toLowerCase()==="completed" && (
                                  <>
                                    <td>{job.jobId || 'N/A'}</td>
                                    <td >{(job.customercompanyName === "" || job.customercompanyName === undefined || job.customercompanyName === null) ? `${job.customername} (Individual)` : job.customercompanyName}</td>
                                    <td >{job.servicetype || 'N/A'}</td>
                                    <td >{job.movement}</td>
                                    <td >{job.manufacturer || 'N/A'}</td>
                                    <td >{job.model || 'N/A'}</td>
                                    <td >{job.vehicleRegistration ||job.vin }</td>
                                    <td >{job.postCode || 'N/A'}</td>
                                    <td >{job.dropoffpostCode || 'N/A'}</td>
                                    {job.specificFromTime|| job.fromTime!=="ANYTIME" ? (
  <td style={{ color: 'red' }}>
    {new Date(job.fromDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
  </td>
) : (
  <td >{new Date(job.fromDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</td> // Placeholder if specificFromTime is false
)}

{job.specificToTime || job.toTime!=="ANYTIME" ? (
  <td style={{ color: 'red' }}>
    {new Date(job.toDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
  </td>
) : (
  <td >{new Date(job.toDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</td> // Placeholder if job.specificToTime || job.fromTime!=="ANYTIME" is false
)}
                                                          <td style={{ fontWeight: 700 }}>
                                                     
  £ {job.price}{job.vat===true ? '+VAT' : 'excl VAT'}  <br />
  {job.additionalCost && (
    <>
     £  {job.additionalCost} (Additional Cost){job.vat===true ? '+VAT' : 'excl VAT'}  <br />
    </>
  )}
</td>

                                    <td >
              <button className='editdeletebutton' onClick={() => handleView(job.jobId)}><FaEye/> </button>
                                                        
                                                        
                                      
                                    </td>
                                  </>
                                )}

{job.servicetype === 'ONWARD VEHICLE' && job.status.toLowerCase() ==="aborted" && (
                                  <>
                                    <td style={{color:'red'}}>{job.jobId || 'N/A'}
                                    <div style={{fontSize:'8px'}}>ABORTED</div>

                                    </td>
                                    <td style={{color:'red'}}>{(job.customercompanyName === "" || job.customercompanyName === undefined || job.customercompanyName === null) ? `${job.customername} (Individual)` : job.customercompanyName}</td>
                                    <td style={{color:'red'}}>{job.servicetype}</td>
                                    <td style={{color:'red'}}>{job.movement}</td>
                                    <td style={{color:'red'}}>
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
                                    <td style={{color:'red'}}>
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
                                    
                                    <td style={{color:'red'}}>
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
                                    <td style={{color:'red'}}>
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
                                    <td style={{color:'red'}}>
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
  <td style={{color:'red'}}>{new Date(job.fromDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</td> // Placeholder if specificFromTime is false
)}

{job.specificToTime || job.toTime!=="ANYTIME" ? (
  <td style={{ color: 'red' }}>
    {new Date(job.toDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
  </td>
) : (
  <td style={{color:'red'}}>{new Date(job.toDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</td> // Placeholder if job.specificToTime || job.fromTime!=="ANYTIME" is false
)}
                                                          <td style={{ fontWeight: 700 }}>
                                                          £ {job.price} {job.vat===true ? '+VAT' : 'excl VAT'}  <br />
  {job.additionalCost && (
    <>
     £  {job.additionalCost} (Additional Cost) {job.vat===true ? '+VAT' : 'excl VAT'}  <br />
    </>
  )}
</td>

              
                                    <td style={{color:'red'}}>
                                    <button className='editdeletebutton' onClick={() => handleView(job.jobId)}><FaEye/> </button>
                                                        
                                                        
                                                        
              
                                    </td>
                                  </>
                                )}
                                {job.servicetype === 'RETURN JOB' && job.status.toLowerCase()==="aborted" && (
                                  <>
                                    <td style={{color:'red'}}>{job.jobId || 'N/A'}
                                    <div style={{fontSize:'8px'}}>ABORTED</div>
                                    </td>
                                    <td style={{color:'red'}}>{(job.customercompanyName === "" || job.customercompanyName === undefined || job.customercompanyName === null) ? `${job.customername} (Individual)` : job.customercompanyName}</td>
                                    <td style={{color:'red'}}>{job.servicetype}</td>
                                    <td style={{color:'red'}}>{job.movement}</td>
                                    <td style={{color:'red'}}>
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
                                    <td style={{color:'red'}}>
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
                                    
                                    <td style={{color:'red'}}>
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
                                    <td style={{color:'red'}}>
                                   {job.collectionpostCode}
                                    </td>
                                    <td style={{color:'red'}}>
                                    {job.dropoffpostCode}
                                    
                                    </td>
                                    {job.specificFromTime|| job.fromTime!=="ANYTIME" ? (
  <td style={{ color: 'red' }}>
    {new Date(job.fromDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
  </td>
) : (
  <td style={{color:'red'}}>{new Date(job.fromDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</td> // Placeholder if specificFromTime is false
)}

{job.specificToTime || job.toTime!=="ANYTIME" ? (
  <td style={{ color: 'red' }}>
    {new Date(job.toDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
  </td>
) : (
  <td style={{color:'red'}}>{new Date(job.toDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</td> // Placeholder if job.specificToTime || job.fromTime!=="ANYTIME" is false
)}
                                    
                                                          <td style={{ fontWeight: 700 }}>
                                                          £ {job.price} {job.vat===true ? '+VAT' : 'excl VAT'}  <br />
  {job.additionalCost && (
    <>
     £  {job.additionalCost} (Additional Cost) {job.vat===true ? '+VAT' : 'excl VAT'}  <br />
    </>
  )}
</td>

                                    <td style={{color:'red'}}>
                                    <button className='editdeletebutton' onClick={() => handleView(job.jobId)}><FaEye/> </button>
                                                        
                                                        
                                    </td>
                                  </>
                                )}
              {job.servicetype === 'MULTI DROP OFF' &&  job.status.toLowerCase()==="aborted" &&(
                                  <>
                                    <td style={{color:'red'}}>{job.jobId || 'N/A'}
                                    <div style={{fontSize:'8px'}}>ABORTED</div>
                                    </td>
                                    <td style={{color:'red'}}>{(job.customercompanyName === "" || job.customercompanyName === undefined || job.customercompanyName === null) ? `${job.customername} (Individual)` : job.customercompanyName}</td>
                                    <td style={{color:'red'}}>{job.servicetype}</td>
                                    <td style={{color:'red'}}>{job.movement}</td>
                                    <td style={{color:'red'}}>
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
                                    <td style={{color:'red'}}>
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
                                    
                                    <td style={{color:'red'}}>
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
                                    <td style={{color:'red'}}>
                                        {job.postCode}
                                    </td>
                                    <td style={{color:'red'}}>
                                    {job.dropoffpostCode }
                                    </td>
                                    {job.specificFromTime|| job.fromTime!=="ANYTIME" ? (
  <td style={{ color: 'red' }}>
    {new Date(job.fromDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
  </td>
) : (
  <td style={{color:'red'}}>{new Date(job.fromDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</td> // Placeholder if specificFromTime is false
)}

{job.specificToTime || job.toTime!=="ANYTIME" ? (
  <td style={{ color: 'red' }}>
    {new Date(job.toDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
  </td>
) : (
  <td style={{color:'red'}}>{new Date(job.toDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</td> // Placeholder if job.specificToTime || job.fromTime!=="ANYTIME" is false
)}
                                                          <td style={{ fontWeight: 700 }}>
                                                          £ {job.price} {job.vat===true ? '+VAT' : 'excl VAT'}  <br />
  {job.additionalCost && (
    <>
     £  {job.additionalCost} (Additional Cost){job.vat===true ? '+VAT' : 'excl VAT'}  <br />
    </>
  )}
</td>

              
                                    <td style={{color:'red'}}>
                                    <button className='editdeletebutton' onClick={() => handleView(job.jobId)}><FaEye/> </button>
                                                        
                                                        
                                    </td>
                                  </>
                                )}
              
                                {/* Render rows for other service types */}
                                {job.servicetype === 'STANDARD' && job.status.toLowerCase()==="aborted" && (
                                  <>
                                    <td style={{color:'red'}}>{job.jobId || 'N/A'}
                                    <div style={{fontSize:'12px'}}>ABORTED</div>
                                    </td>
                                    <td style={{color:'red'}}>{(job.customercompanyName === "" || job.customercompanyName === undefined || job.customercompanyName === null) ? `${job.customername} (Individual)` : job.customercompanyName}</td>
                                    <td style={{color:'red'}}>{job.servicetype || 'N/A'}</td>
                                    <td style={{color:'red'}}>{job.movement}</td>
                                    <td style={{color:'red'}}>{job.manufacturer || 'N/A'}</td>
                                    <td style={{color:'red'}}>{job.model || 'N/A'}</td>
                                    <td style={{color:'red'}}>{job.vehicleRegistration ||job.vin }</td>
                                    <td style={{color:'red'}}>{job.postCode || 'N/A'}</td>
                                    <td style={{color:'red'}}>{job.dropoffpostCode || 'N/A'}</td>
                                    {job.specificFromTime|| job.fromTime!=="ANYTIME" ? (
  <td style={{ color: 'red' }}>
    {new Date(job.fromDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
  </td>
) : (
  <td style={{color:'red'}}>{new Date(job.fromDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</td> // Placeholder if specificFromTime is false
)}

{job.specificToTime || job.toTime!=="ANYTIME" ? (
  <td style={{ color: 'red' }}>
    {new Date(job.toDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
  </td>
) : (
  <td style={{color:'red'}}>{new Date(job.toDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</td> // Placeholder if job.specificToTime || job.fromTime!=="ANYTIME" is false
)}
                                                          <td style={{ fontWeight: 700 }}>
                                                          £ {job.price} {job.vat===true ? '+VAT' : 'excl VAT'}  <br />
  {job.additionalCost && (
    <>
     £  {job.additionalCost} (Additional Cost){job.vat===true ? '+VAT' : 'excl VAT'}  <br />
    </>
  )}
</td>

                                    <td style={{color:'red'}}>
              <button className='editdeletebutton' onClick={() => handleView(job.jobId)}><FaEye/> </button>
                                                        
                                                        
                                      
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
    </div>
  );
};

export default RecordListCompleted;
