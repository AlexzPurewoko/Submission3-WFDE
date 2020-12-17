/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import Fragment from "./base/Fragment";

class TestFragment extends Fragment {

    onRenderPage(): void {
        this.render();
    }
    onSaveState(): void {
        
    }
    onDestroy(): void {
        
    }
    titleFragment(): string {
        return "TestFragment";
    }

    onReceiveMessage(_key: string, _value: any): void {
        
    }

    private render() {
        this.innerHTML = `
            
        `;
    }

}
customElements.define("test-fragment", TestFragment);
export default TestFragment;