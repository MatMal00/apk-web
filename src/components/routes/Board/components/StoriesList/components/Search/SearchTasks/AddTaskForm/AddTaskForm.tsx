import { FC } from "react";
import { Button, Card, Input, TextArea } from "src/components/common";
import { Form, Formik } from "formik";
import { TTask } from "src/types";
import { PriorityDropdown } from "src/components/common/Form/Dropdown/components";
import { TASK_PRIORITY, TASK_STATUS } from "src/constants";

interface IAddTaskFormProps {
    close: () => void;
    addNewTask: (newTask: Omit<TTask, "uid">) => Promise<void>;
    storyUid: string;
}

export const AddTaskForm: FC<IAddTaskFormProps> = ({ close, addNewTask, storyUid }) => {
    return (
        <Card className="w-full cursor-default rounded-lg bg-white p-4 shadow-xl md:p-0">
            <Card.Header className="border-b pb-4">
                <h3 className="text-2xl font-semibold">Add new task</h3>
            </Card.Header>
            <Formik
                initialValues={{
                    name: "",
                    description: "",
                    priority: TASK_PRIORITY.LOW,
                    estimatedCompletionTime: 0,
                }}
                onSubmit={(values) => {
                    addNewTask({
                        ...values,
                        dateAdded: new Date().getTime(),
                        status: TASK_STATUS.TO_DO,
                        storyUid,
                    });
                    close();
                }}
            >
                {({ values: { priority, estimatedCompletionTime }, dirty }) => {
                    const completionTime = estimatedCompletionTime > 1 ? "hours" : "hour";

                    return (
                        <Form>
                            <Card.Content className="block py-4">
                                <div className="flex max-h-72 flex-col space-y-4 overflow-y-auto pr-2.5 md:max-h-max md:p-2">
                                    <Input name="name" label="Story Name" placeholder="Enter the project name" />
                                    <PriorityDropdown priority={priority} />
                                    <TextArea
                                        className="min-h-28"
                                        name="description"
                                        label="Description"
                                        placeholder="Describe the project"
                                    />
                                    <div className="flex items-end gap-2">
                                        <Input
                                            name="estimatedCompletionTime"
                                            type="number"
                                            label="Estimated completion time"
                                        />
                                        <p>{completionTime}</p>
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
                    );
                }}
            </Formik>
        </Card>
    );
};
