/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 *  
 */

import { IDetailRestaurantItem } from "../../../../logic/api/data/detail/IDetailRestaurantItem";
import { IRestaurantItem } from "../../../../logic/api/data/lists/IRestaurantItem";
import ShimmerLoading from "../../../component/loading/ShimmerLoading";
import CardItem from "../../../component/loading/typeloading/CardItem";
import SpacerLine, { SpacerAttrs } from "../../../component/spacer/SpacerLine";

export const setSpacerFav = (target: SpacerLine):void => {
    const spacerAttrs : SpacerAttrs = {
        color: "#d76700",
        style: "horizontal",
        width: 50,
        height: 6
    }
    target.attrs = spacerAttrs;
}

export const cvtFavDataToItem = (source: IDetailRestaurantItem[]): IRestaurantItem[] => {
    const items: IRestaurantItem[] = [];

    source.forEach((itemDetail: IDetailRestaurantItem) => {
        items.push({
            id: itemDetail.id,
            name: itemDetail.name,
            rating: itemDetail.rating,
            pictureId: itemDetail.pictureId,
            city: itemDetail.city,
            description: itemDetail.description,
            pictureLocation: itemDetail.pictureLocation
        });
    })
    return items;
}

export const generateShimmerLoading = (shimmer: HTMLElement): void => {
    for(let x = 0; x < 3; x++){
        const shimmLoading = <ShimmerLoading> document.createElement("shimmer-loading");
        shimmLoading.views = new CardItem();
        shimmer.append(shimmLoading);
    }
}