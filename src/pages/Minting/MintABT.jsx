import { useState } from "react";
import PageHeader from "../../components/PageHeader"
import Upload from "../pdfUpload/Upload"
import { MdOutlineRemoveRedEye, MdArrowBackIos } from "react-icons/md";
import { createABT } from "../../utilities/Contract";
import { useNavigate } from "react-router-dom";
import PdfContainer from "../../components/PdfContainer";

const pdfURL = 'http://localhost:3000'

const MintABT = ({ client, setOpenMint, pdfFile, setPdfFile }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [uploadedPDF, setUploadedPDF] = useState(null);
    const [pdfFilePath, setPdfFilePath] = useState('');
    const [pdfImagePath, setPdfImagePath] = useState('');
    const navigate = useNavigate();

    const handleMinting = async (e) => {
        e.preventDefault();

        if (!name  || !uploadedPDF) return;
        const formData = new FormData(event.target);
        const abtName = formData.get("name");
        const description = formData.get("description");
        const document = `${pdfURL}${pdfFilePath}`
    
        const data = {
            "user_address": client.account,
            "network": client.chainId,
            "metadata": {
                "name": abtName,
                "description": description, 
                "external_url": "http://localhost:5173/", 
                "image": "https://cdn.osxdaily.com/wp-content/uploads/2016/09/search-preview-mac-pdf-1.jpg", 
                document
            }
        }  
    
        try {
            const response = await createABT(data);
            console.log(response)
            // const tokenId = response.tokenId
            // console.log(typeof tokenId)
            // console.log(tokenId)
            // navigate(`/abt/${tokenId}`);
          } catch (error) {
            console.error('Error:', error);
        }
    }

  return (
    <>
    <PageHeader title={'Mint Page'} />
    <div className="w-full p-5 lg:py-7 lg:px-10 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 2xl:gap-x-16 justify-items-stretch">
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

      {
        pdfFilePath ? (
          <PdfContainer imageSrc={`${pdfURL}${pdfImagePath}`} imageLink={`${pdfURL}${pdfFilePath}`} />
        ) : (
          <div className="bg-slate-100 container relative w-48 h-44 md:w-72 md:h-80 lg:w-full lg:h-full 2xl:h-[45rem] min-[1700px]:h-[55rem] border-slate-400 border-[1px] flex flex-col justify-center items-center gap-0 overflow-hidden">
            <div className='text-2xl lg:text-3xl'>
              <MdOutlineRemoveRedEye />
            </div>
            <p className="">Live preview</p>
          </div>
        )
      }
      <form className="w-full" onSubmit={handleMinting}>
        <div className="mb-3 flex flex-col justify-start items-start mt-5 xl:mt-0">
          <label className="text-gray-700 text-md mb-2 lg:mb-3 font-medium lg:leading-3" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        {/* <div className="mb-3 flex flex-col justify-start items-start ">
          <label className="text-gray-700 text-md mb-2 font-medium" htmlFor="pdf">
            Contract document
          </label>
          <label className="w-full flex justify-center gap-1 items-center bg-white text-blue rounded shadow tracking-wide border border-blue cursor-pointer py-[7px]">
            <span className="text-base leading-normal">Add document</span>
            <span className="text-base leading-normal text-slate-500">(pdf)</span>
            <input type='file' id="pdf" accept=".pdf" name="pdf" className="hidden" onChange={handlePDF}/>
          </label>
        </div> */}
        <Upload pdfFile={pdfFile} setPdfFile={setPdfFile} setUploaded={setUploadedPDF} uploaded={uploadedPDF} name={name} setPdfFilePath={setPdfFilePath} setPdfImagePath={setPdfImagePath} />
        <div className="mb-3 flex flex-col justify-start items-start ">
          <label className="text-gray-700 text-md mb-2 font-medium" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-primary1 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Mint Asset
        </button>
      </form>
    </div>
  </>
  )
}

export default MintABT