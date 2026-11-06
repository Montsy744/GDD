# GDD — Gestion des dépenses

Application web de suivi des transactions. Le projet comprend une API REST Django et une interface Next.js pour consulter, ajouter et supprimer des transactions.

## Fonctionnalités

- Afficher les transactions et leur date.
- Ajouter une transaction avec une description et un montant.
- Supprimer une transaction.
- Calculer le solde, le total des revenus et le total des dépenses.
- Afficher une barre de progression des dépenses par rapport aux revenus.

## Technologies

- **Backend :** Python 3, Django, Django REST Framework, SQLite et django-cors-headers.
- **Frontend :** Next.js, React, TypeScript, Axios, Tailwind CSS et DaisyUI.
- **Gestion des dépendances frontend :** pnpm.

## Prérequis

- Python 3
- Node.js et pnpm

## Installation et lancement

Lancez le backend et le frontend dans deux terminaux distincts depuis la racine du dépôt.

### 1. Backend

Activez l'environnement virtuel fourni avec le projet, installez les dépendances Python et appliquez les migrations :

```bash
source backend/env/bin/activate
cd backend
python3 -m pip install Django djangorestframework django-cors-headers
python3 manage.py migrate
python3 manage.py runserver
```

L'API est alors disponible à l'adresse http://127.0.0.1:8000/.

Pour quitter l'environnement virtuel, utilisez `deactivate`.

### 2. Frontend

Dans un autre terminal :

```bash
cd frontend
pnpm install
cp .env.exemple .env.local
pnpm dev
```

Si `.env.local` existe déjà, ne le remplacez pas : vérifiez qu'il contient cette variable :

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:8000/
```

L'interface est disponible à l'adresse http://localhost:3000/.

## API

Toutes les routes sont préfixées par `/api/`.

| Méthode | Route | Description | Réponse habituelle |
|---|---|---|---|
| `GET` | `/api/transactions/` | Liste les transactions, de la plus récente à la plus ancienne. | `200 OK` |
| `POST` | `/api/transactions/` | Crée une transaction à partir de `text` et `amount`. | `201 Created` |
| `GET` | `/api/transactions/<id>/` | Récupère une transaction par son identifiant UUID. | `200 OK` |
| `PUT` / `PATCH` | `/api/transactions/<id>/` | Modifie une transaction. | `200 OK` |
| `DELETE` | `/api/transactions/<id>/` | Supprime une transaction. | `204 No Content` |

Exemple de corps pour créer une transaction :

```json
{
  "text": "Courses",
  "amount": -42.50
}
```

Chaque transaction contient un identifiant UUID (`id`), une description (`text`), un montant décimal (`amount`) et une date de création (`created_at`). Les montants positifs sont comptés comme des revenus et les montants négatifs comme des dépenses.

## Tests et commandes utiles

Backend, depuis le dossier `backend` avec l'environnement virtuel activé :

```bash
python3 manage.py test
```

Frontend, depuis le dossier `frontend` :

```bash
pnpm lint
pnpm build
```

## Structure du projet

```text
backend/
  api/          Modèle, sérialiseur, vues, routes et tests de l'API
  backend/      Configuration et routes principales Django
  db.sqlite3    Base de données SQLite locale
  manage.py     Commande de gestion Django
frontend/
  app/          Pages, composants, services API et types TypeScript
  package.json  Scripts et dépendances frontend
```
