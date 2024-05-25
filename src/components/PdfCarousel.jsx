import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import EmptyContainer from "./EmptyContainer";

const PdfCarousel = ({ documents }) => {
 const [imgIndex, setImgIndex] = useState(0);
 console.log('img', imgIndex)
 console.log('length', documents.length)

 useEffect(() => {
    if (documents.length === 0) {
      setImgIndex(0);
    } else if (imgIndex >= documents.length) {
      setImgIndex(documents.length - 1);
    }
 }, [documents]);

  return (
    <div className="relative w-full h-80 md:h-[30rem] lg:h-[32rem] 2xl:h-[35rem] min-[1700px]:h-[38rem] flex flex-col justify-center items-center gap-0 overflow-hidden"
    >
      {
        documents.length === 0 ? (
          <EmptyContainer />
        ) : (
          <>
            <Images documents={documents} imgIndex={imgIndex} />
            <Dots documents={documents} imgIndex={imgIndex} setImgIndex={setImgIndex} />
          </>
        )
      }
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
                    <a key={idx} href={document.file} target="_blank" rel="noopener noreferrer" className={`${imgIndex !== idx && 'hidden'} w-80 md:w-[30rem] h-full grid place-content-center relative border-slate-400 border-[1px] overflow-hidden`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <motion.img
                            
                            src={document.image}
                            whileHover={{
                                filter: 'blur(2px) brightness(0.8)',
                            }}
                            className='object-scale-down'
                            // style={{ maxWidth: '100%', maxHeight: '100%' }}
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
              className={`h-2.5 w-2.5 xl:h-3 xl:w-3 rounded-full transition-colors ${
                idx === imgIndex ? "bg-neutral-500" : "bg-slate-400"
              }`}
            />
          );
        })}
      </div>
    );
};