'use client'
import DisplayPost from "@/components/DisplayPost";
import Search from "@/components/Search";
import { useState } from "react";
import SearchPosts from "./SearchPosts";
const AllPosts = () => {
    const [searchData,setSearchData] = useState();
    const [loading,setLoading] = useState(false)
    
   
  return (
    <>
    <Search  setSearchData={setSearchData} setLoading={setLoading}/>
     {searchData ? <SearchPosts loading={loading}   searchData={searchData}/> : <DisplayPost/> }
    
    </>
  )
}

export default AllPosts;
