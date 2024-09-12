import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ErrorPopup from "../components/ErrorPopup";
import loading from "../components/loading";
import { useEffect } from "react";
import SuccessPopup from "../components/Success";

function App() {
  const { isSuccessful, isError, isLoading, errorMessage } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (isError) {
      ErrorPopup(errorMessage);
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccessful) {
      SuccessPopup();
    }
  }, [isSuccessful]);

  return (
    <>
      {loading(isLoading)}
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
