import Image from "next/image";
import React, { useState, useEffect } from "react";

const ProductRow = ({ product }) => {
  const { image, name, price, quantity } = product;
  const [imageType, setImageType] = useState();

  useEffect(() => {
    typeof image === "string" ? setImageType("string") : setImageType("file");
  }, [image]);

  return (
    <div className="flex flex-row m-1 mt-2 p-1 relative rounded-lg shadow-xl bg-pwgray-100">
      <div className="rounded rounded-lg m-2 w-14 relative left-0 overflow-hidden">
        {imageType === "string" ? (
          <Image
            src={image}
            blurDataURL={
              "data:image/png;base64, /9j/4AAQSkZJRgABAQAAAQABAAD/4QDeRXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAAA4YwAA6AMAADhjAADoAwAABwAAkAcABAAAADAyMTABkQcABAAAAAECAwCGkgcAFQAAAMAAAAAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAAAoAAAADoAQAAQAAAAoAAAAAAAAAQVNDSUkAAABQaWNzdW0gSUQ6IDc4AP/bAEMACAYGBwYFCAcHBwkJCAoMFA0MCwsMGRITDxQdGh8eHRocHCAkLicgIiwjHBwoNyksMDE0NDQfJzk9ODI8LjM0Mv/bAEMBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/CABEIAAoACgMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAACA//EABUBAQEAAAAAAAAAAAAAAAAAAAID/9oADAMBAAIQAxAAAAGaJFf/xAAaEAACAgMAAAAAAAAAAAAAAAABAwARAiJC/9oACAEBAAEFAmXjCk3yTt//xAAVEQEBAAAAAAAAAAAAAAAAAAAAEf/aAAgBAwEBPwGv/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAIAQIBAT8Bj//EABoQAQABBQAAAAAAAAAAAAAAAAEAAhARIUH/2gAIAQEABj8CcBVvt2f/xAAaEAEAAgMBAAAAAAAAAAAAAAABADEhQVHB/9oACAEBAAE/IVpsDN1Fp8nPY1jc/9oADAMBAAIAAwAAABCb/8QAFREBAQAAAAAAAAAAAAAAAAAAADH/2gAIAQMBAT8Qh//EABcRAAMBAAAAAAAAAAAAAAAAAAABESH/2gAIAQIBAT8QW7T/xAAdEAEAAwABBQAAAAAAAAAAAAABABEhYTFBUZHR/9oACAEBAAE/EDEEHYA2tPWz1ABVKpr7LVJaGnmc1vfmf//Z"
            }
            alt="product Image"
            height={80}
            width={80}
            layout="responsive"
            placeholder="blur"
          />
        ) : imageType === "file" ? (
          <Image
            src={URL.createObjectURL(image)}
            blurDataURL={
              "data:image/png;base64, /9j/4AAQSkZJRgABAQAAAQABAAD/4QDeRXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAAA4YwAA6AMAADhjAADoAwAABwAAkAcABAAAADAyMTABkQcABAAAAAECAwCGkgcAFQAAAMAAAAAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAAAoAAAADoAQAAQAAAAoAAAAAAAAAQVNDSUkAAABQaWNzdW0gSUQ6IDc4AP/bAEMACAYGBwYFCAcHBwkJCAoMFA0MCwsMGRITDxQdGh8eHRocHCAkLicgIiwjHBwoNyksMDE0NDQfJzk9ODI8LjM0Mv/bAEMBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/CABEIAAoACgMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAACA//EABUBAQEAAAAAAAAAAAAAAAAAAAID/9oADAMBAAIQAxAAAAGaJFf/xAAaEAACAgMAAAAAAAAAAAAAAAABAwARAiJC/9oACAEBAAEFAmXjCk3yTt//xAAVEQEBAAAAAAAAAAAAAAAAAAAAEf/aAAgBAwEBPwGv/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAIAQIBAT8Bj//EABoQAQABBQAAAAAAAAAAAAAAAAEAAhARIUH/2gAIAQEABj8CcBVvt2f/xAAaEAEAAgMBAAAAAAAAAAAAAAABADEhQVHB/9oACAEBAAE/IVpsDN1Fp8nPY1jc/9oADAMBAAIAAwAAABCb/8QAFREBAQAAAAAAAAAAAAAAAAAAADH/2gAIAQMBAT8Qh//EABcRAAMBAAAAAAAAAAAAAAAAAAABESH/2gAIAQIBAT8QW7T/xAAdEAEAAwABBQAAAAAAAAAAAAABABEhYTFBUZHR/9oACAEBAAE/EDEEHYA2tPWz1ABVKpr7LVJaGnmc1vfmf//Z"
            }
            alt="product Image"
            height={80}
            width={80}
            layout="responsive"
            placeholder="blur"
          />
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-col uppercase">
        <span className=" font-pally text-xl absolute top-2 w-[50%]">
          {name?.substring(0, 11) + "..."}
        </span>
        <span className="font-excon text-2xl absolute bottom-2">
          {"GH₵ " + price}
        </span>
      </div>
      <div className="m-1 text-center w-16 h-16 px-auto justify-center flex flex-col absolute right-1 border border-1 border-pwgray-300 rounded rounded-lg">
        <span>PCS</span>
        <span>{quantity ? quantity : 0}</span>
      </div>
    </div>
  );
};

export default ProductRow;
