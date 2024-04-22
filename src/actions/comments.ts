import { IComment } from "src/types";
import { deleteRequest, postRequest } from "./mutations";

export const addCommentAction = async (newComment: IComment, comments?: IComment[], postId?: number) => {
    const addedComment = (await postRequest<{ data: IComment }>(`/posts/${postId}/comments`, newComment)).data;
    return [{ ...addedComment }, ...(comments ?? [])];
};

export const removeCommentAction = async (commentId: number, comments?: IComment[]) => {
    await deleteRequest(`/comments/${commentId}`);
    return (comments ?? []).filter((comment) => comment.id !== commentId);
};
