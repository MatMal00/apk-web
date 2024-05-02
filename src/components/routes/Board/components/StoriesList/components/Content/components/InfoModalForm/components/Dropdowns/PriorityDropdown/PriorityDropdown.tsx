import { FC } from "react";
import { Dropdown } from "src/components/common";
import { TASK_PRIORITY, TPriority } from "src/constants";
import cn from "classnames";

interface IPriorityDropdownProps {
    priority: TPriority;
}

export const PriorityDropdown: FC<IPriorityDropdownProps> = ({ priority }) => {
    return (
        <Dropdown
            label="Priority"
            name="priority"
            items={Object.values(TASK_PRIORITY)}
            displayValue={
                <div className="flex items-center gap-2">
                    <div
                        className={cn("h-3 w-3 rounded-full", {
                            ["bg-gray-500"]: priority === TASK_PRIORITY.LOW,
                            ["bg-green-500"]: priority === TASK_PRIORITY.MEDIUM,
                            ["bg-red-500"]: priority === TASK_PRIORITY.HIGH,
                        })}
                        data-id="27"
                    ></div>
                    <span>{priority}</span>
                </div>
            }
        />
    );
};
