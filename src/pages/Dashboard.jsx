import { useState } from "react";
import DropDownMenu from "../components/DropDownMenu"
import PageHeader from "../components/PageHeader"
import { FiChevronDown } from "react-icons/fi"
import { MdArrowForwardIos, MdFilterList } from "react-icons/md"
import { HiAdjustmentsHorizontal } from "react-icons/hi2"


const Dashboard = () => {
  const [revenueTime, setRevenueTime] = useState('Yearly')
  const revenueTimeFrames = ['Yearly', 'Monthly', 'Weekly', 'Daily']

  return (
    <>
      <PageHeader title={'Dashboard'} />
      <div className="w-full p-5 lg:px-10 lg:py-7 grid grid-cols-1 min-[370px]:grid-cols-2 md:grid-cols-6 min-[1500px]:grid-cols-10 gap-4">
        <ABTContainer title={'Total ABT created'} value={25} badgeValue={125} />
        <ABTContainer title={'Total ABT sold'} value={14} badgeValue={43} />
        <ABTContainer title={'Gross Revenue'} value={'$12,230'} badgeValue={'+45%'} revenueTime={revenueTime} setRevenueTime={setRevenueTime} revenueTimeFrames={revenueTimeFrames} />
        <GraphContainer title={`Active Listing's`}/>
        <GraphContainer title={`Newly Created ABT's`}/>
        <GraphContainer title={`Pending Offers`}/>
        <DesktopGraphContainer />
      </div>
    </>
  )
}

export default Dashboard

const ABTContainer = ({title, value, badgeValue, revenueTime, setRevenueTime, revenueTimeFrames}) => {
  const revenue = title === 'Gross Revenue';
  return (
    <div className={`w-full p-3 bg-[#F9FAFF] border-2 border-slate-300 flex flex-col justify-between items-start md:col-span-2 min-[1500px]:col-span-2 ${revenue ? 'col-span-1 min-[370px]:col-span-2' : 'col-span-1'}`}>
      <div className="flex justify-between items-center relative w-full">
        <p className="text-sm lg:text-base">{title}</p>
        {revenue && <DropDownMenu Icon={FiChevronDown} flexDirection={''} title={revenueTime} options={revenueTimeFrames} setOptionState={setRevenueTime} />}
      </div>
      <h1 className="text-3xl lg:text-4xl my-4 font-semibold">{value}</h1>
      <div className="flex justify-start items-center gap-2">
        <p className="text-sm lg:text-base">{revenue ? '24h Inflow' : 'Layers'}</p>
        <div className={`text-xs lg:text-sm ${revenue ? 'bg-green-400 text-black' : 'bg-slate-800 text-white'} px-2 py-[2px] rounded-full`}>
          {badgeValue}
        </div>
      </div>
    </div>
  )
}

const GraphContainer = ({title}) => {
  const [isOpen, setIsOpen] = useState(false)
  const activeListing = title === `Active Listing's`;
  const pending = title === `Pending Offers`;
  return (
    <div className={`w-full col-span-1 min-[370px]:col-span-2 ${activeListing ? 'md:col-span-6' : 'md:col-span-3 min-[1500px]:col-span-4'} ${!activeListing && 'min-[1500px]:hidden'}`}>
      <div className={`${isOpen ? '' : 'border-b-2 border-slate-300'} min-[1500px]:border-0  w-full flex justify-between items-center pb-4 min-[1500px]:pb-2`}>
        <div onClick={() =>setIsOpen(!isOpen)} className="flex justify-start items-center gap-2">
          <p className="text-xl lg:text-2xl">{title}</p>
          <div className='text-xs lg:text-sm min-[1500px]:hidden'>
              <MdArrowForwardIos />
          </div>
        </div>
          {
            activeListing && 
              <div className="flex gap-2 md:gap-6 justify-end items-center">
                <DropDownMenu Icon={MdFilterList} flexDirection={'flex-row-reverse'} title={'Filter'} options={['Yearly', 'Monthly', 'Weekly', 'Daily']} />
                <DropDownMenu Icon={HiAdjustmentsHorizontal} flexDirection={'flex-row-reverse'} title={'Sort'} options={['Yearly', 'Monthly', 'Weekly', 'Daily']} />
              </div>
          }
          {
            pending &&
              <DropDownMenu Icon={MdFilterList} flexDirection={'flex-row-reverse'} title={'Filter'} options={['Yearly', 'Monthly', 'Weekly', 'Daily']} />
          }
      </div>
    </div>
  )
}


const DesktopGraphContainer = () => {
  return (
    <div className="w-full hidden min-[1500px]:flex flex-col col-span-4 row-start-1 row-span-2 col-start-7 justify-between items-start ">
      <div className="w-full flex flex-col jusitfy-start items-start">
        <div  className={`w-full flex justify-between items-center pb-2 border-b-2 border-slate-300 min-[1500px]:border-0`}>
          <p className="text-xl lg:text-2xl">Newly Created ABT&apos;s</p>
        </div>
        {/* Graph content will go here */}
      </div>
      <div className="w-full flex flex-col jusitfy-start items-start">
        <div  className={`w-full flex justify-between items-center pb-2 border-b-2 border-slate-300 min-[1500px]:border-0`}>
          <p className="text-xl lg:text-2xl">Pending Offers</p>
          <div className="flex gap-6 justify-end items-center">
            <DropDownMenu Icon={MdFilterList} flexDirection={'flex-row-reverse'} title={'Filter'} options={['Yearly', 'Monthly', 'Weekly', 'Daily']} />
            <DropDownMenu Icon={HiAdjustmentsHorizontal} flexDirection={'flex-row-reverse'} title={'Sort'} options={['Yearly', 'Monthly', 'Weekly', 'Daily']} />
          </div>
        </div>
        {/* Graph content will go here */}
      </div>
    </div>
  )
}