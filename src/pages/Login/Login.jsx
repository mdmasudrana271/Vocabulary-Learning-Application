import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useToken from "../../Hooks/useToken";
import { AuthContext } from "../../context/AuthProvider";
import { Helmet } from "react-helmet-async";
import useAdmin from "../../Hooks/useAdmin";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const { signIn, resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [userLoginEmail, setUserLoginEmail] = useState("");
  const [token] = useToken(userLoginEmail);

  const [isAdmin] = useAdmin(email);
  const navigate = useNavigate();

  console.log("token: ", token);
  console.log("is admin: ", isAdmin);

  useEffect(() => {
    if (token && isAdmin) {
      navigate("/adminDashboard/manageusers");
    } else if (token && !isAdmin) {
      navigate("/userDashboard/lessons");
    }
  }, [token, isAdmin, navigate]);

  console.log("token: ", token);
  console.log("is amdin: ", isAdmin);

  // toggle password type text to password and toggle eye button
  const [passwordType, setPasswordType] = useState("password");

  const handlePasswordType = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    } else {
      setPasswordType("password");
    }
  };

  const handleLogin = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        setUserLoginEmail(user.email);
        toast.success("Login successfull");
        reset();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleResetPassword = (email) => {
    resetPassword(email);
    toast.success("Password reset email was send please check your email");
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="card overflow-hidden p-5 lg:w-4/12 md:w-6/12 mx-auto w-full shadow-xl bg-base-100 md:my-5">
        <div>
          <h1 className="text-4xl text-center font-bold">Login</h1>
          <form className="mt-6" onSubmit={handleSubmit(handleLogin)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: "email is required" })}
                type="email"
                placeholder="Email Address"
                className="input input-bordered w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p role="alert" className="text-error">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 6,
                    message:
                      "Password must have uppercase, number and special characters",
                  },
                })}
                type={passwordType}
                placeholder="******"
                className="input input-bordered w-full"
              />
              {passwordType === "password" ? (
                <p onClick={handlePasswordType} className=" cursor-pointer">
                  show password
                </p>
              ) : (
                <p onClick={handlePasswordType} className=" cursor-pointer">
                  hide password
                </p>
              )}
              <label className="label mt-1">
                <span
                  onClick={() => handleResetPassword(email)}
                  className="label-text text-blue-700 cursor-pointer"
                >
                  Forgot Password ?
                </span>
              </label>
              {errors.password && (
                <p className="text-error">{errors.password?.message}</p>
              )}
            </div>
            <input
              className="btn btn-info w-full mt-5 text-xl font-bold"
              value="Login"
              type="submit"
            />
            <p className="mt-3 text-center">
              New to this site ?{" "}
              <Link className="text-blue-700" to="/signup">
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
