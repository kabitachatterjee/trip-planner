function index(req, res) {
  res.json({
    message: "Welcome to travel planner!",
    documentation_url: "https://github.com/kabitachatterjee/trip-planner",
    base_url: "localhost:3000",
    endpoints: [
      {
        method: "GET", path: "/api", description: "Describes available endpoints"
      }
    ]
  });
}

module.exports = {
  index: index
}
