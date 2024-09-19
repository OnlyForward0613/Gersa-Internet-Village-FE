import Homepage from "../components/Homepage";
import Settings from "../components/Settings";

const settings = ({ pageProps }) => {
  return (
    <Homepage>
      <Settings {...pageProps} />
    </Homepage>
  );
};

export default settings;
