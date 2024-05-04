import { Form, Formik } from "formik";
import { FC } from "react";
import { Button, Card, Input, TextArea } from "src/components/common";
import { timestampToDate } from "src/helpers";
import { useFetchUsers } from "src/libs";
import { TProject } from "src/types";
import { USER_ROLE_NAME } from "src/constants";

interface IEditProjectFormProps {
    project: TProject;
    close: () => void;
    updateProjectData: (updatedData: TProject) => void;
}

export const EditProjectForm: FC<IEditProjectFormProps> = ({
    project,
    project: { name: initialName, description: initialDescription, createdAt, watchers, logoUrl: initialLogoUrl },
    updateProjectData,
    close,
}) => {
    const { data: users = [] } = useFetchUsers();

    const participants = users.filter((user) => watchers.includes(user.uid));

    return (
        <Card className="w-full cursor-default rounded-lg bg-white p-4 shadow-xl md:p-0">
            <Card.Header className="df justify-between border-b pb-4">
                <h3 className="text-2xl font-semibold">{initialName}</h3>
            </Card.Header>
            <Formik
                initialValues={{
                    name: initialName,
                    description: initialDescription,
                    logoUrl: initialLogoUrl,
                }}
                onSubmit={(values) => {
                    updateProjectData({ ...project, ...values });
                    close();
                }}
            >
                {({ dirty }) => (
                    <Form>
                        <Card.Content className="block py-4">
                            <div className="flex max-h-56 flex-col justify-between space-y-4 overflow-y-auto pr-2.5 md:max-h-max md:flex-row md:gap-10 md:overflow-y-visible md:p-0">
                                <div className="flex basis-2/4 flex-col space-y-4">
                                    <Input name="name" label="Story Name" placeholder="Enter the project name" />
                                    <Input name="logoUrl" label="Logo url" placeholder="Enter the logo url" />
                                    <TextArea
                                        className="min-h-28"
                                        name="description"
                                        label="Description"
                                        placeholder="Describe the project"
                                    />
                                    <div>
                                        <h6 className="text-sm font-semibold">Date Added</h6>
                                        <p>{timestampToDate(createdAt)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="my-3.5">
                                <h4 className="mb-1 text-sm font-medium">Participants</h4>
                                <div className="grid max-h-24 gap-2 overflow-y-auto md:max-h-52">
                                    {participants.map(({ username, email, role, uid }) => (
                                        <div
                                            key={uid}
                                            className="flex items-center justify-between gap-2 rounded-md bg-gray-100 p-2  dark:bg-gray-800"
                                        >
                                            <div className="flex items-center gap-2 whitespace-nowrap">
                                                <p>{username}</p>
                                                <p className="text-sm text-gray-500 ">{` - ${USER_ROLE_NAME[role]}`}</p>
                                            </div>
                                            <p>{email}</p>
                                        </div>
                                    ))}
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
                )}
            </Formik>
        </Card>
    );
};
