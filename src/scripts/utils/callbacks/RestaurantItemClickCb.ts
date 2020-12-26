import { IRestaurantItem } from "../../logic/api/data/lists/IRestaurantItem";
import RestaurantItem from "../../ui/component/restaurant_item/RestaurantItem";

export default interface RestaurantItemClickCb {
    (viewRef: RestaurantItem, data: IRestaurantItem) : void
}