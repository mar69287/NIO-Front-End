import { useState } from "react"
import { MdKeyboardArrowDown } from "react-icons/md";

const Accordian = ({ owner, description, link}) => {
  const [openDescription, setOpenDescription] = useState(false);
  const [openDocumentation, setOpenDoicumentation] = useState(false);

  return (
    <div className="w-full h-max border-slate-400 border-[1px] mb-5 rounded mt-5 lg:mt-0">
        <div className="w-full p-3 lg:p-4 flex justify-between items-center border-slate-400 border-b-[1px]">
            <h1 className="text-sm xl:text-base">Current Owner</h1>
            <p className="text-sm xl:text-base">{owner}</p>
        </div>
        <div className="w-full p-3 lg:p-4 flex flex-col justify-start">
            <div className="w-full  flex justify-between items-center" onClick={() => setOpenDescription(!openDescription)}>
                <h1 className="text-sm xl:text-base">Description</h1>
                <div className="text-lg xl:text-2xl">
                    <MdKeyboardArrowDown />
                </div>
            </div>
            {
                openDescription && 
                    <div className="mt-3">
                        <p className="text-sm xl:text-base">{description}</p>
                    </div>

            }
        </div>
        <div className="w-full p-3 lg:p-4 flex flex-col justify-start border-slate-400 border-t-[1px]">
            <div className="w-full  flex justify-between items-center" onClick={() => setOpenDoicumentation(!openDocumentation)}>
                <h1 className="text-sm xl:text-base">Documentation</h1>
                <div className="text-lg xl:text-2xl">
                    <MdKeyboardArrowDown />
                </div>
            </div>
            {
                openDocumentation && 
                <a
                    href={link} target="_blank" rel="noopener noreferrer" className="mt-3 w-max font-medium hover:text-primary2 transition-colors duration-200"
                >
                    Title / Deed 
                </a>
            }
        </div>
    </div>
  )
}

export default Accordian