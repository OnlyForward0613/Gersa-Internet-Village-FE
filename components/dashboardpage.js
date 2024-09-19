import Homepage from "./Homepage";
import Dashboard from "./Dashboard";

const dashboard = ({ pageProps }) => {
  return (
    <Homepage>
      <Dashboard {...pageProps} />
    </Homepage>
  );
};

export default dashboard;
