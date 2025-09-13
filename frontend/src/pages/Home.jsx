import React from 'react'

const Home = () => {
  return (
    <div>
        <div className='h-screen pt-8  flex justify-between flex-col w-full bg-red-400'>
        <img className ='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber" />
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-3xl font-bold'> Get started with uber </h2>
                <button className='w-full bg-black text-white py-3 rounded mt-5'> Continue</button>
            </div>

        </div>


    </div>
  )
}

export default Home