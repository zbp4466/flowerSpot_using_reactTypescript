import React from "react";
import headerImage from "../assets/image/headerImg.svg";

const Header: React.FC = () => {
  return (
    <>
      <div className="flex justify-center ">
        <img
          // className="rounded-md relative border-2 border-black text-white text-center flex flex-col justify-end md:min-w-72 sm:min-w-56 "
          className=" "
          src={headerImage}
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "500px",
            width: "fit-content",
            // height: "230px",
            // width: "184px",
            // minWidth: "18rem",
          }}
        ></img>
      </div>
    </>
  );
};

export default Header;
