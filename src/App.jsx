import React, { useState, useEffect, useMemo } from 'react';
import { 
  MapPin, Calendar, Clock, ChevronRight, Star, ShieldCheck, 
  Phone, Menu, X, CheckCircle, Car, Zap, Navigation, 
  MessageCircle, Filter, ArrowRight, Info, ArrowUpRight
} from 'lucide-react';

// --- CONFIGURATION & MOCK DATA ---

const CONFIG = {
  colors: {
    primary: 'bg-slate-900', // Deep Charcoal/Navy
    secondary: 'bg-slate-800',
    accent: 'text-amber-400', // Muted Gold
    accentBg: 'bg-amber-400',
    cta: 'bg-teal-500', // Electric Teal
    textMain: 'text-slate-800',
    textLight: 'text-slate-100'
  },
  whatsappNumber: "919876543210"
};

// UPDATED: Using specific images provided by user for better accuracy
const CARS = [
  {
    id: 1,
    name: "Hyundai Creta SX",
    type: "SUV",
    fuel: "Diesel",
    transmission: "Automatic",
    seats: 5,
    price: 2499,
    rating: 4.9,
    trips: 142,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
    location: "Kothrud",
    features: ["Sunroof", "Ventilated Seats", "Fastag"]
  },
  {
    id: 2,
    name: "Maruti Swift ZXi",
    type: "Hatchback",
    fuel: "Petrol",
    transmission: "Manual",
    seats: 5,
    price: 1199,
    rating: 4.7,
    trips: 310,
    // Updated Swift Image
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdw7SMDw_WlDkkEWAeOVQ_j-SOOGJemMo-RA&s",
    location: "Viman Nagar",
    features: ["Bluetooth", "High Mileage", "Compact"]
  },
  {
    id: 3,
    name: "Mahindra Thar 4x4",
    type: "SUV",
    fuel: "Diesel",
    transmission: "Manual",
    seats: 4,
    price: 3499,
    rating: 5.0,
    trips: 85,
    // Updated Thar Image
    image: "https://images.hindustantimes.com/auto/img/2024/08/17/1600x900/Mahindra_Thar_Roxx_01_1723863061883_1723888572288.jpg",
    location: "Baner",
    features: ["Convertible Top", "Off-road Spec", "GPS"]
  },
  {
    id: 4,
    name: "Tata Nexon EV",
    type: "EV",
    fuel: "Electric",
    transmission: "Automatic",
    seats: 5,
    price: 1899,
    rating: 4.8,
    trips: 112,
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800",
    location: "Hinjewadi",
    features: ["Silent Drive", "Autopilot Assist", "No Fuel Cost"]
  },
  {
    id: 5,
    name: "Honda City ZX",
    type: "Sedan",
    fuel: "Petrol",
    transmission: "Automatic",
    seats: 5,
    price: 2199,
    rating: 4.8,
    trips: 98,
    // Updated Honda City Image
    image: "https://blogs.gomechanic.com/wp-content/uploads/2019/10/Webp.net-compress-image-1.jpg",
    location: "Magarpatta",
    features: ["Luxury Interiors", "Cruise Control", "Large Boot"]
  }
];

const LOCATIONS = [
  "Kothrud", "Viman Nagar", "Hinjewadi", "Baner", "Magarpatta", "Pune Airport"
];

// --- COMPONENTS ---

// 1. Reusable UI Components
const Badge = ({ children, className }) => (
  <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${className}`}>
    {children}
  </span>
);

const Button = ({ children, variant = 'primary', className = '', onClick, icon: Icon }) => {
  const baseStyle = "flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0";
  const variants = {
    primary: "bg-amber-400 text-slate-900 hover:bg-amber-300 shadow-lg shadow-amber-400/20",
    secondary: "bg-transparent border-2 border-amber-400 text-amber-400 hover:bg-amber-400/10",
    dark: "bg-slate-800 text-white hover:bg-slate-700",
    cta: "bg-teal-500 text-white hover:bg-teal-400 shadow-lg shadow-teal-500/30"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
      {Icon && <Icon size={18} />}
    </button>
  );
};

// 2. Header Component
const Header = ({ currentView, setView }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-xl py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="text-2xl font-black tracking-tighter cursor-pointer flex items-center gap-2 text-white"
          onClick={() => setView('home')}
        >
          <div className="w-8 h-8 bg-amber-400 rounded-tr-xl rounded-bl-xl flex items-center justify-center text-slate-900">
            <Zap size={20} fill="currentColor" />
          </div>
          SELF<span className="text-amber-400">VELOCITY</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-slate-200">
          <button onClick={() => setView('home')} className="hover:text-amber-400 transition-colors">HOME</button>
          <button onClick={() => setView('fleet')} className="hover:text-amber-400 transition-colors">FLEET</button>
          <button className="hover:text-amber-400 transition-colors">LOCATIONS</button>
          <div className="flex items-center gap-1 text-amber-400">
            <Phone size={16} />
            <span>+91 98765 43210</span>
          </div>
          <Button variant="primary" className="py-2 px-4 text-xs" onClick={() => setView('fleet')}>
            BOOK NOW
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-t border-slate-800 p-4 flex flex-col gap-4 shadow-2xl">
          <button onClick={() => { setView('home'); setMobileMenuOpen(false); }} className="text-white font-bold py-2">Home</button>
          <button onClick={() => { setView('fleet'); setMobileMenuOpen(false); }} className="text-white font-bold py-2">Fleet</button>
          <Button variant="primary" className="w-full" onClick={() => { setView('fleet'); setMobileMenuOpen(false); }}>
            Book Now
          </Button>
        </div>
      )}
    </header>
  );
};

// 3. Hero Section with Quick Book Widget
const Hero = ({ setView, setFilterLocation }) => {
  const [searchLoc, setSearchLoc] = useState('');

  const handleSearch = () => {
    if (searchLoc) setFilterLocation(searchLoc);
    setView('fleet');
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-slate-900">
      {/* Cinematic Background (Simulated Video Loop) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2300&auto=format&fit=crop" 
          alt="Driving in Pune" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-slate-900/20"></div>
      </div>

      <div className="container mx-auto px-4 z-10 relative grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="text-white space-y-6 max-w-xl">
          <div className="flex items-center gap-2 text-amber-400 font-bold tracking-wider text-sm animate-fade-in-up">
            <Star size={16} fill="currentColor" />
            PUNE'S #1 PREMIUM SELF-DRIVE
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
            Drive Pune on <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">Your Terms.</span>
          </h1>
          <p className="text-lg text-slate-300 font-light">
            Reserve premium cars in 90 seconds. Zero deposit options. 
            RTO verified fleet delivered to your doorstep.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center gap-2 text-slate-300 text-sm">
              <CheckCircle className="text-teal-400" size={16} /> No Hidden Fees
            </div>
            <div className="flex items-center gap-2 text-slate-300 text-sm">
              <CheckCircle className="text-teal-400" size={16} /> 24/7 Roadside Assist
            </div>
            <div className="flex items-center gap-2 text-slate-300 text-sm">
              <CheckCircle className="text-teal-400" size={16} /> Free Cancellation
            </div>
          </div>
        </div>

        {/* Quick Book Widget */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-2xl transform transition-all hover:scale-[1.01]">
          <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
            <Clock className="text-amber-400" /> Reserve in 90 Seconds
          </h3>
          
          <div className="space-y-4">
            {/* Location Select */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 uppercase ml-1">Pickup Area</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 text-slate-500" size={18} />
                <select 
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-600 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none appearance-none"
                  onChange={(e) => setSearchLoc(e.target.value)}
                  value={searchLoc}
                >
                  <option value="">Select Pickup Location</option>
                  {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>
            </div>

            {/* Date/Time Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 uppercase ml-1">Start Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 text-slate-500" size={18} />
                  <input type="datetime-local" className="w-full pl-10 pr-2 py-3 bg-slate-800 text-white rounded-lg border border-slate-600 focus:border-amber-400 outline-none text-sm" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 uppercase ml-1">End Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 text-slate-500" size={18} />
                  <input type="datetime-local" className="w-full pl-10 pr-2 py-3 bg-slate-800 text-white rounded-lg border border-slate-600 focus:border-amber-400 outline-none text-sm" />
                </div>
              </div>
            </div>

            <Button variant="primary" className="w-full mt-4 py-4 text-lg shadow-amber-500/25" onClick={handleSearch} icon={ArrowRight}>
              Find Available Cars
            </Button>

            <p className="text-center text-slate-400 text-xs mt-2">
              Trusted by 1,200+ Pune Customers • 4.8/5 Rating
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// 4. Fleet & Booking Components
const FleetPage = ({ setView, setSelectedCar, filterLocation }) => {
  const [filter, setFilter] = useState('All');
  
  const filteredCars = useMemo(() => {
    return CARS.filter(car => {
      const typeMatch = filter === 'All' || car.type === filter;
      const locMatch = !filterLocation || car.location === filterLocation;
      return typeMatch && locMatch;
    });
  }, [filter, filterLocation]);

  const handleBook = (car) => {
    setSelectedCar(car);
    setView('booking');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-28 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Select Your Ride</h2>
            <p className="text-slate-600">
              {filteredCars.length} premium vehicles available {filterLocation ? `in ${filterLocation}` : 'in Pune'}
            </p>
          </div>
          
          {/* Filters */}
          <div className="flex gap-2 mt-4 md:mt-0 overflow-x-auto pb-2">
            {['All', 'SUV', 'Hatchback', 'Sedan', 'EV'].map(type => (
              <button 
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                  filter === type 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map(car => (
            <div key={car.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100">
              <div className="relative h-56 overflow-hidden">
                <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <Badge className="absolute top-4 left-4 bg-white/90 text-slate-900 backdrop-blur-sm shadow-sm">
                  {car.fuel}
                </Badge>
                <div className="absolute bottom-4 right-4 bg-slate-900/90 text-amber-400 px-3 py-1 rounded-lg font-bold text-sm flex items-center gap-1 backdrop-blur-sm">
                  <Star size={14} fill="currentColor" /> {car.rating}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{car.name}</h3>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin size={14} /> {car.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-slate-900">₹{car.price}</p>
                    <p className="text-xs text-slate-500">per day</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-6">
                  {car.features.slice(0, 3).map((feat, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-600 py-1 px-2 rounded text-center font-medium">
                      {feat}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Navigation size={16} className="text-teal-500" />
                    <span>{car.transmission}</span>
                  </div>
                  <Button onClick={() => handleBook(car)} className="px-6 py-2 text-sm">
                    Select Car
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BookingWizard = ({ car, setView }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = () => {
    setIsLoading(true);
    setTimeout(() => {
      setStep(3);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => setView('fleet')} className="mb-6 text-slate-500 hover:text-slate-900 flex items-center gap-2 font-medium">
          <ArrowRight className="rotate-180" size={18} /> Back to Fleet
        </button>

        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-8 px-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                step >= i ? 'bg-slate-900 text-amber-400' : 'bg-slate-200 text-slate-400'
              }`}>
                {step > i ? <CheckCircle size={20} /> : i}
              </div>
              <span className={`text-sm font-bold hidden md:block ${step >= i ? 'text-slate-900' : 'text-slate-300'}`}>
                {i === 1 ? 'Review' : i === 2 ? 'Details' : 'Success'}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          {step === 1 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Booking Summary</h2>
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <img src={car.image} alt={car.name} className="w-full md:w-1/3 rounded-lg object-cover h-48" />
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{car.name}</h3>
                    <Badge className="bg-teal-100 text-teal-800 mt-2">RTO Compliant</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span>Base Fare (24 hrs)</span>
                      <span className="font-bold">₹{car.price}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span>Insurance & Taxes</span>
                      <span className="font-bold">₹300</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span>Refundable Deposit</span>
                      <span className="font-bold text-teal-600">₹0</span>
                    </div>
                    <div className="flex justify-between pt-2 text-lg font-black text-slate-900">
                      <span>Total Payable</span>
                      <span>₹{car.price + 300}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 mb-6 flex gap-3">
                <Info className="text-amber-600 flex-shrink-0" />
                <p className="text-sm text-amber-800">Includes 150km free. Extra km at ₹8/km. Fuel not included.</p>
              </div>
              <Button className="w-full" onClick={() => setStep(2)}>Proceed to Details</Button>
            </div>
          )}

          {step === 2 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Driver Details</h2>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleConfirm(); }}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700">Full Name</label>
                    <input required type="text" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none" placeholder="John Doe" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700">Phone Number</label>
                    <input required type="tel" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none" placeholder="+91 98765 43210" />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-700">Driving License Number</label>
                  <input required type="text" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none" placeholder="MH12 20230001234" />
                </div>

                <div className="pt-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" required className="w-5 h-5 text-amber-400 rounded focus:ring-amber-400" />
                    <span className="text-sm text-slate-600">I agree to the <a href="#" className="text-teal-600 underline">Terms & Conditions</a> and hold a valid license.</span>
                  </label>
                </div>

                <Button className="w-full mt-6" variant="cta">
                  {isLoading ? 'Processing...' : 'Confirm & Pay via WhatsApp'}
                </Button>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <CheckCircle size={40} className="text-green-600" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-2">Booking Initiated!</h2>
              <p className="text-slate-600 mb-8">
                Your booking ID is <span className="font-mono font-bold text-slate-900">#SV-8829</span>. 
                We have sent the payment link and car location to your WhatsApp.
              </p>
              <Button 
                variant="primary" 
                icon={MessageCircle}
                onClick={() => window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=Hi, I just booked ${car.name} (Ref: #SV-8829). Please share payment link.`, '_blank')}
              >
                Open WhatsApp
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 5. NEW: Featured Fleet Section (Displayed irrespective of booking)
const FeaturedFleet = ({ setView }) => {
  // Display top 3 cars as a preview
  const showcaseCars = CARS.slice(0, 3);

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <Badge className="bg-amber-100 text-amber-800 mb-2">Our Fleet</Badge>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">Premium Cars Available</h2>
            <p className="text-slate-600 mt-2">Choose from our wide range of well-maintained vehicles.</p>
          </div>
          <button 
            onClick={() => setView('fleet')}
            className="hidden md:flex items-center gap-2 font-bold text-teal-600 hover:text-teal-700 transition-colors"
          >
            View Full Fleet <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {showcaseCars.map(car => (
            <div key={car.id} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100">
              <div className="relative h-48 overflow-hidden">
                <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold shadow-sm">
                  ₹{car.price}/day
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 mb-1">{car.name}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                  <span className="bg-slate-100 px-2 py-0.5 rounded">{car.fuel}</span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded">{car.transmission}</span>
                </div>
                <Button 
                  variant="secondary" 
                  className="w-full py-2 text-sm" 
                  onClick={() => setView('fleet')}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <button 
            onClick={() => setView('fleet')}
            className="md:hidden w-full mt-8 flex items-center justify-center gap-2 font-bold text-white bg-slate-900 py-3 rounded-lg"
          >
            View Full Fleet <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
};

// 6. NEW: Optimum Layout Section (Replacing Location Grid)
const InfoGridSection = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
        Short-term rentals starting at <span className="bg-green-600 text-white px-2 py-1 rounded-lg text-2xl align-middle">₹999</span>
      </h2>
      <p className="text-slate-600 max-w-3xl mx-auto mb-12 text-lg">
        Get convenience, comfort and privacy with Self Velocity in Pune rental services.
      </p>

      <div className="grid md:grid-cols-3 gap-8 text-left">
        {/* Card 1: Local Attractions */}
        <div className="group cursor-pointer">
          <div className="overflow-hidden rounded-xl mb-4 h-64 relative">
             <img 
              src="https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&q=80&w=800" 
              alt="Pune Attractions" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2 group-hover:text-teal-600 transition-colors">
            Discover Pune's Local Attractions <ArrowUpRight size={18} />
          </h3>
          <p className="text-slate-600 leading-relaxed">
            Drive to iconic spots like Shaniwar Wada, Aga Khan Palace, and Dagdusheth Temple with Self Velocity self-drive in Pune.
          </p>
        </div>

        {/* Card 2: Business Travel */}
        <div className="group cursor-pointer">
          <div className="overflow-hidden rounded-xl mb-4 h-64 relative">
            <img 
              src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800" 
              alt="Business Travel" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2 group-hover:text-teal-600 transition-colors">
            Get Cars for Business Travel <ArrowUpRight size={18} />
          </h3>
          <p className="text-slate-600 leading-relaxed">
            Navigate seamlessly between Hinjewadi, Magarpatta, and Viman Nagar with a self-drive car that works around your schedule.
          </p>
        </div>

        {/* Card 3: Pickup Locations */}
        <div className="group cursor-pointer">
          <div className="overflow-hidden rounded-xl mb-4 h-64 relative">
             <img 
              src="https://images.unsplash.com/photo-1625505826533-5c80aca7d157?auto=format&fit=crop&q=80&w=800" 
              alt="Pickup Locations" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2 group-hover:text-teal-600 transition-colors">
            Convenient Pickup Locations <ArrowUpRight size={18} />
          </h3>
          <p className="text-slate-600 leading-relaxed">
            From Self Velocity Baner to Self Velocity Kothrud and Self Velocity Katraj, find vehicles across the city locations for easy access.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const TrustStrip = () => (
  <div className="bg-slate-900 border-t border-slate-800 py-12">
    <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8 text-center">
      <div className="space-y-2">
        <ShieldCheck size={32} className="text-amber-400 mx-auto" />
        <h4 className="text-white font-bold">Fully Insured</h4>
        <p className="text-slate-400 text-sm">Partnered with ICICI Lombard</p>
      </div>
      <div className="space-y-2">
        <Car size={32} className="text-amber-400 mx-auto" />
        <h4 className="text-white font-bold">RTO Verified Fleet</h4>
        <p className="text-slate-400 text-sm">Black plate commercial cars</p>
      </div>
      <div className="space-y-2">
        <Clock size={32} className="text-amber-400 mx-auto" />
        <h4 className="text-white font-bold">24/7 Assistance</h4>
        <p className="text-slate-400 text-sm">Roadside help included free</p>
      </div>
      <div className="space-y-2">
        <Star size={32} className="text-amber-400 mx-auto" />
        <h4 className="text-white font-bold">4.8/5 Rated</h4>
        <p className="text-slate-400 text-sm">Based on 1,200+ reviews</p>
      </div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-slate-950 py-12 text-slate-400 text-sm border-t border-slate-900">
    <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8 mb-8">
      <div>
        <div className="text-xl font-black text-white mb-4 flex items-center gap-2">
          <div className="w-6 h-6 bg-amber-400 rounded-tr-lg rounded-bl-lg flex items-center justify-center text-slate-900">
            <Zap size={14} fill="currentColor" />
          </div>
          SELFVELOCITY
        </div>
        <p className="mb-4">Pune's fastest growing premium self-drive car rental platform.</p>
        <div className="flex gap-4 text-white">
          <span className="cursor-pointer hover:text-amber-400">Instagram</span>
          <span className="cursor-pointer hover:text-amber-400">LinkedIn</span>
        </div>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Quick Links</h4>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-amber-400">Fleet</a></li>
          <li><a href="#" className="hover:text-amber-400">Tariff</a></li>
          <li><a href="#" className="hover:text-amber-400">Blog</a></li>
          <li><a href="#" className="hover:text-amber-400">About Us</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Legal</h4>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-amber-400">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-amber-400">Terms & Conditions</a></li>
          <li><a href="#" className="hover:text-amber-400">Cancellation Policy</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Contact</h4>
        <p className="mb-2">HQ: Baner, Pune - 411045</p>
        <p className="mb-2">support@selfvelocity.com</p>
        <p className="text-white font-bold text-lg">+91 98765 43210</p>
      </div>
    </div>
    <div className="container mx-auto px-4 pt-8 border-t border-slate-900 text-center text-xs">
      &copy; 2025 Self Velocity Rentals Pvt Ltd. All rights reserved.
    </div>
  </footer>
);

// 6. Chatbot Component
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-80 mb-4 overflow-hidden border border-slate-100 animate-fade-in-up">
          <div className="bg-slate-900 p-4 flex justify-between items-center">
            <h4 className="text-white font-bold flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              SV Support Bot
            </h4>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white"><X size={18} /></button>
          </div>
          <div className="p-4 h-64 bg-slate-50 overflow-y-auto space-y-4">
            <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm border border-slate-100 text-sm text-slate-600">
              Hi there! 👋 I can help you find a car, check prices, or send documents. What are you looking for today?
            </div>
            <div className="flex gap-2 flex-wrap">
              <button className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full hover:bg-amber-200 transition-colors">Book SUV</button>
              <button className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full hover:bg-amber-200 transition-colors">Check Prices</button>
              <button className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full hover:bg-amber-200 transition-colors">Documents Needed</button>
            </div>
          </div>
          <div className="p-3 border-t border-slate-100 bg-white">
            <div className="flex gap-2">
              <input type="text" placeholder="Type a message..." className="w-full text-sm outline-none" />
              <button className="text-teal-500 font-bold"><Navigation size={16} className="rotate-90" /></button>
            </div>
          </div>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-teal-500 hover:bg-teal-400 text-white p-4 rounded-full shadow-lg shadow-teal-500/40 transition-all transform hover:scale-110"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

const App = () => {
  const [view, setView] = useState('home'); // 'home', 'fleet', 'booking'
  const [selectedCar, setSelectedCar] = useState(null);
  const [filterLocation, setFilterLocation] = useState('');

  // Reset scroll on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen selection:bg-amber-400 selection:text-slate-900">
      {/* Next.js Head Metadata Simulation */}
      {/* <Head>
          <title>Self Velocity | Premium Self-Drive Car Rental Pune</title>
          <meta name="description" content="Book premium self-drive cars in Pune in 90 seconds. RTO verified fleet, zero deposit options, 24/7 roadside assistance." />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head> 
      */}

      <Header currentView={view} setView={setView} />

      <main>
        {view === 'home' && (
          <>
            <Hero setView={setView} setFilterLocation={setFilterLocation} />
            <TrustStrip />
            {/* Added Featured Fleet Section */}
            <FeaturedFleet setView={setView} />
            {/* Replaced LocalSeoSection with InfoGridSection */}
            <InfoGridSection />
          </>
        )}

        {view === 'fleet' && (
          <FleetPage 
            setView={setView} 
            setSelectedCar={setSelectedCar} 
            filterLocation={filterLocation} 
          />
        )}

        {view === 'booking' && selectedCar && (
          <BookingWizard 
            car={selectedCar} 
            setView={setView} 
          />
        )}
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default App;