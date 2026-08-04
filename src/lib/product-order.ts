import type { Product } from '../data/products';

export function sortProductsByStarred(products: Product[], starredProductIds: string[]) {
  if (starredProductIds.length === 0) {
    return products;
  }

  const starredRanks = new Map(starredProductIds.map((id, index) => [id, index]));

  return [...products].sort((left, right) => {
    const leftRank = starredRanks.get(left.id);
    const rightRank = starredRanks.get(right.id);

    if (leftRank !== undefined && rightRank !== undefined) {
      return leftRank - rightRank;
    }

    if (leftRank !== undefined) {
      return -1;
    }

    if (rightRank !== undefined) {
      return 1;
    }

    return 0;
  });
}
