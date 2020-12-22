/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IRestaurantItem } from "../../../../n_logic/api/data/lists/IRestaurantItem";
import HomeHero from "../../../component/hero/HomeHero";
import RestaurantList from "../../../component/restaurant_list/RestaurantList";
import SearchElement from "../../../component/search/SearchElement";
import Fragment, { GeneralCb } from "../../base/Fragment";
import "../../../../../styles/n_sass/fragments/dashboard.sass";
import SpacerLine, { SpacerAttrs } from "../../../component/spacer/SpacerLine";
import GetAllRestaurants from "../../../../n_logic/api/modules/list/GetAllRestaurants";
import RequestSearch from "../../../../n_logic/api/modules/searchResult/RequestSearch";
import ApiCallbacks from "../../../../n_logic/api/modules/base/ApiCallbacks";
import { IAllResponse } from "../../../../n_logic/api/allresponse/IAllResponse";
import BaseApi from "../../../../n_logic/api/modules/base/BaseApi";
import { IRestaurantResponse } from "../../../../n_logic/api/data/lists/IRestaurantResponse";
import * as utils from "./_utils";
import RestaurantItem from "../../../component/restaurant_item/RestaurantItem";
import ErrorPage, { AvailableTypes } from "../../../component/errorpage/ErrorPage";
import { ISearchResponse } from "../../../../n_logic/api/data/search/ISearchResponse";


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

class DashboardFragment extends Fragment implements ApiCallbacks {

    // view elements.
    private homeHero:HomeHero = null;
    private searchElement: SearchElement;
    private spacerLine: SpacerLine = null;
    private restaurantList: RestaurantList = null;
    private shimmerLoadingView: HTMLElement = null;
    private titleSearchGroup: HTMLElement = null;
    private errorPage: ErrorPage = null;



    private apiRest: BaseApi = null;
    private isTitleSearchOnTop  = false;
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
        setTimeout(() => {
            // display initiate page
            this.apiRest = new GetAllRestaurants();
            this.apiRest.callbacks = this;
            this.apiRest.startLoad();

            this.homeHero.resumeAnim();
        }, 2000);
        
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
        switch(key){
            case GeneralCb.MESSAGE_ONRESIZE: {
                this.defineSpacer();
            }
            break;
            case GeneralCb.MESSAGE_ONSCROLL: {
                this.checkAndFixedTopSearchTitles();
            }
        }
    }

    onLoad(): void{
        this.hideShow("loading");
    }

    onFinished(data: IAllResponse): void {

        setTimeout((): void => {
            if(data.isSuccess && data.response.error === false){

                if(this.isSearchApiRunning){
                    const resp = <ISearchResponse> data.response;
                    if(resp.restaurants.length < 1) {
                        this.hideShow("search-unavailable");
                    } else {
                        this.hideShow("success");
                        this.renderListRestaurant(resp.restaurants);
                    }
                } else {
                    this.hideShow("success");
                    const resp = <IRestaurantResponse> data.response;
                    this.renderListRestaurant(resp.restaurants);
                }
            } else {
                this.hideShow("error-offline");
            }
        }, 600);
        
    }

    private render() : string {
        return `
            <section class='hero'>
                <hero-home></hero-home>
            </section>
            <section tabindex="0" class='main' id='main_content1' style="margin: 10px;">
                <div class="titles">
                    <div class="title-search">
                        <h1>Looking for ?</h1>
                    </div>
                    <spacer-line> </spacer-line>
                    <search-box></search-box>
                </div>
                <restaurant-list></restaurant-list>
                <div class="loading-view"></div>
                <error-page></error-page>
            </section>
        `;
    }

    private checkAndFixedTopSearchTitles() {
        const titleOffsetTop = this.titleSearchGroup.offsetTop
        const wOffsetTop = window.pageYOffset;

        const sTitleClassList = this.titleSearchGroup.classList;
        if(titleOffsetTop < wOffsetTop && !this.isTitleSearchOnTop){
            
            if(!sTitleClassList.contains("fixed-top-titles")){
                this.isTitleSearchOnTop = true;
                this.tempTitleSearchOffsetTop = this.titleSearchGroup.offsetTop;
                sTitleClassList.add("fixed-top-titles");
            }
        } 
        if(this.isTitleSearchOnTop && this.tempTitleSearchOffsetTop > wOffsetTop) {

            sTitleClassList.remove("fixed-top-titles");
            this.isTitleSearchOnTop = false;
        }
    }

    private defineSpacer() {
        if(window.innerWidth <= 700) {
            this.swSpacer("horizontal");
        } else {
            this.swSpacer("vertical");
        }
    }

    private onSearch(text: string){
        if(text.length < 1) return;
        this.clearApisRunning();

        this.apiRest = new RequestSearch(text);
        this.apiRest.callbacks = this;
        this.isSearchApiRunning = true;
        this.apiRest.startLoad();
    }

    private renderListRestaurant(restaurantItem: IRestaurantItem[]){
        this.restaurantList.render(restaurantItem);
    } 

    private clearApisRunning() {
        if(this.apiRest != null && this.apiRest.isRunning){
            //remove the current callbacks to prevent updating
            this.apiRest.callbacks = null;
            this.apiRest = null;
        }
    }

    private swSpacer(str: 'horizontal' | 'vertical'){
        switch(str){
            case "horizontal":
                this.spacerLine.attrs = spacerAttrs[1]
                break;
            case "vertical":
                this.spacerLine.attrs = spacerAttrs[0]
        }
    }

    private hideShow(stateUI: "loading" | "success" | "error-offline" | "search-unavailable"){
        switch(stateUI){
            case "loading":{
                $(this.errorPage).hide();
                $(this.restaurantList).hide();
                $(this.shimmerLoadingView).show();
                break;
            }
            case "success":{
                $(this.errorPage).hide();
                $(this.restaurantList).show();
                $(this.shimmerLoadingView).hide();
                break;
            }
            case "error-offline":{
                this.errorPage.errorType = AvailableTypes.offline;
                this.errorPage.render();

                $(this.errorPage).show();
                $(this.restaurantList).hide();
                $(this.shimmerLoadingView).hide();
                break;
            }
            case "search-unavailable":{
                this.errorPage.errorType = AvailableTypes.searchNotFound;
                this.errorPage.render();

                $(this.errorPage).show();
                $(this.restaurantList).hide();
                $(this.shimmerLoadingView).hide();
                break;
            }
        }
    }
}

customElements.define("dashboard-fragment", DashboardFragment);
export default DashboardFragment;