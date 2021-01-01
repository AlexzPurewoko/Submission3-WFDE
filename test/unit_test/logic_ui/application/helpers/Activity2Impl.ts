import BaseActivity from "../../../../../src/scripts/ui/activity/base/BaseActivity";

class Activity2 extends BaseActivity {
    
    onCreated(params: any[]): void {
        super.onCreated(params);

        this.innerHTML = `
            <button id='next'>Next</button>
            <button id='back'>Back</button>
        `;
        this.querySelector('#next').addEventListener('click', ()=> {
            window.location.hash = '#/Activity3Impl'
        });
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
customElements.define('act-two', Activity2)
export default Activity2;