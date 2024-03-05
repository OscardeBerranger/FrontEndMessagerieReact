import {User} from "@/interfaces/User";

export interface Request{
    id: number,
    sentBy: User,
    receivedBy: User
}