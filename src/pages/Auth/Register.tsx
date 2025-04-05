import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "./utils/ValidationSchema";
import { AuthLinks } from "./utils/Routes";
import "./assets/page-auth.css";
import axios from "axios";
import { API_URL } from "../../redux/urls";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      console.log("first= ", values);
      setAuthError("");
      registerUser(values);
    },
  });

  const registerUser = (items: any) => {
    setLoading(true);
    axios
      .post(API_URL + "/auth/register", { ...items })
      .then((response) => {
        console.log(response);
        navigate(AuthLinks.authLink);
      })
      .catch((error) => {
        console.log(error);
        setAuthError(error.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container-xxl auth-container">
      <div className="authentication-wrapper authentication-basic container-p-y !overflow-y-auto">
        <Link to="/" className="app-brand-link gap-2">
          <span className="app-brand-logo demo">
            {/* <img src="/img/new/image3.png" alt="" /> */}
            <h3 className="logo-h3">Neureus Solutions</h3>
          </span>
        </Link>

        <div className="authentication-inner">
          <div className="card">
            <div className="card-body">
              <h2 className="mb-2">Sign up</h2>
              <p className="mb-4 card-p small">
                Create your Neureus Solutions account
              </p>

              <div id="formAuthentication" className="mb-3">
                <div className="mb-1">
                  <label htmlFor="firstName" className="form-label">
                    First name*
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your name"
                    value={values.firstName}
                    onChange={handleChange}
                  />

                  <span
                    id="error"
                    className="text-center eerror mt-2 small text-danger"
                  >
                    {errors?.firstName}
                  </span>
                </div>

                <div className="mb-1">
                  <label htmlFor="lastName" className="form-label">
                    Last name*
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your name"
                    value={values.lastName}
                    onChange={handleChange}
                  />

                  <span
                    id="error"
                    className="text-center eerror mt-2 small text-danger"
                  >
                    {errors?.lastName}
                  </span>
                </div>

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
                    "Create account"
                  )}
                </button>

                <span
                  id="error"
                  className="text-center eerror mt-2 small text-danger"
                >
                  {authError && authError}
                </span>
              </div>

              <p className="text-center small">
                <span>Already have an account? </span>
                <Link to={AuthLinks.authLink}>
                  <span>Log in</span>
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

      <div className="reg-img">
        <img src="/img/new/Frame1.png" alt="" />
      </div>
    </div>
  );
};

export default Register;
