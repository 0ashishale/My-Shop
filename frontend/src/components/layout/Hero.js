import React from 'react'



function Hero() {
  return (
    <div>
      <div className="hero z-1" >
        <div className="hero__content   bg-cover ">
          <img className="hero__content   md:w-auto w-full h-full bg-cover " src='/image.jpg' alt=""/>

          <h1 className='absolute bg-slate-100 p-6 text-red-700 font-serif  rounded md:text-4xl text-sm  bg-opacity-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ' >DREAM HOUSE WITH US</h1>
        </div>
      </div>
    </div>
  )
}

export default Hero
