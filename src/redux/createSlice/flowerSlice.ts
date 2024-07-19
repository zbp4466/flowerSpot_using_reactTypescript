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

export interface FavoriteFLowersInitialState {
  favoriteFlowersDetails: FavoriteFlowersDetails[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: FavoriteFLowersInitialState = {
  favoriteFlowersDetails: [],
  loading: "idle",
};

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

export const favoriteFlowersSlice = createSlice({
  name: "favoriteFlowersDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteFlowers.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(
        fetchFavoriteFlowers.fulfilled,
        (state, action: PayloadAction<FavoriteFlowersDetails[]>) => {
          state.loading = "succeeded";
          state.favoriteFlowersDetails = action.payload;
        }
      )
      .addCase(fetchFavoriteFlowers.rejected, (state, action) => {
        console.log("error :>> ", action.payload);
      });

    builder
      .addCase(removeFromFavoriteFlower.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(
        removeFromFavoriteFlower.fulfilled,
        (state, action: PayloadAction<RemoveFromFavoriteFlower>) => {
          state.loading = "succeeded";

          const oldList = state.favoriteFlowersDetails;
          state.favoriteFlowersDetails = oldList.filter(
            (elem) =>
              elem.id !== action.payload.id &&
              elem.flower.id !== action.payload.elemId
          );
        }
      )
      .addCase(removeFromFavoriteFlower.rejected, (state, action) => {
        console.log("error :>> ", action.payload);
      });
  },
});

export default favoriteFlowersSlice.reducer;
