export const Loader = ({
  content,
  color,
}: {
  content?: string;
  color?: string;
}) => {
  return (
    <div className="flex items-center justify-center h-8 py-1">
      <div className="relative w-6 h-6">
        <div
          className="absolute inset-0 w-full h-full rounded-full border-2 border-transparent animate-spin"
          style={{
            borderTopColor: color || "#f3cf47",
            borderRightColor: color || "#f3cf47",
            animationDuration: "1s",
          }}
        ></div>
        <div
          className="absolute inset-0 w-4 h-4 m-auto rounded-full border-2 border-transparent animate-reverse-spin"
          style={{
            borderBottomColor: color || "#f3cf47",
            borderLeftColor: color || "#f3cf47",
            opacity: 0.7,
            animationDuration: "1.2s",
          }}
        ></div>
        <div
          className="absolute inset-0 w-1 h-1 m-auto rounded-full animate-pulse"
          style={{ backgroundColor: color || "#f3cf47" }}
        ></div>
      </div>
      {content && (
        <span className="ml-2 text-xs font-medium" style={{ color: "#6b5c18" }}>
          {content}
        </span>
      )}
      <style jsx>{`
        @keyframes reverse-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        .animate-reverse-spin {
          animation: reverse-spin 1.2s linear infinite;
        }
      `}</style>
    </div>
  );
};
