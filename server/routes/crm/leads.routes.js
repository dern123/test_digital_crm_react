const Router = require("express");
const router = Router();
const leadsController = require("../../controllers/leads/leads.controller");


router.post("/create", leadsController.create);

router.get("/get", leadsController.get);
router.get("/get/:id", leadsController.getById);
router.get("/filters", leadsController.create);
router.get("/search", leadsController.create);

router.put("/update/:id", leadsController.update);

router.delete("/delete/:id", leadsController.delete);

module.exports = router;