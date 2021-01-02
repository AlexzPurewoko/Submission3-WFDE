/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 *  
 */

import { Util } from "../../../utils/util";

class HomeHero extends HTMLElement {

    private isAnimStopped = true;
    private listImage: HTMLElement[] = [];
    private listText: HTMLElement[] = [];
    private currentIndex = 0;
    private currentTextIndex = 0;
    private timerIdInterval: any;


    pauseAnim(): void {
        this.isAnimStopped = true;
        clearInterval(this.timerIdInterval);
    }

    resumeAnim(): void {
        if (this.isAnimStopped) {
            this.isAnimStopped = false
            this.anim();
        }
    }

    render(): void {
        this.innerHTML = `

            <div class="hero__container">
                <picture> 
                    <source media="(max-width: 400px)" srcset="/images/heros/hero-image_1-small.webp">
                    <source media="(max-width: 559px)" srcset="/images/heros/hero-image_1-medium.webp">
                    <source media="(max-width: 669px)" srcset="/images/heros/hero-image_1-large.webp">
                    <source media="(min-width: 700px)" srcset="/images/heros/hero-image_1-extra.webp">
                    <img 
                        id='hero-image_1'
                        class='hero__img' 
                        src='/images/heros/hero-image_1-extra.webp' 
                        alt='Our master chef image'></img>
                </picture>
                <picture> 
                    <source media="(max-width: 400px)" srcset="/images/heros/hero-image_2-small.webp">
                    <source media="(max-width: 559px)" srcset="/images/heros/hero-image_2-medium.webp">
                    <source media="(max-width: 669px)" srcset="/images/heros/hero-image_2-large.webp">
                    <source media="(min-width: 700px)" srcset="/images/heros/hero-image_2-extra.webp">
                    <img 
                        id='hero-image_2'
                        style='display: none;'
                        class='lazyload hero__img transparent' 
                        src='/images/heros/hero-image_2-extra.webp' 
                        alt='A menu image'></img>
                </picture>
                <picture> 
                    <source media="(max-width: 400px)" srcset="/images/heros/hero-image_3-small.webp">
                    <source media="(max-width: 559px)" srcset="/images/heros/hero-image_3-medium.webp">
                    <source media="(max-width: 669px)" srcset="/images/heros/hero-image_3-large.webp">
                    <source media="(min-width: 700px)" srcset="/images/heros/hero-image_3-extra.webp">
                    <img 
                        id='hero-image_3'
                        style='display: none;'
                        class='lazyload hero__img transparent' 
                        src='/images/heros/hero-image_3-extra.webp' 
                        alt='Ingredients image'></img>
                </picture>
                <div 
                    class='hero__text' 
                    id='explain__text_hero'>
                    <article id='text-hero_1'>
                        <h1 id="text-hero-1-h1" tabIndex="0" class='text_container_1'>Chef</p>
                        <h2 id="text-hero-1-h2" tabIndex="0" class='text_container_2'>We have a most talented chef in my restaurant's group</p>
                    </article>
                    <article id='text-hero_2' style="display: none;">
                        <h1 id="text-hero-2-h1" tabIndex="0" class='text_container_1'>Food</p>
                        <h2 id="text-hero-2-h2" tabIndex="0" class='text_container_2'>We serve many of good food beside's you want</p>
                    </article>
                    <article id='text-hero_3' style="display: none;">
                        <h1 id="text-hero-3-h1" tabIndex="0" class='text_container_1' >Ingredients</p>
                        <h2 id="text-hero-3-h2" tabIndex="0" class='text_container_2'>We selecting many good ingredients for making a taste food</p>
                    </article>
                </div>
            </div>
        `;
        this.listImage = [
            this.querySelector("#hero-image_1"),
            this.querySelector("#hero-image_2"),
            this.querySelector("#hero-image_3")
        ];

        this.listText = [
            this.querySelector("#text-hero_1"),
            this.querySelector("#text-hero_2"),
            this.querySelector("#text-hero_3")
        ]
    }

    private anim() {
        if (this.isAnimStopped) return;

        this.timerIdInterval = setInterval(() => {
            if (this.isAnimStopped) return;
            Util.slideUp(this.listImage[this.currentIndex++]);

            if (this.currentIndex >= this.listImage.length) this.currentIndex = 0;
            Util.slideDown(this.listImage[this.currentIndex]);
            Util.fadeOut(this.listText[this.currentTextIndex++], 300, () => {
                if (this.currentTextIndex >= this.listText.length) this.currentTextIndex = 0;
                Util.fadeIn(this.listText[this.currentTextIndex], 300)
            })
        }, 5000);
    }
}
customElements.define("hero-home", HomeHero);
export default HomeHero;