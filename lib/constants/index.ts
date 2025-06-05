export const APP_NAME = process.env.APP_NAME || "prostore";
export const APP_DESCRIPTION =
  process.env.APP_DESCRIPTION || "An ecomerce store built with Next.Js";
export const SERVER_URL = process.env.APP_URL || "http://localhost:3000";

// export const signInDefaultValues = {
//     email: 'example@example.com',
//     password: 'password'
// }

export const signInDefaultValues = {
  email: "test@gmail.com",
  password: "password",
};
export const signUpDefaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const shippingAddressDefaultValues = {
  fullName: "",
  streetAddress: "",
  city: "",
  postalCode: "",
  country: "",
};

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(", ")
  : ["PayPal", "Stripe", "CashOnDelivery"];

export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || "PayPal";

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 12;

export const productDefaultValues = {
  name: '',
  slug: '',
  category: '',
  images: [],
  brand: '',
  description: '',
  price: '0',
  stock: 0,
  rating: '0',
  numReviews: '0',
  isFeatured: false,
  banner: null
}

export const USER_ROLES = process.env.USER_ROLES ? process.env.USER_ROLES.split(', ') : ['admin', 'user']

export const reviewFormDefaultValues = {
  title: '',
  comment: '',
  rating: 0
}