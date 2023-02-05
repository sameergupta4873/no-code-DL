
import "../styles/globals.css";
import { wrapper, store } from "../store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
<div className="bg-[#fafafa] dark:bg-[#111111]"></div>