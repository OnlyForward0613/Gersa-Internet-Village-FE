import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import FormInput from "./FormInput";
import Button from "./Button";
import { trackPromise } from "react-promise-tracker";

const SignIn = ({ ...pageProps }) => {
  const [formInput, setFormInput] = useState({ name: "Email", type: "email" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [invalid, setInvalid] = useState(false);
  const ref = useRef(null);
  const router = useRouter();
  const {
    products,
    setProducts,
    orders,
    setOrders,
    merchant,
    setMerchant,
    categories,
    setCategories,
    baseURL,
    token,
    setToken,
  } = pageProps;

  useEffect(() => {
    if (merchant?.email) {
      setEmail(merchant.email);
    }
  }, [setEmail, merchant.email]);

  return (
    <div className="top-9 relative">
      <h3 className="mt-2 text-4xl font-excon flex justify-center">
        Welcome Back!
      </h3>
      <p className="text-lg font-pally mb-2 flex justify-center">
        Let&apos;s get you back into your account.
      </p>
      <form action="/" method="POST" className="-mt-5">
        {/* <SegmentedControl setFormInput={setFormInput} /> */}
        <div className="flex flex-col">
          <div
            className={
              invalid
                ? "text-lg font-pally m-2 text-pwdanger-300 opacity-100 transition ease-in-out duration-500 mt-8"
                : "opacity-0 transition ease-in-out duration-500"
            }
          >
            Invalid email/phone or password
          </div>
          <FormInput
            name={"Email"}
            type={"email"}
            setEmail={setEmail}
            value={email}
            setPhone={setPhone}
          />
          <FormInput
            buttonRef={ref}
            name={"Password"}
            type={"password"}
            setPassword={setPassword}
          />
          <Link href="/forgotpassword">
            <a className="font-pally cursor-pointer text-pwinfo-300 ml-2 -mt-1">
              Forgot Password?
            </a>
          </Link>
          <div className="w-full mt-8 flex">
            <span
              ref={ref}
              className=" w-fit flex mx-auto"
              onClick={() => {
                setInvalid(false);

                trackPromise(
                  fetch(`${baseURL}/merchant/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      login: email,
                      password: password,
                    }),
                  })
                    .then((res) => {
                      res.json().then((data) => {
                        if (!data.token) {
                          if (data.message == "User not Verified") {
                            fetch(`${baseURL}/merchant/resendOtp`, {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                merchantId: router.query.id,
                              }),
                            })
                              .then((res) => {
                                res.json().then((data) => {
                                  setMerchant(data);

                                  setOtpSent(true);
                                  setTimeLeft(60);
                                });
                              })
                              .catch((error) => console.log(`${error}`));
                          } else {
                            setInvalid(true);
                          }
                        } else {
                          setInvalid(false);

                          setToken(data.token);
                          localStorage.setItem(
                            "pwmerchantToken",
                            JSON.stringify(data.refreshToken)
                          );

                          fetch(`${baseURL}/merchant/${data.merchantId}`, {
                            method: "GET",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${data.token}`,
                            },
                          })
                            .then((res2) => {
                              res2.json().then((data2) => {
                                localStorage.setItem(
                                  "pwmerchantID",
                                  JSON.stringify(data2.merchant.id)
                                );
                                setMerchant(data2.merchant);

                                if (data2.merchant.brandName) {
                                  router.push("/");
                                } else {
                                  router.push("/onboarding");
                                }
                              });
                            })
                            .catch((error) => console.log(error));
                        }
                      });
                    })
                    .catch((error) => console.log(error))
                );
              }}
            >
              <Button size={"lg"} text={"sign in"} />
            </span>
          </div>
          <p className="font-pally mx-auto mb-52">
            Don&apos;t have an account?{" "}
            <Link href="/register">
              <a className="text-pwinfo-300 cursor-pointer">Register</a>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
