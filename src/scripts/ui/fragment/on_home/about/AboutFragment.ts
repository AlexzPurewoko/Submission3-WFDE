/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import RoundedImages from "../../../component/image/RoundedImages";
import Fragment from "../../base/Fragment";
import { htmlLayout } from "./_source_layout";

// sass : fragments/about.sass";
class AboutFragment extends Fragment {

    private roundedImages: RoundedImages = null;
    onRenderPage(): void {
        this.innerHTML = this.render();

        this.roundedImages = this.querySelector("rounded-images");
        this.roundedImages.properties = {
            src: "/images/profile.jpg",
            alt: "Alexzander Purwoko Widiantoro's photo",
            srcWebp: "/images/profile.webp",
            useWebp: true
        };
        this.roundedImages.render();
        this.implementClickButtons();
    }

    onResumed(): void {

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
        return htmlLayout;
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