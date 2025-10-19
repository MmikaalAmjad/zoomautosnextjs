"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

const RecordFormActiveClient = () => {
  const { jobId } = useParams(); // Get the jobId from the URL

  const [record, setRecord] = useState(null);
  
  const handleSharedAddressChange = (e:any) => {
    const { name, value } = e.target;
    setSharedCollectionAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
    const [sharedCollectionAddress, setSharedCollectionAddress] = useState({
      collectionContactName: '',
      collectionContactPhone: '',
      collectionAddress: '',
      collectionTownCity: '',
      collectionPostCode: '',
    });
  const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState<Record<string, any>>({})
    const handleArrayChange = (
  arrayName: string,
  index: number,
  field?: string,
  subField?: string,
  value?: any
) => {
  setFormData((prev: any) => ({
    ...prev,
    [arrayName]: prev[arrayName]?.map((item: any, i: number) =>
      i === index
        ? {
            ...item,
            ...(field
              ? {
                  [field]: {
                    ...item[field],
                    ...(subField ? { [subField]: value } : value),
                  },
                }
              : {}),
          }
        : item
    ),
  }));
};

    
    
      const [activeButton, setActiveButton] = useState(null);
    
      const handleButtonClick = (button:any) => {
        setActiveButton(button);
        console.log(`${button} clicked`);
      };

      const handleChange = (e:any) => {
        const { name, value } = e.target; // Extract name and value from event
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
      const token = sessionStorage.getItem("authTokenDealer");
      
  useEffect(() => {
    const fetchRecordById = async () => {
      console.log('Fetching record for jobId:', jobId); // Log the jobId being used
      try {
        const response = await axios.get(`https://zoomautos.co.uk/api/Subcontract/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
        },
          params: { _t: new Date().getTime() } // Add timestamp to bypass cache
      });
        console.log('Fetched record:', response.data); // Log the fetched record

        setFormData(response.data); // Set the fetched record to state
        console.log(formData.carType);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching record by ID:', error);
        setLoading(false);
      }
    };

    if (jobId) {
      fetchRecordById(); // Fetch the record only if jobId exists
    }
  }, [jobId]); // Add jobId to the dependency array

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='overalls'>
      <div style={{ padding: '20px', overflowX: 'auto' , marginTop:'100px', alignContent:'center',
        justifyContent: 'center', 
        alignItems: 'center', 
      }}>
        <h1>JOB ID: {formData.jobId}</h1>
        <h1>Service Type: {formData.servicetype}</h1>
        <div className="move-container">
        
        <div className="mve-form">
        <h2>Customer Details</h2>
             <div className="form-row">
               <div className="form-group">
                 <label htmlFor="price">Price</label>
                 <input
                   type="text"
                   id="price"
                   name="price"
                   value={formData.price}
                   readOnly    
                   required
                 />
               </div>
               </div>
               {formData.additionalCost &&(
                <div>
                    <div className="form-row">
               <div className="form-group">
                 <label htmlFor="">Additional Cost</label>
                 <input
                   type="text"
                   id="additionalCost"
                   name="additionalCost"
                   value={formData.additionalCost}
                   readOnly
                   required
                 />
               </div>
               <div className='form-row'>
               <div className="form-group">
                 <label htmlFor="">Additional Cost Reason</label>
                 <textarea
                   
                   id="additionalCost"
                   name="additionalCostReason"
                   value={formData.additionalCostReason}
                   readOnly
                   required
                 />
               </div>
               </div>
               </div>
               </div>
               )}
            
             
          
        {formData.servicetype==="MULTI DROP OFF" &&(
            <>
             <h2>Customer Details</h2>
             <div className="form-row">
               <div className="form-group">
                 <label htmlFor="customername">Customer Name</label>
                 <input
                   type="text"
                   id="customername"
                   name="customername"
                   value={formData.customername}
                   
                   required
                 />
               </div>
               <div className="form-group">
                 <label htmlFor="customercontact">Contact</label>
                 <input
                   type="text"
                   id="customercontact"
                   name="customercontact"
                   value={formData.customercontact}
                   
                   required
                 />
               </div>
             </div>
             <div className="form-row">
               <div className="form-group">
                 <label htmlFor="customeremail">Email</label>
                 <input
                   type="text"
                   id="customeremail"
                   name="customeremail"
                   value={formData.customeremail}
                   
                   required
                 />
               </div>
               <div className="form-group">
                 <label htmlFor="customeraddress">Address</label>
                 <input
                   type="text"
                   id="customeraddress"
                   name="customeraddress"
                   value={formData.customeraddress}
                   
                   required
                 />
               </div>
               </div>
               <h2>Services</h2>
               <div className='form-row'>
             <div className="form-group">
                     <label htmlFor="roadworthy">Vehicle MOT/ Roadworthy?</label>
                     <select id="roadworthy" name="roadworthy" value={formData.roadworthy}  required>
                     <option value="" disabled selected hidden>
                     Vehicle MOT/ Roadworthy?
           </option>
         <option value="yes">Yes</option>
         <option value="no">No</option>
       </select>
       
       
                   </div>
                   <div className="form-group">
                     <label htmlFor="fuel">Fuel Required?</label>
                     <select id="fuel" name="fuel" value={formData.fuel}  required>
                     <option value="" disabled selected hidden>
                     Fuel Required?
           </option>
         <option value="yes">Yes</option>
         <option value="no">No</option>
       </select>
       
                   </div>
                   <div className="form-group">
                     <label htmlFor="movement">Movement Type?</label>
                     <select id="movement" name="movement" value={formData.movement}  required>
                     <option value="" disabled selected hidden>
                     Fuel Required?
           </option>
         <option value="yes">Yes</option>
         <option value="no">No</option>
       </select>
       
                   </div>
                   
                   </div>
                   <div className='form-row'>
            <div className="form-group">
              <label htmlFor="movement">Movement Type?</label>
              <select id="movement" name="movement" value={formData.movement} onChange={handleChange} required>
              <option value="" disabled selected hidden>
              Movement Type?
    </option>
    <option value="INTERNAL TRANSFER">INTERNAL TRANSFER</option>
<option value="TRADE VEHICLE">TRADE VEHICLE</option>
<option value="MOTABILITY">MOTABILITY</option>
<option value="RETAIL DELIVERY">RETAIL DELIVERY</option>
<option value="FLEET DELIVERY">FLEET DELIVERY</option>
<option value="BREAKDOWN RECOVERY" >BREAKDOWN RECOVERY</option>

<option value="OTHERS" >OTHERS</option>

</select>


            </div>
            <div className="form-group">
              <label htmlFor="service">Service Type?</label>
              <select id="service" name="service" value={formData.service} onChange={handleChange} required>
              <option value="" disabled selected hidden>
              Service Type?
    </option>
    <option value="DRIVEN">DRIVEN</option>
<option value="TRANSPORT">TRANSPORT</option>
<option value="ANY" >ANY</option>

</select>


            </div>
            
            </div>
               {formData.multidropoff.map((form:any, index:any) => (
         <div key={form.id} className="vehicle-form-section">
                <div className="form-row" style={{ alignContent: 'center' }}>
                <div className="form-group">
         <label >Car Type</label>
         <div className="buttonb-bar">
         {["New Car", "Used Car"].map((button) => (
         <button
           key={button}
           type="button"
           className={`buttonb ${
             formData.multidropoff[index] &&
       formData.multidropoff[index].carType === button
         ? "active"
         : ""
       
           }`}
           onClick={() => handleButtonClick( button)} // Pass correct index
         >
           {button}
         </button>
       ))}
       
         </div>
       </div>
       
           </div>
           {/* Primary Vehicle Details */}
           {
           
           formData.multidropoff[index].carType==="New Car" &&(
             <>
                  <h2>Vehicle Details {index + 1}</h2>
                  <div className="form-row">
             <div className="form-group">
               <label>Make</label>
               <input
                 type="text"
                 name="manufacturer"
                 required
                 value={formData?.multidropoff[index]?.manufacturer || ""} // Bind the value to the state
                 onChange={(e) => handleArrayChange("multidropoff", index, e.target.value)}
                 
                 
               />

             </div>
             
             <div className="form-group">
               <label>Model</label>
               <input
                 type="text"
                 name="model"
                 value={formData?.multidropoff[index]?.model || ""} // Bind the value to the state
                 required
                 onChange={(e) => handleArrayChange("multidropoff", index, e.target.value)}
               />
               
             </div>
       
             </div>
             <div className="form-row">
           <div className="form-group">
               <label>Chassis/VIN</label>
               <input
                 type="text"
                 name="vin"
                 required
                 onChange={(e) => handleArrayChange("multidropoff", index, e.target.value)}
                 value={formData?.multidropoff[index]?.vin || ""} // Bind the value to the state
                 
               />
             </div>
             <div className="form-group">
               <label>Colour</label>
               <input
                 type="text"
                 name="colour"
                 required
                 value={formData?.multidropoff[index]?.colour || ""} // Bind the value to the state
                 onChange={(e) => handleArrayChange("multidropoff", index,e.target.value)}
               />
             </div>
           </div> 
       
       
                  </>
           )}
       
       
       {formData.multidropoff[index].carType==="Used Car" &&(
             <>
                  <h2>Vehicle Details {index + 1}</h2>
           
           {/* Vehicle Registration Input */}
           <div className="form-group">
           <label htmlFor={`vehicleRegistration-${index}`}>Vehicle Registration</label>
         <input
           type="text"
           id={`vehicleRegistration-${index}`}
           name="vehicleRegistration"
           value={formData?.multidropoff[index]?.vehicleRegistration || ''}
           onChange={(e) => handleArrayChange("multidropoff", index,e.target.value)}
           required
         />
         
           </div>
       
           {/* Make and Model Inputs */}
           <div className="form-row">
             <div className="form-group">
               <label>Make</label>
               <input
                 type="text"
                 name="manufacturer"
                 value={formData?.multidropoff[index]?.manufacturer || ""} // Bind the value to the state
               required
               onChange={(e) => handleArrayChange("multidropoff", index,e.target.value)}
               />
               
             </div>
       
             <div className="form-group">
               <label>Model<span style={{color:'red', fontSize:'0.8rem'}}> (Required)</span></label>
               <input
                 type="text"
                 name="model"
                 value={formData?.multidropoff[index]?.model || ""} // Bind the value to the state
                 // Handle onChange for dynamic vehicles
                 required
                 onChange={(e) => handleArrayChange("multidropoff", index,e.target.value)}
               />
               
             </div>
             <div className="form-group">
               <label>Chassis/VIN</label>
               <input
                 type="text"
                 name="vin"
                 value={formData?.multidropoff[index]?.vin || ""} // Bind the value to the state
                 // Handle onChange for dynamic vehicles
                 onChange={(e) => handleArrayChange("multidropoff", index,e.target.value)}
               />
             </div>
           </div>
       
           {/* Chassis/VIN and Vehicle Registration */}
           <div className="form-row">
             
             <div className="form-group">
               <label>Tax Status</label>
               <input
                 type="text"
                 name="taxStatus"
                 value={formData?.multidropoff[index]?.taxStatus || ""} // Bind the value to the state
                 // Handle onChange for dynamic vehicles
                 required
                 onChange={(e) => handleArrayChange("multidropoff", index,e.target.value)}
               />
             </div>
             <div className="form-group">
               <label>MOT Status</label>
               <input
                 type="text"
                 name="motStatus"
                 value={formData?.multidropoff[index]?.motStatus || ""} // Bind the value to the state
                 // Handle onChange for dynamic vehicles
                 required
                 onChange={(e) => handleArrayChange("multidropoff", index,e.target.value)}
               />
             </div>
             <div className="form-group">
               <label>Colour</label>
               <input
                 type="text"
                name="colour"
                 value={formData?.multidropoff[index]?.colour || ""} // Bind the value to the state
                 // Handle onChange for dynamic vehicles
                 required
                 onChange={(e) => handleArrayChange("multidropoff", index,e.target.value)}
               />
             </div>
           </div> 
           </>
           )}
           </div>
       
       ))}
         
               
       <h2>Collection Details</h2>
             <div className='form-row'>
             <div className='form-group'>
               <label htmlFor="contactName">Contact Name</label>
               <input
                   type="text"
                   id="contactName"
                   name="contactName"
                   value={formData.contactName}
                   onChange={handleChange}
                   required
                 />
             </div>
             <div className='form-group'>
               <label htmlFor="contactPhone">Contact Phone</label>
               <input
                   type="text"
                   id="contactPhone"
                   name="contactPhone"
                   value={formData.contactPhone}
                   onChange={handleChange}
                   required
                 />
             </div>
             </div>
             
       
           
               
             <div className="form-row">
               <div className="form-group">
                 <label htmlFor="collectionAddress">Collection Address:</label>
                 <input
                   type="text"
                   id="collectionAddress"
                   name="collectionAddress"
                   value={formData.collectionAddress}
                   onChange={handleChange}
                   required
                 />
               </div>
               <div className="form-group">
               <label htmlFor="City">City:</label>
                 <input
                   type="text"
                   id="City"
                   name="City"
                   value={formData.City}
                   onChange={handleChange}
                   required
                 />
               </div>
               <div className="form-group">
               <label htmlFor="postCode">Post Code:</label>
                 <input
                   type="text"
                   id="postCode"
                   name="postCode"
                   value={formData.postCode}
                   onChange={handleChange}
                   required
                 />
               </div>
             </div>
       
             <h2>Drop-Off Details</h2>
             
             <div className='form-row'>
             <div className='form-group'>
               <label htmlFor="dropoffcontactName">Contact Name</label>
               <input
                   type="text"
                   id="dropoffcontactName"
                   name="dropoffcontactName"
                   value={formData.dropoffcontactName}
                   onChange={handleChange}
                   required
                 />
             </div>
             <div className='form-group'>
               <label htmlFor="dropoffcontactPhone">Contact Phone</label>
               <input
                   type="text"
                   id="dropoffcontactPhone"
                   name="dropoffcontactPhone"
                   value={formData.dropoffcontactPhone}
                   onChange={handleChange}
                   required
                 />
             </div>
             </div>
             <div className="form-row">
               <div className="form-group">
                 <label htmlFor="dropoffAddress">Drop Off Address:</label>
                 <input
                   type="text"
                   id="dropoffAddress"
                   name="dropoffAddress"
                   value={formData.dropoffAddress}
                   onChange={handleChange}
                   required
                 />
               </div>
               <div className="form-group">
                 <label htmlFor="dropofftownCity">Town/City:</label>
                 <input
                   type="text"
                   id="dropofftownCity"
                   name="dropofftownCity"
                   value={formData.dropofftownCity}
                   onChange={handleChange}
                   required
                 />
               </div>
               <div className="form-group">
                 <label htmlFor="dropoffpostCode">Post Code:</label>
                 <input
                   type="text"
                   id="dropoffpostCode"
                   name="dropoffpostCode"
                   value={formData.dropoffpostCode}
                   onChange={handleChange}
                   required
                 />
               </div>
             </div>
       
        {/* Date and Time Section */}
        <h2>Date and Time</h2>
             <div className="form-row">
               <div className="form-group">
               <label>Collection Not Earlier Than:</label>
       <input
         type="date"
         name="fromDate"
         value={formData.fromDate}
         min={new Date().toISOString().split('T')[0]} // Set today's date as the minimum
         onChange={(e) =>
           setFormData((prevData) => ({
             ...prevData,
             fromDate: e.target.value,
           }))
         }
       />
       
               </div>
               <div className="form-group">
                 <label>To Date:</label>
                 <input
                   type="date"
                   name="toDate"
                   value={formData.toDate}
                   min={formData.fromDate} // Set today's date as the minimum
         
                   onChange={(e) =>
                     setFormData((prevData) => ({
                       ...prevData,
                       toDate: e.target.value,
                     }))
                   }
                 />
               </div>
             </div>
             <div className="form-row">
  {/* From Time Section */}
  <div className="form-group">
    <label htmlFor="fromTime">From Time:</label>
    <div className="input-container">
      <select
        id="fromTime"
        name="fromTime"
        value={formData.fromTime}
        onChange={handleChange}
        required
      >
        <option value="ANYTIME">ANYTIME</option>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>

      {/* Checkbox and Label inside the same row */}
      <input
        type="checkbox"
        id="specificFromTime"
        name="specificFromTime"
        checked={formData.specificFromTime || false}
        onChange={handleChange}
      />
      <label htmlFor="specificFromTime">Specific Date</label>
    </div>
  </div>

  {/* To Time Section */}
  <div className="form-group">
    <label htmlFor="toTime">To Time:</label>
    <div className="input-container">
      <select
        id="toTime"
        name="toTime"
        value={formData.toTime}
        onChange={handleChange}
        required
      >
        <option value="ANYTIME">ANYTIME</option>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>

      {/* Checkbox and Label inside the same row */}
      <input
        type="checkbox"
        id="specificToTime"
        name="specificToTime"
        checked={formData.specificToTime || false}
        onChange={handleChange}
      />
      <label htmlFor="specificToTime">Specific Date</label>
    </div>
  </div>
</div>
       
             <h2>Additional Information</h2>
             <div className="form-group">
               <label htmlFor="notes">Notes:</label>
               <textarea
                 id="notes"
                 name="notes"
                 value={formData.notes}
                 onChange={handleChange}
                 placeholder="Additional notes"
                 
               />
             </div>
       
             <div className="form-group">
               <label htmlFor="releaseNotes">Release Notes:</label>
               <textarea
                 id="releaseNotes"
                 name="releaseNotes"
                 value={formData.releaseNotes}
                 onChange={handleChange}
                 placeholder="Release notes"
                 
               />
             </div>
             </>
        )}
     
        {formData.servicetype==="STANDARD" &&(
            <>
        <h2>Customer Details</h2>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="customername">Customer Name</label>
          <input
            type="text"
            id="customername"
            name="customername"
            value={formData.customername}
            
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="customercontact">Contact</label>
          <input
            type="text"
            id="customercontact"
            name="customercontact"
            value={formData.customercontact}
            
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="customeremail">Email</label>
          <input
            type="text"
            id="customeremail"
            name="customeremail"
            value={formData.customeremail}
            
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="customeraddress">Address</label>
          <input
            type="text"
            id="customeraddress"
            name="customeraddress"
            value={formData.customeraddress}
            
            required
          />
        </div>
        </div>
        <h2>Services</h2>
    <div className='form-row'>
      <div className="form-group">
              <label htmlFor="roadworthy">Vehicle MOT/ Roadworthy?</label>
              <select id="roadworthy" name="roadworthy" value={formData.roadworthy}  required>
              <option value="" disabled>
              Vehicle MOT/ Roadworthy?
    </option>
  <option value="yes">Yes</option>
  <option value="no">No</option>
</select>


            </div>
            <div className="form-group">
              <label htmlFor="fuel">Fuel Required?</label>
              <select id="fuel" name="fuel" value={formData.fuel}  required>
              <option value="" disabled selected hidden>
              Fuel Required?
    </option>
  <option value="yes">Yes</option>
  <option value="no">No</option>
</select>

            </div>
            
    </div>
    <div className='form-row'>
            <div className="form-group">
              <label htmlFor="movement">Movement Type?</label>
              <select id="movement" name="movement" value={formData.movement} onChange={handleChange} required>
              <option value="" disabled selected hidden>
              Movement Type?
    </option>
    <option value="INTERNAL TRANSFER">INTERNAL TRANSFER</option>
<option value="TRADE VEHICLE">TRADE VEHICLE</option>
<option value="MOTABILITY">MOTABILITY</option>
<option value="RETAIL DELIVERY">RETAIL DELIVERY</option>
<option value="FLEET DELIVERY">FLEET DELIVERY</option>
<option value="BREAKDOWN RECOVERY" >BREAKDOWN RECOVERY</option>
<option value="OTHERS" >OTHERS</option>

</select>


            </div>
            <div className="form-group">
              <label htmlFor="service">Service Type?</label>
              <select id="service" name="service" value={formData.service} onChange={handleChange} required>
              <option value="" disabled selected hidden>
              Service Type?
    </option>
    <option value="DRIVEN">DRIVEN</option>
<option value="TRANSPORT">TRANSPORT</option>
<option value="ANY" >ANY</option>

</select>


            </div>
            
            </div>
    
    {formData.carType === "Used Car" && (
  <>
{/* Vehicle Registration */}
<div className="form-row">
  <div className="form-group">
    <label htmlFor="vehicleRegistration">Vehicle Registration</label>
    <input
      type="text"
      id="vehicleRegistration"
      name="vehicleRegistration"
      value={formData.vehicleRegistration} // Corrected
      onChange={handleChange}
      required
    />
    <button
      
      type="button"
      className="contact-button"
    >
      Lookup
    </button>
  </div>
</div>

{/* Vehicle Details */}
<div className="form-row">
  <div className="form-group">
    <label htmlFor="manufacturer">Make</label>
    <input
      type="text"
      id="manufacturer"
      name="manufacturer"
      value={formData.manufacturer}
      onChange={handleChange}
      required
    />
  </div>
  <div className="form-group">
    <label htmlFor="model">Model</label>
    <input
      type="text"
      id="model"
      name="model"
      value={formData.model || ""} // Corrected
      onChange={handleChange}
      required
    />
  </div>
  <div className="form-group">
    <label htmlFor="vin">Chasis/VIN</label>
    <input
  type="text"
  id="vin"
  name="vin"
  value={formData.vin || ""}
  onChange={handleChange}
  required
/>

  </div>
</div>

{/* Tax and MOT Details */}
<div className="form-row">
  <div className="form-group">
    <label htmlFor="taxStatus">Tax Status</label>
    <input
      type="text"
      id="taxStatus"
      name="taxStatus"
      value={formData.taxStatus || ""} // Corrected
      onChange={handleChange}
      required
    />
  </div>
  <div className="form-group">
    <label htmlFor="motStatus">MOT Status</label>
    <input
      type="text"
      id="motStatus"
      name="motStatus"
      value={formData.motStatus || ""} // Corrected
      onChange={handleChange}
      required
    />
  </div>
  <div className="form-group">
    <label htmlFor="colour">Colour</label>
    <input
      type="text"
      id="colour"
      name="colour"
      value={formData.colour || ""} // Corrected
      onChange={handleChange}
      required
    />
  </div>
</div>

  </>
)}


{formData.carType==="New Car" &&(
            <>
            <h2>New Vehicle Details</h2>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="manufacturer">Make</label>
          <input
            type="text"
            id="manufacturer"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="model">Model</label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="colour">Colour</label>
          <input
            type="text"
            id="colour"
            name="colour"
            value={formData.colour}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="vin">Chasis/VIN</label>
          <input
            type="text"
            id="vin"
            name="vin"
            value={formData.vin}
            onChange={handleChange}
            required
          />
        </div>
        </div>
        </>
          )}
          
      
      <h2>Collection Details</h2>
      <div className='form-row'>
      <div className='form-group'>
        <label htmlFor="contactName">Contact Name</label>
        <input
            type="text"
            id="contactName"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            required
          />
      </div>
      <div className='form-group'>
        <label htmlFor="contactPhone">Contact Phone</label>
        <input
            type="text"
            id="contactPhone"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            required
          />
      </div>
      </div>
      

    
        
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="collectionAddress">Collection Address:</label>
          <textarea
            
            id="collectionAddress"
            name="collectionAddress"
            value={formData.collectionAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
        <label htmlFor="City">City:</label>
          <input
            type="text"
            id="City"
            name="City"
            value={formData.City}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
        <label htmlFor="postCode">Post Code:</label>
          <input
            type="text"
            id="postCode"
            name="postCode"
            value={formData.postCode}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <h2>Drop-Off Details</h2>
      
      <div className='form-row'>
      <div className='form-group'>
        <label htmlFor="dropoffcontactName">Contact Name</label>
        <input
            type="text"
            id="dropoffcontactName"
            name="dropoffcontactName"
            value={formData.dropoffcontactName}
            onChange={handleChange}
            required
          />
      </div>
      <div className='form-group'>
        <label htmlFor="dropoffcontactPhone">Contact Phone</label>
        <input
            type="text"
            id="dropoffcontactPhone"
            name="dropoffcontactPhone"
            value={formData.dropoffcontactPhone}
            onChange={handleChange}
            required
          />
      </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dropoffAddress">Drop Off Address:</label>
          <textarea
            
            id="dropoffAddress"
            name="dropoffAddress"
            value={formData.dropoffAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dropofftownCity">Town/City:</label>
          <input
            type="text"
            id="dropofftownCity"
            name="dropofftownCity"
            value={formData.dropofftownCity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dropoffpostCode">Post Code:</label>
          <input
            type="text"
            id="dropoffpostCode"
            name="dropoffpostCode"
            value={formData.dropoffpostCode}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <h2>Date and Time</h2>
      <div className="form-row">
        <div className="form-group">
        <label>Collection Not Earlier Than:</label>
<input
  type="date"
  name="fromDate"
  value={formData.fromDate}
  min={new Date().toISOString().split('T')[0]} // Set today's date as the minimum
  onChange={(e) =>
    setFormData((prevData) => ({
      ...prevData,
      fromDate: e.target.value,
    }))
  }
/>

        </div>
        <div className="form-group">
          <label>Delivery Not Later Than:</label>
          <input
            type="date"
            name="toDate"
            value={formData.toDate}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                toDate: e.target.value,
              }))
            }
          />
        </div>
      </div>
      <div className="form-row">
  {/* From Time Section */}
  <div className="form-group">
    <label htmlFor="fromTime">From Time:</label>
    <div className="input-container">
      <select
        id="fromTime"
        name="fromTime"
        value={formData.fromTime}
        onChange={handleChange}
        required
      >
        <option value="ANYTIME">ANYTIME</option>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>

      {/* Checkbox and Label inside the same row */}
      <input
        type="checkbox"
        id="specificFromTime"
        name="specificFromTime"
        checked={formData.specificFromTime || false}
        onChange={handleChange}
      />
      <label htmlFor="specificFromTime">Specific Date</label>
    </div>
  </div>

  {/* To Time Section */}
  <div className="form-group">
    <label htmlFor="toTime">To Time:</label>
    <div className="input-container">
      <select
        id="toTime"
        name="toTime"
        value={formData.toTime}
        onChange={handleChange}
        required
      >
        <option value="ANYTIME">ANYTIME</option>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>

      {/* Checkbox and Label inside the same row */}
      <input
        type="checkbox"
        id="specificToTime"
        name="specificToTime"
        checked={formData.specificToTime || false}
        onChange={handleChange}
      />
      <label htmlFor="specificToTime">Specific Date</label>
    </div>
  </div>
</div>


      <h2>Additional Information</h2>
      <div className="form-group">
        <label htmlFor="notes">Notes:</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional notes"
          
        />
      </div>

      <div className="form-group">
        <label htmlFor="releaseNotes">Release Notes:</label>
        <textarea
          id="releaseNotes"
          name="releaseNotes"
          value={formData.releaseNotes}
          onChange={handleChange}
          placeholder="Release notes"
          
        />
        </div>

</>
      
  )}

  {(formData.servicetype==="RETURN JOB" &&(
    <>
        <h2>Services</h2>
        <div className='form-row'>
         <div className="form-group">
                 <label htmlFor="roadworthy">Vehicle MOT/ Roadworthy?</label>
                 <select id="roadworthy" name="roadworthy" value={formData.roadworthy}  required>
                 <option value="" disabled selected hidden>
                 Vehicle MOT/ Roadworthy?
       </option>
     <option value="yes">Yes</option>
     <option value="no">No</option>
   </select>
   
   
               </div>
               <div className="form-group">
                 <label htmlFor="fuel">Fuel Required?</label>
                 <select id="fuel" name="fuel" value={formData.fuel}  required>
                 <option value="" disabled selected hidden>
                 Fuel Required?
       </option>
     <option value="yes">Yes</option>
     <option value="no">No</option>
   </select>
   
               </div>
               </div>
               <div className='form-row'>
            <div className="form-group">
              <label htmlFor="movement">Movement Type?</label>
              <select id="movement" name="movement" value={formData.movement}  required>
              <option value="" disabled selected hidden>
              Movement Type?
    </option>
    <option value="INTERNAL TRANSFER">INTERNAL TRANSFER</option>
<option value="TRADE VEHICLE">TRADE VEHICLE</option>
<option value="MOTABILITY">MOTABILITY</option>
<option value="RETAIL DELIVERY">RETAIL DELIVERY</option>
<option value="FLEET DELIVERY">FLEET DELIVERY</option>
<option value="BREAKDOWN RECOVERY" >BREAKDOWN RECOVERY</option>
<option value="OTHERS" >OTHERS</option>


</select>


            </div>
            <div className="form-group">
              <label htmlFor="service">Service Type?</label>
              <select id="service" name="service" value={formData.service}  required>
              <option value="" disabled selected hidden>
              Service Type?
    </option>
    <option value="DRIVEN">DRIVEN</option>
<option value="TRANSPORT">TRANSPORT</option>
<option value="ANY" >ANY</option>

</select>


            </div>
            
            </div>
             {formData.vehicles.map((form:any, index:any) => (
     <div key={form.id} className="vehicle-form-section">
                <div className='form-row' style={{alignContent:'center'}}>
               <div className='form-group'>
     <label htmlFor="Cartype">Car Type</label>
     <div className="buttonb-bar">
       {["New Car", "Used Car"].map((button) => (
         <button
           key={button}
           type="button"
           className={`buttonb ${formData.vehicles[index].carType === button ? "active" : ""}`}
           onClick={() => handleButtonClick(button)} // Pass index to handleButtonClick
         >
           {button}
         </button>
       ))}
     </div>
   </div>
   
       </div>
       {
       
       formData.vehicles[index]?.carType==="New Car" &&(
         <>
              <h2>Vehicle Details {index + 1}</h2>
              <div className="form-row">
         <div className="form-group">
           <label>Make</label>
           <input
             type="text"
             name="manufacturer"
             value={formData?.vehicles[index]?.manufacturer || ""} // Fallback to empty string if value is undefined or null
             onChange={(e) => handleArrayChange("vehicles", index,e.target.value)}

             
             
           />

         </div>
         
         <div className="form-group">
           <label>Model</label>
           <input
             type="text"
             name="model"
             value={formData?.vehicles[index]?.model || ""}
             onChange={(e) => handleArrayChange("vehicles", index,e.target.value)}
              // Handle onChange for dynamic vehicles
           />
           
         </div>
   
         </div>
         <div className="form-row">
       <div className="form-group">
           <label>Chassis/VIN</label>
           <input
             type="text"
             name="vin"
             onChange={(e) => handleArrayChange("vehicles", index,e.target.value)}
             value={formData?.vehicles[index]?.vin || ""} // Bind the value to the state
              // Handle onChange for dynamic vehicles
           />
         </div>
         <div className="form-group">
           <label>Colour</label>
           <input
             type="text"
             name="colour"
             onChange={(e) => handleArrayChange("vehicles", index,e.target.value)}
             value={formData?.vehicles[index]?.colour || ""} // Bind the value to the state
              // Handle onChange for dynamic vehicles
           />
         </div>
       </div> 
   
   
              </>
       )}
       {formData.vehicles[index]?.carType==="Used Car" &&(
         <>
   <h2>Vehicle Details {index + 1}</h2>
       
       {/* Vehicle Registration Input */}
       <div className="form-group">
       <label htmlFor={`vehicleRegistration-${index}`}>Vehicle Registration</label>
     <input
       type="text"
       id={`vehicleRegistration-${index}`}
       name="vehicleRegistration"
       value={formData?.vehicles[index]?.vehicleRegistration || ''}
       onChange={(e) => handleArrayChange("vehicles", index,e.target.value)}
       required
     />
   
       </div>
   
       {/* Make and Model Inputs */}
       <div className="form-row">
       <div className="form-group">
     <label>Manufacturer</label>
     <input
     type="text"
     name="manufacturer" // This is important to target the correct key in the state
     value={formData?.vehicles[index]?.manufacturer || ""} // Fallback to empty string if value is undefined or null
     onChange={(e) => handleArrayChange("vehicles", index,e.target.value)}
   />
   </div>
   
   <div className="form-group">
     <label>Model</label>
     <input
       type="text"
       name="model"
       value={formData?.vehicles[index]?.model || ""}
       onChange={(e) => handleArrayChange("vehicles", index,e.target.value)}
     />
   </div>
   
   <div className="form-group">
     <label>VIN</label>
     <input
       type="text"
       name="vin"
       onChange={(e) => handleArrayChange("vehicles", index,e.target.value)}
       
     />
   </div>
   
   
   
       </div>
   
       {/* Chassis/VIN and Vehicle Registration */}
       <div className="form-row">
         
         <div className="form-group">
           <label>Tax Status</label>
           <input
             type="text"
             name="taxStatus"
             value={formData?.vehicles[index]?.taxStatus || ""} // Bind the value to the state
             onChange={(e) => handleArrayChange("vehicles", index,e.target.value)}
           />
         </div>
         <div className="form-group">
           <label>MOT Status</label>
           <input
             type="text"
             name="motStatus"
             onChange={(e) => handleArrayChange("vehicles", index,e.target.value)}
             value={formData?.vehicles[index]?.motStatus || ""} // Bind the value to the state
             
           />
         </div>
         <div className="form-group">
           <label>Colour</label>
           <input
             type="text"
             name="colour"
             onChange={(e) => handleArrayChange("vehicles", index,e.target.value)}
             value={formData?.vehicles[index]?.colour || ""} // Bind the value to the state
           />
         </div>
       </div> 
       </>
           )}
     </div>
   ))}
   {/* <div className='form-group'>
   <button type="button" className="contact-button" onClick={addVehicleForm}>
     Add Another Vehicle
   </button>
   </div> */}
       <h2>Collection Details</h2>
      <div className='form-row'>
      <div className='form-group'>
        <label htmlFor="collectioncontactName">Contact Name</label>
        <input
            type="text"
            id="collectioncontactName"
            name="collectioncontactName"
            value={formData.collectioncontactName}
            onChange={handleChange}
            required
          />
      </div>
      <div className='form-group'>
        <label htmlFor="collectioncontactPhone">Contact Phone</label>
        <input
            type="text"
            id="collectioncontactPhone"
            name="collectioncontactPhone"
            value={formData.collectioncontactPhone}
            onChange={handleChange}
            required
          />
      </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="collectionAddress">Collection Address:</label>
          <textarea
            
            id="collectionAddress"
            name="collectionAddress"
            value={formData.collectionAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="collectiontownCity">Town/City:</label>
          <input
            type="text"
            id="collectiontownCity"
            name="collectiontownCity"
            value={formData.collectiontownCity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="collectionpostCode">Post Code:</label>
          <input
            type="text"
            id="collectionpostCode"
            name="collectionpostCode"
            value={formData.collectionpostCode}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <h2>Drop-Off Details</h2>
      
      <div className='form-row'>
      <div className='form-group'>
        <label htmlFor="dropoffcontactName">Contact Name</label>
        <input
            type="text"
            id="dropoffcontactName"
            name="dropoffcontactName"
            value={formData.dropoffcontactName}
            onChange={handleChange}
            required
          />
      </div>
      <div className='form-group'>
        <label htmlFor="dropoffcontactPhone">Contact Phone</label>
        <input
            type="text"
            id="dropoffcontactPhone"
            name="dropoffcontactPhone"
            value={formData.dropoffcontactPhone}
            onChange={handleChange}
            required
          />
      </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dropoffAddress">Drop Off Address:</label>
          <textarea
            
            id="dropoffAddress"
            name="dropoffAddress"
            value={formData.dropoffAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dropofftownCity">Town/City:</label>
          <input
            type="text"
            id="dropofftownCity"
            name="dropofftownCity"
            value={formData.dropofftownCity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dropoffpostCode">Post Code:</label>
          <input
            type="text"
            id="dropoffpostCode"
            name="dropoffpostCode"
            value={formData.dropoffpostCode}
            onChange={handleChange}
            required
          />
        </div>
      </div>
   
   {formData.returnVehicles.map((form:any, index:any) => (
     <div key={form.id} className="vehicle-form-section">
     <div className='form-row' style={{alignContent:'center'}}>
               <div className='form-group'>
     <label htmlFor="Cartype">Car Type</label>
     <div className="buttonb-bar">
       {["New Car", "Used Car"].map((button) => (
         <button
           key={button}
           type="button"
           className={`buttonb ${formData.returnVehicles[index].carType === button ? "active" : ""}`}
           onClick={() => handleButtonClick(button)} // Pass index to handleButtonClick
         >
           {button}
         </button>
       ))}
     </div>
   </div>
   
       </div>
   {
   
   formData.returnVehicles[index].carType==="New Car" &&(
   <>
   <h2>Return Vehicle Details {index + 1}</h2>
   <div className="form-row">
   <div className="form-group">
   <label>Make</label>
   <input
   type="text"
   name="manufacturer"
   
   onChange={(e) => handleArrayChange("returnVehicles", index,e.target.value)}
   
   />

   </div>
   
   <div className="form-group">
   <label>Model</label>
   <input
   type="text"
   name="model"
   onChange={(e) => handleArrayChange("returnVehicles", index,e.target.value)}
   
   />

   </div>
   
   </div>
   <div className="form-row">
   <div className="form-group">
   <label>Chassis/VIN</label>
   <input
   type="text"
   name="vin"
   onChange={(e) => handleArrayChange("returnVehicles", index,e.target.value)}
   
   />
   </div>
   <div className="form-group">
   <label>Colour</label>
   <input
   type="text"
   name="colour"
   onChange={(e) => handleArrayChange("returnVehicles", index,e.target.value)}
   
   />
   </div>
   </div> 
   
   
   </>
   )}
     
   {formData.returnVehicles[index]?.carType==="Used Car" &&(
   <>
   <h2>Return Vehicle Details {index + 1}</h2>
   
   {/* Vehicle Registration Input */}
   <div className="form-group">
   <label htmlFor={`vehicleRegistration-${index}`}>Vehicle Registration</label>
   <input
   type="text"
   id={`vehicleRegistration-${index}`}
   name="vehicleRegistration"
   value={formData?.returnVehicles[index]?.vehicleRegistration || ''}
   
   required
   />
   <button

   type="button"
   className="contact-button"
   >
   Lookup
   </button>
   
   </div>
   
   {/* Make and Model Inputs */}
   <div className="form-row">
   <div className="form-group">
   <label>Manufacturer</label>
   <input
   type="text"
   name="manufacturer" // This is important to target the correct key in the state
   value={formData?.returnVehicles[index]?.manufacturer || ""} // Fallback to empty string if value is undefined or null
   onChange={(e) => handleArrayChange("returnVehicles", index,e.target.value)}
   />
   </div>
   
   <div className="form-group">
   <label>Model</label>
   <input
   type="text"
   name="model"
   value={formData?.returnVehicles[index]?.model || ""}
   onChange={(e) => handleArrayChange("returnVehicles", index,e.target.value)}
   />
   </div>
   
   <div className="form-group">
   <label>VIN</label>
   <input
   type="text"
   name="vin"
   value={formData?.returnVehicles[index]?.vin || ""}
   onChange={(e) => handleArrayChange("returnVehicles", index,e.target.value)}
   />
   </div>
   
   
   
   </div>
   
   {/* Chassis/VIN and Vehicle Registration */}
   <div className="form-row">
   
   <div className="form-group">
   <label>Tax Status</label>
   <input
   type="text"
   name="taxStatus"
   value={formData?.returnVehicles[index]?.taxStatus } // Bind the value to the state
   onChange={(e) => handleArrayChange("returnVehicles", index,e.target.value)}
   />
   </div>
   <div className="form-group">
   <label>MOT Status</label>
   <input
   type="text"
   name="motStatus"
   
   value={formData?.returnVehicles[index]?.motStatus || ""} // Bind the value to the state
   onChange={(e) => handleArrayChange("returnVehicles", index,e.target.value)}
   />
   </div>
   <div className="form-group">
   <label>Colour</label>
   <input
   type="text"
   name="colour"
   
   value={formData?.returnVehicles[index]?.colour || ""} // Bind the value to the state
   onChange={(e) => handleArrayChange("returnVehicles", index,e.target.value)}
   />
   </div>
   </div> 
   </>
   )}
   
     </div>
   ))}
   
   <h2>Collection Details</h2>
      <div className='form-row'>
      <div className='form-group'>
        <label htmlFor="returncollectioncontactName">Contact Name</label>
        <input
            type="text"
            id="returncollectioncontactName"
            name="returncollectioncontactName"
            value={formData.returncollectioncontactName=formData.dropoffcontactName}
            onChange={handleChange}
            required
          />
      </div>
      <div className='form-group'>
        <label htmlFor="returncollectioncontactPhone">Contact Phone</label>
        <input
            type="text"
            id="returncollectioncontactPhone"
            name="returncollectioncontactPhone"
            value={formData.returncollectioncontactPhone=formData.dropoffcontactPhone}
            onChange={handleChange}
            required
          />
      </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="returncollectionAddress">Collection Address:</label>
          <textarea
            
            id="returncollectionAddress"
            name="returncollectionAddress"
            value={formData.returncollectionAddress=formData.dropoffAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="returncollectiontownCity">Town/City:</label>
          <input
            type="text"
            id="returncollectiontownCity"
            name="returncollectiontownCity"
            value={formData.returncollectiontownCity=formData.dropofftownCity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="returncollectionpostCode">Post Code:</label>
          <input
            type="text"
            id="returncollectionpostCode"
            name="returncollectionpostCode"
            value={formData.returncollectionpostCode=formData.dropoffpostCode}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <h2>Drop-Off Details</h2>
      
      <div className='form-row'>
      <div className='form-group'>
        <label htmlFor="returndropoffcontactName">Contact Name</label>
        <input
            type="text"
            id="returndropoffcontactName"
            name="returndropoffcontactName"
            value={formData.returndropoffcontactName=formData.collectioncontactName}
            onChange={handleChange}
            required
          />
      </div>
      <div className='form-group'>
        <label htmlFor="returndropoffcontactPhone">Contact Phone</label>
        <input
            type="text"
            id="returndropoffcontactPhone"
            name="returndropoffcontactPhone"
            value={formData.returndropoffcontactPhone=formData.collectioncontactPhone}
            onChange={handleChange}
            required
          />
      </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="returndropoffAddress">Drop Off Address:</label>
          <textarea
            
            id="returndropoffAddress"
            name="returndropoffAddress"
            value={formData.returndropoffAddress=formData.collectionAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="returndropofftownCity">Town/City:</label>
          <input
            type="text"
            id="returndropofftownCity"
            name="returndropofftownCity"
            value={formData.returndropofftownCity=formData.collectiontownCity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="returndropoffpostCode">Post Code:</label>
          <input
            type="text"
            id="returndropoffpostCode"
            name="returndropoffpostCode"
            value={formData.returndropoffpostCode=formData.collectionpostCode}
            onChange={handleChange}
            required
          />
        </div>
      </div>

   
                           
         <h2>Date and Time</h2>
         <div className="form-row">
           <div className="form-group">
           <label>Collection Not Earlier Than:</label>
   <input
     type="date"
     name="fromDate"
     value={formData.fromDate}
     min={new Date().toISOString().split('T')[0]} // Set today's date as the minimum
     onChange={(e) =>
       setFormData((prevData) => ({
         ...prevData,
         fromDate: e.target.value,
       }))
     }
   />
   
           </div>
   
           
           <div className="form-group">
           <label>Delivery Not Later Than:</label>
   <input
     type="date"
     name="toDate"
     value={formData.toDate}
     min={formData.fromDate} // Set today's date as the minimum
     onChange={(e) =>
       setFormData((prevData) => ({
         ...prevData,
         toDate: e.target.value,
       }))
     }
   />
   
           </div>
   
                 </div>
        
                 <div className="form-row">
  {/* From Time Section */}
  <div className="form-group">
    <label htmlFor="fromTime">From Time:</label>
    <div className="input-container">
      <select
        id="fromTime"
        name="fromTime"
        value={formData.fromTime}
        onChange={handleChange}
        required
      >
        <option value="ANYTIME">ANYTIME</option>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>

      {/* Checkbox and Label inside the same row */}
      <input
        type="checkbox"
        id="specificFromTime"
        name="specificFromTime"
        checked={formData.specificFromTime || false}
        onChange={handleChange}
      />
      <label htmlFor="specificFromTime">Specific Date</label>
    </div>
  </div>

  {/* To Time Section */}
  <div className="form-group">
    <label htmlFor="toTime">To Time:</label>
    <div className="input-container">
      <select
        id="toTime"
        name="toTime"
        value={formData.toTime}
        onChange={handleChange}
        required
      >
        <option value="ANYTIME">ANYTIME</option>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>

      {/* Checkbox and Label inside the same row */}
      <input
        type="checkbox"
        id="specificToTime"
        name="specificToTime"
        checked={formData.specificToTime || false}
        onChange={handleChange}
      />
      <label htmlFor="specificToTime">Specific Date</label>
    </div>
  </div>
</div>
   
   
         <h2>Additional Information</h2>
         <div className="form-group">
           <label htmlFor="notes">Notes:</label>
           <textarea
             id="notes"
             name="notes"
             value={formData.notes}
             onChange={handleChange}
             placeholder="Additional notes"
             
           />
         </div>
   
         <div className="form-group">
           <label htmlFor="releaseNotes">Release Notes:</label>
           <textarea
             id="releaseNotes"
             name="releaseNotes"
             value={formData.releaseNotes}
             onChange={handleChange}
             placeholder="Release notes"
             
           />
         </div>
         </>
         
  ))}

{(formData.servicetype==="ONWARD VEHICLE" &&(
 <>
   <h2>Services</h2>
      <div className='form-row'>
      <div className="form-group">
              <label htmlFor="roadworthy">Vehicle MOT/ Roadworthy?</label>
              <select id="roadworthy" name="roadworthy" value={formData.roadworthy} onChange={handleChange} required>
              <option value="" disabled selected hidden>
              Vehicle MOT/ Roadworthy?
    </option>
  <option value="yes">Yes</option>
  <option value="no">No</option>
</select>


            </div>
            <div className="form-group">
              <label htmlFor="fuel">Fuel Required?</label>
              <select id="fuel" name="fuel" value={formData.fuel} onChange={handleChange} required>
              <option value="" disabled selected hidden>
              Fuel Required?
    </option>
  <option value="yes">Yes</option>
  <option value="no">No</option>
</select>

            </div>
            
            </div>
            <div className='form-row'>
            <div className="form-group">
              <label htmlFor="movement">Movement Type?</label>
              <select id="movement" name="movement" value={formData.movement} onChange={handleChange} required>
              <option value="" disabled selected hidden>
              Movement Type?
    </option>
    <option value="INTERNAL TRANSFER">INTERNAL TRANSFER</option>
<option value="TRADE VEHICLE">TRADE VEHICLE</option>
<option value="MOTABILITY">MOTABILITY</option>
<option value="RETAIL DELIVERY">RETAIL DELIVERY</option>
<option value="FLEET DELIVERY">FLEET DELIVERY</option>
<option value="BREAKDOWN RECOVERY" >BREAKDOWN RECOVERY</option>
<option value="OTHERS" >OTHERS</option>


</select>


            </div>
            <div className="form-group">
              <label htmlFor="service">Service Type?</label>
              <select id="service" name="service" value={formData.service} onChange={handleChange} required>
              <option value="" disabled selected hidden>
              Service Type?
    </option>
    <option value="DRIVEN">DRIVEN</option>
<option value="TRANSPORT">TRANSPORT</option>
<option value="ANY" >ANY</option>

</select>


            </div>
            
            </div>
        {formData.Onwardvehicle.map((form:any, index:any) => (
          <div key={form.id} className="vehicle-form-section">
            <div className='form-row' style={{alignContent:'center'}}>
            <div className='form-group'>
  <label htmlFor="Cartype">Car Type</label>
  <div className="buttonb-bar">
    {["New Car", "Used Car"].map((button) => (
      <button
        key={button}
        type="button"
        className={`buttonb ${formData.Onwardvehicle[index].carType === button ? "active" : ""}`}
       
      >
        {button}
      </button>
    ))}
  </div>
</div>

    </div>
    {formData?.Onwardvehicle[index]?.carType==="Used Car" &&(
      <>
           <h2>Vehicle Details {index + 1}</h2>
    
    {/* Vehicle Registration Input */}
    <div className="form-group">
    <label htmlFor={`vehicleRegistration-${index}`}>Vehicle Registration</label>
  <input
    type="text"
    id={`vehicleRegistration-${index}`}
    name="vehicleRegistration"
    value={formData?.Onwardvehicle[index]?.vehicleRegistration || ''}
    required
  />
    </div>

    {/* Make and Model Inputs */}
    <div className="form-row">
    <div className="form-group">
  <label>Manufacturer</label>
  <input
  type="text"
  name="manufacturer" // This is important to target the correct key in the state
  value={formData?.Onwardvehicle[index]?.manufacturer || ""} // Fallback to empty string if value is undefined or null
  onChange={(e) => handleChange(e)} // Passing both event and index to handleChange
  required
/>
</div>

<div className="form-group">
  <label>Model<span style={{color:'red', fontSize:'0.8rem'}}> (Required)</span></label>
  <input
    type="text"
    name="model"
    value={formData?.Onwardvehicle[index]?.model || ""}
    onChange={handleChange}
    required
  />
</div>

<div className="form-group">
  <label>VIN <span style={{color:'red', fontSize:'0.8rem'}}> (Optional)</span></label>
  <input
    type="text"
    name="vin"
    value={formData?.Onwardvehicle[index]?.vin || ""}
    onChange={handleChange}
  />
</div>



    </div>

    {/* Chassis/VIN and Vehicle Registration */}
    <div className="form-row">
      
      <div className="form-group">
        <label>Tax Status</label>
        <input
          type="text"
          name="taxStatus"
          required
          value={formData?.Onwardvehicle[index]?.taxStatus || ""} // Bind the value to the state
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>MOT Status</label>
        <input
          type="text"
          name="motStatus"
          required
          value={formData?.Onwardvehicle[index]?.motStatus || ""} // Bind the value to the state
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Colour</label>
        <input
          type="text"
          name="colour"
          required
          value={formData?.Onwardvehicle[index]?.colour || ""} // Bind the value to the state
          onChange={(e) => handleArrayChange("Onwardvehicle", index,e.target.value)}
        />
      </div>
    </div> 
    </>
    )}
    {formData.Onwardvehicle[index].carType==="New Car" &&(
      <>
           <h2>Vehicle Details {index + 1}</h2>
    
    {/* Vehicle Registration Input */}
    
    {/* Make and Model Inputs */}
    <div className="form-row">
      <div className="form-group">
        <label>Make</label>
        <input
          type="text"
          name="manufacturer"
          required
          onChange={(e) => handleArrayChange("Onwardvehicle", index,e.target.value)} // Handle onChange for dynamic vehicles
        />
        </div>

      <div className="form-group">
        <label>Model</label>
        <input
          type="text"
          name="model"
          required
          onChange={(e) => handleArrayChange("Onwardvehicle", index,e.target.value)} // Handle onChange for dynamic vehicles
        />
        </div>
      
    </div>

    {/* Chassis/VIN and Vehicle Registration */}
    <div className="form-row">
    <div className="form-group">
        <label>Chassis/VIN</label>
        <input
          type="text"
          name="vin"
          required
          onChange={(e) => handleArrayChange("Onwardvehicle", index,e.target.value)} // Handle onChange for dynamic vehicles
        />
      </div>
      <div className="form-group">
        <label>Colour</label>
        <input
          type="text"
          name="colour"
          required
          onChange={(e) => handleArrayChange("Onwardvehicle", index,e.target.value)} // Handle onChange for dynamic vehicles
        />
      </div>
    </div> 
    </>
    )}

            <h2>Collection Details</h2>
            {index === 0 ? (
              // Editable fields for the first vehicle
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label>Contact Name:</label>
                    <input
                      type="text"
                      name="collectionContactName"
                      value={formData.Onwardvehicle[index].collectionAddress.collectionContactName}
                      onChange={handleSharedAddressChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Contact Phone:</label>
                    <input
                      type="tel"
                      name="collectionContactPhone"
                      value={formData.Onwardvehicle[index].collectionAddress.collectionContactPhone}
                      onChange={handleSharedAddressChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Collection Address:</label>
                    <input
                      type="text"
                      name="collectionAddress"
                      value={formData.Onwardvehicle[index].collectionAddress.Address}
                      onChange={handleSharedAddressChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Town/City:</label>
                    <input
                      type="text"
                      name="collectionTownCity"
                      value={formData.Onwardvehicle[index].collectionAddress.collectionTownCity}
                      onChange={handleSharedAddressChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Post Code:</label>
                    <input
                      type="text"
                      name="collectionPostCode"
                      value={formData.Onwardvehicle[index].collectionAddress.collectionPostCode}
                      onChange={handleSharedAddressChange}
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              // Read-only fields for subsequent vehicles
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label>Contact Name:</label>
                    <input
                      type="text"
                      value={formData.Onwardvehicle[index-1]?.dropContactName || ''}
                      onChange={(e) => handleArrayChange("Onwardvehicle", index,e.target.value)}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Contact Phone:</label>
                    <input
                      type="tel"
                      value={formData.Onwardvehicle[index-1]?.dropContactPhone || ''}
                      onChange={(e) => handleArrayChange("Onwardvehicle", index,e.target.value)}
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Collection Address:</label>
                    <input
                      type="text"
                      value={formData.Onwardvehicle[index-1]?.dropAddress || ''}
                      onChange={(e) => handleArrayChange("Onwardvehicle", index,e.target.value)}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Town/City:</label>
                    <input
                      type="text"
                      value={formData.Onwardvehicle[index-1]?.dropTownCity || ''}
                      onChange={(e) => handleArrayChange("Onwardvehicle", index,e.target.value)}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Post Code:</label>
                    <input
                      type="text"
                      value={formData.Onwardvehicle[index-1]?.dropPostCode || ''}
                      onChange={(e) => handleArrayChange("Onwardvehicle", index,e.target.value)}
                      readOnly
                    />
                  </div>
                </div>
              </>
            )}

            {/* Drop-Off Details */}
            <h2>Drop-Off Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Contact Name:</label>
                <input
                  type="text"
                  name="dropContactName"
                  value={formData.Onwardvehicle[index]?.dropContactName || ''}
                  onChange={(e) => handleArrayChange("Onwardvehicle", index,e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact Phone:</label>
                <input
                  type="tel"
                  name="dropContactPhone"
                  value={formData.Onwardvehicle[index]?.dropContactPhone || ''}
                  onChange={(e) => handleArrayChange("Onwardvehicle", index,e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Drop-Off Address:</label>
                <input
                  type="text"
                  name="dropAddress"
                  value={formData.Onwardvehicle[index]?.dropAddress || ''}
                  onChange={(e) => handleArrayChange("Onwardvehicle", index,e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Town/City:</label>
                <input
                  type="text"
                  name="dropTownCity"
                  value={formData.Onwardvehicle[index]?.dropTownCity || ''}
                  onChange={(e) => handleArrayChange("Onwardvehicle", index,e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Post Code:</label>
                <input
                  type="text"
                  name="dropPostCode"
                  value={formData.Onwardvehicle[index]?.dropPostCode || ''}
                  onChange={(e) => handleArrayChange("Onwardvehicle", index,e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        ))}

            
        
        <h2>Date and Time</h2>
      <div className="form-row">
        <div className="form-group">
        <label>Collection Not Earlier Than:</label>
<input
  type="date"
  name="fromDate"
  required
  value={formData.fromDate}
  min={new Date().toISOString().split('T')[0]} // Set today's date as the minimum
  onChange={(e) =>
    setFormData((prevData) => ({
      ...prevData,
      fromDate: e.target.value,
    }))
  }
/>

        </div>
        <div className="form-group">
          <label>To Date:</label>
          <input
            type="date"
            name="toDate"
            required
            value={formData.toDate}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                toDate: e.target.value,
              }))
            }
          />
        </div>
      </div>
      <div className="form-row">
  {/* From Time Section */}
  <div className="form-group">
    <label htmlFor="fromTime">From Time:</label>
    <div className="input-container">
      <select
        id="fromTime"
        name="fromTime"
        value={formData.fromTime}
        onChange={handleChange}
        required
      >
        <option value="ANYTIME">ANYTIME</option>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>

      {/* Checkbox and Label inside the same row */}
      <input
        type="checkbox"
        id="specificFromTime"
        name="specificFromTime"
        checked={formData.specificFromTime || false}
        onChange={handleChange}
      />
      <label htmlFor="specificFromTime">Specific Date</label>
    </div>
  </div>

  {/* To Time Section */}
  <div className="form-group">
    <label htmlFor="toTime">To Time:</label>
    <div className="input-container">
      <select
        id="toTime"
        name="toTime"
        value={formData.toTime}
        onChange={handleChange}
        required
      >
        <option value="ANYTIME">ANYTIME</option>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>

      {/* Checkbox and Label inside the same row */}
      <input
        type="checkbox"
        id="specificToTime"
        name="specificToTime"
        checked={formData.specificToTime || false}
        onChange={handleChange}
      />
      <label htmlFor="specificToTime">Specific Date</label>
    </div>
  </div>
</div>

      <h2>Additional Information</h2>
      <div className="form-group">
        <label htmlFor="notes">Notes:</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional notes"
          
        />
      </div>

      <div className="form-group">
        <label htmlFor="releaseNotes">Release Notes:</label>
        <textarea
          id="releaseNotes"
          name="releaseNotes"
          value={formData.releaseNotes}
          onChange={handleChange}
          placeholder="Release notes"
          
        />
      </div>
      </>
))}
       
    
  </div>
  </div>
  </div>
  </div>
  )}


export default RecordFormActiveClient;