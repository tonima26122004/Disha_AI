# Google Maps Setup Instructions

## Getting Started

To use the offline map functionality, you need to set up a Google Maps API key.

### 1. Get a Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. Create credentials (API Key)
5. Restrict the API key to your domain for security

### 2. Set up Environment Variables

Create a `.env` file in the root directory of the project:

```env
REACT_APP_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

### 3. Features Included

- **Interactive Google Maps**: Full Google Maps integration with zoom, pan, and map type controls
- **Offline Map Download**: Download current map area for offline use
- **Map Management**: View, select, and delete downloaded maps
- **Storage Tracking**: Monitor storage usage for downloaded maps
- **Online/Offline Status**: Automatic detection of internet connectivity
- **Emergency Navigation**: Maps work offline during emergencies

### 4. Security Notes

- Never commit your API key to version control
- Use environment variables to store the API key
- Restrict your API key to specific domains/IPs in production
- Monitor your API usage to avoid unexpected charges

### 5. Usage

The offline map feature is available in the Emergency Tools section and includes:

- Download current map area for offline use
- Switch between different downloaded maps
- View storage usage
- Automatic offline mode detection
- Emergency navigation capabilities

## Troubleshooting

If the map doesn't load:
1. Check that your API key is correct
2. Ensure the required APIs are enabled
3. Check browser console for error messages
4. Verify your API key restrictions allow your domain
