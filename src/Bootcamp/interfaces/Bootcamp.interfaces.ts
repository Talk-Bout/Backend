import { Review } from "@prisma/client";

export default interface Bootcamp {
    bootcampName: string
    desc: string
    logo: string
    url: string
    review: Array<Review>
    star?: number
    reviewNumber?: number
}