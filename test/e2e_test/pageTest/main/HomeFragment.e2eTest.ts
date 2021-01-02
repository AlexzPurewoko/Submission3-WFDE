import { assert, expect } from "chai";
import { IRestaurantResponse } from "../../../../src/scripts/logic/api/data/lists/IRestaurantResponse";
import { endpoint } from "../../../../src/scripts/logic/api/endpoint/endpoint";
Feature('Page HomeFragment Test');

Before(({I}) => {
    I.amOnPage('/#');
});

const testCheckHeroes = async (allHeros: string[], I: CodeceptJS.I) => {
    for(let i = 0; i < allHeros.length; i++){
        I.say(`Current displayed image must be same as '${allHeros[i]}'`);
        I.seeElement(`#hero-image_${i+1}`);
        const currentImageSrc = await I.grabAttributeFrom(`#hero-image_${i+1}`, 'currentSrc');
        expect(currentImageSrc).to.equal(allHeros[i]);
        I.wait(4);
    }
}

Scenario('All Hero Images must be displayed correctly in desktop size (w: +-1200px)', async ({I}) => {
    const allHeros = [
        'http://localhost:8080/images/heros/hero-image_1-extra.webp',
        'http://localhost:8080/images/heros/hero-image_2-extra.webp',
        'http://localhost:8080/images/heros/hero-image_3-extra.webp',
    ]
    await testCheckHeroes(allHeros, I);
});

Scenario('All Hero Images must be displayed correctly in large tablet size (w: +-650px)', async ({I}) => {
    I.resizeWindow(650, 800);
    const allHeros = [
        'http://localhost:8080/images/heros/hero-image_1-large.webp',
        'http://localhost:8080/images/heros/hero-image_2-large.webp',
        'http://localhost:8080/images/heros/hero-image_3-large.webp',
    ]
    await testCheckHeroes(allHeros, I);
});

Scenario('All Hero Images must be displayed correctly in medium size (w: +-500px)', async ({I}) => {
    I.resizeWindow(500, 800);
    const allHeros = [
        'http://localhost:8080/images/heros/hero-image_1-medium.webp',
        'http://localhost:8080/images/heros/hero-image_2-medium.webp',
        'http://localhost:8080/images/heros/hero-image_3-medium.webp',
    ]
    await testCheckHeroes(allHeros, I);
});

Scenario('All Hero Images must be displayed correctly in mobile size (w: +-400px)', async ({I}) => {
    I.resizeWindow(400, 800);
    const allHeros = [
        'http://localhost:8080/images/heros/hero-image_1-small.webp',
        'http://localhost:8080/images/heros/hero-image_2-small.webp',
        'http://localhost:8080/images/heros/hero-image_3-small.webp',
    ]
    await testCheckHeroes(allHeros, I);
});

Scenario('Hero Text must change correctly', ({I}) => {
    const heroTextArray = [
        {
            title: "Chef",
            sub: "We have a most talented chef in my restaurant's group"
        },
        {
            title: "Food",
            sub: "We serve many of good food beside's you want"
        },
        {
            title: "Ingredients",
            sub: "We selecting many good ingredients for making a taste food"
        },
    ];
    for(let i = 0; i < heroTextArray.length; i++){
        const data = heroTextArray[i];
        I.say('Text Hero must exactly display : ');
        I.say(`\t- Title: '${data.title}'`)
        I.say(`\t- SubTitle: '${data.sub}'`)
        I.seeNumberOfVisibleElements(`#text-hero-${i+1}-h1`, 1);
        I.seeNumberOfVisibleElements(`#text-hero-${i+1}-h2`, 1);

        I.seeTextEquals(data.title, `#text-hero-${i+1}-h1`);
        I.seeTextEquals(data.sub, `#text-hero-${i+1}-h2`);
        I.wait(4);
    }

});

Scenario('Search "Melting Pot" must display its element', ({I}) => {
    I.say('Type \'Melting Pot\' to search field and click chevron right button');
    I.seeElement('dashboard-fragment input#search[type="text"]');
    I.see('chevron_right', 'dashboard-fragment button.submit > i.material-icons');

    I.fillField('input#search[type="text"]', 'Melting Pot');
    I.click('chevron_right');

    I.waitForInvisible('dashboard-fragment div.loading-view');
    
    
    I.say('Matching with expected');
    I.see('Melting Pot', 'dashboard-fragment item-restaurant h1.item-header-title');
    I.seeNumberOfVisibleElements('restaurant-list item-restaurant', 1)
});

Scenario('Should lazy load element when scrolling', async ({I}) => {

    I.scrollPageToTop();
    I.refreshPage();
    I.waitForInvisible('dashboard-fragment div.loading-view');
    I.wait(1);

    I.seeNumberOfElements('item-restaurant', 6);
    I.scrollPageToBottom();
    let incremental = await I.grabNumberOfVisibleElements('item-restaurant');
    expect(incremental).to.equal(12);
});

Scenario('item restaurant must be displayed grid correctly', async({I}) => {
    // pause();
    const gridTest = [
        {
            width: 360,
            desc: 'small',
            expectedGrid: '300px'
        },
        {
            width: 660,
            desc: 'medium',
            expectedGrid: '520px'
        },
        {
            width: 800,
            desc: 'large',
            expectedGrid: '310px 310px'
        },
        {
            width: 1200,
            desc: 'desktop',
            expectedGrid: '310px 310px 310px'
        },
    ];

    I.seeElement('restaurant-list');
    expect(await I.grabCssPropertyFrom('restaurant-list', 'display')).to.equal('grid', 'restaurant-list must have a grid display!');
    
    for (let x= 0; x < gridTest.length; x++){
        const gridTestItem = gridTest[x]; 
        I.say(`Test grid in ${gridTestItem.desc} size (w: ${gridTestItem.width}px)`);
        I.resizeWindow(gridTestItem.width, 800);
        const gridActualTemplate = await I.grabCssPropertyFrom('restaurant-list', 'grid-template-columns');
        expect(gridActualTemplate).to.equal(gridTestItem.expectedGrid, 'Test grid-template-column must match as expected!');
        I.wait(1);
    }
    
})