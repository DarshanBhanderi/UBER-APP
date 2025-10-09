import React, { useEffect, useRef, useState } from 'react'
// import { useGSAP } from '@gsap/react';
// import gsap from 'gsap';
// import axios from 'axios';
// import 'remixicon/fonts/remixicon.css'
// import LocationSearchPanel from '../components/LocationSearchPanel';
// import VehiclePanel from '../components/VehiclePanel';
// import ConfirmRide from '../components/ConfirmRide';
// import LookingForDriver from '../components/LookingForDriver';
// import WaitingForDriver from '../components/WaitingForDriver';
// import { SocketContext } from '../context/SocketContext';
// import { useContext } from 'react';
// import { UserDataContext } from '../context/UserContext';
// import { useNavigate } from 'react-router-dom';
// import LiveTracking from '../components/LiveTracking';

const Home = () => {
    // const [ pickup, setPickup ] = useState('')
    // const [ destination, setDestination ] = useState('')
    // const [ panelOpen, setPanelOpen ] = useState(false)
    // const vehiclePanelRef = useRef(null)
    // const confirmRidePanelRef = useRef(null)
    // const vehicleFoundRef = useRef(null)
    // const waitingForDriverRef = useRef(null)
    // const panelRef = useRef(null)
    // const panelCloseRef = useRef(null)
    // const [ vehiclePanel, setVehiclePanel ] = useState(false)
    // const [ confirmRidePanel, setConfirmRidePanel ] = useState(false)
    // const [ vehicleFound, setVehicleFound ] = useState(false)
    // const [ waitingForDriver, setWaitingForDriver ] = useState(false)
    // const [ pickupSuggestions, setPickupSuggestions ] = useState([])
    // const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
    // const [ activeField, setActiveField ] = useState(null)
    // const [ fare, setFare ] = useState({})
    // const [ vehicleType, setVehicleType ] = useState(null)
    // const [ ride, setRide ] = useState(null)

    // const navigate = useNavigate()
    // const { socket } = useContext(SocketContext)
    // const { user } = useContext(UserDataContext)

    // useEffect(() => {
    //     socket.emit("join", { userType: "user", userId: user._id })
    // }, [ user ])

    // socket.on('ride-confirmed', ride => {
    //     setVehicleFound(false)
    //     setWaitingForDriver(true)
    //     setRide(ride)
    // })

    // socket.on('ride-started', ride => {
    //     console.log("ride")
    //     setWaitingForDriver(false)
    //     navigate('/riding', { state: { ride } }) 
    // })

    // const handlePickupChange = async (e) => { }
    // const handleDestinationChange = async (e) => { }
    // const submitHandler = (e) => { e.preventDefault() }

    // useGSAP(function () { }, [ panelOpen ])
    // useGSAP(function () { }, [ vehiclePanel ])
    // useGSAP(function () { }, [ confirmRidePanel ])
    // useGSAP(function () { }, [ vehicleFound ])
    // useGSAP(function () { }, [ waitingForDriver ])

    // async function findTrip() { }
    // async function createRide() { }

    return (
        <div className='h-screen relative overflow-hidden'>
            <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <div className='h-screen w-screen'>
                {/* <LiveTracking /> */}
                <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                    LiveTracking Placeholder
                </div>
            </div>
            <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>
                <div className='h-[30%] p-6 bg-white relative'>
                    <h5 className='absolute opacity-0 right-6 top-6 text-2xl'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className='text-2xl font-semibold'>Find a trip</h4>
                    <form className='relative py-3'>
                        <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
                        <input
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
                            type="text"
                            placeholder='Add a pick-up location'
                        />
                        <input
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
                            type="text"
                            placeholder='Enter your destination' />
                    </form>
                    <button className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
                        Find Trip
                    </button>
                </div>
                <div className='bg-white h-0'>
                    {/* <LocationSearchPanel /> */}
                    <div className="p-4">LocationSearchPanel Placeholder</div>
                </div>
            </div>
            {/* Other panels commented out */}
            {/* <div ref={vehiclePanelRef}>VehiclePanel</div>
            <div ref={confirmRidePanelRef}>ConfirmRide</div>
            <div ref={vehicleFoundRef}>LookingForDriver</div>
            <div ref={waitingForDriverRef}>WaitingForDriver</div> */}
        </div>
    )
}

export default Home
