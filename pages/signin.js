import Auth from "../components/Auth";
import SignIn from "../components/SignIn";

const signin = ({ pageProps }) => {
  return (
    <Auth>
      <SignIn {...pageProps} />
    </Auth>
  );
};

export default signin;
