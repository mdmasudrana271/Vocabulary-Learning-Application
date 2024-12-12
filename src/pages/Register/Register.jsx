import { GoogleAuthProvider } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { Helmet } from "react-helmet-async";
import useToken from "../../Hooks/useToken";
import useAdmin from "../../Hooks/useAdmin";

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [signUpError, setSignUPError] = useState("");
  const [userLoginEmail, setUserLoginEmail] = useState("");
  const [token] = useToken(userLoginEmail);
  const [isAdmin] = useAdmin(userLoginEmail);
  const navigate = useNavigate();

  const imageHostKey = import.meta.env.VITE_IMGBB_API_KEY;
  const [passwordType, setPasswordType] = useState("password");
  const googleProvider = new GoogleAuthProvider();
  const { googleLogin, createUser, updateUserProfile } =
    useContext(AuthContext);

  // toggle password type on input field

  const handlePasswordType = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    } else {
      setPasswordType("password");
    }
  };

  useEffect(() => {
    if (token && isAdmin) {
      navigate("/adminDashboard/manageusers");
    } else if (token && !isAdmin) {
      navigate("/userDashboard/lessons");
    }
  }, [token, isAdmin, navigate]);

  const handleSignup = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const createdUser = {
            name: data.name,
            email: data.email,
            role: "user",
            image: imgData.data.url,
          };
          setSignUPError("");
          createUser(data.email, data.password)
            .then((result) => {
              const user = result.user;
              console.log(user);
              toast.success("Create User Successfull");
              const userInfo = {
                displayName: createdUser.name,
                photoURL: createdUser.image,
              };
              updateUserProfile(userInfo)
                .then(() => {
                  saveUser(createdUser);
                })
                .catch((error) => console.log(error));
              reset();
            })
            .catch((error) => {
              console.log(error.message);
              setSignUPError(error.message);
            });
        }
      });
  };

  // login with google

  const handleGoogleLogin = () => {
    googleLogin(googleProvider).then((result) => {
      const user = result.user;
      const createdUser = {
        name: user.displayName,
        email: user.email,
        role: "user",
        image: user.photoURL,
        verified: false,
      };
      saveUser(createdUser);
    });
  };

  // post user information on database

  const saveUser = (createdUser) => {
    fetch("https://vocabulary-app-server.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(createdUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserLoginEmail(createdUser.email);
      });
  };

  return (
    <>
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <div className="card overflow-hidden p-5 lg:w-4/12 md:w-6/12 mx-auto w-full shadow-xl bg-base-100 md:my-5">
        <div>
          <h1 className="text-4xl text-center font-bold">Register</h1>
          <form className="mt-6" onSubmit={handleSubmit(handleSignup)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full"
              />
              {errors.name && (
                <p role="alert" className="text-error">
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: "email is required" })}
                type="email"
                placeholder="Email Address"
                className="input input-bordered w-full"
              />
              {errors.email && (
                <p role="alert" className="text-error">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                {...register("image", { required: "image is required" })}
                type="file"
                className="input input-bordered w-full"
              />
              {errors.img && (
                <p role="alert" className="text-error">
                  {errors.img?.message}
                </p>
              )}
            </div>
            <div className="form-control w-full flex justify-between align-center">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 6,
                    message: "password must be at least 6 characters long",
                  },
                  pattern: {
                    value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
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
              {errors.password && (
                <p className="text-error">{errors.password?.message}</p>
              )}
            </div>
            <p className="text-error">{signUpError}</p>
            <input
              className="btn btn-outline btn-accent w-full mt-5 text-xl font-bold"
              value="Signup"
              type="submit"
            />
            <p className="mt-3 text-center">
              Already have an account ?{" "}
              <Link className="text-blue-700" to="/login">
                Login
              </Link>
            </p>
          </form>
          <div className="divider">OR</div>
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline btn-accent w-full"
          >
            CONTINUE WITH GOOGLE
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
