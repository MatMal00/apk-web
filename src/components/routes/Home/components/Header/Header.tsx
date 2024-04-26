import { FC } from "react";

interface IHeaderProps {}

export const Header: FC<IHeaderProps> = () => {
    return (
        <div>
            <h1 className="bold mb-1 leading-none">Your Projects</h1>
            <p>View and manage your existing web projects.</p>
        </div>
    );
};
