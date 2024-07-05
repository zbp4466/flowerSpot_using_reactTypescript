import axios from "axios";
import React, { useEffect, useState } from "react";
import FlowerItemsMappedComp from "./FlowerItemsMappedComp";
import "./flowers.css";
import Loader from "../../components/Loader";
import axiosInstance from "../../config/http.config";

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

  return (
    <>
      <div className="m-auto  p-10">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flower-items-container  w-11/12 m-auto flex gap-5 flex-wrap ">
            {flowerList?.map((elem, index) => {
              return (
                <FlowerItemsMappedComp key={elem.id} id={elem.id} elem={elem} />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Flowers;
