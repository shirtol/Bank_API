import React, { useState } from "react";
import GetAllUsers from "../getAllUsers/GetAllUsers";
import ResultsView from "../resultsView/ResultsView";
import { StyledFlexWrapper } from "../styledFlexWrapper/StyledFlexWrapper";

const Bank = () => {
    const [currResult, setCurrResult] = useState("");

    return (
        <StyledFlexWrapper>
            <StyledFlexWrapper flexDirection="column">
                <GetAllUsers setResults={setCurrResult}></GetAllUsers>;
            </StyledFlexWrapper>
            <ResultsView result={currResult}></ResultsView>
        </StyledFlexWrapper>
    );
};

export default Bank;
