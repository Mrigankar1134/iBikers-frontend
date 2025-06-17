import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import '../styles/BookingModal.scss';
import API_BASE_URL from '../config/api.js';

const BookingModal = ({ bike, durationType, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    duration: durationType,
    date: '',
    time: '',
    location: '',
    license: null,
    totalCost: 0
  });
  
  const modalRef = useRef(null);
  const formFieldsRef = useRef([]);
  
  // Clear and set refs array
  formFieldsRef.current = [];
  const addToRefs = (el) => {
    if (el && !formFieldsRef.current.includes(el)) {
      formFieldsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Animate modal entrance
    gsap.fromTo(modalRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4 }
    );
    
    // Animate form fields one by one
    const fields = formFieldsRef.current;
    fields.forEach((field, index) => {
      gsap.fromTo(field,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, delay: 0.2 + (index * 0.1) }
      );
    });
    
    // Calculate initial total cost
    calculateTotalCost(durationType);
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'duration') {
      calculateTotalCost(value);
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const calculateTotalCost = (durationType) => {
    let cost = 0;
    switch (durationType) {
      case 'hourly':
        cost = bike.pricing.hourly;
        break;
      case 'halfDay':
        cost = bike.pricing.halfDay;
        break;
      case 'fullDay':
        cost = bike.pricing.fullDay;
        break;
      default:
        cost = bike.pricing.hourly;
    }
    
    // Update the form data with the new cost and duration
    setFormData(prev => ({
      ...prev,
      totalCost: cost,
      duration: durationType
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.license || !formData.payment) {
      alert('Please upload both driving license and payment screenshot');
      return;
    }
    
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Create form data for submission
      const submitData = new FormData();
      submitData.append('bikeName', bike.name); // Send bike name instead of ID
      submitData.append('name', formData.name);
      submitData.append('phone', formData.phone);
      submitData.append('date', formData.date);
      submitData.append('time', formData.time);
      submitData.append('duration', formData.duration);
      submitData.append('location', formData.location);
      submitData.append('totalCost', formData.totalCost);
      
      // Append files
      submitData.append('license', formData.license);
      submitData.append('payment', formData.payment);
      
      console.log('Submitting booking data:', {
        bikeName: bike.name, // Log bike name instead of ID
        name: formData.name,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        duration: formData.duration,
        location: formData.location,
        totalCost: formData.totalCost,
        license: formData.license ? formData.license.name : null,
        payment: formData.payment ? formData.payment.name : null
      });
      
      // Send data to backend
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        body: submitData,
        credentials: 'include', // Include credentials like cookies
        // Don't set Content-Type header when sending FormData, browser will set it with correct boundary
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create booking');
      }
      
      const result = await response.json();
      console.log('Booking successful:', result);
      
      // Close modal and redirect to success page
      onClose();
      navigate('/booking-success', { state: { fromBooking: true } });
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error('Booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const locations = [
    { id: 'iimAm-campus', name: 'IIM Amritsar Campus' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="booking-modal" ref={modalRef} onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <h2>Book Your Ride</h2>
        
        <div className="selected-bike">
          <img src={bike.image} alt={bike.name} />
          <div>
            <h3>{bike.name}</h3>
            <p>{bike.type}</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group" ref={addToRefs}>
            <label>Your Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className="form-group" ref={addToRefs}>
            <label>Phone Number</label>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit phone number"
              required
            />
          </div>
          
          <div className="form-group" ref={addToRefs}>
            <label>Duration</label>
            <select 
              name="duration" 
              value={formData.duration}
              onChange={handleInputChange}
              required
            >
              <option value="hourly">Hourly (₹{bike.pricing.hourly}/hr)</option>
              <option value="fullDay">24 Hours (₹{bike.pricing.fullDay})</option>
            </select>
          </div>
          
          <div className="form-group" ref={addToRefs}>
            <label>Date</label>
            <input 
              type="date" 
              name="date" 
              value={formData.date}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          
          <div className="form-group" ref={addToRefs}>
            <label>Time</label>
            <input 
              type="time" 
              name="time" 
              value={formData.time}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group" ref={addToRefs}>
            <label>Pickup/Drop Location</label>
            <select 
              name="location" 
              value={formData.location}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Location</option>
              {locations.map(loc => (
                <option key={loc.id} value={loc.id}>{loc.name}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group" ref={addToRefs}>
            <label>Upload Driving License</label>
            <input 
              type="file" 
              name="license" 
              onChange={handleFileChange}
              accept="image/*,.pdf"
              required
            />
            <small>Please upload a clear image or PDF of your valid driving license</small>
          </div>

          <div className="form-group" ref={addToRefs}>
            <label>Upload Payment Screenshot</label>
            <input 
              type="file" 
              name="payment" 
              onChange={handleFileChange}
              accept="image/*"
              required
            />
            <small>Please upload the payment screenshot</small>
          </div>
          
          
          <div className="total-cost" ref={addToRefs}>
            <h3>Total Cost: ₹{formData.totalCost}</h3>
            <div className="qr-code">
            <img 
              src={`/${formData.totalCost}.jpeg`} 
              alt={`Payment QR for ₹${formData.totalCost}`} 
              className="qr-image"
              onError={(e) => {
                // Fallback to a default QR code if the specific one is not found
                e.target.src = '/200.jpeg';
                console.log(`QR code for ₹${formData.totalCost} not found, using default`);
              }}
            />
            <p>Scan to pay ₹{formData.totalCost}</p>
          </div>
          </div>
          
          <button 
            type="submit" 
            className="submit-btn" 
            ref={addToRefs}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Confirm & Pay'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;