import { useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useEffect, useState } from 'react';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import Accordian from '../components/Accordian';
import { fetchABT } from '../utilities/Contract';
import PdfContainer from '../components/PdfContainer';
import Loader from '../components/Loader';
import AbtImageCarousel from '../components/AbtImageCarousel';

const dataURL = 'http://localhost:3000/uploads/'

const ABTDetails = ({ client }) => {
  const { id } = useParams();
  const [abtInfo, setAbtInfo] = useState({});
  const [sale, setSale] = useState(false)
  const [isMyAbt, setIsMyAbt] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const fetchABTDetails = async () => {
    try {
        const response = await fetchABT(id);
        // console.log(response)
        const document1image = `${dataURL}${response.document1.replace('.pdf', '.jpg')}`
        const images = response.images.map((image) => `${dataURL}${image}`);

        const data = {
            name: response.name,
            document1: response.document1,
            // `${dataURL}${abtInfo.document1image}`
            document1image,
            document2: response.document2, //bye bye to this one for now
            externalURL: response.externalURL,
            // images: allImages,
            images: images,
            description: response.description, 
        }
        // console.log(data)
        setAbtInfo(data)
        setIsLoading(false)
    } catch(err) {
        console.error('Error fetching abt details:', err);
    }
  }
  useEffect(() => {
    fetchABTDetails();
  }, [id]);

  if (isLoading) {
    return (
        <>
            <PageHeader title={'ABT Details'} />
            <div className='w-full h-full grid place-content-center p-5'>
                <Loader />
            </div>
        </>
    )
  }

  return (
    <>
        <PageHeader title={'ABT Details'} />
        <div className='w-full p-5 lg:p-10 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 2xl:gap-x-16'>
            <div className="w-full pb-3 lg:col-span-2">
                <h1 className="text-xl font-semibold mb-1">{abtInfo.name}</h1>
                {/* <p className="text-base ">Created by: {abtInfo.creator}</p> */}
                {/* <img src={abtInfo.document1image} className='w-full h-full' /> */}
            </div>
            {/* <div className="bg-slate-100 w-48 h-44 md:w-72 md:h-80 lg:w-full lg:h-80 2xl:h-[45rem] min-[1700px]:h-[55rem] border-slate-400 border-[1px] flex flex-col justify-center items-center gap-0 mb-5">
                <div className='text-2xl lg:text-3xl'>
                    <MdOutlineRemoveRedEye />
                </div>
                <p className="">Live preview</p>
            </div> */}
            {/* <PdfContainer  */}
            <AbtImageCarousel imgs={abtInfo.images} />
            <div>
                <Accordian owner={abtInfo.owner} description={abtInfo.description} details={abtInfo.details} />
                {
                    isMyAbt ? (
                        <div className='w-full bg-neutral-100 font-semibold  border-slate-400 border-[1px] p-3 lg:p-4 rounded grid place-content-center'>
                            {/* <div className='w-full grid place-content-center p-3 lg:p-4 bg-white rounded border-slate-400 border-[1px]'> */}
                                Put ABT for sale
                            {/* </div> */}
                        </div>
                    ) : (
                        <div className='w-full text-white font-semibold bg-green-400 border-slate-400 border-[1px] p-3 lg:p-4 rounded grid place-content-center'>
                            {/* <div className='w-full grid place-content-center p-3 lg:p-4 bg-white rounded border-slate-400 border-[1px]'> */}
                                Make Offer
                            {/* </div> */}
                        </div>
                    )

                }
            </div>
        </div>
        
    </>
  );
};

export default ABTDetails;
