const Router = require("express");
const router = Router();
const statisticController = require("../../controllers/statistic/statistic.controller");


router.get("/get", statisticController.get);
router.get("/get/chart", statisticController.getCharts);
router.get("/get/:id", statisticController.getById);
router.get("/filters", statisticController.filters);
router.post("/search/:search", statisticController.search);

module.exports = router;