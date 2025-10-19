"use client"
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Card } from 'react-bootstrap';
import { MdDesignServices } from "react-icons/md";

const ServiceForm = () => {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const [services, setServices] = useState<any>([]);
  const [editingService, setEditingService] = useState<any>();
  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });
  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingService(null);
    reset();
  };

  // Fetch existing services
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('https://zoomautos.co.uk/api/moveservices', {
        params: { _t: new Date().getTime() },
      });
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const onSubmit = async (data:any) => {
    try {
      if (editingService) {
        await axios.put(`https://zoomautos.co.uk/api/moveservices/${editingService._id}`, data);
        setSnackbar({ open: true, message: 'Service updated successfully!', severity: 'success' });
      } else {
        await axios.post('https://zoomautos.co.uk/api/moveservices', { formType: 'WhyUSForm', ...data });
        setSnackbar({ open: true, message: 'Service added successfully!', severity: 'success' });
      }
      fetchServices();
      reset();
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSnackbar({ open: true, message: 'Failed to submit service', severity: 'error' });
    }
  };

  const handleEdit = (service:any) => {
    setEditingService(service);
    setValue('edit_description', service.description);
    setModalOpen(true);
  };

  const handleDelete = async (id:any) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`https://zoomautos.co.uk/api/moveservices/${id}`);
        setSnackbar({ open: true, message: 'Service deleted successfully!', severity: 'success' });
        fetchServices();
      } catch (error) {
        console.error('Error deleting service:', error);
        setSnackbar({ open: true, message: 'Failed to delete service', severity: 'error' });
      }
    }
  };

  return (
    <div className='overalls'>
      <h1 style={{ marginTop: '100px' }}>Manage Services</h1>

      {/* Add Service Form */}
      <div className="adminaddform-container" style={{ marginBottom: '50px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-group">
              <h3>Service Description</h3>
              <textarea
                {...register('description', { required: 'Description is required' })}
                placeholder="Enter service description"
                style={{ width: '100%' }}
                rows={4}
              />
              
            </div>
          </div>
          <div className="form-row" style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" className="contact-button" style={{ width: '50%' }}>
              Add Service
            </button>
          </div>
        </form>
      </div>

      <h2>Existing Services</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', background: 'white', marginTop:'20px'}}>
        {services.map((service:any, index:any) => (
          <Card key={index} style={{width: '18rem',
    background: 'linear-gradient(135deg, #01103b, #e80f17)', // Gradient background
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.09)',
    padding: '2rem',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '8px',
    border: '4px solid #7C3AED',
    minHeight: '30rem',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
    color: 'white' }}>
            <div style={{ width: '6rem', height: '6rem', backgroundColor: '#7C3AED', borderRadius: '50%', position: 'absolute', top: '-30px', right: '-30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <p style={{ color: '#fff', fontSize: '1.5rem' }}>{index + 1}</p>
            </div>
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <MdDesignServices size={48} color="#7C3AED" />
            </div>
            <div style={{ flexGrow: 1, textAlign: 'center' }}>
              <Card.Text style={{ color: '#fff', fontSize: '0.875rem' }}>
                {service.description}
              </Card.Text>
            </div>
            <button onClick={() => handleEdit(service)} className='buttonm'>Edit</button>
            <button onClick={() => handleDelete(service._id)} className='buttonm' style={{ color: 'red' }}>Delete</button>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      <Dialog open={modalOpen} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle>Edit Service</DialogTitle>
        <DialogContent>
          <form id="edit-form" onSubmit={handleSubmit(onSubmit)}>
            <textarea
              {...register('edit_description', { required: 'Description is required' })}
              style={{ width: '100%' }}
              rows={4}
            />
            
          </form>
        </DialogContent>
        <DialogActions sx={{ display: "flex", flexDirection:'column' }}>
  <Button onClick={handleCloseModal} variant="outlined" color="secondary">
    Cancel
  </Button>
  <Button 
    type="submit" 
    form="edit-form" 
    variant="contained" 
    color="error"
  >
Update
  </Button>
</DialogActions>

      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        action={<Button color="inherit" onClick={handleCloseSnackbar}>Close</Button>}
      />
    </div>
  );
};

export default ServiceForm;
