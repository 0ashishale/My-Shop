import React from 'react'

const About = () => {
  return (
    <div className='  bg-gray-100 justify-center'>

      <div className="  mt-20  p-10 "   >
        <div className=' shadow-xl  rounded-md overflow-hidden'>
      <div ClassName="" >
          <h1 className=' mt-8  mr-8 ml-8 text-lg pt-8 text-red-500 underline'>About Our Company</h1>
          <p className='ml-8 mr-8'>Welcome to our real estate website! We are a team of experienced real estate agents who are passionate about helping our clients find their dream home.</p>
          <p className='ml-8 mr-8'>Whether you are looking to buy, sell, or rent a property, we are here to guide you through every step of the process. With our extensive knowledge of the local real estate market and our commitment to providing exceptional customer service, we are confident that we can help you achieve your real estate goals.</p>
        </div>
        <div ClassName="shadow-xl text-gray-200 " >
          <h2 className=' ml-8 mr-8  text-red-500 pt-8 underline'>Our Services</h2>
          <ul className=' ml-8 mr-8'>
            <li>Buying and selling residential properties</li>
            <li>Property management services</li>
            <li>Real estate investment consulting</li>
            <li>Home staging and interior design services</li>
          </ul>
        </div>
        <div ClassName="shadow-xl text-gray-200 " >
          <h2 className='ml-8 mr-8 text-lg pt-8 text-red-500 underline' >Why Choose Us</h2>
          <p className='ml-8 mr-8'>At our company, we believe that our clients deserve the best. That's why we are dedicated to providing personalized service, expert advice, and a commitment to excellence that is unmatched in the industry. When you work with us, you can expect:</p>
          <ul className=' ml-8 mr-8'>
            <li>Access to the latest market data and trends</li>
            <li>Expert advice on pricing, marketing, and negotiating</li>
            <li>Customized marketing plans that highlight the unique features of your property</li>
            <li>Responsive communication and support throughout the entire process</li>
          </ul>
        </div>
          <p className=' mb-8 ml-8 pt-8' >Contact us today to learn more about our services and how we can help you achieve your real estate goals!</p>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center  " >
        <div class="max-w-md w-full shadow-xl rounded-md overflow-hidden">
          <div class="p-4">
            <h2 class="text-lg font-medium text-gray-800">Contact Details</h2>
          </div>
          <div class="px-4 py-2">
            <p class="text-gray-700 font-medium">Name</p>
            <p class="text-gray-900">SRsolution</p>
          </div>
          <div class="px-4 py-2">
            <p class="text-gray-700 font-medium">Email</p>
            <p class="text-gray-900">sr@gmail.com</p>
          </div>
          <div class="px-4 py-2">
            <p class="text-gray-700 font-medium">Phone</p>
            <p class="text-gray-900">98**********</p>
          </div>
          <div class="px-4 py-2">
            <p class="text-gray-700 font-medium">Address</p>
            <p class="text-gray-900">pokhara, Nepal</p>
          </div>
          <div class="px-4 py-2">
            <p class="text-gray-700 font-medium">Social</p>
            <div class="flex justify-start items-center space-x-4">
              <a href="#" class="text-gray-700 hover:text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </a>
              <a href="#" class="text-gray-700 hover:text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </a>
              <a href="#" class="text-gray-700 hover:text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About



