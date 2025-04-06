import { Link } from "react-router";
import { useState } from "react";
import AuthPageLayout from "./components/AuthPageLayout";

import "./assets/page-auth.css";
import { AuthLinks } from "./utils/Routes";
import { useFormik } from "formik";
import axios from "axios";
import { API_URL } from "../../redux/urls";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      setAuthError("");
      resetPassword(values);
    },
  });

  const resetPassword = (items: any) => {
    setLoading(true);
    axios
      .post(API_URL + "/auth/forgot-password", { ...items })
      .then(() => {
        setEmailSent(true);
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
        {emailSent ? (
          <>
            <div className="card">
              <div className="card-body">
                <div className="icon mx-auto">
                  <img src="/img/new/verified.svg" alt="" />
                </div>

                <h2 className="mb-2 text-center">Email sent!</h2>
                <p className="mb-4 card-p small text-center">
                  Reset instructions have been sent to the email provided.
                </p>
              </div>
            </div>

            <div className="progress">
              <div className="bar"></div>
              <div className="bar active"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </>
        ) : (
          <>
            <div className="card">
              <div className="card-body">
                <div className="icon">
                  <img src="/img/new/fingerprint.svg" alt="" />
                </div>

                <h2 className="mb-2">Forgot Password?</h2>
                <p className="mb-4 card-p small">
                  No worries, we'll send you reset instructions
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
                      required
                      value={values.email}
                      onChange={handleChange}
                    />

                    <span
                      id="error"
                      className="text-center eerror mt-2 small text-danger"
                    >
                      {authError}
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
                      "Send Instructions"
                    )}
                  </button>
                </div>

                <p className="text-center small">
                  <Link to={AuthLinks.authLink}>
                    <span>Back to Login</span>
                  </Link>
                </p>
              </div>
            </div>

            <div className="progress">
              <div className="bar active"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </>
        )}
      </div>
    </AuthPageLayout>
  );
};

export default ForgotPassword;
