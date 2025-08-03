const Keyword = ({ children, colors }) => {
  const background = colors?.hover || "#EDE9E3";
  const border = colors?.color || "#BCE784";
  const textColor = "#1a3a57"; // Colore fisso, coerente con UI

  return (
    <span
      className="inline-block rounded-md px-2 py-0.5 text-xs sm:text-sm font-semibold mx-0.5"
      style={{
        backgroundColor: background,
        border: `1px solid ${border}`,
        color: textColor,
      }}
    >
      {children}
    </span>
  );
};

export default Keyword;
