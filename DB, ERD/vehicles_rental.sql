-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 13 Feb 2022 pada 20.20
-- Versi server: 10.4.22-MariaDB
-- Versi PHP: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vehicles_rental`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `categoryId` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`categoryId`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'bike', '2022-02-02 03:55:08', NULL),
(2, 'motorbike', '2022-02-02 03:55:14', NULL),
(3, 'car', '2022-02-02 03:55:18', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `forgot_password`
--

CREATE TABLE `forgot_password` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `code` int(11) NOT NULL,
  `isExpired` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `udatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `forgot_password`
--

INSERT INTO `forgot_password` (`id`, `userId`, `code`, `isExpired`, `createdAt`, `udatedAt`) VALUES
(16, NULL, 8755, 0, '2022-02-13 08:04:31', NULL),
(17, NULL, 7852, 0, '2022-02-13 08:06:10', NULL),
(18, NULL, 8042, 0, '2022-02-13 08:09:00', NULL),
(19, NULL, 8737, 0, '2022-02-13 08:11:00', NULL),
(20, 15, 6180, 1, '2022-02-13 08:11:39', '2022-02-13 13:15:42'),
(21, 1, 3739, 1, '2022-02-13 13:19:17', '2022-02-13 13:19:46'),
(22, 2, 9909, 1, '2022-02-13 13:20:12', '2022-02-13 13:20:38');

-- --------------------------------------------------------

--
-- Struktur dari tabel `history`
--

CREATE TABLE `history` (
  `historyIid` int(11) NOT NULL,
  `rentStartDate` date NOT NULL,
  `rentEndDate` date NOT NULL,
  `prepayment` int(11) NOT NULL,
  `rating` float NOT NULL DEFAULT 0,
  `user_id` int(11) DEFAULT NULL,
  `vehicle_id` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `history`
--

INSERT INTO `history` (`historyIid`, `rentStartDate`, `rentEndDate`, `prepayment`, `rating`, `user_id`, `vehicle_id`, `createdAt`, `updatedAt`) VALUES
(1, '2021-08-08', '2021-09-09', 0, 4, 1, 14, '2022-02-02 04:30:37', '2022-02-06 19:11:04'),
(2, '2022-02-09', '2022-02-18', 0, 5, 1, 19, '2022-02-05 09:08:18', '2022-02-06 07:03:23'),
(3, '2022-02-05', '2022-02-09', 0, 5, 1, 17, '2022-02-05 09:25:59', '2022-02-06 07:03:26'),
(4, '2022-02-05', '2022-02-17', 0, 4, 1, 17, '2022-02-05 09:26:12', '2022-02-06 07:03:34'),
(5, '2022-02-06', '2022-02-07', 0, 5, 5, 15, '2022-02-06 06:54:37', '2022-02-07 02:15:21'),
(6, '2022-02-06', '2022-02-07', 0, 4, 5, 31, '2022-02-06 06:55:02', '2022-02-07 02:15:25'),
(7, '2022-02-06', '2022-02-10', 0, 4, 5, 3, '2022-02-06 06:55:41', '2022-02-06 07:03:58'),
(8, '2022-02-06', '2022-02-09', 0, 5, 4, 27, '2022-02-06 06:56:25', '2022-02-06 07:04:00'),
(9, '2022-02-08', '2022-02-12', 0, 4, 1, 10, '2022-02-06 06:57:00', '2022-02-06 07:04:02'),
(11, '2021-08-08', '2021-09-09', 0, 0, 2, 10, '2022-02-07 01:59:55', NULL),
(12, '2021-08-08', '2021-09-09', 0, 0, 3, 10, '2022-02-07 02:00:06', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `role` enum('admin','user','supervisor') NOT NULL DEFAULT 'user',
  `fullName` varchar(80) NOT NULL,
  `email` varchar(80) NOT NULL,
  `username` varchar(80) NOT NULL,
  `password` varchar(80) NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `address` varchar(80) NOT NULL,
  `mobileNumber` varchar(80) NOT NULL,
  `birthDate` date NOT NULL,
  `displayName` varchar(80) NOT NULL,
  `images` varchar(80) DEFAULT NULL,
  `emailVerify` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`userId`, `role`, `fullName`, `email`, `username`, `password`, `gender`, `address`, `mobileNumber`, `birthDate`, `displayName`, `images`, `emailVerify`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 'Hiras Parasian Doloksaribu', '1881011@unai.edu', 'admin', '$2b$10$ltKF4GSeptKvu31rkY/7xO4VFL/V4oqFTrKwR7pPxRgrCZrDycS0i', 'Male', 'Bekasi Utara', '081388981122', '1999-11-08', 'Hiras', NULL, 1, '2022-02-02 04:07:33', '2022-02-13 16:39:22'),
(2, 'user', 'Bill Gates', 'bill@mail.com', 'user1', '$2b$10$NBwmvCbOeCLwGmYZ.MrLje73jlQxr5edABAzVMU.fmsCJvR5dUbpu', 'Male', 'Nganjuk', '0081388981133', '1983-02-09', 'Bill', NULL, 0, '2022-02-02 04:09:01', '2022-02-13 13:20:38'),
(3, 'user', 'Mark Zuckenberg', 'mark@facebook.com', 'user2', 'mark123', 'Male', 'Bandung', '081388981122', '1983-02-08', 'Mark', NULL, 0, '2022-02-06 06:51:28', '2022-02-10 15:13:14'),
(4, 'user', 'Jeff Bezos', 'jeff@amazon.com', 'user3', 'jeff123', 'Male', 'Solo', '082198237534', '1977-02-09', 'Jeff', NULL, 0, '2022-02-06 06:52:25', '2022-02-10 15:13:18'),
(5, 'user', 'Cinta Laura', 'cinta@laura.com', 'user4', 'cinta123', 'Female', 'Jekardah', '082109879876', '1993-02-01', 'Cinta', NULL, 0, '2022-02-06 06:53:40', '2022-02-10 15:13:20'),
(6, 'user', 'Agus Hitler', 'agus@nasi.com', 'user5', '', '', 'Berlin', '081388981199', '1999-01-08', 'Hitler', NULL, 0, '2022-02-06 16:18:44', '2022-02-10 15:13:23'),
(7, 'user', 'Agus Hitler', 'aguss2@nasi.com', 'user6', 'agus123', 'Male', 'Berlin', '081388981199', '1999-01-08', 'Hitler', NULL, 0, '2022-02-06 16:45:34', '2022-02-10 15:13:27'),
(9, 'user', 'Agus Hitler', 'hitler2@nasi.edu', 'hitlerrr', '$2b$10$fcvv6MGUlwS8nFgepnEuyeOfRqUMtnX5a1KYo9DOpLR1NGxX0QORa', 'Male', 'Berlin', '086721347642', '1999-01-08', 'Hitlerr', 'profil.png', 0, '2022-02-10 15:30:02', NULL),
(10, 'user', 'Agus Hitler', 'hitler2@nasi.edu', 'hitlerrr', '$2b$10$GwYBQWrkz8LIkvFObBDgqOATopuaK9EBVkZ8ctWBTubEJsK236hKu', 'Male', 'Berlin', '086721347642', '1999-01-08', 'Hitlerr', 'profil.png', 0, '2022-02-10 15:39:17', NULL),
(11, 'user', 'Agus Hitler', 'hitler2@nasi.edu', 'hitlerrr', '$2b$10$y2DpVjMS3wPfl5w.VzV0E.lGlojkW2w6xleEkk1lqnQv4ZZ.it6hy', 'Male', 'Berlin', '086721347642', '1999-01-08', 'Hitlerr', 'profil.png', 0, '2022-02-10 15:41:25', NULL),
(12, 'user', 'Agus Hitler', 'hitler2@nasi.edu', 'hitlerrr', '$2b$10$4h0Hv05SJJXf/qOKgvT0uew.y.cWoUzsrDb/hHXCeYStBNiX38cm6', 'Male', 'Berlin', '086721347642', '1999-01-08', 'Hitlerr', 'profil.png', 0, '2022-02-10 15:43:00', NULL),
(13, 'user', 'Agus Hitler', 'hitler2@nasi.edu', 'hitlerrr', '$2b$10$YZqAYb8o5ot7VfDUNyYwXeVM1E36ZAUDUakiC3iiBv0V4vR/FxNqm', 'Male', 'Berlin', '086721347642', '1999-01-08', 'Hitlerr', 'profil.png', 0, '2022-02-10 15:43:40', NULL),
(14, 'user', 'Agus Hitler', 'hitler2@nasi.edu', 'hiras123', '$2b$10$GuHa95GwlJrfISuYGV/nSeHOv2mOEzg8z12gChls7mIgypdONsjIu', 'Male', 'Berlin', '086721347642', '1999-01-08', 'Hitlerr', 'profil.png', 0, '2022-02-11 02:14:08', NULL),
(15, 'supervisor', 'Hiras Parasian', 'hirasparasian@gmail.com', 'hiras123', '$2b$10$MMlG/V9KV3HlK9xBaJp0TOyhlWPi7xK59Te4g1RMuZ/idUp3OX2hK', 'Male', 'Berlin', '086721347642', '1999-01-08', 'Hitlerr', 'profil.png', 0, '2022-02-13 07:04:45', '2022-02-13 15:23:30'),
(16, 'user', 'Hiras Parasian', 'hiraspds@gmail.com', 'hiraspds', '$2b$10$iqNuNKfgylvSLQwifvhUdOka4nw7YUerZz0UT7Eeo/8ACCTMLg6Mm', 'Male', 'Berlin', '086721347642', '1999-01-08', 'Hitlerr', 'profil.png', 1, '2022-02-13 15:24:31', '2022-02-13 16:43:34'),
(20, 'user', 'Hiras Parasian', '1881011111@unai.edu', 'hiraspds122', '[object Promise]', 'Male', 'bekasi', '0813889112223', '1999-01-01', 'Hiras', 'uploads\\bugati-1644778586554-706033780.jpg', 0, '2022-02-13 18:56:26', NULL),
(21, 'user', 'Hiras Parasian', 'hiraste2ch@gmail.com', 'hirasds122', '$2b$10$fDK7b/6C9UFxwtfw0Rlp7eYN4uirHtzbgAiSwyKVlYg/RpKt31Kpi', 'Male', 'bekasi', '083889112223', '1999-01-01', 'Hiras', 'uploads\\bugati-1644778666694-477048292.jpg', 1, '2022-02-13 18:57:46', '2022-02-13 19:00:59'),
(22, 'user', 'Hiras Parasian', 'hirastech@gmail.com', 'user123', '$2b$10$YiPZUvbVf6cmEF7gz5Pev.Gz9aYbPwLKh7nqNNzTMjRucCZol6Xf2', 'Male', 'bekasi', '08388912223', '1999-01-01', 'Hiras', 'uploads\\bugati-1644778732808-4450686.jpg', 1, '2022-02-13 18:58:52', '2022-02-13 19:01:24');

-- --------------------------------------------------------

--
-- Struktur dari tabel `vehicles`
--

CREATE TABLE `vehicles` (
  `vehicleId` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `price` int(80) NOT NULL,
  `description` varchar(80) NOT NULL,
  `location` varchar(80) NOT NULL,
  `category` int(11) DEFAULT NULL,
  `isAvailable` enum('Ready') NOT NULL,
  `stock` int(11) NOT NULL,
  `image` varchar(80) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `vehicles`
--

INSERT INTO `vehicles` (`vehicleId`, `name`, `price`, `description`, `location`, `category`, `isAvailable`, `stock`, `image`, `createdAt`, `updatedAt`) VALUES
(2, 'Sepeda Gunung', 300000, 'Yellow, Blue, Green', 'Bandung', 1, 'Ready', 3, 'sepeda.png', '2022-01-02 04:25:25', '2022-02-06 08:01:02'),
(3, 'sepeda gunung', 30000, 'Grey Only', 'Arab', 3, '', 3, 'sepeda.png', '2022-01-29 04:25:48', '2022-02-13 15:11:07'),
(4, 'Sepeda Fixie', 300000, 'Red Only', 'Bekasi', 1, 'Ready', 3, 'sepeda.png', '2022-01-30 04:26:18', '2022-02-06 08:03:39'),
(5, 'Sepeda BMX', 300000, 'Red, Green, Blue', 'Bekasi', 1, 'Ready', 3, 'sepeda.png', '2022-02-01 04:26:46', '2022-02-06 08:02:40'),
(6, 'Sepeda Tandem', 300000, 'Silver Only', 'Bekasi', 1, 'Ready', 3, 'sepeda.png', '2022-02-02 04:26:58', NULL),
(7, 'Beat 2019', 300000, 'Red, White', 'Bekasi', 2, 'Ready', 3, 'sepeda.png', '2022-02-02 04:28:08', '2022-02-02 04:29:08'),
(8, 'Beat 2020', 300000, 'Black Only', 'Bekasi', 2, 'Ready', 3, 'sepeda.png', '2022-02-02 04:28:08', '2022-02-02 04:29:20'),
(9, 'Beat 2021', 300000, 'Blue, Grey', 'Bekasi', 2, 'Ready', 3, 'sepeda.png', '2022-02-02 04:28:08', '2022-02-02 04:29:28'),
(10, 'Beat 2022', 300000, 'Yellow, Red', 'Bekasi', 2, 'Ready', 3, 'sepeda.png', '2022-02-02 04:28:08', '2022-02-02 04:29:37'),
(11, 'Mitsubishi Xpander', 300000, 'Red Only', 'Jakarta', 3, 'Ready', 3, 'sepeda.png', '2022-02-02 04:28:08', NULL),
(12, 'Toyota Innova', 300000, 'Red Only', 'Jakarta', 3, 'Ready', 3, 'sepeda.png', '2022-02-02 04:28:08', NULL),
(13, 'Honda Brio', 300000, 'Red Only', 'Jakarta', 3, 'Ready', 3, 'sepeda.png', '2022-02-02 04:28:08', NULL),
(14, 'Toyota Calya', 300000, 'Red Only', 'Jakarta', 3, 'Ready', 3, 'sepeda.png', '2022-02-02 04:28:08', NULL),
(15, 'Wuling Confero', 300000, 'Red Only', 'Jakarta', 3, 'Ready', 3, 'sepeda.png', '2022-02-02 04:28:08', NULL),
(16, 'Daihatsu Terios', 300000, 'Red Only', 'Jakarta', 3, 'Ready', 3, 'sepeda.png', '2022-02-02 04:28:08', NULL),
(17, 'Lamborghini A', 30000, 'Red Only', 'Abu Dhabi', 3, 'Ready', 30, 'lambo.png', '2022-02-05 08:24:33', NULL),
(18, 'Lamborghini A', 30000, 'Red Only', 'Abu Dhabi', 3, 'Ready', 30, 'lambo.png', '2022-02-05 08:24:58', NULL),
(19, 'Lamborghini B', 30000, 'Red Only', 'Abu Dhabi', 3, 'Ready', 30, 'lambo.png', '2022-02-05 08:27:14', NULL),
(20, 'Lamborghini C', 30000, 'Red Only', 'Abu Dhabi', 3, 'Ready', 30, 'lambo.png', '2022-02-05 08:33:47', NULL),
(22, 'Suzuki Carry PU', 230000, 'Blue, Red', 'Beijing', 3, 'Ready', 3, 'carry.png', '2022-02-06 06:35:13', NULL),
(23, 'Toyota Rush', 240000, 'Pink Only', 'Texaz', 3, '', 0, 'rush.png', '2022-02-06 06:36:16', NULL),
(24, 'Daihatsu Xenia', 235000, 'White Only', 'FakFak - Papua', 3, 'Ready', 3, 'xenia.png', '2022-02-06 06:37:40', NULL),
(25, 'Daihatsu Sigra', 220000, 'Orange, White', 'Kupang', 3, 'Ready', 4, 'sigra.png', '2022-02-06 06:38:21', NULL),
(26, 'Daihatsu Gran Max PU', 200500, 'Blue, Grey', 'Manado', 3, 'Ready', 10, 'granmax.png', '2022-02-06 06:39:41', NULL),
(27, 'Toyota Fortuner', 257200, 'Black Only', 'Surabaya', 3, 'Ready', 6, 'fortuner.png', '2022-02-06 06:40:45', NULL),
(28, 'Mitsubishi Colt L300 PU', 199000, 'Maroon, Cyan', 'Bekasi', 3, 'Ready', 12, 'colt.png', '2022-02-06 06:42:06', NULL),
(29, 'Mitsubishi Pajero Sport', 197990, 'Black Only', 'Jakarta', 3, 'Ready', 7, 'pajero.png', '2022-02-06 06:43:01', NULL),
(30, 'Honda Scoopy eSP', 70000, 'Red, Blue, White', 'Bekasi', 2, 'Ready', 8, 'scoopyesp.png', '2022-02-06 06:44:04', NULL),
(31, 'Yamaha N-Max', 80000, 'Black Only', 'Jakarta', 2, 'Ready', 9, 'nmax.png', '2022-02-06 06:44:45', NULL),
(32, 'Yamaha New V-ixion', 75000, 'Blue Only', 'Bandung', 2, 'Ready', 4, 'vixion.png', '2022-02-06 06:45:30', NULL),
(33, 'Kawasaki KLX 150', 80000, 'Black, White', 'Bekasi', 2, 'Ready', 3, 'KLX.png', '2022-02-06 06:46:15', NULL),
(34, 'Honda Sonic 150 R', 65000, 'Red, Black', 'Bekasi', 2, 'Ready', 3, 'sonic.png', '2022-02-06 06:47:15', NULL),
(35, 'Honda Verza', 66000, 'Black Only', 'Bandung', 2, 'Ready', 2, 'verza.png', '2022-02-06 06:48:03', NULL),
(36, 'Honda CB 150 R Street Fire', 85000, 'Red Only', 'Bandung', 2, 'Ready', 6, 'cbr150.png', '2022-02-06 06:48:43', NULL),
(37, 'Lamborghini D', 30000, 'Red Only', 'Abu Dhabi', 3, 'Ready', 30, 'lambo.png', '2022-02-06 16:40:59', NULL),
(38, 'Sepeda Gunung65', 20000, '', 'Bekasi', 3, '', 1, 'a.png', '2022-02-07 06:53:22', NULL),
(39, 'Bugati', 400000, '', '', 2, '', 3, 'uploads\\bugati-1644384324521-941774394.jpg', '2022-02-09 05:25:24', NULL),
(40, 'Bugati', 400000, '', '', 2, '', 3, 'uploads\\bugati-1644384351199-234230795.jpg', '2022-02-09 05:25:51', NULL),
(41, 'Bugati', 400000, 'Blue', 'Yogyakarta', 2, 'Ready', 3, 'uploads\\bugati-1644384405205-962170168.jpg', '2022-02-09 05:26:45', NULL),
(42, 'Bugati 99', 400000, 'Blue', 'Yogyakarta', 2, 'Ready', 3, 'uploads\\bugati-1644384918624-592708696.jpg', '2022-02-09 05:35:18', NULL),
(43, 'Bugati231', 400000, 'Blue', 'Yogyakarta', 2, 'Ready', 3, 'uploads\\bugati-1644763975405-251615084.jpg', '2022-02-13 14:52:55', NULL),
(44, 'bugatti213144', 300000, 'Blue', 'Yogyakarta', 2, 'Ready', 3, 'uploads\\bugati-1644772060522-413668283.jpg', '2022-02-13 17:07:40', NULL),
(45, 'bugatti2131442', 300000, 'Blue', 'Yogyakarta', 2, 'Ready', 3, 'uploads\\bugati-1644772141010-677215185.jpg', '2022-02-13 17:09:01', NULL),
(46, 'bugatti21314422', 300000, 'Blue', 'Yogyakarta', 2, 'Ready', 3, 'uploads\\bugati-1644772218487-683253581.jpg', '2022-02-13 17:10:18', NULL),
(47, 'bugatti213144221', 300000, 'Blue', 'Yogyakarta', 2, 'Ready', 3, 'uploads\\bugati-1644772288654-504594524.jpg', '2022-02-13 17:11:28', NULL),
(48, 'bugatti2131442213', 300000, 'Blue', 'Yogyakarta', 2, 'Ready', 3, 'uploads\\bugati-1644772402581-419849833.jpg', '2022-02-13 17:13:22', NULL),
(49, 'bugattii', 300000, 'Blue', 'Yogyakarta', 2, 'Ready', 3, 'uploads\\bugati-1644772437274-892025559.jpg', '2022-02-13 17:13:57', NULL),
(50, 'bugatttii', 300000, 'Blue', 'Yogyakarta', 2, 'Ready', 3, 'uploads\\bugati-1644772468431-205475416.jpg', '2022-02-13 17:14:28', NULL),
(51, 'bugatttii1', 300000, 'Blue', 'Yogyakarta', 2, 'Ready', 3, 'uploads\\bugati-1644772489522-783495575.jpg', '2022-02-13 17:14:49', NULL),
(52, 'bugatttii11', 300000, 'Blue', 'Yogyakarta', 2, 'Ready', 3, 'uploads\\bugati-1644772725929-29068004.jpg', '2022-02-13 17:18:45', NULL),
(53, 'bugatttii112', 300000, 'Blue', 'Yogyakarta', 2, 'Ready', 3, 'uploads\\bugati-1644774628749-783644247.jpg', '2022-02-13 17:50:28', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `verify_email`
--

CREATE TABLE `verify_email` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `code` varchar(80) NOT NULL DEFAULT '0',
  `isExpired` tinyint(4) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `verify_email`
--

INSERT INTO `verify_email` (`id`, `userId`, `code`, `isExpired`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2350', 1, '2022-02-13 16:23:35', '2022-02-13 16:32:31'),
(2, 1, '3226', 1, '2022-02-13 16:37:43', '2022-02-13 16:38:04'),
(3, 1, '1192', 1, '2022-02-13 16:38:58', '2022-02-13 16:39:22'),
(4, 16, '1855', 1, '2022-02-13 16:43:09', '2022-02-13 16:43:34'),
(5, 21, '8318', 1, '2022-02-13 19:00:05', '2022-02-13 19:00:24'),
(6, 22, '2887', 1, '2022-02-13 19:01:10', '2022-02-13 19:01:24');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indeks untuk tabel `forgot_password`
--
ALTER TABLE `forgot_password`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indeks untuk tabel `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`historyIid`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `vehicle_id` (`vehicle_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indeks untuk tabel `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`vehicleId`),
  ADD KEY `category` (`category`);

--
-- Indeks untuk tabel `verify_email`
--
ALTER TABLE `verify_email`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `forgot_password`
--
ALTER TABLE `forgot_password`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT untuk tabel `history`
--
ALTER TABLE `history`
  MODIFY `historyIid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT untuk tabel `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `vehicleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT untuk tabel `verify_email`
--
ALTER TABLE `verify_email`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `forgot_password`
--
ALTER TABLE `forgot_password`
  ADD CONSTRAINT `forgot_password_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`userId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `history_ibfk_2` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`vehicleId`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`category`) REFERENCES `category` (`categoryId`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `verify_email`
--
ALTER TABLE `verify_email`
  ADD CONSTRAINT `verify_email_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
