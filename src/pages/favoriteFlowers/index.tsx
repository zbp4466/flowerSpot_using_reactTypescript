import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/http.config";
import FavoriteFlowerItemsMappedComp from "./FavoriteFlowerItemsMappedComp";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hook";
import { fetchFavoriteFlowers } from "../../redux/createSlice/flowerSlice";

interface favoriteFlowerListObject {
  id: number;
  name: string;
  latin_name: string;
  sightings: number;
  profile_picture: string;
  favorite: boolean;
  flower: object;
}

const FavoriteFlowers: React.FC = () => {
  // const [favoriteFlowerList, setFavoriteFlowerList] = useState<
  //   favoriteFlowerListObject[]
  // >([]);
  const dispatch = useAppDispatch();
  const favoriteFlowerList = useAppSelector(
    (state) => state.flower.favoriteFlowersDetails
  );

  useEffect(() => {
    dispatch(fetchFavoriteFlowers());
  }, []);

  useEffect(() => {
    console.log("FavoriteFlowers - favoriteFlowerList:", favoriteFlowerList);
  }, [favoriteFlowerList]);

  // console.log("favoriteFowerList :>> ", favoriteFlowerList);

  // const fetchFavoriteFlowerList = async () => {
  //   try {
  //     const response = await axiosInstance.get(`flowers/favorites`);
  //     setFavoriteFlowerList(response.data.fav_flowers);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchFavoriteFlowerList();
  // }, []);

  return (
    <>
      <div className=" p-5 sm:p-5 md:p-10 ">
        <div className="  grid grid-cols-2 gap-5   sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4  ">
          {favoriteFlowerList.map((elem) => {
            return (
              <FavoriteFlowerItemsMappedComp
                key={elem.id}
                id={elem.id}
                elem={elem.flower}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FavoriteFlowers;
