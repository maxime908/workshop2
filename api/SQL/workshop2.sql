-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 30 mars 2026 à 15:34
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `workshop2`
--

-- --------------------------------------------------------

--
-- Structure de la table `game`
--

CREATE TABLE `game` (
  `id_game` int(11) NOT NULL,
  `mac` text NOT NULL,
  `startDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `endGame` timestamp NULL DEFAULT NULL,
  `id_page` int(11) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `game`
--

INSERT INTO `game` (`id_game`, `mac`, `startDate`, `endGame`, `id_page`, `score`) VALUES
(2, '418', '2026-03-30 13:06:27', '2026-03-30 13:06:27', 3, 5);

-- --------------------------------------------------------

--
-- Structure de la table `pages`
--

CREATE TABLE `pages` (
  `id_page` int(11) NOT NULL,
  `name` varchar(24) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `pages`
--

INSERT INTO `pages` (`id_page`, `name`, `description`) VALUES
(3, 'Lamarr', 'Une description de Lamarr'),
(4, 'Bass', 'Une description de Lamarr'),
(5, 'Tesla', 'Une description de Tesla'),
(6, 'Turing', 'Une description de Turing');

-- --------------------------------------------------------

--
-- Structure de la table `pages_steps`
--

CREATE TABLE `pages_steps` (
  `id_page_step` int(11) NOT NULL,
  `id_page` int(11) NOT NULL,
  `id_step` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `pages_steps`
--

INSERT INTO `pages_steps` (`id_page_step`, `id_page`, `id_step`) VALUES
(1, 5, 1),
(2, 3, 1);

-- --------------------------------------------------------

--
-- Structure de la table `steps`
--

CREATE TABLE `steps` (
  `id_step` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `interaction` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`interaction`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `steps`
--

INSERT INTO `steps` (`id_step`, `number`, `name`, `interaction`) VALUES
(1, 1, 'Une question', '[\"Une intération\"]');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`id_game`),
  ADD KEY `id_page` (`id_page`);

--
-- Index pour la table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id_page`);

--
-- Index pour la table `pages_steps`
--
ALTER TABLE `pages_steps`
  ADD PRIMARY KEY (`id_page_step`),
  ADD KEY `id_page` (`id_page`),
  ADD KEY `id_step` (`id_step`);

--
-- Index pour la table `steps`
--
ALTER TABLE `steps`
  ADD PRIMARY KEY (`id_step`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `game`
--
ALTER TABLE `game`
  MODIFY `id_game` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `pages`
--
ALTER TABLE `pages`
  MODIFY `id_page` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `pages_steps`
--
ALTER TABLE `pages_steps`
  MODIFY `id_page_step` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `steps`
--
ALTER TABLE `steps`
  MODIFY `id_step` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `game`
--
ALTER TABLE `game`
  ADD CONSTRAINT `game_ibfk_1` FOREIGN KEY (`id_page`) REFERENCES `pages` (`id_page`);

--
-- Contraintes pour la table `pages_steps`
--
ALTER TABLE `pages_steps`
  ADD CONSTRAINT `pages_steps_ibfk_1` FOREIGN KEY (`id_page`) REFERENCES `pages` (`id_page`),
  ADD CONSTRAINT `pages_steps_ibfk_2` FOREIGN KEY (`id_step`) REFERENCES `steps` (`id_step`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
