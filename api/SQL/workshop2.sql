-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 31 mars 2026 à 16:03
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
  `device_id` text NOT NULL,
  `startDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `endDate` timestamp NULL DEFAULT NULL,
  `id_page` int(11) NOT NULL,
  `score` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(3, 'Lamarr', 'Actrice hollywoodienne et inventrice autrichienne, Hedy Lamarr est célèbre à la fois pour sa carrière au cinéma et pour avoir co-inventé une technologie de transmission par étalement de spectre, à l’origine du Wi-Fi et du Bluetooth.'),
(4, 'Bass', 'Designer graphique et cinéaste américain, Saul Bass est célèbre pour ses génériques de films innovants et ses logos emblématiques. Son style minimaliste a profondément influencé le design moderne.'),
(5, 'Tesla', 'Inventeur et ingénieur visionnaire, Tesla est connu pour ses travaux sur le courant alternatif et ses nombreuses innovations en électricité. Ses recherches ont largement contribué au développement des systèmes électriques modernes.'),
(6, 'Turing', 'Mathématicien britannique, Turing est considéré comme l’un des pères de l’informatique. Il a joué un rôle crucial dans le décryptage des codes pendant la Seconde Guerre mondiale et a posé les bases de l’intelligence artificielle.');

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
(1, 3, 1),
(2, 3, 2),
(3, 3, 3),
(4, 3, 4),
(5, 5, 5),
(6, 5, 6),
(7, 5, 7),
(8, 5, 8),
(9, 4, 9),
(10, 4, 10),
(11, 4, 11),
(12, 4, 12),
(13, 6, 13),
(14, 6, 14),
(15, 6, 15),
(16, 6, 16);

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
(1, 0, 'Hedy Lamarr', '[\"start\"]'),
(2, 1, 'Hedy Lamarr', '[\"discover\", \"invention\"]'),
(3, 2, 'Hedy Lamarr', '[\"choice\", \"player_action\"]'),
(4, 3, 'Hedy Lamarr', '[\"end\"]'),
(5, 0, 'Nikola Tesla', '[\"start\"]'),
(6, 1, 'Nikola Tesla', '[\"discover\", \"electricity\"]'),
(7, 2, 'Nikola Tesla', '[\"choice\", \"player_action\"]'),
(8, 3, 'Nikola Tesla', '[\"end\"]'),
(9, 0, 'Saul Bass', '[\"start\"]'),
(10, 1, 'Saul Bass', '[\"discover\", \"design\"]'),
(11, 2, 'Saul Bass', '[\"choice\", \"player_action\"]'),
(12, 3, 'Saul Bass', '[\"end\"]'),
(13, 0, 'Alan Turing', '[\"start\"]'),
(14, 1, 'Alan Turing', '[\"discover\", \"machine\"]'),
(15, 2, 'Alan Turing', '[\"choice\", \"player_action\"]'),
(16, 3, 'Alan Turing', '[\"end\"]');

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
  MODIFY `id_game` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT pour la table `pages`
--
ALTER TABLE `pages`
  MODIFY `id_page` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `pages_steps`
--
ALTER TABLE `pages_steps`
  MODIFY `id_page_step` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `steps`
--
ALTER TABLE `steps`
  MODIFY `id_step` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

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
