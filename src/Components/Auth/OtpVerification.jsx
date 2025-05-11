import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OtpVerification = () => {
  const location = useLocation(); // Access location state
  const { email, sendotp, onBack } = location.state || {}; // Destructure email and sendotp
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('OTP:', sendotp);
    setError('');
    setMessage('');
    setIsSubmitting(true);

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      setIsSubmitting(false);
      return;
    }

    if (otp !== sendotp.toString()) {
      setError('Invalid OTP. Please try again.');
      setIsSubmitting(false);
      return;
    }

    try {
      // If OTP matches, navigate to the reset password page
      navigate(`/reset-password`, { state: { email } });
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!email || !sendotp) {
    setError('Invalid access. Please try again.');
    return;
  }

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
        }}>Verify OTP</h2>
        <p style={{
          fontSize: '0.875rem',
          color: '#666',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}>
          We've sent a 6-digit OTP to <strong>{email}</strong>
        </p>
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            required
            style={{
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
              textAlign: 'center',
              letterSpacing: '0.5rem',
            }}
          />
          <div style={{
            textAlign: 'center',
            color: '#666',
            fontSize: '0.875rem',
            margin: '0.5rem 0',
          }}>
            {timeLeft > 0 ? `Time remaining: ${formatTime(timeLeft)}` : 'OTP expired'}
          </div>
          <button
            type="submit"
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
            disabled={isSubmitting || timeLeft <= 0}
          >
            {isSubmitting ? 'Verifying...' : 'Verify OTP'}
          </button>
          <button
            type="button"
            onClick={'' }
            disabled={timeLeft > 0}
            style={{
              padding: '0.75rem',
              backgroundColor: 'white',
              color: '#4f46e5',
              border: '1px solid #4f46e5',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            Resend OTP
          </button>
          <button
            type="button"
            onClick={onBack}
            style={{
              padding: '0.75rem',
              backgroundColor: 'transparent',
              color: '#666',
              border: 'none',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Back
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

export default OtpVerification;