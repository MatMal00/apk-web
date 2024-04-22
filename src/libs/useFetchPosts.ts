import SWR from "swr";
import { addPostAction, fetcher, removePostAction } from "src/actions";
import { IPost } from "src/types";
import { useCallback } from "react";
import toast from "react-hot-toast";

export const useFetchPosts = () => {
    const { data, error, isLoading, mutate } = SWR<IPost[], string>("/posts", fetcher);

    const addPost = useCallback(
        async (newPost: IPost) => {
            try {
                await mutate((posts) => addPostAction(newPost, posts), {
                    optimisticData: (posts) => [newPost, ...(posts ?? [])],
                    populateCache: true,
                    revalidate: false,
                });
                toast.success("Successfully added post");
            } catch {
                toast.error("Failed to add post");
            }
        },
        [mutate]
    );

    const removePost = useCallback(
        async (postId: number) => {
            try {
                await mutate((posts) => removePostAction(postId, posts), {
                    optimisticData: (posts) => (posts ?? []).filter((photo) => photo.id !== postId),
                    populateCache: true,
                    revalidate: false,
                });
                toast.success("Successfully removed post");
            } catch {
                toast.error("Failed to removed post");
            }
        },
        [mutate]
    );

    return { data, error, isLoading, addPost, removePost };
};
