import { FC } from "react";
import { useParams } from "react-router-dom";
import { Column, Task } from "./components";

interface IBoardProps {}

export const Board: FC<IBoardProps> = () => {
    const { projectUid } = useParams<{ projectUid: string }>();
    console.log(projectUid);
    return (
        <div className="mt-6 flex h-screen w-full flex-col">
            <div className="grid grid-cols-3 gap-6">
                <Column title="To Do">
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                </Column>
                <Column title="Doing">
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                </Column>
                <Column title="Done">
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                </Column>
                {/* <div className="rounded-lg bg-gray-100 p-4 shadow dark:bg-gray-800">
                    <h2 className="mb-4 text-lg font-semibold">Doing</h2>
                    <div className="space-y-4">
                        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-700">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold">Task 2</h3>
                                    <p className="text-gray-500 dark:text-gray-400">Description of Task 2</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-800 dark:text-green-100">
                                        High
                                    </span>
                                    <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800 dark:bg-purple-800 dark:text-purple-100">
                                        Project B
                                    </span>
                                </div>
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                                <p className="text-gray-500 dark:text-gray-400">April 22, 2023</p>
                                <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
                                    Doing
                                </span>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* <div className="rounded-lg bg-gray-100 p-4 shadow dark:bg-gray-800">
                    <h2 className="mb-4 text-lg font-semibold">Done</h2>
                    <div className="space-y-4">
                        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-700">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold">Task 3</h3>
                                    <p className="text-gray-500 dark:text-gray-400">Description of Task 3</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                                        Low
                                    </span>
                                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-800 dark:text-green-100">
                                        Project C
                                    </span>
                                </div>
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                                <p className="text-gray-500 dark:text-gray-400">April 20, 2023</p>
                                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-800 dark:text-green-100">
                                    Done
                                </span>
                            </div>
                        </div>
                    </div> 
                </div>*/}
            </div>
        </div>
    );
};
