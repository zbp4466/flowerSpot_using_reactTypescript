import React, { useState } from "react";
import cancelIcon from "../../assets/image/cancel.svg";

interface ModalProps {
  title?: string;
  body: any;
}

const CommonModal: React.FC<ModalProps> = (props: any) => {
  const { title, body } = props;
  console.log("modalForm :>> ");

  return (
    <>
      <div
        className="relative z-10 font-Ubuntu "
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
            <div className="relative  transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-fit sm:max-w-lg">
              <div className="bg-white p-10  m-auto min-w-96 relative">
                {/* <h3
                  className="text-2xl text-center font-semibold leading-6 text-linear-gray"
                  id="modal-title"
                >
                  {title}
                </h3> */}
                <div className="sm:flex justify-center sm:items-center ">
                  {body}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommonModal;
