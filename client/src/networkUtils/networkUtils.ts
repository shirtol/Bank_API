import bankApi from "../apis/bankApi";
import { User } from "../types/types";

export const getAllUsers = async (): Promise<User[]> => {
    const { data } = await bankApi.get("/users");
    console.log(data);

    return data;
};
