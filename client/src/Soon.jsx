import React, { useState, useEffect, useCallback } from 'react';
import { useComingSoon } from './ComingSoonContext';  // Import the context
import Page from './Page';

export default function Soon() {
  const { comingSoon, setComingSoon } = useComingSoon();
  const [email, setEmail] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [liveMode, setLiveMode] = useState(false);
  const [isDelayed, setIsDelayed] = useState(false); // State to manage delay
  const [siteLive, setSiteLive] = useState(false);   // State to track live status from the backend

  const images = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ss-qaRHF3Ry5nvIxxpVPpdjJoJZAz2aVn.webp",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ss1-4JATTF21Wz7AdmGnXQMs5vP21TtNgf.webp",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ss2-tiOvdGC2uSeFBEp6UEk77qNLVqqNka.webp",
  ];

  // Fetch subscriber status to check if any have `isComingSoon: false`
  useEffect(() => {
    const checkSiteStatus = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/site-status');
        const data = await response.json();
        if (data.siteLive) {
          setSiteLive(true);
        }
      } catch (error) {
        console.error('Error fetching site status:', error);
      }
    };

    checkSiteStatus();
  }, []);

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
        setIsDelayed(true); // Trigger the live mode after delay
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Subscription successful! Check your email for confirmation.');
        setEmail('');
        setComingSoon(false);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  function LiveComponent() {
    return (
      <div>
        <Page />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-yellow-100 text-center py-1 text-sm">
        {siteLive ? 'The website is live!' : 'Are you ready for our new online store?'}
      </div>
      {liveMode ? (
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
