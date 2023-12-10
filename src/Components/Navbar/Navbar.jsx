import React, { useState } from 'react'
import "../Navbar/Navbar.css"
import { Link } from 'react-router-dom'
import { SearchAlbums } from '../../Redux/ContextReducer'
import { useDispatch } from 'react-redux'
const Navbar = () => {
  const [name, setName] = useState("")
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setName(searchTerm);
    dispatch(SearchAlbums(searchTerm));
  };
  return (
    <div className='main'>
      <span>Album</span>
      <input type="text" className="ms-auto form-control" placeholder="Enter your album name..." value={name} onChange={handleSearch}></input>
      <div className="container d-flex justify-content-end">
        <Link to={'/'} className='btn btn-info me-3'>Home</Link>
        <Link to={'/Albums/add'} className='btn' style={{ backgroundColor: "#ff00a6" }}>Add Album</Link>
      </div>
    </div>
  )
}

export default Navbar