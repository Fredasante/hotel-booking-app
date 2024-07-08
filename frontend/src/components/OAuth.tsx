import googleImage from "../assets/google.webp";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useGoogleLogin } from "../api/UserApi";
import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
};

const OAuth = ({ title }: Props) => {
  const auth = getAuth(app);
  const { googleLogin } = useGoogleLogin();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL } = resultsFromGoogle.user;

      if (!displayName || !email) {
        throw new Error("Google login failed");
      }
      await googleLogin({ displayName, email, photoURL });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-[#003B95] lg:px-8 px-4 py-4">
      <div>
        <h4 className="text-white font-semibold mb-3 text-center">{title}</h4>

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
