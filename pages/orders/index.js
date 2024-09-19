import Orders from "../../components/Orders";
import Homepage from "../../components/Homepage";

const orders = ({ pageProps }) => {
  return (
    <Homepage>
      <Orders {...pageProps} />
    </Homepage>
  );
};

export default orders;
