// const expect = require('chai').expect;
import {expect} from 'chai';
Feature('Like a Restaurant Data');

Before(({I}) => {
    I.amOnPage('/#');
});

// return the restaurant title
const addFavRestoAndBack = async (I: CodeceptJS.I, positionIndex: number) : Promise<string> => {
    if(positionIndex < 1) return;
    const elmClick = locate('.card-item-container').at(positionIndex);
    const restoTitle = await I.grabTextFrom(locate('item-restaurant h1.item-header-title').at(positionIndex));
    I.say(`Let's we add '${restoTitle}' to Favorite and go back to last page`);
    expect(restoTitle).to.not.equal(null)

    I.click(elmClick);

    I.wait(3);
    I.scrollPageToTop();

    I.see(restoTitle, 'h1');
    I.see('favorite_border', 'i.material-icons');

    I.click('favorite_border');
    I.wait(2);
    I.see('favorite', 'i.material-icons');

    I.see('arrow_back');
    I.click('arrow_back');
    return restoTitle;
};

xScenario('Check the Favorite Page is empty when adding no favorites', ({I}) => {
    I.see('Favorite', 'a[href="favorite"]');
    
    I.click('Favorite');

    I.see('Your Favorites', '#main_content2 > h1');

    I.see('No Favorite :(');
    I.click('Home')
});

xScenario('Try to like one favorite and ensure its displayed on favorites page', async ({I}) => {

    I.waitForVisible('restaurant-list');
    I.seeElement('item-restaurant');

    const restoTitle = await addFavRestoAndBack(I, 1);

    I.say(`Let's we see that '${restoTitle}' is displayed in Favorites page`);
    
    //checking...
    I.see('Favorite');
    I.click('Favorite');

    const items = await I.grabNumberOfVisibleElements('item-restaurant');
    expect(items).to.equal(1);
    I.see(restoTitle, locate('item-restaurant h1.item-header-title').at(1));
})

let titleRestaurant: string[] = [];
xScenario('Put exactly 3 item to Favorite and ensure that is added in database', async ({I}) => {
    I.seeElement('item-restaurant');

    const size : number = <number> <unknown> await I.grabNumberOfVisibleElements('restaurant-list > item-restaurant');
    expect(size).to.not.equal(null);
    expect(size).to.not.equal(0);

    for(let x= 0; x < size && x < 3; x++){
        I.waitForVisible('restaurant-list');
        const restoTitle = await addFavRestoAndBack(I, x+1);
        titleRestaurant.push(restoTitle);
    }

    I.say(`Lets we see that all favorite title is displayed on favorite page`);
    I.see('Favorite');
    I.click('Favorite');

    // must be equal with expected 
    const items = await I.grabNumberOfVisibleElements('item-restaurant');
    expect(items).to.equal(titleRestaurant.length);
    I.seeNumberOfVisibleElements('restaurant-list > item-restaurant', titleRestaurant.length);
    
    for(let x = 1; x <= titleRestaurant.length; x++){
        const title = titleRestaurant[x - 1];
        I.say(`\t- Ensure that the title '${title}' is displayed`);
        I.see(titleRestaurant[x - 1], locate('item-restaurant h1.item-header-title').at(x));
    }
});

xScenario('Like one restaurant, and delete it. Ensure that is not displayed in Favorite page', async ({I}) => {
    I.seeElement('item-restaurant');

    const restoTitle = await addFavRestoAndBack(I, 1);

    I.say(`Ensure '${restoTitle}' to be successfully deleted from favorite`);
    I.see('Favorite');
    I.click('Favorite');

    //checking...
    I.see(restoTitle, locate('item-restaurant h1.item-header-title').at(1));
    I.click(locate('favorite-fragment .card-item-container').at(1));

    I.wait(2);
    I.see('favorite', 'i.material-icons');
    I.click('favorite');
    I.see('favorite_border');

    I.click('arrow_back');
    I.see('Favorite');
    I.click('Favorite');

    I.see('No Favorite :(');
});

xScenario('Like exactly 3 restaurant, and delete 2 of them at first and last. Ensure that just one is displayed on favorite page', async ({I}) => {
    
    titleRestaurant = [];
    I.seeElement('item-restaurant');

    const size : number = <number> <unknown> await I.grabNumberOfVisibleElements('restaurant-list > item-restaurant');
    expect(size).to.not.equal(null);
    expect(size).to.not.equal(0);
    for(let x= 0; x < size && x < 3; x++){

        I.waitForVisible('restaurant-list');
        const restoTitle = await addFavRestoAndBack(I, x+1);
        titleRestaurant.push(restoTitle);
    }

    I.say('Ensure all (3) is added to favorite, then delete first and last favorite data');
    expect(titleRestaurant.length).to.equal(3);
    I.see('Favorite');
    I.click('Favorite');

    I.seeNumberOfVisibleElements('favorite-fragment restaurant-list > item-restaurant', 3);

    I.say('\t- Delete first favorite data');
    let l = locate('favorite-fragment .card-item-container').first();
    I.see(titleRestaurant[0], l);
    I.click(l);

    I.wait(2);
    I.see('favorite');
    I.click('favorite');
    I.see('favorite_border');
    
    I.see('arrow_back');
    I.click('arrow_back');

    I.see('Favorite');
    I.click('Favorite');

    I.say('\t- Delete last favorite data');
    l = locate('favorite-fragment .card-item-container').last();
    I.see(titleRestaurant[2], l);
    I.click(l);

    I.wait(2);
    I.see('favorite');
    I.click('favorite');
    I.see('favorite_border');
    
    I.see('arrow_back');
    I.click('arrow_back');

    I.see('Favorite');
    I.click('Favorite');

    I.say('Ensure that the second data (before delete first and last) is displayed');
    I.seeNumberOfVisibleElements('favorite-fragment restaurant-list > item-restaurant', 1);
    I.see(titleRestaurant[1])
    I.dontSee(titleRestaurant[0]);
    I.dontSee(titleRestaurant[2]);
});