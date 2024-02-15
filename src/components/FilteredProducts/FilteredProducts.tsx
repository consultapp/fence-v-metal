import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";

import { TProduct } from "@/types";
import { UnknownAction } from "redux";
import { useMemo } from "react";
import CustomSelect from "@/toolkit/CustomSelect/CustomSelect";
import { selectCurrentFilter, selectFilters } from "@/store/ui/fence/selectors";
import RadioFilter from "@/toolkit/RadioFilter/RadioFilter";
import { fenceSlice } from "@/store/ui/fence";

type Props = {
  products: TProduct[];
  selector: (state: RootState) => number | null;
  dispatcher: (arg0: number) => UnknownAction;
};

export default function FilteredProducts({
  products,
  selector,
  dispatcher,
}: Props) {
  const currentFilter = useAppSelector(selectCurrentFilter);
  const filters = useAppSelector(selectFilters);

  const filteredProducts = useMemo(() => {
    if (filters && currentFilter)
      return products.filter((item) =>
        item.name.includes(currentFilter.name.toUpperCase())
      );
    return [];
  }, [products, filters, currentFilter]);

  return (
    <>
      {filters && filters.length ? (
        <RadioFilter
          filters={filters}
          selector={selectCurrentFilter}
          dispatcher={fenceSlice.actions.setFilter}
        />
      ) : (
        ""
      )}
      {
        <CustomSelect
          errorField="material"
          products={filteredProducts ? filteredProducts : []}
          selector={selector}
          dispatcher={dispatcher}
        />
      }
    </>
  );
}
