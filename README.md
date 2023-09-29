# Wildlife Data Visualization WEBGIS

Web Visualization Data migrasi burung di indonesia. Data migrasi burung di ambil dari situs national geographic indonesia, dan dikemas menjadi data geojson berbentuk line. Kemudian didalamnya terdapat pergantian tipe line menjadi point untuk memberi titik sebagai penanda jenis burung. Menggunakan leaflet sebagai base map.

![Desain](https://github.com/movinoary/map-bird-migration/blob/master/src/assets/desain.png?raw=true)

### Clone Repository

```bash
  git clone "https://github.com/movinoary/map-bird-migration"
```

Masuk ke directory projek

```bash
  cd map-bird-migration
```

Instal package

```bash
  npm install
```

jalankan react

```bash
  npm run dev
```

### Package

- [react](https://react.dev/)
- [leaflet](https://leafletjs.com/)
- [react-leaflet](https://react-leaflet.js.org/)

### File

| File                | Description                                            |
| :------------------ | :----------------------------------------------------- |
| `index.js`          | merender awal untuk framework reactjs                  |
| `index.css`         | kumpulan css yang digunakan                            |
| `App.js`            | rendering map, konfigurasi data, dan konfigurasi popup |
| `jalurMigrasi.json` | file geojson burung migrasi                            |
