import { IRestaurantItem } from "../../n_logic/api/data/lists/IRestaurantItem";
import RestaurantItem from "../../n_ui/component/restaurant_item/RestaurantItem";

export default interface RestaurantItemClickCb {
    (viewRef: RestaurantItem, data: IRestaurantItem) : void
}