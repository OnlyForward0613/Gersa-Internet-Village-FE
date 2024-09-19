import Account from "../components/Account";
import Homepage from "../components/Homepage";

const account = ({ pageProps }) => {
  return (
    <Homepage>
      <Account {...pageProps} />
    </Homepage>
  );
};

export default account;
