import { Link } from 'react-router-dom'
import logo from '../assets/Logo.png'
import { Button, Nav } from 'react-bootstrap'

const HomeNavBar = ({client, web3Handler, hasWeb3}) => {

  return (
    <nav className="bg-white text-black flex items-center justify-between w-screen p-4">
      <div className='flex items-center justify-center'>
        <Link to="/">
          <img src={logo} alt="Logo" className="w-24 md:w-32" />
        </Link>
      </div>
      {
        client.account ? (
          <Nav.Link
            href={`https://etherscan.io/address/${client.account}`}
            target="_blank"
            rel="noopener noreferrer"
            className="button nav-button btn-sm mx-4">
            <Button variant="outline-light">
              {client.account.slice(0, 5) + '...' + client.account.slice(38, 42)}
            </Button>

          </Nav.Link>
        ) : !hasWeb3 ? (
          <Button variant="warning" href="https://metamask.io/">Download Metamask</Button>
          ) : (
          <Button onClick={web3Handler} variant="outline-light">Connect Wallet</Button>
          )
      }
    </nav>
  )
}

export default HomeNavBar