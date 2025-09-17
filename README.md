# TrailFit Outdoors 🏔️

A modern, responsive e-commerce website for premium hiking and camping gear. Built with Node.js, Express, and MySQL.

![TrailFit Outdoors](public/Assets/hikegear.webp)

## 🌟 Features

- **Modern UI/UX**: Clean, adventure-inspired design with smooth animations
- **Product Gallery**: Interactive image galleries with zoom functionality
- **Shopping Cart**: Real-time cart updates with tax and fee calculations
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Database Integration**: MySQL backend for product management
- **Contact System**: Professional contact page with interactive form

## 🛍️ Product Categories

- 🎒 Hiking Backpacks
- 🥾 Trekking Poles
- 💧 Water Filters
- 🔦 Headlamps
- 🔥 Camping Stoves
- 🛌 Sleeping Bags
- 📌 Tent Stakes
- ⚡ Fire Starters
- 🧰 Multi-Tools
- 🍳 Cook Pots

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MySQL 8.0+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sathwin/TrailFit-Outdoors.git
cd TrailFit-Outdoors
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Set up MySQL database:
```sql
CREATE DATABASE trailfit_outdoors;
-- Import your database schema and sample data
```

5. Start the server:
```bash
npm start
```

6. Visit `http://localhost:3000` to see the website!

## 🏗️ Project Structure

```
TrailFit-Outdoors/
├── public/                 # Frontend assets
│   ├── Assets/            # Product images and hero photos
│   ├── index.html         # Home page
│   ├── products.html      # Products catalog
│   ├── contact.html       # Contact page
│   ├── styles.css         # Main stylesheet
│   └── app.js            # Client-side JavaScript
├── server.js             # Express server
├── package.json          # Dependencies
├── .env                  # Environment variables
└── README.md             # This file
```

## 🎨 Design Features

### Modern UI Components
- **Hero Section**: Authentic hiking photography with call-to-action
- **Product Cards**: Interactive cards with multiple image views
- **Image Galleries**: Click-to-zoom with thumbnail navigation
- **Social Media Icons**: Authentic brand-colored social links
- **Contact Form**: Professional contact form with validation

### Technical Highlights
- **CSS Custom Properties**: Consistent design system
- **Flexbox & Grid**: Modern layout techniques
- **Image Optimization**: WebP format with lazy loading
- **Smooth Animations**: Hover effects and transitions
- **Mobile-First**: Responsive design principles

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MySQL 8.0
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Images**: WebP format for optimization
- **Icons**: Custom SVG icons for social media

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Environment Variables
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASS=your_password
DB_NAME=trailfit_outdoors
PORT=3000
```

### Production Setup
1. Set up MySQL database on your hosting provider
2. Configure environment variables
3. Upload files to your web server
4. Install Node.js dependencies
5. Start the application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Email**: hello@trailfit.com
- **Phone**: (555) 555-1212
- **Address**: 100 Pine Street, Flagstaff, AZ 86001

## 🙏 Acknowledgments

- Hero photography featuring authentic outdoor gear
- Modern CSS design patterns and best practices
- Responsive web design principles
- E-commerce UX/UI patterns

---

**Built with ❤️ for outdoor enthusiasts**