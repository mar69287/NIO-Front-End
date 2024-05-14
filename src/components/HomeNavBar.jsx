import { Link } from 'react-router-dom'
import logo from '../assets/Logo.png'
import { Button } from 'react-bootstrap'
import { useState } from 'react';
import WalletDiagnosticModal from './WalletDiagnosticModal';

const HomeNavBar = ({client, web3Handler, hasWeb3}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white text-black flex items-center justify-between w-screen px-5 py-6 fixed top-0 mx-auto max-w-7xl h-24">
      <div className='flex items-center justify-center'>
        <Link to="/">
          <img src={logo} alt="Logo" className="w-[7rem] sm:w-32" />
        </Link>
      </div>
      <div className='flex gap-5 text-[#000]'>
        {
         !hasWeb3 ? (
            <Button href="https://metamask.io/" className='bg-[#7B61FF] text-white py-1 px-3 rounded-[4px] text-base xl:text-lg'>Download Metamask</Button>
            ) : (
            <Button onClick={web3Handler} className='bg-[#7B61FF] text-white py-1 px-3 rounded-[4px] text-base xl:text-lg'>Connect Wallet</Button>
            )
        }
      </div>
      <WalletDiagnosticModal client={client} isOpen={isOpen} setIsOpen={setIsOpen}/>
    </nav>
  )
}

export default HomeNavBar
