 import { configureStore } from "@reduxjs/toolkit";
 import { AlbumReducer } from "./ContextReducer";

 export const store = configureStore({
    reducer:{
        AlbumReducer
    }
 })