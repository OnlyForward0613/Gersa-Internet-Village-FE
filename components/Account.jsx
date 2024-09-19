import Image from "next/image";
import { useState, useEffect } from "react";
import {
  BsEnvelope,
  BsGlobe,
  BsInstagram,
  BsPhone,
  BsPinMap,
  BsStar,
  BsStarFill,
} from "react-icons/bs";
import logoPlaceholder from "../public/images/logo-placeholder.png";
import { useRouter } from "next/router";
import { trackPromise } from "react-promise-tracker";

const Account = ({ ...pageProps }) => {
  const router = useRouter();
  const { token, merchant, setToken, baseURL } = pageProps;
  const [refreshToken, setRefreshToken] = useState("");
  const [merchantDetails, setMerchantDetails] = useState("");

  useEffect(() => {
    setRefreshToken(JSON.parse(localStorage.getItem("pwmerchantToken")));

    if (!token) {
      trackPromise(
        fetch(`${baseURL}/merchant/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken: refreshToken }),
        }).then((res) =>
          res.json().then((data) => {
            if (data.success !== false) {
              setToken(data.token);

              fetch(
                `${baseURL}/merchant/${JSON.parse(
                  localStorage.getItem("pwmerchantID")
                )}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data.token}`,
                  },
                }
              )
                .then((res) =>
                  res.json().then((data2) => {
                    if (data2.merchant) {
                      setMerchantDetails(data2.merchant);
                    }
                  })
                )
                .catch((error) => console.log(error));
            }
          })
        )
      );
    }

    trackPromise(
      fetch(
        `${baseURL}/merchant/${JSON.parse(
          localStorage.getItem("pwmerchantID")
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) =>
          res.json().then((data2) => {
            if (data2.merchant) {
              setMerchantDetails(data2.merchant);
            }
          })
        )
        .catch((error) => console.log(error))
    );
  }, [baseURL, token, setToken, refreshToken]);

  return (
    <>
      <div className="flex flex-col mx-auto font-pally">
        <div className="flex justify-around">
          <div className="h-[200px] lg:h-[300px] flex rounded-lg overflow-hidden w-full">
            <Image
              alt="cover image"
              height={500}
              width={2000}
              src={"https://picsum.photos/2000/500"}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between mt-2 w-full">
          <div className="">
            <div className="flex gap-4">
              <div className="w-[100px] lg:w-[200px] rounded-lg overflow-hidden flex m-2 sm:ml-10 -translate-y-16 sm:-translate-y-24">
                {merchantDetails?.profile ? (
                  <Image
                    alt="profile image"
                    height={200}
                    width={200}
                    src={merchantDetails.profile}
                  />
                ) : (
                  <Image
                    alt="profile image"
                    height={200}
                    width={200}
                    src={logoPlaceholder}
                  />
                )}
              </div>
              <div className="flex flex-col justify-center gap-2 sm:gap-5 -translate-y-8 sm:-translate-y-16">
                <div className="text-4xl font-pally bg-pwgray-200/80 px-2 py-1 rounded-lg">
                  {merchantDetails.brandName}
                </div>
                <div className="text-xl font-pally">
                  {merchantDetails.region ? merchantDetails.region : ""}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-end gap-4 items-center sm:mr-10 ml-4 sm:-translate-y-12"></div>
        </div>
        <div className="flex flex-col justify-around">
          <div className="">
            <div className="flex flex-col lg:grid grid-flow-dense grid-cols-3 grid-rows-3 m-4 gap-8">
              <div className="bg-pwgray-100 p-5 rounded-lg shadow col-span-2 row-span-2">
                <div className="text-xl my-2 w-full">Bio</div>
                <div className="text-md">{merchantDetails.bio || "No Bio"}</div>
              </div>
              <div className="bg-pwgray-100 p-5 rounded-lg shadow col-span-1 row-span-1">
                <div className="text-xl my-2 w-full">Contact</div>
                <div className="flex gap-4 items-center my-2">
                  <BsEnvelope size={20} />
                  <div>
                    {merchantDetails.email?.length > 25
                      ? merchantDetails.email.substring(0, 25) + "..."
                      : merchantDetails.email}
                  </div>
                </div>
                <div className="flex gap-4 items-center my-2">
                  <BsPhone size={20} />
                  <div>{merchantDetails.phone}</div>
                </div>
                <div className="flex gap-4 items-center my-2">
                  <BsPinMap size={20} />
                  <div>{merchantDetails.city}</div>
                </div>
              </div>
              {/* <div className=" bg-pwgray-100 p-5 rounded-lg shadow col-span-1 row-span-1">
                <div className="text-xl my-2 w-full">Social</div>
                <div className="">
                  <div className="flex gap-4 items-center my-2">
                    <BsInstagram size={20} />
                    <div>{faker.internet.userName()}</div>
                  </div>
                  <div className="flex gap-4 items-center my-2">
                    <BsGlobe size={20} />
                    <div>example.com</div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
