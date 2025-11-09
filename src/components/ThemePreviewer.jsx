const ThemePreviewer = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content p-8 space-y-8">
      <h1 className="text-4xl font-bold text-primary">
        🌾 KrishiLink Theme Preview
      </h1>
      <p className="text-lg text-neutral">
        A clean, nature-inspired palette for agricultural and eco-friendly
        projects.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4">
        <button className="btn btn-primary">Primary</button>
        <button className="btn btn-secondary">Secondary</button>
        <button className="btn btn-accent">Accent</button>
        <button className="btn btn-neutral">Neutral</button>
        <button className="btn btn-success">Success</button>
        <button className="btn btn-warning">Warning</button>
        <button className="btn btn-error">Error</button>
      </div>

      {/* Alerts */}
      <div className="space-y-4">
        <div className="alert alert-info">
          <span>Info: Fresh weather data loaded successfully!</span>
        </div>
        <div className="alert alert-success">
          <span>Success: Your farm record was updated!</span>
        </div>
        <div className="alert alert-warning">
          <span>Warning: Irrigation level is below average!</span>
        </div>
        <div className="alert alert-error">
          <span>Error: Connection to soil sensor lost!</span>
        </div>
      </div>

      {/* Card */}
      <div className="card w-96 bg-base-200 shadow-md">
        <div className="card-body">
          <h2 className="card-title text-primary">Crop Health Monitor</h2>
          <p className="text-base-content">
            Monitor your crop growth, soil moisture, and weather forecasts in
            real-time.
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-accent">View Dashboard</button>
          </div>
        </div>
      </div>

      {/* Form Example */}
      <form className="space-y-4 max-w-md">
        <label className="form-control">
          <div className="label">
            <span className="label-text">Your Farm Name</span>
          </div>
          <input
            type="text"
            placeholder="Green Valley Farm"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Select Crop Type</span>
          </div>
          <select className="select select-bordered">
            <option>Wheat</option>
            <option>Rice</option>
            <option>Maize</option>
            <option>Potato</option>
          </select>
        </label>
        <button className="btn btn-primary w-full mt-2">Submit</button>
      </form>

      {/* Badges */}
      <div className="flex gap-2">
        <span className="badge badge-primary">Soil</span>
        <span className="badge badge-secondary">Sunlight</span>
        <span className="badge badge-accent">Moisture</span>
        <span className="badge badge-success">Healthy</span>
      </div>
    </div>
  );
};

export default ThemePreviewer;
