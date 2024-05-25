import EmptyContainer from './EmptyContainer'
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ImageCarousel = ({ imgs }) => {
    const [imgIndex, setImgIndex] = useState(0);

    useEffect(() => {
        if (imgs.length === 0) {
            setImgIndex(0);
          } else if (imgIndex >= imgs.length) {
            setImgIndex(imgs.length - 1);
          }
    }, [imgs]);

    return (
        <div className="bg-slate-100 container relative w-48 h-44 md:w-72 md:h-80 lg:w-full lg:h-full 2xl:h-[45rem] min-[1700px]:h-[55rem] border-slate-400 border-[1px] flex flex-col justify-center items-center gap-0 overflow-hidden"
        >
        
            {imgs.length === 0 ? (
                <EmptyContainer />
            ) : (
                <>
                    <Images imgs={imgs} imgIndex={imgIndex} />
                    <Dots imgs={imgs} imgIndex={imgIndex} setImgIndex={setImgIndex} />
                </>
            )}
        </div>
    )
}

export default ImageCarousel

const Images = ({ imgs, imgIndex}) => {
    return (
        <>
            {imgs.map((img, idx) => {
                return (
                    <div key={idx} href={document.file} target="_blank" rel="noopener noreferrer" className={`${imgIndex !== idx && 'hidden'}  w-full h-full`}
                    >
                        <motion.img
                            
                            src={img}
                            className='object-center border-slate-400 border-[1px] w-full h-full'
                            // style={{ maxWidth: '100%', maxHeight: '100%' }}
                        />
                    </div>


                )
            })}
        </>
    )
}

const Dots = ({ imgs, imgIndex, setImgIndex }) => {
    return (
      <div className="absolute bottom-0 flex items-center w-full h-10 justify-center gap-2 z-10">
        {imgs.map((_, idx) => {
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
