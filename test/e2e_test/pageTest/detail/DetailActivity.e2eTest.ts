import { expect } from "chai";
import { IDetailRestaurantItem } from "../../../../src/scripts/logic/api/data/detail/IDetailRestaurantItem";
import { IRestaurantDetailResponse } from "../../../../src/scripts/logic/api/data/detail/IRestaurantDetailResponse";
import { endpoint } from "../../../../src/scripts/logic/api/endpoint/endpoint";
import { ImageSize } from "../../../../src/scripts/logic/api/endpoint/ImageSize";

Feature("DetailActivity Page Test");

let restaurant: IDetailRestaurantItem
Before(async ({I}) => {
    const ds: any = await I.sendGetRequest('/detail/rqdv5juczeskfw1e867');
    expect(ds.status).to.equal(200);

    const restaurants : IRestaurantDetailResponse = await ds.data;
    restaurant = restaurants.restaurant;
    restaurant.pictureLocation = endpoint.image(ImageSize.SMALL, restaurant.pictureId);
    I.amOnPage('/#/DetailActivity/rqdv5juczeskfw1e867');
});

xScenario('Header and Footer must match as expected', ({I}) => {
    
    I.see('arrow_back', 'detail-header button.back-activity > i');
    I.see('favorite_border', 'detail-header button.favorite > i');
    I.seeTextEquals('Detail', locate('detail-header > div.logo_brand > h1').first());
    I.seeTextEquals('Resto', locate('detail-header > div.logo_brand > h1').last());
    I.seeTextEquals('Copyright @2020 by APWDevs', 'detail-activity > footer p');

    I.seeCssPropertiesOnElements(locate('detail-header > div.logo_brand > h1').last(), {
        'background-color' : '#d76700',
        'color': 'white'
    });
    
    [
        'detail-header button.back-activity > i', 
        'detail-header button.favorite > i', 
        locate('detail-header > div.logo_brand > h1').first(), 
        'detail-activity > footer p'
    ].forEach((item: CodeceptJS.LocatorOrString) => {
        I.seeCssPropertiesOnElements(item, {
            'color': '#d76700'
        })
    })
});

xScenario('Summary content must display correct information equal to API data', async({I}) => {

    I.wait(2);

    I.say('Detail summary must display correct images, titles, ratings, address and badges');
    I.seeElement(`img[alt="Poster of ${restaurant.name}"]`);
    I.seeAttributesOnElements(`img[alt="Poster of ${restaurant.name}"]`, {'src': restaurant.pictureLocation});

    I.seeTextEquals(restaurant.name, 'detail-summary > div > h1');
    
    I.seeAttributesOnElements('detail-summary rating-component', {'show': 'true','rate': restaurant.rating});
    I.seeNumberOfVisibleElements('detail-summary rating-component > i.material-icons', 5);
    
    I.seeTextEquals(`(${restaurant.rating})`, 'detail-summary .ratings > p');

    // badges category
    const categoryQuery = 'detail-summary list-badge span'
    I.seeNumberOfVisibleElements(categoryQuery, restaurant.categories.length);
    I.seeCssPropertiesOnElements(categoryQuery, {'color': 'white', 'background-color': 'red'});
    for(let i = 0; i < restaurant.categories.length; i++){
        const {name} = restaurant.categories[i];
        I.seeTextEquals(name, locate(categoryQuery).at(i+1))
    }
    
    I.see('location_on', 'detail-summary > div > p > span');
    I.seeTextEquals(`location_on${restaurant.address}, ${restaurant.city}`, 'detail-summary > div > p');
});

xScenario('Section description must show correct information', ({I}) => {
    I.seeTextEquals('Description', '.description h1.title-section');
    I.seeElement('.description > .titles spacer-line');
    I.seeTextEquals(restaurant.description, '.description > .content > p');
});

xScenario('Section menu must display about food and Drinks', ({I}) => {
    I.say('Check on section Food\'s menu');
    I.seeTextEquals('Food Menu\'s', '.menus > .food-menu > h1.title-section');
    I.seeElement('.menus > .food-menu spacer-line');
    const foodMenus = restaurant.menus.foods;
    const foodElmQuery = '.menus > .food-menu > list-badge span';
    I.seeNumberOfVisibleElements(foodElmQuery, foodMenus.length);
    I.seeCssPropertiesOnElements(foodElmQuery, {'color': 'red', 'background-color': 'white', 'border-color': 'red'})
    for(let i = 0; i< foodMenus.length; i++){
        const {name} = foodMenus[i];
        I.seeTextEquals(name, locate(foodElmQuery).at(i+1))
    }

    I.say('Check on section Drink\'s menu');
    I.seeTextEquals('Drink\'s Menu', '.menus > .drink-menu > h1.title-section');
    I.seeElement('.menus > .drink-menu spacer-line');
    const drinkMenus = restaurant.menus.drinks;
    const drinkQuery = '.menus > .drink-menu > list-badge span';
    I.seeNumberOfVisibleElements(drinkQuery, drinkMenus.length);
    I.seeCssPropertiesOnElements(drinkQuery, {'color': 'red', 'background-color': 'white', 'border-color': 'red'})
    for(let i = 0; i< drinkMenus.length; i++){
        const {name} = drinkMenus[i];
        I.seeTextEquals(name, locate(drinkQuery).at(i+1))
    }
});

xScenario('Section All Reviews must display all saved user reviews', ({I}) => {

    I.say('Check \'All Review\' Text');
    I.seeTextEquals('All Reviews', '.reviews > .list-review > h1.title-section');
    I.seeElement('.reviews > .list-review spacer-line');

    I.say('Check all content of review ');
    
    const customerReviews = restaurant.customerReviews;
    I.seeElement('.reviews > .list-review > .list');
    I.seeNumberOfVisibleElements('.reviews > .list-review review-item-consumer', customerReviews.length);
    
    for(let x = 0; x < customerReviews.length; x++){
        I.say(`\t Check on element ${x+1}`);
        const user = locate('.reviews > .list-review review-item-consumer .title-review > h2').at(x+1);
        const dateElm = locate('.reviews > .list-review review-item-consumer .title-review > p').at(x+1);
        const contentReview = locate('.reviews > .list-review review-item-consumer .content-review > p').at(x+1);
        const {name, date, review} = customerReviews[x];
        I.seeTextEquals(name, user);
        I.seeTextEquals(date, dateElm);
        I.seeTextEquals(review, contentReview);
    }
});

xScenario('Ensure that section Add Review Here is displayed correctly', ({I}) => {
    I.wait(2);
    I.scrollPageToBottom();
    I.say('Check \'Add Review Here\' Text');
    I.seeTextEquals('Add Review Here', '.reviews > .add-reviews > h1.title-section');
    I.seeElement('.reviews > .add-reviews spacer-line');


    I.say('Check review box');
    I.see('person_pin', '.add-reviews > compose-review > .compose-container > div:nth-child(1) > span.material-icons')
    I.see('chevron_right', '.add-reviews > compose-review .review-submit > i');

    I.seeElement('.add-reviews > compose-review input[name="username"]');
    I.seeAttributesOnElements('.add-reviews > compose-review input[name="username"]', {'placeholder': 'Name'});


    I.seeElement('.add-reviews > compose-review textarea[name="message"]');
    I.seeAttributesOnElements('.add-reviews > compose-review textarea[name="message"]', {'placeholder': 'Put your review message here...'});

});

xScenario('Test Add Review', ({I}) => {

    let userName: string;
    let userMessage: string;
    ((): void => {
        const randomized100 = Math.floor(Math.random() * 100);
        const users = [
            'Nadia', 'Nanda', 'Ayu', 'Gumelang'
        ];
        const messages = [
            'Masakannya kurang enak', 'Kurang micin!', 'Kurang garam', 'Gile! Aku kepedesan', 'Hambar!'
        ];
        let posUserSelected = Math.floor(randomized100 / 100 * users.length);
        posUserSelected = posUserSelected >= users.length ? users.length - 1 : posUserSelected;
        userName = users[posUserSelected]+''+randomized100;
        userMessage = messages[posUserSelected]; 
    })();
    I.wait(2);
    I.scrollPageToBottom();
    I.scrollPageToBottom();

    I.fillField('.add-reviews > compose-review input[name="username"]', userName);
    I.fillField('.add-reviews > compose-review textarea[name="message"]', userMessage);
    I.click('chevron_right', '.add-reviews > compose-review .review-submit > i');
    I.wait(4);

    // ensure that the element has been generated!
    const user = locate('.reviews > .list-review review-item-consumer .title-review > h2').last();
    const contentReview = locate('.reviews > .list-review review-item-consumer .content-review > p').last();
    
    I.seeTextEquals(userName, user);
    I.seeTextEquals(userMessage, contentReview);
});
