# Disha AI - Disaster Awareness & Risk Guidance Platform

A comprehensive multilingual web application for disaster awareness, risk assessment, and emergency coordination. Built with React, Tailwind CSS, and modern web technologies.

## 🌟 Features

### For Citizens/Tourists
- **Real-time Alerts**: Live disaster warnings and safety updates
- **AI Assistant**: RAG-powered chatbot for disaster safety guidance
- **Risk Assessment**: Visual risk level indicators and trend analysis
- **Emergency Tools**: One-tap SOS, SMS alerts, location services
- **Helpline Directory**: Quick access to emergency contact numbers
- **Offline Support**: Cached emergency guides and maps

### For Authorities/Rescue Teams
- **Alert Management**: Publish and manage disaster alerts
- **Rescue Coordination**: Track affected areas and coordinate response
- **User Tracking**: Monitor citizen safety status and locations
- **Analytics Dashboard**: Risk trends, prediction models, and insights
- **Emergency Response**: Real-time coordination tools

### Global Features
- **Multilingual Support**: English and Bengali (extensible)
- **Role-based Access**: Citizen and Authority dashboards
- **Responsive Design**: Mobile-first, works on all devices
- **PWA Ready**: Offline capabilities and app-like experience
- **Real-time Updates**: Live data and notifications

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd disha_ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── citizen/           # Citizen dashboard components
│   │   ├── AlertsFeed.jsx
│   │   ├── AIAssistant.jsx
│   │   ├── EmergencyTools.jsx
│   │   ├── RiskMeter.jsx
│   │   └── CitizenDashboard.jsx
│   ├── authority/        # Authority dashboard components
│   │   ├── AlertManagement.jsx
│   │   ├── RescueCoordination.jsx
│   │   ├── ReportsAnalytics.jsx
│   │   └── AuthorityDashboard.jsx
│   ├── Header.jsx        # Navigation header
│   └── Login.jsx         # Authentication
├── data/
│   └── mockData.js       # Sample data and constants
├── utils/
│   ├── i18n.js          # Internationalization
│   └── storage.js        # Local storage utilities
├── App.jsx              # Main application
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## 🌐 Internationalization

The app supports multiple languages with easy extensibility:

- **English** (en) - Default
- **Bengali** (bn) - Full translation
- **Extensible** - Add new languages in `src/utils/i18n.js`

### Adding a New Language

1. Add language object to `I18N` in `src/utils/i18n.js`
2. Add language option to `LANGUAGES` array
3. Update language selector components

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_APP_NAME=Disha AI
VITE_API_BASE_URL=http://localhost:3000/api
VITE_MAP_API_KEY=your_map_api_key
```

### Customization

- **Colors**: Update `tailwind.config.js` theme colors
- **Fonts**: Modify font family in `tailwind.config.js`
- **Animations**: Customize in `src/index.css`

## 📱 PWA Features

The app is PWA-ready with:
- Service worker for offline caching
- App manifest for installation
- Offline map tiles
- Cached emergency resources

## 🧪 Testing

### Demo Mode
- Any email/password combination works for login
- Mock data is used for all features
- Real-time simulation of alerts and updates

### Test Scenarios
1. **Citizen Flow**: Login → View alerts → Use AI assistant → Emergency tools
2. **Authority Flow**: Login → Publish alerts → Monitor users → View analytics
3. **Language Switch**: Change language and verify all text updates
4. **Role Switch**: Switch between citizen and authority roles

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🔌 API Integration

### Backend Requirements
- REST API for alerts management
- WebSocket for real-time updates
- Authentication service
- File storage for emergency resources

### Mock Data
Current implementation uses mock data. Replace with real API calls:
- `src/data/mockData.js` - Sample data
- `src/utils/storage.js` - Local storage (replace with API calls)

## 🛡️ Security

- Input validation and sanitization
- XSS protection
- CSRF protection
- Secure authentication flow
- Data encryption for sensitive information

## 📊 Performance

- Lazy loading for components
- Image optimization
- Code splitting
- Caching strategies
- Bundle size optimization

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React** - UI framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Recharts** - Data visualization
- **Vite** - Build tool

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check documentation wiki

---

**Built with ❤️ for disaster preparedness and community safety**