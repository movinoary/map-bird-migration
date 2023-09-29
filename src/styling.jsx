import { Icon } from "leaflet";
import icon1 from "./assets/Bird-1.png";
import icon2 from "./assets/Bird-2.png";
import icon3 from "./assets/Bird-3.png";
import icon4 from "./assets/Bird-4.png";
import icon5 from "./assets/Bird-5.png";
import icon6 from "./assets/Bird-6.png";
import icon7 from "./assets/Bird-7.png";

export const confirmedStyle = (feature) => {
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

export const customIconOne = new Icon({
  iconUrl: icon1,
  iconSize: [25, 25],
});

export const customIconTwo = new Icon({
  iconUrl: icon2,
  iconSize: [25, 25],
});

export const customIconThree = new Icon({
  iconUrl: icon3,
  iconSize: [25, 25],
});

export const customIconFour = new Icon({
  iconUrl: icon4,
  iconSize: [25, 25],
});

export const customIconFive = new Icon({
  iconUrl: icon5,
  iconSize: [25, 25],
});

export const customIconSix = new Icon({
  iconUrl: icon6,
  iconSize: [25, 25],
});

export const customIconSeven = new Icon({
  iconUrl: icon7,
  iconSize: [25, 25],
});
