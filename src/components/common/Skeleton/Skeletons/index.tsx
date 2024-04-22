import { FC } from "react";

interface ISkeletonProps {}

interface ISkeletonElement extends FC<ISkeletonProps> {
    // Post: typeof PostSkeleton;
    // Comment: typeof CommentSkeleton;
    // UserDetails: typeof UserDetailsSkeleton;
    // Album: typeof AlbumSkeleton;
}

export const Skeleton: ISkeletonElement = () => {
    return null;
};

// Skeleton.Post = PostSkeleton;
// Skeleton.Comment = CommentSkeleton;
// Skeleton.UserDetails = UserDetailsSkeleton;
// Skeleton.Album = AlbumSkeleton;
