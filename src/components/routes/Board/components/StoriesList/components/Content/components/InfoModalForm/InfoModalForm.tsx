import { FC } from "react";
import { Button, Card, Input, TextArea } from "src/components/common";
import { Form, Formik } from "formik";
import { timestampToDate, updateEndDate, updateStartDate, updateStatus } from "src/helpers";
import { TAssignedUser, TCommonUser, TStory } from "src/types";
import { PriorityDropdown, StatusDropdown, UsersDropdown } from "src/components/common/Form/Dropdown/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faTrash } from "@fortawesome/free-solid-svg-icons";
import { TASK_PRIORITY } from "src/constants";
import cn from "classnames";
import toast from "react-hot-toast";

interface IInfoModalFormProps {
    close: () => void;
    story: TStory;
    updateStoryData: (updatedData: TStory) => void;
    deleteStory: (storyUid: string) => void;
    users: TCommonUser[];
}

export const InfoModalForm: FC<IInfoModalFormProps> = ({
    close,
    story,
    story: {
        name: initialName,
        description: initialDescription,
        status: initialStatus,
        priority: initialPriority,
        dateAdded,
        estimatedCompletionTime,
        endDate,
        startDate,
        assignedUser: initialAssignedUser,
        tasks,
        uid,
    },
    deleteStory,
    updateStoryData,
    users,
}) => {
    const handleDeleteStory = () => {
        deleteStory(uid);
        close();
    };

    const completionTime = estimatedCompletionTime > 1 ? "hours" : "hour";
    return (
        <Card className="w-full cursor-default rounded-lg bg-white p-4 shadow-xl md:p-0">
            <Card.Header className="df justify-between border-b pb-4">
                <h3 className="text-2xl font-semibold">{initialName}</h3>
                <button
                    onClick={handleDeleteStory}
                    className="px-4 py-3 text-left text-sm text-gray-700 transition-colors hover:bg-red-900 hover:text-gray-900"
                    role="menuitem"
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </Card.Header>
            <Formik
                initialValues={{
                    name: initialName,
                    description: initialDescription,
                    status: initialStatus,
                    priority: initialPriority,
                    userUid: initialAssignedUser?.uid ?? "",
                }}
                onSubmit={(values) => {
                    try {
                        const assignedUser = users.find((user) => user.uid === values.userUid);
                        const mappedUser: TAssignedUser = assignedUser
                            ? {
                                  uid: assignedUser.uid,
                                  name: assignedUser.username,
                                  role: assignedUser.role,
                              }
                            : null;
                        const nextStatus = updateStatus(initialStatus, values.status, initialAssignedUser, mappedUser);

                        updateStoryData({
                            ...story,
                            ...values,
                            endDate: updateEndDate(values.status),
                            startDate: updateStartDate(initialStatus, nextStatus, story?.startDate),
                            status: nextStatus,
                            assignedUser: mappedUser,
                        });
                        close();
                    } catch (error: unknown) {
                        if (error instanceof Error) {
                            toast.error(error.message);
                        } else {
                            toast.error(String(error));
                        }
                    }
                }}
            >
                {({ values: { status, priority, userUid }, dirty }) => (
                    <Form>
                        <Card.Content className="block py-4">
                            <div className="flex max-h-56 flex-col justify-between space-y-4 overflow-y-auto pr-2.5 md:max-h-max md:flex-row md:gap-10 md:overflow-y-visible md:p-0">
                                <div className="flex basis-2/4 flex-col space-y-4">
                                    <Input name="name" label="Story Name" placeholder="Enter the project name" />
                                    <PriorityDropdown priority={priority} />
                                    <StatusDropdown status={status} />
                                    {!!startDate && (
                                        <div>
                                            <h6 className="text-sm font-semibold">Start Date</h6>
                                            <p>{timestampToDate(startDate)}</p>
                                        </div>
                                    )}
                                    <UsersDropdown
                                        currentUser={users.find((user) => user.uid === userUid)}
                                        data={users}
                                    />
                                </div>
                                <div className="flex basis-2/4 flex-col space-y-4">
                                    <TextArea
                                        className="min-h-28"
                                        name="description"
                                        label="Description"
                                        placeholder="Describe the project"
                                    />
                                    <div>
                                        <h6 className="text-sm font-semibold">Estimated Completion Time</h6>
                                        <p>{`${estimatedCompletionTime} ${completionTime}`}</p>
                                    </div>
                                    <div>
                                        <h6 className="text-sm font-semibold">Date Added</h6>
                                        <p>{timestampToDate(dateAdded)}</p>
                                    </div>
                                    {endDate && (
                                        <div>
                                            <h6 className="text-sm font-semibold">End Date</h6>
                                            <p>{timestampToDate(endDate)}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="my-3.5">
                                <h4 className="mb-1 text-sm font-medium">Tasks</h4>
                                <div className="grid max-h-24 gap-2 overflow-y-auto md:max-h-52">
                                    {tasks.map(({ name, estimatedCompletionTime, ...task }) => (
                                        <div
                                            key={task.uid}
                                            className="flex  items-center justify-between rounded-md bg-gray-100 p-2  dark:bg-gray-800"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className={cn("h-3 w-3 rounded-full", {
                                                        ["bg-gray-500"]: task.priority === TASK_PRIORITY.LOW,
                                                        ["bg-green-500"]: task.priority === TASK_PRIORITY.MEDIUM,
                                                        ["bg-red-500"]: task.priority === TASK_PRIORITY.HIGH,
                                                    })}
                                                ></div>
                                                <p>{name}</p>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                <FontAwesomeIcon icon={faClock} />
                                                <span data:users-id="55">{estimatedCompletionTime}h</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card.Content>
                        <Card.Footer className="flex justify-start gap-5 border-t pt-4">
                            <Button
                                onClick={close}
                                type="button"
                                className="basis-32"
                                variant="secondary"
                                text="Close"
                            />
                            <Button type="submit" className="ml-2 basis-32" text="Save" disabled={!dirty} />
                        </Card.Footer>
                    </Form>
                )}
            </Formik>
        </Card>
    );
};
