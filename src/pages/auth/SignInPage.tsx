import { useDispatch } from "react-redux";
import { signInUser } from "../../reducers/user/userSlice";
import { useState } from "react";
import InputBar from "../../components/InputBar";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    if (email == "") {
      setError("Email is Empty!");
    } else if (password == "") {
      setError("Password is Empty!");
    } else {
      let user = {
        email: email,
        password: password,
      };
      try {
        dispatch(signInUser(user));
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  function handleEmailChange(newEmail: string) {
    setEmail(newEmail);
  }

  function handlePasswordChange(newPassword: string) {
    setPassword(newPassword);
  }

  return (
    <>
      <div className="h-[50vh] flex justify-center items-center px-20">
        <div className="bg-white shadow-lg rounded">
          <div className="w-[410px]">
            <div className="bg-black">
              <h1 className="flex justify-center items-center text-white text-3xl h-[3rem]">
                Login
              </h1>
            </div>
            <form className="p-8 pt-3">
              <InputBar
                colorWhite={false}
                labelName="Email"
                handleChange={handleEmailChange}
              />
              <InputBar
                colorWhite={false}
                labelName="Password"
                handleChange={handlePasswordChange}
              />
              <div className="flex">
                <button
                  className="btn-ghost mt-5 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 duration-100"
                  type="submit"
                  onClick={handleSignIn}
                >
                  Submit
                </button>
                <label
                  className={`${
                    error === "" ? "hidden" : "block"
                  } text-red-500 text-xs mt-8 ml-5`}
                >
                  {error}
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
