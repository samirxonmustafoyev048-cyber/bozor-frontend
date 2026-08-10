// Curated, hand-verified photos used for illustrative (non-product) imagery
// around the site — e.g. the "Biz haqimizda" page.
//
// These are self-hosted under public/photos/ rather than hot-linked from
// images.unsplash.com: that host is not always resolvable from every network
// (browsers report net::ERR_NAME_NOT_RESOLVED and the images silently vanish),
// so serving them from our own origin keeps the pages intact offline too.
// To refresh one, re-download it from Unsplash with the id noted beside it.
function photo(name: string) {
  return `/photos/${name}.jpg`;
}

export const STOCK_PHOTOS = {
  storeAisle: photo("storeAisle"), // unsplash 1604719312566-8912e9227c6a
  vegetableBasket: photo("vegetableBasket"), // unsplash 1610348725531-843dff563e2c
  qualityProduce: photo("qualityProduce"), // unsplash 1542838132-92c53300491e
  fastDelivery: photo("fastDelivery"), // unsplash 1580674285054-bed31e145f59
  securePayment: photo("securePayment"), // unsplash 1556740738-b6a63e27c4df
  customerService: photo("customerService"), // unsplash 1596524430615-b46475ddff6e
  teamMeeting: photo("teamMeeting"), // unsplash 1543269865-cbf427effbad
  teamPortrait: photo("teamPortrait"), // unsplash 1580489944761-15a19d654956
  deliveryTruck: photo("deliveryTruck"), // unsplash 1601584115197-04ecc0da31d7
  treePlanting: photo("treePlanting"), // unsplash 1542601906990-b4d3fb778b09
  mobileCheckout: photo("mobileCheckout"), // unsplash 1556742049-0cfed4f6a45d
  partnershipHandshake: photo("partnershipHandshake"), // unsplash 1521791136064-7986c2920216
  courierBike: photo("courierBike"), // unsplash 1526367790999-0150786686a2
  groceryAisle: photo("groceryAisle"), // unsplash 1580913428023-02c695666d61
};
