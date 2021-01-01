import Fragment, { GeneralCb } from "../../../../../src/scripts/ui/fragment/base/Fragment";

class TestFragment extends Fragment {

    onRenderPage(): void {
        
    }
    onResumed(): void {
        
    }
    onSaveState(): void {
        
    }
    onDestroy(): void {
        
    }
    titleFragment(): string {
        return 'test'
    }
    onReceiveMessage(key: GeneralCb, value: any): void {
        
    }

}

customElements.define('test-fragment', TestFragment);
export default TestFragment;