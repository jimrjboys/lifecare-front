# LifeCare — Liste détaillée des écrans (Front)

Ce fichier liste les écrans attendus côté front, en reprenant uniquement ce qui est lisible dans les captures fournies (liste des écrans/pages + user stories visibles).

## 1) Authentification & Sécurité

### LoginScreen — Écran de connexion
- Connexion avec identifiants + mot de passe
- Authentification biométrique
- Mode hors ligne

### SecurityScreen — Écran de sécurité
- Vérification d’identité
- Gestion des permissions par rôle

## 2) Navigation / Accueil

### DashboardScreen — Tableau de bord
- Vue d’ensemble des patients assignés
- Alertes et notifications urgentes
- Statistiques rapides
- Accès rapide aux fonctionnalités principales

## 3) Gestion des patients

### PatientListScreen — Liste des patients
- Recherche et filtrage
- Vue en liste / grille
- Statut en temps réel
- Tri par priorité / urgence

### PatientProfileScreen — Profil patient
- Informations personnelles
- Historique médical
- Contacts d’urgence
- Documents médicaux

### PatientFormScreen — Ajout / modification patient
- Formulaire d’admission
- Scan de documents d’identité
- Assignation de personnel

## 4) Suivi médical

### VitalParametersScreen — Paramètres vitaux
- Saisie des mesures (tension, poids, température, etc.)
- Graphiques en temps réel
- Alertes automatiques
- Historique des mesures

#### Comportement attendu (user story visible)
- Saisie de tension artérielle "120/80", poids "70 kg", température "37.2°C"
- Enregistrement des paramètres
- Mise à jour d’un graphique d’évolution
- Génération d’une alerte si valeurs anormales

### AIEvaluationScreen — Évaluation IA
- Analyse automatique des paramètres
- Recommandations de l’IA
- Score de risque
- Rapports d’évaluation

#### Comportement attendu (user story visible)
- Analyse des paramètres vitaux + analyse de l’historique médical
- Génération d’une évaluation avec score de risque
- Propositions de recommandations
- Sauvegarde du rapport dans le dossier patient

### MedicalHistoryScreen — Historique médical
- Timeline des évènements
- Évolution des paramètres
- Notes des consultations
- Résultats d’examens

## 5) Traitement & médication

### MedicationManagementScreen — Gestion des médicaments
- Liste des prescriptions actives
- Historique des traitements
- Effets secondaires notés
- Interactions médicamenteuses

### MedicationAdminScreen — Administration de médicaments
- Planning d’administration
- Confirmation de prise
- Scan de codes-barres
- Notes d’administration

#### Comportement attendu (user story visible)
- Scan du code-barres du médicament dû selon le planning
- Confirmation d’administration + saisie de l’heure exacte
- Enregistrement de l’administration
- Mise à jour du planning
- Envoi d’une notification au médecin si nécessaire

### PrescriptionScreen — Ordonnances
- Création d’ordonnances
- Modification des posologies
- Arrêt de traitements
- Signature électronique

## 6) Statistiques & rapports

### StatisticsScreen — Tableaux de bord statistiques
- Graphiques d’évolution
- Comparaisons temporelles
- Moyennes et tendances
- Exportation de données

### ReportsScreen — Rapports personnalisés
- Génération de rapports
- Filtres avancés
- Exportation PDF
- Partage sécurisé

## 7) Financier

### ExpenseTrackingScreen — Suivi des dépenses
- Coûts par patient
- Détail des frais médicaux
- Coût des médicaments
- Frais d’hospitalisation

### InvoiceGenerationScreen — Génération de factures
- Création automatique
- Détail des prestations
- Calculs automatiques
- Validation et envoi

#### Comportement attendu (user story visible)
- Calcul des frais d’hospitalisation + ajout des coûts médicaments + ajout des frais médicaux
- Génération d’une facture PDF
- Facture prête pour envoi

### BillingScreen — Facturation
- Historique des factures
- État des paiements
- Relances automatiques
- Statistiques financières

## 8) Configuration

### SettingsScreen — Paramètres
- Configuration de l’app
- Préférences utilisateur
- Synchronisation
- Sécurité

### UserProfileScreen — Profil utilisateur
- Informations personnelles
- Permissions et rôles
- Historique d’activité
- Changement de mot de passe

## 9) Hors-ligne & synchronisation (transverse)

### Indication hors ligne
- Affichage d’une indication "Hors ligne" quand la connexion est perdue
- Stockage local des données saisies
- Accès aux données critiques sans réseau

### Synchronisation au retour en ligne
- Détection du retour de connexion
- Synchronisation de toutes les données locales
- Résolution des conflits éventuels
- Confirmation de synchronisation affichée

## 10) Services IA (transverse)

Les services IA identifiés dans les captures :
- Service d'évaluation: Analyse des paramètres vitaux
- Service de prédiction: Prédiction d'évolution
- Service d'alerte: Détection d'anomalies
- Service de recommandation: Suggestions thérapeutiques

