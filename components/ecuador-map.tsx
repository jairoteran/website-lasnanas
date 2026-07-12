"use client"

import { useState } from "react"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"

type ShowMarker = {
  city: string
  date: string
  coordinates: [number, number]
  confirmed: boolean
}

type EcuadorMapProps = {
  variant?: "dark" | "light" | "brand"
  showLabels?: boolean
}

const markers: ShowMarker[] = [
  { city: "Lago Agrio", date: "18 Jul", coordinates: [-76.8919, 0.0847], confirmed: true },
  { city: "Ibarra", date: "22 Ago", coordinates: [-78.1223, 0.3517], confirmed: true },
  { city: "Riobamba", date: "29 Ago", coordinates: [-78.6483, -1.6636], confirmed: true },
  { city: "Cuenca", date: "15 Ago", coordinates: [-79.0059, -2.9006], confirmed: true },
  { city: "Loja", date: "Por confirmar", coordinates: [-79.2011, -3.9931], confirmed: false },
]

export function EcuadorMap({ variant = "dark", showLabels = true }: EcuadorMapProps) {
  const [active, setActive] = useState<string | null>(null)
  const isLight = variant === "light"
  const isBrand = variant === "brand"
  const mapFill = isLight ? "#9fd6f4" : "var(--purple)"
  const mapStroke = isLight ? "rgba(255,255,255,0.85)" : isBrand ? "var(--card)" : "var(--background)"
  const markerFill = isLight ? "#171717" : isBrand ? "var(--primary)" : "var(--purple-bright)"
  const markerStroke = isLight ? "#ffffff" : isBrand ? "var(--accent)" : "var(--foreground)"
  const markerAccent = isLight ? "#38a6f2" : isBrand ? "var(--accent)" : "var(--foreground)"

  return (
    <div className="relative mx-auto w-full max-w-[42rem]">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [-78.1, -1.72], scale: 4800 }}
        width={620}
        height={620}
        className="h-auto max-h-[64svh] w-full"
        role="img"
        aria-label="Mapa del Ecuador con las ciudades de la gira de Las Ñañas"
      >
        <Geographies geography="/ecuador-map.json">
          {({ geographies }) =>
            geographies
              .filter((geo) => geo.properties?.shapeName !== "Galápagos")
              .map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: mapFill,
                      stroke: mapStroke,
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                    hover: {
                      fill: mapFill,
                      stroke: mapStroke,
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                    pressed: { fill: mapFill, outline: "none" },
                  }}
                />
              ))
          }
        </Geographies>

        {markers.map(({ city, date, coordinates, confirmed }) => {
          const isActive = active === city
          const label = `${city} · ${date}`
          const tooltipWidth = Math.max(label.length * 6.5 + 20, 90)

          return (
            <Marker
              key={city}
              coordinates={coordinates}
              onMouseEnter={() => setActive(city)}
              onMouseLeave={() => setActive(null)}
            >
              <g className="cursor-pointer">
                {confirmed && !isLight && !isBrand && (
                  <circle
                    r={isActive ? 15 : 10}
                    fill="var(--purple-bright)"
                    opacity={0.25}
                    style={{ transition: "r 0.2s ease" }}
                  />
                )}
                <circle
                  r={isActive ? (isLight || isBrand ? 13 : 6.5) : isLight || isBrand ? 11 : 5}
                  fill={confirmed || isLight || isBrand ? markerFill : "var(--muted-foreground)"}
                  stroke={markerStroke}
                  strokeWidth={isLight || isBrand ? 2 : 1.5}
                  style={{ transition: "r 0.2s ease" }}
                />
                {(isLight || isBrand) && (
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    y={-0.5}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 18,
                      fontWeight: 700,
                      fill: markerAccent,
                      pointerEvents: "none",
                    }}
                  >
                    +
                  </text>
                )}

                {/* Tooltip */}
                <g
                  style={{
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.15s ease",
                    pointerEvents: "none",
                  }}
                >
                  <rect
                    x={-tooltipWidth / 2}
                    y={-40}
                    width={tooltipWidth}
                    height={24}
                    rx={5}
                    fill="var(--popover)"
                    stroke="var(--border)"
                    strokeWidth={1}
                  />
                  <path
                    d="M -5 -16 L 5 -16 L 0 -10 Z"
                    fill="var(--popover)"
                    stroke="var(--border)"
                    strokeWidth={1}
                  />
                  <text
                    textAnchor="middle"
                    y={-24}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 11,
                      fontWeight: 600,
                      fill: "var(--popover-foreground)",
                    }}
                  >
                    {label}
                  </text>
                </g>

                {showLabels && (
                  <text
                    textAnchor="middle"
                    y={18}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 12,
                      fontWeight: 600,
                      fill: "var(--foreground)",
                      opacity: isActive ? 1 : 0.8,
                      pointerEvents: "none",
                    }}
                  >
                    {city}
                  </text>
                )}
              </g>
            </Marker>
          )
        })}
      </ComposableMap>
    </div>
  )
}
