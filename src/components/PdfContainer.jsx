import { useState } from 'react';
import { motion } from 'framer-motion';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

const PdfContainer = ({ imageSrc, pdfLink }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className='relative overflow-hidden justify-self-center h-72 md:w-72 md:h-max lg:w-full 2xl:w-max lg:h-full 2xl:h-[45rem] min-[1700px]:h-[55rem]'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.img
        src={imageSrc}
        alt="pdf image"
        className='object-center border-slate-400 border-[1px]'
        style={{ maxWidth: '100%', maxHeight: '100%' }}
        whileHover={{
          filter: 'blur(2px) brightness(0.8)',
        }}
        transition={{ duration: 0.3 }}
      />

      {isHovered && (
        <a href={pdfLink} target="_blank" rel="noopener noreferrer">
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white">
              <div className='text-2xl lg:text-3xl'>
                <MdOutlineRemoveRedEye />
              </div>
              <p>Live preview</p>
            </div>
        </a>
      )}
    </div>
  );
}

export default PdfContainer;

// <div className="flex flex-col items-center justify-center gap-2">
//   <a href={`${pdfURL}${pdfFilePath}`} target="_blank" rel="noopener noreferrer" className="p-2 w-32 grid place-content-center bg-accent1 font-medium text-white rounded">Preview Now</a>
//   <button className="p-2 w-32 grid place-content-center bg-accent3 font-medium text-white rounded">
//     Cancel
//   </button>
//   <img 
//     src={`${pdfURL}${pdfImagePath}`}
//   />
// </div>