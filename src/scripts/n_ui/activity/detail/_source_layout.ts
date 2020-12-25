export const htmlLayout: string = `
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