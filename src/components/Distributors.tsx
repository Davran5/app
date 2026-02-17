
import { MapPin, Building2, Globe2 } from 'lucide-react';
import DistributorMap from './DistributorMap';

const regions = [
    {
        country: 'Azerbaijan',
        cities: ['Baku']
    },
    {
        country: 'Kazakhstan',
        cities: ['Almaty', 'Nur-Sultan', 'Shymkent']
    },
    {
        country: 'Kyrgyzstan',
        cities: ['Bishkek', 'Osh']
    },
    {
        country: 'Tajikistan & Turkmenistan',
        cities: ['Dushanbe', 'Ashgabat']
    }
];

export default function Distributors() {
    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                <div className="mb-12">
                    <h2 className="font-display text-3xl lg:text-4xl font-medium text-slate-900 mb-4">
                        Our Distributors
                    </h2>
                    <p className="text-slate-600 max-w-2xl text-lg">
                        A strategic network of partners ensuring rapid support and equipment availability across Central Asia and the Caucasus.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 min-h-[600px]">
                    {/* Left Column: Distributor List */}
                    <div className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                            {regions.map((region) => (
                                <div
                                    key={region.country}
                                    className="group bg-slate-50 p-6 rounded-xl border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all duration-300"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-blue-50 transition-colors">
                                            <Globe2 className="w-5 h-5 text-slate-700 group-hover:text-blue-600" />
                                        </div>
                                        <h3 className="font-display font-medium text-slate-900 text-lg group-hover:text-blue-900 transition-colors">
                                            {region.country}
                                        </h3>
                                    </div>

                                    <div className="space-y-3">
                                        {region.cities.map((city) => (
                                            <div key={city} className="flex items-center gap-2 text-slate-600 group-hover:text-slate-800 transition-colors pl-1">
                                                <MapPin className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                                <span className="text-sm font-medium">{city}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {/* HQ Card - Highlighted */}
                            <div className="col-span-full mt-2 bg-slate-900 p-6 rounded-xl border border-slate-800 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-blue-500/20" />

                                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <Building2 className="w-5 h-5 text-blue-400" />
                                            <h3 className="font-display font-medium text-white text-lg">
                                                KRANTAS Headquarters
                                            </h3>
                                        </div>
                                        <p className="text-slate-400 text-sm flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            Tashkent, Uzbekistan
                                        </p>
                                    </div>
                                    <button className="px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors border border-white/5">
                                        View Contacts
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Interactive Map */}
                    <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-50 min-h-[400px] lg:min-h-auto order-first lg:order-last">
                        <DistributorMap />

                        {/* Map Legend Overlay */}
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-slate-200 shadow-sm text-xs space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-700"></div>
                                <span className="text-slate-600 font-medium">Headquarters</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                <span className="text-slate-600 font-medium">Regional Center</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
