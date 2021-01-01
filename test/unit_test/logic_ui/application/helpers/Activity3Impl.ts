import BaseActivity from "../../../../../src/scripts/ui/activity/base/BaseActivity";

class Activity3 extends BaseActivity {
        
    onCreated(params: any[]): void {
        super.onCreated(params);

        this.innerHTML = `
            <button id='back'>Prev</button>
        `;
        this.querySelector('#back').addEventListener('click', ()=> {
            this.application.activityBack();
        });
    } 

    // we don't need to implement this abstract function
    // because its handled by mocking.
    onPaused(): void {
        
    }
    onResumed(): void {
        
    }
    onDestroy(): void {
        
    }
    onResizeEvent(event: Event): void {
        
    }
    onScrollEvent(event: Event): void {
        
    }
}
customElements.define('act-three', Activity3)
export default Activity3;