export interface IRestaurantItem {
    readonly id: string;
    readonly name: string;
    readonly rating: number;
    readonly pictureId: string;
    readonly city: string;
    readonly description: string;
    pictureLocation?: string;
}