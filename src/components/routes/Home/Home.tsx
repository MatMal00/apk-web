import { faEllipsisVertical, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "src/components/common";
import { useAuth } from "src/hooks";

const cards = ["", "", "", "", "", "", "", "", ""];

export const Home: FC = () => {
    const { currentUser } = useAuth();
    console.log(currentUser);
    return (
        <Formik onSubmit={() => {}} initialValues={{ search: "" }}>
            {() => {
                return (
                    <Form>
                        <section className="grid gap-6">
                            <div>
                                <h1 className="bold">Your Projects</h1>
                                <p>View and manage your existing web projects.</p>
                            </div>
                            <div className="flex items-center justify-between gap-6">
                                <Input name="search" placeholder="Search projects..." containerClassName="basis-80" />
                                <Button
                                    className="aspect-square w-10 rounded-full shadow-md"
                                    icon={<FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff" }} />}
                                />
                            </div>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {cards.map((_, key) => (
                                    <Link to={"/"}>
                                        <div key={key} className="cursor-pointer rounded-lg border bg-white shadow-sm">
                                            <div className="flex flex-row items-center gap-4 space-y-1.5 p-6">
                                                <img
                                                    alt="Project Thumbnail"
                                                    className="aspect-square h-16 rounded-md object-cover"
                                                    src="https://img.freepik.com/free-photo/light-bulb-with-drawing-graph_1232-2105.jpg?size=626&ext=jpg"
                                                    width="64"
                                                />
                                                <div className="grid gap-1">
                                                    <h2 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                                                        Acme Website
                                                    </h2>
                                                    <p className="text-sm  accent-gray-700">
                                                        A modern website for Acme Inc, a leading manufacturing company.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between p-6" data-id="23">
                                                <div className="text-sm text-gray-500 dark:text-gray-400" data-id="24">
                                                    Created 1 week ago
                                                </div>
                                                <button
                                                    className="rounded-lg px-3.5 py-1 transition-colors hover:bg-gray-100"
                                                    data-id="25"
                                                >
                                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </Form>
                );
            }}
        </Formik>
    );
};
