const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const carController = require("../controllers/carController");
const profileController = require("../controllers/profileController");
const { hasUser } = require("../middlewares/guards");

module.exports = (app) => {
  app.use('/', homeController)
  app.use('/auth', authController);
  app.use('/car', hasUser(), carController)
  app.use('/profile', profileController)
};