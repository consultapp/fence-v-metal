import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";

import { UnknownAction } from "redux";
import { useId, useState } from "react";
import { IFilter } from "@/types";
import ModalWindow from "@/toolkit/ModalWindow/ModalWindow";
import ModalTwoImages from "../ModalTwoImages/ModalTwoImages";

type Props = {
  filters: IFilter[] | null;
  selector: (state: RootState) => IFilter | null;
  dispatcher: (arg0: string) => UnknownAction;
};

export default function RadioFilter({ filters, selector, dispatcher }: Props) {
  const [modal, setModal] = useState<{ image1: string; image2: string } | null>(
    null
  );

  const current = useAppSelector(selector);
  const dispatch = useAppDispatch();
  const radioName = useId();

  const changeHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(dispatcher(e.currentTarget.dataset.value ?? ""));
  };

  return (
    <>
      <ModalWindow isOpen={Boolean(modal)} close={() => setModal(null)}>
        <ModalTwoImages image1={modal?.image1} image2={modal?.image2} />
      </ModalWindow>
      <fieldset className="fenceRadio">
        {filters
          ? filters.map((filter) => (
              <>
                <div
                  className="fenceRadio__imageWrapper"
                  onPointerDown={() => {
                    setModal({
                      image1: filter.link,
                      image2: filter.link.replace(".png", "_schema.png"),
                    });
                  }}
                >
                  <img className="fenceRadio__image" src={filter.link} />

                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fenceRadio__openModal"
                  >
                    <path
                      d="M21.2599 19.7025L17.5099 16.23C19.1822 14.3415 20.0575 11.8784 19.9519 9.35818C19.8463 6.83794 18.7681 4.45669 16.9438 2.71468C15.1195 0.972676 12.691 0.00549539 10.1686 0.0163253C7.64616 0.0271553 5.2261 1.01515 3.41679 2.77276C1.60749 4.53037 0.549776 6.92079 0.465853 9.44184C0.381929 11.9629 1.27833 14.4184 2.96674 16.2924C4.65514 18.1665 7.00415 19.3132 9.52027 19.4918C12.0364 19.6703 14.5238 18.8668 16.4599 17.25V17.2875L20.2099 20.7825C20.2802 20.8576 20.3651 20.9174 20.4595 20.9582C20.5539 20.9991 20.6556 21.0201 20.7584 21.02C20.8612 21.0199 20.9629 20.9986 21.0572 20.9576C21.1515 20.9165 21.2363 20.8565 21.3064 20.7812C21.3764 20.706 21.4303 20.6171 21.4646 20.5202C21.4989 20.4233 21.5129 20.3203 21.5057 20.2178C21.4986 20.1152 21.4704 20.0152 21.423 19.924C21.3755 19.8327 21.3098 19.7522 21.2299 19.6875L21.2599 19.7025ZM10.2499 18C8.61825 18 7.0232 17.5161 5.66649 16.6096C4.30979 15.7031 3.25236 14.4146 2.62794 12.9071C2.00352 11.3996 1.84014 9.74082 2.15847 8.14048C2.47679 6.54014 3.26253 5.07013 4.41631 3.91635C5.5701 2.76256 7.04011 1.97683 8.64045 1.6585C10.2408 1.34017 11.8996 1.50355 13.4071 2.12797C14.9146 2.75239 16.203 3.80982 17.1096 5.16652C18.0161 6.52323 18.4999 8.11828 18.4999 9.74998C18.4999 11.938 17.6308 14.0364 16.0836 15.5836C14.5364 17.1308 12.438 18 10.2499 18ZM15.8749 9.74998C15.8749 9.94889 15.7959 10.1397 15.6553 10.2803C15.5146 10.421 15.3239 10.5 15.1249 10.5H10.9999V14.625C10.9999 14.8239 10.9209 15.0147 10.7803 15.1553C10.6396 15.296 10.4489 15.375 10.2499 15.375C10.051 15.375 9.86027 15.296 9.71961 15.1553C9.57896 15.0147 9.49994 14.8239 9.49994 14.625V10.5H5.37495C5.17603 10.5 4.98527 10.421 4.84462 10.2803C4.70396 10.1397 4.62495 9.94889 4.62495 9.74998C4.62495 9.55106 4.70396 9.3603 4.84462 9.21965C4.98527 9.07899 5.17603 8.99998 5.37495 8.99998H9.49994V4.87498C9.49994 4.67606 9.57896 4.4853 9.71961 4.34465C9.86027 4.20399 10.051 4.12498 10.2499 4.12498C10.4489 4.12498 10.6396 4.20399 10.7803 4.34465C10.9209 4.4853 10.9999 4.67606 10.9999 4.87498V8.99998H15.1249C15.3239 8.99998 15.5146 9.07899 15.6553 9.21965C15.7959 9.3603 15.8749 9.55106 15.8749 9.74998Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <label className="fenceRadio_displayLine" key={filter.slug}>
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
                    <span className="fenceRadio__infoHeader">
                      {filter.name}
                    </span>
                    <span className="fenceRadio__infoText">
                      {filter.description}
                    </span>
                  </div>
                </label>
              </>
            ))
          : ""}
      </fieldset>
    </>
  );
}
