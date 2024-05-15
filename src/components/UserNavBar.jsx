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
    <nav className={`bg-[#F9FAFF] text-black flex flex-col items-center justify-start w-screen absolute ${isMenuOpen && 'min-h-[100vh]'} top-0 z-[100]`}>
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
              <div className='text-2xl text-[#000] sm:hidden cursor-pointer' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <IoMdMenu />
              </div>
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

const SideBarMenu = ({ client }) => {
  return (
      <motion.div initial={{ y: -100 }} animate={{ y: 0 }} exit={{ opacity: 0 }} className='bg-[#F9FAFF] flex flex-1 justify-center overflow-y-scroll cursor-pointer'>
          <div onClick={(e) => e.stopPropagation()} className="min-h-full w-[100vw] relative z-10 cursor-default flex flex-col justify-between">
                  <div className='flex flex-1 flex-col'>
                      <div className='px-5 py-4 flex justify-between items-center'>
                        <div className='flex justify-start items-center gap-2'>
                            <div className='text-lg text-[#000] sm:hidden cursor-pointer'>
                                <FaUserCircle />
                            </div>
                            <p className='text-sm'>{client.account.slice(0, 5) + '...' + client.account.slice(38, 42)}</p>
                        </div>
                        <div className='bg-white border-[1px] border-slate-400 rounded-sm flex justify-center items-center gap-2 px-3 py-1'>
                            <p>Matic</p>
                            <div className='text-lg sm:hidden cursor-pointer'>
                                <FiChevronDown />
                            </div>
                        </div>
                      </div>
                      <div className='flex flex-col gap-3 text-black items-start px-5 py-3 border-t-2 border-slate-300'>
                          <MenuLinks name={'Dashboard'} location={'dashboard'} Icon={MdDashboard} />
                          <MenuLinks name={'ABTs Projects'} location={'abts'} Icon={FaFile} />
                          <MenuLinks name={'Marketplace'} location={'marketplace'} Icon={FaStore} />
                          <MenuLinks name={'My Wallet'} location={'marketplace'} Icon={FaWallet} />
                          <MenuLinks name={'Settings'} location={'settings'} Icon={IoMdSettings} />
                      </div>
                      <div className='flex flex-col gap-3 text-black items-start px-5 py-3 border-t-2 border-slate-300'>
                          <MenuLinks name={'Developer'} location={'developer'} Icon={FaCode} />
                          <MenuLinks name={'Support'} location={'support'} Icon={MdLiveHelp} />
                      </div>
                  </div>
                  <div className='w-full border-t-2 text-red-600 border-slate-300 px-5 py-3 flex justify-start items-center gap-2'>
                    <div className='text-lg sm:hidden cursor-pointer'>
                        <FiLogOut />
                    </div>
                    Sign Out
                  </div>
          </div>
      </motion.div>
  )
}

const MenuLinks = ({ name, Icon, location, setOpen}) => {
    return (
        <Link to={`/${location}`} onClick={() => setOpen(false)} className='flex justify-start items-center gap-2 w-full'>
            <div className='text-lg text-[#000] sm:hidden cursor-pointer'>
                <Icon />
            </div>
            {name}
        </Link>
    )
}