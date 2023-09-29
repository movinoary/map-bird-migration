import { useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

import icon0 from "./assets/Bird-0.png";
import icon1 from "./assets/Bird-1.png";
import icon2 from "./assets/Bird-2.png";
import icon3 from "./assets/Bird-3.png";
import icon4 from "./assets/Bird-4.png";
import icon5 from "./assets/Bird-5.png";
import icon6 from "./assets/Bird-6.png";
import icon7 from "./assets/Bird-7.png";

import DataJson from "./data/JalurMigrasi.json";
import { statistic } from "./data/statistik";

// Data Lokasi Burung
// Merubah data yang semulanya line menjadi point
const DataBirds = () => {
  let point = [];
  DataJson.features.map((d) => {
    d.geometry.coordinates.map((t) => {
      const body = {
        type: "Feature",
        properties: d.properties,
        geometry: {
          coordinates: [t[1], t[0]],
          type: "Point",
        },
      };
      return point.push(body);
    });
  });

  const dataBird = {
    type: "FeatureCollection",
    features: [...point],
  };

  return dataBird;
};

// Data Jenis Burung
// Mengambil satuan data burung berdasarkan spesies
const DataBird = () => {
  let bird = DataJson.features.map((d) => d.properties.TypeName);
  bird = [...new Set(bird)];
  return bird;
};

function App() {
  // Data
  const dataLine = DataJson;
  const dataPoint = DataBirds();
  const dataBird = DataBird();
  const [dataLineFilter, setDataLineFilter] = useState([]);
  const [dataPointFilter, setDataPointFilter] = useState([]);
  // Setting
  const [isHide, setIsHide] = useState(false);
  const [isMenu, setIsMenu] = useState(true);
  const [category, setCategory] = useState([]);

  // Configuration
  // Menampilkan dan menyembunyikan menu
  const handleMenu = () => setIsMenu(!isMenu);

  // Mengeleminasi mana saja data yang akan ditampilkan
  const handleFIlter = (data) => {
    const findDataCategory = category.find((d) => d === data);
    const filterDataCategory = category.filter((d) => d !== data);

    const addDataLine = DataJson.features.filter(
      (d) => d.properties.TypeName === data
    );
    const deleteDataLine = DataJson.features.filter(
      (d) => d.properties.TypeName !== data
    );

    const addDataPoint = dataPoint.features.filter(
      (d) => d.properties.TypeName === data
    );
    const deleteDataPoint = dataPoint.features.filter(
      (d) => d.properties.TypeName !== data
    );

    if (!findDataCategory) {
      setDataPointFilter([...dataPointFilter, ...addDataPoint]);
      setDataLineFilter([...dataLineFilter, ...addDataLine]);
      setCategory([...category, data]);
    } else {
      setDataPointFilter(deleteDataPoint);
      setDataLineFilter(deleteDataLine);
      setCategory([...filterDataCategory]);
    }
  };

  // Menampilkan dan mereset data yang akan dieleminasi
  const handleChangeData = () => {
    setIsHide(!isHide);
    if (isHide) {
      setDataLineFilter([]);
      setDataPointFilter([]);
      setCategory([]);
    }
  };

  // STYLING LAYER
  // Styling untuk jalur migrasi burung
  const confirmedStyle = (feature) => {
    const type = feature.properties.TypeNumber;
    const style = {
      opacity: 0.5,
      weight: 5,
      dashArray: "20",
    };
    if (type === 1) {
      return {
        ...style,
        color: "#3689c3",
      };
    } else if (type === 2) {
      return {
        ...style,
        color: "#cf0e0f",
      };
    } else if (type === 3) {
      return {
        ...style,
        color: "#6cae00",
      };
    } else if (type === 4) {
      return {
        ...style,
        color: "#01bca5",
      };
    } else if (type === 5) {
      return {
        ...style,
        color: "#931593",
      };
    } else if (type === 6) {
      return {
        ...style,
        color: "#fd68b2",
      };
    } else if (type === 7) {
      return {
        ...style,
        color: "#c86017",
      };
    }
  };

  // Styling untuk icon burung
  const customIconOne = new Icon({
    iconUrl: icon1,
    iconSize: [25, 25],
  });
  const customIconTwo = new Icon({
    iconUrl: icon2,
    iconSize: [25, 25],
  });
  const customIconThree = new Icon({
    iconUrl: icon3,
    iconSize: [25, 25],
  });
  const customIconFour = new Icon({
    iconUrl: icon4,
    iconSize: [25, 25],
  });
  const customIconFive = new Icon({
    iconUrl: icon5,
    iconSize: [25, 25],
  });
  const customIconSix = new Icon({
    iconUrl: icon6,
    iconSize: [25, 25],
  });
  const customIconSeven = new Icon({
    iconUrl: icon7,
    iconSize: [25, 25],
  });

  // RENDER DATA
  // Data untuk merender titik dan jalur migrasi burung
  const dataRenderPoint = !isHide ? dataPoint.features : dataPointFilter;
  // Data untuk menampilkan categori burung yang akan dieleminasi
  const dataRenderCategory = !isHide ? dataBird : category;

  // Side Menu
  const Menu = (
    <section
      className="modal-filter"
      style={{ marginRight: isMenu ? "-220px" : "0" }}
    >
      <button className="btn-close" onClick={handleMenu}>
        {"<"}
      </button>
      <h1>Type Bird</h1>
      <div className="select-row">
        {dataRenderCategory.map((item, index) => {
          // Mengubah data berdasarkan Kategory number untuk dijadikan icon
          const icon =
            item === "Layang-layang asia"
              ? icon1
              : item === "Rajawali"
              ? icon2
              : item === "Burung perandai"
              ? icon3
              : item === "Alap-alap kawah"
              ? icon4
              : item === "Kirik-kirik australia"
              ? icon5
              : item === "Gajahan erasia"
              ? icon6
              : item === "Layang-layang asia"
              ? icon7
              : icon1;

          const find = category.find((d) => d === item);

          return (
            <div
              key={index}
              onClick={() => {
                if (!isHide) {
                  handleFIlter(item);
                }
              }}
              className="select-filter"
            >
              <img
                src={!find ? icon0 : icon}
                alt={item}
                width={25}
                height={25}
              />
              <p>{item}</p>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => {
          if (category.length !== 0) {
            handleChangeData();
          }
        }}
        className="btn-filter"
        style={{
          backgroundColor: isHide
            ? "#b70000"
            : category.length !== 0
            ? "#006ab6"
            : "#848484",
        }}
      >
        {!isHide ? "filter" : "reset"}
      </button>
    </section>
  );

  return (
    <>
      {Menu}
      <MapContainer
        center={[-2.585964150398297, 119.44775991988962]}
        zoom={5}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          data={isHide ? dataLineFilter : dataLine}
          key={isHide ? "dataLineFilter" : "dataLine"}
          pathOptions={confirmedStyle}
        />

        {dataRenderPoint.map((item, index) => {
          // Mengambil kategori number pada data
          const TypeNumber = item.properties.TypeNumber;
          // Mengubah titik berdasarkan Kategory number untuk dijadikan icon
          const customIcon =
            TypeNumber === 1
              ? customIconOne
              : TypeNumber === 2
              ? customIconTwo
              : TypeNumber === 3
              ? customIconThree
              : TypeNumber === 4
              ? customIconFour
              : TypeNumber === 5
              ? customIconFive
              : TypeNumber === 6
              ? customIconSix
              : TypeNumber === 7
              ? customIconSeven
              : customIconOne;

          // Mengambil data description dari jenis burung yang ada
          const desc = statistic.find(
            (d) => d.id === item.properties.TypeNumber
          );

          return (
            <Marker
              position={item.geometry.coordinates}
              icon={customIcon}
              key={index}
              click
            >
              <Popup>
                <h2>{desc?.name}</h2>
                <img
                  src={desc?.img}
                  alt={desc?.name}
                  width={150}
                  height={150}
                />
                <p>{desc?.desc}</p>
                <small>{desc?.Migran}</small>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </>
  );
}

export default App;
