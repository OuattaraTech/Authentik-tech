# Authentic Tech — Guide de personnalisation

> Site vitrine professionnel — Solutions Digitales & Communication Visuelle

---

## 📁 Structure du projet

```
authentic-tech/
│
├── index.html              ← Page principale (structure HTML uniquement)
│
├── css/
│   └── style.css           ← Tous les styles visuels du site
│
├── js/
│   ├── main.js             ← Interactions, formulaire, WhatsApp, animations UI
│   ├── hero-3d.js          ← Animation 3D globe digital (section hero)
│   └── team-3d.js          ← Animation 3D équipe (section à propos)
│
├── images/
│   └── LISEZ-MOI.txt       ← Liste de toutes les images à préparer
│
└── README.md               ← Ce fichier
```

---

## 🚀 Mise en ligne

1. Ouvrez les fichiers avec un éditeur de texte (VS Code recommandé)
2. Faites les 4 configurations essentielles ci-dessous
3. Placez vos images dans `images/`
4. Uploadez **tout le dossier** sur votre hébergeur (FTP, cPanel, Netlify…)
5. Le site fonctionne sans base de données ni serveur backend

---

## ⚙️ Les 4 configurations essentielles

### 1. 📌 Logo
Dans `index.html`, cherchez `📌 LOGO HEADER` et remplacez :
```html
<!-- Avant -->
<div class="logo-mark"></div>
<span class="logo-text">Authentic <span>Tech</span></span>

<!-- Après -->
<img src="images/logo.svg" alt="Votre Marque" height="36" />
```
Faites la même chose pour le footer (cherchez `📌 LOGO FOOTER`).
> ⚠️ Le footer est sur fond sombre — prévoyez une version claire du logo.

---

### 2. 📌 Numéro WhatsApp
Dans `js/main.js`, cherchez `VOTRE_NUMERO` :
```js
const numero = 'VOTRE_NUMERO'; // ← remplacez ici
```
Format : code pays + numéro, **sans +, sans espaces**
| Pays | Exemple |
|---|---|
| Togo | `22890123456` |
| Côte d'Ivoire | `22507123456` |
| Sénégal | `221771234567` |
| Cameroun | `237691234567` |
| France | `33612345678` |

---

### 3. 📌 Formulaire de contact (Formspree)
Dans `index.html`, cherchez `YOUR_FORM_ID` :
```html
action="https://formspree.io/f/YOUR_FORM_ID"
```
Étapes :
1. Créez un compte sur [formspree.io](https://formspree.io)
2. Cliquez **"New Form"**
3. Copiez votre ID (ex: `xabcdefg`)
4. Remplacez `YOUR_FORM_ID` par votre ID

---

### 4. 📌 Images de services
Dans `index.html`, cherchez `📌 SERVICE 1`, `📌 SERVICE 2`, etc.
Remplacez `url('')` par le chemin de votre image :
```html
style="background-image: url('images/service-vitrine.webp');"
```
> Consultez `images/LISEZ-MOI.txt` pour tous les noms et formats.

---

## 🎨 Modifier les couleurs

Ouvrez `css/style.css` et cherchez `:root {` tout en haut.

```css
:root {
  --bg-page:        #f4f3ef;  /* Fond principal (ivoire chaud) */
  --bg-section-alt: #eceae4;  /* Sections alternées */
  --bg-card:        #ffffff;  /* Fond des cartes */
  --bg-footer:      #1e1c18;  /* Footer (fond sombre) */
  --gold:           #9c762a;  /* Couleur dorée principale */
  --text-dark:      #1c1a14;  /* Titres */
  --text-body:      #3d3a30;  /* Corps de texte */
}
```

---

## ✏️ Modifier les textes clés

| Texte | Fichier | Mot-clé à chercher |
|---|---|---|
| Slogan principal | `index.html` | `Donnez à votre marque` |
| Description hero | `index.html` | `conçoit des expériences` |
| Texte à propos | `index.html` | `agence digitale spécialisée` |
| Description service 1 | `index.html` | `📌 SERVICE 1` |
| Témoignage client | `index.html` | `Authentic Tech a transformé` |
| Email de contact | `index.html` | `contact@authentictech.com` |
| Stats (50+, 98%, 5★) | `index.html` | `data-count="50"` |
| Copyright | `index.html` | `© 2025 Authentic Tech` |

---

## 🖼️ Remplacer les animations 3D par de vraies photos

### Hero (globe digital)
Dans `index.html`, cherchez `📌 ANIMATION 3D HERO`.  
Supprimez le bloc `<div id="hero-canvas-wrap">…</div>` et remplacez par :
```html
<img src="images/hero.webp"
     alt="Authentic Tech"
     style="width:100%; display:block; object-fit:cover;" />
```
Supprimez ensuite `<script src="js/hero-3d.js"></script>`.

### Équipe (personnages 3D)
Dans `index.html`, cherchez `📌 ANIMATION 3D ÉQUIPE`.  
Supprimez le bloc `<div id="team-canvas-wrap">…</div>` et remplacez par :
```html
<img src="images/equipe.webp"
     alt="Équipe Authentic Tech"
     style="width:100%; height:100%; object-fit:cover; display:block;" />
```
Supprimez ensuite `<script src="js/team-3d.js"></script>`.

---

## 📱 Compatibilité

| Navigateur | Support |
|---|---|
| Chrome, Edge (récent) | ✅ Complet |
| Firefox (récent) | ✅ Complet |
| Safari iOS (iPhone/iPad) | ✅ Complet |
| Android Chrome | ✅ Complet |
| Internet Explorer | ❌ Non supporté |

---

## 🔌 Dépendances externes (chargées automatiquement)

| Ressource | Usage | Fichier |
|---|---|---|
| Google Fonts | Typographies | `index.html` `<head>` |
| Three.js r128 | Animations 3D | `index.html` avant `</body>` |
| Formspree | Formulaire contact | `index.html` attribut `action=` |

> 💡 Pour une utilisation **100% hors-ligne**, téléchargez Three.js localement
> et placez-le dans `js/three.min.js`. Adaptez le `src` dans `index.html`.

---

## 💡 Conseils SEO

Dans `index.html`, section `<head>` :

```html
<!-- Titre de la page — très important pour Google -->
<title>Authentic Tech — Création Site Web | Lomé, Togo</title>

<!-- Description — apparaît dans les résultats Google -->
<meta name="description"
  content="Authentic Tech crée des sites web, apps mobiles et identités
  visuelles pour entrepreneurs et PME. Basé à Lomé." />
```

---

*Authentic Tech © 2025 — Tous droits réservés*
