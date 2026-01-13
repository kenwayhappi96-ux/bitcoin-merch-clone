# 🚀 Guide d'installation - Base de données

## ✅ Tout est prêt !

### 📦 Ce qui a été fait :

1. ✅ **Packages installés** : mysql2, bcryptjs, jsonwebtoken
2. ✅ **Connexion MySQL** : `lib/db.ts` configuré pour WAMP
3. ✅ **API d'authentification** : `/api/auth/login`
4. ✅ **API produits** : `/api/products`
5. ✅ **Dashboard admin** : `/admin`
6. ✅ **Hash bcrypt correct** : Mot de passe Admin@123 hashé

### 🎯 Prochaine étape : Importer la base de données

## 📋 Instructions d'importation

### Méthode 1 : Via phpMyAdmin (Recommandé)

1. **Ouvrir phpMyAdmin**
   - Lancer WAMP
   - Aller sur `http://localhost/phpmyadmin`

2. **Créer la base de données**
   - Cliquer sur "Nouvelle base de données"
   - Nom : `bitcoin_merch`
   - Interclassement : `utf8mb4_unicode_ci`
   - Cliquer sur "Créer"

3. **Importer le fichier SQL**
   - Sélectionner la base `bitcoin_merch`
   - Cliquer sur l'onglet "Importer"
   - Cliquer sur "Choisir un fichier"
   - Sélectionner : `C:\Users\MATHIS\Downloads\bitcoin-merch-clone\database.sql`
   - Cliquer sur "Exécuter"

4. **Vérifier l'importation**
   - Vous devriez voir 13 tables créées
   - Table `admins` devrait contenir 1 ligne (Super Admin)
   - Tables `categories`, `site_settings`, `carousel_slides` devraient avoir des données

### Méthode 2 : Via ligne de commande MySQL

```bash
# Ouvrir PowerShell dans le dossier WAMP MySQL
cd C:\wamp64\bin\mysql\mysql8.X.X\bin

# Importer le fichier
.\mysql.exe -u root -p < "C:\Users\MATHIS\Downloads\bitcoin-merch-clone\database.sql"

# Appuyer sur Entrée (pas de mot de passe par défaut)
```

## 🔐 Identifiants de connexion

Une fois la BD importée, vous pouvez vous connecter avec :

- **URL** : `http://localhost:3000/login`
- **Email** : `admin@bitcoinmerch.com`
- **Mot de passe** : `Admin@123`

## 🎨 Après l'importation

### Page d'accueil
- Si **aucun produit** n'est dans la BD : Affiche "Aucun produit disponible"
- Dès que vous **ajoutez des produits** via l'admin : Ils s'affichent automatiquement

### Dashboard admin (`/admin`)
- **Statistiques** : Produits, Commandes, Revenu, etc.
- **Actions rapides** :
  - Ajouter un produit
  - Gérer les collections
  - Gérer le carousel
  - Modérer les avis
  - Paramètres

## 🐛 Résolution de problèmes

### Erreur : "Can't connect to MySQL"
```
Solution : Vérifier que WAMP est démarré (icône verte)
```

### Erreur : "Database bitcoin_merch doesn't exist"
```
Solution : Créer la BD manuellement dans phpMyAdmin avant d'importer
```

### Erreur 401 lors du login
```
Solution : La BD n'a pas été importée ou la table admins est vide
Vérifier dans phpMyAdmin que la table admins contient des données
```

### Les produits n'apparaissent pas
```
C'est NORMAL si la table products est vide !
Allez sur /admin pour ajouter des produits
```

## 📊 Structure de la base de données

```
bitcoin_merch/
├── admins (1 admin par défaut)
├── categories (5 collections)
├── products (vide - à remplir via admin)
├── product_images
├── product_variants
├── product_features
├── reviews
├── orders
├── order_items
├── newsletter_subscribers
├── contact_messages
├── site_settings (8 paramètres configurés)
└── carousel_slides (5 slides configurés)
```

## ✅ Validation de l'installation

1. ✅ WAMP démarré (icône verte)
2. ✅ BD `bitcoin_merch` créée
3. ✅ Fichier `database.sql` importé
4. ✅ Serveur Next.js lancé (`npm run dev`)
5. ✅ Login fonctionnel sur `/login`
6. ✅ Dashboard accessible sur `/admin`

---

**Vous êtes prêt !** Une fois la BD importée, tout fonctionnera automatiquement.
