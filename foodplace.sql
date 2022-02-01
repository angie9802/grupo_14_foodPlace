-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema foodplace
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema foodplace
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `foodplace` DEFAULT CHARACTER SET utf8 ;
USE `foodplace` ;

-- -----------------------------------------------------
-- Table `foodplace`.`Roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodplace`.`Roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `foodplace`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodplace`.`Users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `fullname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `number` BIGINT(10) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `userimage` VARCHAR(100) NOT NULL,
  `Roles_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_Users_Roles1_idx` (`Roles_id` ASC) VISIBLE,
  CONSTRAINT `fk_Users_Roles1`
    FOREIGN KEY (`Roles_id`)
    REFERENCES `foodplace`.`Roles` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `foodplace`.`Carts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodplace`.`Carts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `quantity` INT NOT NULL,
  `price` FLOAT NOT NULL,
  `total` FLOAT NOT NULL,
  `Users_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Carts_Users1_idx` (`Users_id` ASC) VISIBLE,
  CONSTRAINT `fk_Carts_Users1`
    FOREIGN KEY (`Users_id`)
    REFERENCES `foodplace`.`Users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `foodplace`.`Categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodplace`.`Categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `foodplace`.`Products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodplace`.`Products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `name` VARCHAR(45) NOT NULL,
  `price` FLOAT NOT NULL,
  `producttime` FLOAT NOT NULL,
  `description` TINYTEXT NOT NULL,
  `image` VARCHAR(45) NOT NULL,
  `Categories_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Products_Categories1_idx` (`Categories_id` ASC) VISIBLE,
  CONSTRAINT `fk_Products_Categories1`
    FOREIGN KEY (`Categories_id`)
    REFERENCES `foodplace`.`Categories` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `foodplace`.`Carts_has_Products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodplace`.`Carts_has_Products` (
  `id` INT NOT NULL,
  `Carts_id` INT NOT NULL,
  `Products_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Carts_has_Products_Products1_idx` (`Products_id` ASC) VISIBLE,
  INDEX `fk_Carts_has_Products_Carts1_idx` (`Carts_id` ASC) VISIBLE,
  CONSTRAINT `fk_Carts_has_Products_Carts1`
    FOREIGN KEY (`Carts_id`)
    REFERENCES `foodplace`.`Carts` (`id`),
  CONSTRAINT `fk_Carts_has_Products_Products1`
    FOREIGN KEY (`Products_id`)
    REFERENCES `foodplace`.`Products` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
