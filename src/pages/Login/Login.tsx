import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import './Login.css';
import { loginApi } from '../../api/doctor';
import { useAuthStore } from '../../store/authStore';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { setAuth, token } = useAuthStore();
    const navigate = useNavigate();

    // Already logged in → go home
    if (token) return <Navigate to="/" replace />;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const data = await loginApi(email, password);
            setAuth(data.user, data.token);
            navigate('/');
        } catch (err: any) {
            const msg: string =
                err?.response?.data?.message ?? 'Login failed. Please try again.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="signup-link">
                    Don't have an account? <Link to="/register">Sign up here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
