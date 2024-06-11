'use client'
import axios from "axios";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
const Search = ({setSearchData,setLoading}) => {
    const [keyword,setKeyword] = useState('');
    const handleSearch = async () => {
      try{
        setLoading(true);
        const res = await axios.post('/api/search',{keyword: keyword})
        setSearchData(res.data.posts)
      
      }catch(err){
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
  return (
    <div className=" w-full flex justify-center px-[10px] mt-10 ">
          <div className=" w-full sm:w-[500px] py-2 px-5 rounded-[50px] bg-white border border-primary mx-auto flex justify-between items-center">
            <div className=" flex gap-3 items-center">

          <FaSearch className="hidden sm:block text-[25px] text-primary "/>
            <input
              type="text"
              className="border-none outline-none p-3 font-semibold w-[180px]"
              placeholder="Search"
              onChange={(e) => setKeyword(e.target.value)}
            />
            </div>
            <button onClick={handleSearch} className="btn-primary px-[20px] ">Search</button>
          </div>
        </div>
  )
}

export default Search;
