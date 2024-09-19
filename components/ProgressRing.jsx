import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressRing = ({ progress }) => {
  return <CircularProgressbar value={progress} text={`${progress}%`} />;
};

// const ProgressRing = ({ progress }) => {
//   const normalizedRadius = radius - stroke * 2;
//   const circumference = normalizedRadius * 2 * 2 * Math.PI;
//   const strokeDashoffset = circumference - (progress / 100) * circumference;
//   return (
//     <svg height={radius * 2} width={radius * 2}>
//       <circle
//         stroke="#acb5bd"
//         fill="transparent"
//         strokeWidth={stroke}
//         strokeDasharray={circumference + " " + circumference}
//         stroke-width={stroke}
//         strokeLinecap="round"
//         r={normalizedRadius}
//         cx={radius}
//         cy={radius}
//       />
//       <circle
//         stroke="blue"
//         fill="transparent"
//         strokeWidth={stroke}
//         strokeDasharray={circumference + " " + circumference}
//         style={{ strokeDashoffset }}
//         stroke-width={stroke}
//         strokeLinecap="round"
//         r={normalizedRadius}
//         cx={radius}
//         cy={radius}
//       />
//       <text
//         x={normalizedRadius - 10}
//         y={normalizedRadius + 21}
//         className="text-xl font-medium font-pally text-center"
//       >
//         {progress * 2 + "%"}
//       </text>
//     </svg>
//   );
// };

export default ProgressRing;
