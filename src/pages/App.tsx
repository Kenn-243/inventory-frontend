import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";

function App() {
  const { isLoading, isError } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const modal = document.getElementById("my_modal") as HTMLDialogElement;
    if (isError && modal) {
      modal.showModal();
    }
  }, [isError]);

  return (
    <>
      <div
        className={`${
          isLoading ? "block" : "hidden"
        } inset-0 bg-base-300 bg-opacity-50 z-10 pointer-events-auto flex justify-center w-screen h-screen align-center absolute`}
      >
        <span className={"loading loading-dots loading-lg z-10"}></span>
      </div>

      <div className={`${isError ? "block" : "hidden"}`}>
        <dialog id="my_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Error!</h3>
            <p className="py-4">
              An Error Occured While Processing Your Request
            </p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
