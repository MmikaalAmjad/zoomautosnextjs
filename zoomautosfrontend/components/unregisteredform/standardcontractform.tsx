"use client"
import React, { useState , useRef} from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";


const ContactFormStandardMovex = () => {
  const [vehicleForms, setVehicleForms] = useState([{ id: Date.now() }]); // This should be fine
const [jobId, setJobId] = useState('');
      
      const [isTermsChecked, setIsTermsChecked] = useState(false);
    
      const handleTermsCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setIsTermsChecked(event.target.checked);
};

    
//   const [formData, setFormData] = useState({
//     servicetype: 'STANDARD',
//     roadworthy: '',
//     fuel:'',
    
//     manufacturer:'',
//     model:'',
//     carType:'Used Car',
    
    
//     taxStatus:'',
    
//     customername:'',
//     customeremail:'',
//     customercontact:'',
//     customeraddress:'',
//     customerusername:'',
//     customercompanyName:'',
//     customerPostCode:'',
//     customercity:'',
//     vin:'',
//     motStatus:'',
//     colour:'',
//     vehicleRegistration:'',
//     collectionAddress: '',
//     City: '',
//     postCode: '',
//     contactName: '',
//     contactPhone: '',
//     dropoffAddress: '',
//     dropofftownCity: '',
//     dropoffpostCode: '',
//     dropoffcontactName: '',
//     dropoffcontactPhone: '',
    
//     fromDate: '',
//     fromTime: 'ANYTIME',
//     toDate: '',
//     toTime: 'ANYTIME',
//     notes: '',
//     releaseNotes: '',
//     jobId:'',
//   });

const [formData, setFormData] = useState<Record<string, any>>({
  servicetype: 'STANDARD',
      fromDate: '',
    fromTime: 'ANYTIME',
    toDate: '',
    toTime: 'ANYTIME',
});

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const { register, handleSubmit } = useForm();

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  

  const validateDateTime = () => {
    const { fromDate, fromTime, toDate, toTime } = formData;
    let error = '';

    if (new Date(toDate) < new Date(fromDate)) {
      error = 'To Date must be after From Date.';
    } else if (fromDate === toDate && fromTime >= toTime) {
      error = 'To Time must be after From Time.';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      dateTime: error,
    }));

    return !error;
  };


 
  
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [vehicleData, setVehicleData] = useState({
    make: "",
    model: "",
    vin: "",
    taxStatus: "",
    motStatus: "",
    colour: "",
  });
  const [vehicledataerror,setvehicledataerror]=useState('');
  const handleFieldChange = (field:string, value:any) => {
    setVehicleData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  
  const handleFieldsChange = (field:string, value:any) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => {
      setIsModalOpen(true);
    };

    useEffect(() => {
      setFormData((prev) => ({
        ...prev,
        manufacturer: vehicleData.make || "",
      }));
    }, [vehicleData.make]); // Update only when `vehicleData.make` changes
    
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
    const [error, setError] = useState(null);
    const handleEnquiry = async () => {
      try {
        const response = await fetch('/api/vehicleenquiry', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ registrationNumber }),
});

    
        if (!response.ok) {

          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        setVehicleData(data);
      } catch (error:any) {
        let errorMessage = error.message;

    // If response status is 404, override error message
    if (error.message.includes("404")) {
      errorMessage = "Vehicle not found. Please check the registration number or Enter Data Manually.";
    }
        setError(errorMessage);
      }
    };
      const [activeButton, setActiveButton] = useState("Used Car");

  const handleButtonClick = (button:string) => {
    setActiveButton(button);
    console.log(`${button} clicked`);
  };
  const [Failure,setFailure]=useState(false);
    
  const onSubmit = async (e:any) => {
    e.preventDefault();
    
    setLoading(true);
    if (formData.collectionAddress===formData.dropoffAddress){
      setFailure(true);
      setLoading(false);
    }
    else{
    try {
      const payload = {
        formType: 'Sub Contract Jobs',
        ...formData, // Spread formData to include its fields
        
      status:'pending',
      Review:'No',
      
      }
      const response = await axios.post('/api/subcontract', payload);

      
const { message, jobId } = response.data;

setJobId(jobId);

      
  setLoading(false);    
  setSuccess(true);
      
    
      try {
        const response2 = await axios.post("https://zoomautos.co.uk/api/Email/send-email", 
        {
        ...payload,
        jobId:jobId,
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
      
    }
  }
  ;
}
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
    <h2>Service Details</h2>
    <p>A single vehicle is transported from the collection point to the delivery destination with care and efficiency.</p>
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
            Our Standard Delivery service ensures a smooth and secure transfer of your vehicle, handled by experienced professionals. We provide real-time tracking, competitive pricing, and a commitment to timely deliveries. This service is ideal for businesses, dealerships, and individuals needing a reliable car transport solution.
            </p>
            <button className="close-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    <div className="form-group">
        
        <input
          type="text"
          id="jobId"
          name="jobId"
          value={formData.jobId}
          readOnly
          hidden
        />
      </div>

    <form onSubmit={onSubmit}>
      <h2>Customer Details</h2>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="customername">Customer Name</label>
          <input
            type="text"
            id="customername"
            name="customername"
            value={formData.customername}
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            required
          />
        </div>
        </div>
        <h2>Services</h2>
    <div className='form-row'>
      <div className="form-group">
              <label htmlFor="roadworthy">Vehicle MOT/ Roadworthy?</label>
              <select id="roadworthy" name="roadworthy" value={formData.roadworthy} onChange={handleChange} required>
              <option value="" disabled  hidden>
              Vehicle MOT/ Roadworthy?
    </option>
  <option value="yes">Yes</option>
  <option value="no">No</option>
</select>


            </div>
            <div className="form-group">
              <label htmlFor="fuel">Fuel Required?</label>
              <select id="fuel" name="fuel" value={formData.fuel} onChange={handleChange} required>
              <option value="" disabled  hidden>
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
              <option value="" disabled  hidden>
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
              <option value="" disabled  hidden>
              Service Type?
    </option>
    <option value="DRIVEN">DRIVEN</option>
<option value="TRANSPORT">TRANSPORT</option>
<option value="ANY" >ANY</option>

</select>


            </div>
            
            </div>
    <div className='form-row' style={{alignContent:'center'}}>
      <div className='form-group'>
      <label htmlFor="Cartype">Car Type</label>
    <div className="buttonb-bar">
      {["New Car", "Used Car"].map((button) => (
        <button
          key={button}
          type="button"
          className={`buttonb ${activeButton === button ? "active" : ""}`}
          onClick={() => handleButtonClick(button)}   
          value={formData.carType=activeButton}
        >
          {button}
        </button>
      ))}
            </div>
            </div>
    </div>
    {activeButton === "Used Car" && (
  <>
{/* Vehicle Registration */}
<div className="form-row">
  <div className="form-group">
    <label htmlFor="vehicleRegistration">Vehicle Registration</label>
    <input
      type="text"
      id="vehicleRegistration"
      name="vehicleRegistration"
      value={formData.vehicleRegistration= registrationNumber} // Corrected
      onChange={(e) => setRegistrationNumber(e.target.value)}
      required
    />
    <button
      onClick={handleEnquiry}
      type="button"
      className="contact-button"
    >
      Lookup
    </button>
  </div>
  
</div>
{error&& <p style={{color:'red'}}>{error}</p>}
  
{/* Vehicle Details */}
<div className="form-row">
  <div className="form-group">
    <label htmlFor="manufacturer">Make</label>
    <input
      type="text"
      id="manufacturer"
      name="manufacturer"
      value={formData.manufacturer||""}
      onChange={(e) => handleFieldsChange("manufacturer", e.target.value)}
      required
    />
  </div>
  <div className="form-group">
    <label htmlFor="model">Model<span style={{color:'red', fontSize:'0.8rem'}}> (Required)</span></label>
    <input
      type="text"
      id="model"
      name="model"
      value={formData.model || ""} // Corrected
      onChange={(e) => handleFieldsChange("model", e.target.value)}
      required
    />
  </div>
  <div className="form-group">
    <label htmlFor="vin">VIN <span style={{color:'red', fontSize:'0.8rem'}}> (Optional)</span></label>
    <input
      type="text"
      id="vin"
      name="vin"
      value={formData.vin || ""} // Corrected
      onChange={(e) => handleFieldsChange("vin", e.target.value)}
      
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
      value={formData.taxStatus= vehicleData.taxStatus || ""} // Corrected
      onChange={(e) => handleFieldChange("taxStatus", e.target.value)}
      required
    />
  </div>
  <div className="form-group">
    <label htmlFor="motStatus">MOT Status</label>
    <input
      type="text"
      id="motStatus"
      name="motStatus"
      value={formData.motStatus= vehicleData.motStatus || ""} // Corrected
      onChange={(e) => handleFieldChange("motStatus", e.target.value)}
      required
    />
  </div>
  <div className="form-group">
    <label htmlFor="colour">Colour</label>
    <input
      type="text"
      id="colour"
      name="colour"
      value={formData.colour=vehicleData.colour || ""} // Corrected
      onChange={(e) => handleFieldChange("colour", e.target.value)}
      required
    />
  </div>
</div>

  </>
)}


{activeButton==="New Car" &&(
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
  required
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
            min={formData.fromDate}
            required
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


{errors.dateTime && <p className="error-message">{errors.dateTime}</p>}
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

      {/* Success Overlay */}
      {success && (
        <div className='overlayStyle'>
          <div className='successStyle' >
          <p>{formData.servicetype} Form Submitted Successfully!</p>
            <p>Your jobId is {jobId}</p>
            
            </div>
        </div>
      )}
      {Failure && (
        <div className='overlayStyle'
        onClick={() => setFailure(false)}>
          <div className='FailureStyle'
          onClick={() => setFailure(false)} >
          <p>Error Submitting Form Check the collection and delivery Address Details</p>
            
            </div>
        </div>
      )}
    </>
  );
};

export default ContactFormStandardMovex;
