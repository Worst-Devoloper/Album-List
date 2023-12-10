import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router';
import {albumSelector, updateUser } from '../../Redux/ContextReducer';

const EditAlbum = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title,setTitle] = useState("");
  const [id,setId] = useState("");
  const [newId,setNewId] = useState("");

  const {albumId} = useParams();
  const userId = parseInt(albumId);
//   console.log(userId);
  const {albums} = useSelector(albumSelector);
  const edit = albums.find(user => user.id === userId);

  useEffect(()=>{
      setTitle(edit.title);
      setId(edit.id);
      setNewId(edit.newId);
  },[edit])

  if(!userId){
     return  navigate('/Albums/List');
  }

  const editAlbum = (e)=>{
     e.preventDefault();
     if(title === ""){
         setTitle(title);
     }
     if(id === ""){
         setId(id);
     }
     if(newId === ""){
         setNewId(id);
     }
     const user = {
         title : title,
         id : id,
         newId : newId
     }
     dispatch(updateUser({data:user}));
     navigate('/Albums/List');
  }
  return (
    <div>
        <form onSubmit={editAlbum}>
            <div>
            <h3>Update Album</h3>
            </div>
                <div className="input-group mb-3 mt-5">
                <h6>Enter New Title: </h6>
                <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div className="input-group mb-3">
                <h6>Enter UserId: </h6>
                <input type="text" value={userId} onChange={(e)=>setId(e.target.value)} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div className="input-group mb-3">
                <h6>Enter New UserId: </h6>
                <input type="text" value={newId} onChange={(e)=>setNewId(e.target.value)} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
        <button type="submit" className="btn btn-primary">Update album</button>
    </form>
    </div>
  )
}

export default EditAlbum
