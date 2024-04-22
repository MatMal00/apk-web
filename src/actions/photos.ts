import { IPhoto } from "src/types";
import { deleteRequest, postRequest } from "./mutations";

export const addPhotoToAlbumAction = async (newPhoto: IPhoto, photos?: IPhoto[], albumId?: string) => {
    const addedPhoto = (await postRequest<{ data: IPhoto }>(`/photos?albumId=${albumId}`, newPhoto)).data;
    return [{ ...addedPhoto }, ...(photos ?? [])];
};

export const removePhotoFromAlbumAction = async (photoId: number, photos?: IPhoto[]) => {
    await deleteRequest(`/photos/${1}`);
    return (photos ?? []).filter((photo) => photo.id !== photoId);
};
