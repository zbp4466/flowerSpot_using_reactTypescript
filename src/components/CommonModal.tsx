import React from "react";
import { useState } from "react";
import CommonButton from "./CommonButton";
import CommonTextField from "./CommonTextField";
import CommonDatePicker from "./CommonDatePicker";
import { useForm } from "react-hook-form";

interface ModalProps {
  body: any;
  onClose: () => void;
}

const CommonModal: React.FC<ModalProps> = (props: any) => {
  console.log("props :>> ", props);
  const { body } = props;

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    props.onClose();
  };

  const handleContentClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        className="relative z-10 font-Ubuntu"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        onClick={handleOverlayClick}
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-fit sm:max-w-lg"
              onClick={handleContentClick}
            >
              <div className="bg-white px-10 py-5 m-auto">
                <div className="sm:flex justify-center sm:items-center">
                  {body}
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex justify-center sm:px-6 gap-3">
                {/* <button
                  onClick={() => setToggleLoginModal(false)}
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Deactivate
                </button> */}
                {/* <button
                onClick={()=>setToggleLoginModal(false)}
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button> */}
                {/* <CommonButton
                  // text="Deactivate"
                  variant="contained"
                  onClick={() => setToggleLoginModal(false)}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommonModal;
