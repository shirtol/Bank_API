import React, { useState } from "react";
import { getUser } from "../../networkUtils/networkUtils";
import Button from "../button/Button";
import Input from "../input/Input";
import { StyledFlexWrapper } from "../styledFlexWrapper/StyledFlexWrapper";

interface GetUserProps {
    setResults: (res: object) => void;
}

const GetUser = ({ setResults }: GetUserProps) => {
    const [term, setTerm] = useState("");

    const fetchUser = async () => {
        const user = await getUser(term);
        setResults(user);
    };

    return (
        <StyledFlexWrapper>
            <Button onBtnClicked={fetchUser} title="get user"></Button>
            <Input
                placeholder="enter user id"
                value={term}
                onInputChange={setTerm}
            ></Input>
        </StyledFlexWrapper>
    );
};

export default GetUser;
