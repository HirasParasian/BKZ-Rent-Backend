-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 07 Mar 2022 pada 02.53
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
(20, NULL, 6180, 1, '2022-02-13 08:11:39', '2022-02-13 13:15:42'),
(21, 1, 3739, 1, '2022-02-13 13:19:17', '2022-02-13 13:19:46'),
(22, 2, 9909, 1, '2022-02-13 13:20:12', '2022-02-13 13:20:38'),
(23, NULL, 7553, 1, '2022-02-14 03:39:44', '2022-02-14 03:40:29');

-- --------------------------------------------------------

--
-- Struktur dari tabel `history`
--

CREATE TABLE `history` (
  `historyId` int(11) NOT NULL,
  `rentStartDate` date NOT NULL,
  `rentEndDate` date NOT NULL,
  `prepayment` int(11) NOT NULL,
  `rating` float NOT NULL DEFAULT 0,
  `userId` int(11) DEFAULT NULL,
  `vehicleId` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `history`
--

INSERT INTO `history` (`historyId`, `rentStartDate`, `rentEndDate`, `prepayment`, `rating`, `userId`, `vehicleId`, `createdAt`, `updatedAt`) VALUES
(1, '2021-08-08', '2021-09-09', 0, 4, 1, 64, '2022-02-02 04:30:37', '2022-02-27 04:25:47'),
(2, '2022-02-09', '2022-02-18', 0, 5, 1, 107, '2022-02-05 09:08:18', '2022-02-27 04:25:57'),
(3, '2022-02-05', '2022-02-09', 0, 5, 1, 85, '2022-02-05 09:25:59', '2022-02-27 04:26:01'),
(4, '2022-02-05', '2022-02-17', 0, 4, 1, 106, '2022-02-05 09:26:12', '2022-02-27 04:26:06'),
(5, '2022-02-06', '2022-02-07', 0, 5, 5, 111, '2022-02-06 06:54:37', '2022-02-27 04:26:10'),
(6, '2022-02-06', '2022-02-07', 0, 4, 5, 89, '2022-02-06 06:55:02', '2022-02-27 04:26:15'),
(7, '2022-02-06', '2022-02-10', 0, 4, 5, 110, '2022-02-06 06:55:41', '2022-02-27 04:26:22'),
(8, '2022-02-06', '2022-02-09', 0, 5, 4, 68, '2022-02-06 06:56:25', '2022-02-27 04:26:26'),
(9, '2022-02-08', '2022-02-12', 0, 4, 1, 104, '2022-02-06 06:57:00', '2022-02-27 04:26:31'),
(11, '2021-08-08', '2021-09-09', 0, 0, 2, 64, '2022-02-07 01:59:55', '2022-02-27 04:26:35'),
(12, '2021-08-08', '2021-09-09', 0, 0, 3, 76, '2022-02-07 02:00:06', '2022-02-27 04:26:40');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `role` enum('admin','user','supervisor') NOT NULL DEFAULT 'user',
  `fullName` varchar(80) NOT NULL,
  `email` varchar(80) NOT NULL,
  `username` varchar(80) DEFAULT NULL,
  `password` varchar(80) NOT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `address` varchar(80) DEFAULT NULL,
  `mobileNumber` varchar(80) DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `displayName` varchar(80) DEFAULT NULL,
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
(34, 'admin', 'Hiras Parasian Doloksaribu', 'hiraspds@gmail.com', 'hiraskun', '$2b$10$xWBVO2lMl0zC3Gq3X1uo5uF1Aeswp6usyi1fwjEB9UK4/UJfolTou', 'Male', 'bekasi', '081388881122', '1999-01-01', 'Hiras', 'uploads\\profil-edward-1646029472848.png', 0, '2022-02-28 06:24:32', NULL),
(35, 'admin', 'Hiras Parasian Doloksaribu', 'hiraspdsss@gmail.com', 'hiraskun123', '$2b$10$hrm9NioPNFj/QoJV4prWl.0uc39IxQpsLi9Zcn4J5iIUVSlbS8EnK', 'Female', 'bekasi', '0813888811221', '1999-01-01', 'Hiras', 'uploads\\profil-edward-1646543278370.png', 1, '2022-03-06 05:07:58', '2022-03-06 16:26:21'),
(36, 'user', '', 'hirassama@gmail.com', 'hiraspds123', '$2b$10$EzimNNK5qlQwT0va3tP8QejuK5MjiuwfoJc.iiVrK1ccIFNaYyMfC', NULL, NULL, NULL, NULL, NULL, NULL, 1, '2022-03-06 17:00:49', '2022-03-06 17:02:18');

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
(64, 'Analog 3.0.16', 100000, '', 'Bekasi', 1, 'Ready', 3, 'uploads\\analod3016-1645934499995.jpg', '2022-02-27 04:01:40', NULL),
(65, 'Pithon M320 VR', 100000, '', 'Bekasi', 1, 'Ready', 3, 'uploads\\Pithon m320vr-1645934550261.jpg', '2022-02-27 04:02:30', NULL),
(66, 'Dart Superman', 100000, '', 'Bekasi', 1, 'Ready', 3, 'uploads\\Dart Superman-1645934806939.jpg', '2022-02-27 04:06:46', NULL),
(67, 'Noris Electric', 100000, '', 'Bandung', 1, 'Ready', 3, 'uploads\\NORIS-EBIKE-20-1-1645934829736.png', '2022-02-27 04:07:09', NULL),
(68, 'Illution 352', 100000, '', 'Bandung', 1, 'Ready', 3, 'uploads\\Illution 352-1645934852869.jpg', '2022-02-27 04:07:32', NULL),
(69, 'Spinix Minion ST', 100000, '', 'Jakarta', 1, 'Ready', 3, 'uploads\\Spinix-MinionSTUART-BLUE-1645934882535.png', '2022-02-27 04:08:02', NULL),
(70, 'Nitron BL', 100000, '', 'Jakarta', 1, 'Ready', 3, 'uploads\\NITRON-BL-01-1645934901583.png', '2022-02-27 04:08:21', NULL),
(71, 'Rush 2.5', 100000, '', 'Jakarta', 1, 'Ready', 3, 'uploads\\RUSH-2-1645934920409.5-1', '2022-02-27 04:08:40', NULL),
(72, 'Hotshot Batman', 100000, '', 'Bogor', 1, 'Ready', 3, 'uploads\\HOTSHOT_BATMAN_MOVIE_3-1645934946415.0_1', '2022-02-27 04:09:06', NULL),
(73, 'Skeleton 5', 100000, '', 'Bogor', 1, 'Ready', 3, 'uploads\\skeleton-5-orange-purple-miring1-1645934969067.png', '2022-02-27 04:09:29', NULL),
(74, 'Spazio 500', 100000, '', 'Bogor', 1, 'Ready', 3, 'uploads\\Spazio 500-1645934986299.jpg', '2022-02-27 04:09:46', NULL),
(75, 'Aquila 201', 100000, '', 'Bogor', 1, 'Ready', 3, 'uploads\\AQUILA-2-1645935001595.0-1', '2022-02-27 04:10:01', NULL),
(76, 'Cameron 71', 100000, '', 'Depok', 1, 'Ready', 3, 'uploads\\cameron-7-1-1645935019858.png', '2022-02-27 04:10:19', NULL),
(77, 'Stinger 9BK', 100000, '', 'Depok', 1, 'Ready', 3, 'uploads\\STINGER-9-BK-1-1645935126921.png', '2022-02-27 04:12:06', NULL),
(78, 'Armour DX', 100000, '', 'Depok', 1, 'Ready', 3, 'uploads\\ArmourDX-1645935148328.png', '2022-02-27 04:12:28', NULL),
(79, 'Primum SE', 100000, '', 'Jakarta', 1, 'Ready', 3, 'uploads\\primum-SE-1645935165295.png', '2022-02-27 04:12:45', NULL),
(80, 'Yamaha Fazzio', 150000, '', 'Jakarta', 2, 'Ready', 3, 'uploads\\Yamaha Fazzio-1645935229415.jpg', '2022-02-27 04:13:49', '2022-02-27 04:49:14'),
(81, 'Yamaha Niken', 150000, '', 'Jakarta', 2, 'Ready', 3, 'uploads\\YamahaNiken-1645935241101.jpg', '2022-02-27 04:14:01', '2022-02-27 04:49:20'),
(82, 'Kawasaki Ninja 250SL', 250000, '', 'Jakarta', 2, 'Ready', 3, 'uploads\\KawasakiNinja250SL-1645935261792.jpg', '2022-02-27 04:14:21', '2022-02-27 04:49:29'),
(83, 'Harley Street Bob', 250000, '', 'Bandung', 2, 'Ready', 3, 'uploads\\HarleyStreetBob-1645935282977.jpg', '2022-02-27 04:14:42', '2022-02-27 04:49:33'),
(84, 'Harley Street 500', 250000, '', 'Bandung', 2, 'Ready', 3, 'uploads\\HarleyStreet500-1645935291918.jpg', '2022-02-27 04:14:51', '2022-02-27 04:49:37'),
(85, 'Ducati Multistrada', 250000, '', 'Bandung', 2, 'Ready', 3, 'uploads\\DucatiMultistrada-1645935308068.jpg', '2022-02-27 04:15:08', '2022-02-27 04:49:40'),
(86, 'Ducati Panigale V4', 250000, '', 'Bekasi', 2, 'Ready', 3, 'uploads\\DucatiPanigalev4-1645935332308.jpg', '2022-02-27 04:15:32', '2022-02-27 04:49:44'),
(87, 'BMW K 1600', 250000, '', 'Bekasi', 2, 'Ready', 3, 'uploads\\BMWk1600-1645935351828.jpg', '2022-02-27 04:15:51', '2022-02-27 04:49:48'),
(88, 'BMW C 400', 250000, '', 'Bekasi', 2, 'Ready', 3, 'uploads\\BMWC400-1645935365184.jpg', '2022-02-27 04:16:05', '2022-02-27 04:49:51'),
(89, 'Honda Vario 125', 250000, '', 'Depok', 2, 'Ready', 3, 'uploads\\HondaVario125-1645935384245.jpg', '2022-02-27 04:16:24', '2022-02-27 04:49:56'),
(90, 'Honda Beat', 250000, '', 'Depok', 2, 'Ready', 3, 'uploads\\HondaBeat-1645935402153.jpg', '2022-02-27 04:16:42', '2022-02-27 04:50:03'),
(91, 'Honda ADV 150', 250000, '', 'Depok', 2, 'Ready', 3, 'uploads\\HondaADV150-1645935418551.jpg', '2022-02-27 04:16:58', '2022-02-27 04:50:08'),
(92, 'Porsche Panamera', 550000, '', 'Depok', 3, 'Ready', 3, 'uploads\\PorschePanamera-1645935482540.jpg', '2022-02-27 04:18:02', '2022-02-27 04:50:26'),
(93, 'Porsche Taycan', 550000, '', 'Depok', 3, 'Ready', 3, 'uploads\\PorscheTaycan-1645935491745.jpg', '2022-02-27 04:18:11', '2022-02-27 04:50:31'),
(94, 'Porsche 911', 550000, '', 'Depok', 3, 'Ready', 3, 'uploads\\Porsche911-1645935503318.jpg', '2022-02-27 04:18:23', '2022-02-27 04:50:36'),
(95, 'Porsche 718', 550000, '', 'Depok', 3, 'Ready', 3, 'uploads\\Porsche718-1645935512112.jpg', '2022-02-27 04:18:32', '2022-02-27 04:50:40'),
(96, 'Tesla Model X', 550000, '', 'Jakarta', 3, 'Ready', 3, 'uploads\\TeslaModelX-1645935530234.jpg', '2022-02-27 04:18:50', '2022-02-27 04:50:44'),
(97, 'Tesla Model S', 550000, '', 'Jakarta', 3, 'Ready', 3, 'uploads\\TeslaModelS-1645935541728.jpg', '2022-02-27 04:19:01', '2022-02-27 04:50:47'),
(98, 'Tesla Model 3', 550000, '', 'Jakarta', 3, 'Ready', 3, 'uploads\\TeslaModel3-1645935549969.jpg', '2022-02-27 04:19:09', '2022-02-27 04:50:51'),
(99, 'Lamborghini Urus', 550000, '', 'Bekasi', 3, 'Ready', 3, 'uploads\\LamborghiniUrus-1645935568083.jpg', '2022-02-27 04:19:28', '2022-02-27 04:50:56'),
(100, 'Lamborghini Huracan', 550000, '', 'Bekasi', 3, 'Ready', 3, 'uploads\\LamborghiniHuracan-1645935578336.jpg', '2022-02-27 04:19:38', '2022-02-27 04:51:00'),
(101, 'Lamborghini Aventador', 550000, '', 'Bekasi', 3, 'Ready', 3, 'uploads\\LamborghiniAventador-1645935589644.jpg', '2022-02-27 04:19:49', '2022-02-27 04:51:09'),
(102, 'MC Laren 570 GT', 550000, '', 'Bogor', 3, 'Ready', 3, 'uploads\\MCLaren570GT-1645935617334.jpg', '2022-02-27 04:20:17', '2022-02-27 04:51:13'),
(103, 'MC Laren 540 C', 550000, '', 'Bogor', 3, 'Ready', 3, 'uploads\\MCLaren540c-1645935631082.jpg', '2022-02-27 04:20:31', '2022-02-27 04:51:16'),
(104, 'MC Laren 720s Spider', 550000, '', 'Bogor', 3, 'Ready', 3, 'uploads\\MCLaren720sSpider-1645935667869.jpg', '2022-02-27 04:21:07', '2022-02-27 04:51:20'),
(105, 'MC Laren 570s', 550000, '', 'Bogor', 3, 'Ready', 3, 'uploads\\MCLaren570s-1645935692573.jpg', '2022-02-27 04:21:32', '2022-02-27 04:51:25'),
(106, 'BMW i8 Coupe', 550000, '', 'Jakarta', 3, 'Ready', 3, 'uploads\\BMW i8 Coupe-1645935723681.jpg', '2022-02-27 04:22:03', '2022-02-27 04:51:29'),
(107, 'BMW M4 Coupe', 550000, '', 'Bekasi', 3, 'Ready', 3, 'uploads\\BMW M4 Coupe-1645935745386.jpg', '2022-02-27 04:22:25', '2022-02-27 04:51:32'),
(108, 'BMW 4 Series', 550000, '', 'Depok', 3, 'Ready', 3, 'uploads\\BMW 4 Series-1645935765993.jpg', '2022-02-27 04:22:46', '2022-02-27 04:51:05'),
(109, 'BMW i8 Roadster', 550000, '', 'Bogor', 3, 'Ready', 3, 'uploads\\BMWi8Roadster-1645935786201.jpg', '2022-02-27 04:23:06', '2022-02-27 04:51:37'),
(110, 'Ferrari GTC4 Lusso', 550000, '', 'Bandung', 3, 'Ready', 3, 'uploads\\FerariGTC4Lusso-1645935815875.jpg', '2022-02-27 04:23:35', '2022-02-27 04:51:41'),
(111, 'Ferrari 488 Pista', 550000, '', 'Jakarta', 3, 'Ready', 3, 'uploads\\Ferari488Pista-1645935846978.jpg', '2022-02-27 04:24:06', '2022-02-27 04:51:45'),
(112, 'Ferrari 488 GTB', 550000, '', 'Bandung', 3, 'Ready', 3, 'uploads\\Ferari488GTB-1645935863480.jpg', '2022-02-27 04:24:23', '2022-02-27 04:51:51'),
(113, 'Toyota Cayla', 350000, '', 'Depok', 3, 'Ready', 3, 'uploads\\Toyota Cayla-1645935886551.jpg', '2022-02-27 04:24:46', '2022-02-27 04:52:03'),
(114, 'Toyota Rush', 350000, '', 'Depok', 3, 'Ready', 3, 'uploads\\Toyota Rush-1645935895760.jpg', '2022-02-27 04:24:55', '2022-02-27 04:52:07'),
(115, 'Toyota Avanza', 350000, '', 'Depok', 3, 'Ready', 3, 'uploads\\Toyota Avanza-1645935904636.jpg', '2022-02-27 04:25:04', '2022-02-27 04:52:11');

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
(4, NULL, '1855', 1, '2022-02-13 16:43:09', '2022-02-13 16:43:34'),
(5, NULL, '8318', 1, '2022-02-13 19:00:05', '2022-02-13 19:00:24'),
(6, NULL, '2887', 1, '2022-02-13 19:01:10', '2022-02-13 19:01:24'),
(7, NULL, '6612', 1, '2022-02-14 03:37:19', '2022-02-14 03:37:50');

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
  ADD PRIMARY KEY (`historyId`),
  ADD KEY `user_id` (`userId`),
  ADD KEY `vehicle_id` (`vehicleId`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT untuk tabel `history`
--
ALTER TABLE `history`
  MODIFY `historyId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT untuk tabel `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `vehicleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT untuk tabel `verify_email`
--
ALTER TABLE `verify_email`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
  ADD CONSTRAINT `history_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `history_ibfk_2` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles` (`vehicleId`) ON DELETE SET NULL ON UPDATE CASCADE;

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
