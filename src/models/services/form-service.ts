import { ApiResponse } from "../common";
import { UserProfile } from "../stores/authentication-model";

export type GetListUsersResponse = ApiResponse<UserProfile[], "userList">;
