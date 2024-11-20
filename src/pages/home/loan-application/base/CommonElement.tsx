import React from "react";
import { IBaseItem } from "../../../../types/item";
import Visibility from "../../../../components/visibility";

interface IProps {
  title?: string;
  logo: string;
  button?: JSX.Element;
  listItem?: IBaseItem[];
}

export default function CommonElement({
  title,
  logo,
  listItem,
  button,
}: IProps) {
  return (
    <div className="w-full p-3 flex flex-col space-y-5 bg-white">
      <div className="flex flex-row justify-start items-center space-x-5">
        <img className="h-[56px] w-[56px] object-cover" src={logo} alt="logo" />
        <div className="flex flex-col w-full space-y-2">
          {title && (
            <div className="w-full text-xl font-bold text-gray-900">{title}</div>
          )}
          {listItem?.map((item) => {
            return (
              <div key={item.id} className="grid grid-cols-3 w-full gap-3">
                <label className="col-span-1 text-xs">{item.label} :</label>
                <span className="col-span-2 text-xs">{item.value}</span>
              </div>
            );
          })}
        </div>
      </div>
      <Visibility visibility={button}>
        {button}
      </Visibility>
    </div>
  );
}
