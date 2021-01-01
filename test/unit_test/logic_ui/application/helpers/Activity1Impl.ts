import BaseActivity from "../../../../../src/scripts/ui/activity/base/BaseActivity";

class Activity1 extends BaseActivity {
    
    onCreated(params: any[]): void {
        super.onCreated(params);

        this.innerHTML = `
            <button id='next'>Next</button>
        `;

        this.querySelector('#next').addEventListener('click', ()=> {
            window.location.hash = '#/Activity2Impl'
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
customElements.define('act-first', Activity1)
export default Activity1;