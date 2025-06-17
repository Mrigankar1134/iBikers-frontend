import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/UserReviews.scss';

gsap.registerPlugin(ScrollTrigger);

const UserReviews = () => {
  const sectionRef = useRef(null);
  const reviewsRef = useRef([]);
  
  // Clear and set refs array
  reviewsRef.current = [];
  const addToRefs = (el) => {
    if (el && !reviewsRef.current.includes(el)) {
      reviewsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Parallax effect for background
    gsap.to(sectionRef.current, {
      backgroundPosition: '50% 30%',
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    // Slide in animation for reviews
    const reviews = reviewsRef.current;
    reviews.forEach((review, index) => {
      gsap.fromTo(review,
        { x: index % 2 === 0 ? -100 : 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: review,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          delay: index * 0.2
        }
      );
    });
  }, []);

  const reviews = [
    {
      id: 1,
      name: 'Divyansh Saxena',
      avatar: 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png',  // This path is already correct
      rating: 5,
      text: 'The service provided by !bikers was excellent. Fast and Smooth.'
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      avatar: 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png',
      rating: 4,
      text: 'Rented the Mahindra Gusto for an emergency. The service provided was lightning fast.'
    },
    {
      id: 3,
      name: 'Mayank Singh',
      avatar: 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png',
      rating: 5,
      text: 'The response from the owner was immediate and the scooty was delivered on time.'
    }
  ];

  return (
    <div className="user-reviews" ref={sectionRef}>
      <div className="container">
        <h2>What Our Riders Say</h2>
        <div className="reviews-container">
          {reviews.map((review) => (
            <div className="review-card" key={review.id} ref={addToRefs}>
              <div className="user-info">
                <img src={review.avatar} alt={review.name} className="avatar" />
                <h3>{review.name}</h3>
              </div>
              <div className="rating">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
              <p className="review-text">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserReviews;