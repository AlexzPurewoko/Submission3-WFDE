export interface LifecycleCallback {
    onCreated(params: any[]): void
    onPaused(): void
    onResumed(): void
    onDestroy(): void
    onResizeEvent(event: Event): void
    onScrollEvent(event: Event): void
}