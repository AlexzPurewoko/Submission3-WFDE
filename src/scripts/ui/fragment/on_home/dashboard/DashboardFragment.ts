/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IRestaurantItem } from "../../../../logic/api/data/lists/IRestaurantItem";
import HomeHero from "../../../component/hero/HomeHero";
import RestaurantList from "../../../component/restaurant_list/RestaurantList";
import SearchElement from "../../../component/search/SearchElement";
import Fragment, { GeneralCb } from "../../base/Fragment";
import SpacerLine, { SpacerAttrs } from "../../../component/spacer/SpacerLine";
import GetAllRestaurants from "../../../../logic/api/modules/list/GetAllRestaurants";
import RequestSearch from "../../../../logic/api/modules/searchResult/RequestSearch";
import ApiCallbacks from "../../../../logic/api/modules/base/ApiCallbacks";
import { IAllResponse } from "../../../../logic/api/allresponse/IAllResponse";
import BaseApi from "../../../../logic/api/modules/base/BaseApi";
import { IRestaurantResponse } from "../../../../logic/api/data/lists/IRestaurantResponse";
import * as utils from "./_utils";
import RestaurantItem from "../../../component/restaurant_item/RestaurantItem";
import ErrorPage, { AvailableTypes } from "../../../component/errorpage/ErrorPage";
import { ISearchResponse } from "../../../../logic/api/data/search/ISearchResponse";
import { Util } from "../../../../utils/util";
import { htmlLayout } from "./_source_layout";


const spacerAttrs: SpacerAttrs[] = [
    {
        color: "red",
        style: "vertical",
        width: 40,
        height: 6
    },
    {
        color: "red",
        style: "horizontal",
        width: 70,
        height: 6
    }
];

// sass: fragments/dashboard.sass";
class DashboardFragment extends Fragment implements ApiCallbacks {

    // view elements.
    private homeHero: HomeHero = null;
    private searchElement: SearchElement;
    private spacerLine: SpacerLine = null;
    private restaurantList: RestaurantList = null;
    private shimmerLoadingView: HTMLElement = null;
    private titleSearchGroup: HTMLElement = null;
    private errorPage: ErrorPage = null;



    private apiRest: BaseApi = null;
    private isTitleSearchOnTop = false;
    private tempTitleSearchOffsetTop = 0;
    private isSearchApiRunning = false;


    onRenderPage(): void {
        this.innerHTML = this.render();
        this.homeHero = this.querySelector("hero-home");
        this.spacerLine = this.querySelector("spacer-line");
        this.searchElement = this.querySelector("search-box");
        this.restaurantList = this.querySelector("restaurant-list");
        this.shimmerLoadingView = this.querySelector(".loading-view");
        this.titleSearchGroup = this.querySelector(".main > .titles");
        this.errorPage = this.querySelector("error-page");

        this.homeHero.render();
        this.restaurantList.onItemClick = (_restItemRef: RestaurantItem, data: IRestaurantItem) => {
            window.location.href = `#/DetailActivity/${data.id}`;
        }
        this.searchElement.searchCallback = (text: string) => {
            this.onSearch(text);
        }
        this.swSpacer("horizontal");

        // generate shimmer loading

        utils.generateShimmerLoading(this.shimmerLoadingView);
        this.defineSpacer();
        this.apiRest = new GetAllRestaurants();
        this.apiRest.callbacks = this;
    }

    onResumed(): void {
        this.apiRest.startLoad();
        this.homeHero.resumeAnim();
    }

    onSaveState(): void {
        this.homeHero.pauseAnim();
    }
    onDestroy(): void {
        this.homeHero.pauseAnim();

    }
    titleFragment(): string {
        return "Home";
    }
    onReceiveMessage(key: GeneralCb, _value: any): void {
        switch (key) {
            case GeneralCb.MESSAGE_ONRESIZE: {
                this.defineSpacer();
            }
                break;
            case GeneralCb.MESSAGE_ONSCROLL: {
                this.checkAndFixedTopSearchTitles();
                this.restaurantList.checkScroll();
            }
        }
    }

    onLoad(): void {
        this.hideShow("loading");
    }

    onFinished(data: IAllResponse): void {

        if (data.isSuccess && data.response.error === false) {

            if (this.isSearchApiRunning) {
                const resp = <ISearchResponse>data.response;
                if (resp.restaurants.length < 1) {
                    this.hideShow("search-unavailable");
                } else {
                    this.hideShow("success");
                    this.renderListRestaurant(resp.restaurants);
                }
            } else {
                this.hideShow("success");
                const resp = <IRestaurantResponse>data.response;
                this.renderListRestaurant(resp.restaurants);
            }
        } else {
            this.hideShow("error-offline");
        }

    }

    private render(): string {
        return htmlLayout;
    }

    private checkAndFixedTopSearchTitles() {
        const titleOffsetTop = this.titleSearchGroup.offsetTop
        const wOffsetTop = window.pageYOffset;

        const sTitleClassList = this.titleSearchGroup.classList;
        if (titleOffsetTop < wOffsetTop && !this.isTitleSearchOnTop) {

            if (!sTitleClassList.contains("fixed-top-titles")) {
                this.isTitleSearchOnTop = true;
                this.tempTitleSearchOffsetTop = this.titleSearchGroup.offsetTop;
                sTitleClassList.add("fixed-top-titles");
            }
        }
        if (this.isTitleSearchOnTop && this.tempTitleSearchOffsetTop > wOffsetTop) {

            sTitleClassList.remove("fixed-top-titles");
            this.isTitleSearchOnTop = false;
        }
    }

    private defineSpacer() {
        if (window.innerWidth <= 700) {
            this.swSpacer("horizontal");
        } else {
            this.swSpacer("vertical");
        }
    }

    private onSearch(text: string) {
        if (text.length < 1) return;
        this.clearApisRunning();

        this.apiRest = new RequestSearch(text);
        this.apiRest.callbacks = this;
        this.isSearchApiRunning = true;
        this.apiRest.startLoad();
    }

    private renderListRestaurant(restaurantItem: IRestaurantItem[]) {
        this.restaurantList.render(restaurantItem);
    }

    private clearApisRunning() {
        if (this.apiRest != null && this.apiRest.isRunning) {
            //remove the current callbacks to prevent updating
            this.apiRest.callbacks = null;
            this.apiRest = null;
        }
    }

    private swSpacer(str: 'horizontal' | 'vertical') {
        switch (str) {
            case "horizontal":
                this.spacerLine.attrs = spacerAttrs[1]
                break;
            case "vertical":
                this.spacerLine.attrs = spacerAttrs[0]
        }
    }

    private hideShow(stateUI: "loading" | "success" | "error-offline" | "search-unavailable") {
        switch (stateUI) {
            case "loading": {
                Util.hide(this.errorPage);
                Util.hide(this.restaurantList);
                Util.show(this.shimmerLoadingView);
                break;
            }
            case "success": {

                Util.hide(this.errorPage);
                Util.show(this.restaurantList);
                Util.hide(this.shimmerLoadingView);
                break;
            }
            case "error-offline": {
                this.errorPage.errorType = AvailableTypes.offline;
                this.errorPage.render();

                Util.show(this.errorPage);
                Util.hide(this.restaurantList);
                Util.hide(this.shimmerLoadingView);
                break;
            }
            case "search-unavailable": {
                this.errorPage.errorType = AvailableTypes.searchNotFound;
                this.errorPage.render();

                Util.show(this.errorPage);
                Util.hide(this.restaurantList);
                Util.hide(this.shimmerLoadingView);
                break;
            }
        }
    }
}

customElements.define("dashboard-fragment", DashboardFragment);
export default DashboardFragment;