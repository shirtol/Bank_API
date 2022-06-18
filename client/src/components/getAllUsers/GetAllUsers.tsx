import React, { useState } from "react";
import { getAllUsers } from "../../networkUtils/networkUtils";
import { User } from "../../types/types";
import Button from "../button/Button";

interface GetAllUsersProps {
    setResults: (res: object) => void;
}

const GetAllUsers = ({ setResults }: GetAllUsersProps) => {
    const fetchAllUsers = async () => {
        const allUsers = await getAllUsers();
        console.log(allUsers);
        setResults(allUsers);
    };

    return <Button onBtnClicked={fetchAllUsers} title="get all users"></Button>;
};

export default GetAllUsers;
