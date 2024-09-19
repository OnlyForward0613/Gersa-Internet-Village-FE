import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Select from "react-select";
import AsyncSelect from "react-select/async";

import {
  BsCheckLg,
  BsEye,
  BsEyeSlash,
  BsPlus,
  BsPlusLg,
  BsPlusSquareDotted,
  BsTrash,
  BsTrashFill,
} from "react-icons/bs";
import { SketchPicker } from "react-color";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useRouter } from "next/router";
import Link from "next/link";
import { trackPromise } from "react-promise-tracker";
import Button from "./Button";
import SmallColor from "./SmallColor";
import cities from "../cities.json";

const FormInput = ({
  buttonRef,
  name,
  type,
  accept,
  images,
  setImages,
  quantity,
  size,
  min,
  options,
  location,
  regionName,
  setValue,
  setEmail,
  setPassword,
  setPhone,
  setProductName,
  setBrandName,
  setRegionName,
  setQuantity,
  setSize,
  setCity,
  setInstagram,
  setWebsite,
  setDescription,
  setSelected,
  setPrice,
  setStatus,
  value,
  selected,
  status,
  baseURL,
  readOnly,
  setOtp,
  selectWidth,
  token,
}) => {
  var temp = name.split(" ");
  var str =
    temp.length === 1
      ? temp[0].charAt(0).toLowerCase() + temp[0].slice(1)
      : temp[0].charAt(0).toLowerCase() + temp[0].slice(1) + temp[1];

  const [showPassword, setShowPassword] = useState(false);
  const [wl, setWl] = useState([]);
  const [currentColor, setCurrentColor] = useState("#ffffff");
  const [selectedRegion, setSelectedRegion] = useState("");
  const router = useRouter();
  const scrollbar = useRef(null);

  const fileInput = useRef(null);

  const callback = (e) => {
    console.log(`%c ${e.type}: `, "background: #222; color: #bada55", e.detail);
  };

  return (
    <div className="mx-1 mb-1 font-pally flex flex-col z-0 transition-all ease-in-out duration-500">
      <label htmlFor={str} className="uppercase text-lg z-0">
        {name}
      </label>
      <div className="flex">
        {name === "Phone" ? (
          <div className="z-10 my-auto -mr-16 px-4">
            <Image
              src={require("../public/images/GH.svg")}
              alt="GH"
              height={24}
              width={32}
            />
          </div>
        ) : (
          ""
        )}

        {name === "Phone" ? (
          <input
            onChange={(e) => setPhone(e.target.value)}
            value={value}
            maxLength={10}
            min={200000000}
            max={999999999}
            required
            name={str}
            type="tel"
            placeholder={
              name.includes("*") ? name.substring(0, name.length - 2) : name
            }
            className="transition-all ease-in-out duration-500 bg-pwgray-200 border border-pwgray-400 border-1 rounded-lg w-full h-14 drop-shadow-lg pl-14 mb-1 form-control outline-none focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-pwaccent-400 hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-pwgray-400 z-0"
          />
        ) : name.includes("Main Image") || name === "Logo" ? (
          <div>
            <div
              onClick={() => fileInput.current.click()}
              className="cursor-pointer hover:bg-pwgray-300 fill-pwaccent-500 hover:fill-pwaccent-600 rounded-2xl transition ease-in-out duration-500"
            >
              <BsPlusSquareDotted size={96} fill="inherit" />
            </div>
            <input
              name={str}
              type={"file"}
              placeholder={
                name.includes("*") ? name.substring(0, name.length - 2) : name
              }
              className="hidden"
              ref={fileInput}
              accept={accept}
              onChange={(e) => {
                setImages(e.target.files);
              }}
            />
          </div>
        ) : name.includes("Images") ? (
          <div>
            <div
              onClick={() => fileInput.current.click()}
              className="cursor-pointer hover:bg-pwgray-300 fill-pwaccent-500 hover:fill-pwaccent-600 rounded-2xl transition ease-in-out duration-500"
            >
              <BsPlusSquareDotted size={96} fill="inherit" />
            </div>
            <input
              name={str}
              type={"file"}
              placeholder={
                name.includes("*") ? name.substring(0, name.length - 2) : name
              }
              className="hidden"
              ref={fileInput}
              accept={accept}
              multiple
              onChange={(e) => {
                var temp = [...images];
                temp = temp.concat(Array.from(e.target.files));
                setImages(temp);
              }}
            />
          </div>
        ) : type === "textarea" ? (
          <textarea
            name={str}
            className="transition-all ease-in-out duration-500 p-1 bg-pwgray-200 border border-pwgray-400 border-1 rounded-lg w-full h-20 drop-shadow-lg px-2 mb-1 form-control outline-none focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-pwaccent-400 hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-pwgray-400 z-0"
            placeholder={
              name.includes("*") ? name.substring(0, name.length - 2) : name
            }
            value={value}
            onChange={(e) =>
              name === "Description"
                ? setDescription(e.target.value)
                : setValue(e.target.value)
            }
          />
        ) : name === "Colors" ? (
          // <div className="z-20 transition-all ease-in-out duration-500 bg-pwgray-200 border border-pwgray-400 border-1 w-full rounded-lg drop-shadow-lg form-control outline-none focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-pwaccent-400 hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-pwgray-400">
          //   <Select
          //     options={[{ label: "Red", value: "#ff0000" }]}
          //     isMulti
          //     value={selected}
          //     onChange={(s) => {
          //       setSelected(s);
          //     }}
          //     defaultValue={selected}
          //     placeholder={"Add a color"}
          //   />
          // </div>

          <div className="flex h-80">
            <SketchPicker
              disableAlpha
              color={currentColor}
              onChangeComplete={(color) => {
                const temp = selected;
                temp[temp.length - 1] = color.hex;
                setSelected(temp);
                setCurrentColor(color.hex);

                // console.log("event: ", event);
              }}
            />
            <div className="flex-col h-full">
              <div className="flex-col h-5/6 bg-pwgray-200 mx-8 border-2 border-pwgray-400 rounded-md shadow-lg">
                <Scrollbars
                  style={{ width: 60, height: 260 }}
                  autoHide
                  allowTransparency
                  ref={scrollbar}
                >
                  {selected?.map((c) => (
                    <SmallColor
                      key={c}
                      color={c}
                      colors={selected}
                      setSelected={setSelected}
                    />
                  ))}
                </Scrollbars>
              </div>
              <div
                className="flex my-4 mx-auto w-fit"
                onClick={() => {
                  const temp = selected;
                  temp.push("#ffffff");
                  setSelected(temp);
                  setWl([]);
                  setTimeout(() => {
                    scrollbar.current.scrollToBottom();
                  }, 50);
                }}
              >
                <Button icon={<BsPlusLg />} mode="normal" />
              </div>
            </div>
          </div>
        ) : type === "tags" && name.includes("Categories") ? (
          <div className="z-30 transition-all ease-in-out duration-500 bg-pwgray-200 border border-pwgray-400 border-1 w-full rounded-lg drop-shadow-lg form-control outline-none focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-pwaccent-400 hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-pwgray-400">
            <AsyncSelect
              // isMulti
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  // width: "360px",
                  height: "48px",
                }),
              }}
              onChange={(s) => {
                const temp = [s];
                setSelected[0](temp);
                // console.log(s);
              }}
              value={selected}
              // cacheOptions={true}
              defaultOptions={true}
              loadOptions={(inputValue, callback) => {
                const merchantToken = token;

                trackPromise(
                  fetch(`${baseURL}/category/`, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${merchantToken}`,
                    },
                  }).then((res) =>
                    res.json().then((data) => {
                      // console.log(data.categoryList);
                      callback(() => {
                        const temp = data.categoryList.map((c) => {
                          return { label: c.name, value: c.id };
                        });

                        return temp.filter((cat) => {
                          return cat.label
                            .toLowerCase()
                            .includes(inputValue.toLowerCase());
                        });
                      });
                    })
                  )
                );
              }}
              defaultValue={selected}
              placeholder={"Add a category"}
            />
          </div>
        ) : type === "select" && name === "Region" ? (
          <div className="w-full">
            <Select
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  // width: "360px",
                  height: "48px",
                }),
              }}
              options={Object.keys(cities)
                .filter((key) => {
                  return key === "Greater Accra";
                })
                .map((key) => {
                  return { value: key, label: key };
                })}
              onChange={(regionName) => {
                setRegionName(regionName);
              }}
              defaultValue={regionName?.value}
            />
          </div>
        ) : type === "select" && name === "City" ? (
          <div className="w-full mb-15">
            <Select
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  // width: "360px",
                  height: "48px",
                }),
              }}
              noOptionsMessage={() => "Select a region."}
              options={
                // console.log(regionName)
                regionName !== ""
                  ? cities[regionName]?.map((city) => {
                      return { value: city, label: city };
                    })
                  : []
              }
              onChange={(status) => {
                setStatus(status);
              }}
              defaultValue={status}
            />
          </div>
        ) : type === "select" && name === "Status" ? (
          <div className="z-20 transition-all ease-in-out duration-500 bg-pwgray-200 border border-pwgray-400 border-1 w-full rounded-lg drop-shadow-lg form-control outline-none focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-pwaccent-400 hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-pwgray-400">
            <Select
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  // width: "360px",
                  height: "48px",
                }),
              }}
              options={options}
              onChange={(status) => {
                setStatus(status);
              }}
              defaultValue={status}
            />
          </div>
        ) : type === "number" && name.includes("Price (GH₵)") ? (
          <input
            name={str}
            type={type}
            value={value}
            onChange={(e) => setPrice(e.target.value)}
            min={min}
            placeholder={"00.00"}
            className="transition-all ease-in-out duration-500 bg-pwgray-200 border border-pwgray-400 border-1 rounded-lg w-full h-12 drop-shadow-lg px-2 mb-1 text-center form-control outline-none focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-pwaccent-400 hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-pwgray-400 z-0"
          />
        ) : type === "number" && name.includes("Quantity") ? (
          <input
            name={str}
            type={type}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min={min}
            placeholder={"00"}
            className="transition-all ease-in-out duration-500 bg-pwgray-200 border border-pwgray-400 border-1 rounded-lg w-full h-10 drop-shadow-lg px-2 mb-1 text-center form-control outline-none focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-pwaccent-400 hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-pwgray-400 z-0"
          />
        ) : type === "number" && name.includes("Size") ? (
          <input
            name={str}
            type={type}
            value={size}
            onChange={(e) => setSize(e.target.value)}
            min={min}
            placeholder={"00"}
            className="transition-all ease-in-out duration-500 bg-pwgray-200 border border-pwgray-400 border-1 rounded-lg w-full h-10 drop-shadow-lg px-2 mb-1 text-center form-control outline-none focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-pwaccent-400 hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-pwgray-400 z-0"
          />
        ) : type === "otp" ? (
          <input
            name={str}
            type={"number"}
            value={value}
            onChange={(e) => setOtp(e.target.value)}
            // min={min}
            placeholder={"* * * *"}
            className="transition-all ease-in-out duration-500 bg-pwgray-200 border border-pwgray-400 border-1 rounded-lg w-full h-10 drop-shadow-lg px-2 mb-1 text-center form-control outline-none focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-pwaccent-400 hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-pwgray-400 z-0"
          />
        ) : (
          <input
            name={str}
            type={
              type === "password" && showPassword
                ? "text"
                : type === "password" && !showPassword
                ? "password"
                : type
            }
            placeholder={
              name.includes("*") ? name.substring(0, name.length - 2) : name
            }
            value={value}
            readOnly={readOnly}
            onKeyDown={(e) => {
              if (type === "password" && e.key === "Enter") {
                buttonRef.current.click();
              }
            }}
            onChange={(e) => {
              type === "password"
                ? setPassword(e.target.value)
                : setEmail
                ? setEmail(e.target.value)
                : setProductName
                ? setProductName(e.target.value)
                : setBrandName
                ? setBrandName(e.target.value)
                : setRegionName
                ? setRegionName(e.target.value)
                : setCity
                ? setCity(e.target.value)
                : setInstagram
                ? setInstagram(e.target.value)
                : setWebsite
                ? setWebsite(e.target.value)
                : setValue
                ? setValue(e.target.value)
                : "";
            }}
            className="transition-all ease-in-out duration-500 bg-pwgray-200 border border-pwgray-400 border-1 rounded-lg w-full h-14 drop-shadow-lg px-2 mb-1 form-control outline-none focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-pwaccent-400 hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-pwgray-400 z-0"
          />
        )}
        {type === "password" && !location ? (
          <button
            type="button"
            className="bg-pwgray-200 h-6 my-4 -ml-10 z-50 pl-1"
            tabIndex={-1}
          >
            {showPassword ? (
              <BsEye
                className="h-6 w-6 -px-3"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <BsEyeSlash
                className="h-6 w-6 -px-3"
                onClick={() => setShowPassword(true)}
              />
            )}
          </button>
        ) : type === "password" && location === "settings" ? (
          <Link passHref href="/changepassword">
            <button
              type="button"
              className=" absolute flex translate-x-40 translate-y-4 "
            >
              <span className="h-6 w-36 -px-3 text-pwinfo-300">
                Change password
              </span>
            </button>
          </Link>
        ) : (
          <span className="hidden"></span>
        )}
      </div>
    </div>
  );
};

export default FormInput;
