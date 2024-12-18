import { PriceHistoryItem, Product } from "@/types";


const Notification = {
  WELCOME: 'WELCOME',
  CHANGE_OF_STOCK: 'CHANGE_OF_STOCK',
  LOWEST_PRICE: 'LOWEST_PRICE',
  THRESHOLD_MET: 'THRESHOLD_MET',
}

const THRESHOLD_PERCENTAGE = 40;


function extractNumber(text: string | null): string | null {
  if (!text) return null;
  const match = text.match(/[\d.]+/);
  return match ? match[0] : null;
}

export const extractPrice = (...elements : any)=>{
    for (const element of elements) {
        const priceText = element.text().trim();
    
        if(priceText) {
          const cleanPrice = priceText.replace(/[^\d.]/g, '');
    
          let firstPrice; 
    
          if (cleanPrice) {
            firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0];
          } 
    
          return firstPrice || cleanPrice;
        }
      }
    
      return '';
}

export const extractCurrency = (element : any)=>{
    const currencyText = element.text().trim().slice(0, 1);
  return currencyText ? currencyText : "";
}

export const extractStars = (element: any): string | null => {
  const rawStars = element.first().text().trim();
  return extractNumber(rawStars);
}
export const extractReviewCount = (element: any): string | null => {
  const rawReviewCount = element.text().trim();
  return extractNumber(rawReviewCount);
}

export const extractDescription = ($ : any)=>{
    const selectors = [
        ".a-unordered-list .a-list-item",
        ".a-expander-content p",
      ];
    
      for (const selector of selectors) {
        const elements = $(selector);
        if (elements.length > 0) {
          const textContent = elements
            .map((_: any, element: any) => $(element).text().trim())
            .get()
            .join("\n");
          return textContent;
        }
      }

    return "";
}

export const getHighestPrice = (priceList: PriceHistoryItem[])=> {
    let highestPrice = priceList[0];
  
    for (let i = 0; i < priceList.length; i++) {
      if (priceList[i].price > highestPrice.price) {
        highestPrice = priceList[i];
      }
    }
  
    return highestPrice.price;
  }

  export const getLowestPrice = (priceList: PriceHistoryItem[])=> {
    let lowestPrice = priceList[0];
  
    for (let i = 0; i < priceList.length; i++) {
      if (priceList[i].price < lowestPrice.price) {
        lowestPrice = priceList[i];
      }
    }
  
    return lowestPrice.price;
  }

  export const getAveragePrice = (priceList: PriceHistoryItem[])=> {
    const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
    const averagePrice = sumOfPrices / priceList.length || 0;
  
    return averagePrice;
  }


  export const formatNumber = (num: number = 0) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  export const getEmailNotifType = (
    scrapedProduct: Product,
    currentProduct: Product
  ) => {
    const lowestPrice = getLowestPrice(currentProduct.priceHistory);
  
    if (scrapedProduct.currentPrice < lowestPrice) {
      return Notification.LOWEST_PRICE as keyof typeof Notification;
    }
    if (!scrapedProduct.isOutOfStock && currentProduct.isOutOfStock) {
      return Notification.CHANGE_OF_STOCK as keyof typeof Notification;
    }
    if (scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE) {
      return Notification.THRESHOLD_MET as keyof typeof Notification;
    }
  
    return null;
  };