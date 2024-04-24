import { FC, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Input, TextArea } from "src/components/common";
import { Form, Formik } from "formik";

interface ISearchProps {}

export const Search: FC<ISearchProps> = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToggleModal = () => setIsModalOpen((prev) => !prev);

    return (
        <>
            {/* SAVE STATE IN SEARCH QUERY */}
            <Formik initialValues={{ search: "" }} onSubmit={() => {}}>
                <Form className="flex items-center justify-between gap-6">
                    <Input name="search" placeholder="Search projects..." containerClassName="basis-80" />
                    <Button
                        type="button"
                        onClick={handleToggleModal}
                        className="aspect-square w-10 rounded-full shadow-md"
                        icon={<FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff" }} />}
                    />
                </Form>
            </Formik>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
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
                            <Button variant="secondary" text="Cancel" />
                            <Button className="ml-2" text="Add Project" />
                        </Card.Footer>
                    </Card>
                </div>
            )}
        </>
    );
};
