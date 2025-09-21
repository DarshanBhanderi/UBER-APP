import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainDataContext';

const CaptainSignup = () => {
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    // Build the payload exactly like backend expects
    const newCaptain = {
      fullname: { firstname: firstName, lastname: lastName },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: Number(vehicleCapacity), 
        vehicleType
      }
    };

    console.log("Payload to backend:", newCaptain);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        newCaptain
      );

      if (response.status === 201) {
        setCaptain(response.data.captain);
        localStorage.setItem('token', response.data.token);

        // Reset form
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setVehicleColor('');
        setVehiclePlate('');
        setVehicleCapacity('');
        setVehicleType('');

        navigate('/captain-home');
      }
    } catch (err) {
      console.error('Signup failed:', err.response?.data || err.message);
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
      <div>
        <img
          className='w-20 mb-3'
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Captain Logo"
        />
        <form onSubmit={submitHandler}>
          <div className='flex gap-4 mb-7'>
            <input
              type="text"
              placeholder='First name'
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg'
            />
            <input
              type="text"
              placeholder='Last name'
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg'
            />
          </div>

          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg'
          />
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg'
          />

          <div className='flex gap-4 mb-7'>
            <input
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={e => setVehicleColor(e.target.value)}
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg'
            />
            <input
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={e => setVehiclePlate(e.target.value)}
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg'
            />
          </div>

          <div className='flex gap-4 mb-7'>
            <input
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={e => setVehicleCapacity(e.target.value)}
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg'
            />
            <select
              value={vehicleType}
              onChange={e => setVehicleType(e.target.value)}
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg'
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <button
            type="submit"
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg'
          >
            Create Captain Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default CaptainSignup;
