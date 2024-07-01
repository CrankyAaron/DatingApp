import { Photo } from "./photo"


export interface Member {
    id: number
    age: number
    userName: string
    photoUrl: string
    gender: string
    introduction: string
    lookingFor: string
    interests: string
    city: string
    country: string
    passwordHash: string
    passwordSalt: string
    dateOfBirth: string
    knownAs: string
    created: Date;
    lastActive: Date;
    photos: Photo[]
}


