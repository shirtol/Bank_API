import bankApi from "../apis/bankApi";
import { User } from "../types/types";

export const getAllUsers = async (): Promise<User[]> => {
    const { data } = await bankApi.get("/users");

    return data;
};

export const getUser = async (id: string): Promise<User> => {
    const { data } = await bankApi.get(`/user`, {
        headers: { "user-id": id },
    });
    console.log(data);

    return data;
};
