const Router = require('express');
const router = Router();

const countryController = require("../../controllers/statistic/country.controller");

router.get("/get", countryController.get);

module.exports = router;