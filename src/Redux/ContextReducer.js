import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";


const InitialState = {
    albums : [],
    isLoading:false,
    error:null,

}

const albumSlice = createSlice({
    name : "albums",
    initialState : InitialState,
    reducers : {
         fetchStart: (state,action)=>{
                state.isLoading = true
         },
         fetchSuccess : (state,action)=>{
                state.isLoading = false;
                state.albums = action.payload;
         },
         fetchError : (state,action)=>{
               state.isLoading = false;
               state.error = "failed to fetch contact";
         },
         DeleteAlbums: (state,action)=>{
          const filteredAlbum = state.albums.filter((user)=>user.id!==action.payload && user)
          state.albums = filteredAlbum;
         },
         SearchAlbums: (state, action) => {
            const filteredAlbums = state.albums.filter((user) => user.title && user.title.toLowerCase().includes(action.payload))
            state.albums = filteredAlbums
        },
         NewUser: (state,action)=>{
               state.albums = [action.payload,...state.albums];
         },
         EditUser: (state,action)=>{
            const updateAlbum = state.albums.map((user) =>  
            user.id ===action.payload.id ? action.payload: user 
        ) 
        console.log(updateAlbum);
        state.albums = updateAlbum
         },
    }
})

export const updateUser = createAsyncThunk("user/edit" , async({data}, thunkApi) =>{
    try{
        // console.log(data);
        const response = await fetch(` https://jsonplaceholder.typicode.com/albums/${data.id}`,{
            method:"PUT",
            headers:{
                "content-type" : "application/jSON"
            },
        });
        if(!response.ok){
            const errorData = await response.json();
            throw new Error (errorData.massage);
        }
        thunkApi.dispatch(EditUser(data));

    }
    catch(error){
        thunkApi.dispatch(fetchError());
    }
})

export const deleteAlbum = createAsyncThunk("user/delete" , async({id}, thunkApi) =>{
    try{
        const response = await fetch(` https://jsonplaceholder.typicode.com/albums/${id}`,{
            method:"DELETE",
            headers:{
                "content-type" : "application/jSON"
            },
        });
        if(!response.ok){
            const errorData = await response.json();
            throw new Error (errorData.massage);
        }
        thunkApi.dispatch(DeleteAlbums(id));

    }
    catch(error){
        thunkApi.dispatch(fetchError());
    }
})

export const newAlbum = createAsyncThunk("user/add" , async({data}, thunkApi) =>{
    try{
        const response = await fetch(` https://jsonplaceholder.typicode.com/albums`,{
            method:"POST",
            headers:{
                "content-type" : "application/JSON"
            },
        });
        if(!response.ok){
            const errorData = await response.json();
            throw new Error (errorData.massage);
        }
        thunkApi.dispatch(NewUser(data));

    }
    catch(error){
        thunkApi.dispatch(fetchError());
    }
})

export const getAlbum = createAsyncThunk("user/getAlbum", async(_,thunkAPI)=>{
    try{
        const res = await fetch("https://jsonplaceholder.typicode.com/albums");
        if (!res.ok) {
          throw new Error("Failed to fetch contact");
        }
        const data = await res.json();
        thunkAPI.dispatch(fetchSuccess(data));
    }
    catch(error){
           thunkAPI.dispatch(fetchError());
    }
}); 


export const AlbumReducer = albumSlice.reducer;
export const {fetchStart, fetchError , fetchSuccess, DeleteAlbums ,SearchAlbums, NewUser, EditUser} = albumSlice.actions;
export const albumSelector  = (state) => state.AlbumReducer;