# 📱 Github users list App

Aplicación móvil para visualizar los usuarios de Github, desarrollada con React Native y TypeScript.

<p align="center">
  <img src="./assets/images/home.png" alt="Home screen" width="200"/>
  <img src="./assets/images/profile.png" alt="Profile screen" width="200"/>
  <img src="./assets/images/favorites.png" alt="Favorites screen" width="200"/>
</p>

---

## ⚙️ Requisitos previos

### Yarn

```bash
npm install --global yarn
```

### Ruby y rbenv (para iOS)

```bash
brew install rbenv
echo 'eval "$(rbenv init -)"' >> ~/.zshrc
rbenv install 3.0.0
rbenv global 3.0.0
```

---

## 🚀 Instalación

```bash
yarn install
cd ios && pod install
```

---

## ▶️ Ejecución

### iOS (development)

```bash
yarn ios
```

### iOS (producción)

```bash
yarn ios:prod
```

### Android (development)

```bash
yarn android
```

### Android (producción)

```bash
yarn android:prod
```

---

## ✅ Versiones Soportadas

- **Android**
  - Mínima: 7 (API 24)
  - Objetivo: 14 (API 35)
- **iOS**
  - Mínima: 15.1

---

## 🧪 Testing

### Correr todos los tests

```bash
yarn test
```

### Correr test en específico

```bash
yarn test <test>
```

---

## 🌍 Entornos

La app está preparada para funcionar en **múltiples entornos**, tanto en iOS como en Android, para poder trabajar en desarrollo y producción de forma aislada.

### iOS (Schemes)

- Se usan diferentes **schemes** (e.g. `Development`, `Production`) para compilar la app con configuraciones específicas.
- Los comandos `yarn ios` y `yarn ios:prod` ejecutan cada uno su scheme correspondiente.

### Android (Flavors)

- Se utilizan **product flavors** (e.g. `dev`, `prod`) definidos en el archivo `build.gradle`.
- Permite generar APKs o bundles distintos según el entorno.
- Los comandos `yarn android` y `yarn android:prod` compilan la variante deseada.

### Variables de entorno

- Las variables de entorno se gestionan con [`react-native-config`](https://github.com/luggit/react-native-config).
- Esto permite tener diferentes endpoints, claves API u otras configuraciones según el entorno.
- Las variables se encuentran definidas en:
  - [`.env.development`](.env.development)
  - [`.env.production`](.env.production)

---

## 🎨 Theme

Las dimensiones de los componentes de UI escalan dinámicamente según:

- El tamaño de pantalla del dispositivo
- El sistema operativo (iOS / Android)
- El tipo de dispositivo (smartphone / tablet)

Esto permite que el diseño sea responsivo y se adapte correctamente a pantallas grandes como tablets u otros formatos.

Además, la app soporta tema claro y oscuro, permitiendo al usuario elegir su preferencia desde la configuración.

Esta configuración se encuentra en:  
[`app/config/theme/index.ts`](./app/config/theme/index.ts)

---

## 🌐 i18n

La app está preparada para multi-idioma utilizando i18n-js. Actualmente soporta español e inglés, y permite cambiar el idioma dinámicamente desde la configuración.

La configuración de textos e idiomas se encuentra en:
[`app/config/i18n`](./app/config/i18n)

---

## 📄 Setup adicional

Consultar el archivo [`setup.md`](./setup.md) para detalles sobre configuraciones específicas.