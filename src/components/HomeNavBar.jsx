import { Link } from 'react-router-dom'
import logo from '../assets/Logo.png'
import { Button, Nav } from 'react-bootstrap'
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const HomeNavBar = ({client, web3Handler, hasWeb3}) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white text-black flex items-center justify-between w-screen px-5 py-6 fixed top-0 mx-auto max-w-7xl">
      <div className='flex items-center justify-center'>
        <Link to="/">
          <img src={logo} alt="Logo" className="w-24 sm:w-32" />
        </Link>
      </div>
      <div className='flex gap-5 text-[#000] max-sm:hidden'>
          {/* <NavLink to="/contactUs"> Contact Us</NavLink> */}
        {
          client.account ? (
            <Nav.Link
              href={`https://etherscan.io/address/${client.account}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className='border-2 border-black py-1 px-3 rounded-[4px] text-base xl:text-lg'>
                {client.account.slice(0, 5) + '...' + client.account.slice(38, 42)}
              </Button>
            </Nav.Link>
          ) : !hasWeb3 ? (
            <Button href="https://metamask.io/" className='border-2 border-black py-1 px-3 rounded-[4px] text-base xl:text-lg'>Download Metamask</Button>
            ) : (
            <Button onClick={web3Handler} className='border-2 border-black py-1 px-3 rounded-[4px] text-base xl:text-lg'>Connect Wallet</Button>
            )
        }
      </div>
      <div className='text-2xl text-[#000] sm:hidden cursor-pointer' onClick={() => setOpen(true)}>
        <IoMdMenu />
      </div>
      <AnimatePresence>
          {open && <SideBarMenu setOpen={setOpen} client={client} hasWeb3={hasWeb3} web3Handler={web3Handler} />}
      </AnimatePresence>
    </nav>
  )
}

export default HomeNavBar

const SideBarMenu = ({ setOpen, client, hasWeb3, web3Handler }) => {
  return (
      <motion.div initial={{ x: 100 }} animate={{ x: 0 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className='bg-slate-900/20 backdrop-blur fixed inset-0 z-50 flex justify-end overflow-y-scroll cursor-pointer'>
          <div onClick={(e) => e.stopPropagation()} className="bg-[#000] h-full w-[80vw] min-[500px]:w-[60vw] md:w-[60vw] relative z-10 cursor-default px-5 py-2 flex flex-col justify-between">
              <div className='flex flex-col mt-8 relative'>
                  <div className='flex gap-3 justify-center items-center pb-5 mb-5' onClick={() => setOpen(false)}>
                      <div className='text-[#F9F9F9] absolute -top-5 left-0 p-1 flex justify-center items-center gap-2'>
                          <IoMdClose />
                          <p className=''>Close</p>
                      </div>
                  </div>
                  <div className='flex flex-col gap-5 text-[#F9F9F9] font-[Poppins] items-end pr-10'>
                      <Link to="/" className='pb-2' onClick={() => setOpen(false)}>
                          Home
                      </Link>
                      <Link to="/dashboard" className='pb-2' onClick={() => setOpen(false)}>
                          Dashboard
                      </Link>
                      <Link to="/" className='pb-2' onClick={() => setOpen(false)}>
                          Placeholder 1
                      </Link>
                      <Link to="/" className='pb-2' onClick={() => setOpen(false)}>
                          Placeholder 2
                      </Link>
                  </div>
              </div>
              <div className='flex-1 flex justify-center items-end pb-4'>
                {
                  client.account ? (
                    <Nav.Link
                      href={`https://etherscan.io/address/${client.account}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button nav-button btn-sm  min-w-full">
                      <Button variant="outline-light" className='bg-white rounded-sm w-full p-1'>
                        {client.account.slice(0, 5) + '...' + client.account.slice(38, 42)}
                      </Button>

                    </Nav.Link>
                  ) : !hasWeb3 ? (
                    <Button variant="warning" href="https://metamask.io/" className='bg-white w-full'>Download Metamask</Button>
                    ) : (
                    <Button onClick={web3Handler} className='bg-white w-full p-1 rounded-sm'>Connect Wallet</Button>
                    )
                }
              </div>
          </div>
      </motion.div>
  )
}