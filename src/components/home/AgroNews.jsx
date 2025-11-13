import { Link } from "react-router";

const blogPosts = [
  {
    title: "Climate-Smart Farming: Growing with Tomorrow",
    desc: "See how innovation and data-driven tools help farmers in changing climates.",
    img: "https://plus.unsplash.com/premium_photo-1661962692059-55d5a4319814?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "",
  },
  {
    title: "Top 5 Profitable Crops Defining Agriculture in 2025",
    desc: "Discover the high-yield crops — from greens to herbs — leading this year’s agro-market surge.",
    img: "https://plus.unsplash.com/premium_photo-1664300110866-15f2980d5bba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGFncm98ZW58MHx8MHx8fDA%3D",
    link: "",
  },
  {
    title: "Digital Platforms Empowering Local Farmers",
    desc: "Explore how tools like KrishiLink connect growers, boost trade, and fuel rural transformation.",
    img: "https://images.unsplash.com/photo-1625758476104-f2ed6c81248f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFncm98ZW58MHx8MHx8fDA%3D",
    link: "",
  },
];

const AgroNews = () => {
  return (
    <section className="px-6 md:px-8 lg:px-16 py-12 bg-accent text-accent-content rounded-xl">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Agro News & Blog
      </h2>

      <div className="grid gap-10 md:grid-cols-3 text-base-content">
        {blogPosts.map((post, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
          >
            <img
              src={post.img}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
              <p className="mb-4">{post.desc}</p>
              <Link to={post.link} className="font-medium hover:underline">
                Read more →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AgroNews;
