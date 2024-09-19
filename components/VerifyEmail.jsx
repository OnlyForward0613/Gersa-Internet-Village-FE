import { useRouter } from "next/router";
import FormInput from "./FormInput";
import Button from "./Button";
import { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";

const VerifyEmail = ({ ...pageProps }) => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [verified, setVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);
  const { baseURL, merchant, setMerchant, setToken } = pageProps;
  const invalidClass =
    "text-lg font-pally m-2 text-pwdanger-300 opacity-100 transition ease-in-out duration-500";
  const verifiedClass =
    "text-lg font-pally m-2 text-pwsuccess-300 opacity-100 transition ease-in-out duration-500";
  const sentClass =
    "text-lg font-pally mb-2 -mt-2 flex text-center text-pwgray-400";
  const resendClass =
    "text-lg font-pally mb-2 -mt-2 flex text-center text-pwinfo-300 pointer";

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timeLeft > 0 && otpSent) {
        setTimeLeft(timeLeft--);
      } else {
        setOtpSent(false);
      }
    }, 500);

    return () => clearInterval(countdown);
  }, [timeLeft, otpSent]);

  return (
    <div className="top-9 relative">
      <h3 className="mt-2 text-4xl font-excon flex justify-center">
        Verify Email
      </h3>
      <p className="text-lg font-pally mb-2 flex justify-center">
        Enter the OTP code sent to {router.query.email}
      </p>
      <div className="mb-40 mt-10 flex flex-col gap-3 items-center">
        <FormInput type={"otp"} name="otp" setOtp={setOtp} />
        <div
          className={
            invalid
              ? invalidClass
              : verified
              ? verifiedClass
              : "opacity-0 transition ease-in-out duration-500"
          }
        >
          {invalid ? "Invalid OTP" : verified ? "OTP Verified" : ""}
        </div>

        <span
          onClick={() => {
            if (otp) {
              trackPromise(
                fetch(`${baseURL}${router.query.source}`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body:
                    router.query.source == "/otp/forgotPassword"
                      ? JSON.stringify({
                          merchantId: merchant.merchantId,
                          otpId: merchant.otpId,
                          otp: otp,
                          type: "merchant",
                        })
                      : router.query.source == "/otp/verifyMerchant"
                      ? JSON.stringify({
                          merchantId: merchant.merchantId,
                          otpId: merchant.otpId,
                          otp: otp,
                        })
                      : "",
                })
                  .then((res) => {
                    res.json().then((data) => {
                      if (data.success == false) {
                        setInvalid(true);
                      } else {
                        setVerified(true);
                        setToken(data.token);
                        setTimeout(() => {
                          router.push(
                            {
                              pathname: `${router.query.destination}`,
                              query: {
                                source: "/merchant/resetPassword",
                                destination: "/signin",
                              },
                            },
                            router.query.source === "/otp/forgotPassword"
                              ? "/changePassword"
                              : router.query.source === "/otp/verifyMerchant"
                              ? "/onboarding"
                              : ""
                          );
                        }, 3000);
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
        <p
          className={otpSent ? sentClass : resendClass}
          onClick={() => {
            if (!otpSent && timeLeft <= 1) {
              trackPromise(
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
                  .catch((error) => console.log(`${error}`))
              );
            }
          }}
        >
          {otpSent ? `Resend OTP...  ${timeLeft}s` : "Resend OTP"}
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
