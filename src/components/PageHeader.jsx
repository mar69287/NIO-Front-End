

const PageHeader = ({ title }) => {
  return (
    <div className="w-full bg-[#F9FAFF] flex justify-start items-center px-5 py-4 border-slate-300 border-b-2 lg:hidden">
        <p className="text-xl sm:text-2xl">{title}</p>
    </div>
  )
}

export default PageHeader