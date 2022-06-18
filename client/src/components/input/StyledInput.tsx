import styled from "styled-components";

interface StyledInputProps {}

export const StyledInput = styled.input<StyledInputProps>`
    letter-spacing: 1.5px;
    padding-left: 5px;
    height: 30px;
    width: 300px;
    border-radius: 4px;
    border: none;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 2px 0px,
        rgba(14, 30, 37, 0.32) 0px 2px 10px 0px;
`;
