import { AppDispatch, RootState } from "./store";

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

export interface ProductsData {
  products: Product[];
  loading: boolean;
  error: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  totalPrice: number;
}

export interface ProductCardPropType {
  product: Product;
}
export interface SidebarState {
  isSidebarOpen: boolean;
}

export interface SearchState {
  search: string;
  submittedSearch: Array<string>;
}

export interface CartState {
  cart: CartItem[];
}

export interface AsyncThunkConfig {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
}

export interface DataType {
  products: Product[];
}
