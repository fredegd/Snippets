import Link from "next/link";
import TitleLogo from "./_components/TitleLogo";
import TextAnimation from "./_components/TextAnimation";
import EnterButton from "./_components/EnterButton";
import connectToDB from "@/app/database";

export default function Home() {
  return (
    <div className="bg-white w-full h-screen overflow-scroll">
      <TitleLogo />
      <div className="w-full h-5/6 flex flex-col items-center justify-center relative">
        <TextAnimation />
        <EnterButton />
      </div>
      <div className="w-full h-1/6 flex items-center justify-center">
        <Link href="/about" className="text-3xl font-bold text-gray-800">
          About
        </Link>
      </div>
    </div>
  );
}
