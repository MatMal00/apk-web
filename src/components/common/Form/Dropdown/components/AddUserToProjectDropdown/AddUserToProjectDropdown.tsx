import { FC } from "react";
import { Dropdown } from "src/components/common";
import { TCommonUser } from "src/types";

interface IAddUserToProjectDropdownProps {
    users: TCommonUser[];
    addUserToProject: (user: TCommonUser) => void;
}

export const AddUserToProjectDropdown: FC<IAddUserToProjectDropdownProps> = ({ users, addUserToProject }) => {
    const handleAddUswer = (user: TCommonUser) => addUserToProject(user);
    return (
        <Dropdown<TCommonUser>
            label="Add to project"
            name="userUid"
            items={users}
            onClick={handleAddUswer}
            className="mr-20"
            displayValue={
                <>
                    <div className="flex gap-2 whitespace-nowrap">
                        <p className="text-sm text-gray-500 ">Add user</p>
                    </div>
                </>
            }
        >
            {(item) => <>{item.username}</>}
        </Dropdown>
    );
};
