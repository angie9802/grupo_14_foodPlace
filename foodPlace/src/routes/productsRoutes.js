const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const adminMiddleware = require("../middlewares/adminMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const { body } = require("express-validator");
const path = require("path");
const uploadFile = require("../utils/multerConfig");

const validationsProducts = [
  body("name")
    .notEmpty()
    .withMessage("Enter a product name")
    .bail()
    .isLength({ min: 5 })
    .withMessage("Enter a name with at least 5 characters"),
  body("description")
    .notEmpty()
    .withMessage("Enter a product description")
    .bail()
    .isLength({ min: 20 })
    .withMessage("Enter a description with at least 20 characters"),
  body("price").notEmpty().withMessage("Enter a price"),
  body("producttime").notEmpty().withMessage("Enter a product time"),
  body("Categories_id").notEmpty().withMessage("Choose a category"),
  body("image").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".jpeg", ".png", ".PNG", ".gif"];

    if (!file) {
      throw new Error("Select an image");
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          `Only these extensions are allowed: ${acceptedExtensions.join(", ")}`
        );
      }
    }

    return true;
  }),
];
//Get all products

router.get("/", productsController.list);

//Create one product
router.get(
  "/create",
  authMiddleware,
  adminMiddleware,
  productsController.create
);
router.post(
  "/create",
  uploadFile.single("image"),
  validationsProducts,
  productsController.store
);

router.get("/manage", authMiddleware, productsController.show);
router.get("/search", productsController.search);
//Get one product(detail)
router.get("/:id", productsController.detail);

//Edit one product
router.get(
  "/edit/:id",
  authMiddleware,
  adminMiddleware,
  productsController.edit
);
router.put(
  "/:id",
  uploadFile.single("image"),
  validationsProducts,
  productsController.update
);

//Delete one product

router.delete("/delete/:id", productsController.delete);

module.exports = router;
