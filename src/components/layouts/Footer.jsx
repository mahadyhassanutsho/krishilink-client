import { Link } from "react-router";
import { FaHome, FaLeaf, FaUser, FaGithub } from "react-icons/fa";

const links = [
  { name: "Home", path: "/", icon: <FaHome /> },
  { name: "All Crops", path: "/crops", icon: <FaLeaf /> },
  { name: "Profile", path: "/profile", icon: <FaUser /> },
];

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-content py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-sm text-center md:text-left">
          &copy; 2025 KrishiLink. All rights reserved.
        </p>

        <nav className="flex space-x-6">
          {links.map((link) => (
            <div key={link.name}>
              <Link
                to={link.path}
                className="flex items-center gap-2 text-sm hover:text-secondary transition-colors duration-300 ease-in-out"
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <FaGithub />
          <a
            href="https://github.com/mahadyhassanutsho"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-secondary transition-colors duration-300 ease-in-out"
          >
            Contribute / About Me
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
