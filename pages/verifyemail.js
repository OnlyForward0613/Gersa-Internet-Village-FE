import Auth from "../components/Auth";
import VerifyEmail from "../components/VerifyEmail";

const verifyemail = ({ ...pageProps }) => {
  return (
    <Auth>
      <VerifyEmail {...pageProps} />
    </Auth>
  );
};

export default verifyemail;
