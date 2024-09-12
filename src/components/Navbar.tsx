import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store/store";
import { nullifyUserData, successLogOut } from "../reducers/user/userSlice";
import { nullifyItem } from "../reducers/item/itemSlice";

export default function Navbar() {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(successLogOut());
    dispatch(nullifyUserData());
    dispatch(nullifyItem());
  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" to="/">
          Inventory
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {isLoggedIn ? (
            <li>
              <details>
                <summary>Profile</summary>
                <ul className="bg-base-100 rounded-t-none p-2 z-10">
                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                </ul>
              </details>
            </li>
          ) : (
            <>
              <li>
                <Link to="/auth/signIn">Login</Link>
              </li>
              <li>
                <Link to="/auth/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
