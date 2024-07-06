import { useForm } from "react-hook-form";
import RegisterAccountInfo from "../components/RegisterAccountInfo";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUser } from "../api/UserApi";

export type RegisterFormData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const { registerUser, isLoading } = useRegisterUser();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    await registerUser(data);
    navigate("/");
  });

  return (
    <div className=" max-w-4xl flex items-center justify-center min-h-[70vh] xl:min-h-[95vh] mx-auto p-5 md:p-10">
      <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
        <RegisterAccountInfo />

        <form
          onSubmit={onSubmit}
          className="md:col-span-2 w-full py-6 px-6 sm:px-16"
        >
          <div className="mb-6">
            <h3 className="text-2xl font-bold">Create an account</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                First Name
              </label>
              <div className="relative flex items-center">
                <input
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter first name"
                />
              </div>
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Last Name
              </label>
              <div className="relative flex items-center">
                <input
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter last name"
                />
              </div>
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>

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

            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <input
                  {...register("confirmPassword", {
                    validate: (val) => {
                      if (!val) {
                        return "Password is required";
                      } else if (watch("password") !== val) {
                        return "Passwords do not match";
                      } else {
                        return true;
                      }
                    },
                  })}
                  type="password"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Confirm password"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="!mt-12 w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none"
          >
            {isLoading ? "Loading..." : "Create an account"}
          </button>
          <p className="text-gray-800 text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline ml-1"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
