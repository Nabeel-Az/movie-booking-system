import { UserProfile } from "@/models/stores/authentication-model";
import { getRequest } from "./axios";
import { mockUserList } from "@/mocks/mocks";
import { GetListUsersResponse } from "@/models/services/form-service";

const isMock = "true";

const userList: UserProfile[] = isMock
  ? [...mockUserList.payload.userProfiles]
  : [];

export const getListUsers = async (): Promise<GetListUsersResponse> => {
  try {
    if (isMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        status: 200,
        payload: {
          userList: userList,
          error: null,
        },
        errorMsg: null,
      };
    } else {
      const response =
        await getRequest<GetListUsersResponse>("users/listUsers");
      return response;
    }
  } catch (error: any) {
    throw new Error("Error fetching list of users: " + error.message);
  }
};
