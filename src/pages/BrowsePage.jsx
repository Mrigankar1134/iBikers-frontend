import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import '../styles/BrowsePage.scss';
import BookingModal from '../components/BookingModal';

const BrowsePage = () => {
  const [durationType, setDurationType] = useState('hourly');
  const [location, setLocation] = useState('all');
  const [selectedBike, setSelectedBike] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const bikeCardsRef = useRef([]);
  const routerLocation = useLocation();
  
  const locations = [
    { id: 'iimAm', name: 'IIM Amritsar Campus' }
  ];

  const bikes = [
    {
      id: 1,
      name: 'Honda Activa',
      type: 'Scooty',
      image: 'https://www.carandbike.com/_next/image?url=https%3A%2F%2Fimages.carandbike.com%2Fbike-images%2Fcolors%2Fhonda%2Factiva-6g%2Fhonda-activa-6g-pearl-precious-white.jpg%3Fv%3D1641197689&w=750&q=75',
      pricing: { hourly: 250, fullDay: 600 },
      button: 'Book Now'
    },
    {
      id: 2,
      name: 'Mahindra Gusto',
      type: 'Scooty',
      image: 'https://m.media-amazon.com/images/I/81cQeaIcCBL.jpg',
      pricing: { hourly: 200, fullDay: 600 },
      button: 'Book Now'
    },
    {
      id: 3,
      name: 'Harley-Davidson Fat Boy',
      type: 'Bike',
      image: 'https://images.ctfassets.net/5vy1mse9fkav/7xv0z5oUbeMYgDWcjxmYJl/6601ce381661695125f8388593505c79/2025-fat-boy-gallery-3.jpg?fm=webp&w=2560',
      pricing: { hourly: 1799, fullDay: 7999 },
      button: 'Coming Soon'
    }
  ];
  
  // Clear and set refs array
  bikeCardsRef.current = [];
  const addToRefs = (el) => {
    if (el && !bikeCardsRef.current.includes(el)) {
      bikeCardsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Check if there's a bike ID in the URL params
    const params = new URLSearchParams(routerLocation.search);
    const bikeId = params.get('bikeId');
    
    if (bikeId) {
      const bike = bikes.find(b => b.id === parseInt(bikeId));
      if (bike) {
        setSelectedBike(bike);
        setShowModal(true);
      }
    }

    // Animate bike cards
    const cards = bikeCardsRef.current;
    
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { x: 100, opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: index * 0.1
        }
      );
    });
  }, [routerLocation]);

  const handleBookNow = (bike) => {
    setSelectedBike(bike);
    // Show the booking modal instead of scrolling to the form
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  // For now, we're showing all bikes since we don't have location filtering implemented
  const filteredBikes = bikes;

  return (
    <div className="browse-page">
      {showModal && selectedBike && (
        <BookingModal 
          bike={selectedBike} 
          durationType={durationType}
          onClose={handleCloseModal} 
        />
      )}
      
      <div className="container">
        <h1>Browse Bikes</h1>
        
        <div className="filters">
          <div className="duration-filter">
            <button 
              className={durationType === 'hourly' ? 'active' : ''}
              onClick={() => setDurationType('hourly')}
            >
              Hourly
            </button>
            <button 
              className={durationType === 'fullDay' ? 'active' : ''}
              onClick={() => setDurationType('fullDay')}
            >
              24H
            </button>
          </div>
          
          <div className="location-filter">
            <select 
              value={location} 
              onChange={(e) => setLocation(e.target.value)}
            >
              {locations.map(loc => (
                <option key={loc.id} value={loc.id}>{loc.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="bikes-grid">
          {filteredBikes.map((bike, index) => (
            <div className={`bike-card ${bike.id === 3 ? 'coming-soon' : ''}`} key={bike.id} ref={addToRefs}>
              <div className="bike-image">
                <img src={bike.image} alt={bike.name} />
                {bike.id === 3 && <div className="overlay">Coming Soon</div>}
              </div>
              <div className="bike-info">
                <h3>{bike.name}</h3>
                <p className="bike-type">{bike.type}</p>
                <div className="pricing">
                  {durationType === 'hourly' && (
                    <span className="price">₹{bike.pricing.hourly}/hr</span>
                  )}
                  {durationType === 'halfDay' && (
                    <span className="price">₹{bike.pricing.halfDay}/12h</span>
                  )}
                  {durationType === 'fullDay' && (
                    <span className="price">₹{bike.pricing.fullDay}/24h</span>
                  )}
                </div>
                {bike.id !== 3 ? (
                  <button 
                    className="book-btn"
                    onClick={() => handleBookNow(bike)}
                  >
                    Book Now
                  </button>
                ) : (
                  <button className="book-btn disabled">
                    Coming Soon
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      

    </div>
  );
};

export default BrowsePage;