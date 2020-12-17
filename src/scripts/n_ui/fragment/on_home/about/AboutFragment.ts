/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import RoundedImages from "../../../component/image/RoundedImages";
import Fragment from "../../base/Fragment";
import "../../../../../styles/n_sass/fragments/about.sass";
import * as utils from "./_utils";
class AboutFragment extends Fragment {

    private roundedImages: RoundedImages = null;
    onRenderPage(): void {
        this.innerHTML = this.render();

        this.roundedImages = this.querySelector("rounded-images");
        this.roundedImages.properties = {
            src: "/images/profile.jpg",
            alt: "Alexzander Purwoko Widiantoro's photo"
        };
        this.roundedImages.render();
        this.implementClickButtons();
    }
    onSaveState(): void {
        
    }
    onDestroy(): void {
        
    }
    titleFragment(): string {
        return "AboutMe";
    }
    onReceiveMessage(_key: string, _value: any): void {
        
    }

    private render() {
        return `
            <div class="container" tabindex="0" id='main_content3'>
                <rounded-images></rounded-images>
                <div class="content-description">
                    <h1>Alexzander Purwoko Widiantoro</h1>
                    <h2>Technology Enthusiasts</h2>
                    <p>Iam a people who highly enthusiastic in IT, learner and have a passion in programming. Since
                    2014, I study more about programming. Now, I hava a skills on Android & Web Development, and have an enthusiasts 
                    on IoT Technologies. Finally, thanks to Dicoding Indonesia that give me some class for upskilling :) 
                    <div class="button-layout">
                        <button>${utils.linkedInSvg}LinkedIn</button>
                        <button>${utils.githubSvg}GitHub</button>
                    </div>
                </div>
                
            </div>
        `;
    }

    private implementClickButtons() {
        const buttonlinkedIn = <HTMLElement> this.querySelector(".button-layout > button:nth-child(1)");
        const buttonGithub = <HTMLElement> this.querySelector(".button-layout > button:nth-child(2)");

        this.implementBtnClick(buttonlinkedIn, "https://www.linkedin.com/in/alexzander-purwoko-w-360932136/");
        this.implementBtnClick(buttonGithub, "https://github.com/AlexzPurewoko");
        
    }

    private implementBtnClick(button: HTMLElement, url: string){
        button.addEventListener("click", () => {
            window.open(url, "_blank");
        })
    }

}

customElements.define("about-fragment", AboutFragment);
export default AboutFragment;