import React from "react";
import { poppins } from "../fonts";
import InputBox from "../../components/core/InputBox";
import Editor from "../../components/Editor/Editor";

const page = () => {
  return (
    <div className="w-screen h-screen flex justify-center bg-white">
      <div className="max-w-6xl w-full">
        <div className="w-full p-4">
          <input
            className={`w-full ${poppins.className}
                 placeholder:text-neutral-400
                 text-black
                 font-bold
                 text-7xl outline-none`}
            type="text"
            placeholder="Flow Name"
          />
          <InputBox />
        </div>
        <div className="h-[4px] w-full bg-neutral-400/25" />
        <div className="p-4">
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default page;
