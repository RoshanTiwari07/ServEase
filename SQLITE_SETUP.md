# SQLite Setup Guide for ServEase

## 📱 SQLite Local Database Integration

Your ServEase app now uses SQLite for local data storage! This provides fast, offline-capable data access without requiring internet connection or external services.

## 🗄️ Database Structure

### Tables Created:

#### `service_categories`
- **id**: Unique identifier
- **name**: Category name (e.g., "Home Maintenance & Repair")
- **description**: Category description
- **icon**: Icon name for UI
- **provider_count**: Number of providers in category
- **average_price**: Average price for services
- **image**: Category image URL
- **services**: JSON array of services in category
- **created_at/updated_at**: Timestamps

#### `providers`
- **id**: Unique identifier
- **name**: Provider name
- **rating**: Average rating (0-5)
- **price**: Starting price
- **distance**: Distance from user
- **trust_score**: Trust score (0-5)
- **trust_level**: "trusted", "expert", or "starter"
- **service**: Primary service type
- **category**: Service category
- **phone**: Contact number
- **experience**: Years of experience
- **completed_jobs**: Number of completed jobs
- **languages**: JSON array of spoken languages
- **is_verified**: Verification status
- **specialties**: JSON array of specialties
- **avatar**: Profile image URL
- **created_at/updated_at**: Timestamps

#### `bookings`
- **id**: Unique identifier
- **user_id**: User who made booking
- **provider_name**: Provider name
- **service**: Service type
- **date**: Booking date
- **time**: Booking time
- **status**: "upcoming", "ongoing", "completed", "cancelled"
- **price**: Service price
- **address**: Service address
- **provider_image**: Provider image URL
- **rating**: User rating (if completed)
- **created_at/updated_at**: Timestamps

#### `users` (Ready for future use)
- **id**: Unique identifier
- **name**: User name
- **email**: Email address
- **phone**: Phone number
- **address**: User address
- **city**: User city
- **avatar**: Profile image URL
- **created_at/updated_at**: Timestamps

## 🚀 How It Works

### 1. **Automatic Initialization**
```typescript
// Database initializes automatically when app starts
const { isInitialized, isLoading, error } = useDatabase();
```

### 2. **Data Seeding**
- Database automatically seeds with your dummy data on first run
- Includes all 9 service categories with 50+ services
- Sample providers with ratings, trust scores, contact info
- Sample bookings for testing

### 3. **Data Access**
```typescript
// Get top-rated providers
const { providers, loading, error } = useTopProviders(10);

// Get all service categories
const { categories, loading, error } = useServiceCategories();

// Search providers
const { providers, loading, error, searchProviders } = useProviderSearch();
searchProviders("plumber");
```

## 📊 Available Hooks

### `useDatabase()`
- **Purpose**: Initialize and manage database
- **Returns**: `{ isInitialized, isLoading, error, reinitialize }`

### `useTopProviders(limit)`
- **Purpose**: Get top-rated providers
- **Returns**: `{ providers, loading, error, refetch }`

### `useServiceCategories()`
- **Purpose**: Get all service categories
- **Returns**: `{ categories, loading, error, refetch }`

### `useProviderSearch()`
- **Purpose**: Search providers by name, service, or category
- **Returns**: `{ providers, loading, error, searchProviders }`

### `useUserBookings(userId)`
- **Purpose**: Get user's booking history
- **Returns**: `{ bookings, loading, error, refetch }`

## 🔧 Service Functions

### Provider Services
```typescript
import { providerService } from '../services/sqliteService';

// Get all providers
const providers = await providerService.getAll();

// Search providers
const results = await providerService.search("electrician");

// Get providers by service type
const plumbers = await providerService.getByService("Plumber");

// Add new provider
const providerId = await providerService.add(newProviderData);
```

### Category Services
```typescript
import { serviceCategoryService } from '../services/sqliteService';

// Get all categories
const categories = await serviceCategoryService.getAll();

// Get specific category
const category = await serviceCategoryService.getById("category-id");
```

### Booking Services
```typescript
import { bookingService } from '../services/sqliteService';

// Get user bookings
const bookings = await bookingService.getUserBookings("user-id");

// Create new booking
const bookingId = await bookingService.create(bookingData);

// Update booking status
await bookingService.updateStatus("booking-id", "completed");
```

## 💾 Data Persistence

### **Local Storage**
- All data stored locally on device
- No internet connection required
- Fast data access and queries
- Automatic data persistence between app sessions

### **Database Location**
- **iOS**: App's Documents directory
- **Android**: App's internal storage
- **Web**: IndexedDB (for Expo web)

## 🔄 Data Management

### **Seeding**
```typescript
import { seedDatabase } from '../database/seedData';

// Re-seed database (clears existing data)
await seedDatabase();
```

### **Database Reset**
```typescript
// Clear all data and re-initialize
const { reinitialize } = useDatabase();
await reinitialize();
```

## 🎯 Benefits

### **Performance**
✅ **Lightning Fast**: No network delays
✅ **Offline First**: Works without internet
✅ **Efficient Queries**: SQL-based searching and filtering
✅ **Local Storage**: Data persists between sessions

### **Development**
✅ **No Setup Required**: Works immediately after `npm install`
✅ **Consistent Data**: Same data across all development sessions
✅ **Easy Testing**: Predictable data for testing features
✅ **SQL Queries**: Powerful search and filter capabilities

### **User Experience**
✅ **Instant Loading**: No loading spinners for data
✅ **Offline Support**: App works without internet
✅ **Fast Search**: Real-time search results
✅ **Reliable**: No network errors or timeouts

## 🚀 Getting Started

### 1. **Install Dependencies**
```bash
npm install expo-sqlite@~14.0.6
```

### 2. **Start Your App**
```bash
npm start
```

### 3. **Database Auto-Initialization**
- Database creates automatically on first app launch
- Seeds with all your service categories and providers
- Ready to use immediately!

## 📱 Usage in Your App

### **Home Screen**
- Loads top-rated providers from SQLite
- Shows service categories from database
- Fast, responsive UI with loading states

### **Search Screen**
- Real-time search through SQLite database
- Searches across provider names, services, and categories
- Instant results with no network delays

### **Booking Screen**
- Loads user bookings from local database
- Fast booking creation and status updates
- Offline booking management

## 🔮 Future Enhancements

### **Sync Capabilities**
- Add cloud sync when internet available
- Merge local and remote data
- Conflict resolution for data changes

### **Advanced Features**
- Full-text search indexing
- Data compression for large datasets
- Automatic backup and restore
- Data export/import functionality

Your ServEase app now has a professional, fast, and reliable local database! 🎉