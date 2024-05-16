import { useState } from "react"

const DropDownMenu = ({Icon, flexDirection, title, options, setOptionState}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOption = (option) => {
    setIsOpen(false);
    setOptionState(option)
  };
  return (
    <div className={`relative flex ${flexDirection} justify-center items-center cursor-pointer rounded-sm bg-white px-2 py-1 border-[1px] border-slate-200`}>
        <div className={`flex justify-center items-center gap-2 ${flexDirection}`} onClick={() => setIsOpen(!isOpen)}>
            <p className="text-sm lg:text-base">{title}</p>
            <div className='text-sm'>
                <Icon />
            </div>
        </div>
        {
            isOpen && 
                <div className="absolute top-8 right-0 w-32 shadow-2xl flex flex-col justify-center items-start gap-1 bg-white border-neutral-600 z-20 rounded-sm p-3">
                    {options.map((option, index) => {
                        return (
                            <ul key={index}onClick={() => handleOption(option)} className="w-full cursor-pointer">{option}</ul>
                        )
                    })}
                </div> 
        }
    </div>
  )
}

export default DropDownMenu