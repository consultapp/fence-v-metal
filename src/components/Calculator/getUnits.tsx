export function getUnits(s: string) {
  if (s === "m2")
    return (
      <>
        м<sup>2</sup>
      </>
    );

  return s;
}
