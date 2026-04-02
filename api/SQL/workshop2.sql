-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 02 avr. 2026 à 13:45
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
(55, 'TESTTESTTEST2456789', '2026-04-01 12:38:05', '2026-04-02 09:07:13', 4, 0),
(56, 'TESTTESTTEST2456789', '2026-04-01 17:34:52', '2026-04-02 09:07:13', 4, 0),
(57, 'TESTTESTTEST2456789', '2026-04-01 20:21:27', '2026-04-02 09:07:13', 4, 0),
(58, 'TESTTESTTEST2456789', '2026-04-01 20:37:54', '2026-04-02 09:07:13', 4, 0),
(59, 'TESTTESTTEST2456789', '2026-04-02 06:36:25', '2026-04-02 09:07:13', 4, 0),
(60, 'TESTTESTTEST2456789', '2026-04-02 09:07:13', '2026-04-02 11:44:51', 4, 5);

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
(1, 0, '{\r\n  \"choices\": [\r\n    { \"date\": 1914, \"name\": \"Naissance\" },\r\n    { \"date\": 1933, \"name\": \"Grand scandale\" },\r\n    { \"date\": 1933, \"name\": \"Grand succès\" },\r\n    { \"date\": 1933, \"name\": \"Mariage\" },\r\n    { \"date\": 1937, \"name\": \"Fuite de l\'Europe\" },\r\n    { \"date\": 1937, \"name\": \"Signe avec la MGM\" },\r\n    { \"date\": 1942, \"name\": \"Nouveau système de comm\" },\r\n    { \"date\": 2000, \"name\": \"Décès\" }\r\n  ]\r\n}', '[\"start\"]'),
(2, 1, '{\r\n  \"choices\": [\r\n    { \"text\": \"Extase\", \"label\": \"A\", \"correct\": true },\r\n    { \"text\": \"...\", \"label\": \"B\", \"correct\": false },\r\n    { \"text\": \"...\", \"label\": \"C\", \"correct\": false }\r\n  ],\r\n  \"question\": \"Quel fut le film qui fit scandale ?\"\r\n}', '[\"discover\", \"invention\"]'),
(3, 2, '{\r\n  \"correct\": 0,\r\n  \"message\": \"Pas un dollar — les brevets ayant expiré avant que l\'industrie ne s\'en empare.\",\r\n  \"question\": \"Combien Hedy Lamarr a-t-elle pu toucher par les brevets de ses inventions ?\"\r\n}', '[\"choice\", \"player_action\"]'),
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
(14, 1, '{\r\n  \"name\": \"La Machine Enigma\",\r\n  \"question\": \"Déchiffrez le code secret à l\'aide de la machine.\"\r\n}', '{\r\n  \"cryptedText\": \"XIXK\",\r\n  \"goodAnswer\": \"ALAN\"\r\n}'),
(15, 2, '{\r\n  \"name\": \"Test de connaissances\",\r\n  \"question\": \"Pendant quel conflit majeur Alan Turing a-t-il joué un rôle décisif en décryptant les messages de la machine Enigma ?\"\r\n}', '{\r\n  \"answers\": [\r\n    \"La Première Guerre mondiale\",\r\n    \"La Seconde Guerre mondiale\",\r\n    \"La Guerre de Sécession\",\r\n    \"La Guerre Froide\"\r\n  ],\r\n  \"goodAnswer\": \"La Seconde Guerre mondiale\"\r\n}'),
(16, 3, '{\r\n  \"name\": \"Le Test de Turing\",\r\n  \"question\": \"Lequel de ces deux est véritable être humain ?\"\r\n}', '{\r\n  \"answers\": [\r\n    \"Personne A\",\r\n    \"Personne B\"\r\n  ],\r\n  \"goodAnswer\": \"Personne B\"\r\n}');

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
  MODIFY `id_game` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

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
