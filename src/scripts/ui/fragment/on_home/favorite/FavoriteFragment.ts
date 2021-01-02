/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 *  
 */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { IDetailRestaurantItem } from "../../../../logic/api/data/detail/IDetailRestaurantItem";
import MainObjStore from "../../../../logic/db/MainObjStore";
import Fragment from "../../base/Fragment";
import * as utils from "./_utils";
import SpacerLine from "../../../component/spacer/SpacerLine";
import RestaurantList from "../../../component/restaurant_list/RestaurantList";
import RestaurantItem from "../../../component/restaurant_item/RestaurantItem";
import { IRestaurantItem } from "../../../../logic/api/data/lists/IRestaurantItem";
import { DBCallbacks } from "../../../../logic/db/callbacks/DBCallbacks";
import DatabaseHelper from "../../../../logic/db/helper/DatabaseHelper";
import ErrorPage, { AvailableTypes } from "../../../component/errorpage/ErrorPage";
import { Util } from "../../../../utils/util";
import { htmlLayout } from "./_source_layout";

class FavoriteFragment extends Fragment {

    private _spacerLine: SpacerLine = null;
    private _restaurantLists: RestaurantList = null;
    private _errorPage: ErrorPage = null;
    private _loadingView: HTMLElement = null;

    private _databaseCallbacks : DBCallbacks = new DBCallbacks();

    onRenderPage(): void {
        this.innerHTML = this.render();

        this._restaurantLists = this.querySelector("restaurant-list");
        this._spacerLine = this.querySelector("spacer-line");
        this._errorPage = this.querySelector("error-page");
        this._loadingView = this.querySelector(".loading-view");

        this._restaurantLists.onItemClick = (_uiRef: RestaurantItem, data: IRestaurantItem) => {
            window.location.href = `#/DetailActivity/${data.id}/fromFavorite`;
        }
        this._databaseCallbacks.callbacks = (_instance: DatabaseHelper) => {
            this.fetchFromFavorite();
        }
        this.database.addCallbacks(this._databaseCallbacks);
        this._errorPage.errorType = AvailableTypes.favUnavailable;
        this._errorPage.render();

        utils.generateShimmerLoading(this._loadingView);
        
        utils.setSpacerFav(this._spacerLine);
        
    }

    onResumed(): void {
        this.fetchFromFavorite();
    }

    onSaveState(): void {
        
    }
    onDestroy(): void {
        this.database.removeCallbacks(this._databaseCallbacks);
    }
    titleFragment(): string {
        return "Favorites"
    }
    onReceiveMessage(_key: string, _value: any): void {
        
    }

    private render() : string {
        return htmlLayout;
    }

    private fetchFromFavorite() {
        
        this.hideShow("loading");
        this.database.getAllData(MainObjStore.MAIN_DATABASE)
            .then((item : IDetailRestaurantItem[]) => {
                this.onFinishedFetch(true, item);
            })
            .catch((e: any) => {
                this.onFinishedFetch(false, null, e);
            });

    }

    private onFinishedFetch(success: boolean, item: IDetailRestaurantItem[], _e?: any){
        if(success && item.length > 0){
            const results = utils.cvtFavDataToItem(item);
            this._restaurantLists.render(results);
            this.hideShow("lists");
        } else {
            this.hideShow("error");
        }
    } 

    private hideShow(stateUI: "loading" | "lists" | "error"){
        switch(stateUI){
            case "loading" : {
                Util.show(this._loadingView);
                Util.hide(this._errorPage);
                Util.hide(this._restaurantLists);
                break;
            }
            case "lists": {
                Util.hide(this._loadingView);
                Util.hide(this._errorPage);
                Util.show(this._restaurantLists);
                break;
            }
            case "error": {
                Util.hide(this._loadingView);
                Util.show(this._errorPage);
                Util.hide(this._restaurantLists);
            }
        }
    }

}

customElements.define("favorite-fragment", FavoriteFragment);
export default FavoriteFragment;