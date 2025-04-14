import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OtpVerification = ({ email, onBack }) => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsSubmitting(true);

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate(`/reset-password?token=${data.token}`);
      } else {
        setError(data.error || 'OTP verification failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendOtp = async () => {
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:8080/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('New OTP sent to your email');
        setTimeLeft(900); // Reset timer to 15 minutes
      } else {
        setError(data.error || 'Failed to resend OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Verify OTP</h2>
        <p style={styles.subtitle}>
          We've sent a 6-digit OTP to <strong>{email}</strong>
        </p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            required
            style={styles.input}
          />
          <div style={styles.timer}>
            {timeLeft > 0 ? `Time remaining: ${formatTime(timeLeft)}` : 'OTP expired'}
          </div>
          <button
            type="submit"
            style={styles.primaryButton}
            disabled={isSubmitting || timeLeft <= 0}
          >
            {isSubmitting ? 'Verifying...' : 'Verify OTP'}
          </button>
          <button
            type="button"
            onClick={resendOtp}
            style={styles.secondaryButton}
            disabled={timeLeft > 0}
          >
            Resend OTP
          </button>
          <button type="button" onClick={onBack} style={styles.textButton}>
            Back
          </button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: '0.875rem',
    color: '#666',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    textAlign: 'center',
    letterSpacing: '0.5rem',
  },
  timer: {
    textAlign: 'center',
    color: '#666',
    fontSize: '0.875rem',
    margin: '0.5rem 0',
  },
  primaryButton: {
    padding: '0.75rem',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  secondaryButton: {
    padding: '0.75rem',
    backgroundColor: 'white',
    color: '#4f46e5',
    border: '1px solid #4f46e5',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  textButton: {
    padding: '0.75rem',
    backgroundColor: 'transparent',
    color: '#666',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  message: {
    marginTop: '1rem',
    color: '#10b981',
    textAlign: 'center',
  },
  error: {
    marginTop: '1rem',
    color: '#ef4444',
    textAlign: 'center',
  },
};

export default OtpVerification;