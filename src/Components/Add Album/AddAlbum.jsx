import React from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { albumSelector, newAlbum } from '../../Redux/ContextReducer'
import { useNavigate } from 'react-router';

function AddAlbum() {
  const {albums} = useSelector(albumSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addAlbum = (e)=>{
        e.preventDefault();
        const userId =  e.target[0].value;
        const albumTitle = e.target[1].value;
        const id = albums.length + 1;

        const data = {
            userId : userId,
            title : albumTitle,
            id : id
        }
        // console.log(data);
        dispatch(newAlbum({data:data}));
        navigate('/Albums/List');
  }
  return (
    <>
      <form onSubmit={addAlbum}>
        <div>
          <h3>Add Album</h3>
        </div>
        <div className="input-group mb-3 mt-5">
          <h6>Enter Your UserId: </h6>
          <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
        </div>
        <div className="input-group mb-3">
          <h6>Enter Your Album: </h6>
          <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
        </div>
      <button type="submit" className="btn btn-primary">Add album</button>
    </form>
    </>
  )
}

export default AddAlbum