import { DataType } from "../interfaces";

export async function getProducts() {
  const res = await fetch("data/data.json");
  const data: DataType = await res.json();
  return data.products;
}
