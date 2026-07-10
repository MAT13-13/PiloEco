# 🏗️ PiloEco Architecture

Ce document décrit l'architecture produit et technique de PiloEco jusqu'à la V1.

---

# 🎯 Vision technique

PiloEco est construit comme un SaaS modulaire.

Chaque partie a un rôle clair :

- Le Dashboard affiche.
- Le Brain décide.
- L'Engine calcule.
- Supabase mémorise.
- OpenAI explique.
- Stripe monétise.

---

# 🧠 Pilo Brain

Le Brain est le cerveau de Pilo.

Il décide :

- quelle mission est prioritaire ;
- quel message afficher ;
- quel niveau donner à l'utilisateur ;
- quels badges débloquer ;
- quelle progression montrer.

Le Brain ne fait pas de calcul de prix détaillé.

---

# ⚙️ Pilo Engine

L'Engine est le moteur de calcul.

Il calcule :

- les économies possibles ;
- les comparaisons d'offres ;
- les scores ;
- les recommandations ;
- les classements.

L'Engine ne fait pas d'affichage.

---

# 🐦 Pilo Core

Le Core gère l'identité de Pilo :

- humeur ;
- ton ;
- personnalité ;
- messages ;
- encouragements.

---

# ☁️ Supabase

Supabase est la mémoire de PiloEco.

Tables principales prévues :

- profiles
- analyses
- missions
- badges
- user_badges
- notifications
- activity_logs
- subscriptions
- user_preferences

---

# 🤖 OpenAI

OpenAI ne décide jamais.

OpenAI sert uniquement à :

- reformuler ;
- expliquer ;
- encourager ;
- personnaliser le ton.

Les calculs et décisions restent dans PiloEco.

---

# 💎 Premium

Premium débloque des fonctionnalités, mais ne remplace pas l'expérience gratuite.

Gratuit :

- analyse ;
- comparateurs ;
- missions ;
- dashboard.

Premium :

- historique illimité ;
- conseils IA ;
- alertes ;
- statistiques avancées ;
- PiloLife ;
- objectifs personnalisés.

---

# 💳 Stripe

Stripe gère :

- paiements ;
- abonnements ;
- factures ;
- renouvellements ;
- annulations.

Le statut Premium est stocké dans Supabase.

---

# 🌱 PiloLife

PiloLife est le coach des économies du quotidien.

Modules prévus :

- courses ;
- maison ;
- voiture ;
- animaux ;
- santé ;
- famille ;
- budget.

---

# 📱 Parcours utilisateur V1

```txt
Accueil
  ↓
Inscription / Connexion
  ↓
Analyse des dépenses
  ↓
Dashboard
  ↓
Priorité du jour
  ↓
Mission
  ↓
Validation
  ↓
Progression
  ↓
Premium / PiloLife
```

---

# 📂 Structure cible

```txt
src/app/
│
├── components/
├── dashboard/
├── missions/
├── services/
├── data/
├── lib/
└── types/
```

---

# 📌 Règles d'architecture

1. Le Dashboard affiche, il ne décide pas.
2. Le Brain décide, il ne calcule pas les prix.
3. L'Engine calcule, il n'affiche rien.
4. Supabase mémorise tout ce qui doit survivre.
5. OpenAI explique, mais ne décide jamais.
6. Premium débloque des fonctionnalités sans casser le gratuit.
7. Chaque nouvelle fonctionnalité doit avoir une place claire.

---

# 🧪 Règle avant chaque commit

Avant chaque commit :

- le projet compile ;
- aucune erreur TypeScript visible ;
- la fonctionnalité a été testée ;
- la documentation utile est mise à jour ;
- le message de commit est clair.