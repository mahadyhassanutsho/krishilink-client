import { Suspense } from "react";
import { Link } from "react-router";

import { getCrops } from "../../services/api";

import Loader from "../shared/Loader";
import CropList from "../crops/CropList";

const LatestCrops = () => {
  return (
    <Suspense fallback={<Loader size="lg" />}>
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            Latest Crops
          </h1>
          <Link to="/crops" className="btn btn-primary">
            All Crops
          </Link>
        </div>

        <CropList cropsPromise={getCrops(6)} />
      </section>
    </Suspense>
  );
};

export default LatestCrops;
