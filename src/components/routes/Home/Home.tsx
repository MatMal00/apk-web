import { FC, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Header, ProjectCard, Search } from "./components";
import { useFetchProjects } from "src/libs/useFetchProjects";
import { ROUTE } from "src/constants";
import { useAuth } from "src/hooks";

export const Home: FC = () => {
    const { currentUser } = useAuth();
    const { userProjects, addNewProject, removeProject } = useFetchProjects();
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search")?.toLowerCase();

    const filteredProjects = useMemo(
        () =>
            search?.length
                ? userProjects?.filter((project) => project.name.toLowerCase().includes(search))
                : userProjects,
        [search, userProjects]
    );
    const userUid = currentUser?.uid ?? "";

    if (!filteredProjects) return null;
    return (
        <section className="grid gap-6">
            <Header />
            <Search addNewProject={addNewProject} />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project, key) => (
                    <Link key={key} to={`${ROUTE.BOARD}/${project.uid}`}>
                        <ProjectCard project={project} removeProject={removeProject} userUid={userUid} />
                    </Link>
                ))}
            </div>
        </section>
    );
};
