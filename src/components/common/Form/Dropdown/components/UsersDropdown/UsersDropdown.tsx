import { FC } from "react";
import { Dropdown } from "src/components/common";
import { USER_ROLE, USER_ROLE_NAME } from "src/constants";
import { TCommonUser } from "src/types";

interface IUsersDropdownProps {
    userUid: string;
    data: TCommonUser[];
    currentUser?: TCommonUser;
}

export const UsersDropdown: FC<IUsersDropdownProps> = ({ userUid, data, currentUser }) => {
    const filteredData = data.filter(
        (user) => (user.uid !== currentUser?.uid && user.role === USER_ROLE.DEV) || user.role === USER_ROLE.DEVOPS
    );
    return (
        <Dropdown<TCommonUser>
            label="Assigned User"
            name={userUid}
            items={filteredData}
            displayValue={
                <>
                    {currentUser && (
                        <div className="flex gap-2 whitespace-nowrap">
                            <p>{currentUser.username}</p>
                            <p className="text-sm text-gray-500 ">{` - ${USER_ROLE_NAME[currentUser.role]}`}</p>
                        </div>
                    )}
                </>
            }
        >
            {(item) => <>{item.username}</>}
        </Dropdown>
    );
};
