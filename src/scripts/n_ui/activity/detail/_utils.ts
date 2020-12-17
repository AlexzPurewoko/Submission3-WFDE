/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IConsumerReview } from "../../../n_logic/api/data/detail/IConsumerReview";
import { IDetailRestaurantItem } from "../../../n_logic/api/data/detail/IDetailRestaurantItem";
import { ISingleName } from "../../../n_logic/api/data/detail/ISingleName";
import { IResultReview } from "../../../n_logic/api/data/review/IResultReview";
import { AddReviewCallback } from "../../../n_utils/callbacks/AddReviewCallback";
import Badges, { BadgeOptions } from "../../component/badge/Badges";
import DetailSummary from "../../component/detail/DetailSummary";
import RoundedImages, { RImageAttrs } from "../../component/image/RoundedImages";
import ShimmerLoading, { ShimmerViews } from "../../component/loading/ShimmerLoading";
import { BadgeListShimmer } from "../../component/loading/typeloading/BadgeListShimmer";
import { DescriptionShimmer } from "../../component/loading/typeloading/DescriptionShimmer";
import DetailSummaryShimmer from "../../component/loading/typeloading/DetailSummaryShimmer";
import { ReviewItemCardShimmer } from "../../component/loading/typeloading/ReviewItemCardShimmer";
import AddReview from "../../component/review/AddReview";
import ConsumerReview from "../../component/review/ConsumerReview";
import SpacerLine, { SpacerAttrs } from "../../component/spacer/SpacerLine";

const spacerAttrs : SpacerAttrs = {
    color: "#d76700",
    style: "horizontal",
    width: 50,
    height: 6
};

export const applyRoundedImages = (iItem: IDetailRestaurantItem, target: RoundedImages)=>{
    const rImageAttrs : RImageAttrs = {
        src: iItem.pictureLocation,
        alt: `Poster of ${iItem.name}`,
        css: {
            "width" : "330px"
        }
    }

    target.properties = rImageAttrs;
    target.render();
}

export const applySummaryDetails = (iItem: IDetailRestaurantItem, target: DetailSummary) => {
    target.data = iItem;
    target.render();
}

export const applyDescriptionDetails = (iItem: IDetailRestaurantItem, target: HTMLElement) => {
    const spacerLineElement : SpacerLine = target.querySelector("spacer-line");
    const paragraphText : HTMLElement = target.querySelector(".content > p");

    spacerLineElement.attrs = spacerAttrs;

    paragraphText.innerText = iItem.description;
}

const generateMenus = (iNames: ISingleName[], badgeElement: Badges) => {
    const options: BadgeOptions = {
        color: "red",
        borderColor: "red",
        bgColor: "white"
    }

    badgeElement.options = options;
    badgeElement.item = iNames;
    badgeElement.render();
}

export const generateFoodAndDrinksSection = (iItem: IDetailRestaurantItem, target: HTMLElement) => {
    const foodSection : Badges = target.querySelector(".food-menu > list-badge");
    const drinkSection : Badges = target.querySelector(".drink-menu > list-badge");

    // spacer line
    const spacerLineFood: SpacerLine = target.querySelector(".food-menu > spacer-line");
    const spacerLineDrinks: SpacerLine = target.querySelector(".drink-menu > spacer-line");
    
    generateMenus(iItem.menus.foods, foodSection);
    generateMenus(iItem.menus.drinks, drinkSection);

    spacerLineFood.attrs = spacerAttrs;
    spacerLineDrinks.attrs = spacerAttrs;
}


export const applyListReviews = (iItem: IDetailRestaurantItem, target: HTMLElement) => {
    const spacerLine : SpacerLine = target.querySelector("spacer-line");
    const divListContainer: HTMLElement = target.querySelector(".list");

    spacerLine.attrs = spacerAttrs;
    divListContainer.innerHTML = '';
    iItem.consumerReviews.forEach((itemReview: IConsumerReview) => {
        const createElm = <ConsumerReview> document.createElement("review-item-consumer");
        createElm.data = itemReview;
        divListContainer.append(createElm);
    });
}

export const addLayoutComposeReview = (iItem: IDetailRestaurantItem, cb: AddReviewCallback, target: HTMLElement) => {
    const spacerLine: SpacerLine = target.querySelector("spacer-line");
    const composeReview: AddReview = target.querySelector("compose-review");
    
    spacerLine.attrs = spacerAttrs;
    composeReview.restaurantId = iItem.id;
    composeReview.onSubmit = cb;
    composeReview.render();
} 

export const editReviewItems = (data: IResultReview, target: HTMLElement) => {
    const divListContainer: HTMLElement = target.querySelector(".list");
    
    divListContainer.innerHTML = '';
    data.customerReviews.forEach((itemReview: IConsumerReview) => {
        const createElm = <ConsumerReview> document.createElement("review-item-consumer");
        createElm.data = itemReview;
        divListContainer.append(createElm);
    });
}

export const generateLoadingLayouts = (mainElm: HTMLElement) : ShimmerLoading[]  => {
    const composeLoading = (s: ShimmerLoading, impl: ShimmerViews): ShimmerLoading => {
        s.views = impl
        return s;
    }

    return [
        composeLoading(mainElm.querySelector(".summary_info > shimmer-loading"), new DetailSummaryShimmer()),
        composeLoading(mainElm.querySelector(".description > shimmer-loading"), new DescriptionShimmer()),
        composeLoading(mainElm.querySelector(".food-menu > shimmer-loading"), new BadgeListShimmer()),
        composeLoading(mainElm.querySelector(".drink-menu > shimmer-loading"), new BadgeListShimmer()),
        composeLoading(mainElm.querySelector(".list-review > shimmer-loading"), new ReviewItemCardShimmer()),
        composeLoading(mainElm.querySelector(".add-reviews > shimmer-loading"), new ReviewItemCardShimmer())
    ]
}

export const showHideShimmerLayout = (shimmer: ShimmerLoading[], state: "show" | "hide"): void => {
    shimmer.forEach((item) => {
        switch(state) {
            case "hide": 
                $(item).hide();
                break;
            case "show":
                $(item).show();
        }
    });
}