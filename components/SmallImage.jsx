import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BsTrash } from "react-icons/bs";

const SmallImage = ({ image, images, setImages }) => {
  const [deletable, setDeletable] = useState(false);
  const [imageType, setImageType] = useState();

  useEffect(() => {
    typeof image === "string"
      ? setImageType("string")
      : typeof image === "object"
      ? setImageType("file")
      : "";
  }, [setImageType, image]);

  return (
    <div
      onMouseEnter={() => setDeletable(true)}
      onMouseLeave={() => setDeletable(false)}
      className="cursor-pointer"
    >
      <div
        className={
          deletable
            ? "w-fit relative z-10 flex m-auto top-[4rem] transition ease-in-out duration-500"
            : "w-fit opacity-0 relative z-10 m-auto top-[4rem] transition ease-in-out duration-500"
        }
        onClick={(e) => {
          // images.filter((img)=>{return img!==e.target})
          let temp = Array.from(images).filter((img) => {
            return img !== image;
          });
          setImages(temp);
        }}
      >
        <BsTrash size={30} color="#ffffff" />
      </div>
      <div
        className={
          deletable
            ? "flex m-2 z-1 -mt-1 w-24 rounded-xl overflow-hidden transition ease-in-out duration-500 brightness-50"
            : "flex m-2 z-1 -mt-1 w-24 rounded-xl overflow-hidden transition ease-in-out duration-500"
        }
      >
        {imageType === "string" ? (
          <Image
            src={image}
            width={100}
            height={100}
            layout="fixed"
            alt="small image"
          />
        ) : imageType === "file" ? (
          <Image
            alt="small image"
            src={URL.createObjectURL(image)}
            width={100}
            height={100}
            layout="fixed"
          />
        ) : (
          ""
        )}
        {/* <Image
          src={URL.createObjectURL(image)}
          width={100}
          height={100}
          layout="fixed"
        /> */}
      </div>
    </div>
  );
};

export default SmallImage;
