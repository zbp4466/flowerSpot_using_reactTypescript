import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../config/http.config";

export interface FavoriteFlowersDetails {
  id: number;
  user_id: number;
  flower: {
    id: number;
    name: string;
    latin_name: string;
    sightings: number;
    profile_picture: string;
    favorite: boolean;
  };
}

export interface RemoveFromFavoriteFlower {
  elemId: number;
  id: number;
}

//action
export const fetchFavoriteFlowers = createAsyncThunk<FavoriteFlowersDetails[]>(
  "fetchFavoriteFlowers",
  async () => {
    const response = await axiosInstance.get(`flowers/favorites`);
    return response.data.fav_flowers;
  }
);

//action 2
export const removeFromFavoriteFlower = createAsyncThunk<
  RemoveFromFavoriteFlower,
  { elemId: number; id: number }
>("removeFromFavoriteFlower", async ({ elemId, id }) => {
  await axiosInstance.delete(`flowers/${elemId}/favorites/${id}`);
  return { elemId, id };
});
