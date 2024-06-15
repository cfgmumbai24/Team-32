import { useState } from 'react';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginuser = async (e) => {
    e.preventDefault();
    const res = await fetch('/signin?', {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (data.status === 400 || !data) {
      window.alert('Invalid credentials');
    } else {
      window.alert('Successful login');
      navigate('/');
    }
  };

  return (
    <div>
      <section className="h-screen flex justify-center bg-gray-100">
        <div className="container max-w-md mx-auto p-4 pt-6 md:p-6 lg:p-12">
          <div className="signin-image mb-4">
            <figure>
              <img src="/assets/logo.svg" alt="registration pic" />
            </figure>
            <Link to="/Signup" className="text-blue-600 hover:text-blue-900">
              Create new account
            </Link>
          </div>
          <div className="signin-content">
            <div className="signup-form">
              <h2 className="form-title text-center">Sign in</h2>
              <form className="register-form" id="register-form">
                <div className="form-group mb-4">
                  <label htmlFor="email">
                    <MailIcon />
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="password">
                    <LockIcon />
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signup"
                    id="signin"
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                    value="Login"
                    onClick={loginuser}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};