import { MdOutlineRemoveRedEye } from 'react-icons/md';

const EmptyContainer = () => {
  return (
    <div className="bg-slate-100 container relative w-80 md:w-[30rem] h-full border-slate-400 border-[1px] flex flex-col justify-center items-center gap-0 overflow-hidden">
        <div className='text-2xl lg:text-3xl'>
            <MdOutlineRemoveRedEye />
        </div>
        <p className="">Live preview</p>
    </div>
  )
}

export default EmptyContainer