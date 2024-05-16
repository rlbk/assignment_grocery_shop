import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <>
      <main className="flex h-screen  flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100 to-blue-800">
        <div className="space-y-6 text-center">
          <h1 className="text-6xl font-semibold  text-white drop-shadow-md">
            Grocery Shop
          </h1>
          <p className="text-lg text-white">
            A simple e-shop for tracking your grocery sales
          </p>
          <div className="mt-8">
            <Link
              to="/dashboard"
              className="inline-block bg-primary hover:bg-primary/80 hover:text-slate-300 transition py-2 px-4 text-white rounded"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
