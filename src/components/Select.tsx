import { lighten } from "polished";
import React, { forwardRef } from "react";
import styled from "styled-components";

interface ISelect {
  options: IOptions[];
  onChange?: (value: any) => void;
  value?: number;
  defaultValue?: number;
  width?: number;
  height?: number;
}
interface IOptions {
  name: string | number;
  state: number;
}

export const Select = forwardRef<HTMLSelectElement, ISelect>(
  ({ value, defaultValue, options, onChange, width, height }, ref) => {
    return (
      <SelectEle
        value={value}
        defaultValue={defaultValue}
        ref={ref}
        onChange={onChange}
        width={width}
        height={height}
      >
        {options.map((v: IOptions) => {
          return <OptionEle value={v.state}> {v.name} </OptionEle>;
        })}
      </SelectEle>
    );
  },
);

export default Select;

interface ISelectEle {
  width?: number;
  height?: number;
}

const SelectEle = styled.select<ISelectEle>`
  text-align: center;
  font-weight: bold;
  width: ${({ width }) => (width ? width + "rem" : "5.5rem")};
  height: ${({ height }) => (height ? height + "rem" : "2rem")};

  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.boxShadow.main};
  outline: none;

  &:hover {
    background: ${({ theme }) => lighten(0.02, theme.colors.light_gray)};
  }

  /* text-align-last: center;
  text-align: center; */
  /* 화살표 삭제 */
  /* -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none; */
`;

const OptionEle = styled.option`
  background-color: ${({ theme }) => theme.colors.white};
  outline: none;
`;
