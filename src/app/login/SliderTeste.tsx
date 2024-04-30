import React from "react";
import SliderIntro from "react-native-slider-intro";

const slides = [
  {
    index: 1,
    title: "First step",
    text: "Simple description.",
    link: "https://pccontroller.rnstudio.hu",
    image: require("@/assets/hand-coins.png"),
    backgroundColor: "#febe29",
  },
  {
    index: 2,
    title: "Second step",
    text: "Simple description for the second step.",
    image: require("@/assets/cellphone.png"),
    backgroundColor: "#febe29",
  },
];

export default function SliderTeste({
  closeExample,
}: {
  closeExample: () => void;
}) {
  return (
    <SliderIntro data={slides} onDone={closeExample} onSkip={closeExample} />
  );
}
