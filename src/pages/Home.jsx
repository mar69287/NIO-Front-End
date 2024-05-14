import HomeNavBar from '../components/HomeNavBar'

const Home = ({client, web3Handler, hasWeb3}) => {
  return (
    <>
      <HomeNavBar client={client} hasWeb3={hasWeb3} web3Handler={web3Handler}/>
    </>
  )
}

export default Home