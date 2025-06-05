import { Link, useNavigate, useSearchParams } from "react-router";
import AuthPageLayout from "./components/AuthPageLayout";
import { useState } from "react";
import { AUTH_URL } from "../../redux/urls";
import { passwordResetSchema } from "./utils/ValidationSchema";
import { useFormik } from "formik";
import { AuthLinks } from "./utils/Routes";
import BASE_URL from "./_redux/axios";

const SetNew = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: passwordResetSchema,
    onSubmit: (values) => {
      setAuthError("");
      setNewPassword(values);
    },
  });

  const setNewPassword = (items: any) => {
    setLoading(true);
    BASE_URL
      .post(AUTH_URL + "/auth/set-new-password", { ...items, token: token })
      .then(() => {
        navigate(AuthLinks.allDoneLink);
      })
      .catch((error) => {
        setAuthError(error.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <AuthPageLayout>
      <div className="authentication-inner">
        <div className="card">
          <div className="card-body">
            <div className="icon">
              <img src="/img/new/password.svg" alt="" />
            </div>

            <h2 className="mb-2">Set new password</h2>
            <p className="mb-4 card-p small">Must be at least 8 characters</p>

            <div id="formAuthentication" className="mb-3">
              <div className="mb-3 form-password-toggle">
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

                <span
                  id="error"
                  className="text-center eerror mt-2 small text-danger"
                >
                  {errors?.password}
                </span>
              </div>

              <div className="mb-3 form-password-toggle">
                <label className="form-label" htmlFor="password">
                  Confirm Password*
                </label>

                <div className="input-group input-group-merge">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    className="form-control"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    aria-describedby="confirmPassword"
                    value={values.confirmPassword}
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
                  {errors?.confirmPassword}
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
                  "Reset Password"
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
              <Link to={AuthLinks.authLink}>
                <span>Back to Login</span>
              </Link>
            </p>
          </div>
        </div>

        <div className="progress">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar active"></div>
          <div className="bar"></div>
        </div>
      </div>
    </AuthPageLayout>
  );
};

export default SetNew;
