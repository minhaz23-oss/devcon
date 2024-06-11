'use client'

import axios from "axios"

const Alert = ({setShowAlert,postId,index,fetchData,isCommentApi,setShowComment,commentCount}) => {
  const handleDelete = async () => {
    try {
      const url = isCommentApi ? '/api/deleteComment' : '/api/users/deletePost';
      const data = { data: index };
       if (postId) {
        data.postId = postId;
        console.log(postId)
      }
      const res = await axios.post(url,data);
      if(res.status === 201){
        setShowAlert(false);
        if(setShowComment) {

          setShowComment(false);
        }
        if(commentCount){

          commentCount((prev) => prev - 1)
        }
        if(fetchData){
           console.log('data is fetching ')
          fetchData();
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <section className=" w-full h-screen fixed top-0 left-0 backdrop-blur-sm flex justify-center items-center">
      <div className="relative w-[300px] p-3 min-h-[100px] bg-white border border-primary rounded-md flex flex-col justify-center items-center">
          <h1 className=" text-primary font-semibold text-[20px]">Are you sure to delete?</h1>
          <div className="flex w-full gap-3 mt-2 justify-center items-center">
            <button onClick={() => setShowAlert(false)} className="btn-primary px-8">Back</button>
            <button onClick={handleDelete}  className="btn-secondary px-5">Confirm</button>
          </div>
         
      </div>
    </section>
  )
}

export default Alert;
