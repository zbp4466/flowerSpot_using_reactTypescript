import axios from "axios";
import React, { useEffect, useState } from "react";
// import FlowerItemsMappedComp from "./FlowerItemsMappedComp";
import "./flowers.css";
import Loader from "../../components/Loader";
import axiosInstance from "../../config/http.config";
import CommonFlowerMappedComp from "../../components/CommonFlowerMappedComp";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hook";
// import {
//   removeStarBackgroundColor,
//   setStarBackgroundColor,
// } from "../../redux/createSlice/starBackgroundColorSlice";

interface flowerListObject {
  id: number;
  name: string;
  latin_name: string;
  sightings: number;
  profile_picture: string;
  favorite: boolean;
}
interface NavbarProps {
  progressBar?: boolean;
}

const Flowers: React.FC<NavbarProps> = (props) => {
  const { progressBar } = props;
  const [flowerList, setFlowerList] = useState<flowerListObject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  // const starBackgroundColor = useAppSelector(
  //   (state) => state.starBackgroundColor.bgColor
  // );
  // console.log("starBackgroundColor :>> ", starBackgroundColor);

  const fetchFlowerList = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`flowers`);
      setFlowerList(response.data.flowers);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFlowerList();
  }, []);

  const clickStarButton = async (
    id: number,
    elem: any,
    elemId: number,
    setBgColor: React.Dispatch<React.SetStateAction<string>>,
    bgColor: string
  ) => {
    try {
      if (bgColor === "white") {
        setBgColor("linear-gradient-2");
        // dispatch(setStarBackgroundColor());
        const response = await axiosInstance.post(
          `flowers/${elem.id}/favorites`,
          elem
        );
      } else {
        // setBgColor("white");
        // dispatch(removeStarBackgroundColor());
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
      <div className=" p-5 sm:p-5 md:p-10 ">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="  grid grid-cols-2 gap-5   sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4  ">
            {flowerList?.map((elem) => {
              return (
                <CommonFlowerMappedComp
                  key={elem.id}
                  id={elem.id}
                  elem={elem}
                  onClickStarButton={clickStarButton}
                />
              );
            })}
          </div>

          // <div className="flower-items-container  w-fit border-2 border-black  mx-auto gap-5 place-items-center grid  lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3  ">
          //   {flowerList?.map((elem) => {
          //     return (
          //       <FlowerItemsMappedComp key={elem.id} id={elem.id} elem={elem} />
          //     );
          //   })}
          // </div>
        )}
      </div>
    </>
  );
};

export default Flowers;
