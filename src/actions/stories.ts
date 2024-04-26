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

// export const fetchProjectAction = async (projectUid: string): Promise<TProject | undefined> => {
//     try {
//         const project = await fetcher<TProject>(`/projects/${projectUid}`);
//         return project;
//     } catch (error) {
//         console.error({ error });
//         return undefined;
//     }
// };

// export const fetchUserProjectsAction = async (): Promise<TProject[]> => {
//     try {
//         const response = await fetcher<{ [key: string]: TProject }>("/projects");
//         return mapToCommonResponseModel<TProject>(response);
//     } catch (error) {
//         console.error({ error });
//         return [];
//     }
// };

export const addNewStoryAction = async (
    newStory: Omit<TStory, "uid">,
    projectUid: string,
    stories?: TStory[]
): Promise<TStory[]> => {
    const uid = await postRequest(`/projects/${projectUid}/stories`, newStory);
    if (!uid) throw new Error("Something went wrong");

    return [{ ...newStory, uid }, ...(stories ?? [])];
};

// export const removeProjectAction = async (projectUid: string, user: TCommonUser, projects?: TProject[]) => {
//     const filteredProjects = user.projects?.filter((project) => project !== projectUid) ?? [];

//     await Promise.all([
//         deleteRequest(`/projects/${projectUid}`),
//         updateRequest(`/users/${user.uid}`, {
//             ...user,
//             projects: filteredProjects,
//         }),
//     ]);

//     return (projects ?? []).filter((project) => project.uid !== projectUid);
// };
