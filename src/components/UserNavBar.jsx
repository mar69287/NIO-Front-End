import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/Logo.png'
import { IoMdMenu, IoMdSettings } from "react-icons/io";
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import WalletDiagnosticModal from './WalletDiagnosticModal';
import { FaRegUser, FaFile, FaStore, FaWallet, FaUserCircle, FaCode } from "react-icons/fa";
import { FiLogOut, FiChevronDown } from "react-icons/fi";
import { MdDashboard, MdLiveHelp, MdCircleNotifications } from "react-icons/md";



const UserNavBar = ({client}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerPosition, setHeaderPosition] = useState(0)
  const pageInfo = [
    {
      'name': 'Dashboard',
      'icon': MdDashboard,
      'path': 'dashboard'
    },
    {
      'name': 'ABTs Projects',
      'icon': FaFile,
      'path': 'abts'
    },
    {
      'name': 'Marketplace',
      'icon': FaStore,
      'path': 'marketplace'
    },
    {
      'name': 'My Wallet',
      'icon': FaWallet,
      'path': 'myWallet'
    },
    {
      'name': 'Settings',
      'icon': IoMdSettings,
      'path': 'settings'
    },
    {
      'name': 'Developer',
      'icon': FaCode,
      'path': 'developer'
    },
    {
      'name': 'Support',
      'icon': MdLiveHelp,
      'path': 'support'
    },
  ]

  return (
    <>
      <MobileNavBar client={client} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isOpen={isOpen} setIsOpen={setIsOpen} pageInfo={pageInfo} setHeaderPosition={setHeaderPosition} />
      <DesktopNavBar client={client} isOpen={isOpen} setIsOpen={setIsOpen} headerPosition={headerPosition} setHeaderPosition={setHeaderPosition} pageInfo={pageInfo} />
      <WalletDiagnosticModal client={client} isOpen={isOpen} setIsOpen={setIsOpen}/>
    </>

  )
}

export default UserNavBar

const MobileNavBar = ({client, isMenuOpen, setIsMenuOpen, setIsOpen, pageInfo, setHeaderPosition}) => {
  return (
    <nav className={`bg-[#F9FAFF] text-black flex flex-col items-center justify-start w-full absolute ${isMenuOpen && 'min-h-screen'} lg:hidden top-0 z-[50] left-0 right-0`}>
      <div className='h-[4.5rem] flex w-full  justify-between items-center px-5 py-6 border-b-2 border-slate-300'>
          <div className='flex items-center justify-center'>
            <Link to="/dashboard">
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
              <div className='text-2xl text-[#000] cursor-pointer' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <IoMdMenu />
              </div>
          </div>
      </div>
      { isMenuOpen && <DropdownMenu client={client} setIsMenuOpen={setIsMenuOpen} pageInfo={pageInfo} setHeaderPosition={setHeaderPosition}  />}
    </nav>
  )
}

const DropdownMenu  = ({ client, setIsMenuOpen, pageInfo, setHeaderPosition }) => {
  return (
    <AnimatePresence>
        <motion.div initial={{ y: -100 }} animate={{ y: 0 }} exit={{ opacity: 0 }} className='flex-1 w-full flex flex-col justify-between lg:hidden'>
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
                    <div className='flex flex-col gap-3 text-black items-start px-5 py-3 border-t-2 border-b-2 border-slate-300 w-full'>
                      {pageInfo.slice(0, 5).map((page, index) =>{
                        return (
                          <MenuLinks key={index} name={page.name} path={page.path} Icon={page.icon} setIsMenuOpen={setIsMenuOpen} setHeaderPosition={setHeaderPosition} idx={index} />
                        )
                      })}
                    </div>
                </div>
                <div className='flex flex-col w-full'>
                  <div className='flex flex-col gap-3 text-black items-start px-5 py-3 w-full'>
                      {pageInfo.slice(-2).map((page, index) =>{
                        return (
                          <MenuLinks key={index} name={page.name} path={page.path} Icon={page.icon} setIsMenuOpen={setIsMenuOpen} setHeaderPosition={setHeaderPosition} idx={index} />
                        )
                      })}
                    </div>
                  <div className='w-full border-t-2 text-red-600 border-slate-300 px-5 py-3 flex justify-start items-center gap-2'>
                      <div className='text-lg  cursor-pointer'>
                          <FiLogOut />
                      </div>
                      <p className='text-base sm:text-lg'>Sign Out</p>
                  </div>
                </div>
            </div>
        </motion.div>
  </AnimatePresence>
  )
}

const DesktopNavBar = ({client, setIsOpen, headerPosition, setHeaderPosition, pageInfo}) => {
  return (
    <>
      <nav className={`bg-[#F9FAFF] text-black hidden lg:flex flex-col items-center justify-start w-screen fixed top-0 z-[50] left-0 right-0`}>
        <div className='h-[6rem] flex w-full  justify-between items-center border-b-2 border-slate-300'>
          <div className='flex items-center justify-start h-full'>
            <div className='flex items-center justify-start border-r-2 border-slate-300 h-full pl-10 py-6 w-60 xl:w-72 2xl:w-96'>
              <Link to="/dashboard">
                <img src={logo} alt="Logo" className="w-[7rem] lg:w-36 2xl:w-40" />
              </Link>
            </div>
            <div className='pl-10'>
              <p className='text-2xl font-medium 2xl:text-3xl'>{pageInfo[headerPosition].name}</p>
            </div>
          </div>
          <div className='flex items-center justify-end gap-7 px-10 py-6'>
              <div className='bg-white border-[1px] border-slate-400 rounded-sm flex justify-center items-center gap-2 px-3 py-1'>
                  <p className='text-sm sm:text-lg'>Matic</p>
                  <div className='text-lg cursor-pointer'>
                      <FiChevronDown />
                  </div>
              </div>
              <div className='text-black text-3xl 2xl:text-4xl'>
                <MdCircleNotifications />
              </div>
              <div className='flex justify-start items-center gap-3 cursor-pointer ' onClick={() => setIsOpen(true)}>
                  <div className='text-[1.6rem] 2xl:text-[2rem] text-[#000]'>
                      <FaUserCircle />
                  </div>
                  <p className='text-md 2xl:text-lg'>{client.account.slice(0, 5) + '...' + client.account.slice(38, 42)}</p>
                  <div className='text-md'>
                    <FiChevronDown />
                  </div>
              </div>
          </div>
        </div>
      </nav>
    <SideMenu pageInfo={pageInfo} setHeaderPosition={setHeaderPosition} />
    </>
  )
}

const SideMenu = ({ pageInfo, setHeaderPosition}) => {
  return (
    <div style={{minHeight: 'calc(100% - 6rem)'}} className='absolute left-0 top-[6rem] w-60 xl:w-72 2xl:w-96 bg-[#F9FAFF] border-r-2 border-slate-300 hidden lg:flex flex-col justify-between items-start'>
      <div className='flex flex-col gap-3 text-black items-start pl-10 py-7 w-full border-b-2 border-slate-300'>
          {pageInfo.slice(0, 5).map((page, index) =>{
            return (
              <SideMenuLinks key={index} name={page.name} path={page.path} Icon={page.icon} setHeaderPosition={setHeaderPosition} idx={index} />
            )
          })}
      </div>
      <div className='flex flex-col w-full'>
        <div className='flex flex-col gap-3 text-black items-start pl-10 py-7 w-full border-b-2 border-slate-300 '>
            {pageInfo.slice(-2).map((page, index) =>{
              return (
                <SideMenuLinks key={index} name={page.name} path={page.path} Icon={page.icon} setHeaderPosition={setHeaderPosition} idx={index + 5} />
              )
            })}
        </div>
        <div className='w-full text-red-600  pl-10 py-7 flex justify-start items-center gap-2 cursor-pointer'>
            <div className='text-lg  cursor-pointer'>
                <FiLogOut />
            </div>
            <p className='text-md xl:text-lg 2xl:text-xl'>Sign Out</p>
        </div>
      </div>
    </div>
  )
}

const SideMenuLinks = ({ name, path, Icon, setHeaderPosition, idx}) => {
  return (
    <NavLink to={`/${path}`} onClick={() => setHeaderPosition(idx)} className={`text-zinc-400 flex justify-start items-center gap-2 w-full`}>
        <div className='text-lg'>
            <Icon />
        </div>
        <p className='text-md xl:text-lg 2xl:text-xl'>{name}</p>
    </NavLink>
  )
}

const MenuLinks = ({name, path, Icon, setIsMenuOpen, idx, setHeaderPosition}) => {
  const handleClick = (index) => {
    setIsMenuOpen(false);
    setHeaderPosition(index)
  };
    return (
        <NavLink to={`/${path}`} onClick={() => handleClick(idx)} className={`text-zinc-400 flex justify-start items-center gap-2 w-full`}>
            <div className='text-lg cursor-pointer'>
                <Icon />
            </div>
            <p className='text-base sm:text-lg'>{name}</p>
        </NavLink>
    )
}