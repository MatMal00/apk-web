import { IPost } from "src/types";
import { deleteRequest, postRequest } from "./mutations";

export const addPostAction = async (newPhoto: IPost, posts?: IPost[]) => {
    const addedPost = (await postRequest<{ data: IPost }>("/posts", newPhoto)).data;
    return [{ ...addedPost }, ...(posts ?? [])];
};

export const removePostAction = async (postId: number, posts?: IPost[]) => {
    await deleteRequest(`/posts/${postId}`);
    return (posts ?? []).filter((photo) => photo.id !== postId);
};
