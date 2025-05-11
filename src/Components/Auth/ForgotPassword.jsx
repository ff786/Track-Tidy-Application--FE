import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [Otp, setOtp] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    const Otp = Math.floor(100000 + Math.random() * 900000);
    setOtp(Otp);
    
    try {
      console.log('Generated OTP:', Otp)
      const response = await axios.post('http://localhost:8080/api/track-tidy/email/send', {
        "to": email,
        "subject": "Your OTP Code for Verification",
        "body": `Dear User, Your One-Time Password ${Otp} for verification`
      });

      if (response.status === 200) {
        setMessage('OTP sent to your email');
        navigate('/otp-verification', { state: { email, sendotp: Otp } }); // Pass Otp as sendotp
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          textAlign: 'center',
          color: '#333',
        }}>Forgot Password</h2>
        <p style={{
          fontSize: '0.875rem',
          color: '#666',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}>Enter your email to receive a password reset OTP</p>
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
            }}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '0.75rem',
              backgroundColor: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            {isSubmitting ? 'Sending...' : 'Send OTP'}
          </button>
        </form>
        {message && <p style={{
          marginTop: '1rem',
          color: '#10b981',
          textAlign: 'center',
        }}>{message}</p>}
        {error && <p style={{
          marginTop: '1rem',
          color: '#ef4444',
          textAlign: 'center',
        }}>{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
