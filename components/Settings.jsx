import Button from "./Button";
import { BsTrash } from "react-icons/bs";
import FormInput from "./FormInput";
import { useEffect, useState } from "react";
import SmallImage from "./SmallImage";
import { trackPromise } from "react-promise-tracker";
import Link from "next/link";
import { useRouter } from "next/router";

const Settings = ({ ...pageProps }) => {
  const { merchant, baseURL, setMerchant, token } = pageProps;
  const [brandImage, setBrandImage] = useState([]);
  const [email, setEmail] = useState(merchant.email);
  const [phone, setPhone] = useState(merchant.phone || "");
  const [brandName, setBrandName] = useState(merchant.brandName);
  const [regionName, setRegionName] = useState(
    merchant.region ? merchant.region : ""
  );
  const [bio, setBio] = useState(merchant.bio ? merchant.bio : "");
  const [city, setCity] = useState(merchant.city ? merchant.city : "");
  const [updated, setUpdated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!merchant || !token) {
      router.push("/signin");
    }
    if (merchant?.profile !== undefined) {
      trackPromise(
        fetch(merchant?.profile).then((res) =>
          res
            .blob()
            .then((data) =>
              setBrandImage([
                new File([data], "image.jpg", { type: data.type }),
              ])
            )
        )
      );
    }
  }, [merchant.profile, router, merchant, token]);

  return (
    <>
      <div className="h-full flex flex-col items-center">
        <div className="sm:w-[500px] w-full">
          <div className="flex justify-between gap-10 ">
            <h3 className="mt-2 sm:w-[120%] text-4xl font-excon ml-2">
              Settings
            </h3>
            <div
              className="flex my-auto"
              onClick={() => {
                setPhone(merchant.phone || "");
                setBrandName(merchant.brandName || "");
                setBio(merchant.bio || "");
                setCity(merchant.city || "");
              }}
            >
              <Button
                icon={<BsTrash />}
                mode={"delete"}
                text="Discard Changes"
              />
            </div>
          </div>
          <div className="grid grid-flow-row grid-cols-3 gap-10 sm:flex sm:flex-row sm:flex-wrap m-2 h-fit">
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
          <div className="flex flex-col">
            <FormInput
              name={"Email"}
              type={"email"}
              value={email}
              setEmail={setEmail}
              readOnly={true}
            />
            <FormInput name={"Password"} type={"password"} readOnly={true} />
            <div
              onClick={() => {
                router.push(
                  {
                    pathname: "/changepassword",
                    query: {
                      source: "/merchant/changeOldPassword",
                      destination: "/settings",
                    },
                  },
                  "/changepassword"
                );
              }}
            >
              <a className="font-pally text-pwinfo-300 cursor-pointer ml-2 -mt-2">
                Change Password
              </a>
            </div>
            <FormInput
              name={"Phone"}
              type={"tel"}
              value={phone}
              setPhone={setPhone}
            />
            <FormInput
              name={"Brand Name"}
              type={"text"}
              value={brandName}
              setBrandName={setBrandName}
            />
            <FormInput
              name="Bio"
              type={"textarea"}
              value={bio}
              setValue={setBio}
            />
            <div className="z-99 h-content">
              <FormInput
                name="Region"
                type={"select"}
                regionName={regionName}
                setRegionName={setRegionName}
                options={[{ value: "Greater Accra", label: "Greater Accra" }]}
              />
            </div>
            <div className="z-99 h-content">
              <FormInput
                name="City"
                type={"select"}
                status={city}
                regionName={regionName?.value}
                setStatus={setCity}
                options={[{ value: "Greater Accra", label: "Greater Accra" }]}
              />
            </div>
            {/* <FormInput name="Instagram" type={"text"} />
          <FormInput name="Website" type={"text"} /> */}

            <span
              className="mx-auto flex w-fit h-14 my-8 mb-10"
              onClick={() => {
                const merchantToken = token;

                const tempMerchant = {
                  profile: brandImage[0],
                  region: regionName.value,
                  city: city.value,
                  phone,
                  brandName,
                  bio,
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
                        setMerchant(data.merchantUpdate);
                        setUpdated(true);
                        setTimeout(() => {
                          setUpdated(false);
                        }, 5000);
                      });
                    })
                    .catch((error) => console.error(error))
                );
              }}
            >
              <Button size={"lg"} text={"Save Changes"} />
            </span>
            {updated ? (
              <div className="text-lg font-pally mb-2 -mt-5 flex text-center m-auto text-pwsuccess-300">
                Updated Successfully
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
