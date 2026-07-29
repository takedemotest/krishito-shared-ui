export type ActivityCategory = 'Animals' | 'Health' | 'Inventory' | 'Milk Production';

export interface ActivityItem{
    _id?:string;
    title:string;
    description?:string;
    category:ActivityCategory;
    timestamp?:string;
}
