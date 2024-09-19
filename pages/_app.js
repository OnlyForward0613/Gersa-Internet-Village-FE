import "../styles/globals.css";
import "react-tooltip/dist/react-tooltip.css";
import { usePromiseTracker } from "react-promise-tracker";
import { SpinnerCircularFixed } from "spinners-react";
import { AppWrapper } from "../context/state";
import { ProSidebarProvider } from "react-pro-sidebar";

const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <div className="flex bottom-10 right-0 m-1 fixed z-50 bg-pwgray-100 rounded-full p-2 shadow">
        <SpinnerCircularFixed
          size={30}
          thickness={180}
          speed={180}
          color="#006872"
          secondaryColor="#ffffff"
        />
      </div>
    )
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AppWrapper>
        <LoadingIndicator />
        {/* <div className={promiseInProgress ? "brightness-75 overflow-hidden" : ""}> */}
        <ProSidebarProvider>
          <Component {...pageProps} />
        </ProSidebarProvider>
        {/* </div> */}
      </AppWrapper>
    </>
  );
}

export default MyApp;
