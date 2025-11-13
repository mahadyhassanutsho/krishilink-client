import { FaSeedling, FaHandshake, FaTruck } from "react-icons/fa";

const steps = [
  {
    icon: <FaSeedling className="text-primary text-4xl mb-4" />,
    title: "List Your Crops",
    desc: "Farmers can easily post their crops with detailed info, price, and quantity to reach potential buyers.",
  },
  {
    icon: <FaHandshake className="text-primary text-4xl mb-4" />,
    title: "Connect & Negotiate",
    desc: "Buyers can express interest, chat directly, and negotiate terms in a secure environment.",
  },
  {
    icon: <FaTruck className="text-primary text-4xl mb-4" />,
    title: "Deliver & Grow",
    desc: "Finalize deals, arrange transport, and grow your agricultural network with ease.",
  },
];

const HowItWorks = () => {
  return (
    <section className="border border-base-300 shadow-md rounded-xl text-center px-6 md:px-8 lg:px-16 py-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">
        How It Works
      </h2>

      <div className="grid gap-10 md:grid-cols-3">
        {steps.map((step, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all flex flex-col items-center"
          >
            {step.icon}
            <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
            <p className="text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
