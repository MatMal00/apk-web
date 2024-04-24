import { FC, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Header, ProjectCard, Search } from "./components";
import { useFetchProjects } from "src/libs/useFetchProjects";

export const Home: FC = () => {
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

    if (!filteredProjects) return null;
    return (
        <section className="grid gap-6">
            <Header />
            <Search addNewProject={addNewProject} />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project, key) => (
                    <Link key={key} to={"/"}>
                        <ProjectCard project={project} removeProject={removeProject} />
                    </Link>
                ))}
            </div>
        </section>
    );
};
