import Button from "./Button";
import { useRouter } from "next/router";
import { BsDot, BsTrash } from "react-icons/bs";
import FormInput from "./FormInput";
import React, { useState } from "react";
import { trackPromise } from "react-promise-tracker";

const ChangePassword = ({ ...pageprops }) => {
  const [newPassword, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [missingValue, setMissingValue] = useState(false);
  const [reset, setReset] = useState(false);
  const { baseURL, token } = pageprops;
  const router = useRouter();

  return (
    <>
      <div className="h-screen mx-auto">
        <div className="flex justify-between">
          <h3 className="my-2 flex justify-center text-4xl font-excon">
            Change Password
          </h3>
        </div>
        <div className="flex flex-col">
          {router.query.source !== undefined &&
          router.query.source == "/merchant/changeOldPassword" ? (
            <FormInput
              name={"Old Password"}
              type={"password"}
              setPassword={setOldPassword}
            />
          ) : (
            ""
          )}
          <FormInput
            name={"New Password"}
            type={"password"}
            setPassword={setPassword}
          />
          <FormInput
            name={"Confirm Password"}
            type={"password"}
            setPassword={setConfirmPassword}
          />

          <div
            className={
              passwordMismatch || missingValue
                ? "text-lg font-pally  -mt-2 mb-2 ml-2 text-pwdanger-300 opacity-100 transition ease-in-out duration-500"
                : reset
                ? "text-lg font-pally  -mt-2 mb-2 ml-2 text-pwsuccess-300 opacity-100 transition ease-in-out duration-500"
                : "opacity-0 transition ease-in-out duration-500"
            }
          >
            {passwordMismatch
              ? "Passwords do not match"
              : missingValue
              ? "Please provide all passwords"
              : reset
              ? "Password Changed Successfully"
              : ""}
          </div>

          <div className="bg-pwgray-100 font-pally p-4 my-4 mx-1 rounded-lg shadow">
            <div className="text-xl">Use a secure password with:</div>
            <div className="flex items-center">
              <BsDot size={40} color="#f07016" />
              <div>At least 8 characters</div>
            </div>
            <div className="flex items-center">
              <BsDot size={40} color="#f07016" />
              <div>At least one uppercase and lowercase letter</div>
            </div>
            <div className="flex items-center">
              <BsDot size={40} color="#f07016" />
              <div>At least one special character</div>
            </div>
            <div className="flex items-center">
              <BsDot size={40} color="#f07016" />
              <div>Do not reuse old passwords</div>
            </div>
            <div className="flex items-center">
              <BsDot size={40} color="#f07016" />
              <div>Do not use passwords from other sites</div>
            </div>
          </div>
          <span
            onClick={() => {
              if (newPassword !== confirmPassword) {
                setPasswordMismatch(true);
              } else {
                setPasswordMismatch(false);

                if (
                  confirmPassword === undefined ||
                  confirmPassword === "" ||
                  newPassword === undefined ||
                  newPassword === ""
                ) {
                  setMissingValue(true);
                } else {
                  setMissingValue(false);
                }

                if (
                  confirmPassword !== undefined &&
                  newPassword !== undefined &&
                  confirmPassword !== "" &&
                  newPassword !== "" &&
                  router.query.source !== undefined &&
                  router.query.destination !== undefined
                ) {
                  const merchantToken = token;

                  trackPromise(
                    fetch(`${baseURL}${router.query?.source}`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${merchantToken}`,
                      },
                      body:
                        router.query?.source === "/merchant/resetPassword"
                          ? JSON.stringify({
                              password: newPassword,
                            })
                          : router.query?.source ===
                            "/merchant/changeOldPassword"
                          ? JSON.stringify({
                              oldPassword: oldPassword,
                              newPassword: newPassword,
                            })
                          : "",
                    })
                      .then((res) => {
                        res.json().then((data) => {
                          // console.log(data);
                          if (data.success === true) {
                            setReset(true);
                            setTimeout(() =>
                              router.push({
                                pathname: router.query?.destination,
                              })
                            );
                          }
                        });
                      })
                      .catch((error) => console.log(`${error}`))
                  );
                }
              }
            }}
          >
            <Button size={"lg"} text={"Save Changes"} />
          </span>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
