/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import DetailSummary from "../../component/detail/DetailSummary";
import DetailActivityHeader from "../../component/header/DetailActivityHeader";
import RoundedImages from "../../component/image/RoundedImages";
import BaseActivity from "../base/BaseActivity";
import * as utils from "./_utils";
import "../../../../styles/n_sass/detail/detail-activity.sass"
import ConsumerReview from "../../component/review/ConsumerReview";
import { AddReviewCallback } from "../../../n_utils/callbacks/AddReviewCallback";
import { IPostReview } from "../../../n_logic/api/data/review/IPostReview";
import NavItemCallback from "../../../n_utils/callbacks/NavItemCallback";
import MainObjStore from "../../../n_logic/db/MainObjStore";
import { IDetailRestaurantItem } from "../../../n_logic/api/data/detail/IDetailRestaurantItem";
import ApiCallbacks from "../../../n_logic/api/modules/base/ApiCallbacks";
import { IAllResponse } from "../../../n_logic/api/allresponse/IAllResponse";
import GetRestaurantDetail from "../../../n_logic/api/modules/detail/GetRestaurantDetail";
import { IRestaurantDetailResponse } from "../../../n_logic/api/data/detail/IRestaurantDetailResponse";
import PostReview from "../../../n_logic/api/modules/reviewResult/PostReview";
import { IResultReview } from "../../../n_logic/api/data/review/IResultReview";
import ErrorPage, { AvailableTypes } from "../../component/errorpage/ErrorPage";
import ShimmerLoading from "../../component/loading/ShimmerLoading";

class DetailActivity extends BaseActivity implements ApiCallbacks{

    private _header: DetailActivityHeader = null;
    private _roundedImages: RoundedImages = null;
    private _detailSummary: DetailSummary = null;
    private _reviewList: ConsumerReview = null;
    private _detailDescription: HTMLElement = null;
    private _addReviewLayout: HTMLElement = null;
    private _errorPage: ErrorPage = null
    private _loadingView: ShimmerLoading[] = [];
    private _mainElement: HTMLElement = null;

    private _addReviewCb: AddReviewCallback = (dataContract: IPostReview) => {
        this.addReviewCbImpl(dataContract);
    }

    private _navItemCv: NavItemCallback = (elmRef: HTMLElement, anchorRef: string) => {
        this.navItemCb(anchorRef);
    }

    private _isHeaderSticky = false
    private _isFavorite = false;
    private _reviewPostApi = false;
    private _hasFirstLoad = false;
    private _restaurantData : IDetailRestaurantItem = null;

    private _apiCall: GetRestaurantDetail = null;


    onCreated(params: any[]): void {
        super.onCreated(params);
        this.innerHTML = this.render();
        
        this._header = this.querySelector("detail-header");
        this._roundedImages = this.querySelector("rounded-images");
        this._detailSummary = this.querySelector("detail-summary");
        this._detailDescription = this.querySelector(".description");
        this._reviewList = this.querySelector(".reviews > .list-review");
        this._addReviewLayout = this.querySelector(".add-reviews");
        this._errorPage = this.querySelector("error-page");
        this._mainElement = this.querySelector("main");

        this._loadingView = utils.generateLoadingLayouts(this._mainElement);

        this._header.callback = this._navItemCv;
        this._header.render();

        this._header.isDisabled = true
        if(params[1] !== undefined && params[1] === "fromFavorite"){
            this.loadFromFavorite(params[0]);
        } else {
            this.loadFromApi(params[0]);
        }
        
    }
    onPaused(): void {
        
    }
    onResumed(): void {
        
    }
    onDestroy(): void {

    }
    onResizeEvent(event: Event): void {
        
    }
    onScrollEvent(event: Event): void {
        this.checkAndStickyHeader();
    }

    private render(): string {
        return `
            <header>
                <detail-header></detail-header>
            </header>

            <main>
                <article tabindex="0" class="summary_info">
                    <shimmer-loading></shimmer-loading>
                    <section class="image-poster">
                        <rounded-images></rounded-images>
                    </section>

                    <section class="summary">
                        <detail-summary></detail-summary>
                    </section>
                </article>

                
                <article tabindex="0" class="description">
                    <section class="titles">
                        <h1 class="title-section">Description</h1>
                        <spacer-line class="title-section-line"></spacer-line>
                    </section>

                    <section class="content">
                        <p></p>
                    </section>
                    <shimmer-loading></shimmer-loading>
                </article>

                
                <article tabindex="0" class="menus">
                    <section class="food-menu">
                        <h1 class="title-section">Food Menu's</h1>
                        <spacer-line class="title-section-line"></spacer-line>
                        <list-badge></list-badge>
                        <shimmer-loading></shimmer-loading>
                    </section>

                    <section class="drink-menu">
                        <h1 class="title-section">Drink's Menu</h1>
                        <spacer-line class="title-section-line"></spacer-line>
                        <list-badge></list-badge>
                        <shimmer-loading></shimmer-loading>
                    </section>
                </article>
                

                <article tabindex="0" class="reviews">
                    <section class="list-review">
                        <!-- generates dynamically -->
                        <h1 class="title-section">All Reviews</h1>
                        <spacer-line class="title-section-line"></spacer-line>
                        <div class="list"></div>
                        <shimmer-loading></shimmer-loading>
                    </section>

                    <section tabindex="0" class="add-reviews">
                        <h1 class="title-section">Add Review Here</h1>
                        <spacer-line class="title-section-line"></spacer-line>
                        <compose-review></compose-review>
                        <shimmer-loading></shimmer-loading>
                    </section>
                </article>
            </main>

            <error-page></error-page>

            <footer>
                <p>Copyright @2020 by APWDevs</p>
            </footer>
        `;
    }

    private addReviewCbImpl(dataContract: IPostReview){
        const api = new PostReview(dataContract);
        api.callbacks = this;
        api.startLoad();
        this._reviewPostApi = true;
    }

    onFinished(data: IAllResponse) : void {

        if(!data.isSuccess){
            this._errorPage.errorType = AvailableTypes.offline;
            this._errorPage.render();
            this.composeUI(false);
            return;
        }

        if(this._reviewPostApi){
            const response = <IResultReview> data.response;
            utils.editReviewItems(response, this._reviewList);
        } else {
            const response = <IRestaurantDetailResponse> data.response;
            this._restaurantData = response.restaurant;
            this.composeUI(true);
        }
    }

    onLoad() : void {
        if(!this._hasFirstLoad){
            this.hideShow("loading");
            this._hasFirstLoad = true;
        }
    }

    private loadFromFavorite(id: string) {
        this.onLoad();
        this.database.getByKey(MainObjStore.MAIN_DATABASE, id)
            .then((data: IDetailRestaurantItem) => {
                this._restaurantData = data;
                this._header.isDisabled = false
                
                if(data)
                    this.composeUI(true);
                else {
                    this._errorPage.errorType = AvailableTypes.favDataNotFound;
                    this._errorPage.render();
                    this.composeUI(false);
                }
            })
            .catch((e: any) => {
                console.error(e)
                this._restaurantData = null;
                this.composeUI(false);
            })
    }

    private loadFromApi(id: string) {
        if(this._apiCall ){
            this._apiCall.callbacks = null;
            this._apiCall = null;
        }

        this._apiCall = new GetRestaurantDetail()
        this._apiCall.id = id;
        this._apiCall.callbacks = this;
        this._apiCall.startLoad();

    }

    private composeUI(isSuccess: boolean) {
        setTimeout((): void => {
            if(!isSuccess){
                this.hideShow("errors");
                return;
            }
            this.hideShow("show");
            // init roundedImages
            utils.applyRoundedImages(this._restaurantData, this._roundedImages);
    
            // init detailSummary
            utils.applySummaryDetails(this._restaurantData, this._detailSummary);
    
            // init detailDescription
            utils.applyDescriptionDetails(this._restaurantData, this._detailDescription);
    
            // init menus Section
            utils.generateFoodAndDrinksSection(this._restaurantData, this.querySelector(".menus"));
    
            // init reviews section
            utils.applyListReviews(this._restaurantData, this._reviewList);
    
            // init add reviews section 
            utils.addLayoutComposeReview(this._restaurantData, this._addReviewCb, this._addReviewLayout);
    
            this.checkFavorite(this._restaurantData.id);
        }, 1000);
        
    }

    private hideShow(stateUI: "loading" | "show" | "errors"){
        switch(stateUI){
            case "loading": {
                utils.showHideShimmerLayout(this._loadingView, "show");
                $(this._errorPage).hide();
                break;
            }
            case "show": {
                utils.showHideShimmerLayout(this._loadingView, "hide");
                $(this._errorPage).hide();
                break;
            }

            case "errors": {
                utils.showHideShimmerLayout(this._loadingView, "hide");
                $(this._errorPage).show();
                $(this._mainElement).hide();
            }
        }
    }

    private checkAndStickyHeader() {
        const offTop = window.pageYOffset;
        const header = this._header.parentElement;
        const offTopMin = $(header).height();
        if(offTop > offTopMin && !this._isHeaderSticky){
            header.classList.add("sticky-top");
            this._isHeaderSticky = true;
        } else if(offTop <= offTopMin && this._isHeaderSticky) {
            header.classList.remove("sticky-top");
            this._isHeaderSticky = false;
        }
    }

    private navItemCb(hrefAnchor: string) {
        switch(hrefAnchor){
            case "favorite": {
                this.onFavClick();
                break;
            }
            case "back": {
                // this feature (activityBack()) not available now...
                // soon as posibble
                // this.application.activityBack();

                window.location.hash = "#";
            }
        }
    }

    private onFavClick(){
        this._header.isDisabled = true
        if(this._isFavorite){
            this.database.deleteData(MainObjStore.MAIN_DATABASE, this._restaurantData.id)
                .then((isSuccess) => {
                    if(isSuccess) {
                        this._isFavorite = false
                        this._header.isDisabled = false
                        this.updateFavoriteBtn();
                    }
                })
                .catch((e: any) => {
                    console.error(e);
                    this._header.isDisabled = false
                })
        } else {
            this.database.addData(MainObjStore.MAIN_DATABASE, this._restaurantData)
                .then((isSuccess: boolean) => {
                    if(isSuccess){
                        this._isFavorite = true
                        this._header.isDisabled = false
                        this.updateFavoriteBtn();
                    }
                })
                .catch((e: any) => {
                    console.error(e);
                    this._header.isDisabled = false
                })
        }
    }

    private checkFavorite(keyId: string){
        this._header.isDisabled = true
        this.database.anyData(MainObjStore.MAIN_DATABASE, keyId)
            .then((isFav: boolean) => {
                this._isFavorite = isFav;
                this.updateFavoriteBtn();
                this._header.isDisabled = false
                
            })
            .catch((e: any) => {
                this._isFavorite = false;
                this.updateFavoriteBtn();
                this._header.isDisabled = false
                console.error(e);
            })
    }

    private updateFavoriteBtn() {
        this._header.isFavorite = this._isFavorite;
    }
    
}
customElements.define("detail-activity", DetailActivity);
export default DetailActivity;