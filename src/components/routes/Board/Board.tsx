import { FC, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchProject } from "src/libs/useFetchProject";
import { EditProjectForm, StoriesList } from "./components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "src/components/common";
import { useFetchUsers } from "src/libs";

interface IBoardProps {}

export const Board: FC<IBoardProps> = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { projectUid = "" } = useParams<{ projectUid: string }>();
    const { project, updateProjectData, addUserToProject } = useFetchProject(projectUid);
    const { data: users = [] } = useFetchUsers();

    const handleToggleModal = useCallback(() => setIsModalOpen((prev) => !prev), []);
    const filteredUsers = users.filter((user) => project?.watchers?.includes(user.uid));
    return (
        <>
            <div className="flex w-full flex-col gap-6">
                <div className="flex items-end gap-2">
                    <button onClick={handleToggleModal} className="mb-1">
                        <FontAwesomeIcon icon={faPenToSquare} size="2xl" />
                    </button>
                    <h2 className="text-5xl font-bold leading-none">{project?.name}</h2>
                </div>
                <p>{project?.description}</p>
                <div className="border-b-2" />
                <StoriesList projectUid={projectUid} users={filteredUsers} />
            </div>
            {project && (
                <Modal large isOpen={isModalOpen} close={handleToggleModal}>
                    <EditProjectForm
                        project={project}
                        close={handleToggleModal}
                        updateProjectData={updateProjectData}
                        addUserToProject={addUserToProject}
                    />
                </Modal>
            )}
        </>
    );
};
