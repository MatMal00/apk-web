import { TKeyOfProjectRole, TKeyOfUserRole } from "src/constants";

export type TProject = {
    name: string;
    description: string;
    logoUrl: string;
    admins: string[];
    watchers: string[];
    developers: string[];
    devops: string[];
    createdAt: string;
    uid: string;
    stories: TStory[]; // List of stories associated with the project
};

type TStory = {
    name: string;
    description: string;
    priority: "low" | "medium" | "high";
    estimatedCompletionTime: number; // In hours
    status: "todo" | "doing" | "done";
    dateAdded: Date;
    startDate?: Date; // Optional since it's only set when the story status changes to 'doing'
    endDate?: Date; // Optional since it's only set when the story status changes to 'done'
    assignedUser?: {
        id: string; // Unique identifier for the user
        name: string; // Name of the assigned user
        role: TKeyOfUserRole; // Role of the assigned user
    };
    tasks: TTask[]; // List of tasks associated with the story
};

type TTask = {
    name: string;
    description: string;
    priority: "low" | "medium" | "high";
    storyId: string; // Assuming 'story' refers to a link or identifier for related project story or feature
    estimatedExecutionTime: number; // In hours
    status: "todo" | "doing" | "done";
    dateAdded: Date;
    startDate?: Date; // Optional since it's only set when the task status changes to 'doing'
    endDate?: Date; // Optional since it's only set when the task status changes to 'done'
    assignedUser?: {
        id: string; // Unique identifier for the user
        name: string; // Name of the assigned user
        role: TKeyOfProjectRole; // Role of the assigned user
    };
};
