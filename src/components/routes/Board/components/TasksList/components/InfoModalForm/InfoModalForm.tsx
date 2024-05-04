import { FC } from "react";
import { Button, Card, Input, TextArea } from "src/components/common";
import { Form, Formik } from "formik";
import { timestampToDate } from "src/helpers";
import { TTask } from "src/types";
import { PriorityDropdown, StatusDropdown, UsersDropdown } from "src/components/common/Form/Dropdown/components";
import { useFetchUsers } from "src/libs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { TASK_STATUS } from "src/constants";
// import cn from "classnames";

interface IInfoModalFormProps {
    close: () => void;
    task: TTask;
    updateTaskData: (updatedData: TTask) => Promise<void>;
    deleteTask: (task: TTask) => Promise<void>;
}

export const InfoModalForm: FC<IInfoModalFormProps> = ({
    close,
    task,
    task: {
        name: initialName,
        description: initialDescription,
        status: initialStatus,
        priority: initialPriority,
        dateAdded,
        estimatedCompletionTime,
        endDate,
        startDate,
        assignedUser: initialAssignedUser,
    },
    deleteTask,
    updateTaskData,
}) => {
    const handleDeleteStory = () => {
        deleteTask(task);
        close();
    };

    const { data: users = [] } = useFetchUsers();
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
                    const endDate = values.status === TASK_STATUS.DONE ? new Date().getTime() : null;
                    const startDate =
                        initialStatus === TASK_STATUS.TO_DO ? new Date().getTime() : task.startDate ?? null;
                    const updateStatus = !initialAssignedUser?.uid;
                    const assignedUser = users.find((user) => user.uid === values.userUid);
                    updateTaskData({
                        ...task,
                        ...values,
                        endDate,
                        status: updateStatus ? TASK_STATUS.DOING : values.status,
                        startDate,
                        assignedUser: assignedUser
                            ? {
                                  uid: assignedUser.uid,
                                  name: assignedUser.username,
                                  role: assignedUser.role,
                              }
                            : null,
                    });
                    close();
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
                                        userUid={initialAssignedUser?.uid ?? ""}
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
