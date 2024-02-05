import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";

import { UnknownAction } from "redux";
import { useId } from "react";
import { IFilter } from "@/types";

type Props = {
  filters: IFilter[] | null;
  selector: (state: RootState) => IFilter | null;
  dispatcher: (arg0: string) => UnknownAction;
};

export default function RadioFilter({ filters, selector, dispatcher }: Props) {
  const current = useAppSelector(selector);
  const dispatch = useAppDispatch();
  const radioName = useId();

  const changeHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(dispatcher(e.currentTarget.dataset.value ?? ""));
  };
  console.log("current", current);
  return (
    <fieldset className="fenceRadio">
      {filters
        ? filters.map((filter) => (
            <label className="fenceRadio_displayLine" key={filter.slug}>
              <div className="fenceRadio__imageWrapper">
                <img className="fenceRadio__image" src={filter.link} />
              </div>
              <input
                data-value={filter.slug}
                type="radio"
                id={filter.slug}
                name={radioName}
                value={filter.slug}
                defaultChecked={current?.slug === filter.slug}
                onClick={changeHandler}
              />
              <div className="fenceRadio__info">
                <span className="fenceRadio__infoHeader">{filter.name}</span>
                <span className="fenceRadio__infoText">
                  {filter.description}
                </span>
              </div>
            </label>
          ))
        : ""}
    </fieldset>
  );
}
