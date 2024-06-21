import React from "react";

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
  const { id, elem } = props;
  console.log("props :>> ", props);
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
          <img src="star.svg" className="" alt="" />
        </div>
        <div className="flower-info flex flex-col justify-center items-center gap-5 mb-8 ">
          <div className="flower-name-box ">
            <h1 className="text-2xl">Balloon Flower</h1>
            <p className="italic">platycodon grandiflorus</p>
          </div>
          <div className="sightings-info-box bg-[#0000006b] w-36 p-2 rounded-full hover:bg-linear-gradient-2 hover:cursor-pointer">
            <p>127 sightings</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlowerItemsMappedComp;
