const express = require("express");
const path = require("path");
const router = express.Router();
const usersController = require("../controllers/usersController");
const multer = require("multer");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

const { body } = require("express-validator");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/users");
  },

  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
  },
});

const uploadFile = multer({ storage });

const validationsRegister = [
  body("fullname")
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage("Enter a name with at least 2 characters"),
  body("email")
    .notEmpty()
    .withMessage("Enter an email")
    .bail()
    .isEmail()
    .withMessage("Enter a valid email"),
  body("number")
    .notEmpty()
    .withMessage("Enter a number"),
  body("address")
    .notEmpty()
    .withMessage("Enter an address"),
  body("password")
    .notEmpty()
    .withMessage("Enter a password")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Minimum length is 8")
    .bail()
    .isStrongPassword({ minSymbols: 1 })
    .withMessage("Use numbers, capital letters and at least one symbol"),
  body("cpassword")
    .notEmpty()
    .withMessage("Confirm the password"),
  body("userImage").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".png", ".PNG", ".gif", "jpeg"];

    if (!file) {
      throw new Error("Select and image");
    } else {
      if (!acceptedExtensions.includes(path.extname(file.originalname))) {
        throw new Error(
          `Only these extensions are allowed: ${acceptedExtensions.join(", ")}`
        );
      }
    }

    return true;
  }),
];

const validationsLogin = [
  body("email")
    .notEmpty()
    .withMessage("Enter your email"),
  body("password")
    .notEmpty()
    .withMessage("Enter your password"),
];

router.get("/register", guestMiddleware, usersController.register);
router.post(
  "/register",
  uploadFile.single("userImage"),
  validationsRegister,
  usersController.processRegister
);

router.get("/login", guestMiddleware, usersController.login);
router.post("/login", validationsLogin, usersController.loginProcess);

router.get("/profile", authMiddleware, usersController.profile);
router.get("/manage", authMiddleware, usersController.show);

//edit user
router.put(
  "/edit-user/:id",
  uploadFile.single("userImage"),
  usersController.updateUser
);

//Logout
router.get("/logout", usersController.logout);

router.get("/:id", authMiddleware, usersController.detail);
router.get("/admin/edit/:id", usersController.adminUpdate);
router.put(
  "/admin/edit/:id",
  uploadFile.single("userImage"),
  usersController.updateUserAdmin
);

//delete
router.delete("/delete/:id", usersController.delete);
router.delete("/delete/admin/:id", usersController.deleteUserAdmin);



module.exports = router;
