import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";

import { UnknownAction } from "redux";
import { useId } from "react";
import { getLang } from "@/fixtures/LANG";

type Props = {
  types: string[];
  selector: (state: RootState) => string | null;
  dispatcher: (arg0: string) => UnknownAction;
};

export default function RadioButtons({ types, selector, dispatcher }: Props) {
  const current = useAppSelector(selector);
  const dispatch = useAppDispatch();
  const radioName = useId();

  const changeHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(dispatcher(e.currentTarget.dataset.value ?? ""));
  };

  return (
    <fieldset className="fenceRadio">
      {types.map((type) => (
        <div key={type}>
          <input
            data-value={type}
            type="radio"
            id={type}
            name={radioName}
            value={type}
            defaultChecked={current === type}
            onClick={changeHandler}
          />
          <label htmlFor={type}>{getLang(type)}</label>
        </div>
      ))}
    </fieldset>
  );
}
