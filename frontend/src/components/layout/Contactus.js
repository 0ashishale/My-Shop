import React from 'react'
import {FaFacebookSquare, FaWhatsappSquare, FaInstagramSquare } from 'react-icons/fa'

const Contactus = () => {
    return (
        <div>
            <div className=' mt-20'>
            <div class="flex flex-col items-center justify-center space-y-6" >
                <h2 class="text-2xl font-bold">Connect with us</h2>
                <div class="flex space-x-4">
                    <a href="#" class="text-blue-500 hover:text-blue-600">
                       <FaFacebookSquare/>
                    </a>
                    <a href="#" class="text-blue-500 hover:text-blue-600" >
                        <FaInstagramSquare/>
                    </a>
                    <a href="#" class="text-blue-500 hover:text-blue-600" >
                        <FaWhatsappSquare/>
                    </a>
                    
                </div>
            </div>

                <div className='flex justify-center mt-6 ' >
                    <form class="w-full max-w-lg m-3  bg-gray-100 rounded-3xl">
                        <div class="flex flex-wrap -mx-3 mb-6 ml-4 mr-4">
                            <div class="w-full px-3 mt-8 mb-6 md:mb-0 ">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="name">
                                    Name
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="name" type="text" placeholder="Your Name" />
                            </div>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">
                                    Email
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email" placeholder="rajeshshrees@gmail.com" />
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6 ml-4 mr-4">
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="phone">
                                    Phone
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="phone" type="tel" placeholder="98********" />
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6 ml-4 mr-4">
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="message">
                                    Message
                                </label>
                                <textarea class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="message" rows="6"></textarea>
                            </div>
                        </div>
                        <div class="  ml-4 mb-8">
                            <div class="md:w-1/3 flex justify-center">
                                <button class=" shadow-xl bg-sky-400 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-3xl" type="button">
                                    Send
                                </button>
                            </div>

                        </div>
                    </form>
                </div>

            </div>

            
        </div>
    )
}

export default Contactus
