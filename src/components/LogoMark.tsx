type LogoMarkProps = {
  size?: number;
  className?: string;
  imageSrc?: string;
};

const LogoMark = ({ size = 40, className = "", imageSrc = "/deeptrust-full-logo.png" }: LogoMarkProps) => {
  const px = `${size}px`;
  return (
    <div
      className={`relative rounded-[14px] shadow-lg ring-4 ring-primary/15 overflow-hidden ${className}`}
      style={{ width: px, height: px, minWidth: px, minHeight: px }}
      aria-label="DEEPTRUST.ONE logo"
    >
      {/* Try preferred full logo first */}
      <img
        src={imageSrc}
        alt="DEEPTRUST.ONE Logo"
        className="absolute inset-0 w-full h-full object-contain p-1 bg-transparent"
        onError={(e) => {
          const el = e.currentTarget as HTMLImageElement;
          el.style.display = "none";
        }}
      />
      {/* Then try compact logo file as a secondary source */}
      <img
        src="/deeptrust-logo.png"
        alt="DEEPTRUST.ONE Logo"
        className="absolute inset-0 w-full h-full object-contain p-1 bg-transparent"
        onError={(e) => {
          const el = e.currentTarget as HTMLImageElement;
          el.style.display = "none";
        }}
      />
      {/* Fallback gradient DT mark */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,white,transparent_30%)]" />
      <div className="relative w-full h-full grid place-items-center">
        <span className="text-white font-extrabold" style={{ fontSize: Math.round(size * 0.45) }}>
          DT
        </span>
      </div>
    </div>
  );
};

export default LogoMark;


