import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import accept from '../images/accept.png';

const ThankYouPage = () => {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <img
          src={accept}
          alt="Success"
          className="mx-auto mb-6 w-20 h-20"
        />
        <h2 className="text-3xl font-bold dark:text-indigo-600 mb-2">Thank you!</h2>
        <p className="text-gray-700 text-lg mb-4">
          Your order has been placed successfully.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Redirecting to home in <span className="font-semibold">{secondsLeft}s</span>...
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full transition duration-300"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
