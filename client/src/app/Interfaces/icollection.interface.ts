import { ISet } from "./iset.interface";

export interface ICollection {
    name?: string,
    sets: ISet[],
}
