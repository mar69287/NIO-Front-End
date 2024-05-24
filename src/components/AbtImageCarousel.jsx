import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";


const AbtImageCarousel = ({ imgs }) => {
    // console.log(imgs)
  return (
    <>
        {imgs.map((img, idx) => {
            return (
                <div key={idx} className="overflow-hidden bg-slate-100 w-48 h-44 md:w-72 md:h-80 lg:w-full lg:h-80 2xl:h-[45rem] min-[1700px]:h-[55rem] border-slate-400 border-[1px] flex flex-col justify-center items-center gap-0 mb-5">
                    <img src={img} alt="" className="w-full h-full"/>
                </div> 
            )
        })}
    </>
  )
}

export default AbtImageCarousel