import Image from "next/image";

export default function CoverPage({ data }) {
  console.log(data.imageBanner);
  return (
    <div>
      {data.imageBanner ? (
        <div className="w-full flex justify-center">
          <Image
            src={data.imageBanner}
            alt={data.title}
            width={600}
            height={500}
            className="w-full sm:w-5/6  xl:w-4/6 "
          />
        </div>
      ) : (
        <div className="h-64 w-full bg-gray-200">{" no banner provided"}</div>
      )}
    </div>
  );
}
