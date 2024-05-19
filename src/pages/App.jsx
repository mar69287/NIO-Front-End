import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ethers } from "ethers"
import Dashboard from './Dashboard'
import Home from './Home';
import UserNavBar from '../components/UserNavBar';
import ABTsProject from './ABTsProject';
import Marketplace from './Marketplace';
import MyWallet from './MyWallet';
import Settings from './Settings';
import Developer from './Developer';
import Support from './Support';
import ABTDetails from './ABTDetails';
import chainConfig from '../../utils/ChainConfig.json'

function App() {
  const [client, setClient] = useState({
      account: null,
      signer: null,
      chainId: null,
      provider: null
  });
  const [hasWeb3, setHasWeb3] = useState(false);

  const web3Handler = async () => {
      var account; var chainId;

      await window.ethereum.request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        account = accounts[0] });

      await window.ethereum.request({ method: 'eth_chainId' })
      .then((res) => {
        chainId = res });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(account);
      let balanceInEther = ethers.utils.formatEther(balance);
      balanceInEther = Math.floor(balanceInEther)
      
      const signer = await provider.getSigner();
      const nativeCurrency = getNativeCurrency(parseInt(chainId, 16));

      setClient({
        account: account,
        signer: signer,
        chainId: parseInt(chainId, 16),
        provider: provider,
        balanceInEther,
        nativeCurrency
      })
      
  };

  const getNativeCurrency = (chainId) => {
    for (const key in chainConfig) {
      if (chainConfig[key].id === chainId) {
        return chainConfig[key].nativeCurrency;
      }
    }
    return null; 
  };
  

  if (window.ethereum) {
    window.ethereum.on('chainChanged', () => {window.location.reload()});
    window.ethereum.on('accountsChanged', () => {window.location.reload()});
    if(!hasWeb3) { setHasWeb3(true); }
  }


  return (
    <BrowserRouter>
      {/* <div className='flex flex-column justify-center items-start min-h-[100vh] min-w-screen mt-[4.5rem] lg:mt-[6rem] lg:ml-60 xl:ml-72 2xl:ml-96 relative'> */}
      <div className='flex flex-column justify-center items-start min-h-[100vh] min-w-screen relative w-full'>
        {
          client.account ? 
          <>
            <UserNavBar client={client} />
            <main className='mt-[4.5rem] lg:mt-[5rem] xl:ml-72 2xl:ml-80 relative w-full'>
              <Routes>
                <Route path="/dashboard"  element={<Dashboard client={client}/>}/>
                <Route path="/abts"  element={<ABTsProject client={client}/>}/>
                <Route path="/marketplace"  element={<Marketplace client={client}/>}/>
                <Route path="/myWallet"  element={<MyWallet client={client}/>}/>
                <Route path="/settings"  element={<Settings client={client}/>}/>
                <Route path="/developer"  element={<Developer client={client}/>}/>
                <Route path="/support"  element={<Support client={client}/>}/>
                <Route path="/abt/:id"  element={<ABTDetails client={client}/>}/>
                <Route path="*" element={<Navigate replace to="/dashboard" />} />
              </Routes>
            </main>
          </>
          :
          <>
           <Routes>
              <Route path="/" element={<Home client={client} hasWeb3={hasWeb3} web3Handler={web3Handler}/>} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          </>
        }
      </div>
    </BrowserRouter>
  )
}

export default App
