# Firebase Setup Guide for ServEase

## 🔥 Firebase Configuration Steps

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name your project: `servease-app`
4. Enable Google Analytics (optional)
5. Create project

### 2. Add Web App to Firebase Project

1. In your Firebase project, click "Add app" → Web (</>) icon
2. Register app with nickname: `ServEase Mobile App`
3. Copy the Firebase configuration object

### 3. Update Firebase Config

Replace the config in `config/firebase.ts` with your actual config:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};
```

### 4. Enable Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location (choose closest to your users)

### 5. Set Up Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to service categories and providers
    match /serviceCategories/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /providers/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Allow users to read/write their own bookings
    match /bookings/{document} {
      allow read, write: if request.auth != null &&
        request.auth.uid == resource.data.userId;
    }

    // Allow users to read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null &&
        request.auth.uid == userId;
    }
  }
}
```

### 6. Install Dependencies

```bash
npm install firebase@^10.7.1
```

### 7. Seed Database with Sample Data

After setting up Firebase config, run the seeding script:

```typescript
// In your app, you can call this function to seed data
import { seedFirebaseDatabase } from "./scripts/seedFirebase";

// Call this once to populate your database
seedFirebaseDatabase()
  .then(() => console.log("Database seeded successfully"))
  .catch((error) => console.error("Seeding failed:", error));
```

## 📊 Database Structure

### Collections:

#### `serviceCategories`

```json
{
  "id": "auto-generated",
  "name": "Home Maintenance & Repair",
  "description": "Essential home services for daily needs",
  "icon": "home-outline",
  "providerCount": 245,
  "averagePrice": "250",
  "image": "https://...",
  "services": [...]
}
```

#### `providers`

```json
{
  "id": "auto-generated",
  "name": "Rajesh Kumar",
  "rating": 4.8,
  "price": "300",
  "distance": "1.2 km",
  "trustScore": 4.9,
  "trustLevel": "trusted",
  "service": "Plumber",
  "category": "Home Maintenance & Repair",
  "phone": "+91 98765 43210",
  "experience": "8 years",
  "completedJobs": 156,
  "languages": ["Hindi", "English"],
  "isVerified": true,
  "specialties": ["Pipe Repair", "Tap Installation"],
  "avatar": "https://..."
}
```

#### `bookings`

```json
{
  "id": "auto-generated",
  "userId": "user-id",
  "providerName": "Rajesh Kumar",
  "service": "Plumbing Repair",
  "date": "2025-01-20",
  "time": "10:00 AM",
  "status": "upcoming",
  "price": "300",
  "address": "Sector 15, Noida",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

## 🚀 Usage in Your App

### Fetching Data

```typescript
// In your components
import { useTopProviders, useServiceCategories } from '../hooks/useFirebaseData';

function MyComponent() {
  const { providers, loading, error } = useTopProviders(10);
  const { categories } = useServiceCategories();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return <YourContent providers={providers} categories={categories} />;
}
```

### Adding New Data

```typescript
import { providerService } from "../services/firebaseService";

// Add new provider
const newProvider = {
  name: "New Provider",
  service: "Electrician",
  // ... other fields
};

const providerId = await providerService.add(newProvider);
```

## 🔐 Authentication (Optional)

If you want to add user authentication:

1. Enable Authentication in Firebase Console
2. Choose sign-in methods (Email/Password, Google, etc.)
3. Use Firebase Auth in your app:

```typescript
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }
};
```

## 📱 Testing

1. Start your Expo app: `npm start`
2. The app will now fetch data from Firebase instead of using dummy data
3. Check Firebase Console to see data being read/written

## 🎯 Benefits of Firebase Integration

- ✅ Real-time data updates
- ✅ Scalable database
- ✅ Built-in authentication
- ✅ Offline support
- ✅ Cloud storage for images
- ✅ Analytics and crash reporting
- ✅ Push notifications
- ✅ Hosting for admin panel

Your ServEase app is now powered by Firebase! 🎉
