import React, { useState } from "react";
import { getAllUsers } from "../../networkUtils/networkUtils";
import { User } from "../../types/types";

interface ButtonProps {
    onBtnClicked: () => void;
    title: string;
}
const Button = ({ onBtnClicked, title }: ButtonProps) => {
    return <button onClick={onBtnClicked}>{title}</button>;
};

export default Button;
