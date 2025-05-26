"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

// Props interface for the Map component
interface MapProps {
  position: [number, number]; // Latitude and longitude coordinates
  cityName?: string;         // Optional city name for the popup
}

// Map component that displays a location using OpenStreetMap
export default function Map({ position, cityName }: MapProps) {
  // Custom marker icon configuration
  const customIcon = new Icon({
    iconUrl: "/icons/marker.svg",
    iconSize: [32, 32],      // Size of the icon in pixels
    iconAnchor: [16, 32],    // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -32],   // Point from which the popup should open relative to the iconAnchor
  });

  return (
    <MapContainer
      center={position}
      zoom={13}              // Initial zoom level
      scrollWheelZoom={false} // Disable zoom on scroll for better UX
      style={{ height: "100%", width: "100%" }}
    >
      {/* Base map layer from OpenStreetMap */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Location marker with popup */}
      <Marker position={position} icon={customIcon}>
        <Popup>{cityName}</Popup>
      </Marker>
    </MapContainer>
  );
} 