import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginUser } from "../api/UserApi";
import OAuth from "../components/OAuth";

export type LoginAccountData = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginAccountData>();

  const { loginUser, isLoading } = useLoginUser();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginAccountData) => {
    await loginUser(data);
    navigate("/");
  };
  return (
    <div className=" max-w-4xl flex items-center justify-center min-h-[70vh] xl:min-h-[85vh] mx-auto p-5 md:p-10">
      <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
        <OAuth title="Sign in with google" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:col-span-2 w-full py-6 px-6 sm:px-16"
        >
          <div className="mb-6">
            <h3 className="text-2xl font-bold">Sign In</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email</label>
              <div className="relative flex items-center">
                <input
                  {...register("email", {
                    required: "Email Address is required",
                  })}
                  type="email"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter email address"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  type="password"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter password"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="!mt-12 w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
          <p className="text-gray-800 text-sm mt-6 text-center">
            Don&apos;t an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline ml-1"
            >
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
