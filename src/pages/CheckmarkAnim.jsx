export function CheckmarkAnim({ size = 52, className = "" }) {
  return (
    <div className={"checkmark-wrapper " + className} style={{ width: size, height: size, margin: "0 auto 14px", display: "grid", placeItems: "center" }}>
      <svg
        className="svg-checkmark-anim"
        viewBox="0 0 52 52"
        width={size}
        height={size}
        aria-hidden="true"
      >
        <circle className="svg-checkmark-circle" cx="26" cy="26" r="23" fill="none" />
        <path className="svg-checkmark-check" fill="none" d="M14 27l8 8 16-16" />
      </svg>
    </div>
  );
}
