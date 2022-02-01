CREATE DATABASE  IF NOT EXISTS `foodplace` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `foodplace`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 45.79.201.214    Database: foodplace
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Carts`
--

DROP TABLE IF EXISTS `Carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `quantity` int NOT NULL,
  `price` float NOT NULL,
  `total` float NOT NULL,
  `Users_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Carts_Users1_idx` (`Users_id`),
  CONSTRAINT `fk_Carts_Users1` FOREIGN KEY (`Users_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Carts`
--

LOCK TABLES `Carts` WRITE;
/*!40000 ALTER TABLE `Carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `Carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Carts_has_Products`
--

DROP TABLE IF EXISTS `Carts_has_Products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Carts_has_Products` (
  `id` int NOT NULL,
  `Carts_id` int NOT NULL,
  `Products_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Carts_has_Products_Products1_idx` (`Products_id`),
  KEY `fk_Carts_has_Products_Carts1_idx` (`Carts_id`),
  CONSTRAINT `fk_Carts_has_Products_Carts1` FOREIGN KEY (`Carts_id`) REFERENCES `Carts` (`id`),
  CONSTRAINT `fk_Carts_has_Products_Products1` FOREIGN KEY (`Products_id`) REFERENCES `Products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Carts_has_Products`
--

LOCK TABLES `Carts_has_Products` WRITE;
/*!40000 ALTER TABLE `Carts_has_Products` DISABLE KEYS */;
/*!40000 ALTER TABLE `Carts_has_Products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Categories`
--

DROP TABLE IF EXISTS `Categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categories`
--

LOCK TABLES `Categories` WRITE;
/*!40000 ALTER TABLE `Categories` DISABLE KEYS */;
INSERT INTO `Categories` VALUES (1,NULL,NULL,'Burguers'),(2,NULL,NULL,'Chickens'),(3,NULL,NULL,'Asian'),(4,NULL,NULL,'Hot dogs'),(5,NULL,NULL,'Desserts'),(6,NULL,NULL,'Pizzas');
/*!40000 ALTER TABLE `Categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Products`
--

DROP TABLE IF EXISTS `Products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `price` float NOT NULL,
  `producttime` float NOT NULL,
  `description` tinytext NOT NULL,
  `image` varchar(45) NOT NULL,
  `Categories_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Products_Categories1_idx` (`Categories_id`),
  CONSTRAINT `fk_Products_Categories1` FOREIGN KEY (`Categories_id`) REFERENCES `Categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Products`
--

LOCK TABLES `Products` WRITE;
/*!40000 ALTER TABLE `Products` DISABLE KEYS */;
INSERT INTO `Products` VALUES (1,NULL,NULL,'super hot dog',25000,40,'Special hot dog with french fries, pineapple and mushrooms','hot-dog.jpg',4),(2,NULL,NULL,'chicken',40000,60,'Fried chicken with french fries and salad','chicken.jpg',2),(3,NULL,NULL,'coffee',10000,15,'Small coffee with milk and vanilla','coffee.jpg',5),(4,NULL,NULL,'Burguer king',45000,50,'Large hamburger with potato chips, bacon and pineapple','detail-hamburguer.jpg',1),(5,NULL,NULL,'Pizza with meats',18000,25,'Small pizza with ham, beef and chicken','pizza.jpg',6),(6,NULL,NULL,'Personal sandwich',12000,25,'15cm chicken sandwich with lettuce, tomato and sauces','sandwich.jpg',5),(7,NULL,NULL,'Noddles ',13000,35,'personal size noodles with asian spices','pasta.jpg',3);
/*!40000 ALTER TABLE `Products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Roles`
--

DROP TABLE IF EXISTS `Roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Roles`
--

LOCK TABLES `Roles` WRITE;
/*!40000 ALTER TABLE `Roles` DISABLE KEYS */;
INSERT INTO `Roles` VALUES (1,NULL,NULL,'Administrator'),(2,NULL,NULL,'Normal user');
/*!40000 ALTER TABLE `Roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `fullname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `number` bigint NOT NULL,
  `address` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `userimage` varchar(100) NOT NULL,
  `Roles_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_Users_Roles1_idx` (`Roles_id`),
  CONSTRAINT `fk_Users_Roles1` FOREIGN KEY (`Roles_id`) REFERENCES `Roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (19,NULL,NULL,'angie barajas','avbarajasc@unal.edu.co',3227610811,'calle34a#99a-45','$2a$10$88dLGCxeWBdw4i8IVWaDPeleijdYUffkYLFpSAk99mTRJK2cT588O','1643693250591_img_.png',1);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-01 11:25:23
