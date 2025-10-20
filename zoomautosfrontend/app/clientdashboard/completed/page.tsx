"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useDealerAdmin } from '@/components/clientcontext/clientcontext';
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const RecordListCompletedClient = () => {
    const router=useRouter();
const { dealerDetails, updateDealerDetails } = useDealerAdmin();
const path=usePathname();
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
    
      
useEffect(() => {
    const storedUser = localStorage.getItem('DealerData');
    console.log("LocalStorage Data:", storedUser); // Debugging

    if (storedUser) {
        try {
            const user = JSON.parse(storedUser);
            if (user?.Id) {
                updateDealerDetails(user); // Set dealer details
            } else {
                console.log("DealerData is missing 'Id'.");
            }
        } catch (error) {
            console.error("Error parsing DealerData:", error);
        }
    } else {
        console.log("No DealerData found in localStorage.");
    }
}, []);
  useEffect(() => {
    const fetchRecords = async () => {
      const token = sessionStorage.getItem("authTokenDealer");
      
      try {
        const response = await axios.get("/api/subcontract", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
        },
          params: { _t: new Date().getTime() } // Add timestamp to bypass cache
      });

        const filteredData = response.data.filter((item:any) => (item.status.toLowerCase() === "completed" ||item.status.toLowerCase()==="aborted") && item.customername===dealerDetails.name && item.customercompanyName===dealerDetails.companyName);

        setRecords(filteredData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching records:', error);
        setLoading(false);
      }
    };

    fetchRecords();
  },[dealerDetails]); // ❌ No dependency array
    // Filter logic
      useEffect(() => {
        const filtered = records.filter((record:any) => {
          const matchesJobId = jobId ? record.jobId.includes(jobId) : true;
          const matchesServiceType = serviceType ? record.servicetype === serviceType : true;
          const matchesDate = date ? record.fromDate.includes(date) : true;
          const matchesCustomer = customer ? record.customername.toLowerCase().includes(customer.toLowerCase()) : true;
          
          const matchesCarReg = carReg ? record.vehicleRegistration?.toLowerCase().includes(carReg.toLowerCase()) : true; // New filter for Car Registration
          const matchesCompanyName = companyName ? record.customercompanyName?.toLowerCase().includes(companyName.toLowerCase()) : true; // New filter for Company Name
    
          return matchesJobId && matchesServiceType && matchesDate && matchesCustomer && matchesCarReg && matchesCompanyName;
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
        }
      }, [jobId, records]);
    
      // Autocomplete for Customer Name
      useEffect(() => {
        if (!customer) {
          setCustomerSuggestions([]);
        } else {
          const uniqueCustomers = [...new Set(records.map((record:any) => record.customername))];
          const matchingCustomers = uniqueCustomers.filter((name) =>
            name && name.toLowerCase().includes(customer.toLowerCase())
          );
          setCustomerSuggestions(matchingCustomers);
        }
      }, [customer, records]);
    const [companySuggestions, setCompanySuggestions] =  useState<any []>([]);
      useEffect(() => {
        if (!companyName) {
          setCompanySuggestions([]);
        } else {
          const uniqueCompanies = [...new Set(records.map((record:any) => record.customercompanyName))];
          const matchingCompanies = uniqueCompanies.filter((name) =>
            name && name.toLowerCase().includes(companyName.toLowerCase())
          );
          setCompanySuggestions(matchingCompanies);
        }
      }, [companyName, records]);
    
      useEffect(() => {
        if (!carReg) {
          setCarRegSuggestions([]);
        } else {
          // Extract car registrations based on service type
          const allCarRegs = records.flatMap((record:any) => {
            if (record.servicetype === 'Onward Vehicle' && record.Onwardvehicle) {
              // For Onward Vehicle, extract carReg from Onwardvehicle array
              return record.Onwardvehicle.map((vehicle:any) => vehicle.vehicleRegistration);
            } else if (record.servicetype === 'MULTI DROP OFF' && record.multidropoff) {
              // For Multi Drop Off, extract carReg from multidropoff array
              return record.multidropoff.map((vehicle:any) => vehicle.carReg);
            } else if (record.servicetype === 'STANDARD' || record.servicetype === 'Return Job') {
              // For STANDARD and Return Job, use the carReg directly from the record
              return [record.vehicleRegistration];
            }
            return []; // Default case
          });
      
          // Filter unique car registrations and match with the input
          const uniqueCarRegs = [...new Set(allCarRegs.filter((reg) => reg))]; // Remove undefined/null values
          const matchingCarRegs = uniqueCarRegs.filter((reg) =>
            reg.toLowerCase().includes(carReg.toLowerCase())
          );
          setCarRegSuggestions(matchingCarRegs);
        }
      }, [carReg, records]);
    useEffect(() => {
        if (!customer) {
          setCustomerSuggestions([]); // Clear suggestions if input is empty
        } else {
          // Extract unique customer names from records
          const uniqueCustomers = [...new Set(records.map((record:any) => record.customername))];
          
          // Filter customer names that match the input
          const matchingCustomers = uniqueCustomers.filter((name) =>
            name && name.toLowerCase().includes(customer.toLowerCase())
          );
          
          // Set the suggestions
          setCustomerSuggestions(matchingCustomers);
        }
      }, [customer, records]);
    
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
  const handleView = (jobId:any) => {
    // Navigate to the RecordDetails page with jobId as a query parameter
    console.log(jobId);
    router.push(`/Companies/Completed/record-details/${jobId}`);
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
          
          <div className='table-container'><table >
            <thead>
              <tr>
              <th>Job ID</th>
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
              {filteredRecords.map((job:any, index:any) => (
                <tr key={index}>
                  {/* Check for serviceType "Onward Vehicle" */}
                  {job.servicetype === 'Onward Vehicle' && (
                    <>
                      <td>{job.jobId || 'N/A'}</td>
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
                              <li>{vehicle.variant || 'N/A'}</li>
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
                                                          
                                                          £ {job.price} {job.vat===true ? '+VAT' : 'excl VAT'}   <br />
                                                          {job.additionalCost && (
                                                            <>
                                                             £  {job.additionalCost} (Additional Cost)
                                                             {job.vat===true ? '+VAT' : 'excl VAT'}  <br />
                                                            </>
                                                          )}
                                                        
                                                        </td>

                      {/* Actions column */}
                      <td>
                        <button className='editdeletebutton' onClick={() => handleView(job.jobId)}><FaEye /></button>
                        
                      </td>
                    </>
                  )}

{job.servicetype === 'STANDARD' && (
                                  <>
                                    <td>{job.jobId || 'N/A'}</td>
                                    
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
)}<td style={{ fontWeight: 700 }}>
                                                          
                                                          £ {job.price} {job.vat===true ? '+VAT' : 'excl VAT'}  <br />  <br />
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
                  {job.servicetype === 'MULTI DROP OFF' && (
                                                    <>
                                                      <td>{job.jobId || 'N/A'}</td>
                                                      
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
)}      <td style={{ fontWeight: 700 }}>
                                                          
                                                          £ {job.price} {job.vat===true ? '+VAT' : 'excl VAT'}    <br />
                                                          {job.additionalCost && (
                                                            <>
                                                             £  {job.additionalCost} (Additional Cost)
                                                             {job.vat===true ? '+VAT' : 'excl VAT'}  <br />
                                                            </>
                                                          )}
                                                        
                                                        </td>

                                
                                                      <td>
                                                      <button className='editdeletebutton' onClick={() => handleView(job.jobId)}><FaEye/> </button>
                                                      </td>
                                                    </>
                                                  )}
                  {job.servicetype === 'RETURN JOB' && (
                                                    <>
                                                      <td>{job.jobId || 'N/A'}</td>
                                                      
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
                                                          
                                                          £ {job.price}  {job.vat===true ? '+VAT' : 'excl VAT'}  <br />
                                                          {job.additionalCost && (
                                                            <>
                                                             £  {job.additionalCost} (Additional Cost) {job.vat===true ? '+VAT' : 'excl VAT'}  <br />
                                                            </>
                                                          )}
                                                        
                                                        </td>


                                                      <td>
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

export default RecordListCompletedClient;
