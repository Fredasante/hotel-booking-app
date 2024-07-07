import googleImage from "../assets/google.webp";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { signInSuccess, signInFailure } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const handleGoogleClick = async () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  try {
    const resultsFromGoogle = await signInWithPopup(auth, provider);
    console.log(resultsFromGoogle);
    const response = await fetch("/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        displayName: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email,
        photoURL: resultsFromGoogle.user.photoURL,
      }),
    });
    const data = await response.json();

    if (response.ok) {
      dispatch(signInSuccess(data));
      navigate("/");
    } else {
      dispatch(signInFailure(data));
    }
  } catch (error) {
    console.log(error);
  }
};

const OAuth = () => {
  return (
    <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-[#003B95] lg:px-8 px-4 py-4">
      <div>
        <h4 className="text-white text-lg font-semibold">
          Create Your Account
        </h4>
        <p className="text-[13px] text-white mt-3 leading-relaxed">
          Welcome to our registration page! Get started by creating your account
          or logging it using google.
        </p>
      </div>

      <div>
        <h4 className="text-white text-lg font-semibold mb-3">
          Login with Google
        </h4>

        <button
          onClick={handleGoogleClick}
          type="button"
          className="w-full py-3 px-4 rounded-md text-blue-700 bg-white focus:outline-none"
        >
          <img src={googleImage} alt="Google logo" />
        </button>
      </div>
    </div>
  );
};

export default OAuth;
