import { FC } from "react";
import { Button, Card, Input, TextArea } from "src/components/common";
import { Form, Formik } from "formik";
import { useAuth } from "src/hooks";
import { TStory } from "src/types";
import { createProject } from "src/helpers";
import { TASK_PRIORITY } from "src/constants";

interface IAddStoryFormProps {
    close: () => void;
    addNewStory: (newStory: Omit<TStory, "uid">) => Promise<void>;
}

export const AddStoryForm: FC<IAddStoryFormProps> = ({ close, addNewStory }) => {
    const { currentUser } = useAuth();

    const handleAddNewStory = () => {
        if (currentUser) {
            const payload: Omit<TStory, "uid"> = {
                name: "Ultrasonic Drill Rig",
                description:
                    "This advanced drill rig offers high-efficiency and precision for complex geological surveys.",
                priority: TASK_PRIORITY.MEDIUM,
                estimatedCompletionTime: 0,
                status: "doing",
                dateAdded: new Date().getTime(),
                assignedUser: {
                    uid: currentUser.uid,
                    name: currentUser.username,
                    role: currentUser.role,
                },
                tasks: [],
            };

            addNewStory(payload);
            close();
        }
    };

    return (
        <Card className="w-full max-w-lg cursor-default rounded-lg bg-white p-4 shadow-xl md:p-0">
            <Card.Header className="border-b pb-4">
                <h3 className="text-2xl font-semibold">Add New Project</h3>
            </Card.Header>
            <Formik
                validationSchema={createProject}
                initialValues={{
                    name: "Project",
                    description:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id incidunt esse est architecto voluptatibus excepturi",
                    logoUrl:
                        "https://img.freepik.com/free-photo/light-bulb-with-drawing-graph_1232-2105.jpg?size=626&ext=jpg",
                }}
                onSubmit={() => handleAddNewStory()}
            >
                <Form>
                    <Card.Content className="block py-4">
                        <div className="flex flex-col space-y-4">
                            <Input name="name" label="Project Name" placeholder="Enter the project name" />
                            <Input name="logoUrl" label="Logo url" placeholder="Enter the logo url" />
                            <TextArea
                                className="min-h-28"
                                name="description"
                                label="Description"
                                placeholder="Describe the project"
                            />
                        </div>
                    </Card.Content>
                    <Card.Footer className="flex justify-between gap-5 border-t pt-4">
                        <Button type="button" onClick={close} variant="secondary" text="Cancel" />
                        <Button type="submit" className="ml-2" text="Add Project" />
                    </Card.Footer>
                </Form>
            </Formik>
        </Card>
    );
};
