import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "src/components/sections";

interface IDefaultLayoutProps {}

export const DefaultLayout: FC<IDefaultLayoutProps> = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="container mx-auto flex-grow px-4 pb-10 sm:px-6">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
