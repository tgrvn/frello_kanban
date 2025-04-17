import {Session, User} from "@/prisma/client";

//user
export type CreateUserDTO = Pick<User, "email" | "password">;
export type UserDTO = Omit<User, "password" | "isAcceptedTerms">;

//session
export type CreateSessionDTO = Pick<Session, "userId" | "token" | "ip" | "ua" | "fingerprint">
export type UpdateSessionDTO = Omit<CreateSessionDTO, "userId">