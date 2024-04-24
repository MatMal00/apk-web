import { FC } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input } from "src/components/common";

interface ISearchProps {}

export const Search: FC<ISearchProps> = () => {
    return (
        <div className="flex items-center justify-between gap-6">
            <Input name="search" placeholder="Search projects..." containerClassName="basis-80" />
            <Button
                className="aspect-square w-10 rounded-full shadow-md"
                icon={<FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff" }} />}
            />
        </div>
    );
};
