// import React, { useEffect, useState } from "react";
// import star from "../../assets/image/star.svg";
// import { useAppDispatch, useAppSelector } from "../../redux/hooks/hook";
// import axiosInstance from "../../config/http.config";
// import {
//   fetchFavoriteFlowers,
//   removeFromFavoriteFlower,
// } from "../../redux/createSlice/flowerSlice";

// interface favoriteFlowerItemsProps {
//   id: number;
//   elem: {
//     id: number;
//     name: string;
//     latin_name: string;
//     sightings: number;
//     profile_picture: string;
//     favorite: boolean;
//   };
// }

// const FavoriteFlowerItemsMappedComp: React.FC<favoriteFlowerItemsProps> = (
//   props
// ) => {
//   const { elem, id } = props;
//   const [favoriteFlowerBgColor, setFavoriteFlowerBgColor] =
//     useState<string>("linear-gradient-2");

//   const userDetails = useAppSelector((state) => state.user.userDetails);

//   const dispatch = useAppDispatch();

//   const clickStarButton = async (elemId: number, id: number) => {
//     try {
//       if (favoriteFlowerBgColor === "linear-gradient-2") {
//         setFavoriteFlowerBgColor("white");
//         dispatch(removeFromFavoriteFlower({ elemId, id }));
//         // const response = await axiosInstance.delete(
//         //   `flowers/${elem.id}/favorites/${id}`
//         // );
//         // console.log("response :>> ", response.data.fav_flower);
//         // console.log("id :>> ", id);
//       } else {
//         setFavoriteFlowerBgColor("linear-gradient-2");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <div className="flex justify-center ">
//         <div
//           className=" max-w-full  rounded-md relative text-white text-center flex flex-col justify-end h-56 w-44"
//           style={{
//             backgroundImage: `url(${elem.profile_picture})`,
//             backgroundSize: "cover",
//             backgroundRepeat: "no-repeat",
//             height: "350px",
//             width: "100%",
//           }}
//         >
//           {userDetails && (
//             <div
//               className={`favorite-flower-item  bg-${favoriteFlowerBgColor} rounded-full p-2 h-fit absolute  top-5 right-5 hover:cursor-pointer
//       `}
//               onClick={() => clickStarButton(elem.id, id)}
//             >
//               <img src={star} className="w-4 h-4" alt="" />
//             </div>
//           )}

//           <div className="flower-info flex flex-col justify-center items-center gap-5 mb-8 ">
//             <div className="flower-name-box ">
//               <h1 className="text-2xl">{elem.name}</h1>
//               <p className="italic">{elem.latin_name}</p>
//             </div>
//             <div className="sightings-info-box bg-[#0000006b] w-36 p-2 rounded-full hover:bg-linear-gradient-2 hover:cursor-pointer">
//               <p>{elem.sightings}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FavoriteFlowerItemsMappedComp;
