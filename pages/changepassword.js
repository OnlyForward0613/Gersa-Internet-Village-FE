import Auth from "../components/Auth";
import ChangePassword from "../components/ChangePassword";

const changepassword = ({ pageProps }) => {
  return (
    <Auth>
      <ChangePassword {...pageProps} />
    </Auth>
  );
};

export default changepassword;
