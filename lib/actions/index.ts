"use server"

import { scrapAmazonProduct } from "../scraper";

export const scrapAndStoreProduct = async(url:string)=>{
    if(!url) return;

    try {
        const product = await scrapAmazonProduct(url);
    } catch (error) {
        console.log(error);
    }
}