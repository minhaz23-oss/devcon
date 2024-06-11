import Loader from "@/components/Loader"

const loading = () => {
  return (
    <div className=" w-full h-screen flex justify-center items-center">
       <Loader color={'primary'}/>
    </div>
  )
}

export default loading;
