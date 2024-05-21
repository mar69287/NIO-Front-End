import Hero from '../components/Hero'
import HomeNavBar from '../components/HomeNavBar'

const Home = ({client, web3Handler, hasWeb3}) => {
  return (
    <>
      <HomeNavBar client={client} hasWeb3={hasWeb3} web3Handler={web3Handler}/>
      {/* <div className='mt-[4.5rem] xl:mt-[5rem] w-full px-5 py-6'> */}
      <div className='mt-[4.5rem] xl:mt-[5rem] w-full'>
        <Hero />
      </div>
    </>
  )
}

export default Home