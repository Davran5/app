import {
  Globe2,
  Images,
  Languages,
  Layers3,
  PackagePlus,
} from 'lucide-react';
import { adminCardClass, adminPrimaryButtonClass, adminSecondaryButtonClass } from './styles';

interface AdminDashboardProps {
  productsCount: number;
  categoriesCount: number;
  overridesCount: number;
  seoCount: number;
  mediaCount: number;
  latestProducts: { id: string; name: string; category: string }[];
  updatedAt: string;
  onOpenProducts: () => void;
  onOpenTranslations: () => void;
  onOpenSeo: () => void;
  onOpenMedia: () => void;
}

export default function AdminDashboard({
  productsCount,
  categoriesCount,
  overridesCount,
  seoCount,
  mediaCount,
  latestProducts,
  updatedAt,
  onOpenProducts,
  onOpenTranslations,
  onOpenSeo,
  onOpenMedia,
}: AdminDashboardProps) {
  const cards = [
    { label: 'Products', value: productsCount.toString(), icon: PackagePlus },
    { label: 'Categories', value: categoriesCount.toString(), icon: Layers3 },
    { label: 'Translation Overrides', value: overridesCount.toString(), icon: Languages },
    { label: 'SEO Pages', value: seoCount.toString(), icon: Globe2 },
    { label: 'Media Files', value: mediaCount.toString(), icon: Images },
  ];

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div key={card.label} className={`${adminCardClass} p-6`}>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">
                  {card.label}
                </p>
                <Icon size={18} className="text-neutral-500" />
              </div>
              <p className="mt-6 text-4xl font-semibold tracking-tight text-black">{card.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className={`${adminCardClass} p-6`}>
          <h2 className="text-lg font-semibold text-black">Actions</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <button onClick={onOpenProducts} className={adminPrimaryButtonClass}>
              <PackagePlus size={16} />
              Manage Products
            </button>
            <button onClick={onOpenTranslations} className={adminSecondaryButtonClass}>
              <Languages size={16} />
              Content
            </button>
            <button onClick={onOpenSeo} className={adminSecondaryButtonClass}>
              <Globe2 size={16} />
              Route SEO
            </button>
            <button onClick={onOpenMedia} className={adminSecondaryButtonClass}>
              <Images size={16} />
              Media Library
            </button>
          </div>
        </div>

        <div className={`${adminCardClass} p-6`}>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-black">Recent Products</h2>
            <p className="text-xs uppercase tracking-[0.12em] text-neutral-500">
              {new Date(updatedAt).toLocaleString()}
            </p>
          </div>

          <div className="mt-4 space-y-3">
            {latestProducts.length > 0 ? (
              latestProducts.map((product) => (
                <div key={product.id} className="rounded-2xl border border-black/10 bg-neutral-50 px-4 py-3">
                  <p className="text-sm font-semibold text-black">{product.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-neutral-500">
                    {product.category}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-black/10 bg-neutral-50 px-4 py-8 text-center text-sm text-neutral-500">
                No products yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
