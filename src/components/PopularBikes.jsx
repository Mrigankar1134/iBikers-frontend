import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/PopularBikes.scss';
import gusto from '../../public/gusto.png'

gsap.registerPlugin(ScrollTrigger);

const PopularBikes = () => {
  const bikeCardsRef = useRef([]);
  
  // Clear and set refs array
  bikeCardsRef.current = [];
  const addToRefs = (el) => {
    if (el && !bikeCardsRef.current.includes(el)) {
      bikeCardsRef.current.push(el);
    }
  };

  useEffect(() => {
    const cards = bikeCardsRef.current;
    
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
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
  }, []);

  const popularBikes = [
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

  return (
    <div className="popular-bikes" id="popular-bikes">
      <div className="container">
        <h2>Popular Bikes</h2>
        <div className="bikes-grid">
          {popularBikes.map((bike, index) => (
            <div className={`bike-card ${bike.id === 3 ? 'coming-soon' : ''}`} key={bike.id} ref={addToRefs}>
              <div className="bike-image">
                <img src={bike.image} alt={bike.name} />
                {bike.id === 3 && <div className="overlay">Coming Soon</div>}
              </div>
              <div className="bike-info">
                <h3>{bike.name}</h3>
                <p className="bike-type">{bike.type}</p>
                <div className="pricing">
                  <span className="price-badge">₹{bike.pricing.hourly}/hr</span>
                  <span className="price-badge">₹{bike.pricing.fullDay}/24h</span>
                </div>
                {bike.id !== 3 ? (
                  <Link to={`/browse?bikeId=${bike.id}`} className="book-btn">{bike.button}</Link>
                ) : (
                  <span className="book-btn disabled">{bike.button}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularBikes;