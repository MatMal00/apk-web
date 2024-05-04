import { FC } from "react";
import { Dropdown } from "src/components/common";
import { USER_ROLE, USER_ROLE_NAME } from "src/constants";
import { TCommonUser } from "src/types";

interface IUsersDropdownProps {
    data: TCommonUser[];
    currentUser?: TCommonUser;
}

export const UsersDropdown: FC<IUsersDropdownProps> = ({ data, currentUser }) => {
    const filteredData = data.filter(
        (user) => (user.uid !== currentUser?.uid && user.role === USER_ROLE.DEV) || user.role === USER_ROLE.DEVOPS
    );
    return (
        <Dropdown<TCommonUser>
            label="Assigned User"
            name="userUid"
            items={filteredData}
            displayValue={
                <>
                    <div className="flex gap-2 whitespace-nowrap">
                        <p>{currentUser?.username ?? "User"}</p>
                        <p className="text-sm text-gray-500 ">{` - ${currentUser?.role ? USER_ROLE_NAME[currentUser.role] : "Assign user"}`}</p>
                    </div>
                </>
            }
        >
            {(item) => <>{item.username}</>}
        </Dropdown>
    );
};
