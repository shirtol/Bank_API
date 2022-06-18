import React, { useState } from "react";
import { getAllUsers } from "../../networkUtils/networkUtils";
import { User } from "../../types/types";
import Button from "../button/Button";

const GetAllUsers = () => {
    const [allUsers, setAllUsers] = useState<User[]>([]);

    const fetchAllUsers = async () => {
        const allUsers = await getAllUsers();
        console.log(allUsers);
        setAllUsers(allUsers);
    };

    return <Button onBtnClicked={fetchAllUsers} title="get all users"></Button>;
};

export default GetAllUsers;
