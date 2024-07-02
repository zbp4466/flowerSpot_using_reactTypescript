import React, { useEffect } from "react";
import star from "../../assets/star.svg";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/reducers";
import { useDispatch } from "react-redux";

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
  const userDetails = useSelector((state: AppState) => state.user.userDetails);
  const { elem } = props;

  return (
    <>
      <div
        className="flower-items-mapped-container rounded-md relative "
        style={{
          backgroundImage: `url(${elem.profile_picture})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "60vh",
          width: "20vw",
          color: "white",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          bottom: "10",
          gap: "15px",
        }}
      >
        <div className="favorite-flower-item  w-fit absolute  top-1 right-0">
          {userDetails && <img src={star} className="" alt="" />}
        </div>

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
    </>
  );
};

export default FlowerItemsMappedComp;
