import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Svg, G, Path } from "react-native-svg";

const PieChart = ({ data, onSlicePress }) => {
  const radius = 100;
  const diameter = radius * 2;
  const circumference = diameter * Math.PI;

  const total = data.reduce((sum, { value }) => sum + value, 0);

  let startAngle = 0;

  const renderSlices = () => {
    return data.map((slice, index) => {
      const { value, color, label } = slice;
      const sliceAngle = (value / total) * 360;
      const largeArcFlag = sliceAngle > 180 ? 1 : 0;

      const x1 = radius + radius * Math.cos((Math.PI * startAngle) / 180);
      const y1 = radius - radius * Math.sin((Math.PI * startAngle) / 180);

      startAngle += sliceAngle;

      const x2 = radius + radius * Math.cos((Math.PI * startAngle) / 180);
      const y2 = radius - radius * Math.sin((Math.PI * startAngle) / 180);

      const pathData = [
        `M ${radius} ${radius}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        "Z",
      ].join(" ");

      return (
        <TouchableOpacity key={index} onPress={() => onSlicePress(slice)}>
          <Path d={pathData} fill={color} />
        </TouchableOpacity>
      );
    });
  };

  return (
    <Svg width={diameter} height={diameter}>
      <G>{renderSlices()}</G>
    </Svg>
  );
};

export default PieChart;
