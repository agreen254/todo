type Props = {
  progress: number; // percent
  radius: number; // px
};

const ProgressRing = ({ progress, radius }: Props) => {
  // show a little bit even at zero percent so the user knows it's working
  const progressDisplay = progress === 0 ? 1 : progress;
  const strokeWidth = 4;
  const normRadius = radius - strokeWidth * 2; // the stroke changes the radius
  const circumference = 2 * Math.PI * normRadius;
  const strokeOffset = circumference * (1 - progressDisplay / 100);

  return (
    <>
      <svg width={radius * 2} height={radius * 2}>
        <circle
          // https://tailwindcss.com/docs/transform-origin#arbitrary-values
          // Not like in calc() where you just don't use a space;
          // you need to use an underscore.
          className="text-primary -rotate-90 transition-[stroke-dashoffset_0.35s] origin-[50%_50%]"
          stroke="hsl(var(--primary))"
          strokeDasharray={circumference + " " + circumference}
          strokeWidth={strokeWidth}
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
