import React, { useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { Svg, G, Path } from "react-native-svg";

type Slice = {
  value: number;
  color: string;
  label: string;
};

type PieChartProps = {
  data: Slice[];
  onSlicePress: (slice: Slice) => void;
};

const calculateArc = (radius: number, angle: number) => {
  const x = radius + radius * Math.cos((Math.PI * angle) / 180);
  const y = radius - radius * Math.sin((Math.PI * angle) / 180);
  return { x, y };
};

const calculatePath = (
  radius: number,
  startAngle: number,
  endAngle: number,
  largeArcFlag: number
) => {
  const start = calculateArc(radius, startAngle);
  const end = calculateArc(radius, endAngle);
  return `M ${radius} ${radius} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;
};

const PieChart: React.FC<PieChartProps> = ({ data, onSlicePress }) => {
  const radius = 100;
  const diameter = radius * 2;

  const total = useMemo(
    () => data.reduce((sum, { value }) => sum + value, 0),
    [data]
  );

  const slices = useMemo(() => {
    let startAngle = 0;
    return data.map((slice) => {
      const { value, color } = slice;
      const sliceAngle = (value / total) * 360;
      const endAngle = startAngle + sliceAngle;
      const largeArcFlag = sliceAngle > 180 ? 1 : 0;
      const pathData = calculatePath(
        radius,
        startAngle,
        endAngle,
        largeArcFlag
      );
      startAngle = endAngle;
      return { pathData, color, label: slice.label };
    });
  }, [data, total]);

  return (
    <Svg width={diameter} height={diameter}>
      <G>
        {slices.map((slice, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onSlicePress(data[index])}
          >
            <Path d={slice.pathData} fill={slice.color} />
          </TouchableOpacity>
        ))}
      </G>
    </Svg>
  );
};

export default PieChart;
