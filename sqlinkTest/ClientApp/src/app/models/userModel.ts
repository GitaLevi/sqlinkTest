
export interface userModel {
    token: string;
    personalDetails: personalDetailsModel;
}

export interface personalDetailsModel {
    name: string;
    team: string;
    joinedAt: string;
    avatar: string;
}