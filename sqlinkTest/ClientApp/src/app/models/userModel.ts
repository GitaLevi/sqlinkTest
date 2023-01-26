
export interface userModel {
    token: string;
    personalDetails: personalDetailsModel;
}

export interface personalDetailsModel {
    id: number;
    name: string;
    team: string;
    joinedAt: Date;
    avatar: string;
}