import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const GoogleMap = ({ 
  center = { lat: 22.5726, lng: 88.3639 }, // Default to Kolkata
  zoom = 10,
  onMapLoad,
  className = "w-full h-96"
}) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const loader = new Loader({
          apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE',
          version: 'weekly',
          libraries: ['geometry', 'places']
        });

        const { Map } = await loader.importLibrary('maps');
        
        const mapInstance = new Map(mapRef.current, {
          center,
          zoom,
          mapTypeId: 'roadmap',
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          fullscreenControl: true,
          mapTypeControl: true,
        });

        setMap(mapInstance);
        setIsLoading(false);
        
        if (onMapLoad) {
          onMapLoad(mapInstance);
        }
      } catch (err) {
        console.error('Error loading Google Maps:', err);
        setError('Failed to load Google Maps. Please check your API key.');
        setIsLoading(false);
      }
    };

    if (mapRef.current) {
      initMap();
    }
  }, [center, zoom, onMapLoad]);

  return (
    <div className={className}>
      {isLoading && (
        <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="flex items-center justify-center h-full bg-red-50 rounded-lg border border-red-200">
          <div className="text-center text-red-600">
            <p className="font-medium">Map Error</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}
      
      <div ref={mapRef} className={`w-full h-full ${isLoading || error ? 'hidden' : 'block'}`} />
    </div>
  );
};

export default GoogleMap;
