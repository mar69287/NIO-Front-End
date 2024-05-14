import { Link } from 'react-router-dom'
import logo from '../assets/Logo.png'
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import WalletDiagnosticModal from './WalletDiagnosticModal';
import { FaRegUser } from "react-icons/fa";

const UserNavBar = ({client}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#F9FAFF] text-black flex items-center justify-between w-screen px-5 py-6 fixed top-0 h-20 md:h-24">
      <div className='flex items-center justify-center'>
        <Link to="/">
          <img src={logo} alt="Logo" className="w-[7rem] sm:w-32" />
        </Link>
      </div>
      <div className='flex items-center justify-end gap-5'>
          <div className='flex text-[#000]'>
            {
              client.account &&
                  <div className='text-black text-xl xl:text-2xl' onClick={() => setIsOpen(true)}>
                    <FaRegUser />
                  </div>
            }
          </div>
          <div className='text-2xl text-[#000] sm:hidden cursor-pointer' onClick={() => setIsMenuOpen(true)}>
            <IoMdMenu />
          </div>
      </div>
      <AnimatePresence>
          {isMenuOpen && <SideBarMenu setOpen={setIsMenuOpen} client={client} />}
      </AnimatePresence>
      <WalletDiagnosticModal client={client} isOpen={isOpen} setIsOpen={setIsOpen}/>
    </nav>
  )
}

export default UserNavBar

const SideBarMenu = ({ setOpen }) => {
  return (
      <motion.div initial={{ x: 100 }} animate={{ x: 0 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className='bg-slate-900/20 backdrop-blur fixed inset-0 z-50 flex justify-end overflow-y-scroll cursor-pointer'>
          <div onClick={(e) => e.stopPropagation()} className="bg-[#F9FAFF] h-full w-[80vw] min-[500px]:w-[60vw] md:w-[60vw] relative z-10 cursor-default px-5 py-2 flex flex-col justify-between">
              <div className='flex flex-col mt-8 relative'>
                  <div className='flex gap-3 justify-center items-center pb-5 mb-5' onClick={() => setOpen(false)}>
                      <div className='text-black absolute -top-5 left-0 p-1 flex justify-center items-center gap-2'>
                          <IoMdClose />
                          <p className=''>Close</p>
                      </div>
                  </div>
                  <div className='flex flex-col gap-2 text-black font-[Poppins] items-start pl-5'>
                      <Link to="/dashboard" className='pb-2' onClick={() => setOpen(false)}>
                          Dashboard
                      </Link>
                      <Link to="/" className='pb-2' onClick={() => setOpen(false)}>
                          ABTs Projects
                      </Link>
                      <Link to="/" className='pb-2' onClick={() => setOpen(false)}>
                          Marketplace
                      </Link>
                      <Link to="/" className='pb-2' onClick={() => setOpen(false)}>
                          My Wallet
                      </Link>
                      <Link to="/" className='pb-2' onClick={() => setOpen(false)}>
                          Settings
                      </Link>
                  </div>
              </div>
          </div>
      </motion.div>
  )
}