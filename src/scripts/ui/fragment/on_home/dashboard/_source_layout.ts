/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 *  
 */

export const htmlLayout = `
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