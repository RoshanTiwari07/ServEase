export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  providerCount: number;
  averagePrice: string;
  image?: string;
  services: Service[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: string;
  duration: string;
  isPopular?: boolean;
}

export interface Provider {
  id: string;
  name: string;
  rating: number;
  price: string;
  distance: string;
  trustScore: number;
  trustLevel: 'trusted' | 'expert' | 'starter';
  service: string;
  category: string;
  avatar?: string;
  phone: string;
  experience: string;
  completedJobs: number;
  languages: string[];
  isVerified: boolean;
  specialties: string[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: '1',
    name: 'Home Maintenance & Repair',
    description: 'Essential home services for daily needs',
    icon: 'home-outline',
    providerCount: 245,
    averagePrice: '250',
    image: 'https://picsum.photos/seed/home-repair/200/200',
    services: [
      { id: '1-1', name: 'Electrician', description: 'Wiring, switches, appliance repair', basePrice: '200', duration: '1-2 hours' },
      { id: '1-2', name: 'Plumber', description: 'Pipe repair, tap fixing, drainage', basePrice: '250', duration: '1-3 hours', isPopular: true },
      { id: '1-3', name: 'Carpenter', description: 'Furniture repair, door fixing', basePrice: '300', duration: '2-4 hours' },
      { id: '1-4', name: 'Painter', description: 'Wall painting, touch-ups', basePrice: '400', duration: '4-8 hours' },
      { id: '1-5', name: 'Mason/Contractor', description: 'Construction, renovation work', basePrice: '500', duration: '1-3 days' },
      { id: '1-6', name: 'Appliance Repair', description: 'TV, fridge, washing machine', basePrice: '300', duration: '1-2 hours', isPopular: true },
      { id: '1-7', name: 'RO/Water Purifier Service', description: 'Installation, maintenance, filter change', basePrice: '200', duration: '30-60 mins' },
      { id: '1-8', name: 'CCTV Installation', description: 'Security camera setup', basePrice: '800', duration: '2-4 hours' },
      { id: '1-9', name: 'Solar Panel Service', description: 'Installation, maintenance', basePrice: '1500', duration: '4-8 hours' },
      { id: '1-10', name: 'AC Repair & Gas Refill', description: 'AC service, gas charging', basePrice: '350', duration: '1-2 hours', isPopular: true },
    ]
  },
  {
    id: '2',
    name: 'Personal Care & Grooming',
    description: 'Beauty and grooming services at home',
    icon: 'cut-outline',
    providerCount: 180,
    averagePrice: '300',
    image: 'https://picsum.photos/seed/beauty/200/200',
    services: [
      { id: '2-1', name: 'Salon at Home', description: 'Haircuts, facials, waxing', basePrice: '250', duration: '1-3 hours', isPopular: true },
      { id: '2-2', name: 'Mehendi Artist', description: 'Bridal, party mehendi designs', basePrice: '200', duration: '1-2 hours' },
      { id: '2-3', name: 'Makeup Artist', description: 'Wedding, event makeup', basePrice: '800', duration: '2-3 hours' },
      { id: '2-4', name: 'Spa/Massage Services', description: 'Relaxing massage therapy', basePrice: '600', duration: '1-2 hours' },
      { id: '2-5', name: "Men's Grooming", description: 'Haircut, beard trim, facial', basePrice: '150', duration: '45-90 mins', isPopular: true },
    ]
  },
  {
    id: '3',
    name: 'Cleaning & Home Care',
    description: 'Professional cleaning services',
    icon: 'sparkles-outline',
    providerCount: 320,
    averagePrice: '200',
    image: 'https://picsum.photos/seed/cleaning/200/200',
    services: [
      { id: '3-1', name: 'Deep Cleaning', description: 'Kitchen, bathroom, sofa, carpet', basePrice: '400', duration: '3-5 hours', isPopular: true },
      { id: '3-2', name: 'Pest Control', description: 'Cockroach, ant, termite control', basePrice: '800', duration: '2-3 hours' },
      { id: '3-3', name: 'Water Tank Cleaning', description: 'Overhead, underground tank cleaning', basePrice: '600', duration: '2-4 hours' },
      { id: '3-4', name: 'Car/Bike Washing', description: 'Doorstep vehicle cleaning', basePrice: '150', duration: '30-60 mins', isPopular: true },
      { id: '3-5', name: 'Laundry/Dry Cleaning', description: 'Pickup and delivery service', basePrice: '100', duration: '24-48 hours' },
    ]
  },
  {
    id: '4',
    name: 'Vehicle Services',
    description: 'On-demand vehicle maintenance',
    icon: 'car-outline',
    providerCount: 150,
    averagePrice: '300',
    image: 'https://picsum.photos/seed/vehicle/200/200',
    services: [
      { id: '4-1', name: 'Bike/Car Mechanic', description: 'Repair, maintenance, servicing', basePrice: '300', duration: '1-3 hours', isPopular: true },
      { id: '4-2', name: 'Battery Replacement', description: 'Car, bike battery service', basePrice: '200', duration: '30-60 mins' },
      { id: '4-3', name: 'Puncture Repair', description: 'Roadside tire repair', basePrice: '100', duration: '15-30 mins', isPopular: true },
      { id: '4-4', name: 'Vehicle Detailing', description: 'Professional car/bike cleaning', basePrice: '400', duration: '2-3 hours' },
      { id: '4-5', name: 'Driver on Call', description: 'Temporary driver service', basePrice: '500', duration: 'Per day' },
    ]
  },
  {
    id: '5',
    name: 'Education & Training',
    description: 'Learn new skills at home',
    icon: 'book-outline',
    providerCount: 280,
    averagePrice: '400',
    image: 'https://picsum.photos/seed/education/200/200',
    services: [
      { id: '5-1', name: 'Home Tutors', description: 'School, college subjects', basePrice: '300', duration: '1-2 hours', isPopular: true },
      { id: '5-2', name: 'Spoken English Coach', description: 'Communication, soft skills', basePrice: '400', duration: '1 hour' },
      { id: '5-3', name: 'Music Teacher', description: 'Guitar, keyboard, singing', basePrice: '500', duration: '1 hour' },
      { id: '5-4', name: 'Dance Instructor', description: 'Classical, modern dance forms', basePrice: '600', duration: '1-2 hours' },
      { id: '5-5', name: 'Yoga/Fitness Trainer', description: 'Personal fitness coaching', basePrice: '400', duration: '1 hour', isPopular: true },
      { id: '5-6', name: 'Computer Classes', description: 'Excel, coding, Tally training', basePrice: '350', duration: '1-2 hours' },
    ]
  },
  {
    id: '6',
    name: 'Professional Services',
    description: 'Event and business services',
    icon: 'briefcase-outline',
    providerCount: 120,
    averagePrice: '800',
    image: 'https://picsum.photos/seed/professional/200/200',
    services: [
      { id: '6-1', name: 'Photographer/Videographer', description: 'Event photography, videography', basePrice: '2000', duration: '4-8 hours', isPopular: true },
      { id: '6-2', name: 'Event Planner', description: 'Birthday, wedding planning', basePrice: '5000', duration: '1-3 days' },
      { id: '6-3', name: 'Decorator', description: 'Event, home decoration', basePrice: '1500', duration: '2-4 hours' },
      { id: '6-4', name: 'Caterer', description: 'Event catering services', basePrice: '150', duration: 'Per person' },
      { id: '6-5', name: 'DJ/Sound System', description: 'Music, sound equipment rental', basePrice: '3000', duration: '4-8 hours' },
      { id: '6-6', name: 'Pandit/Priest', description: 'Puja, marriage ceremonies', basePrice: '1000', duration: '2-4 hours', isPopular: true },
      { id: '6-7', name: 'Legal Documentation', description: 'PAN, Aadhaar, GST help', basePrice: '500', duration: '1-2 hours' },
    ]
  },
  {
    id: '7',
    name: 'Domestic & Family Services',
    description: 'Household and care services',
    icon: 'people-outline',
    providerCount: 200,
    averagePrice: '300',
    image: 'https://picsum.photos/seed/domestic/200/200',
    services: [
      { id: '7-1', name: 'Cook', description: 'Daily, part-time cooking', basePrice: '200', duration: '1-2 hours', isPopular: true },
      { id: '7-2', name: 'Maid/House Help', description: 'Cleaning, household work', basePrice: '150', duration: '2-3 hours', isPopular: true },
      { id: '7-3', name: 'Babysitter', description: 'Child care services', basePrice: '250', duration: '4-8 hours' },
      { id: '7-4', name: 'Elderly Caretaker', description: 'Senior citizen care', basePrice: '400', duration: '8-12 hours' },
      { id: '7-5', name: 'Pet Grooming', description: 'Pet care, walking service', basePrice: '300', duration: '1-2 hours' },
    ]
  },
  {
    id: '8',
    name: 'Real Estate & Utility',
    description: 'Property and utility services',
    icon: 'business-outline',
    providerCount: 90,
    averagePrice: '500',
    image: 'https://picsum.photos/seed/realestate/200/200',
    services: [
      { id: '8-1', name: 'Property Broker', description: 'Rental, buying assistance', basePrice: '1000', duration: '1-7 days' },
      { id: '8-2', name: 'Interior Designer', description: 'Home design consultation', basePrice: '2000', duration: '2-4 hours' },
      { id: '8-3', name: 'Packers & Movers', description: 'Home shifting services', basePrice: '3000', duration: '4-8 hours', isPopular: true },
      { id: '8-4', name: 'Water Delivery', description: '20L jar delivery service', basePrice: '50', duration: '30 mins' },
      { id: '8-5', name: 'Gas Cylinder Booking', description: 'LPG cylinder assistance', basePrice: '100', duration: '2-4 hours' },
    ]
  },
  {
    id: '9',
    name: 'Digital Services',
    description: 'Tech and digital solutions',
    icon: 'laptop-outline',
    providerCount: 75,
    averagePrice: '400',
    image: 'https://picsum.photos/seed/digital/200/200',
    services: [
      { id: '9-1', name: 'Mobile/Laptop Repair', description: 'Device repair, software issues', basePrice: '300', duration: '1-3 hours', isPopular: true },
      { id: '9-2', name: 'Printer/CCTV Installation', description: 'Setup, configuration', basePrice: '500', duration: '1-2 hours' },
      { id: '9-3', name: 'Graphic Designer', description: 'Logo, poster design', basePrice: '800', duration: '1-3 days' },
      { id: '9-4', name: 'Digital Cards/Posters', description: 'Visiting cards, social media posts', basePrice: '200', duration: '2-4 hours' },
      { id: '9-5', name: 'Photo/Video Editing', description: 'Professional editing services', basePrice: '500', duration: '1-2 days' },
    ]
  }
];

export const sampleProviders: Provider[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    rating: 4.8,
    price: '300',
    distance: '1.2 km',
    trustScore: 4.9,
    trustLevel: 'trusted',
    service: 'Plumber',
    category: 'Home Maintenance & Repair',
    phone: '+91 98765 43210',
    experience: '8 years',
    completedJobs: 156,
    languages: ['Hindi', 'English'],
    isVerified: true,
    specialties: ['Pipe Repair', 'Tap Installation', 'Drainage'],
    avatar: 'https://picsum.photos/seed/rajesh/200/200',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    rating: 4.5,
    price: '250',
    distance: '0.8 km',
    trustScore: 4.7,
    trustLevel: 'expert',
    service: 'Electrician',
    category: 'Home Maintenance & Repair',
    phone: '+91 87654 32109',
    experience: '5 years',
    completedJobs: 89,
    languages: ['Hindi', 'English'],
    isVerified: true,
    specialties: ['Wiring', 'Switch Repair', 'Fan Installation'],
    avatar: 'https://picsum.photos/seed/priya/200/200',
  },
  {
    id: '3',
    name: 'Vikram Singh',
    rating: 4.2,
    price: '400',
    distance: '2.1 km',
    trustScore: 4.3,
    trustLevel: 'expert',
    service: 'Carpenter',
    category: 'Home Maintenance & Repair',
    phone: '+91 76543 21098',
    experience: '6 years',
    completedJobs: 67,
    languages: ['Hindi', 'Punjabi'],
    isVerified: true,
    specialties: ['Furniture Repair', 'Door Fixing', 'Cabinet Work'],
    avatar: 'https://picsum.photos/seed/vikram/200/200',
  },
  {
    id: '4',
    name: 'Anjali Patel',
    rating: 4.9,
    price: '350',
    distance: '1.5 km',
    trustScore: 4.8,
    trustLevel: 'trusted',
    service: 'Beautician',
    category: 'Personal Care & Grooming',
    phone: '+91 65432 10987',
    experience: '7 years',
    completedJobs: 234,
    languages: ['Hindi', 'Gujarati', 'English'],
    isVerified: true,
    specialties: ['Bridal Makeup', 'Facial', 'Hair Styling'],
    avatar: 'https://picsum.photos/seed/anjali/200/200',
  },
  {
    id: '5',
    name: 'Suresh Yadav',
    rating: 4.0,
    price: '200',
    distance: '3.0 km',
    trustScore: 4.0,
    trustLevel: 'starter',
    service: 'Tutor',
    category: 'Education & Training',
    phone: '+91 54321 09876',
    experience: '2 years',
    completedJobs: 23,
    languages: ['Hindi', 'English'],
    isVerified: false,
    specialties: ['Math', 'Science', 'English'],
    avatar: 'https://picsum.photos/seed/suresh/200/200',
  },
];