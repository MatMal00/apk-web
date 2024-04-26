import { fetchProjectAction } from "src/actions";
import { TProject } from "src/types";
import useSWRImmutable from "swr/immutable";

export const useFetchProject = (projectUid: string) => {
    const { data, error, isLoading } = useSWRImmutable<TProject | undefined, string>(`/projects/${projectUid}`, () =>
        fetchProjectAction(projectUid)
    );

    return { project: data, error, isLoading };
};
