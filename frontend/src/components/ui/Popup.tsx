import React from "react";

interface PropsI {
  showModal: boolean;
  children?: React.ReactNode;
  onClose: () => void;
}

export default function Popup({ showModal, children, onClose }: PropsI) {
  return (
    <>
      {showModal ? (
        <>
          <div className=" w-full pt-60 hidden-scrollbar  justify-center items-center bg-black/70 flex overflow-x-hidden overflow-y-auto fixed  inset-0 z-[999999999] outline-none  focus:outline-none">
            <div className="relative w-auto my-6  mx-auto max-w-3xl">
              <div
                onClick={onClose}
                className="text-red-800 font-bold text-2xl  cursor-pointer"
              >
                ✕
              </div>
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-gray-300  w-full outline-none focus:outline-none">
                <div className="relative p-6 flex-auto">{children}</div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
