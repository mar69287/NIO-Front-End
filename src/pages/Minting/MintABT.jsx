import { useState } from "react";
import PageHeader from "../../components/PageHeader"
import PdfUpload from "../Uploads/PdfUpload"
import { MdOutlineRemoveRedEye, MdArrowBackIos } from "react-icons/md";
import { createABT } from "../../utilities/Contract";
import { useNavigate } from "react-router-dom";
import PdfContainer from "../../components/PdfContainer";
import ImageUpload from "../Uploads/ImageUpload";

const dataURL = 'http://localhost:3000'

const MintABT = ({ client, setOpenMint }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
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

    const navigate = useNavigate();

    const handleMinting = async (e) => {
        e.preventDefault();

        if (!name  || !document1Uploaded) return;
        const formData = new FormData(event.target);
        const abtName = formData.get("name");
        const description = formData.get("description");
        const document1 = `${dataURL}${document1FilePath}`
        const document2 = `${dataURL}${document2FilePath}`
        let prefixedImageViewPaths =[]
        if (imageViewPaths) {
           prefixedImageViewPaths = imageViewPaths.map(path => `${dataURL}${path}`)
        }
        
    
        const data = {
            "user_address": client.account,
            // "network": client.chainId,
            "network": 31337,
            "metadata": {
                "name": abtName,
                "description": description, 
                "externalURL": "http://localhost:5173/", 
                "images": prefixedImageViewPaths, 
                document1,
                document2,
            }
        }  
        // console.log(data)
        try {
            const response = await createABT(data);
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
      </div>

      {
        document1FilePath && document1Uploaded ? (
          <PdfContainer imageSrc={`${dataURL}${document1ImagePath}`} imageLink={`${dataURL}${document1FilePath}`} />
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
        <PdfUpload label={'Title/Deed'} pdfFile={document1FilePath} setPdfFile={setDocument1FilePath} setUploaded={setDocument1Uploaded} uploaded={document1Uploaded} name={name} setPdfFilePath={setDocument1FilePath} setPdfImagePath={setDocument1ImagePath} />
        <PdfUpload label={'NIOV Legal Agreement'} pdfFile={document2FilePath} setPdfFile={setDocument2FilePath} setUploaded={setDocument2Uploaded} uploaded={document2Uploaded} name={name} setPdfFilePath={setDocument2FilePath} setPdfImagePath={setDocument2ImagePath} />
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