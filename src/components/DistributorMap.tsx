
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

// This pulls a highly optimized, clean vector map of the world
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Exact coordinates for your distributor network
const distributors: { name: string; coordinates: [number, number]; isHQ?: boolean }[] = [
    { name: "Baku", coordinates: [49.8671, 40.4093] },
    { name: "Almaty", coordinates: [76.8512, 43.2220] },
    { name: "Astana", coordinates: [71.4460, 51.1694] },
    { name: "Bishkek", coordinates: [74.5900, 42.8746] },
    { name: "Osh", coordinates: [72.7985, 40.5140] },
    { name: "Tashkent", coordinates: [69.2401, 41.2995], isHQ: true }
];

export default function DistributorMap() {
    return (
        <div className="w-full h-full bg-slate-50 flex items-center justify-center rounded-xl overflow-hidden border border-slate-200">
            <ComposableMap
                projection="geoAzimuthalEqualArea"
                projectionConfig={{
                    rotate: [-65, -45, 0], // Rotates the globe to center on Central Asia
                    scale: 1200 // Zooms in specifically on the region
                }}
                className="w-full h-auto"
            >
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill="#E2E8F0" // Clean corporate slate-grey for the land
                                stroke="#F8FAFC" // Crisp white borders
                                strokeWidth={0.5}
                                style={{
                                    default: { outline: "none" },
                                    hover: { fill: "#CBD5E1", outline: "none" },
                                    pressed: { outline: "none" },
                                }}
                            />
                        ))
                    }
                </Geographies>

                {distributors.map(({ name, coordinates, isHQ }) => (
                    <Marker key={name} coordinates={coordinates}>
                        {/* The pulsing glow effect */}
                        <circle r={8} fill={isHQ ? "#2563EB" : "#3B82F6"} className="animate-ping opacity-75" />
                        {/* The solid center dot */}
                        <circle r={4} fill={isHQ ? "#1D4ED8" : "#2563EB"} />

                        <text
                            textAnchor="middle"
                            y={-12}
                            style={{ fontFamily: "system-ui", fill: "#334155", fontSize: "10px", fontWeight: "600" }}
                        >
                            {name}
                        </text>
                    </Marker>
                ))}
            </ComposableMap>
        </div>
    );
}
