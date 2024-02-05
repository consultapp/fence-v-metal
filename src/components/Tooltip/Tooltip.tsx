import { TOOLTIP_TEXTS } from "@/fixtures/TOOLTIP_TEXTS";
import "@/template/css/fenceTooltip.css";

type Props = { type: keyof typeof TOOLTIP_TEXTS };

export default function Tooltip({ type }: Props) {
  return (
    <div className="tooltip">
      <svg
        className="tooltip__icon"
        width="22"
        height="23"
        viewBox="0 0 22 23"
        stroke="currentColor"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11 21.5C16.5228 21.5 21 17.0228 21 11.5C21 5.97715 16.5228 1.5 11 1.5C5.47715 1.5 1 5.97715 1 11.5C1 17.0228 5.47715 21.5 11 21.5Z"
          stroke="#FDBF50"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 15.5V11.5"
          stroke="#FDBF50"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 8.5V7.5"
          stroke="#FDBF50"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="tooltip__details">
        {TOOLTIP_TEXTS[type] ? TOOLTIP_TEXTS[type] : ""}
      </div>
    </div>
  );
}
