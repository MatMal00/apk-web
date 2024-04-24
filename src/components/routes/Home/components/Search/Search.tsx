import { FC, useCallback, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Modal } from "src/components/common";
import { Form, Formik } from "formik";
import { AddProjectForm } from "./AddProjectForm";
import { TProject } from "src/types";

interface ISearchProps {
    addNewProject: (newProject: Omit<TProject, "uid">) => Promise<void>;
}

export const Search: FC<ISearchProps> = ({ addNewProject }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToggleModal = useCallback(() => setIsModalOpen((prev) => !prev), []);

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
            <Modal isOpen={isModalOpen} close={handleToggleModal}>
                <AddProjectForm close={handleToggleModal} addNewProject={addNewProject} />
            </Modal>
        </>
    );
};
