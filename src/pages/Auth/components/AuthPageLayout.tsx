import { Link } from "react-router";
import "../assets/page-auth.css";

const AuthPageLayout = ({ children }: any) => {
  return (
    <div className="container-xxl auth-container">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="app-brand">
          <Link to="/" className="app-brand-link gap-2">
            <span className="app-brand-logo demo">
              {/* <img src="/img/new/image3.png" alt="" /> */}
              <h3 className="logo-h3">
                Neureus
                <br />
                Solutions
              </h3>
            </span>
          </Link>
        </div>

        {children}

        <div className="footer-auth">
          <span>
            <p>&copy; Padimi 2023</p>
          </span>

          <span>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 -960 960 960"
                width="48"
              >
                <path d="M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm340-302L140-685v465h680v-465L480-462Zm0-60 336-218H145l335 218ZM140-685v-55 520-465Z" />
              </svg>
              help@padimi.com
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

export default AuthPageLayout;
