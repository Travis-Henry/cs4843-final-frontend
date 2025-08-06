import {useState} from 'react'

import React from 'react'

function AuthForm({handleLogin, BACKEND_URL}) {

    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const endpoint = isLogin ? '/login' : '/register';

        try{
            const response = await fetch(`${BACKEND_URL}${endpoint}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify({username, password})
            });
            
            const data = await response.json();

            if(response.ok){
                localStorage.setItem('token', data.token);
                handleLogin(data);
            }else{
                setError(data.error || 'Authentication failed');
            }
        }catch(err){
            setError("Connection failed. Please try again.");
        }finally{
            setLoading(false);
        }
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