-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mer. 01 avr. 2026 à 22:26
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

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
(10, 1, 'Saul Bass', '{\r\n    \"question\": \"Où Saul Bass a-t-il fait ses études artistiques ?\",\r\n    \"type\": \"map\"\r\n}'),
(11, 2, 'Saul Bass', '{\r\n    \"question\": \"Pour quel réalisateur Bass a-t-il réalisé le générique de Psychose ?\",\r\n    \"answer1\": \"Otto Preminger\",\r\n    \"answer2\": \"Stanley Kubrick\",\r\n    \"answer3\": \"Alfred Hitchcock\",\r\n    \"goodAnswer\": \"Alfred Hitchcock\",\r\n    \"type\": \"qcm\"\r\n}'),
(12, 3, 'Saul Bass', '{\r\n    \"question\": \"Quel est le mantra de Bass ?\",\r\n    \"answer1\": \"Symbolize and empasize\",\r\n    \"answer2\": \"Symbolize and summarize\",\r\n    \"answer3\": \"Symbolise and summarize\",\r\n    \"goodAnswer\": \"Symbolize and summarize\",\r\n    \"type\": \"qcm\"\r\n}'),
(13, 0, 'Alan Turing', '[\"start\"]'),
(14, 1, 'Alan Turing', '[\"discover\", \"machine\"]'),
(15, 2, 'Alan Turing', '[\"choice\", \"player_action\"]'),
(16, 3, 'Alan Turing', '[\"end\"]');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `steps`
--
ALTER TABLE `steps`
  ADD PRIMARY KEY (`id_step`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `steps`
--
ALTER TABLE `steps`
  MODIFY `id_step` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
