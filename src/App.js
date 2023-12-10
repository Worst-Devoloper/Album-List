import AddAlbum from "./Components/Add Album/AddAlbum";
import AlbumList from "./Components/Albumcard/AlbumList";
import EditAlbum from "./Components/EditAlbum/EditAlbum";
import Navbar from "./Components/Navbar/Navbar";
import "./index.css"
import { Route,Routes, Navigate } from "react-router";

function App() {
  return (
   <div className="body">
    <Navbar />
    <div className="album_list">
        <Routes>
            <Route path={'/'} element={<Navigate to={'Albums/List'}/>}/>
            <Route path={'/Albums/List'} element={<AlbumList/>}/>
            <Route path={'/Albums/add'} element={<AddAlbum/>}/>
            <Route path={'/Albums/edit/:albumId'} element={<EditAlbum/>}/>
        </Routes>
   
   
   
    </div>
   </div>
  );
}

export default App;
