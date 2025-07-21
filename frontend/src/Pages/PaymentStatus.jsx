// In your React Router component (e.g., PaymentStatus.js)
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const PaymentStatus = () => {
    const location = useLocation();
    const [paymentStatus, setPaymentStatus] = useState('Processing...');
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const orderId = params.get('order_id');
        const paymentSessionId = params.get('order_token'); // Cashfree often uses 'order_token' for session ID in return URL

        if (orderId && paymentSessionId) {
            // You might want to make an API call to your backend to confirm the status
            // as the return URL is client-side and can be manipulated.
            // The backend webhook is the most reliable source for final status.
            const verifyPayment = async () => {
                try {
                    const response = await axios.get(`/api/cashfree/verify-payment-status?order_id=${orderId}`);
                    if (response.data.status === 'success') {
                        setPaymentStatus('Payment Successful! 🎉');
                        setOrderDetails(response.data.order);
                    } else {
                        setPaymentStatus('Payment Failed. 🙁');
                    }
                } catch (error) {
                    console.error('Error verifying payment status:', error);
                    setPaymentStatus('Error verifying payment status.');
                }
            };
            verifyPayment();
        } else {
            setPaymentStatus('Invalid payment details.');
        }
    }, [location]);

    return (
        <div>
            <h2>Payment Status:</h2>
            <p>{paymentStatus}</p>
            {orderDetails && (
                <div>
                    <h3>Order Details:</h3>
                    <p>Order ID: {orderDetails.orderId}</p>
                    <p>Amount: {orderDetails.amount}</p>
                    {/* Display more details as needed */}
                </div>
            )}
        </div>
    );
};

export default PaymentStatus;