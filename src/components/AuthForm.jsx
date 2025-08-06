import {useState} from 'react'

import React from 'react'

function AuthForm() {

    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        //TODO login/register
    }



  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="auth-input"
          required
          disabled={loading}
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
          required
          disabled={loading}
        />
        
        <button type="submit" className="auth-submit" disabled={loading}>
          {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Register')}
        </button>
        
        {error && <div className="auth-error">{error}</div>}
        
        <button 
          type="button" 
          onClick={() => {
            setIsLogin(!isLogin);
            setError('');
          }}
          className="auth-switch"
          disabled={loading}
        >
          {isLogin ? 'Need to register?' : 'Already have an account?'}
        </button>
      </form>
    </div>
  );
}

export default AuthForm