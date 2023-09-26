import React from 'react'

function Card( prop) {

    
    return (
        <div>
            <div className="card border w-86  m-8 cursor-pointer rounded"  >
                <div className="card__content p-1 relative "  >
                    {/* <p className='absolute  text-sm top-2 rounded left-2 p-1 bg-blue-100 bg-opacity-95'>Listed : {prop.time} ago </p> */}
                    <img className='w-80 h-48 bg-contain '  src={prop.image} alt="photo" />
                    <div className="address p-4"  >
                        <p className='font-bold' data-aos="fade-out">{prop.location}</p>
                        <p className='' >{prop.address}</p>
                        <div className="details list-none pt-5 pb-4 flex justify-start " >
                            <li className='text-sm'>Bedroom: {prop.bedroom} </li>
                            <li className='pl-6 text-sm'>Parking: {prop.parking}</li>
                            <li className='pl-6 text-sm'>Size: {prop.size}</li>

                        </div >
                        <h1><em className='font-bold' >NPR. {prop.price} </em> <i > </i></h1>
                    </div>





                </div>
                


            </div>
            

            
        </div>
    )
}

export default Card
