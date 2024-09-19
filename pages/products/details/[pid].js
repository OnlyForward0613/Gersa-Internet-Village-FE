import Homepage from "../../../components/Homepage";
import ProductDetails from "../../../components/ProductDetails";

const productdetails = ({ ...pageProps }) => {
  return (
    <Homepage>
      <ProductDetails {...pageProps} />
    </Homepage>
  );
};

export default productdetails;
