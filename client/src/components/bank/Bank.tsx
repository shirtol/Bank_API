import React, { useState } from "react";
import ReactJson from "react-json-view";
import GetAllUsers from "../getAllUsers/GetAllUsers";
import GetUser from "../getUser/GetUser";
import ResultsView from "../resultsView/ResultsView";
import { StyledFlexWrapper } from "../styledFlexWrapper/StyledFlexWrapper";

const Bank = () => {
    const [currResult, setCurrResult] = useState({});

    return (
        <StyledFlexWrapper childWidth="50%" marginTop="2rem">
            <StyledFlexWrapper flexDirection="column">
                <GetAllUsers setResults={setCurrResult}></GetAllUsers>
                <GetUser setResults={setCurrResult}></GetUser>
            </StyledFlexWrapper>
            <StyledFlexWrapper
                flexDirection="column"
                justifyContent="flex-start"
                overflowY="scroll"
            >
                <ReactJson src={currResult}></ReactJson>
            </StyledFlexWrapper>
        </StyledFlexWrapper>
    );
};

export default Bank;
