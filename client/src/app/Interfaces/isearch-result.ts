import { IMinifigSearchResult } from "./iminifig-search-result";

export interface ISearchResult {
    count: number,
    next?: string,
    previous?: string,
    results?: IMinifigSearchResult[]
}
