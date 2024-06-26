import { ChangeEvent, FC, useCallback, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Modal } from "src/components/common";
import { Form, Formik } from "formik";
import { AddStoryForm } from "./AddStoryForm";
import { TStory } from "src/types";
import { useSearchParams } from "react-router-dom";
import { useQueryParams } from "src/hooks";

interface ISearchStoriesProps {
    addNewStory: (newStory: Omit<TStory, "uid">) => Promise<void>;
}

export const SearchStories: FC<ISearchStoriesProps> = ({ addNewStory }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { getUpdatedQueries } = useQueryParams();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const search = searchParams.get("searchStories") ?? "";

    const handleToggleModal = useCallback(() => setIsModalOpen((prev) => !prev), []);

    const handleSearchStories = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setSearchParams(getUpdatedQueries("searchStories", value));
    };

    return (
        <>
            <Formik initialValues={{ search: search }} onSubmit={() => {}}>
                <Form className="flex items-center justify-between gap-6">
                    <Input
                        onChange={handleSearchStories}
                        name="search"
                        placeholder="Search stories..."
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
                <AddStoryForm close={handleToggleModal} addNewStory={addNewStory} />
            </Modal>
        </>
    );
};
