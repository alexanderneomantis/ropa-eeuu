import {Outlet} from "react-router-dom";
//
import Footer from "./Footer";
import Header from "./Header";
import GlobalSnackbar from "../../components/GlobalSnackbar";

// ----------------------------------------------------------------------

export default function MainLayout() {
  return (
    <>
      <Header/>
      <Outlet/>
      <GlobalSnackbar />
      <Footer/>
    </>
  );
}
