// import { Cher } from "react-icons/fa";
import { useState } from "react"
import { BsChevronRight, BsChevronLeft  } from "react-icons/bs"

export default function Carousel({ children : slides}) {

    const [curr, setCurr] = useState(0);
        const prev=()=> setCurr(
            (curr)=> (curr == 0 ? slides.length-1 : curr-1));

            const next=()=> setCurr(
                (curr)=> (curr ==  slides.length-1 ? 0 : curr+1));




    return (

        <div className="overflow-hidden relative">
            <div className="flex transition-transform ease-out duration-3000" style={{transform: `translateX(-${curr *100}%)`}}>
                {slides }
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
                <button className=" "> 
                    <BsChevronLeft size={20} onClick={prev} className="bg-white rounded-full" />
                </button>
                <button> 
                    <BsChevronRight size = {20} onClick={next} className = 'bg-white rounded-full' />
                </button>
               
            </div>
        <div className="absolute bottom-4 right-0 left-0">
            <div className="flex items-center justify-center gap-2">
                {slides.map((_, i) => (
                    <div className={ `
                      transition-all w-3 h-3 bg-white rounded-full
                      ${curr == i  ? "p-2" : "bg-opacity-50"}
                    `} />
                ))}
                
                </div> 
        
        
        </div>

        </div>
    )
}