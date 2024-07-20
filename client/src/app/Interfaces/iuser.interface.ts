export interface IUser {
    _id: string,
    user_name: string,
    user_token: string,
    profile?: IRebrickableProfile
}

export interface IRebrickableProfile {
    user_id?: number,
    username?: string,
    email?: string,
    last_activity?: Date,
    last_ip?: string,
    location?: string,
    rewards?: {
        points?: number,
        level?: number,
        badges?: Array<Number> | any
    },
    lego?: {
        total_sets?: number,
        total_loose_parts?: number,
        total_set_parts?: number,
        lost_set_parts?: number,
        all_parts?: number,
        total_figs?: number
    },
    avatar_img?: string
}