import React, { useState, useEffect, useCallback } from 'react';
import { useComingSoon } from './ComingSoonContext'; // Import the context
import Page from './Page';

export default function Soon() {
  const { setComingSoon } = useComingSoon();
  const [email, setEmail] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [liveMode, setLiveMode] = useState(false);
  const [isDelayed, setIsDelayed] = useState(false);
  const [siteLive, setSiteLive] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  const images = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ss-qaRHF3Ry5nvIxxpVPpdjJoJZAz2aVn.webp",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ss1-4JATTF21Wz7AdmGnXQMs5vP21TtNgf.webp",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ss2-tiOvdGC2uSeFBEp6UEk77qNLVqqNka.webp",
  ];

  useEffect(() => {
    const storedEmail = localStorage.getItem('subscriberEmail');
    if (storedEmail) {
      checkEmailAccess(storedEmail);
    }
    
    // Listen for storage changes
    const handleStorageChange = (event) => {
      if (event.key === 'subscriberEmail') {
        window.location.reload(); // Reload the page if there's a change in subscriberEmail
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const checkSiteStatus = async () => {
      try {
        const response = await fetch('https://come-soon-server.onrender.com/api/site-status');
        const data = await response.json();
        if (data.siteLive !== siteLive) {
          setSiteLive(data.siteLive);
        }
      } catch (error) {
        console.error('Error fetching site status:', error);
      }
    };

    const interval = setInterval(checkSiteStatus, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, [siteLive]);

  const handleNextImage = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
      setIsTransitioning(false);
    }, 1000);
  }, [images.length]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get('live')) {
      setTimeout(() => {
        setIsDelayed(true);
      }, 5000); // 5-second delay before live mode is enabled
    }
  }, []);

  useEffect(() => {
    if (isDelayed) {
      setLiveMode(true);
    }
  }, [isDelayed]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextImage();
    }, 5000);
    return () => clearInterval(interval);
  }, [handleNextImage]);

  const handleDotClick = (index) => {
    if (index !== currentImage) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImage(index);
        setIsTransitioning(false);
      }, 1000);
    }
  };

  const checkEmailAccess = async (email) => {
    try {
        const response = await fetch('https://come-soon-server.onrender.com/api/check-access', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();

        if (!data.hasAccess) {
            // If access is revoked or the email is no longer valid, remove from localStorage
            localStorage.removeItem('subscriberEmail');
            setHasAccess(false);
            setSiteLive(false);
            setLiveMode(false);
            alert('Your access has been revoked or your subscription is no longer valid.');
        } else {
            setHasAccess(data.hasAccess);
            setSiteLive(data.siteLive);
            if (data.siteLive && data.hasAccess) {
                setLiveMode(true);
            }
        }
    } catch (error) {
        console.error('Error checking email access:', error);
    }
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('https://come-soon-server.onrender.com/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || 'An unknown error occurred.');
        return;
      }

      alert('Subscription successful! Please reload the page to see the live website.');
      setEmail('');
      localStorage.setItem('subscriberEmail', email); // Store email in local storage
      setComingSoon(false);
      checkEmailAccess(email); // Check access for this email
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  function LiveComponent() {
    return (
      <div>
        <Page />
      </div>
    );
  }

  const showLiveWebsite = liveMode && hasAccess && siteLive;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-yellow-100 text-center py-1 text-sm">
        {siteLive ? 'The website is live!' : 'Are you ready for our new online store?'}
      </div>
      {showLiveWebsite ? (
        <LiveComponent />
      ) : (
        <div className="flex-grow flex flex-col md:flex-row">
          <div className="md:w-1/3 relative">
            <div className="absolute top-3 left-4 text-2xl font-bold z-10 pointer-events-none">StyleHub</div>
            <img
              src={images[currentImage]}
              alt="Person holding white fabric"
              className={`w-[600px] h-full object-cover transition-all duration-1000 ${
                isTransitioning ? 'blur-md opacity-70' : 'blur-0 opacity-100'
              }`}
            />
            <div className="absolute bottom-4 left-4 flex flex-col space-y-2">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-6 h-6 rounded-full cursor-pointer ${
                    currentImage === index ? 'bg-black' : 'border-2 border-black'
                  }`}
                  onClick={() => handleDotClick(index)}
                ></div>
              ))}
            </div>
          </div>
          <div className="md:ml-36 md:w-1/2 bg-white p-8 flex flex-col justify-center items-center">
            <div className="w-full max-w-md">
              <h1 className="text-4xl md:text-5xl font-serif mb-8 text-center">
                {siteLive ? 'Website Now Live' : 'Coming Soon'}
              </h1>
              <div className="flex justify-between mb-8">
                <div className="w-[45%]">
                  <img
                    src="https://img.freepik.com/free-photo/full-shot-couple-posing-together_23-2148546985.jpg"
                    alt="Couple posing"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="w-[45%]">
                  <img
                    src="https://img.freepik.com/free-photo/woman-model-demonstrating-winter-cloths_1303-17002.jpg"
                    alt="Winter clothes model"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              {!siteLive && (
                <>
                  <p className="text-center mb-4">
                    Be the first to subscribe and get $15 credit towards your next purchase!
                  </p>
                  <form className="w-full" onSubmit={handleSubmit}>
                    <div className="flex">
                      <input
                        type="email"
                        placeholder="Email*"
                        required
                        className="flex-grow px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Subscribe
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
