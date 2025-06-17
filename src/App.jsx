import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import BookingSuccess from './pages/BookingSuccess';
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/Loader';
import './styles/App.scss';

// Wrapper component to conditionally render Navbar and Footer
const AppContent = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  
  // Don't show navbar on booking success page
  const showNavbar = location.pathname !== '/booking-success';
  // Show footer on all pages
  const showFooter = true;

  useEffect(() => {
    // Function to check if all images and videos are loaded
    const checkAllMediaLoaded = () => {
      const images = document.querySelectorAll('img');
      const videos = document.querySelectorAll('video');
      
      // If there are no media elements yet, wait a bit and check again
      if (images.length === 0 && videos.length === 0) {
        setTimeout(checkAllMediaLoaded, 500);
        return;
      }
      
      let loadedCount = 0;
      const totalCount = images.length + videos.length;
      
      // Check images
      images.forEach(img => {
        if (img.complete) {
          loadedCount++;
        } else {
          img.addEventListener('load', () => {
            loadedCount++;
            if (loadedCount === totalCount) setLoading(false);
          });
          img.addEventListener('error', () => {
            loadedCount++;
            if (loadedCount === totalCount) setLoading(false);
          });
        }
      });
      
      // Check videos
      videos.forEach(video => {
        if (video.readyState >= 3) { // HAVE_FUTURE_DATA or higher
          loadedCount++;
        } else {
          video.addEventListener('loadeddata', () => {
            loadedCount++;
            if (loadedCount === totalCount) setLoading(false);
          });
          video.addEventListener('error', () => {
            loadedCount++;
            if (loadedCount === totalCount) setLoading(false);
          });
        }
      });
      
      // If all media is already loaded
      if (loadedCount === totalCount) {
        setLoading(false);
      }
    };
    
    // Start checking for loaded media
    checkAllMediaLoaded();
    
    // Set a maximum loading time of 8 seconds
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 8000);
    
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="app">
      <Loader loading={loading} />
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
      </Routes>
      {showFooter && <Footer />}
      <ScrollToTop />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
