import { Link } from 'react-router-dom'
import logo from '../assets/Logo.png'
import { IoMdMenu, IoMdSettings } from "react-icons/io";
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import WalletDiagnosticModal from './WalletDiagnosticModal';
import { FaRegUser, FaFile, FaStore, FaWallet, FaUserCircle, FaCode } from "react-icons/fa";
import { FiLogOut, FiChevronDown } from "react-icons/fi";
import { MdDashboard, MdLiveHelp } from "react-icons/md";



const UserNavBar = ({client}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`bg-[#F9FAFF] text-black flex flex-col items-center justify-start w-screen absolute ${isMenuOpen && 'min-h-[100vh]'} top-0 z-[100] left-0 right-0`}>
      <div className='h-[4.5rem] flex w-full  justify-between items-center px-5 py-6 border-b-2 border-slate-400'>
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
              <div className='text-2xl text-[#000] md:hidden cursor-pointer' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <IoMdMenu />
              </div>
          </div>
      </div>
      { isMenuOpen && <SideBarMenu client={client} setIsMenuOpen={setIsMenuOpen}/>}
    
      <WalletDiagnosticModal client={client} isOpen={isOpen} setIsOpen={setIsOpen}/>
    </nav>
  )
}

export default UserNavBar

const SideBarMenu = ({ client, setIsMenuOpen }) => {
  return (
    <AnimatePresence>
        <motion.div initial={{ y: -100 }} animate={{ y: 0 }} exit={{ opacity: 0 }} className='flex-1 w-full flex flex-col justify-between md:hidden'>
            <div onClick={(e) => e.stopPropagation()} className="w-full relative z-10 cursor-default flex flex-col justify-between flex-1">
                <div className='flex flex-1 flex-col'>
                    <div className='px-5 py-4 flex justify-between items-center'>
                        <div className='flex justify-start items-center gap-2'>
                            <div className='text-lg text-[#000] cursor-pointer'>
                                <FaUserCircle />
                            </div>
                            <p className='text-sm sm:text-lg'>{client.account.slice(0, 5) + '...' + client.account.slice(38, 42)}</p>
                        </div>
                        <div className='bg-white border-[1px] border-slate-400 rounded-sm flex justify-center items-center gap-2 px-3 py-1'>
                            <p className='text-sm sm:text-lg'>Matic</p>
                            <div className='text-lg cursor-pointer'>
                                <FiChevronDown />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 text-black items-start px-5 py-3 border-t-2 border-slate-300'>
                        <Link to='/dashboard' onClick={() => setIsMenuOpen(false)} className='flex justify-start items-center gap-2 w-full'>
                            <div className='text-lg text-[#000] cursor-pointer'>
                                <MdDashboard />
                            </div>
                            <p className='text-base sm:text-lg'>Dashboard</p>
                        </Link>
                        <Link to='/abts' onClick={() => setIsMenuOpen(false)} className='flex justify-start items-center gap-2 w-full'>
                            <div className='text-lg text-[#000] cursor-pointer'>
                                <FaFile />
                            </div>
                            <p className='text-base sm:text-lg'>ABTs Projects</p>
                        </Link>
                        <Link to='/marketplace' onClick={() => setIsMenuOpen(false)} className='flex justify-start items-center gap-2 w-full'>
                            <div className='text-lg text-[#000] cursor-pointer'>
                                <FaStore />
                            </div>
                            <p className='text-base sm:text-lg'>Marketplace</p>
                        </Link>
                        <Link to='/myWallet' onClick={() => setIsMenuOpen(false)} className='flex justify-start items-center gap-2 w-full'>
                            <div className='text-lg text-[#000] cursor-pointer'>
                                <FaWallet />
                            </div>
                            <p className='text-base sm:text-lg'>My Wallet</p>
                        </Link>
                        <Link to='/settings' onClick={() => setIsMenuOpen(false)} className='flex justify-start items-center gap-2 w-full'>
                            <div className='text-lg text-[#000] cursor-pointer'>
                                <IoMdSettings />
                            </div>
                            <p className='text-base sm:text-lg'>Settings</p>
                        </Link>
                    </div>
                    <div className='flex flex-col gap-3 text-black items-start px-5 py-3 border-t-2 border-slate-300'>
                        <Link to='/developer' onClick={() => setIsMenuOpen(false)} className='flex justify-start items-center gap-2 w-full'>
                            <div className='text-lg text-[#000] cursor-pointer'>
                                <FaCode />
                            </div>
                            <p className='text-base sm:text-lg'>Developer</p>
                        </Link>
                        <Link to='/support' onClick={() => setIsMenuOpen(false)} className='flex justify-start items-center gap-2 w-full'>
                            <div className='text-lg text-[#000] cursor-pointer'>
                                <MdLiveHelp />
                            </div>
                            <p className='text-base sm:text-lg'>Support</p>
                        </Link>
                    </div>
                </div>
                <div className='w-full border-t-2 text-red-600 border-slate-300 px-5 py-3 flex justify-start items-center gap-2'>
                    <div className='text-lg  cursor-pointer'>
                        <FiLogOut />
                    </div>
                    <p className='text-base sm:text-lg'>Sign Out</p>
                </div>
            </div>
        </motion.div>
  </AnimatePresence>
  )
}