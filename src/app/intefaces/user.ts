import { Role } from "../enums";

export interface IUser {
    id: string;
    username: string;
    role: Role;
    token?: string;
}