import Homepage from "../../components/Homepage";
import Products from "../../components/Products";

const products = ({ pageProps }) => {
  return (
    <Homepage>
      <Products {...pageProps} />
    </Homepage>
  );
};

export default products;
