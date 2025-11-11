import { FaUserFriends, FaLeaf, FaSeedling, FaBook } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const stats = [
  {
    icon: <FaUserFriends className="mx-auto text-primary text-4xl" />,
    value: "120+",
    label: "Farmers Joined",
  },
  {
    icon: <FaLeaf className="mx-auto text-primary text-4xl" />,
    value: "300+",
    label: "Crops Shared",
  },
  {
    icon: <FaSeedling className="mx-auto text-primary text-4xl" />,
    value: "500+",
    label: "Crops Planted",
  },
  {
    icon: <FaBook className="mx-auto text-primary text-4xl" />,
    value: "50+",
    label: "Agro Blogs",
  },
];

const StatsSection = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center my-10">
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          whileHover={{ scale: 1.05 }}
          className="p-4 rounded-lg shadow-lg bg-base-100"
        >
          {stat.icon}
          <h2 className="text-3xl font-bold mt-2">{stat.value}</h2>
          <p className="text-sm mt-1">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsSection;
