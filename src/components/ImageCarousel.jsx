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
        <div className="relative w-full h-80 md:h-[30rem] lg:h-[32rem] 2xl:h-[35rem] min-[1700px]:h-[38rem] flex flex-col justify-center items-center gap-0 overflow-hidden "
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
                    <div key={idx} href={document.file} target="_blank" rel="noopener noreferrer" className={`${imgIndex !== idx && 'hidden'}  w-80 md:w-[30rem] h-full`}
                    >
                        <motion.img
                            src={img}
                            className='object-center border-slate-400 border-[1px] w-full h-full rounded'
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
              className={`h-2.5 w-2.5 xl:h-3 xl:w-3 rounded-full transition-colors ${
                idx === imgIndex ? "bg-neutral-500" : "bg-slate-400"
              }`}
            />
          );
        })}
      </div>
    );
};
