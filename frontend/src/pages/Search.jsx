import React,{useEffect} from 'react'
import SearchJob from '../components/searchJob/SearchJob'
import FetchJob from '../components/redux/thunk/fetchJob'
import '../pages/search.css' 
import {useDispatch} from 'react-redux'

function Search() {
  const dispatch=useDispatch();

  useEffect(()=>{
    console.log('hit')
    dispatch(FetchJob());
  },[])
  return (
    <div className='main-search'>
      <SearchJob/>
    </div>
  )
}

export default Search