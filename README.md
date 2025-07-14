# Program Manager - Facilitator Dashboard

A comprehensive web application for managing training programs, tracking attendance, and facilitating educational sessions. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Functionality

- **Dashboard Overview** - Real-time statistics and program insights
- **Program Management** - Create, view, and manage training programs
- **Attendance Tracking** - Multiple attendance methods (QR codes, online, in-person)
- **Curriculum Management** - Upload and organize learning materials
- **Project Reviews** - Review and grade trainee submissions
- **Notifications** - Stay updated with program activities
- **Settings** - Customize your facilitator profile
- **Settings** - Customize your facilitator profile

### Attendance Methods

- **QR Code Scanning** - Individual QR codes for each trainee
- **Online Sessions** - Virtual attendance tracking
- **In-Person Sessions** - Location-based attendance with GPS
- **Manual Entry** - Traditional attendance marking

### User Interface

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark/Light Theme** - Toggle between themes
- **Sidebar Navigation** - Easy access to all features
- **Modern UI** - Built with shadcn/ui components

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Date Handling**: date-fns
- **Themes**: next-themes

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or pnpm

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd program-manager
   ```

2. **Install dependencies**

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
program-manager/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage (main dashboard)
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── dashboard/         # Dashboard page
│   ├── programs/          # Program management
│   ├── attendance/        # Attendance tracking
│   ├── curriculum/        # Curriculum upload
│   ├── reviews/           # Project reviews
│   ├── settings/          # User settings
│   └── ...               # Other feature pages
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── app-sidebar.tsx   # Main navigation sidebar
│   ├── theme-provider.tsx # Theme management
│   └── theme-toggle.tsx  # Theme toggle component
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
├── public/               # Static assets
└── styles/               # Additional styles
```

## 🎯 Key Pages

### Dashboard (`/`)

- Overview of all programs and statistics
- Quick actions for common tasks
- Recent activity feed
- Today's schedule

### Programs (`/programs`)

- View assigned programs
- Track program progress
- Manage trainees
- View program schedules

### Attendance (`/attendance`)

- Start attendance sessions
- Generate QR codes
- Track attendance methods
- View attendance reports

### Curriculum (`/curriculum`)

- Upload learning materials
- Organize resources
- Share with trainees

### Reviews (`/reviews`)

- Review project submissions
- Grade assignments
- Provide feedback

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Add any environment variables here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Tailwind Configuration

The app uses a custom color scheme defined in `tailwind.config.ts`:

```typescript
colors: {
  'website-primary': '#007bff',
  'website-grey': '#6c757d',
  // ... other custom colors
}
```

## 📱 Usage Guide

### Getting Started

1. **First Visit**: New facilitators are redirected to onboarding
2. **Dashboard**: View your assigned programs and statistics
3. **Navigation**: Use the sidebar to access different features
4. **Theme**: Toggle between light and dark themes using the theme button

### Managing Programs

1. Navigate to "My Programs" from the sidebar
2. View your assigned programs and their progress
3. Click on a program to see detailed information
4. Access trainee lists and schedules

### Tracking Attendance

1. Go to "Attendance Tracking" from the sidebar
2. Choose your attendance method:
   - **QR Code**: Generate individual QR codes for trainees
   - **Online**: Create shareable links for virtual sessions
   - **In-Person**: Use GPS location tracking
3. Start a session and monitor attendance in real-time

### Uploading Resources

1. Navigate to "Curriculum Upload"
2. Select files to upload
3. Organize materials by program
4. Share with trainees

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy to Vercel

1. Connect your repository to Vercel
2. Vercel will automatically detect Next.js
3. Deploy with default settings

## 🐛 Troubleshooting

### Common Issues

**SWC Binary Error on Windows**

```bash
# Remove node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install --legacy-peer-deps
```

**Port Already in Use**

```bash
# Next.js will automatically try the next available port
# Or kill the process using port 3000
```

**Dependency Conflicts**

```bash
# Use legacy peer deps flag
npm install --legacy-peer-deps
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for kLab Facilitators**
