import React, { useCallback, useEffect, useState } from "react";
import star from "../../assets/image/star.svg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hook";
import axiosInstance from "../../config/http.config";
import { fetchFavoriteFlowers } from "../../redux/createSlice/flowerSlice";

// interface FavoriteFlowerInfo {
//   id: number;
//   user_id: number;
//   flower: {
//     id: number;
//     name: string;
//     latin_name: string;
//     sightings: number;
//     profile_picture: string;
//     favorite: boolean;
//   };
// }

interface flowerItemsProps {
  id: number;
  elem: {
    id: number;
    name: string;
    latin_name: string;
    sightings: number;
    profile_picture: string;
    favorite: boolean;
  };
}
const FlowerItemsMappedComp: React.FC<flowerItemsProps> = (props) => {
  const [bgColor, setBgColor] = useState<string>("white");
  const userDetails = useAppSelector((state) => state.user.userDetails);

  const { elem, id } = props;

  const clickStarButton = async () => {
    try {
      if (bgColor === "white") {
        setBgColor("linear-gradient-2");
        const response = await axiosInstance.post(
          `flowers/${elem.id}/favorites`,
          elem
        );
      } else {
        setBgColor("white");
        const response = await axiosInstance.delete(
          `flowers/${elem.id}/favorites/${id}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center ">
        <div
          // className="rounded-md relative border-2 border-black text-white text-center flex flex-col justify-end md:min-w-72 sm:min-w-56 "
          className=" max-w-full  rounded-md relative text-white text-center flex flex-col justify-end h-56 w-44"
          style={{
            backgroundImage: `url(${elem.profile_picture})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "350px",
            width: "100%",
            // height: "230px",
            // width: "184px",
            // minWidth: "18rem",
          }}
        >
          {userDetails && (
            <div
              className={`favorite-flower-item  bg-${bgColor} rounded-full p-2 h-fit absolute  top-5 right-5 hover:cursor-pointer
            `}
              onClick={clickStarButton}
            >
              <img src={star} className="w-4 h-4" alt="" />
            </div>
          )}

          <div className="flower-info flex flex-col justify-center items-center gap-5 mb-8 ">
            <div className="flower-name-box ">
              <h1 className="text-2xl">{elem.name}</h1>
              <p className="italic">{elem.latin_name}</p>
            </div>
            <div className="sightings-info-box bg-[#0000006b] w-36 p-2 rounded-full hover:bg-linear-gradient-2 hover:cursor-pointer">
              <p>{elem.sightings}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlowerItemsMappedComp;
