import React from 'react'
import {FaFacebookSquare, FaWhatsappSquare, FaInstagramSquare } from 'react-icons/fa'
function Footer() {
    return (
        <div>
            <div className="footer mt-14" >
                
                <div className=" footer__container md:flex flex md:flex-row flex-col md:justify-around justify-center bg-blue-100  py-7 ">
                    <div className="footer__content items-center md:ml-0 ml-32 md:mr-0 mr-32 md:mt-0 mt-6 ">
                        <img className=' w-30 h-16 ' src='/logo.png' alt="Logo" /> 
                        <h3 className='footer__heading font-bold'>Pokhara, Nepal 33700</h3>
                        
                        
                        <h3 className='footer__email font-bold'>ghoostridder5@gmail.com <a href = "mailto: ghoostridder5@gmail.com " className='border-l-4 border-b-2 border-black  font-light ml-2'>Send Email</a></h3>
                        <h3 className='footer__contact font-bold '>982345456, 986749732</h3>

                    </div>


                        <div className="properties__links list-none md:ml-0 ml-32 md:mr-0 mr-32 md:mt-0 mt-6 ">
                            <h2 className='underline font-bold'>Useful Links</h2>
                            <li><a href=""> Properties For Sale</a>  </li>
                            <li><a href=""> Properties For Rent</a></li>
                            <li> <a href="">Featured Properties</a>  </li>
                           
                        </div>

                        <div className="quick__links list-none  md:ml-0 ml-32 md:mr-0 mr-32 md:mt-0 mt-6 " >
                            <h2 className='underline font-bold'>Quick Links</h2>
                            <li> <a href="/Contactus">Contact Us</a> </li>
                            <li><a href="/About">About Us</a> </li>
                            <li> <a href="/Services">Sercives</a> </li>
                        </div>


                    <div className="follow__us" >
                        <h2 className='underline font-bold md:ml-0 ml-32 md:mr-0 mr-32 md:mt-0 mt-6 '>Follow Us On</h2>
                        <div className="social__links flex justify-around list-none md:mt-0 mt-6 md:mb-0 mb-6 ">
                            <li><a href=""> <FaFacebookSquare /></a> </li>
                            <li><a href=""> <FaWhatsappSquare /></a> </li>
                            <li><a href=""><FaInstagramSquare /></a> </li>


                        </div>
                       
                    </div>


                </div>
            </div>
            <div  className="bg-gray-800 text-white align-center  flex justify-center font-mono md:text-sm text-xs">
                <p className="m-4">&copy; Copyright 2023 SRsolution. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer
