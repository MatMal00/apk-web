import { FC } from "react";
import { Link } from "react-router-dom";
import { Header, ProjectCard, Search } from "./components";

const cards = ["", "", "", "", "", "", "", "", ""];

export const Home: FC = () => {
    return (
        <section className="grid gap-6">
            <Header />
            <Search />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cards.map((_, key) => (
                    <Link key={key} to={"/"}>
                        <ProjectCard />
                    </Link>
                ))}
            </div>
        </section>
    );
};
