import classNames from "classnames";

type Props = {
  type: "primary" | "secondary";
  border?: "normal" | "outlined";
  children: React.ReactNode;
  onClick: () => void;
  svg?: boolean;
  half50?: boolean;
};

export default function CustomButton({
  type = "primary",
  border = "normal",
  children,
  onClick,
  svg = false,
  half50 = false,
}: Props) {
  return (
    <button
      className={classNames(
        "fenceButton",
        `fenceButton_${type}`,
        border === "outlined" && "fenceButton_outlined",
        half50 && "fenceButton_half50"
      )}
      onClick={onClick}
    >
      {children}
      {svg && (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fenceButton__icon"
        >
          <g clipPath="url(#clip0_2120_13238)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.9378 3.42487C13.6817 0.967589 8.41094 1.86293 5.18061 5.29024L3.78175 4.4826C3.65485 4.40934 3.50678 4.41484 3.38565 4.49732C3.26453 4.57981 3.20513 4.71559 3.22684 4.86051L3.99443 9.98861C4.01182 10.1047 4.07497 10.1975 4.17666 10.2562C4.27835 10.3149 4.39025 10.3232 4.49951 10.2802L9.32433 8.3809C9.46069 8.32724 9.54862 8.20794 9.5595 8.06179C9.57037 7.91565 9.50109 7.78467 9.37419 7.7114L7.97618 6.90426C10.2599 4.93405 13.6272 4.51802 16.3869 6.11131C19.8752 8.12531 21.0704 12.5858 19.0564 16.0742C17.0424 19.5626 12.5819 20.7578 9.09352 18.7438C7.51219 17.8308 6.40207 16.415 5.84855 14.815C5.80222 14.6805 5.70654 14.5685 5.58084 14.5018C5.45514 14.4351 5.30879 14.4185 5.17138 14.4556L3.2579 14.9683C3.10284 15.0098 2.98482 15.1031 2.90853 15.2444C2.83224 15.3856 2.81896 15.5354 2.86924 15.6879C3.64086 18.0268 5.24176 20.1018 7.54252 21.4302C12.5145 24.3008 18.8722 22.5972 21.7428 17.6252C24.6135 12.6531 22.9099 6.29547 17.9378 3.42487Z"
              fill="#22122D"
            />
          </g>
          <defs>
            <clipPath id="clip0_2120_13238">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="matrix(-1 0 0 1 24 0)"
              />
            </clipPath>
          </defs>
        </svg>
      )}
    </button>
  );
}
