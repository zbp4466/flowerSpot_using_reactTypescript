import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks/hook";

import CommonFlowerMappedComp from "../../components/CommonFlowerMappedComp";
import {
  fetchFavoriteFlowers,
  removeFromFavoriteFlower,
} from "../../redux/actions/flowerAction";
// import { removeStarBackgroundColor } from "../../redux/createSlice/starBackgroundColorSlice";

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
  // const starBackgroundColor = useAppSelector(
  //   (state) => state.starBackgroundColor.bgColor
  // );
  // console.log("starBackgroundColor :>> ", starBackgroundColor);

  useEffect(() => {
    dispatch(fetchFavoriteFlowers());
  }, []);

  useEffect(() => {
    console.log("FavoriteFlowers - favoriteFlowerList:", favoriteFlowerList);
  }, [favoriteFlowerList]);

  const clickStarButton = async (
    id: number,
    elem: number,
    elemId: number,
    setBgColor: React.Dispatch<React.SetStateAction<string>>,
    bgColor: string
  ) => {
    try {
      if (bgColor === "white") {
        setBgColor("linear-gradient-2");
        // dispatch(removeStarBackgroundColor());
        dispatch(removeFromFavoriteFlower({ elemId, id }));
      } else {
        setBgColor("white");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {favoriteFlowerList.length === 0 ? (
        <div className="text-3xl flex flex-col justify-center items-center h-screen">
          <p>Your favorite flower list is empty!</p>
          <p className="text-xl mt-4">
            Explore our collection and add some flowers to your favorites!
          </p>
        </div>
      ) : (
        <div className=" p-5 sm:p-5 md:p-10 ">
          <div className="  grid grid-cols-2 gap-5   sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4  ">
            {favoriteFlowerList.map((elem) => {
              return (
                <CommonFlowerMappedComp
                  key={elem.id}
                  id={elem.id}
                  elem={elem.flower}
                  onClickStarButton={clickStarButton}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default FavoriteFlowers;
