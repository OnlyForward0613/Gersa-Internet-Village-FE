import { useRouter } from "next/router";
import FormInput from "./FormInput";
import Button from "./Button";
import { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";

const ForgotPassword = ({ ...pageProps }) => {
  const { baseURL } = pageProps;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [invalid, setInvalid] = useState(false);

  const invalidClass =
    "text-lg font-pally m-2 text-pwdanger-300 opacity-100 transition ease-in-out duration-500";

  return (
    <>
      <h3 className="mt-2 text-4xl font-excon flex justify-center">
        Forgot Password
      </h3>
      <p className="text-lg font-pally mb-2 flex justify-center">
        Enter the email associated with your account
      </p>
      <div className="mb-40 mt-10 flex flex-col gap-3 items-center">
        <FormInput type={"email"} name="Email" setEmail={setEmail} />
        <div
          className={
            invalid
              ? invalidClass
              : "opacity-0 transition ease-in-out duration-500"
          }
        >
          Invalid Email
        </div>

        <span
          onClick={() => {
            if (email) {
              trackPromise(
                fetch(`${baseURL}/merchant/forgotPassword`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    login: email,
                  }),
                })
                  .then((res) => {
                    res.json().then((data) => {
                      if (data.success == false) {
                        setInvalid(true);
                      } else {
                        setInvalid(false);
                        localStorage.setItem(
                          "pwmerchant",
                          JSON.stringify(data)
                        );

                        if (
                          localStorage.getItem("pwmerchant") ===
                          JSON.stringify(data)
                        ) {
                          const merchant = JSON.parse(
                            localStorage.getItem("pwmerchant")
                          );

                          router.push(
                            {
                              pathname: "/verifyemail",
                              query: {
                                source: "/otp/forgotPassword",
                                destination: "/changepassword",
                                id: merchant.merchantId,
                                otpId: merchant.otpId,
                              },
                            },
                            `/verifyemail/${merchant.merchantId.substring(
                              0,
                              4
                            )}`
                          );
                        }
                      }
                    });
                  })
                  .catch((error) => console.log(`${error}`))
              );
            }
          }}
        >
          <Button size={"lg"} text={"Submit"} />
        </span>
      </div>
    </>
  );
};

export default ForgotPassword;
