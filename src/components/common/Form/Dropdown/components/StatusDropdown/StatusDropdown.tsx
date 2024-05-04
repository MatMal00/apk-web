import { FC } from "react";
import { Dropdown } from "src/components/common";
import { TASK_STATUS, TTaskStatus } from "src/constants";
import cn from "classnames";

interface IStatusDropdownProps {
    status: TTaskStatus;
}

export const StatusDropdown: FC<IStatusDropdownProps> = ({ status }) => {
    return (
        <Dropdown
            label="Status"
            name="status"
            items={Object.values(TASK_STATUS)}
            displayValue={
                <div className="flex items-center gap-2">
                    <div
                        className={cn("h-3 w-3 rounded-full", {
                            ["bg-gray-500"]: status === TASK_STATUS.TO_DO,
                            ["bg-green-500"]: status === TASK_STATUS.DOING,
                            ["bg-red-500"]: status === TASK_STATUS.DONE,
                        })}
                        data-id="27"
                    ></div>
                    <span>{status}</span>
                </div>
            }
        />
    );
};
