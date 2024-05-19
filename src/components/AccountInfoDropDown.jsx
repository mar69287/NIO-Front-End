import metamask from '../assets/metamask.svg'

const AccountInfoDropDown = ({ client }) => {
    return (
      <div className="w-72 p-5 absolute top-full right-0 bg-[#2C2B29] text-white mt-7 rounded flex flex-col justify-center items-start gap-2">
        <div className="w-full flex justify-start items-center gap-4 px-3 pb-4 border-b-2 border-zinc-600">
            <img src={metamask} alt="MetaMask logo" className="w-6 h-6" />
            <p className='text-md 2xl:text-lg'>{client.account.slice(0, 5) + '...' + client.account.slice(38, 42)}</p>
        </div>
        <InfoContainter header={'ChainId'} info={client.chainId} />
        <InfoContainter header={'Balance'} info={`${client.balanceInEther}  ${client.nativeCurrency?.symbol}`} />
      </div>
    );
  };
  
  export default AccountInfoDropDown;

  const InfoContainter = ({header, info}) => {
    return (
        <div className='w-full flex flex-col justify-center items-end'>
            <p className='text-zinc-400 text-md font-medium'>{header}</p>
            <h1 className='text-3xl font-semibold'>{info}</h1>
        </div>
    )
  }
  