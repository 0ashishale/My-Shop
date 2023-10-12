import React from 'react'
import { MdOutlineBedroomParent, MdOutlineBathroom, } from 'react-icons/md'
import { BiBuildingHouse } from 'react-icons/bi'
import { BsPlusSquareDotted } from 'react-icons/bs'
import { TbToolsKitchen, TbSchool, TbRoad } from 'react-icons/tb'
import Home  from '../Home/Home'






import Carousel from '../Product/Carousel.js'

const slides = [
    "https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg",
    "https://robertelliotthomes.com/wp-content/uploads/2020/11/Luxury-homes-in-Dallas.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgO6xG3Ta8cyK6R2QMMZTwiTgVr0gp9QERL7RSxldjXWF3LycMWGldKvO0PsyH0gdc0mw&usqp=CAU",
]



function PropertyDetails(prop) {
    return (
        <div>
            <div className="product__details flex flex-col justify-center w-full">
                <div className="left">
                    <div className="image w-96 ">
                        <h1 className='font-medium text-3xl underline mt-5 mb-5 '>Description </h1>
                        <Carousel >
                            {
                                slides.map((s) => (
                                    <img src={s} />
                                ))
                            }

                        </Carousel>

                    </div>

                    <div className="features flex flex-col justify-center align-middle ">
                        <h1 className='font-medium text-3xl underline mt-5 mb-5'>Features </h1>
                        <div className="content flex  flex-wrap w-1/2">
                            <div className='flex flex-row m-2'>

                                <div className='ml-2 mr-2'>
                                    < BsPlusSquareDotted size={40} />
                                </div>

                                <div>
                                    <p>Area</p>
                                    <p>10</p>
                                </div>
                            </div>
                            <div className='flex flex-row m-2'>

                                <div className='ml-2 mr-2'>
                                    < BiBuildingHouse size={40} />
                                </div>

                                <div>
                                    <p>Build Year</p>
                                    <p>10</p>
                                </div>
                            </div>



                            <div className='flex flex-row m-2'>

                                <div className='ml-2 mr-2'>
                                    < MdOutlineBedroomParent size={40} />
                                </div>

                                <div>
                                    <p>Bedroom</p>
                                    <p>10</p>
                                </div>
                            </div>
                            <div className='flex flex-row m-2'>

                                <div className='ml-2 mr-2'>
                                    < MdOutlineBathroom size={40} />
                                </div>

                                <div>
                                    <p>Bathhroom</p>
                                    <p>10</p>
                                </div>
                            </div>
                            <div className='flex flex-row m-2'>

                                <div className='ml-2 mr-2'>
                                    < TbToolsKitchen size={40} />
                                </div>

                                <div>
                                    <p>Kitchen</p>
                                    <p>10</p>
                                </div>
                            </div>
                            <div className='flex flex-row m-2'>

                                <div className='ml-2 mr-2'>
                                    < TbSchool size={40} />
                                </div>

                                <div>
                                    <p>School</p>
                                    <p>10 m</p>.
                                </div>
                            </div>
                            <div className='flex flex-row m-2'>

                                <div className='ml-2 mr-2'>
                                    < TbRoad size={40} />
                                </div>

                                <div>
                                    <p>Road</p>
                                    <p>10 m.</p>
                                </div>
                            </div>




                        </div>
                        <div  className="w-1/2">
                            <h1 className="font-medium text-3xl underline mt-5 mb-5">Additional Features</h1>
                            <div className="flex flex-row justify-around">
                            <div className="flex flex-row justify-around">
                               <div className="m-2">
                                 <p>property id</p>
                                 <p>property type</p>
                                 <p>Total Area</p>
                               </div>
                               <div className="m-2">
                                <p>p122</p>
                                <p>recidental</p>
                                <p>0-4-0-0/aana</p>
                               </div>
                            </div>
                            <div className="flex flex-row justify-around">
                                <div className="m-2">
                                    <p>Price</p>
                                    <p>proporty status</p>
                                    <p>property face</p>
                                    <p>pRoad Access</p>
                                  </div>
                                  <div className="m-2">
                                   <p>10000000</p>
                                   <p>for sel</p>
                                   <p>south</p>
                                   <p>10fit</p>
                                  </div>
                            </div>
                           
                        </div>
                        <div>
                            <h1  className="font-medium text-3xl underline mt-5 mb-5">Similar homes you may like</h1>
                        </div>
                        </div>

                    </div>


                </div>

                <div className="right">
                 <Home/>
                </div>
            </div>



        </div>
    )
}

export default PropertyDetails
