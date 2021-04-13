const express = require("express");
const routes = express.Router();
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')

//new feature
const  validateJob  = require('./middlewares/jobValidator');
const validateProfile = require('./middlewares/profileValidator')


routes.get("/", DashboardController.index);
routes.get("/job", JobController.create);

routes.post("/job", validateJob.add,JobController.save);
routes.get("/job/:id", JobController.show);

routes.post("/job/:id", validateJob.add, JobController.update);
routes.post("/job/delete/:id", JobController.delete);

routes.get("/profile", ProfileController.index);
routes.post("/profile", validateProfile.add, ProfileController.update);

module.exports = routes;
