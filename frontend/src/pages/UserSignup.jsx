import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserDataContext';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [errors, setErrors] = useState({}); // ✅ store field errors

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    setErrors({}); // clear previous errors

    const newUser = {
      fullname: { firstname: firstName, lastname: lastName },
      email,
      password
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
      }
    } catch (err) {
      console.error('Signup failed:', err.response?.data || err.message);

      // ✅ Process backend validation errors
      if (err.response?.data?.errors) {
        const fieldErrors = {};
        err.response.data.errors.forEach((e) => {
          // e.param is usually the field name, e.msg is the message
          if (e.param === 'fullname.firstname') fieldErrors.firstName = e.msg;
          else if (e.param === 'fullname.lastname') fieldErrors.lastName = e.msg;
          else fieldErrors[e.param] = e.msg;
        });
        setErrors(fieldErrors);
      } else {
        alert(err.response?.data?.message || err.message);
      }
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
          alt="logo"
        />

        <form onSubmit={submitHandler}>
          <h3 className="text-lg w-1/2 font-medium mb-2">What's your name</h3>
          <div className="flex gap-4 mb-2">
            <div className="w-1/2">
              <input
                required
                className={`bg-[#eeeeee] w-full rounded-lg px-4 py-2 border text-lg ${errors.firstName ? 'border-red-500' : ''}`}
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>
            <div className="w-1/2">
              <input
                required
                className={`bg-[#eeeeee] w-full rounded-lg px-4 py-2 border text-lg ${errors.lastName ? 'border-red-500' : ''}`}
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            className={`bg-[#eeeeee] mb-2 rounded-lg px-4 py-2 border w-full text-lg ${errors.email ? 'border-red-500' : ''}`}
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            className={`bg-[#eeeeee] mb-2 rounded-lg px-4 py-2 border w-full text-lg ${errors.password ? 'border-red-500' : ''}`}
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

          <button
            className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg"
          >
            Create account
          </button>
        </form>

        <p className="text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>

      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{' '}
          <span className="underline">Google Privacy Policy</span> and{' '}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
