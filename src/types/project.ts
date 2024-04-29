import { TKeyOfProjectRole, TKeyOfUserRole, TPriority, TTaskStatus } from "src/constants";

export type TProject = {
    name: string;
    description: string;
    logoUrl: string;
    admins: string[];
    watchers: string[];
    developers: string[];
    devops: string[];
    createdAt: number;
    uid: string;
    stories: TStory[]; // List of stories associated with the project
};

export type TStory = {
    uid: string;
    name: string;
    description: string;
    priority: TPriority;
    estimatedCompletionTime: number; // In hours
    status: TTaskStatus;
    dateAdded: number;
    startDate?: number; // Optional since it's only set when the story status changes to 'doing'
    endDate?: number; // Optional since it's only set when the story status changes to 'done'
    assignedUser?: {
        uid: string; // Unique identifier for the user
        name: string; // Name of the assigned user
        role: TKeyOfUserRole; // Role of the assigned user
    };
    tasks: TTask[]; // List of tasks associated with the story
};

export type TTask = {
    uid: string;
    name: string;
    description: string;
    priority: TPriority;
    storyUid: string; // Assuming 'story' refers to a link or identifier for related project story or feature
    estimatedCompletionTime: number; // In hours
    status: TTaskStatus;
    dateAdded: number;
    startDate?: number; // Optional since it's only set when the task status changes to 'doing'
    endDate?: number; // Optional since it's only set when the task status changes to 'done'
    assignedUser?: {
        uid: string; // Unique identifier for the user
        name: string; // Name of the assigned user
        role: TKeyOfProjectRole; // Role of the assigned user
    };
};
