import { User } from "./users.interfaces";

export interface UserResponse {
    message: string;
    data: User;
}