import {expect} from 'chai';
Feature('About Fragment Test Page');

Before(({I}) => {
    I.amOnPage('/#');
    I.see('About Us');
    I.click('About Us');
});

Scenario('Page must match as expected', async ({I}) => {
    I.see('Alexzander Purwoko Widiantoro', 'about-fragment .content-description > h1');
    I.see('Technology Enthusiasts', 'about-fragment .content-description > h2');

    // description is just test visible 
    I.seeElement('about-fragment .content-description > p');
    const text = await I.grabTextFrom('about-fragment .content-description > p');
    expect(text).to.not.be.undefined;
    expect(text).to.not.be.null;

    I.seeNumberOfVisibleElements('about-fragment .button-layout > button', 2);
    
    // check displayed images
    I.seeElement('img[alt="Alexzander Purwoko Widiantoro\'s photo"]');
});