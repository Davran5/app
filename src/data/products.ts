import catalogData from './catalog.generated.json';

export interface Product {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  description: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  specs: Record<string, string | undefined>;
  features: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const categories: Category[] = catalogData.categories;
export const products: Product[] = catalogData.products;
export const featuredProductIds: string[] = catalogData.featuredProductIds;
export const catalogVersion = catalogData.version;

export const historyEvents = [
  { year: 1945, title: 'Foundation', description: 'Founded as a mechanical repair plant for trucks and heavy machinery in Tashkent.', image: '/1945.jpeg' },
  { year: 1966, title: 'Reconstruction & Expansion', description: 'Following the 1966 earthquake, the factory pivoted to support rebuilding efforts and began producing steel structures and lifting equipment for construction.', image: '/1966.jpg' },
  { year: 1990, title: 'Diversification', description: 'Expanded into special-purpose vehicles and truck crane manufacturing.', image: '/products/catalog/dt-dump-truck-16m3.webp' },
  { year: 2000, title: 'Modernization', description: 'Introduced CNC machining and automated welding systems.', image: '/tech_cnc.jpg' },
  { year: 2012, title: 'Brand Launch', description: 'Launched the KRANTAS truck crane brand with full certification.', image: '/products/catalog/le-crane-25t.webp' },
  { year: 2015, title: 'International Growth', description: 'Entered Kazakhstan and Turkmenistan markets with export certification.', image: '/full_cycle.jpeg' },
  { year: 2020, title: 'New Facilities', description: 'Opened new assembly lines and expanded agricultural machinery production.', image: '/products/catalog/am-tractor-n81.webp' },
  { year: 2024, title: 'Future Forward', description: 'Engineering the next generation of reliable industrial vehicles.', image: '/tech_cnc.jpg' },
];

export const teamMembers = [
  { id: 1, name: 'Karimov Akmal', role: 'director', image: '/Karimov.jpeg' },
  { id: 2, name: 'Pulatov Jahongir', role: 'director', image: '/Pulatov.jpeg' },
  { id: 3, name: 'Yunusov Anatoliy', role: 'director', image: '/Yunusov.jpeg' },
  { id: 4, name: 'Petrov Sergey', role: 'deputyDirector', image: '/Konstantinovich.jpeg' },
  { id: 5, name: 'Daniyarov Shukhrat', role: 'director', image: '/Daniyarov.jpeg' },
  { id: 6, name: 'Alimov Nuriddin', role: 'director', image: '/Nuriddin.jpeg' },
];

export const blogPosts = [
  { id: 4, title: 'Presidents of Uzbekistan and Tajikistan Inaugurate TALCO-KRANTAS', excerpt: 'In a significant step for industrial cooperation, the first phase of the TALCO-KRANTAS joint venture was inaugurated.', image: 'https://www.gazeta.uz/media/img/2018/09/xKxTvx15381395349601_l.jpg', date: '2018-09-28', author: 'Anhor.uz' },
  { id: 1, title: 'Prototype of the Qulqon Armored Vehicle', excerpt: 'Testing advanced protection systems under real-world conditions for military and security applications.', image: '/cover_spm.jpg', date: '2024-01-15', author: 'Engineering Team' },
  { id: 2, title: 'New Assembly Line for Agricultural Tractors', excerpt: 'Faster delivery times with stricter quality gates and enhanced production capacity.', image: '/assembly_line.jpeg', date: '2024-01-10', author: 'Production Team' },
  { id: 3, title: 'Export Certification Updates', excerpt: 'Expanding service coverage across Central Asia with new international certifications.', image: '/spec_eng.jpeg', date: '2024-01-05', author: 'Quality Assurance' },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((product) => product.categoryId === categoryId);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((category) => category.id === id);
}
