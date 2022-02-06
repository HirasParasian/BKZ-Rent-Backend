-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 06 Feb 2022 pada 16.26
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
  `category_id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`category_id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'bike', '2022-02-02 03:55:08', NULL),
(2, 'motorbike', '2022-02-02 03:55:14', NULL),
(3, 'car', '2022-02-02 03:55:18', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `history`
--

CREATE TABLE `history` (
  `history_id` int(11) NOT NULL,
  `rentStartDate` datetime NOT NULL,
  `rentEndDAte` datetime NOT NULL,
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

INSERT INTO `history` (`history_id`, `rentStartDate`, `rentEndDAte`, `prepayment`, `rating`, `user_id`, `vehicle_id`, `createdAt`, `updatedAt`) VALUES
(1, '2022-02-03 11:30:04', '2022-02-09 11:30:04', 0, 4, 1, 9, '2022-02-02 04:30:37', '2022-02-06 07:03:40'),
(2, '2022-02-09 16:07:49', '2022-02-18 16:07:49', 0, 5, 1, 19, '2022-02-05 09:08:18', '2022-02-06 07:03:23'),
(3, '2022-02-05 16:25:26', '2022-02-09 16:25:26', 0, 5, 1, 17, '2022-02-05 09:25:59', '2022-02-06 07:03:26'),
(4, '2022-02-05 10:26:02', '2022-02-17 16:26:02', 0, 4, 1, 17, '2022-02-05 09:26:12', '2022-02-06 07:03:34'),
(5, '2022-02-06 07:53:59', '2022-02-06 07:53:59', 0, 5, 5, 15, '2022-02-06 06:54:37', '2022-02-06 07:03:48'),
(6, '2022-02-06 07:54:39', '2022-02-06 07:54:39', 0, 4, 5, 31, '2022-02-06 06:55:02', '2022-02-06 07:03:54'),
(7, '2022-02-06 07:55:05', '2022-02-10 13:55:05', 0, 4, 5, 3, '2022-02-06 06:55:41', '2022-02-06 07:03:58'),
(8, '2022-02-06 07:55:47', '2022-02-09 13:55:47', 0, 5, 4, 27, '2022-02-06 06:56:25', '2022-02-06 07:04:00'),
(9, '2022-02-08 13:56:28', '2022-02-12 13:56:28', 0, 4, 1, 10, '2022-02-06 06:57:00', '2022-02-06 07:04:02');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `fullName` varchar(80) NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(80) NOT NULL,
  `gender_id` enum('Male','Female') NOT NULL,
  `address` varchar(80) NOT NULL,
  `mobileNumber` varchar(80) NOT NULL,
  `birthDate` date NOT NULL,
  `displayName` varchar(80) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`user_id`, `fullName`, `email`, `password`, `gender_id`, `address`, `mobileNumber`, `birthDate`, `displayName`, `createdAt`, `updatedAt`) VALUES
(1, 'Hiras Parasian Doloksaribu', '1881011@unai.edu', 'hiras123', 'Male', 'Bekasi Utara', '081388981122', '1999-11-08', 'Hiras', '2022-02-02 04:07:33', NULL),
(2, 'Bill Gates', 'bill@mail.com', 'bill123', 'Male', 'Nganjuk', '0081388981133', '1983-02-09', 'Bill', '2022-02-02 04:09:01', NULL),
(3, 'Mark Zuckenberg', 'mark@facebook.com', 'mark123', 'Male', 'Bandung', '081388981122', '1983-02-08', 'Mark', '2022-02-06 06:51:28', NULL),
(4, 'Jeff Bezos', 'jeff@amazon.com', 'jeff123', 'Male', 'Solo', '082198237534', '1977-02-09', 'Jeff', '2022-02-06 06:52:25', NULL),
(5, 'Cinta Laura', 'cinta@laura.com', 'cinta123', 'Female', 'Jekardah', '082109879876', '1993-02-01', 'Cinta', '2022-02-06 06:53:40', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `vehicles`
--

CREATE TABLE `vehicles` (
  `vehicle_id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `price` int(80) NOT NULL,
  `description` varchar(80) NOT NULL,
  `location` varchar(80) NOT NULL,
  `category` int(11) DEFAULT NULL,
  `isAvailable` tinyint(1) NOT NULL,
  `stock` int(11) NOT NULL,
  `image` varchar(80) NOT NULL,
  `rent_count` int(11) NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `vehicles`
--

INSERT INTO `vehicles` (`vehicle_id`, `name`, `price`, `description`, `location`, `category`, `isAvailable`, `stock`, `image`, `rent_count`, `createdAt`, `updatedAt`) VALUES
(1, 'Sepeda Gunung', 81000, 'yellow', 'Jakarta', 1, 1, 8, 'sepeda.png', 9, '2022-01-02 04:24:49', '2022-02-06 08:00:52'),
(2, 'Sepeda Gunung', 300000, 'Yellow, Blue, Green', 'Bandung', 1, 1, 3, 'sepeda.png', 0, '2022-01-02 04:25:25', '2022-02-06 08:01:02'),
(3, 'Sepeda Onthel', 300000, 'Grey Only', 'Bekasi', 1, 1, 3, 'sepeda.png', 0, '2022-01-29 04:25:48', '2022-02-06 08:03:35'),
(4, 'Sepeda Fixie', 300000, 'Red Only', 'Bekasi', 1, 1, 3, 'sepeda.png', 0, '2022-01-30 04:26:18', '2022-02-06 08:03:39'),
(5, 'Sepeda BMX', 300000, 'Red, Green, Blue', 'Bekasi', 1, 1, 3, 'sepeda.png', 8, '2022-02-01 04:26:46', '2022-02-06 08:02:40'),
(6, 'Sepeda Tandem', 300000, 'Silver Only', 'Bekasi', 1, 1, 3, 'sepeda.png', 0, '2022-02-02 04:26:58', NULL),
(7, 'Beat 2019', 300000, 'Red, White', 'Bekasi', 2, 1, 3, 'sepeda.png', 33, '2022-02-02 04:28:08', '2022-02-02 04:29:08'),
(8, 'Beat 2020', 300000, 'Black Only', 'Bekasi', 2, 1, 3, 'sepeda.png', 0, '2022-02-02 04:28:08', '2022-02-02 04:29:20'),
(9, 'Beat 2021', 300000, 'Blue, Grey', 'Bekasi', 2, 1, 3, 'sepeda.png', 0, '2022-02-02 04:28:08', '2022-02-02 04:29:28'),
(10, 'Beat 2022', 300000, 'Yellow, Red', 'Bekasi', 2, 1, 3, 'sepeda.png', 0, '2022-02-02 04:28:08', '2022-02-02 04:29:37'),
(11, 'Mitsubishi Xpander', 300000, 'Red Only', 'Jakarta', 3, 1, 3, 'sepeda.png', 12, '2022-02-02 04:28:08', NULL),
(12, 'Toyota Innova', 300000, 'Red Only', 'Jakarta', 3, 1, 3, 'sepeda.png', 0, '2022-02-02 04:28:08', NULL),
(13, 'Honda Brio', 300000, 'Red Only', 'Jakarta', 3, 1, 3, 'sepeda.png', 0, '2022-02-02 04:28:08', NULL),
(14, 'Toyota Calya', 300000, 'Red Only', 'Jakarta', 3, 1, 3, 'sepeda.png', 2, '2022-02-02 04:28:08', NULL),
(15, 'Wuling Confero', 300000, 'Red Only', 'Jakarta', 3, 1, 3, 'sepeda.png', 0, '2022-02-02 04:28:08', NULL),
(16, 'Daihatsu Terios', 300000, 'Red Only', 'Jakarta', 3, 1, 3, 'sepeda.png', 0, '2022-02-02 04:28:08', NULL),
(17, 'Lamborghini A', 30000, 'Red Only', 'Abu Dhabi', 3, 1, 30, 'lambo.png', 0, '2022-02-05 08:24:33', NULL),
(18, 'Lamborghini A', 30000, 'Red Only', 'Abu Dhabi', 3, 1, 30, 'lambo.png', 0, '2022-02-05 08:24:58', NULL),
(19, 'Lamborghini B', 30000, 'Red Only', 'Abu Dhabi', 3, 1, 30, 'lambo.png', 0, '2022-02-05 08:27:14', NULL),
(20, 'Lamborghini C', 30000, 'Red Only', 'Abu Dhabi', 3, 1, 30, 'lambo.png', 0, '2022-02-05 08:33:47', NULL),
(22, 'Suzuki Carry PU', 230000, 'Blue, Red', 'Beijing', 3, 1, 3, 'carry.png', 0, '2022-02-06 06:35:13', NULL),
(23, 'Toyota Rush', 240000, 'Pink Only', 'Texaz', 3, 0, 0, 'rush.png', 0, '2022-02-06 06:36:16', NULL),
(24, 'Daihatsu Xenia', 235000, 'White Only', 'FakFak - Papua', 3, 1, 3, 'xenia.png', 0, '2022-02-06 06:37:40', NULL),
(25, 'Daihatsu Sigra', 220000, 'Orange, White', 'Kupang', 3, 1, 4, 'sigra.png', 0, '2022-02-06 06:38:21', NULL),
(26, 'Daihatsu Gran Max PU', 200500, 'Blue, Grey', 'Manado', 3, 1, 10, 'granmax.png', 0, '2022-02-06 06:39:41', NULL),
(27, 'Toyota Fortuner', 257200, 'Black Only', 'Surabaya', 3, 1, 6, 'fortuner.png', 0, '2022-02-06 06:40:45', NULL),
(28, 'Mitsubishi Colt L300 PU', 199000, 'Maroon, Cyan', 'Bekasi', 3, 1, 12, 'colt.png', 0, '2022-02-06 06:42:06', NULL),
(29, 'Mitsubishi Pajero Sport', 197990, 'Black Only', 'Jakarta', 3, 1, 7, 'pajero.png', 0, '2022-02-06 06:43:01', NULL),
(30, 'Honda Scoopy eSP', 70000, 'Red, Blue, White', 'Bekasi', 2, 1, 8, 'scoopyesp.png', 0, '2022-02-06 06:44:04', NULL),
(31, 'Yamaha N-Max', 80000, 'Black Only', 'Jakarta', 2, 1, 9, 'nmax.png', 0, '2022-02-06 06:44:45', NULL),
(32, 'Yamaha New V-ixion', 75000, 'Blue Only', 'Bandung', 2, 1, 4, 'vixion.png', 0, '2022-02-06 06:45:30', NULL),
(33, 'Kawasaki KLX 150', 80000, 'Black, White', 'Bekasi', 2, 1, 3, 'KLX.png', 0, '2022-02-06 06:46:15', NULL),
(34, 'Honda Sonic 150 R', 65000, 'Red, Black', 'Bekasi', 2, 1, 3, 'sonic.png', 0, '2022-02-06 06:47:15', NULL),
(35, 'Honda Verza', 66000, 'Black Only', 'Bandung', 2, 1, 2, 'verza.png', 0, '2022-02-06 06:48:03', NULL),
(36, 'Honda CB 150 R Street Fire', 85000, 'Red Only', 'Bandung', 2, 1, 6, 'cbr150.png', 0, '2022-02-06 06:48:43', NULL);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indeks untuk tabel `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`history_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `vehicle_id` (`vehicle_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indeks untuk tabel `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`vehicle_id`),
  ADD KEY `category` (`category`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `history`
--
ALTER TABLE `history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `vehicle_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `history_ibfk_2` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`vehicle_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`category`) REFERENCES `category` (`category_id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
