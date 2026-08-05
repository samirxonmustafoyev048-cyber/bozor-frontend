function unsplash(photoId: string, width = 600) {
  return `https://images.unsplash.com/photo-${photoId}?w=${width}&q=75&fit=crop&auto=format`;
}

// Curated, hand-verified Unsplash photos used for illustrative (non-product)
// imagery around the site — e.g. the "Biz haqimizda" page.
export const STOCK_PHOTOS = {
  storeAisle: unsplash("1604719312566-8912e9227c6a", 900),
  vegetableBasket: unsplash("1610348725531-843dff563e2c", 700),
  qualityProduce: unsplash("1542838132-92c53300491e", 500),
  fastDelivery: unsplash("1580674285054-bed31e145f59", 500),
  securePayment: unsplash("1556740738-b6a63e27c4df", 500),
  customerService: unsplash("1596524430615-b46475ddff6e", 500),
};
