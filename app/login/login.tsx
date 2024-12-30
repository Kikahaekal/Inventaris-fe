"use client";
import Image from "next/image";
import Inputs from "./inputs";

const Login = () => {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-7xl grid grid-cols-2 relative">
          <div className="relative h-[600px]">
            <Image
              src="/Mediq_Sverige_Kungsbacka_warehouse.jpg"
              alt="warehouse image"
              className="absolute w-full h-full object-cover"
              width={800}
              height={800}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-white" />
          </div>
          <Inputs />
        </div>
      </div>
    );
  };    

export default Login;
