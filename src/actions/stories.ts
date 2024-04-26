import { TStory } from "src/types";
import { postRequest } from "./mutations";
import { fetcher } from "./fetcher";
import { mapToCommonResponseModel } from "src/utils";

export const fetchStoriesAction = async (url: string): Promise<TStory[]> => {
    try {
        const response = await fetcher<{ [key: string]: TStory }>(url);
        return mapToCommonResponseModel<TStory>(response);
    } catch (error) {
        console.error({ error });
        return [];
    }
};

export const addNewStoryAction = async (
    newStory: Omit<TStory, "uid">,
    projectUid: string,
    stories?: TStory[]
): Promise<TStory[]> => {
    const uid = await postRequest(`/projects/${projectUid}/stories`, newStory);
    if (!uid) throw new Error("Something went wrong");

    return [{ ...newStory, uid }, ...(stories ?? [])];
};
