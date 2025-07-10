import type { IUserResponse, IUserUpdate } from "@/types/user-type";
import request from "./request";

type UserQueryParams = {
  page: number;
  pageSize: number;
  sortBy: string;
  sortOrder: string;
  email: object;
};

export const requestUser = () => {
  const USERS = async ({
    page,
    pageSize,
    sortBy,
    sortOrder,
    email,
  }: UserQueryParams): Promise<IUserResponse> => {
    const url = `/user?page=${page}&limit=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}&email=${email}&is_deleted=false`;
    return await request({
      url,
      method: "GET",
    });
  };

  const UPDATE_USER = async (id: string, status: boolean) => {
    return await request({
      url: `/user/update-user/${id}`,
      method: "PUT",
      data: {
        is_active: status,
      },
    });
  };

  const UPDATE_USER_FIELD = async (id: string, payload: IUserUpdate) => {
    return await request({
      url: `/user/update-user/${id}`,
      method: "PUT",
      data: payload,
    });
  };
  const FETCH_USER_ID = async (id: string) => {
    return await request({
      url: `/user/${id}`,
      method: "GET",
    });
  };

  const DELETE_USER = async (id: string) => {
    return await request({
      url: `/user/delete-user/${id}`,
      method: "DELETE",
    });
  };

  return {
    USERS,
    UPDATE_USER,
    UPDATE_USER_FIELD,
    FETCH_USER_ID,
    DELETE_USER,
  };
};
