import Auth from "../components/Auth";
import Onboarding from "../components/Onboarding";

const onboarding = ({ pageProps }) => {
  return (
    <Auth>
      <Onboarding {...pageProps} />
    </Auth>
  );
};

export default onboarding;
