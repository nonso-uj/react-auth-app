import { Link } from "react-router";
import AuthPageLayout from "./components/AuthPageLayout";
import { AuthLinks } from "./utils/Routes";

const AllDone = () => {
  return (
    <AuthPageLayout>
      <div className="authentication-inner">
        <div className="card">
          <div className="card-body">
            <div className="icon">
              <img src="/img/new/verified.svg" alt="" />
            </div>

            <h2 className="mb-2">All done!</h2>
            <p className="mb-4 card-p small">
              Your password has been successfully reset. You can sign in now!
            </p>

            <Link to={AuthLinks.authLink}>
              <button className="form-btn btn btn-primary d-grid w-100 mb-3">
                Go to Sign In page
              </button>
            </Link>
          </div>
        </div>

        <div className="progress">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar active"></div>
        </div>
      </div>
    </AuthPageLayout>
  );
};

export default AllDone;
