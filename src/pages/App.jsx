import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ethers } from "ethers"
import Dashboard from './Dashboard'
import Home from './Home';
import UserNavBar from '../components/UserNavBar';

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
      
      const signer = await provider.getSigner();
      setClient({
        account: account,
        signer: signer,
        chainId: parseInt(chainId, 16),
        provider: provider
      })
      
  };

  if (window.ethereum) {
    window.ethereum.on('chainChanged', () => {window.location.reload()});
    window.ethereum.on('accountsChanged', () => {window.location.reload()});
    if(!hasWeb3) { setHasWeb3(true); }
  }


  return (
    <BrowserRouter>
      <div className='flex flex-column justify-center items-start min-h-[100vh] min-w-screen pt-24'>
        {
          client.account ? 
          <>
            <UserNavBar client={client} />
            <Routes>
              <Route path="/dashboard"  element={<Dashboard client={client} hasWeb3={hasWeb3} web3Handler={web3Handler}/>}/>
              <Route path="*" element={<Navigate replace to="/dashboard" />} />
            </Routes>
          
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
