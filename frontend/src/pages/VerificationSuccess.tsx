import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { toast } from "sonner";
import { useVerifyEmail } from "../api/UserApi";

const VerificationSuccess = () => {
  const { search } = useLocation();
  const { verifyEmailToken } = useVerifyEmail();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get("token");

    if (token) {
      verifyEmailToken(token)
        .then(() => {
          setIsVerified(true);
        })
        .catch((error: any) => {
          toast.error(error.message || "Verification failed");
        });
    } else {
      toast.error("No verification token found");
    }
  }, [search, verifyEmailToken]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="max-w-md w-full flex flex-col justify-center items-center bg-white p-8 rounded shadow-lg">
        {isVerified ? (
          <>
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Verification Successful!
            </h2>
            <p className="text-gray-700 mb-4">
              Your email has been successfully verified.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Verifying Your Email...
            </h2>
            <p className="text-gray-700 mb-4">
              Please wait while we verify your email address.
            </p>
          </>
        )}
        <Link to="/login">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VerificationSuccess;
