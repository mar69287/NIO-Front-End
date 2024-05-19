import { useState } from "react";
import DropDownMenu from "../components/DropDownMenu";
import PageHeader from "../components/PageHeader"
import { FaPen, FaEye } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown, MdFilterList, MdKeyboardBackspace, MdOutlineRemoveRedEye, MdArrowBackIos } from "react-icons/md";
import { createABT } from "../utilities/Contract";
import { useNavigate } from "react-router-dom";

const ABTsProject = ({client}) => {
  const [myABTs, setMyABTs] = useState([])
  const [abtFilter, setAbtFilter] = useState('Yearly')
  const [openMint, setOpenMint] = useState(false)
  const navigate = useNavigate;

  const handleMinting = async (e) => {
    e.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const description = formData.get("description");
    const pdf = formData.get("pdf");

    const metadata = {
      "name": "Creative Name",
      "description": "Lorum Ipsum", 
      "external_url": "http://localhost:5173/", 
      "image": "https://cdn.osxdaily.com/wp-content/uploads/2016/09/search-preview-mac-pdf-1.jpg", 
      "document": "https://drive.google.com/file/d/12AOwLvCp_rb5d4dCutzOmMShV3md0xng/view?usp=sharing"
    }

      const data = {
        network: client.chainId,
        metadata,
        user_address: client.address
      };

      // console.log(data)
      try {
        const response = await createABT(data);
        if (response.status === 201) {
          const responseData = await response.json();
          const tokenId = responseData.tokenId;
          navigate(`/abt/${tokenId}`);
        } else {
          console.error('Minting failed:', response.status, response.statusText);
        }

      } catch (error) {
        console.error('Error:', error);
      }
  }

  if (openMint) {
    return (
      <MintPage setOpenMint={setOpenMint} handleMinting={handleMinting} />
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
                <h1 className="text-md font-medium pb-1">Get started with ABTs</h1>
                <p className="text-center text-base">Create a dynamic token in NIOVLABS</p>
                <p className="text-center text-base leading-5">Create a new ABT with multiple interchangeable layers</p>
              </div>
              <button onClick={() => setOpenMint(true)} className="w-full sm:w-max sm:px-5 py-2 gap-3 rounded=sm flex justify-center items-center bg-[#7B61FF] text-white">
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

const MintPage = ({ setOpenMint, handleMinting}) => {
  return (
    <>
      <PageHeader title={'ABTs Projects'} />
      <div className="w-full p-5 lg:py-7 lg:px-10 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 2xl:gap-x-16">
        <button onClick={() => setOpenMint(false)} className={`w-max lg:col-span-2 gap-2 mb-2 rounded flex justify-start items-center  text-black text-base md:text-base`}>
              <div className="text-sm">
                <MdArrowBackIos />
              </div>
              Back to Projects
        </button>
        <div className="w-full pb-3 lg:col-span-2">
          <h1 className="text-xl font-semibold mb-1">Create an ABT</h1>
          <p className="leading-5">Once your item has been minted, you will not be able to change any of its information</p>
        </div>
        <div className="bg-slate-100 w-48 h-44 md:w-72 md:h-80 lg:w-full lg:h-full 2xl:h-[45rem] min-[1700px]:h-[55rem] border-slate-400 border-[1px] flex flex-col justify-center items-center gap-0 mb-5">
          <div className='text-2xl lg:text-3xl'>
            <MdOutlineRemoveRedEye />
          </div>
          <p className="">Live preview</p>
        </div>
        <form className="w-full" onSubmit={handleMinting}>
          <div className="mb-3 flex flex-col justify-start items-start ">
            <label className="text-gray-700 text-md mb-2 lg:mb-3 font-medium lg:leading-3" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Name"
              name="name"
              type="text"
            />
          </div>
          {/* <div className="mb-3 flex flex-col justify-start items-start ">
            <label className="text-gray-700 text-md mb-2 font-medium" htmlFor="symbol">
              Symbol
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Symbol"
              name="symbol"
              type="text"
            />
          </div> */}
          <div className="mb-3 flex flex-col justify-start items-start ">
            <label className="text-gray-700 text-md mb-2 font-medium" htmlFor="pdf">
              Contract document
            </label>
            <label className="w-full flex justify-center gap-1 items-center bg-white text-blue rounded shadow tracking-wide border border-blue cursor-pointer py-[7px]">
              <span className="text-base leading-normal">Add document</span>
              <span className="text-base leading-normal text-slate-500">(pdf)</span>
              <input type='file' id="pdf" accept=".pdf" name="pdf" className="hidden" />
            </label>
          </div>
          <div className="mb-3 flex flex-col justify-start items-start ">
            <label className="text-gray-700 text-md mb-2 font-medium" htmlFor="description">
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-[#7B61FF] text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Mint Asset
          </button>
        </form>
      </div>
    </>
  )
}