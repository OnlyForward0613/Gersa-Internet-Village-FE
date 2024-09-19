import Register from "../components/Register";
import Auth from "../components/Auth";

const register = ({ pageProps }) => {
  return (
    <Auth>
      <Register {...pageProps} />
    </Auth>
  );
};

export default register;
