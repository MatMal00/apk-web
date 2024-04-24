import { FC } from "react";
import { Button, Card, Input, TextArea } from "src/components/common";
import { Form, Formik } from "formik";

interface IAddProjectFormProps {
    close: () => void;
}

export const AddProjectForm: FC<IAddProjectFormProps> = ({ close }) => {
    return (
        <Card className="w-full max-w-lg cursor-default rounded-lg bg-white p-4 shadow-xl">
            <Card.Header className="border-b pb-4">
                <h3 className="text-2xl font-semibold">Add New Project</h3>
            </Card.Header>
            <Card.Content className="block py-4">
                <Formik initialValues={{}} onSubmit={() => {}}>
                    <Form className="flex flex-col space-y-4">
                        <Input name="name" label="Project Name" placeholder="Enter the project name" />
                        <TextArea
                            className="min-h-28"
                            name="description"
                            label="Description"
                            placeholder="Describe the project"
                        />
                    </Form>
                </Formik>
            </Card.Content>
            <Card.Footer className="flex justify-between gap-5 border-t pt-4">
                <Button onClick={close} variant="secondary" text="Cancel" />
                <Button className="ml-2" text="Add Project" />
            </Card.Footer>
        </Card>
    );
};
