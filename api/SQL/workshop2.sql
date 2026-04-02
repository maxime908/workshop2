-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 02 avr. 2026 à 09:09
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

--
-- Déchargement des données de la table `game`
--

INSERT INTO `game` (`id_game`, `device_id`, `startDate`, `endDate`, `id_page`, `score`) VALUES
(55, 'TESTTESTTEST2456789', '2026-04-01 12:38:05', '2026-04-02 06:36:25', 4, 0),
(56, 'TESTTESTTEST2456789', '2026-04-01 17:34:52', '2026-04-02 06:36:25', 4, 0),
(57, 'TESTTESTTEST2456789', '2026-04-01 20:21:27', '2026-04-02 06:36:25', 4, 0),
(58, 'TESTTESTTEST2456789', '2026-04-01 20:37:54', '2026-04-02 06:36:25', 4, 0),
(59, 'TESTTESTTEST2456789', '2026-04-02 06:36:25', NULL, 4, 0);

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
  `question` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `interaction` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`interaction`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `steps`
--

INSERT INTO `steps` (`id_step`, `number`, `question`, `interaction`) VALUES
(1, 0, '{\"choices\": [{\"date\": 1914, \"name\": \"Naissance\"}, {\"date\": 1933, \"name\": \"Grand scandale\"}, {\"date\": 1933, \"name\": \"Grand succès\"}, {\"date\": 1933, \"name\": \"Mariage\"}, {\"date\": 1937, \"name\": \"Fuite de l\'Europe\"}, {\"date\": 1937, \"name\": \"Signe avec la MGM\"}, {\"date\": 1942, \"name\": \"Nouveau système de comm\"}, {\"date\": 2000, \"name\": \"Décès\"}]}'"),
(2, 1, '{\"choices\": [{\"text\": \"Extase\", \"label\": \"A\", \"correct\": true}, {\"text\": \"...\", \"label\": \"B\", \"correct\": false}, {\"text\": \"...\", \"label\": \"C\", \"correct\": false}], \"question\": \"Quel fut le film qui fit scandale ?\"}'),
(3, 2, '{\"correct\": 0, \"message\": \"Pas un dollar — les brevets ayant expiré avant que l\'industrie ne s\'en empare.\", \"question\": \"Combien Hedy Lamarr a-t-elle pu toucher par les brevets de ses inventions ?\"}'),
(4, 3, '[\"discover\", \"invention\"]', '[\"end\"]'),
(5, 0, '[\"discover\", \"invention\"]', '[\"start\"]'),
(6, 1, 'Nikola Tesla', '{\r\n    \"question\": \"Dans quelle ville Tesla a-t-il commencé ses études avant d''intégrer l''École polytechnique de Graz ?\",\r\n    \"answer1\": \"Paris\",\r\n    \"answer2\": \"Berlin\",\r\n    \"answer3\": \"Karlovac\",\r\n    \"goodAnswer\": \"Karlovac\",\r\n    \"type\": \"qcm1\"\r\n}'),
(7, 2, 'Nikola Tesla', '{\r\n    \"question\": \"Trouve la bobine de Tesla:\",\r\n    \"answer1\": \"illu1.svg\",\r\n    \"answer2\": \"illu2.svg\",\r\n    \"answer3\": \"illu3.svg\",\r\n    \"answer4\": \"illu4.svg\",\r\n    \"goodAnswer\": \"illu2.svg\",\r\n    \"type\": \"qcm2\"\r\n}'),
(8, 3, 'Nikola Tesla', '{\r\n    \"question\": \"Remplis la frise chronologique\",\r\n    \"choices\": [\r\n        { \"date\": \"1856\", \"name\": \"Naissance\" },\r\n        { \"date\": \"1875\", \"name\": \"Intègre l’école polytechnique de Graz\" },\r\n        { \"date\": \"1901\", \"name\": \"Construction de la tour Wardenclyffe\" },\r\n        { \"date\": \"1917\", \"name\": \"Démolition de la tour Wardenclyffe\" },\r\n        { \"date\": \"1943\", \"name\": \"Mort\" }\r\n],\r\n    \"type\": \"frise\"\r\n}'),
(9, 0, 'Saul Bass', '[\"start\"]'),
(10, 1, 'Saul Bass', '{\r\n    \"question\": \"Où Saul Bass a-t-il fait ses études artistiques ?\",\r\n    \"type\": \"map\"\r\n}'),
(11, 2, 'Saul Bass', '{\r\n    \"question\": \"Pour quel réalisateur Bass a-t-il réalisé le générique de Psychose ?\",\r\n    \"answer1\": \"Otto Preminger\",\r\n    \"answer2\": \"Stanley Kubrick\",\r\n    \"answer3\": \"Alfred Hitchcock\",\r\n    \"goodAnswer\": \"Alfred Hitchcock\",\r\n    \"type\": \"qcm\"\r\n}'),
(12, 3, 'Saul Bass', '{\r\n    \"question\": \"Quel est le mantra de Bass ?\",\r\n    \"answer1\": \"Symbolize and empasize\",\r\n    \"answer2\": \"Symbolize and summarize\",\r\n    \"answer3\": \"Symbolise and summarize\",\r\n    \"goodAnswer\": \"Symbolize and summarize\",\r\n    \"type\": \"qcm\"\r\n}'),
(13, 0, '[\"discover\", \"invention\"]', '[\"start\"]'),
(14, 1, '[\"discover\", \"invention\"]', '[\"discover\", \"machine\"]'),
(15, 2, '[\"discover\", \"invention\"]', '[\"choice\", \"player_action\"]'),
(16, 3, '[\"discover\", \"invention\"]', '[\"end\"]');

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
  MODIFY `id_game` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

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
  ADD CONSTRAINT `pages_steps_ibfk_1` FOREIGN KEY (`id_page`) REFERENCES `pages` (`id_page`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
