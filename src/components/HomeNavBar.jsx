import { Link } from 'react-router-dom'
import logo from '../assets/Logo.png'
import { Button } from 'react-bootstrap'
import { useState } from 'react';
import WalletDiagnosticModal from './WalletDiagnosticModal';

const HomeNavBar = ({client, web3Handler, hasWeb3}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='w-full fixed top-0 mx-auto flex justify-center items-center bg-white h-[4.5rem] xl:h-[5rem] border-b-[1px] border-stone-300'>
      <div
        className="flex items-center justify-between w-full px-5 py-6 md:px-10 max-w-7xl"
      >
        <div className='flex items-center justify-center'>
          <Link to="/">
            <img src={logo} alt="Logo" className="w-[7rem] sm:w-32" />
          </Link>
        </div>
        <div className='flex gap-5 text-[#000]'>
          {
           !hasWeb3 ? (
              <Button href="https://metamask.io/" className='bg-primary1 text-white py-1 px-3 rounded-[4px] text-base xl:text-lg font-medium'>Download Metamask</Button>
              ) : (
              <Button onClick={web3Handler} className='bg-primary1 text-white py-1 px-3 rounded-[4px] text-base xl:text-lg font-medium'>Connect Wallet</Button>
              )
          }
        </div>
        <WalletDiagnosticModal client={client} isOpen={isOpen} setIsOpen={setIsOpen}/>
      </div>
    </nav>
  )
}

export default HomeNavBar
