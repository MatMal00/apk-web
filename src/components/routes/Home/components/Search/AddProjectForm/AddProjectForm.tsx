import { FC } from "react";
import { Button, Card, Input, TextArea } from "src/components/common";
import { Form, Formik } from "formik";
import { useAuth } from "src/hooks";
import { TProject } from "src/types";
import { createProject } from "src/helpers";

interface IAddProjectFormProps {
    close: () => void;
    addNewProject: (newProject: Omit<TProject, "uid">) => Promise<void>;
}

export const AddProjectForm: FC<IAddProjectFormProps> = ({ close, addNewProject }) => {
    const { currentUser } = useAuth();

    const handleAddNewProject = (name: string, description: string, logoUrl: string) => {
        if (currentUser) {
            const payload: Omit<TProject, "uid"> = {
                name,
                description,
                logoUrl,
                watchers: [currentUser.uid],
                admins: [currentUser.uid],
                developers: [],
                devops: [],
                createdAt: new Date().getTime(),
                stories: [],
            };

            addNewProject(payload);
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
                onSubmit={({ name, description, logoUrl }) => handleAddNewProject(name, description, logoUrl)}
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
