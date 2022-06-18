import React, { useState } from "react";
import { getAllUsers } from "../../networkUtils/networkUtils";
import { User } from "../../types/types";

interface ButtonProps {
    onBtnClicked: () => void;
}
const Button = ({ onBtnClicked }: ButtonProps) => {
    return <button onClick={onBtnClicked}>Button</button>;
};

export default Button;
