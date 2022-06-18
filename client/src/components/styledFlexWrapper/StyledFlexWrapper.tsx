import styled from "styled-components";

interface StyledFlexWrapperProps {
    flexDirection?: string;
    childWidth?: string;
    justifyContent?: string;
    overflowY?: string;
    marginTop?: string;
}

export const StyledFlexWrapper = styled.div<StyledFlexWrapperProps>`
    display: flex;
    flex-direction: ${(props) => props.flexDirection ?? "row"};
    justify-content: ${(props) => props.justifyContent ?? "space-around"};
    align-items: center;
    width: 100%;
    height: 100vh;
    overflow-y: ${(props) => props.overflowY ?? "visible"};
    margin-top: ${(props) => props.marginTop ?? "0"};
    & > * {
        width: ${(props) => props.childWidth ?? "max-content"};
    }
`;
