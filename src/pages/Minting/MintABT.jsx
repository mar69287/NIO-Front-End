import { useState } from "react";
import PageHeader from "../../components/PageHeader"
import PdfUpload from "../Uploads/PdfUpload"
import { MdOutlineRemoveRedEye, MdArrowBackIos } from "react-icons/md";
import { createABT } from "../../utilities/Contract";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../Uploads/ImageUpload";
import Loader from "../../components/Loader";
import ActiveSection from "../../components/ActiveSection";
import PdfCarousel from "../../components/PdfCarousel";

const MintABT = ({ client, setOpenMint }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    //this state will hold all the document info for carousel
    const [documents, setDocuments] = useState([]);
    //these states are for ....
    const [document1Uploaded, setDocument1Uploaded] = useState(null);
    const [document1FilePath, setDocument1FilePath] = useState('');
    const [document1ImagePath, setDocument1ImagePath] = useState('');
    //these states are for .... other document
    const [document2Uploaded, setDocument2Uploaded] = useState(null);
    const [document2FilePath, setDocument2FilePath] = useState('');
    const [document2ImagePath, setDocument2ImagePath] = useState('');
    //these states are for the images 
    const [imageViewPaths, setImageViewPaths] = useState([]);
    const [isMintingLoading, setIsMintingLoading] = useState(false)
    //this state is to show either documents or images
    const [activeSection, setActiveSection] = useState(0)

    const navigate = useNavigate();

    const handleMinting = async (e) => {
        e.preventDefault();

        if (!name  || !document1Uploaded || !document2Uploaded) return;
        setIsMintingLoading(true)
        const formData = new FormData(event.target);
        const abtName = formData.get("name");
        const description = formData.get("description");
        
        const data = {
            "user_address": client.account,
            "network": 31337,
            "metadata": {
                "name": abtName,
                "description": description, 
                "externalURL": "http://localhost:5173/", 
                "images": imageViewPaths,
                'document1': document1FilePath,
                'document2': document2FilePath,
            }
        }  
        try {
            const response = await createABT(data);
            console.log(response)
            const tokenId = response.tokenId
            navigate(`/abt/${tokenId}`);
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
        <ActiveSection headers={['Documents', 'Images']} active={activeSection} setActive={setActiveSection} />
      </div>

      {
        document1Uploaded || document2Uploaded ? (
          // <PdfContainer imageSrc={document1ImagePath} imageLink={`${dataURL}${document1FilePath}`} />
          <PdfCarousel documents={documents} />
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
        <PdfUpload label={'Title/Deed'} pdfFile={document1FilePath} setPdfFile={setDocument1FilePath} setUploaded={setDocument1Uploaded} uploaded={document1Uploaded} name={name} setPdfFilePath={setDocument1FilePath} setPdfImagePath={setDocument1ImagePath} documents={documents} setDocuments={setDocuments} />
        <PdfUpload label={'NIOV Legal Agreement'} pdfFile={document2FilePath} setPdfFile={setDocument2FilePath} setUploaded={setDocument2Uploaded} uploaded={document2Uploaded} name={name} setPdfFilePath={setDocument2FilePath} setPdfImagePath={setDocument2ImagePath} documents={documents} setDocuments={setDocuments} />
        <ImageUpload label={'Images'} setImageViewPaths={setImageViewPaths} imageViewPaths={imageViewPaths} name={name} />
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
          className={`mt-4 w-full bg-primary1 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isMintingLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isMintingLoading}
        >
          {isMintingLoading ? <Loader /> : 'Mint Asset'}
        </button>
      </form>
    </div>
  </>
  )
}

export default MintABT
