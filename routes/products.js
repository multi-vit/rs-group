import express from "express";
const router = express.Router();

/* GET products listing. */
router.get("/", function (req, res, next) {
  res.json({
    message: "Congratulations, you are in the right place for products! 🙂",
  });
});

export default router;
