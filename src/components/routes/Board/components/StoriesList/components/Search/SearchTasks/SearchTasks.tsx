import { ChangeEvent, FC, useCallback, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Modal } from "src/components/common";
import { Form, Formik } from "formik";
import { AddTaskForm } from "./AddTaskForm";
import { TTask } from "src/types";
import { useSearchParams } from "react-router-dom";

interface ISearchTasksProps {
    addNewTask: (newTask: Omit<TTask, "uid">) => Promise<void>;
    storyUid: string;
}

export const SearchTasks: FC<ISearchTasksProps> = ({ addNewTask, storyUid }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const search = searchParams.get("searchTasks") ?? "";

    const handleToggleModal = useCallback(() => setIsModalOpen((prev) => !prev), []);

    const handleSearchTasks = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchParams(value.length ? { ...searchParams, searchTasks: value } : undefined);
    };

    return (
        <>
            <Formik initialValues={{ search: search }} onSubmit={() => {}}>
                <Form className="flex items-center justify-between gap-6">
                    <Input
                        onChange={handleSearchTasks}
                        name="search"
                        placeholder="Search tasks..."
                        containerClassName="basis-80"
                    />
                    <Button
                        type="button"
                        onClick={handleToggleModal}
                        className="aspect-square w-10 rounded-full shadow-md"
                        icon={<FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff" }} />}
                    />
                </Form>
            </Formik>
            <Modal isOpen={isModalOpen} close={handleToggleModal}>
                <AddTaskForm close={handleToggleModal} addNewTask={addNewTask} storyUid={storyUid} />
            </Modal>
        </>
    );
};
