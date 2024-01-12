"use client";

import "./styles.css";

type Props = {
  progress: number;
  radius: number; // px
};

const ProgressRing = ({ progress, radius }: Props) => {
  const strokeWidth = 4;
  const normRadius = radius - strokeWidth * 2; // the stroke changes the radius
  const circumference = 2 * Math.PI * normRadius;
  const strokeOffset = circumference * ((1 - (progress - 100)) / 100);

  return (
    <>
      <svg className="progress-ring" width={radius * 2} height={radius * 2}>
        <circle
          className="text-primary"
          stroke="hsl(var(--primary))"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset: strokeOffset }}
          fill="transparent"
          r={normRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
    </>
  );
};

export default ProgressRing;
