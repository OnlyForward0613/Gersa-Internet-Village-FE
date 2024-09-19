import React, { useEffect, useState, useRef } from "react";
import FormInput from "../components/FormInput";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { trackPromise } from "react-promise-tracker";

const Register = ({ ...pageProps }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [missingValue, setMissingValue] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [conflict, setConflict] = useState(false);
  const ref = useRef(null);
  const router = useRouter();
  const { baseURL, merchant, setMerchant } = pageProps;

  useEffect(() => {
    if (authenticated) {
      // router.push("/verifyemail");
      router.push("/verifyemail", `/verifyemail/${merchant.id}`, {
        query: { id: merchant.id, otpId: false },
      });
    }
  });

  return (
    <div className="top-9 relative">
      <h3 className="mt-2 text-4xl font-excon flex justify-center">
        Create your account
      </h3>
      <p className="text-lg font-pally mb-2 flex justify-center">
        It&apos;s free and easy.
      </p>
      <form action="/" method="POST">
        <div className="flex flex-col">
          <div
            className={
              missingValue
                ? "text-lg font-pally m-2 text-pwdanger-300 opacity-100 transition ease-in-out duration-500"
                : "opacity-0 transition ease-in-out h-0 duration-500"
            }
          >
            Please provide a valid email and password
          </div>
          <div
            className={
              conflict
                ? "text-lg font-pally m-2 text-pwdanger-300 opacity-100 transition ease-in-out duration-500"
                : "opacity-0 transition ease-in-out w-0 h-0 duration-500"
            }
          >
            This email has already been used. Click{" "}
            <span className="text-pwinfo-300 hover:underline">
              <Link href={"/signin"}>here</Link>
            </span>{" "}
            to sign in.
          </div>
          <FormInput name={"Email"} type={"email"} setEmail={setEmail} />
          <FormInput
            buttonRef={ref}
            name={"Password"}
            type={"password"}
            setPassword={setPassword}
          />
          <FormInput
            buttonRef={ref}
            name={"Confirm Password"}
            type={"password"}
            setPassword={setConfirmPassword}
          />
          <div
            className={
              passwordMismatch
                ? "text-lg font-pally -mt-2 mb-2 ml-2 text-pwdanger-300 opacity-100 transition ease-in-out duration-500"
                : "opacity-0 transition ease-in-out duration-500"
            }
          >
            Passwords do not match
          </div>
          <Checkbox
            label={
              <p
                className={
                  !accepted
                    ? "ml-4 mr-11 -my-2 font-pally text-pwdanger-300 w-60"
                    : "ml-4 mr-11 -my-2 font-pally w-60"
                }
              >
                I have read and agreed to the{" "}
                <a href="/terms" className={"text-pwinfo-300"}>
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy" className={"text-pwinfo-300"}>
                  Privacy Policy
                </a>
              </p>
            }
            setAccepted={setAccepted}
            isChecked={accepted}
          />
          <div className="w-full mt-8 flex">
            <span
              ref={ref}
              className=" w-fit flex mx-auto"
              onClick={() => {
                setPasswordMismatch(false);
                setMissingValue(false);
                setConflict(false);

                if (password !== confirmPassword) {
                  setPasswordMismatch(true);
                } else {
                  setPasswordMismatch(false);

                  if (
                    email === undefined ||
                    email === "" ||
                    password === undefined ||
                    password === ""
                  ) {
                    setMissingValue(true);
                  } else {
                    setMissingValue(false);
                  }

                  if (
                    accepted &&
                    email !== undefined &&
                    password !== undefined &&
                    email !== "" &&
                    password !== ""
                  ) {
                    trackPromise(
                      fetch(`${baseURL}/merchant`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          email: email,
                          password: password,
                        }),
                      })
                        .then((res) => {
                          res.json().then((data) => {
                            if (data.success == false) {
                              setConflict(true);
                            } else {
                              setMerchant(data);

                              router.push(
                                {
                                  pathname: "/verifyemail",

                                  query: {
                                    source: "/otp/verifyMerchant",
                                    destination: "/onboarding",
                                    id: merchant.merchantId,
                                    otpId: merchant.otpId,
                                    email: email,
                                    password: password,
                                  },
                                },
                                `/verifyemail/${merchant.merchantId?.substring(
                                  0,
                                  4
                                )}`
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
              <Button size={"lg"} text={"register"} />
            </span>
          </div>
          <p className="font-pally mx-auto mb-40">
            Already have an account?{" "}
            <Link href="/signin">
              <a className="text-pwinfo-300 cursor-pointer">Sign In</a>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
