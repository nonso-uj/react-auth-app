import { Link, useNavigate } from "react-router";
import { useState } from "react";
import "./assets/page-auth.css";
import { AuthLinks } from "./utils/Routes";
import axios from "axios";
import { AUTH_URL } from "../../redux/urls";
import { useFormik } from "formik";
import { signInSchema } from "./utils/ValidationSchema";
import { useAppDispatch } from "../../redux/hooks";
import { updateUser } from "./_redux/userSlice";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode, JwtPayload } from "jwt-decode";
import BASE_URL from "./_redux/axios";

interface GoogleJwtPayload extends JwtPayload {
  googleId: string;
  email: string;
  given_name: string;
  family_name: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      email: "user.test@email.com",
      password: "test@Us3r",
    },
    validationSchema: signInSchema,
    onSubmit: (values) => {
      setAuthError("");
      loginUser(values);
    },
  });

  const loginUser = (items: any) => {
    setLoading(true);
    BASE_URL.post(AUTH_URL + "/auth/login", { ...items })
      .then((response) => {
        dispatch(updateUser({ ...response?.data }));
        console.log("first res=== ", response);
        navigate("/");
      })
      .catch((error) => {
        setAuthError(error.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container-xxl auth-container">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="app-brand">
          <Link to="/" className="app-brand-link gap-2">
            <span className="app-brand-logo demo">
              <h3 className="logo-h3">
                Neureus
                <br />
                Solutions
              </h3>
            </span>
          </Link>
        </div>

        <div className="authentication-inner">
          <div className="card">
            <div className="card-body">
              <h2 className="mb-2">Welcome Back!</h2>
              <p className="mb-4 card-p small">
                Log into your Neureus Solutions account
              </p>

              <div id="formAuthentication" className="mb-3">
                <div className="mb-1">
                  <label htmlFor="email" className="form-label">
                    Email*
                  </label>

                  <input
                    type="email"
                    className="form-control form-email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={handleChange}
                  />

                  <span
                    id="error"
                    className="text-center eerror mt-2 small text-danger"
                  >
                    {errors?.email}
                  </span>
                </div>

                <div className="mb-1 form-password-toggle">
                  <label className="form-label" htmlFor="password">
                    Password*
                  </label>

                  <div className="input-group input-group-merge">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="Create a password"
                      aria-describedby="password"
                      value={values.password}
                      onChange={handleChange}
                    />

                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="input-group-text cursor-pointer"
                    >
                      {showPassword ? (
                        <i className="bx bx-show size-4"></i>
                      ) : (
                        <i className="bx bx-hide size-4"></i>
                      )}
                    </span>
                  </div>

                  <span className="input-text">
                    Must be at least 8 characters
                  </span>
                  <span
                    id="error"
                    className="text-center eerror mt-2 small text-danger"
                  >
                    {errors?.password}
                  </span>
                </div>

                <div className="mb-3 remember">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="remember-me"
                    />
                    <label
                      className="form-check-label small"
                      htmlFor="remember-me"
                    >
                      {" "}
                      Remember Me{" "}
                    </label>
                  </div>

                  <Link to={AuthLinks.forgotPasswordLink}>
                    <small>Forgot Password?</small>
                  </Link>
                </div>

                <button
                  disabled={loading}
                  type="button"
                  onClick={() => handleSubmit()}
                  className="form-btn btn btn-primary d-grid w-100"
                >
                  {loading ? (
                    /* From Uiverse.io by ashish-yadv */
                    <div className="loader">
                      <li className="ball"></li>
                      <li className="ball"></li>
                      <li className="ball"></li>
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </button>

                <span
                  id="error"
                  className="text-center eerror mt-2 small text-danger"
                >
                  {authError && authError}
                </span>

                <div className="w-full flex flex-col items-center justify-center mt-3">
                  <GoogleLogin
                    onSuccess={(credentialResponse: any) => {
                      const userInfo = jwtDecode<GoogleJwtPayload>(
                        credentialResponse.credential
                      );

                      setLoading(true);
                      axios
                        .post(AUTH_URL + "/auth/google", {
                          googleId: userInfo.sub,
                          firstName: userInfo.given_name,
                          lastName: userInfo.family_name,
                          email: userInfo.email,
                        })
                        .then((response) => {
                          dispatch(updateUser({ ...response?.data }));
                          navigate("/");
                        })
                        .catch((error) => {
                          setAuthError(error.response.data.error);
                        })
                        .finally(() => {
                          setLoading(false);
                        });
                    }}
                    onError={() => {
                      setAuthError("Login Failed");
                    }}
                  />
                </div>
              </div>

              <p className="text-center small">
                <span>Not registered yet? </span>
                <Link to={AuthLinks.signUpLink}>
                  <span>Create an Account</span>
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="footer-auth px-3">
          <span>
            <p>&copy;Neureus Solutions 2023</p>
          </span>
          <span>
            <p className="flex flex-row items-center justify-start gap-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 -960 960 960"
                width="48"
              >
                <path d="M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm340-302L140-685v465h680v-465L480-462Zm0-60 336-218H145l335 218ZM140-685v-55 520-465Z" />
              </svg>
              help@NeureusSolutions.com
            </p>
          </span>
        </div>
      </div>

      <div className="login-img">
        <img src="/img/new/image4.png" alt="" />
      </div>
    </div>
  );
};

export default Login;
