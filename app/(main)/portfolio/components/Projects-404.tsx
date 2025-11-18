export const NotFound = () => {
  return (
    <>
      <svg
        width="400"
        height="320"
        viewBox="0 0 400 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background subtle pattern */}
        <defs>
          <pattern
            id="dots"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="#f1f5f9" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="400" height="320" fill="url(#dots)" />

        {/* Project folders with friendly colors - rounded rectangle shape */}
        <g transform="translate(70, 50)">
          <path
            d="M 0 20 L 0 85 Q 0 85 42.5 85 Q 85 85 85 42.5 L 85 20 Q 85 8 73 8 L 12 8 Q 0 8 0 20 Z"
            fill="#dbeafe"
            stroke="#3b82f6"
            strokeWidth={2}
            opacity="0.8"
          />
          <rect
            x={8}
            y={20}
            width={69}
            height={57}
            rx={4}
            fill="#f8fafc"
            stroke="#e2e8f0"
            strokeWidth={1}
          />
          {/* Friendly document icon */}
          <rect
            x={15}
            y={28}
            width={25}
            height={2}
            rx={1}
            fill="#3b82f6"
            opacity="0.4"
          />
          <rect
            x={15}
            y={35}
            width={35}
            height={2}
            rx={1}
            fill="#3b82f6"
            opacity="0.4"
          />
          <rect
            x={15}
            y={42}
            width={28}
            height={2}
            rx={1}
            fill="#3b82f6"
            opacity="0.4"
          />
        </g>

        <g transform="translate(170, 60)">
          <path
            d="M 0 20 L 0 85 Q 0 85 42.5 85 Q 85 85 85 42.5 L 85 20 Q 85 8 73 8 L 12 8 Q 0 8 0 20 Z"
            fill="#dcfce7"
            stroke="#22c55e"
            strokeWidth={2}
            opacity="0.8"
          />
          <rect
            x={8}
            y={20}
            width={69}
            height={57}
            rx={4}
            fill="#f8fafc"
            stroke="#e2e8f0"
            strokeWidth={1}
          />
          <rect
            x={15}
            y={28}
            width={25}
            height={2}
            rx={1}
            fill="#22c55e"
            opacity="0.4"
          />
          <rect
            x={15}
            y={35}
            width={35}
            height={2}
            rx={1}
            fill="#22c55e"
            opacity="0.4"
          />
          <rect
            x={15}
            y={42}
            width={28}
            height={2}
            rx={1}
            fill="#22c55e"
            opacity="0.4"
          />
        </g>

        <g transform="translate(270, 45)">
          <path
            d="M 0 20 L 0 85 Q 0 85 42.5 85 Q 85 85 85 42.5 L 85 20 Q 85 8 73 8 L 12 8 Q 0 8 0 20 Z"
            fill="#fef3c7"
            stroke="#f59e0b"
            strokeWidth={2}
            opacity="0.8"
          />
          <rect
            x={8}
            y={20}
            width={69}
            height={57}
            rx={4}
            fill="#f8fafc"
            stroke="#e2e8f0"
            strokeWidth={1}
          />
          <rect
            x={15}
            y={28}
            width={25}
            height={2}
            rx={1}
            fill="#f59e0b"
            opacity="0.4"
          />
          <rect
            x={15}
            y={35}
            width={35}
            height={2}
            rx={1}
            fill="#f59e0b"
            opacity="0.4"
          />
          <rect
            x={15}
            y={42}
            width={28}
            height={2}
            rx={1}
            fill="#f59e0b"
            opacity="0.4"
          />
        </g>

        {/* Friendly magnifying glass with sparkles */}
        <g transform="translate(320, 130)">
          <circle
            cx={15}
            cy={15}
            r={12}
            fill="none"
            stroke="#6366f1"
            strokeWidth={3}
            opacity="0.8"
          />
          <line
            x1={25}
            y1={25}
            x2={35}
            y2={35}
            stroke="#6366f1"
            strokeWidth={3}
            strokeLinecap="round"
            opacity="0.8"
          />
          <circle cx={5} cy={8} r={1.5} fill="#fbbf24" />
          <circle cx={35} cy={5} r={1} fill="#f472b6" />
          <circle cx={40} cy={20} r={1.5} fill="#34d399" />
        </g>

        {/* Friendly message */}
        <text
          x={200}
          y={190}
          textAnchor="middle"
          fill="#fff"
          fontFamily="Arial, sans-serif"
          fontSize={20}
          fontWeight={600}
        >
          Exploring This Category
        </text>
        <text
          x={200}
          y={215}
          textAnchor="middle"
          fill="#6b7280"
          fontFamily="Arial, sans-serif"
          fontSize={15}
        >
          We're working on adding amazing projects here
        </text>
        <text
          x={200}
          y={235}
          textAnchor="middle"
          fill="#9ca3af"
          fontFamily="Arial, sans-serif"
          fontSize={13}
        >
          Check out our other categories or come back soon!
        </text>

        {/* Decorative elements */}
        <circle cx={50} cy={180} r={4} fill="#ddd6fe" opacity="0.6" />
        <circle cx={350} cy={190} r={3} fill="#fecaca" opacity="0.6" />
        <rect
          x={60}
          y={200}
          width={6}
          height={6}
          rx={2}
          fill="#bbf7d0"
          opacity="0.6"
          transform="rotate(45 63 203)"
        />
        <rect
          x={330}
          y={210}
          width={5}
          height={5}
          rx={1}
          fill="#fed7aa"
          opacity="0.6"
          transform="rotate(30 332.5 212.5)"
        />
        <circle cx={80} cy={280} r={2} fill="#c7d2fe" opacity="0.7" />
        <circle cx={100} cy={285} r={1.5} fill="#fde68a" opacity="0.7" />
        <circle cx={300} cy={280} r={1.5} fill="#fecaca" opacity="0.7" />
        <circle cx={320} cy={285} r={2} fill="#bbf7d0" opacity="0.7" />
      </svg>
    </>
  );
};
