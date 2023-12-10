import React, { useEffect } from "react";
import "./Albumcard.css";
import Image from "../Image/Albumphoto.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  albumSelector,
  deleteAlbum,
  fetchStart,
  getAlbum,
} from "../../Redux/ContextReducer";

const AlbumList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStart());
    dispatch(getAlbum());
  }, [dispatch]);

  const { albums } = useSelector(albumSelector);

  return (
    <div className="d-flex p-4" style={{flexWrap:"wrap",gap:"1rem"}}>
      {albums.map((user)=>(
          <div key={user.id} className="card p-3">
          <img src={Image} alt="albumImg" className="card-image" />
          <div className="card-content">
            <h2 className="card-title">ALBUM</h2>
            <p>{user.title}</p> 
          </div>
          <div className="d-flex justify-content-evenly">
            <Link to={`/Albums/edit/${user.id}`} type="button" className="btn btn-info">
              Edit
            </Link>
            <button onClick={()=>dispatch(deleteAlbum({id:user.id}))} type="button" className="btn btn-danger">
              Delete
            </button> 
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlbumList;
