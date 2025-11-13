import Loader from "../components/shared/Loader";

const LoaderPage = () => {
  return (
    <div className="bg-base-100 min-h-screen w-full flex items-center justify-center">
      <Loader size="xl" />
    </div>
  );
};

export default LoaderPage;
