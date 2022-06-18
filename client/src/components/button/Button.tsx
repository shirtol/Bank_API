import { StyledButton } from "./StyledButton";

interface ButtonProps {
    onBtnClicked: () => void;
    title: string;
}
const Button = ({ onBtnClicked, title }: ButtonProps) => {
    return <StyledButton onClick={onBtnClicked}>{title}</StyledButton>;
};

export default Button;
