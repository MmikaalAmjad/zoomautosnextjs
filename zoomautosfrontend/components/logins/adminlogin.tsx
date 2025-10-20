"use client";
import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useTransportAdmin } from '@/components/transportadmincontext/admincontext';
import Carousel from '@/components/homepage/carousel/carousel';
import './login.css';

const imagesWithText = [
  { image: "/Image 1.jpg" },
  { image: "/Image 2.jpg"},
  { image: "/Image 3.jpg"}
];

const LoginFormTransportAdmin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { updateTransportAdminDetails } = useTransportAdmin();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});


      const data = await response.json();

      if (response.ok) {
        // Save token & admin details
        localStorage.setItem('TransportData', JSON.stringify(data.admin));
        sessionStorage.setItem('Transport Admin AuthToken', data.token);

        updateTransportAdminDetails(data.admin);

        setFormData({ username: '', password: '' });
        router.push('/admindashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Carousel imagesWithText={imagesWithText} style={{ filter: 'blur(5px)' }} />

      <div className="adminlogin-page">
        <div className="login-container">
          <div className="logo-container">
            <img src="/Logo4.png" alt="Logo" />
          </div>

          <div className="login-form">
            <h2 className="adminheadline">Welcome to Zoom Autos</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username or Email"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                className="contact-button"
                type="submit"
                value={loading ? 'Signing In...' : 'Sign In'}
                disabled={loading}
              />
            </form>

            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFormTransportAdmin;
