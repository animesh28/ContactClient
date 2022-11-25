-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 14, 2022 at 07:20 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u123014062_node`
--

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `access_token` text DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `access_token`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(1, 'eyJraWQiOiJpSVFyRVVHX2tlWkhPY2VTVEZMdW1mTGZGTWNLNHZFSmotdXZEelZtZlNFIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULkFzTlJUUmdtYUUyUHBPSkpOTElFV1dXYVoxTFBzYWFtN3VHYlNNWVdlVkUub2FydGtqaGsxenR2bGNjRTEwaDYiLCJpc3MiOiJodHRwczovL2lkZW50aXR5LmNvbnN0YW50Y29udGFjdC5jb20vb2F1dGgyL2F1czFsbTNyeTltRjd4MkphMGg4IiwiYXVkIjoiaHR0cHM6Ly9hcGkuY2MuZW1haWwvdjMiLCJpYXQiOjE2Njg0NDMxMTIsImV4cCI6MTY2ODUyOTUxMiwiY2lkIjoiODIwY2QzZDctMDZkMi00ZmI2LWEzNDgtOTY1YWRmMjkwNmNhIiwidWlkIjoiMDB1MXFidHplMmJJUnc3SE4waDgiLCJzY3AiOlsib2ZmbGluZV9hY2Nlc3MiLCJjYW1wYWlnbl9kYXRhIiwiY29udGFjdF9kYXRhIl0sImF1dGhfdGltZSI6MTY2ODI0NjE3NCwic3ViIjoic2luZ2hrdW1hcmFuaW1lc2gyOEBnbWFpbC5jb20iLCJwbGF0Zm9ybV91c2VyX2lkIjoiNjA5YTllNjQtZjY0OC00ODMxLWEwZGQtYzM5YTMwYTlhM2VmIn0.aW8H2SpNfbYL7CBYwfwllNCzdFFkG2Y0G0w8bexrrVskMSj6EdflrWYVdzbKcMkWcuO-2v54Q4xrfI8EVyZ9re7Tz7HyUHTps8qGp3UXXpSJeJFTlxL91RdKLesVNxLmnfzww1_q2OSBOZVLKqjxGPgUU1TFBnRsA2KSV0kCo6yVJbRbiT6Ru-akGPUy3nlVZ6VoeyR-1fur6evsEKQi5xe3rBcmBZKrz0dUXCy9o9GrtXOtNdjpLK3Fluuuu8CDOoZjWMqrIw1TQ5m2vmE921PXWnrI3nWNSxUQETAizpsi4GCcIo-3C_Ld2UuVrcDTZV9c0R4gfQ7TFD_VXAVgOA', 'E3p1ppj3UrZAUxOYwZXcl0GqLAw7DlESl-4udCQYQ2c', '2022-11-14 16:24:59', '2022-11-14 16:24:59');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `perm_name` varchar(255) NOT NULL,
  `perm_description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `perm_name`, `perm_description`, `createdAt`, `updatedAt`) VALUES
(1, 'user_add', 'Add User', '2022-11-11 10:32:30', '2022-11-11 10:32:30'),
(2, 'user_update', 'Update User', '2022-11-11 10:32:30', '2022-11-11 08:27:56'),
(3, 'user_get', 'Get User', '2022-11-11 10:32:30', '2022-11-11 10:32:30'),
(4, 'user_get_all', 'Get All User', '2022-11-11 10:32:30', '2022-11-11 10:32:30'),
(5, 'user_delete', 'Delete User', '2022-11-11 10:32:30', '2022-11-11 10:32:30'),
(6, 'role_add', 'Add Role', '2022-11-11 10:32:30', '2022-11-11 10:32:30'),
(7, 'role_update', 'Update Role', '2022-11-11 10:32:31', '2022-11-11 10:32:31'),
(8, 'role_get', 'Get Role', '2022-11-11 10:32:31', '2022-11-11 10:32:31'),
(9, 'role_get_all', 'Get All Role', '2022-11-11 10:32:31', '2022-11-11 10:32:31'),
(10, 'role_delete', 'Delete Role', '2022-11-11 10:32:31', '2022-11-11 10:32:31'),
(11, 'permissions_add', 'Add Permission', '2022-11-11 10:32:31', '2022-11-11 10:32:31'),
(12, 'permissions_update', 'Update Permission', '2022-11-11 10:32:31', '2022-11-11 10:32:31'),
(13, 'permissions_get', 'Get Permission', '2022-11-11 10:32:31', '2022-11-11 10:32:31'),
(14, 'permissions_get_all', 'Get All Permission', '2022-11-11 10:32:31', '2022-11-11 10:32:31'),
(15, 'permissions_delete', 'Delete Permission', '2022-11-11 10:32:31', '2022-11-11 10:32:31'),
(17, 'get_contact', 'View Contacts', '2022-11-11 17:36:57', '2022-11-13 16:19:05'),
(18, 'add_update_contact', 'Add / Update Contacts', '2022-11-13 07:11:43', '2022-11-13 16:18:25'),
(19, 'delete_contact', 'Delete Contacts', '2022-11-13 07:12:01', '2022-11-13 07:12:01');

-- --------------------------------------------------------

--
-- Table structure for table `rolepermissions`
--

CREATE TABLE `rolepermissions` (
  `id` int(11) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `perm_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rolepermissions`
--

INSERT INTO `rolepermissions` (`id`, `role_id`, `perm_id`, `createdAt`, `updatedAt`) VALUES
(32, 1, 1, '2022-11-13 07:12:55', '2022-11-13 07:12:55'),
(33, 1, 2, '2022-11-13 07:12:55', '2022-11-13 07:12:55'),
(34, 1, 3, '2022-11-13 07:12:55', '2022-11-13 07:12:55'),
(35, 1, 4, '2022-11-13 07:12:55', '2022-11-13 07:12:55'),
(36, 1, 5, '2022-11-13 07:12:55', '2022-11-13 07:12:55'),
(37, 1, 6, '2022-11-13 07:12:55', '2022-11-13 07:12:55'),
(38, 1, 8, '2022-11-13 07:12:55', '2022-11-13 07:12:55'),
(39, 1, 11, '2022-11-13 07:12:55', '2022-11-13 07:12:55'),
(40, 1, 7, '2022-11-13 07:12:55', '2022-11-13 07:12:55'),
(41, 1, 9, '2022-11-13 07:12:55', '2022-11-13 07:12:55'),
(42, 1, 10, '2022-11-13 07:12:55', '2022-11-13 07:12:55'),
(43, 1, 12, '2022-11-13 07:12:55', '2022-11-13 07:12:55'),
(44, 1, 13, '2022-11-13 07:12:55', '2022-11-13 07:12:55'),
(45, 1, 14, '2022-11-13 07:12:55', '2022-11-13 07:12:55'),
(46, 1, 15, '2022-11-13 07:12:55', '2022-11-13 07:12:55'),
(47, 1, 17, '2022-11-13 07:12:55', '2022-11-13 07:12:55'),
(48, 1, 18, '2022-11-13 07:12:55', '2022-11-13 07:12:55'),
(49, 1, 19, '2022-11-13 07:12:55', '2022-11-13 07:12:55'),
(67, 2, 8, '2022-11-14 08:54:50', '2022-11-14 08:54:50'),
(68, 11, 9, '2022-11-14 12:52:25', '2022-11-14 12:52:25'),
(69, 11, 7, '2022-11-14 12:52:25', '2022-11-14 12:52:25'),
(70, 11, 8, '2022-11-14 12:52:25', '2022-11-14 12:52:25');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role_name` varchar(255) NOT NULL,
  `role_description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role_name`, `role_description`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 'Administrator', '2022-11-11 10:33:00', '2022-11-14 09:53:37'),
(2, 'user', 'User', '2022-11-11 06:10:53', '2022-11-11 06:10:53'),
(11, 'staff', 'Staff', '2022-11-14 12:18:05', '2022-11-14 12:18:05'),
(12, 'test', 'test', '2022-11-14 17:52:07', '2022-11-14 17:52:07');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20221111043354-create-role.js'),
('20221111043511-create-permission.js'),
('20221111043758-create-user.js'),
('20221111044915-create-role-permission.js'),
('20221112083121-create-contact.js'),
('20221112090040-create-contact.js');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role_id`, `email`, `password`, `fullname`, `createdAt`, `updatedAt`) VALUES
(25, 1, 'admin@gmail.com', '$2a$10$nw6MXb4jNgUBHP7Eu4UukefTdeMO1WFY1WphMMrWsglITeNdGnKlW', 'sys admin', '2022-11-13 12:58:57', '2022-11-13 12:58:57'),
(26, 2, 'user@gmail.com', '$2a$10$eCEkbmjRi.B60KVNITFp1.NwrGJiTVGuiDcIteUITNJATbs3al6S.', 'User', '2022-11-13 13:15:17', '2022-11-13 13:15:17'),
(29, 11, 'staff@gmail.com', '$2a$10$K5KQXlZvWLUhqCCCiyig3.k.5CpSiNpd.1UgFEVo.kcA6qSJ9SnAi', 'Staff', '2022-11-14 12:52:42', '2022-11-14 12:52:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `perm_name` (`perm_name`);

--
-- Indexes for table `rolepermissions`
--
ALTER TABLE `rolepermissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `role_name` (`role_name`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `rolepermissions`
--
ALTER TABLE `rolepermissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
