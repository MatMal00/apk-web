import { FC } from "react";
import { Button, Card, Input, TextArea } from "src/components/common";
import { Form, Formik } from "formik";
import { PriorityDropdown } from "src/components/common/Form/Dropdown/components";
import { TASK_PRIORITY, TASK_STATUS } from "src/constants";
import { TStory } from "src/types";

interface IAddStoryFormFormProps {
    close: () => void;
    addNewStory: (newStory: Omit<TStory, "uid">) => Promise<void>;
}

export const AddStoryForm: FC<IAddStoryFormFormProps> = ({ close, addNewStory }) => {
    return (
        <Card className="w-full cursor-default rounded-lg bg-white p-4 shadow-xl md:p-0">
            <Card.Header className="border-b pb-4">
                <h3 className="text-2xl font-semibold">Add new story</h3>
            </Card.Header>
            <Formik
                initialValues={{
                    name: "Add loading screens to the app",
                    description: "Add loading screens to the app that contains variour animations and logo of the app.",
                    priority: TASK_PRIORITY.LOW,
                }}
                onSubmit={(values) => {
                    addNewStory({
                        ...values,
                        dateAdded: new Date().getTime(),
                        status: TASK_STATUS.TO_DO,
                        estimatedCompletionTime: 0,
                        tasks: [],
                    });
                    close();
                }}
            >
                {({ values: { priority } }) => (
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
                            <Button type="submit" className="ml-2 basis-32" text="Save" />
                        </Card.Footer>
                    </Form>
                )}
            </Formik>
        </Card>
    );
};
