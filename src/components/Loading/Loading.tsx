import styles from "./style.module.scss";
export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        flexGrow: 1,
      }}
    >
      <svg
        width="50"
        height="50"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          className={styles.spinner}
          x="1"
          y="1"
          rx="1"
          width="10"
          height="10"
        />
        <rect
          className={styles.spinner_2}
          x="1"
          y="1"
          rx="1"
          width="10"
          height="10"
        />
      </svg>
    </div>
  );
}
