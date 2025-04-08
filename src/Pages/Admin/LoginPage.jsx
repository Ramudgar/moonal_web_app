import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/auth/authSlice";
import { handleApiCall } from "../../Utils/handleApiCall";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    handleApiCall({
      loadingMsg: "Logging in...",
      successMsg: "Welcome back!",
      errorMsg: "Login failed. Please check your credentials.",
      apiFunc: () => dispatch(loginUser(formData)).unwrap(),
      onSuccess: () => {
        navigate("/dashboard"); // or wherever you want
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-md p-8 rounded-xl shadow-xl border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-[#001F3F] mb-6 text-center">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001F3F]"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Must be at least 6 characters",
                },
              })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001F3F]"
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#001F3F] text-white py-3 rounded-lg hover:bg-orange-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Forgot your password?{" "}
          <a href="#" className="text-orange-700 hover:text-orange-900">
            Reset here
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginForm;
