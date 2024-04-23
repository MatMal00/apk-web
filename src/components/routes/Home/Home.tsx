import { FC } from "react";
import { useAuth } from "src/hooks";

export const Home: FC = () => {
    const { currentUser } = useAuth();
    console.log(currentUser);
    return (
        <main>
            <h1 className="underline ">Hello world!</h1>
        </main>
    );
};
