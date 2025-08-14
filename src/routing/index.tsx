import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const Routing = () => {
  return <RouterProvider {...{ router }} />;
};

export default Routing;
