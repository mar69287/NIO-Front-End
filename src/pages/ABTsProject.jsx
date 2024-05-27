import { useState } from "react";
import DropDownMenu from "../components/DropDownMenu";
import PageHeader from "../components/PageHeader"
import { FaPen } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown, MdFilterList } from "react-icons/md";
import MintABT from "./Minting/MintABT";

const ABTsProject = ({client}) => {
  const [myABTs, setMyABTs] = useState([])
  const [abtFilter, setAbtFilter] = useState('Yearly')
  const [openMint, setOpenMint] = useState(false)
  const [pdfFile, setPdfFile] = useState({});

  if (openMint) {
    return (
      <MintABT client={client} setOpenMint={setOpenMint} setPdfFile={setPdfFile} pdfFile={pdfFile} />
    )
  }


  return (
    <>
      <PageHeader title={'ABTs Projects'} />
      <div className="w-full p-5 lg:px-10 lg:py-7 flex-col justify-center items-center">
        <div className="flex justify-center sm:justify-between items-center w-full mb-4">
          {
            myABTs.length > 0 &&
              <>
                <button onClick={() => setOpenMint(true)} className={`w-full sm:w-max sm:px-5 py-2 gap-3 rounded=sm flex justify-center items-center bg-[#7B61FF] text-white`}>
                  <div className='text-md lg:text-sm '>
                      <FaPen />
                  </div>
                  Create ABT
                </button>
                <div className="hidden sm:flex">
                  <DropDownMenu Icon={MdFilterList} flexDirection={'flex-row-reverse'} title={'Filter'} options={['Yearly', 'Monthly', 'Weekly', 'Daily']} setOptionState={setAbtFilter} />  
                </div>
              </>
          }
        </div>
        {
          myABTs.length > 0 ? (
            <div className={`border-b-2 border-slate-300 min-[1500px]:border-0  w-full flex justify-between items-center ${myABTs.length > 0 ? 'pb-4' : 'pb-8'} min-[1500px]:pb-2 sm:hidden`}>
              <div className="flex justify-start items-center gap-2">
                <p className="text-xl lg:text-2xl">Active Listing&apos;s</p>
                <div className='text-xs lg:text-sm min-[1500px]:hidden'>
                    <MdOutlineKeyboardArrowDown />
                </div>
              </div>
              <DropDownMenu Icon={MdFilterList} flexDirection={'flex-row-reverse'} title={'Filter'} options={['Yearly', 'Monthly', 'Weekly', 'Daily']} setOptionState={setAbtFilter} />
            </div>   
          ) : (
            <div className="flex justify-center items-center gap-6 flex-col border-[1px] rounded-sm border-slate-300 p-3 sm:p-12 md:p-18">
              <div className="w-full sm:w-80 md:w-96 flex justify-center items-center h-44 sm:h-52 md:h-64 bg-slate-100 border-slate-400 border-[1px]">
                image placeholder
              </div>
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-lg font-medium pb-[1px]">Get started with ABTs</h1>
                <p className="text-center text-base">Create a dynamic token in NIOVLABS</p>
                <p className="text-center text-base leading-5">Create a new ABT with multiple interchangeable layers</p>
              </div>
              <button onClick={() => setOpenMint(true)} className="w-full sm:w-max sm:px-5 py-2 gap-3 rounded-sm flex justify-center items-center bg-primary1 text-white">
                <div className='text-md lg:text-sm'>
                    <FaPen />
                </div>
                Create ABT
              </button>
            </div>
          )

        }
      </div>
    </>
  )
}

export default ABTsProject
