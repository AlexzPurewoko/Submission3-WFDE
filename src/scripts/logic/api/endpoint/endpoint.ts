/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { UConfig } from "./BaseConfig";
import { ImageSize } from "./ImageSize";

export const endpoint = {
    list: () => `${UConfig.url}/list`,
    detail: (id: string) => `${UConfig.url}/detail/${id}`,
    image: (imageSize: ImageSize, id: string) => `${UConfig.url}/images/${imageSize}/${id}`,
    postReview: () => `${UConfig.url}/review`,
    search: (query: string) => `${UConfig.url}/search?q=${query}`
}