const Router = require('express');
const router = Router();

const companyController = require("../../controllers/statistic/company.controller");

router.get("/get", companyController.get);

module.exports = router;