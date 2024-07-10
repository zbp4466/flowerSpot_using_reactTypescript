import React, { useEffect } from "react";
import star from "../../assets/star.svg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks/hook";

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
  const userDetails = useAppSelector((state) => state.user.userDetails);
  const { elem } = props;

  return (
    <>
      <div
        className="rounded-md bg-auto relative border-2 border-black text-white text-center flex flex-col justify-end md:min-w-72 sm:min-w-72 "
        style={{
          backgroundImage: `url(${elem.profile_picture})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "60vh",
          width: "22vw",
          // minWidth: "18rem",
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
