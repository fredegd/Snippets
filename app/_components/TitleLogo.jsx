import React from "react";
import Image from "next/image";

function TitleLogo() {
  return (
    <div className="w-full h-1/6 flex items-center justify-center border-b py-4">
      <Image src={"/cs_logo.svg"} alt={"logo"} width={300} height={210} />
    </div>
  );
}

export default TitleLogo;
