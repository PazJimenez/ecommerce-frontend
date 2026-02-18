# E-commerce Platform

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)
![REST API](https://img.shields.io/badge/REST%20API-005571?logo=fastapi&logoColor=white)
![Strapi](https://img.shields.io/badge/Strapi-4945FF?logo=strapi&logoColor=white)
![Flow.cl](https://img.shields.io/badge/Flow.cl-Payments-blue)
![Responsive Design](https://img.shields.io/badge/Responsive-Yes-success)
![Dark Mode](https://img.shields.io/badge/Dark%20Mode-Supported-black)
![Project Status](https://img.shields.io/badge/Status-Near%20Complete-yellow)

Full Stack e-commerce application focused on product management and online payments, built as a personal project to practice real-world integrations and service-oriented architecture.

## 🚀 Tech Stack

**Frontend**
- TypeScript
- React
- REST API consumption

**Backend**
- JavaScript
- REST API
- Strapi (Headless CMS)

**Payments**
- Flow.cl API

## ✨ Features

- Product listing and order creation
- Purchase flow integration
- Payment processing via Flow.cl
- Separation between frontend and backend services
- API-based communication with Strapi

## 🧱 Architecture

- Frontend application consumes two REST APIs:
  - Product and order management via Strapi
  - Payment processing via Flow.cl
- Backend services are separated to keep responsibilities clear and scalable

## 🔐 Backend & Security

Backend services (Strapi API and payment integration) are hosted in separate private repositories.

API keys and sensitive configuration are managed using environment variables and are not exposed in this repository.

## 📸 Screenshots

### Home Page
- Featured products
- Categories and promotional banners
- Quick actions: view product details or add to cart

![Home Page](./docs/images/Productos_destacados.png)

### Product Details
- Detailed product view
- Add to cart
- Add or remove from wishlist

![Product Details](./docs/images/Producto_detallado.png)

### Shopping Cart
- View selected products
- Remove items from cart
- Proceed to checkout and payment

![Shopping Cart](./docs/images/Carro_compras.png)

### Wishlist
- Manage loved products
- Add products directly to cart
- Remove products from wishlist

![Wishlist](./docs/images/Loved_products.png)

### UI & Responsiveness
- Fully responsive layout for mobile, tablet, and desktop
- Light and dark mode support

![Mobile View](./docs/images/Responsivo.png)


