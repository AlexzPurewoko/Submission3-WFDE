// import {expect} from 'chai';
Feature('Main Page test');

Before(({I}) => {
    I.amOnPage('/#');
})

Scenario('Main activity page test header and footer on desktop screen', ({I}) => {
    const bgCheck = (strElement: string, bgColorCss: string): void => {
        I.seeCssPropertiesOnElements(strElement, {'background-color': bgColorCss});
    }
    // check header
    I.say('Header must display as the expected');
    I.seeElement('input[src="/images/icons/restaurant-icon.svg"]');
    I.see('Fav', '.logo_brand_title_1');
    I.see('Resto', '.logo_brand_title_2');
    bgCheck('.logo_brand_title_2', '#d76700');

    I.see('Home', 'home-header nav#nav li > a[href="dashboard"]');
    I.see('Favorite', 'home-header nav#nav li > a[href="favorite"]');
    I.see('About Us', 'home-header nav#nav li > a[href="about"]');

    I.say('Footer must display as the expected');
    I.see('Copyright @ 2020 APWDevs', 'home-footer > div.tab-right > p');
    // check Footer
    I.see('home', 'li a.material-icons.item');
    I.see('favorite', 'li a.material-icons.item');
    I.see('info', 'li a.material-icons.item');

    I.say('Perform click checking...');
    I.say('\t- Navigation footer event click should also trigger header navigation and layouts');
    I.click('home');
    bgCheck('a[data-target="dashboard"]', '#d76700');
    bgCheck('a[href="dashboard"]', '#8c4300');
    I.seeElement('dashboard-fragment');

    I.click('favorite');
    bgCheck('a[data-target="favorite"]', '#d76700');
    bgCheck('a[href="favorite"]', '#8c4300');
    I.seeElement('favorite-fragment');

    I.click('info');
    bgCheck('a[data-target="about"]', '#d76700');
    bgCheck('a[href="about"]', '#8c4300');
    I.seeElement('about-fragment');

    // check header action 
    I.say('\t- Navigation header event click should also trigger footer navigation and layouts');
    I.click('Home');
    bgCheck('a[data-target="dashboard"]', '#d76700');
    bgCheck('a[href="dashboard"]', '#8c4300');
    I.seeElement('dashboard-fragment');

    I.click('Favorite');
    bgCheck('a[data-target="favorite"]', '#d76700');
    bgCheck('a[href="favorite"]', '#8c4300');
    I.seeElement('favorite-fragment');

    I.click('About Us');
    bgCheck('a[data-target="about"]', '#d76700');
    bgCheck('a[href="about"]', '#8c4300');
    I.seeElement('about-fragment');
});

Scenario('Main activity page test header and footer on mobile screen', ({I}) => {
    I.resizeWindow(400, 600);
    const bgCheck = (strElement: string, bgColorCss: string): void => {
        I.seeCssPropertiesOnElements(strElement, {'background-color': bgColorCss});
    }
    // check header
    I.say('Header must display as the expected');
    I.seeElement('input[src="/images/icons/restaurant-icon.svg"]');
    I.see('Fav', '.logo_brand_title_1');
    I.see('Resto', '.logo_brand_title_2');
    bgCheck('.logo_brand_title_2', '#d76700');

    I.dontSee('Home');
    I.dontSee('Favorite');
    I.dontSee('About Us');

    I.dontSee('Copyright @ 2020 APWDevs');

    // check Footer

    I.say('Footer must display as the expected and if clicked can interact as page selectors');
    I.see('home', 'li a.material-icons.item');
    I.see('favorite', 'li a.material-icons.item');
    I.see('info', 'li a.material-icons.item');

    I.click('home');
    bgCheck('a[data-target="dashboard"]', '#d76700');
    I.seeElement('dashboard-fragment');

    I.click('favorite');
    bgCheck('a[data-target="favorite"]', '#d76700');
    I.seeElement('favorite-fragment');

    I.click('info');
    bgCheck('a[data-target="about"]', '#d76700');
    I.seeElement('about-fragment');
});