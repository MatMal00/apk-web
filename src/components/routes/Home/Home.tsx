import { FC } from "react";
import { Link } from "react-router-dom";
import { Header, ProjectCard, Search } from "./components";
import { useFetchProjects } from "src/libs/useFetchProjects";

export const Home: FC = () => {
    const { userProjects, addNewProject, removeProject } = useFetchProjects();

    if (!userProjects) return null;
    return (
        <section className="grid gap-6">
            <Header />
            <Search addNewProject={addNewProject} />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {userProjects.map((project, key) => (
                    <Link key={key} to={"/"}>
                        <ProjectCard project={project} removeProject={removeProject} />
                    </Link>
                ))}
            </div>
        </section>
    );
};
