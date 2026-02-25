import { categories } from "../data/categories";

export const getCategory = (id) => {
  return categories.find(cat => cat.id === id) || categories.find(cat => cat.id === 'other')
}