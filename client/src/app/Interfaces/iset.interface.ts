export interface ISet {
    id?: number,
    set_num: String,
    name?: String,
    set_name?: String,
    year?: number,
    theme_id?: number,
    num_parts?: number,
    quantity?: number,
    set_img_url?: String,
    set_url?: String,
    last_modified_dt?: Date,
    sets?: ISet[]
}