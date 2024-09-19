import React, { useState } from "react";
import { useRouter } from "next/router";
import FormInput from "./FormInput";
import Button from "./Button";
import SmallImage from "./SmallImage";
import { BsCircleFill, BsCheckCircleFill } from "react-icons/bs";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { trackPromise } from "react-promise-tracker";
import cities from "../cities.json";

const Onboarding = ({ ...pageProps }) => {
  const [brandImage, setBrandImage] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [phone, setPhone] = useState("");
  const [regionName, setRegionName] = useState({});
  const [city, setCity] = useState({});
  const [bio, setBio] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [progress, setProgress] = useState(undefined);
  const router = useRouter();
  const { baseURL, merchant, token } = pageProps;

  return (
    <div className="top-9 relative">
      <h3 className="mt-2 flex justfy-center text-4xl font-excon w-content">
        Getting Started{" "}
      </h3>
      <p className="text-lg font-pally mb-2 flex justify-center">
        Finish setting up your merchant account
      </p>
      <div className="m-2 my-8">
        <ProgressBar
          percent={progress}
          filledBackground="#0095a3"
          unfilledBackground="#b3dfe3"
          height={2}
        >
          <Step transition="scale">
            {({ accomplished }) =>
              !accomplished ? (
                <BsCircleFill className="w-4" size={100} color={"#b3dfe3"} />
              ) : (
                <BsCheckCircleFill
                  className="w-5 bg-pwaccent-100 rounded-full h-fit"
                  size={100}
                  color={"#0095a3"}
                />
              )
            }
          </Step>
          <Step transition="scale">
            {({ accomplished }) =>
              !accomplished ? (
                <BsCircleFill className="w-4" size={100} color={"#b3dfe3"} />
              ) : (
                <BsCheckCircleFill
                  className="w-5 bg-pwaccent-100 rounded-full h-fit"
                  size={100}
                  color={"#0095a3"}
                />
              )
            }
          </Step>
        </ProgressBar>
      </div>

      <form action="/" method="POST" className="-mt-5">
        <div className="flex flex-col">
          {progress === undefined ? (
            <>
              <div className="grid grid-flow-row grid-cols-3 sm:flex sm:flex-row sm:flex-wrap m-2 h-fit">
                <div>
                  <FormInput
                    name={"Logo"}
                    type={"file"}
                    accept={"image/png, image/jpeg, image/jpg"}
                    setImages={setBrandImage}
                    images={brandImage}
                  />
                </div>
                {Array.from(brandImage).map((image) => (
                  <SmallImage
                    key={image}
                    isNew={false}
                    image={image}
                    images={brandImage}
                    setImages={setBrandImage}
                  />
                ))}
              </div>
              <FormInput
                name="Brand Name"
                type={"text"}
                value={brandName}
                setBrandName={setBrandName}
              />
            </>
          ) : (
            <>
              <FormInput
                name={"Phone"}
                type={"tel"}
                icon={"../public/images/GH.svg"}
                value={phone}
                setPhone={setPhone}
              />
              {/* <FormInput
                name="Region"
                type={"text"}
                value={regionName}
                setRegionName={setRegionName}
              /> */}
              <div className="z-99">
                <FormInput
                  name="Region"
                  type={"select"}
                  regionName={regionName}
                  setRegionName={setRegionName}
                  options={[{ value: "Greater Accra", label: "Greater Accra" }]}
                />
              </div>
              <div className="z-99">
                <FormInput
                  name="City"
                  type={"select"}
                  status={city}
                  regionName={regionName.value}
                  setStatus={setCity}
                  options={[{ value: "Greater Accra", label: "Greater Accra" }]}
                />
                <FormInput
                  name="Bio"
                  type={"textarea"}
                  value={bio}
                  setValue={setBio}
                />
              </div>
              {/* <FormInput
                name="City"
                type={"text"}
                value={city}
                setCity={setCity}
              /> */}
            </>
          )}
          <div
            className={
              invalid
                ? "flex font-pally text-lg text-pwdanger-300 -mb-4 mt-4 opacity-100 transition ease-in-out duration-500"
                : "opacity-0 transition ease-in-out duration-500 mt-4 -mb-4"
            }
          >
            Verify your input and try again.
          </div>
          <div
            className={
              progress === undefined
                ? "w-full mt-5 mb-52 gap-2"
                : "w-full mt-5 mb-52 flex gap-2"
            }
          >
            <span
              className=" w-fit flex mx-auto"
              onClick={() => {
                if (progress === 50) {
                  setProgress(undefined);
                } else if (progress === 100) {
                  setProgress(50);
                }
              }}
            >
              {progress === undefined ? (
                <div className="hidden"></div>
              ) : (
                <Button size={"lg"} text={"Back"} variant={"secondary"} />
              )}
            </span>
            <span
              className=" w-fit flex mx-auto"
              onClick={() => {
                if (progress === undefined) {
                  if (brandName === "") {
                    setInvalid(true);
                  } else {
                    setInvalid(false);
                    setProgress(50);
                  }
                } else if (progress === 50) {
                  if (phone === "" || regionName === "" || city === "") {
                    setInvalid(true);
                  } else {
                    setInvalid(false);
                    setProgress(100);

                    const merchantID = merchant.id;
                    const merchantToken = token;
                    const tempMerchant = {
                      profile: brandImage[0],
                      region: regionName.value,
                      city: city.value,
                      phone,
                      bio,
                      brandName,
                    };
                    const formData = new FormData();

                    for (const [key, value] of Object.entries(tempMerchant)) {
                      formData.append(key, value);
                    }

                    trackPromise(
                      fetch(`${baseURL}/merchant`, {
                        method: "PATCH",
                        headers: {
                          // "Content-type": "multipart/form-data",
                          Authorization: `Bearer ${merchantToken}`,
                        },
                        body: formData,
                      })
                        .then((res) => {
                          res.json().then((data) => {
                            setTimeout(() => {
                              router.push("/");
                            }, 1000);
                          });
                        })
                        .catch((error) => console.log(error))
                    );
                  }
                }
              }}
            >
              <Button size={"lg"} text={"next"} />
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Onboarding;
