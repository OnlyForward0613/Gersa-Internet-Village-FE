import Auth from "../components/Auth";
import ForgotPassword from "../components/ForgotPassword";

const verifyemail = ({ ...pageProps }) => {
  return (
    <Auth>
      <ForgotPassword {...pageProps} />
    </Auth>
  );
};

export default verifyemail;
