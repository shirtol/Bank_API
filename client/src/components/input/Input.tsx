import React from "react";
import { StyledInput } from "./StyledInput";

interface InputProps {
    placeholder: string;
    value: string;
    onInputChange: (input: string) => void;
}

const Input = ({ placeholder, value, onInputChange }: InputProps) => {
    return (
        <StyledInput
            placeholder={placeholder}
            value={value}
            onChange={(e) => onInputChange(e.target.value)}
        ></StyledInput>
    );
};

export default Input;
