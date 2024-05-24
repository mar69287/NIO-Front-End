import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineRemoveRedEye } from 'react-icons/md';

const PdfCarousel = ({ documents }) => {
 const [imgIndex, setImgIndex] = useState(0);

 useEffect(() => {
    if (imgIndex >= documents.length) {
      setImgIndex(documents.length - 1);
    }
 }, [documents, imgIndex]);

  return (
    <div className="bg-slate-100 container relative w-48 h-44 md:w-72 md:h-80 lg:w-full lg:h-full 2xl:h-[45rem] min-[1700px]:h-[55rem] border-slate-400 border-[1px] flex flex-col justify-center items-center gap-0 overflow-hidden"
    >
        <Images documents={documents} imgIndex={imgIndex} />
        <Dots documents={documents} imgIndex={imgIndex} setImgIndex={setImgIndex} />
    </div>
  )
}

export default PdfCarousel

const Images = ({ documents, imgIndex}) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <>
            {documents.map((document, idx) => {
                return (
                    <a key={idx} href={document.file} target="_blank" rel="noopener noreferrer" className={`${imgIndex !== idx && 'hidden'}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <motion.img
                            
                            src={document.image}
                            whileHover={{
                                filter: 'blur(2px) brightness(0.8)',
                            }}
                            className='object-center border-slate-400 border-[1px]'
                            style={{ maxWidth: '100%', maxHeight: '100%' }}
                        />
                        {isHovered && (

                            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white">
                                <div className='text-2xl lg:text-3xl'>
                                    <MdOutlineRemoveRedEye />
                                </div>
                                <p>
                                    {document.name}
                                </p>
                            </div>
                        )}
                    </a>


                )
            })}
        </>
    )
}

const Dots = ({ documents, imgIndex, setImgIndex }) => {
    return (
      <div className="absolute bottom-0 flex items-center w-full h-10 justify-center gap-2 z-10">
        {documents.map((_, idx) => {
          return (
            <button
              key={idx}
              onClick={() => setImgIndex(idx)}
              className={`h-3 w-3 rounded-full transition-colors ${
                idx === imgIndex ? "bg-neutral-500" : "bg-slate-400"
              }`}
            />
          );
        })}
      </div>
    );
};