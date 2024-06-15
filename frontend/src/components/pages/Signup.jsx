import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';

export const Signup = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    cstress: '',
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    if (user.password !== user.cpassword) {
      alert('Passwords do not match!');
      return;
    }
    // Make API call
    try {
      const response = await fetch('http://localhost:3010/api/insertUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          phone: user.phone,
          password: user.password,
          role:1,
          keywords:[] // Ensure your backend hashes this password before storing
        }),
      });
      const data = await response.json();
      // You can handle the response further
      if (response.ok) {
        alert('Registration successful!');
        // Redirect or clear form here
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="h-screen flex justify-center bg-gray-100">
      <section className="signup w-full max-w-md mx-auto p-4 pt-6 md:p-6 lg:p-12">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title text-center">Sign up</h2>
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="form-group mb-4">
                <label htmlFor="name">
                  <PersonIcon />
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={user.name}
                  onChange={handleInputs}
                  placeholder="Your name"
                  className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="email">
                  <MailIcon />
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={user.email}
                  onChange={handleInputs}
                  placeholder="Your email address"
                  className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="phone">
                  <PhoneIcon />
                </label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  value={user.phone}
                  onChange={handleInputs}
                  placeholder="Your phone number"
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
                  value={user.password}
                  onChange={handleInputs}
                  placeholder="Your password"
                  className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="cpassword">
                  <LockIcon />
                </label>
                <input
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  value={user.cpassword}
                  onChange={handleInputs}
                  placeholder="Confirm your password"
                  className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="form-group form-button">
                <input
                  type="submit"
                  name="signup"
                  id="signup"
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                  value="Register"
                />
              </div>
            </form>
            <div className="signup-image">
              <Link to="/login" className="text-blue-600 hover:text-blue-900">
                I am already registered
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
