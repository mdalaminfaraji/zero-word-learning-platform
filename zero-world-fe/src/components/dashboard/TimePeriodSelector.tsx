import React, { useState, useRef, useEffect } from "react";

interface TimePeriodSelectorProps {
  onChange: (period: string) => void;
  defaultPeriod?: string;
}

const TimePeriodSelector: React.FC<TimePeriodSelectorProps> = ({
  onChange,
  defaultPeriod = "Daily",
}) => {
  const [period, setPeriod] = useState(defaultPeriod);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = ["Daily", "Weekly", "Monthly"];

  const handleSelect = (value: string) => {
    setPeriod(value);
    onChange(value);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span
        style={{
          marginRight: "18px",
          fontWeight: 600,
          color: "#666",
        }}
      >
        Time Period:
      </span>
      <div ref={dropdownRef} style={{ position: "relative" }}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minWidth: "120px",
            height: "40px",
            padding: "0 12px",
            backgroundColor: "white",
            border: "1px solid rgba(0, 0, 0, 0.12)",
            borderRadius: "4px",
            cursor: "pointer",
            userSelect: "none",
            fontSize: "14px",
          }}
        >
          <span>{period}</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
          >
            <path
              d="M7 10L12 15L17 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {isOpen && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: 0,
              width: "100%",
              backgroundColor: "white",
              border: "1px solid rgba(0, 0, 0, 0.12)",
              borderRadius: "4px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              zIndex: 10,
            }}
          >
            {options.map((option) => (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  backgroundColor:
                    period === option ? "rgba(0, 0, 0, 0.04)" : "transparent",
                  transition: "background-color 0.2s ease",
                  fontSize: "14px",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.08)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor =
                    period === option ? "rgba(0, 0, 0, 0.04)" : "transparent";
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TimePeriodSelector;
