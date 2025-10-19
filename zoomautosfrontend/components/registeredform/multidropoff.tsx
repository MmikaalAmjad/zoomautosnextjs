"use client"
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { useDealerAdmin } from '../clientcontext/clientcontext';

const RegisteredMultidropoffVehicleForm =()=>{
const { dealerDetails, updateDealerDetails } = useDealerAdmin();
   

      const [isTermsChecked, setIsTermsChecked] = useState(false);
    
      const handleTermsCheckboxChange = (event:any) => {
        setIsTermsChecked(event.target.checked);
      };
      useEffect(() => {
          const storedUser = localStorage.getItem('DealerData');
        
          if (storedUser) {
            const user = JSON.parse(storedUser);
            updateDealerDetails(user); // Restore user details to context or state
          }
        }, []);
    const [vehicleForms, setVehicleForms] = useState([{ id: Date.now() }]);
    const [returnVehicleForms, setReturnVehicleForms] = useState([{ id: Date.now() }]);
    const [formData, setFormData] = useState<any>({
        servicetype: 'MULTI DROP OFF',
        roadworthy: '',
        collectionAddress: '',
  City: '',
  postCode: '',
  contactName: '',
  contactPhone: '',
  dropoffAddress: '',
  dropofftownCity: '',
  dropoffpostCode: '',
  dropoffcontactName: '',
  dropoffcontactPhone: '',
  
  customername:'',
  customeremail:'',
  customercontact:'',
  customeraddress:'',
  customerusername:'',
  customercompanyName:'',
  customerPostCode:'',
  customercity:'',
        fuel: '',
        
    fromDate: '',
    fromTime: 'ANYTIME',
        toDate: '',
        toTime: 'ANYTIME',
        multidropoff: [{}], // Initial empty vehicle
        notes: '',
        releaseNotes: '',
        jobId: '', // Add jobId to formData
        
      });
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [Failure,setFailure]=useState(false);
            const [failuremessage,setfailuremessage]=useState('');
          
        const openModal = () => {
          setIsModalOpen(true);
        };
      
        const closeModal = () => {
          setIsModalOpen(false);
        };
      const [jobId, setJobId] = useState('');
      const onSubmit = async (event:any) => {
        event.preventDefault();
        setLoading(true);
        if (formData.collectionAddress===formData.dropoffAddress ){
          setLoading(false);
          setFailure(true)
          setfailuremessage(failuremessage+'The Collection Address cannot be same with the delivery Address');
    
        }
        const hasDuplicate =
  // Check duplicates within the vehicles array
  formData.multidropoff.some((vehicle:any, index:any, array:any) =>
    array.some(
      (v:any, i:any) =>
        i !== index &&
        (v.vehicleRegistration === vehicle.vehicleRegistration || v.vin && v.vin === vehicle.vin)
    )
  )
  if (hasDuplicate){
    setLoading(false);
          setFailure(true)
          setfailuremessage(failuremessage+'Duplication Found in Vehicles information');
    
  }
  else{
      
        try {
          // Update all vehicles with shared collection details
          const updatedVehicles = formData.multidropoff.map((vehicle:any) => ({
            ...vehicle,
          }));

          const payload = {
            formType: "Sub Contract Jobs",
            ...formData,
            multidropoff: updatedVehicles,
            status:'pending',
            Review:'No',
            customerid:dealerDetails.Id,
            customername:dealerDetails.name,
            customeremail:dealerDetails.email,
            customeraddress:dealerDetails.Address,
            customercontact:dealerDetails.contactNumber,
            customerusername: dealerDetails.username,
            customercompanyName: dealerDetails.companyName,
            customerPostCode: dealerDetails.PostCode,
            customercity: dealerDetails.city,
          };
          const response = await axios.post("https://zoomautos.co.uk/car", payload);
      
      
          const { message, data } = response.data;
          const jobId2 = data;  // 'data' is the jobId in this case
          setJobId(jobId2);  // Set the jobId in state
          setLoading(false);
              setSuccess(true);
          
      try {
        const response2 = await axios.post("https://zoomautos.co.uk/api/Email/send-email", 
        {
        ...payload,
        jobId:data,
        } ,
        {
            headers: {
                "Content-Type": "application/json",
            },
        });
    
        if (response2.status === 200) {
            console.log("✅ Email sent successfully!");
        } else {
            console.log("⚠️ Unexpected response:", response2.status);
        }
    } catch (error:any) {
        console.error("❌ Error sending email:", error.response ? error.response.data : error.message);
    }

    } catch (error) {
      console.error('Error submitting the form:', error);
    } finally {
      setLoading(false);
    }
  }
  };
      const [existingIds, setExistingIds] = useState(new Set());
   
  
      
      // Validation function
          
          const [loading, setLoading] = useState(false);
      const [success, setSuccess] = useState(false);
    
      const addVehicleForm = () => {
        setVehicleForms((prevForms) => {
          const updatedForms = [...prevForms, { id: Date.now() }];
          return updatedForms;
        });
      
        setFormData((prevData:any) => ({
          ...prevData,
          multidropoff: [
            ...prevData.multidropoff,
            { vehicleRegistration: "", carType: "" }, // Add a new object for the new form
          ],
        }));
      };
      
       
    
        const [registrationNumber, setRegistrationNumber] = useState('');
              const handleRegistrationChange = (index:any, value:any) => {
                setFormData((prevFormData:any) => {
                  const updatedMultidropoff = [...prevFormData.multidropoff];
              
                  // Update only the registration number for the specific index
                  updatedMultidropoff[index] = {
                    ...updatedMultidropoff[index], // Preserve existing data for the vehicle
                    vehicleRegistration: value,
                  };
              
                  return { ...prevFormData, multidropoff: updatedMultidropoff };
                });
              };
              
        
        const [carerrors, setcarErrors] = useState<any>({}); // Track errors for each vehicle separately
        
              const handleEnquiry = async (index:any, registrationNumber:any) => {
                try {
                  const response = await fetch("https://zoomautos.co.uk/vehicle-enquiry", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ registrationNumber }),
                  });
              
                  if (!response.ok) {
                    throw new Error(`Vehicle lookup failed. Status: ${response.status}`);
                  }
              
                  const vehicleData = await response.json();
              
                  setFormData((prevFormData:any) => {
                    const updatedMultidropoff = [...prevFormData.multidropoff];
              
                    updatedMultidropoff[index] = {
                      ...updatedMultidropoff[index], // Preserve existing fields
                      manufacturer: vehicleData.make || "",
                      model: vehicleData.model || "",
                      vin: vehicleData.vin || "",
                      taxStatus: vehicleData.taxStatus || "",
                      motStatus: vehicleData.motStatus || "",
                      colour: vehicleData.colour || "",
                    };
              
                    return { ...prevFormData, multidropoff: updatedMultidropoff };
                  });
              
                  // Clear any previous error for this index
                  setcarErrors((prevErrors:any) => ({
                    ...prevErrors,
                    [index]: null,
                  }));
                } catch (error:any) {
                  let errorMessage = error.message;

    // If response status is 404, override error message
    if (error.message.includes("404")) {
      errorMessage = "Vehicle not found. Please check the registration number or Enter Data Manually.";
    }
                  
                  // Set error message for this specific vehicle index
                  setcarErrors((prevErrors:any) => ({
                    ...prevErrors,
                    [index]: errorMessage,
                  }));
                }
              };
              

      const validateDateTime = () => {
        const { fromDate, fromTime, toDate, toTime } = formData;
        let error = '';
    
        if (new Date(toDate) < new Date(fromDate)) {
          error = 'To Date must be after From Date.';
        } else if (fromDate === toDate && fromTime >= toTime) {
          error = 'To Time must be after From Time.';
        }
    
        setErrors((prevErrors:any) => ({
          ...prevErrors,
          dateTime: error,
        }));
    
        return !error;
      };
      
      const handleChange = (e:any) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev:any) => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value,
        }));
      };
      
  const [errors, setErrors] = useState<any>({});
      const handleVehicleChange = (index:any, e:any) => {
        const { name, value } = e.target;
        const updatedVehicles = [...formData.multidropoff];
        updatedVehicles[index] = { ...updatedVehicles[index], [name]: value };
        setFormData((prevData:any) => ({
          ...prevData,
          multidropoff: updatedVehicles,
        }));
      };
    
    useEffect(() => {
          console.log("Vehicle Forms:", vehicleForms);
          console.log("Multidropoff:", formData.multidropoff);
        }, [vehicleForms, formData.multidropoff]);
        
        
          const [activeButton, setActiveButton] = useState(null);
          
          const handleButtonClick = (index:any, button:any) => {
            setFormData((prevData:any) => {
              const updatedVehicles = [...prevData.multidropoff];
          
              // Update the property for the specific vehicle at the given index
              updatedVehicles[index] = {
                ...updatedVehicles[index],
                carType: button, // Set the carType based on the button clicked
              };
          
              return {
                ...prevData,
                multidropoff: updatedVehicles,
              };
            });
          
            console.log(`Car type updated to ${button} for vehicle at index ${index}`);
          };

          useEffect(() => {
            if (success || Failure) {
              const timer = setTimeout(() => {
                if (success) {
                  setSuccess(false);
                  window.location.reload(); // Only reload if success is true
                } else {
                  setFailure(false);
                }
              }, 2000);
          
              return () => clearTimeout(timer); // Cleanup on re-render
            }
          }, [success, Failure]); // Runs when `success` or `failure` changes
         
    return (
      <>
        <form onSubmit={onSubmit}>
        <h2>Service Details</h2>
    <p>We collect multiple vehicles from a single collection Point to a single Delivery point</p>
      <p>
        Need more information?{" "}
        <button className="contact-button" type="button"onClick={openModal}>
          Click Here
        </button>
      </p>

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>
            Our Multi Drop-Off Service is designed for customers who need to transport several cars to a single location in one go. Whether you're managing a fleet, dealership, or personal vehicle transfers, we ensure each vehicle is delivered safely and on time. With our professional team and reliable tracking system, you can rest assured that your vehicles will be handled with care and delivered to their designated locations without hassle.
            </p>
            <button className="close-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
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
<option value="ANY" disabled>ANY</option>

</select>


            </div>
            
            </div>
            {vehicleForms.map((form, index) => (
  <div key={form.id} className="vehicle-form-section">
    
    <h2>Vehicle Details {index + 1}</h2>
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
    onClick={() => handleButtonClick(index, button)} // Pass correct index
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
           <div className="form-row">
      <div className="form-group">
        <label>Make</label>
        <input
          type="text"
          name="manufacturer"
          
          
          onChange={(e) => handleVehicleChange(index, e)} // Handle onChange for dynamic vehicles
        />
        {errors?.vehicles?.[index]?.manufacturer && (
          <p className="error-message">{errors?.vehicles?.[index]?.manufacturer.message}</p>
        )}
      </div>
      
      <div className="form-group">
        <label>Model</label>
        <input
          type="text"
          name="model"
          
          onChange={(e) => handleVehicleChange(index, e)} // Handle onChange for dynamic vehicles
        />
        {errors?.vehicles?.[index]?.model && (
          <p className="error-message">{errors?.vehicles?.[index]?.model.message}</p>
        )}
      </div>

      </div>
      <div className="form-row">
    <div className="form-group">
        <label>Chassis/VIN</label>
        <input
          type="text"
          name="vin"
          
          onChange={(e) => handleVehicleChange(index, e)} // Handle onChange for dynamic vehicles
        />
      </div>
      <div className="form-group">
        <label>Colour</label>
        <input
          type="text"
          name="colour"
          
          onChange={(e) => handleVehicleChange(index, e)} // Handle onChange for dynamic vehicles
        />
      </div>
    </div> 


           </>
    )}

{formData.multidropoff[index].carType==="Used Car" &&(
      <>
    
    {/* Vehicle Registration Input */}
    <div className="form-group">
    <label htmlFor={`vehicleRegistration-${index}`}>Vehicle Registration</label>
  <input
    type="text"
    id={`vehicleRegistration-${index}`}
    name="vehicleRegistration"
    value={formData?.multidropoff[index]?.vehicleRegistration || ''}
    onChange={(e) => handleRegistrationChange(index, e.target.value)}
    required
  />
  <button
    onClick={() =>
      handleEnquiry(index, formData?.multidropoff[index]?.vehicleRegistration)
    }
    type="button"
    className="contact-button"
  >
    Lookup
  </button>
    </div>
    {carerrors[index] && <p className="error-message">{carerrors[index]}</p>}
  
    {/* Make and Model Inputs */}
    <div className="form-row">
      <div className="form-group">
        <label>Make</label>
        <input
          type="text"
          name="manufacturer"
          value={formData?.multidropoff[index]?.manufacturer || ""} // Bind the value to the state
        required
          onChange={(e) => handleVehicleChange(index, e)}
        />
        {errors.vehicles?.[index]?.manufacturer && (
          <p className="error-message">{errors.vehicles[index].manufacturer.message}</p>
        )}
      </div>

      <div className="form-group">
        <label>Model <span style={{color:'red', fontSize:'0.8rem'}}> (Required)</span></label>
        <input
          type="text"
          name="model"
          required
          value={formData?.multidropoff[index]?.model || ""} // Bind the value to the state
          onChange={(e) => handleVehicleChange(index, e)} // Handle onChange for dynamic vehicles
        />
        {errors?.vehicles?.[index]?.model && (
          <p className="error-message">{errors?.vehicles?.[index]?.model.message}</p>
        )}
      </div>
      <div className="form-group">
        <label>VIN <span style={{color:'red', fontSize:'0.8rem'}}> (Optional)</span></label>
        <input
          type="text"
          name="vin"
          value={formData?.multidropoff[index]?.vin || ""} // Bind the value to the state
          onChange={(e) => handleVehicleChange(index, e)} // Handle onChange for dynamic vehicles
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
          value={formData?.multidropoff[index]?.taxStatus || ""} // Bind the value to the state
          onChange={(e) => handleVehicleChange(index, e)} // Handle onChange for dynamic vehicles
        />
      </div>
      <div className="form-group">
        <label>MOT Status</label>
        <input
          type="text"
          name="motStatus"
          required
          value={formData?.multidropoff[index]?.motStatus || ""} // Bind the value to the state
          onChange={(e) => handleVehicleChange(index, e)} // Handle onChange for dynamic vehicles
        />
      </div>
      <div className="form-group">
        <label>Colour</label>
        <input
          type="text"
         name="colour"
         required
          value={formData?.multidropoff[index]?.colour || ""} // Bind the value to the state
          onChange={(e) => handleVehicleChange(index, e)} // Handle onChange for dynamic vehicles
        />
      </div>
    </div> 
    </>
    )}
  </div>
))}
<div className='form-group'>
<button type="button" className="contact-button" onClick={addVehicleForm}>
  Add Another Vehicle
</button>
</div>
    
        
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

 {/* Date and Time Section */}
 <h2>Date and Time</h2>
      <div className="form-row">
        <div className="form-group">
        <label>Collection Not Earlier Than:</label>
<input
  type="date"
  name="fromDate"
  value={formData.fromDate}
  required
  min={new Date().toISOString().split('T')[0]} // Set today's date as the minimum
  onChange={(e) =>
    setFormData((prevData:any) => ({
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
            required
            min={formData.fromDate} // Set today's date as the minimum
  
            onChange={(e) =>
              setFormData((prevData:any) => ({
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
      <div className="terms-container">
  <label className="terms-label">
    <input
      type="checkbox"
      checked={isTermsChecked}
      onChange={handleTermsCheckboxChange}
      className="terms-checkbox"
    />
    I have read and agree to the
    <a
      href="Termsandconditions"
      target="_blank"
      rel="noopener noreferrer"
      className="terms-link"
    >
      Terms and Conditions
    </a>
  </label>
</div>

      {!isTermsChecked &&(
      <button  type="submit" className="contact-button"
      style={{backgroundColor:'#333'}}
      >Please Check the Terms and conditions box</button>
    )}
      {isTermsChecked &&(
      <button  type="submit" className="contact-button"
      
      >Submit</button>
    )}
          </form>
          {loading && (
        <div className='overlayStyle'>
          <div className='loadingStyle'  >Submitting...</div>
        </div>
      )}
 {Failure && (
        <div className='overlayStyle'
        onClick={() => setFailure(false)}>
          <div className='FailureStyle'
          onClick={() => setFailure(false)} >
          <p>{failuremessage}</p>
            
            </div>
        </div>
      )}

      {/* Success Overlay */}
      {success && (
        <div className='overlayStyle'>
          <div className='successStyle' >
          <p>{formData.servicetype} Form Submitted Successfully!</p>
            <p>Your jobId is {jobId}</p>
            
            </div>
        </div>
      )}
          </>
          
    )
}
export default RegisteredMultidropoffVehicleForm;