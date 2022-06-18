import styled from "styled-components";

interface StyledFlexWrapperProps {
    flexDirection?: string;
}

export const StyledFlexWrapper = styled.div<StyledFlexWrapperProps>`
    display: flex;
    flex-direction: ${(props) => props.flexDirection ?? "row"};
`;
