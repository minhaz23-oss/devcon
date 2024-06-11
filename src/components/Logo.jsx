import { FaCode } from "react-icons/fa";
const Logo = () => {
  return (
    <div className=" flex items-center gap-1">
          <h1 className=" hidden sm:block text-[25px] font-bold text-primary">DevCon</h1>
          <FaCode className=" bg-primary p-1 text-white  text-[25px] rounded-sm" />
        </div>
  )
}

export default Logo
