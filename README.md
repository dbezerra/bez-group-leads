# BEZ Leads - Professional Services Management System

![BEZ GROUP Logo](https://img.shields.io/badge/BEZ%20GROUP-Leads-blue)

A comprehensive professional services management system designed for the US market, featuring role-based access for administrators and workers, with a BEZCoins system for lead monetization.

## 🚀 Features

### 🔐 Authentication & User Management
- **Role-based access**: Administrator and Worker personas
- **Responsive login**: Modern, mobile-friendly authentication
- **User profiles**: Complete worker profiles with skills and certifications

### 👨‍💼 Administrator Dashboard
- **System overview**: Total leads, workers, services, and revenue
- **Lead management**: Complete CRUD operations for leads
- **Worker management**: Register and manage professional workers
- **Service management**: Create and manage service offerings
- **Analytics**: Leads by status, conversion rates, recent activities

### 👷‍♂️ Worker Dashboard
- **Qualified leads**: View leads matching worker skills
- **BEZCoins system**: Spend virtual currency to unlock lead details
- **Job management**: Track assigned jobs and completion status
- **Profile management**: Update skills, certifications, and availability

### 🏗️ Professional Services
- **US-focused**: Services adapted for American market
- **Licensing system**: Professional licenses and certifications
- **Insurance requirements**: General liability and workers compensation
- **Location-based**: Services available by state
- **Categories**: Construction, Electrical, Plumbing, Cleaning, Painting, Landscaping, HVAC, Roofing

### 📱 Responsive Design
- **Mobile-first**: Optimized for smartphones and tablets
- **Desktop**: Full-featured desktop experience
- **Touch-friendly**: Intuitive mobile navigation
- **Progressive enhancement**: Works on all devices

## 🛠️ Technology Stack

- **Frontend**: Angular 17+ with standalone components
- **Styling**: SCSS with responsive design
- **Icons**: Material Icons
- **State Management**: RxJS with BehaviorSubjects
- **Routing**: Angular Router with guards
- **Forms**: Template-driven forms with validation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Angular CLI 17+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dbezerra/bez-group-leads.git
   cd bez-group-leads
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   ng serve
   ```

4. **Open browser**
   Navigate to `http://localhost:4200`

### Build for Production

```bash
ng build --configuration production
```

## 🔑 Demo Credentials

### Administrator
- **Email**: admin@bezleads.com
- **Password**: admin123
- **Access**: Full system administration

### Worker (Electrician)
- **Email**: mike@electrician.com
- **Password**: worker123
- **Company**: Johnson Electrical Services
- **License**: EL-2024-001 (CA)

### Worker (Cleaning)
- **Email**: sarah@cleaning.com
- **Password**: worker123
- **Company**: Williams Cleaning Services
- **License**: GC-2024-002 (CA)

## 📋 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/     # Main dashboard components
│   │   ├── layout/        # Application layout
│   │   ├── login/         # Authentication
│   │   ├── logo/          # BEZ GROUP logo component
│   │   ├── leads/         # Lead management
│   │   ├── customers/     # Worker management
│   │   └── services/      # Service management
│   ├── models/            # TypeScript interfaces
│   ├── services/          # Business logic services
│   └── app.routes.ts      # Application routing
```

## 🎯 Key Features

### BEZCoins System
- Virtual currency for lead monetization
- Workers spend BEZCoins to unlock lead contact details
- Admin can manage BEZCoins allocation

### Professional Licensing
- US state-specific licenses
- License verification system
- Expiration date tracking
- Status management (Active, Expired, Suspended)

### Lead Qualification
- Automatic skill matching
- Location-based filtering
- Urgency levels (Low, Medium, High)
- Budget range specifications

### Responsive Navigation
- Collapsible sidebar
- Mobile overlay
- Touch-friendly controls
- Progressive enhancement

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📱 Mobile Support

- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 13+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Development**: BEZ GROUP Development Team
- **Design**: BEZ GROUP Design Team
- **Project Management**: BEZ GROUP PM Team

## 📞 Support

For support and questions:
- **Email**: support@bezgroup.com
- **Documentation**: [Project Wiki](https://github.com/dbezerra/bez-group-leads/wiki)
- **Issues**: [GitHub Issues](https://github.com/dbezerra/bez-group-leads/issues)

## 🔄 Version History

- **v1.0.0** - Initial release with core functionality
- **v1.1.0** - Added BEZCoins system
- **v1.2.0** - Enhanced mobile responsiveness
- **v1.3.0** - US market adaptation

---

**BEZ GROUP** - Professional Services Management Solutions