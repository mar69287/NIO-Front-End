import { useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useEffect, useState } from 'react';
import Accordian from '../components/Accordian';
import { fetchABT } from '../utilities/Contract';
import Loader from '../components/Loader';
import ImageCarousel from '../components/ImageCarousel';

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
        const document1Link = `${dataURL}${response.document1}`
        const images = response.images.map((image) => `${dataURL}${image}`);

        const data = {
            name: response.name,
            document1: response.document1,
            document1image,
            document1Link,
            document2: response.document2,
            externalURL: response.externalURL,
            images: images,
            description: response.description, 
        }
        console.log(data)
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
        <div className='w-full p-5 lg:p-10 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 2xl:gap-x-16 justify-items-stretch'>
            <div className="w-full pb-2 lg:col-span-2">
                <h1 className="text-2xl xl:text-3xl font-semibold">{abtInfo.name}</h1>
                {/* <p className="text-base ">Created by: {abtInfo.creator}</p> */}
                {/* <img src={abtInfo.document1image} className='w-full h-full' /> */}
            </div>
            <ImageCarousel imgs={abtInfo.images} />
            <div>
                <Accordian owner={abtInfo.owner} description={abtInfo.description} details={abtInfo.details} link={abtInfo.document1Link} />
                {
                    isMyAbt ? (
                        <div className='w-full bg-primary1 text-white font-semibold  border-slate-400 border-[1px] p-3 lg:p-4 rounded grid place-content-center'>
                            {/* <div className='w-full grid place-content-center p-3 lg:p-4 bg-white rounded border-slate-400 border-[1px]'> */}
                                Put ABT for sale
                            {/* </div> */}
                        </div>
                    ) : (
                        <div className='w-full text-white font-semibold bg-accent1 border-slate-400 border-[1px] p-3 lg:p-4 rounded grid place-content-center'>
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
