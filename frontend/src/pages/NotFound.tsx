import { Link, useNavigate } from "react-router-dom";
import { TfiFaceSad } from "react-icons/tfi";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen flex text-primary items-center justify-center bg-slate-300">
      <div className="text-center">
        <TfiFaceSad size={200} className="text-primary-gray-300 mx-auto mb-4" />
        <p className="font-semibold text-7xl text-primary-gray-300  mb-4">
          404
        </p>
        <p className="font-bold text-3xl text-primary-gray-180 mb-4">
          Page not found
        </p>
        <p className="text-primary-gray-200 text-lg">
          The page you are looking for doesn't exist or an other error occured.
          <br />
          <span
            onClick={() => {
              navigate(-1);
            }}
            className="cursor-pointer"
          >
            <strong>Go back</strong>
          </span>
          , or head over to{" "}
          <strong>
            <Link to="/">home page</Link>
          </strong>{" "}
          to choose a new direction.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
