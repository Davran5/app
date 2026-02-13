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

export const categories: Category[] = [
  {
    id: 'lifting-equipment',
    name: 'Lifting Equipment',
    description: 'Truck cranes and lifting solutions for construction and industrial applications',
    image: '/products/LE Truck-Mounted Crane, 25 t.jpeg'
  },
  {
    id: 'dump-trucks',
    name: 'Dump Trucks',
    description: 'Heavy-duty dump trucks for mining, construction, and material transport',
    image: '/products/DT Dump Truck, 16 m³  20 t.jpeg'
  },
  {
    id: 'special-purpose',
    name: 'Special-Purpose Machinery',
    description: 'Custom-built vehicles for specific industrial and municipal needs',
    image: '/products/SPM Firefighting and Rescue Hydraulic Aerial Platform, 72 m.jpeg'
  },
  {
    id: 'agricultural',
    name: 'Agricultural Machinery',
    description: 'Tractors, harvesters, and farming equipment for modern agriculture',
    image: '/products/AM Universal Tractor NURAFSHON N 81 (4×4, Belarus-based).jpeg'
  },
  {
    id: 'tank-trucks',
    name: 'Tank Trucks',
    description: 'Specialized tankers for fuel, water, and chemical transportation',
    image: '/products/TT Fuel Tank Semi-Trailer (30 m³  33 m³  35 m³  40 m³).jpeg'
  },
  {
    id: 'overhead-gantry',
    name: 'Overhead & Gantry Cranes',
    description: 'Industrial overhead bridge cranes and gantry systems for heavy lifting',
    image: '/products/OG Overhead Bridge Crane.jpg'
  },
  {
    id: 'mining-trucks',
    name: 'Mining Trucks',
    description: 'Heavy-duty rigid and articulated trucks for mining and quarrying operations',
    image: '/products/MT Dump Truck, 20 m³  25 t.jpeg'
  },

];

export const products: Product[] = [
  // Dump Trucks
  {
    id: 'dt-dump-truck-4m3',
    name: 'Dump Truck 4.5 t',
    category: 'Dump Trucks',
    categoryId: 'dump-trucks',
    description: 'Compact dump truck for urban construction and small projects.',
    fullDescription: 'The 4 m³ dump truck is designed for urban construction, landscaping, and small material transport operations. Compact size allows operation in confined spaces.',
    image: '/products/DT Dump Truck, 4 m³  4.5 t.jpeg',
    gallery: ['/products/DT Dump Truck, 4 m³  4.5 t.jpeg'],
    specs: { model: 'KDT-4.5', loadCapacity: '4.5 tons', tankVolume: '4 m³', wheelFormula: '4x2', drive: 'Diesel', environmentalClass: 'Euro 5' },
    features: ['Compact design', 'Urban friendly', 'Easy maneuverability', 'Efficient operation', 'Low maintenance']
  },
  {
    id: 'dt-dump-truck-8m3',
    name: 'Dump Truck 10 t',
    category: 'Dump Trucks',
    categoryId: 'dump-trucks',
    description: 'Medium-duty dump truck for construction and municipal services.',
    fullDescription: 'The 8 m³ dump truck offers balanced capacity and maneuverability for municipal services, road maintenance, and medium construction projects.',
    image: '/products/DT Dump Truck, 8 m³  10 t.jpeg',
    gallery: ['/products/DT Dump Truck, 8 m³  10 t.jpeg'],
    specs: { model: 'KDT-10', loadCapacity: '10 tons', tankVolume: '8 m³', wheelFormula: '4x2', drive: 'Diesel', environmentalClass: 'Euro 5' },
    features: ['Medium capacity', 'Versatile use', 'Reliable performance', 'Fuel efficient', 'Construction ready']
  },
  {
    id: 'dt-dump-truck-16m3',
    name: 'Dump Truck 20 t',
    category: 'Dump Trucks',
    categoryId: 'dump-trucks',
    description: 'Heavy-duty dump truck for construction and mining operations.',
    fullDescription: 'The 16 m³ dump truck is designed for heavy construction, mining, and large-scale material transport with robust construction and high payload capacity.',
    image: '/products/DT Dump Truck, 16 m³  20 t.jpeg',
    gallery: ['/products/DT Dump Truck, 16 m³  20 t.jpeg'],
    specs: { model: 'KDT-20', loadCapacity: '20 tons', tankVolume: '16 m³', wheelFormula: '6x4', drive: 'Diesel', environmentalClass: 'Euro 5' },
    features: ['High capacity', 'Heavy-duty chassis', 'Mining ready', 'Reinforced body', 'Durable construction']
  },
  {
    id: 'mt-mining-truck-25t',
    name: 'MT Mining Truck 25 t',
    category: 'Mining Trucks',
    categoryId: 'mining-trucks',
    description: 'Specialized mining truck for heavy-duty quarrying and extraction.',
    fullDescription: 'The MT Mining truck is specifically engineered for rigid off-road mining environments, delivering maximum payload capacity for quarrying and excavation operations with exceptional chassis durability.',
    image: '/products/MT Dump Truck, 20 m³  25 t.jpeg',
    gallery: ['/products/MT Dump Truck, 20 m³  25 t.jpeg'],
    specs: { model: 'KMT-25', loadCapacity: '25 tons', tankVolume: '20 m³', wheelFormula: '6x4', drive: 'Diesel', environmentalClass: 'Euro 5' },
    features: ['Reinforced mining chassis', 'Heavy quarry duty', 'Off-road optimized', 'Powerful drivetrain', 'Industrial safety focus']
  },
  {
    id: 'dt-tipper-semi-trailer',
    name: 'Tipper Semi-Trailer 24-26 m³',
    category: 'Dump Trucks',
    categoryId: 'dump-trucks',
    description: 'Large capacity tipper semi-trailer for bulk material transport.',
    fullDescription: 'The tipper semi-trailer provides maximum payload capacity for long-distance bulk material transport with hydraulic tipping system.',
    image: '/products/DT Tipper Semi-Trailer (24 m³  26 m³).jpeg',
    gallery: ['/products/DT Tipper Semi-Trailer (24 m³  26 m³).jpeg'],
    specs: { model: 'KTS-26', tankVolume: '24-26 m³', axles: '3-axle', drive: 'Semi-trailer', tippingSystem: 'Hydraulic' },
    features: ['Large volume', 'Long distance', 'Hydraulic tipping', 'High efficiency', 'Bulk transport']
  },

  // Lifting Equipment
  {
    id: 'le-crane-7t',
    name: 'Truck-Mounted Knuckle Boom Crane 7 t',
    category: 'Lifting Equipment',
    categoryId: 'lifting-equipment',
    description: 'Compact knuckle boom crane for loading and material handling.',
    fullDescription: 'The 7-ton knuckle boom crane features articulated hydraulic arm for precise material handling and truck loading operations.',
    image: '/products/LE Truck-Mounted Knuckle Boom Crane, 7 t.jpeg',
    gallery: ['/products/LE Truck-Mounted Knuckle Boom Crane, 7 t.jpeg'],
    specs: { model: 'KLC-7', liftingCapacity: '7 tons', craneType: 'Knuckle Boom', drive: 'Hydraulic', reach: 'Up to 15m' },
    features: ['Knuckle boom', 'Hydraulic control', 'Precise positioning', 'Truck mounted', 'Versatile operation']
  },
  {
    id: 'le-crane-10-15t',
    name: 'Truck-Mounted Knuckle Boom Crane 10-15 t',
    category: 'Lifting Equipment',
    categoryId: 'lifting-equipment',
    description: 'Medium-duty knuckle boom crane for construction and logistics.',
    fullDescription: 'The 10-15 ton knuckle boom crane provides excellent reach and lifting capacity for construction and logistics applications.',
    image: '/products/LE Truck-Mounted Knuckle Boom Crane, 10–15 t.jpeg',
    gallery: ['/products/LE Truck-Mounted Knuckle Boom Crane, 10–15 t.jpeg'],
    specs: { model: 'KLC-15', liftingCapacity: '10-15 tons', craneType: 'Knuckle Boom', drive: 'Hydraulic', reach: 'Up to 20m' },
    features: ['Medium capacity', 'Extended reach', 'Construction ready', 'Logistics capable', 'Reliable performance']
  },
  {
    id: 'le-crane-16t',
    name: 'Truck-Mounted Crane 16 t',
    category: 'Lifting Equipment',
    categoryId: 'lifting-equipment',
    description: 'Mobile truck crane for construction lifting operations.',
    fullDescription: 'The 16-ton truck crane combines mobility with substantial lifting capacity for construction and industrial applications.',
    image: '/products/LE Truck-Mounted Crane, 16 t.jpeg',
    gallery: ['/products/LE Truck-Mounted Crane, 16 t.jpeg'],
    specs: { model: 'KTC-16', liftingCapacity: '16 tons', craneType: 'Telescopic Boom', liftingHeight: '30m', outriggers: 'Hydraulic' },
    features: ['Mobile crane', 'Telescopic boom', 'Hydraulic outriggers', 'Construction grade', 'High stability']
  },
  {
    id: 'le-crane-25t',
    name: 'Truck-Mounted Crane 25 t',
    category: 'Lifting Equipment',
    categoryId: 'lifting-equipment',
    description: 'Heavy-duty truck crane for large construction projects.',
    fullDescription: 'The 25-ton truck crane delivers powerful lifting capacity with excellent reach for large construction and industrial projects.',
    image: '/products/LE Truck-Mounted Crane, 25 t.jpeg',
    gallery: ['/products/LE Truck-Mounted Crane, 25 t.jpeg', '/products/LE Truck-Mounted Crane, 25 t 2.jpeg'],
    specs: { model: 'KTC-25', liftingCapacity: '25 tons', craneType: 'Telescopic Boom', liftingHeight: '35m', outriggers: 'Hydraulic' },
    features: ['Heavy lift', 'Long boom', 'Large projects', 'Professional grade', 'Maximum stability']
  },
  {
    id: 'le-crane-32t',
    name: 'Truck-Mounted Crane 32 t',
    category: 'Lifting Equipment',
    categoryId: 'lifting-equipment',
    description: 'Extra-heavy truck crane for major industrial operations.',
    fullDescription: 'The 32-ton truck crane provides exceptional lifting capacity for major industrial installations and infrastructure projects.',
    image: '/products/LE Truck-Mounted Crane, 32 t.jpeg',
    gallery: ['/products/LE Truck-Mounted Crane, 32 t.jpeg'],
    specs: { model: 'KTC-32', liftingCapacity: '32 tons', craneType: 'Telescopic Boom', liftingHeight: '40m', outriggers: 'Hydraulic' },
    features: ['Extra capacity', 'Industrial grade', 'Extended height', 'Heavy projects', 'Superior stability']
  },
  {
    id: 'le-crane-50t',
    name: 'Truck-Mounted Crane 50 t',
    category: 'Lifting Equipment',
    categoryId: 'lifting-equipment',
    description: 'Maximum capacity truck crane for heavy industrial lifting.',
    fullDescription: 'The 50-ton truck crane represents our most powerful mobile crane for the heaviest industrial and infrastructure projects.',
    image: '/products/LE Truck-Mounted Crane, 50 t.jpeg',
    gallery: ['/products/LE Truck-Mounted Crane, 50 t.jpeg'],
    specs: { model: 'KTC-50', liftingCapacity: '50 tons', craneType: 'Telescopic Boom', liftingHeight: '48m', outriggers: 'Hydraulic' },
    features: ['Maximum capacity', 'Heavy industrial', 'Long reach', 'Infrastructure ready', 'Professional operation']
  },
  {
    id: 'le-all-terrain-crane',
    name: 'All-Terrain Truck-Mounted Crane',
    category: 'Lifting Equipment',
    categoryId: 'lifting-equipment',
    description: 'All-terrain crane with off-road semi-trailer for remote sites.',
    fullDescription: 'The all-terrain truck-mounted crane features off-road capability with specialized semi-trailer for operation in challenging terrain.',
    image: '/products/LE All-Terrain Truck-Mounted Crane with Off-Road Semi-Trailer.jpeg',
    gallery: ['/products/LE All-Terrain Truck-Mounted Crane with Off-Road Semi-Trailer.jpeg'],
    specs: { model: 'KATC-AT', craneType: 'All-Terrain', wheelFormula: '6x6', drive: 'All-wheel', terrain: 'Off-road capable' },
    features: ['All-terrain', 'Off-road capable', 'Semi-trailer', 'Remote sites', 'High mobility']
  },
  {
    id: 'le-earth-auger',
    name: 'Truck-Mounted Earth Auger Ø 350mm',
    category: 'Lifting Equipment',
    categoryId: 'lifting-equipment',
    description: 'Truck-mounted drilling auger for foundation and pole installation.',
    fullDescription: 'The truck-mounted earth auger provides efficient drilling for foundation piles, utility poles, and fence installation with Ø 350mm capacity.',
    image: '/products/LE Truck-Mounted Earth Auger  Drilling Diameter Ø 350 mm.jpeg',
    gallery: ['/products/LE Truck-Mounted Earth Auger  Drilling Diameter Ø 350 mm.jpeg', '/products/LE Truck-Mounted Earth Auger  Drilling Diameter Ø 350 mm 2.jpeg'],
    specs: { model: 'KEA-350', drillingDiameter: 'Ø 350mm', drillingDepth: 'Up to 3m', drive: 'Hydraulic', mounting: 'Truck-mounted' },
    features: ['Earth drilling', 'Foundation work', 'Pole installation', 'Hydraulic power', 'Efficient operation']
  },
  {
    id: 'le-aerial-platform-18m',
    name: 'Aerial Work Platform 18 m',
    category: 'Lifting Equipment',
    categoryId: 'lifting-equipment',
    description: 'Truck-mounted aerial platform for utility and maintenance work.',
    fullDescription: 'The 18-meter aerial work platform provides safe elevated access for utility maintenance, building work, and tree trimming operations.',
    image: '/products/LE Aerial Work Platform Truck, 18 m.jpeg',
    gallery: ['/products/LE Aerial Work Platform Truck, 18 m.jpeg'],
    specs: { model: 'KAP-18', platformHeight: '18m', platformCapacity: '250 kg', drive: 'Hydraulic', stabilization: 'Outriggers' },
    features: ['18m reach', 'Safe platform', 'Utility work', 'Maintenance ready', 'Stable operation']
  },
  {
    id: 'le-aerial-platform-28m',
    name: 'Aerial Work Platform 28 m',
    category: 'Lifting Equipment',
    categoryId: 'lifting-equipment',
    description: 'Extended reach aerial platform for high-rise maintenance.',
    fullDescription: 'The 28-meter aerial work platform provides extended reach for high-rise building maintenance, telecommunications, and electrical work.',
    image: '/products/LE Aerial Work Platform Truck, 28 m.jpeg',
    gallery: ['/products/LE Aerial Work Platform Truck, 28 m.jpeg'],
    specs: { model: 'KAP-28', platformHeight: '28m', platformCapacity: '250 kg', drive: 'Hydraulic', stabilization: 'Outriggers' },
    features: ['28m reach', 'High-rise work', 'Telecoms ready', 'Electrical work', 'Extended height']
  },
  {
    id: 'le-aerial-platform-36m',
    name: 'Aerial Work Platform 36 m',
    category: 'Lifting Equipment',
    categoryId: 'lifting-equipment',
    description: 'Maximum height aerial platform for specialized applications.',
    fullDescription: 'The 36-meter aerial work platform delivers maximum working height for specialized maintenance, construction, and industrial applications.',
    image: '/products/LE Aerial Work Platform Truck, 36 m.jpeg',
    gallery: ['/products/LE Aerial Work Platform Truck, 36 m.jpeg'],
    specs: { model: 'KAP-36', platformHeight: '36m', platformCapacity: '200 kg', drive: 'Hydraulic', stabilization: 'Heavy outriggers' },
    features: ['36m maximum', 'Specialized work', 'Industrial grade', 'Professional use', 'Superior reach']
  },
  {
    id: 'le-crane-container-3.2t',
    name: 'Truck-Mounted Crane 3.2 t',
    category: 'Lifting Equipment',
    categoryId: 'lifting-equipment',
    description: 'Truck crane with container platform for self-loading.',
    fullDescription: 'The 3.2-ton truck crane with container platform enables efficient self-loading and transport of containers and heavy goods.',
    image: '/products/LE Truck-Mounted Crane with Container Platform, 3.2 t.jpg',
    gallery: ['/products/LE Truck-Mounted Crane with Container Platform, 3.2 t.jpg'],
    specs: { liftingCapacity: '3.2 tons', platform: 'Container type', drive: 'Hydraulic' },
    features: ['Self-loading', 'Container transport', 'Efficient', 'Versatile', 'Compact']
  },

  // Tank Trucks
  {
    id: 'tt-water-tanker-4-6m3',
    name: 'Water Tanker 4-6 m³',
    category: 'Tank Trucks',
    categoryId: 'tank-trucks',
    description: 'Compact water tanker for drinking and technical water transport.',
    fullDescription: 'The 4-6 m³ water tanker provides potable and technical water transport for municipal services, construction sites, and rural areas.',
    image: '/products/TT Water Tanker for Drinking and Technical Water – 4 m³  5 m³  6 m³.jpeg',
    gallery: ['/products/TT Water Tanker for Drinking and Technical Water – 4 m³  5 m³  6 m³.jpeg'],
    specs: { model: 'KWT-6', tankVolume: '4-6 m³', material: 'Food-grade steel', pumping: 'Included', certification: 'Drinking water' },
    features: ['Food-grade', 'Compact size', 'Potable water', 'Municipal use', 'Rural service']
  },
  {
    id: 'tt-water-tanker-allterrain',
    name: 'Water Tanker All-Terrain 10-12 m³',
    category: 'Tank Trucks',
    categoryId: 'tank-trucks',
    description: 'All-terrain water tanker for off-road water delivery.',
    fullDescription: 'The all-terrain water tanker with 10-12 m³ capacity features off-road capability for remote site water delivery and construction support.',
    image: '/products/TT Water Tanker for Drinking and Technical Water (All-Terrain) – 10 m³  12 m³.jpeg',
    gallery: ['/products/TT Water Tanker for Drinking and Technical Water (All-Terrain) – 10 m³  12 m³.jpeg'],
    specs: { model: 'KWT-AT12', tankVolume: '10-12 m³', wheelFormula: '6x6', drive: 'All-terrain', material: 'Food-grade steel' },
    features: ['All-terrain', 'Off-road capable', 'Remote delivery', 'Construction support', 'Large capacity']
  },
  {
    id: 'tt-acid-tanker-8-14m3',
    name: 'Acid Tanker Truck 8-14 m³',
    category: 'Tank Trucks',
    categoryId: 'tank-trucks',
    description: 'Specialized acid tanker for chemical transport.',
    fullDescription: 'The acid tanker truck with 8-14 m³ capacity features corrosion-resistant construction for safe transport of acids and corrosive chemicals.',
    image: '/products/TT Acid Tanker Truck – 8 m³  10 m³  12 m³  14 m³.jpeg',
    gallery: ['/products/TT Acid Tanker Truck – 8 m³  10 m³  12 m³  14 m³.jpeg'],
    specs: { model: 'KAT-14', tankVolume: '8-14 m³', material: 'Acid-resistant', lining: 'Rubber/PTFE', certification: 'ADR' },
    features: ['Acid resistant', 'Chemical transport', 'Safety features', 'ADR compliant', 'Corrosion proof']
  },
  {
    id: 'tt-acid-semi-trailer',
    name: 'Acid Tank Semi-Trailer 14-20 m³',
    category: 'Tank Trucks',
    categoryId: 'tank-trucks',
    description: 'Large capacity acid tank semi-trailer for industrial chemicals.',
    fullDescription: 'The acid tank semi-trailer provides 14-20 m³ capacity for large-scale industrial chemical transport with full safety systems.',
    image: '/products/TT Acid Tank Semi-Trailer (14 m³  16 m³  20 m³).jpeg',
    gallery: ['/products/TT Acid Tank Semi-Trailer (14 m³  16 m³  20 m³).jpeg'],
    specs: { model: 'KATS-20', tankVolume: '14-20 m³', axles: '3-axle', material: 'Acid-resistant', certification: 'ADR/UN' },
    features: ['Large capacity', 'Semi-trailer', 'Industrial chemicals', 'Safety systems', 'Long distance']
  },
  {
    id: 'tt-fuel-semi-trailer',
    name: 'Fuel Tank Semi-Trailer 30-40 m³',
    category: 'Tank Trucks',
    categoryId: 'tank-trucks',
    description: 'High-capacity fuel tank semi-trailer for petroleum distribution.',
    fullDescription: 'The fuel tank semi-trailer delivers 30-40 m³ capacity for large-scale petroleum product distribution with multiple compartments.',
    image: '/products/TT Fuel Tank Semi-Trailer (30 m³  33 m³  35 m³  40 m³).jpeg',
    gallery: ['/products/TT Fuel Tank Semi-Trailer (30 m³  33 m³  35 m³  40 m³).jpeg'],
    specs: { model: 'KFTS-40', tankVolume: '30-40 m³', compartments: 'Multi-compartment', axles: '3-axle', certification: 'ADR' },
    features: ['Maximum capacity', 'Multi-compartment', 'Petroleum distribution', 'Long haul', 'Efficient delivery']
  },
  {
    id: 'tt-fuel-tanker-4-6m3',
    name: 'Fuel Tanker ATZ 4-6 m³',
    category: 'Tank Trucks',
    categoryId: 'tank-trucks',
    description: 'Fuel tanker and refueling truck for local distribution.',
    fullDescription: 'Compact fuel tanker and refueller designed for efficient local fuel distribution and on-site refueling.',
    image: '/products/TT Fuel Tanker & Refueling Truck ATZ – 4 m³  5 m³  6 m³.jpg',
    gallery: ['/products/TT Fuel Tanker & Refueling Truck ATZ – 4 m³  5 m³  6 m³.jpg'],
    specs: { model: 'ATZ-6', tankVolume: '4-6 m³', material: 'Steel', application: 'Refueling' },
    features: ['Fuel distribution', 'Refueling', 'Compact', 'Efficient', 'Local use']
  },
  {
    id: 'tt-trailer-refueller-2-4m3',
    name: 'Trailer Refueller 2-4 m³',
    category: 'Tank Trucks',
    categoryId: 'tank-trucks',
    description: 'Trailer-mounted fuel refueller for flexible deployment.',
    fullDescription: 'Trailer-mounted fuel refueller providing flexible and mobile refueling capabilities for construction sites and remote areas.',
    image: '/products/TT Trailer-Mounted Fuel Refueller ATZ (2 m³  3 m³  4 m³).jpg',
    gallery: ['/products/TT Trailer-Mounted Fuel Refueller ATZ (2 m³  3 m³  4 m³).jpg'],
    specs: { model: 'TR-4', tankVolume: '2-4 m³', chassis: 'Trailer', application: 'Mobile Refueling' },
    features: ['Mobile refueling', 'Trailer-mounted', 'Flexible', 'Construction sites', 'Remote areas']
  },
  {
    id: 'tt-fuel-tanker-8-12m3',
    name: 'Fuel Tanker ATZ 8-12 m³',
    category: 'Tank Trucks',
    categoryId: 'tank-trucks',
    description: 'Medium capacity fuel tanker for regional distribution.',
    fullDescription: 'Medium capacity fuel tanker designed for efficient regional fuel distribution and on-site refueling operations with 8-12 m³ capacity.',
    image: '/products/TT Fuel Tanker & Refueling Truck ATZ – 8 m³  10 m³  12 m³.jpg',
    gallery: ['/products/TT Fuel Tanker & Refueling Truck ATZ – 8 m³  10 m³  12 m³.jpg'],
    specs: { model: 'ATZ-12', tankVolume: '8-12 m³', material: 'Steel', application: 'Fuel Distribution' },
    features: ['Medium capacity', 'Regional distribution', 'Refueling capable', 'Efficient', 'Versatile']
  },
  {
    id: 'tt-fuel-tanker-16-18m3',
    name: 'Fuel Tanker ATZ 16-18 m³',
    category: 'Tank Trucks',
    categoryId: 'tank-trucks',
    description: 'Large capacity fuel tanker for commercial distribution.',
    fullDescription: 'Large capacity fuel tanker with 16-18 m³ volume for commercial fuel distribution and large-scale refueling operations.',
    image: '/products/TT Fuel Tanker & Refueling Truck ATZ – 16 m³  18 m³.jpg',
    gallery: ['/products/TT Fuel Tanker & Refueling Truck ATZ – 16 m³  18 m³.jpg'],
    specs: { model: 'ATZ-18', tankVolume: '16-18 m³', material: 'Steel', application: 'Commercial Distribution' },
    features: ['Large capacity', 'Commercial grade', 'High volume', 'Distribution ready', 'Professional']
  },
  {
    id: 'tt-fuel-tanker-20-25m3',
    name: 'Fuel Tanker ATZ 20-25 m³',
    category: 'Tank Trucks',
    categoryId: 'tank-trucks',
    description: 'Extra-large fuel tanker for industrial operations.',
    fullDescription: 'Extra-large capacity fuel tanker with 20-25 m³ volume for industrial fuel distribution and large-scale commercial operations.',
    image: '/products/TT Fuel Tanker & Refueling Truck ATZ – 20 m³  25 m³.jpg',
    gallery: ['/products/TT Fuel Tanker & Refueling Truck ATZ – 20 m³  25 m³.jpg'],
    specs: { model: 'ATZ-25', tankVolume: '20-25 m³', material: 'Steel', application: 'Industrial Distribution' },
    features: ['Extra-large capacity', 'Industrial grade', 'Maximum volume', 'Heavy-duty', 'High efficiency']
  },

  // Special-Purpose Machinery
  {
    id: 'spm-vacuum-sweeper',
    name: 'Vacuum Sweeper Truck',
    category: 'Special-Purpose Machinery',
    categoryId: 'special-purpose',
    description: 'Municipal vacuum sweeper for street cleaning.',
    fullDescription: 'The vacuum sweeper truck provides efficient mechanical and vacuum sweeping for municipal street cleaning with dust suppression.',
    image: '/products/SPM Vacuum Sweeper Truck.jpeg',
    gallery: ['/products/SPM Vacuum Sweeper Truck.jpeg'],
    specs: { model: 'KVS-Municipal', sweepingWidth: '2.5m', hopperVolume: '6 m³', vacuumSystem: 'Included', waterTank: '1000L' },
    features: ['Vacuum sweeping', 'Dust suppression', 'Municipal grade', 'Large hopper', 'Efficient cleaning']
  },
  {
    id: 'spm-firefighting-platform',
    name: 'Firefighting Hydraulic Aerial Platform 72 m',
    category: 'Special-Purpose Machinery',
    categoryId: 'special-purpose',
    description: 'High-rise firefighting and rescue platform.',
    fullDescription: 'The 72-meter firefighting hydraulic aerial platform provides firefighting and rescue capabilities for high-rise buildings and industrial facilities.',
    image: '/products/SPM Firefighting and Rescue Hydraulic Aerial Platform, 72 m.jpeg',
    gallery: ['/products/SPM Firefighting and Rescue Hydraulic Aerial Platform, 72 m.jpeg'],
    specs: { model: 'KFF-72', platformHeight: '72m', waterCapacity: '2000L', pumpCapacity: '3000 L/min', reach: 'Up to 65m' },
    features: ['72m height', 'Firefighting', 'Rescue capable', 'Water cannon', 'High-rise ready']
  },
  {
    id: 'spm-firefighting-platform-52-55m',
    name: 'Firefighting Hydraulic Aerial Platform 52-55 m',
    category: 'Special-Purpose Machinery',
    categoryId: 'special-purpose',
    description: 'Mid-rise firefighting and rescue platform truck.',
    fullDescription: 'The 52-55 meter firefighting hydraulic aerial platform truck provides firefighting and rescue capabilities for mid-rise buildings and industrial facilities.',
    image: '/products/SPM Firefighting and Rescue Hydraulic Aerial Platform Truck (52–55 m).jpg',
    gallery: ['/products/SPM Firefighting and Rescue Hydraulic Aerial Platform Truck (52–55 m).jpg'],
    specs: { model: 'KFF-55', platformHeight: '52-55m', waterCapacity: '1800L', pumpCapacity: '2500 L/min', reach: 'Up to 50m' },
    features: ['52-55m height', 'Firefighting', 'Rescue platform', 'Water system', 'Mid-rise capable']
  },
  {
    id: 'spm-mobile-workshop',
    name: 'Mobile Vehicle Repair Workshop (MVRW)',
    category: 'Special-Purpose Machinery',
    categoryId: 'special-purpose',
    description: 'Fully equipped mobile workshop for field maintenance.',
    fullDescription: 'The mobile vehicle repair workshop provides complete on-site maintenance and repair capabilities with tools, equipment, and spare parts storage.',
    image: '/products/SPM Mobile Vehicle Repair Workshop (MVRW).jpeg',
    gallery: ['/products/SPM Mobile Vehicle Repair Workshop (MVRW).jpeg'],
    specs: { model: 'KMVRW', equipment: 'Full workshop', power: 'Generator 15kW', tools: 'Complete set', storage: 'Organized compartments' },
    features: ['Mobile workshop', 'Complete tools', 'On-site repair', 'Power generation', 'Field ready']
  },
  {
    id: 'spm-drilling-rig-urb50',
    name: 'URB-50 Drilling Rig (8×8)',
    category: 'Special-Purpose Machinery',
    categoryId: 'special-purpose',
    description: 'All-terrain drilling rig for exploration and well drilling.',
    fullDescription: 'The URB-50 drilling rig on 8×8 all-terrain chassis provides powerful drilling capability for exploration, water wells, and geotechnical applications.',
    image: '/products/SPM URB-50 Drilling Rig on All-Terrain Chassis (8×8).jpeg',
    gallery: ['/products/SPM URB-50 Drilling Rig on All-Terrain Chassis (8×8).jpeg'],
    specs: { model: 'URB-50', wheelFormula: '8x8', drillingDepth: 'Up to 500m', drive: 'All-wheel', terrain: 'All-terrain' },
    features: ['Deep drilling', '8x8 chassis', 'All-terrain', 'Exploration ready', 'Water wells']
  },
  {
    id: 'spm-drilling-rig-zif',
    name: 'ZIF Drilling Rig',
    category: 'Special-Purpose Machinery',
    categoryId: 'special-purpose',
    description: 'Specialized drilling rig for industrial applications.',
    fullDescription: 'The ZIF drilling rig provides specialized drilling capability for industrial, construction, and geotechnical applications.',
    image: '/products/SPM ZIF Drilling Rig.jpeg',
    gallery: ['/products/SPM ZIF Drilling Rig.jpeg'],
    specs: { model: 'ZIF', drillingDepth: 'Up to 300m', applications: 'Industrial/Construction', drive: 'Hydraulic' },
    features: ['Industrial drilling', 'Construction use', 'Geotechnical', 'Hydraulic power', 'Versatile operation']
  },
  {
    id: 'spm-dnp-pump-installation',
    name: 'DNP Pump Installation System',
    category: 'Special-Purpose Machinery',
    categoryId: 'special-purpose',
    description: 'Installation system for lowering pumps into wells.',
    fullDescription: 'The DNP installation system provides safe and efficient installation and removal of pumps in deep wells for oil, water, and industrial applications.',
    image: '/products/SPM DNP (Installation for Lowering Pumps into Wells).jpeg',
    gallery: ['/products/SPM DNP (Installation for Lowering Pumps into Wells).jpeg'],
    specs: { model: 'DNP', pumpDepth: 'Up to 2000m', liftingCapacity: '5 tons', applications: 'Oil/Water wells', drive: 'Hydraulic' },
    features: ['Pump installation', 'Deep wells', 'Oil/Water', 'Safe operation', 'Industrial grade']
  },
  {
    id: 'spm-admin-convoy',
    name: 'Administrative Convoy Vehicle',
    category: 'Special-Purpose Machinery',
    categoryId: 'special-purpose',
    description: 'Special-purpose vehicle for administrative convoy transport.',
    fullDescription: 'Designed for safe and comfortable transport of administrative personnel and convoy operations.',
    image: '/products/SPM Administrative Convoy Special-Purpose Vehicle.jpg',
    gallery: ['/products/SPM Administrative Convoy Special-Purpose Vehicle.jpg'],
    specs: { application: 'Administrative', seating: 'Multi-passenger', comfort: 'High' },
    features: ['Convoy transport', 'Administrative', 'Safe', 'Comfortable', 'Special purpose']
  },
  {
    id: 'spm-firefighting-ladder',
    name: 'Firefighting Aerial Ladder',
    category: 'Special-Purpose Machinery',
    categoryId: 'special-purpose',
    description: 'Firefighting vehicle with aerial ladder and rescue platform.',
    fullDescription: 'Equipped with an aerial ladder and rescue platform, this vehicle ensures effective high-angle firefighting and rescue operations.',
    image: '/products/SPM Firefighting Vehicle with Aerial Ladder  Rescue Platform.jpg',
    gallery: ['/products/SPM Firefighting Vehicle with Aerial Ladder  Rescue Platform.jpg'],
    specs: { application: 'Firefighting', equipment: 'Aerial ladder', rescue: 'Platform included' },
    features: ['Firefighting', 'Aerial ladder', 'Rescue platform', 'High angle', 'Effective']
  },
  {
    id: 'spm-patrol-pickup',
    name: 'Patrol Pickup (PPS)',
    category: 'Special-Purpose Machinery',
    categoryId: 'special-purpose',
    description: 'Patrol and guard service pickup for security operations.',
    fullDescription: 'Rugged pickup truck configured for patrol and guard services, offering mobility and reliability for security tasks.',
    image: '/products/SPM Patrol and Guard Service Pickup (PPS).jpg',
    gallery: ['/products/SPM Patrol and Guard Service Pickup (PPS).jpg'],
    specs: { chassis: 'Pickup', drive: '4x4', application: 'Patrol/Guard' },
    features: ['Patrol', 'Guard service', 'Security', 'Mobility', 'Reliability']
  },

  // Agricultural Machinery
  {
    id: 'am-grain-harvester',
    name: 'Grain Combine Harvester (Self-Propelled)',
    category: 'Agricultural Machinery',
    categoryId: 'agricultural',
    description: 'Self-propelled combine harvester for efficient grain collection.',
    fullDescription: 'The grain combine harvester provides efficient harvesting of wheat, barley, corn, and other grain crops with advanced threshing and minimal loss.',
    image: '/products/AM Grain Combine Harvester (Self-Propelled).jpeg',
    gallery: ['/products/AM Grain Combine Harvester (Self-Propelled).jpeg'],
    specs: { model: 'KCH-SP', grainTank: '8000L', headerWidth: '6.5m', drive: 'Self-propelled', threshing: 'Advanced system' },
    features: ['Self-propelled', 'Large grain tank', 'Wide header', 'Low loss', 'Efficient harvesting']
  },
  {
    id: 'am-tractor-n81',
    name: 'Universal Tractor NURAFSHON N 81 (4×4)',
    category: 'Agricultural Machinery',
    categoryId: 'agricultural',
    description: '4×4 utility tractor based on Belarus platform for versatile farming.',
    fullDescription: 'The NURAFSHON N 81 universal tractor features 4×4 drive on Belarus platform for farming, municipal, and transport operations requiring enhanced traction.',
    image: '/products/AM Universal Tractor NURAFSHON N 81 (4×4, Belarus-based).jpeg',
    gallery: ['/products/AM Universal Tractor NURAFSHON N 81 (4×4, Belarus-based).jpeg'],
    specs: { model: 'N-81 4x4', platform: 'Belarus MTZ', wheelFormula: '4x4', power: '81 HP', drive: 'Mechanical' },
    features: ['4x4 drive', 'Belarus-based', 'Universal use', 'PTO included', 'Reliable platform']
  },
  {
    id: 'am-tractor-earth-auger',
    name: 'Tractor Equipped with Earth Auger',
    category: 'Agricultural Machinery',
    categoryId: 'agricultural',
    description: 'Tractor with mounted earth auger for agricultural drilling.',
    fullDescription: 'The tractor equipped with earth auger provides efficient drilling for fence posts, tree planting, and agricultural foundation work.',
    image: '/products/AM Tractor Equipped with Earth Auger.jpeg',
    gallery: ['/products/AM Tractor Equipped with Earth Auger.jpeg'],
    specs: { model: 'N-Auger', augerType: 'PTO-driven', drillingDiameter: 'Variable', applications: 'Fence/Trees', drive: 'Tractor PTO' },
    features: ['PTO-driven auger', 'Fence installation', 'Tree planting', 'Agricultural use', 'Versatile drilling']
  },
  {
    id: 'am-tractor-n81c',
    name: 'Universal Tractor N 81 C',
    category: 'Agricultural Machinery',
    categoryId: 'agricultural',
    description: 'Universal tractor NURAFSHON N 81 C based on Belarus platform.',
    fullDescription: 'The NURAFSHON N 81 C is a specialized variation of the universal tractor, offering reliable performance for agricultural tasks.',
    image: '/products/AM Universal Tractor NURAFSHON N 81 C (Belarus-based).jpg',
    gallery: ['/products/AM Universal Tractor NURAFSHON N 81 C (Belarus-based).jpg'],
    specs: { model: 'N-81 C', platform: 'Belarus MTZ', power: '81 HP', drive: 'Mechanical' },
    features: ['Universal tractor', 'Belarus-based', 'Reliable', 'Agricultural', 'Specialized']
  },

  // Overhead & Gantry Cranes
  {
    id: 'og-overhead-bridge',
    name: 'Overhead Bridge Crane',
    category: 'Overhead & Gantry Cranes',
    categoryId: 'overhead-gantry',
    description: 'Heavy-duty overhead bridge crane for industrial facilities.',
    fullDescription: 'Industrial overhead bridge crane system designed for heavy lifting operations in factories, warehouses, and manufacturing facilities with precise load control.',
    image: '/products/OG Overhead Bridge Crane.jpg',
    gallery: ['/products/OG Overhead Bridge Crane.jpg'],
    specs: { liftingCapacity: 'Up to 50 tons', span: 'Custom', liftingHeight: 'Custom', control: 'Electric' },
    features: ['Heavy-duty', 'Precise control', 'Industrial grade', 'Custom span', 'Electric operation']
  },
  {
    id: 'og-magnet-grab',
    name: 'Magnet & Grab Crane',
    category: 'Overhead & Gantry Cranes',
    categoryId: 'overhead-gantry',
    description: 'Specialized crane with magnet and grab attachments.',
    fullDescription: 'Overhead crane equipped with electromagnetic and mechanical grab systems for handling scrap metal, bulk materials, and specialized cargo.',
    image: '/products/OG Magnet & Grab Crane.jpg',
    gallery: ['/products/OG Magnet & Grab Crane.jpg'],
    specs: { liftingCapacity: 'Up to 32 tons', grabType: 'Electromagnetic/Mechanical', control: 'Electric', applications: 'Scrap/Bulk' },
    features: ['Magnet system', 'Grab attachment', 'Scrap handling', 'Bulk materials', 'Versatile operation']
  },
  {
    id: 'og-container-overhead',
    name: 'Container Overhead Cranes',
    category: 'Overhead & Gantry Cranes',
    categoryId: 'overhead-gantry',
    description: 'Specialized overhead cranes for container handling.',
    fullDescription: 'Heavy-duty overhead crane system designed specifically for efficient container handling in ports, terminals, and logistics facilities.',
    image: '/products/OG Container Overhead Cranes.jpg',
    gallery: ['/products/OG Container Overhead Cranes.jpg'],
    specs: { liftingCapacity: 'Up to 65 tons', containerSize: '20ft/40ft', span: 'Custom', control: 'Automated' },
    features: ['Container handling', 'Port operations', 'High capacity', 'Automated control', 'Logistics ready']
  },
  {
    id: 'og-single-girder-gantry',
    name: 'Single-Girder Gantry Crane',
    category: 'Overhead & Gantry Cranes',
    categoryId: 'overhead-gantry',
    description: 'Mobile single-girder gantry crane for outdoor operations.',
    fullDescription: 'Single-girder gantry crane with mobile design for outdoor material handling, construction sites, and storage yards with flexible positioning.',
    image: '/products/OG Single-Girder Gantry Crane.jpg',
    gallery: ['/products/OG Single-Girder Gantry Crane.jpg'],
    specs: { liftingCapacity: 'Up to 20 tons', span: '10-35m', liftingHeight: '6-18m', mobility: 'Rail-mounted' },
    features: ['Single-girder', 'Mobile design', 'Outdoor capable', 'Flexible span', 'Rail-mounted']
  },
  {
    id: 'og-truss-gantry',
    name: 'Truss Gantry Crane',
    category: 'Overhead & Gantry Cranes',
    categoryId: 'overhead-gantry',
    description: 'Heavy-duty truss gantry crane for large-scale operations.',
    fullDescription: 'Robust truss gantry crane with reinforced structure for heavy-duty lifting in shipyards, construction sites, and industrial facilities.',
    image: '/products/OG Truss Gantry Crane.jpg',
    gallery: ['/products/OG Truss Gantry Crane.jpg'],
    specs: { liftingCapacity: 'Up to 100 tons', span: '20-50m', structure: 'Truss design', applications: 'Shipyard/Industrial' },
    features: ['Truss structure', 'Heavy-duty', 'Large span', 'Shipyard grade', 'Industrial operations']
  }
];

export const historyEvents = [
  { year: 1945, title: 'Foundation', description: 'Founded as a mechanical repair plant for trucks and heavy machinery in Tashkent.', image: '/about_factory.jpg' },
  { year: 1963, title: 'Expansion', description: 'Began producing steel structures and lifting equipment for construction.', image: '/product_crane.jpg' },
  { year: 1990, title: 'Diversification', description: 'Expanded into special-purpose vehicles and truck crane manufacturing.', image: '/products/DT Dump Truck, 16 m³  20 t.jpeg' },
  { year: 2000, title: 'Modernization', description: 'Introduced CNC machining and automated welding systems.', image: '/tech_cnc.jpg' },
  { year: 2012, title: 'Brand Launch', description: 'Launched the KRANTAS truck crane brand with full certification.', image: '/products/LE Truck-Mounted Crane, 25 t.jpeg' },
  { year: 2015, title: 'International Growth', description: 'Entered Kazakhstan and Turkmenistan markets with export certification.', image: '/production_aerial.jpg' },
  { year: 2020, title: 'New Facilities', description: 'Opened new assembly lines and expanded agricultural machinery production.', image: '/products/AM Universal Tractor NURAFSHON N 81 (4×4, Belarus-based).jpeg' },
  { year: 2024, title: 'Future Forward', description: 'Engineering the next generation of reliable industrial vehicles.', image: '/tech_cnc.jpg' }
];

export const teamMembers = [
  { id: 1, name: 'Akmal Karimov', role: 'director', image: '/Karimov.jpeg' },
  { id: 2, name: 'Pulatov Jahongir', role: 'director', image: '/Pulatov.jpeg' },
  { id: 3, name: 'Anatoliy Yunusov', role: 'director', image: '/Yunusov.jpeg' },
  { id: 4, name: 'Petrov Sergey Konstantinovich', role: 'deputyDirector', image: '/Konstantinovich.jpeg' },
  { id: 5, name: 'Daniyarov Shukhrat', role: 'director', image: '/Daniyarov.jpeg' },
  { id: 6, name: 'Nuriddin', role: 'director', image: '/Nuriddin.jpeg' }
];

export const blogPosts = [
  { id: 1, title: 'Prototype of the Qulqon Armored Vehicle', excerpt: 'Testing advanced protection systems under real-world conditions for military and security applications.', image: '/blog_armored.jpg', date: '2024-01-15', author: 'Engineering Team' },
  { id: 2, title: 'New Assembly Line for Agricultural Tractors', excerpt: 'Faster delivery times with stricter quality gates and enhanced production capacity.', image: '/blog_line.jpg', date: '2024-01-10', author: 'Production Team' },
  { id: 3, title: 'Export Certification Updates', excerpt: 'Expanding service coverage across Central Asia with new international certifications.', image: '/blog_cert.jpg', date: '2024-01-05', author: 'Quality Assurance' }
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(p => p.categoryId === categoryId);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id);
}
