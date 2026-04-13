import { Link } from "@inertiajs/react";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-text px-6">
      {/* Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
      
      <div className="w-full max-w-md text-center space-y-8 animate-fade-in">
        {/* Logo Container */}
        <div className="flex justify-center">
          <div className="bg-white p-4 rounded-full shadow-lg">
            <img
              src="storage/Images/logo.png"
              alt="Cavite Institute Logo"
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>

        {/* Title Section */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="text-primary">Cavite</span>{' '}
            <span className="text-secondary">Institute</span>
          </h1>
          <div className="w-24 h-0.5 bg-accent mx-auto" />
          <p className="text-lg text-text/70 font-medium">
            OLSAT Evaluator System
          </p>
        </div>

        {/* Description */}
        <p className="text-text/60 leading-relaxed max-w-sm mx-auto">
          Welcome! This system helps evaluate student performance based on the 
          Otis-Lennon School Ability Test (OLSAT).
        </p>

        {/* Button */}
        <button className="group relative bg-primary text-white px-8 py-3 rounded-lg cursor-pointer font-semibold shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
          <Link href="/login" className="relative z-10">Get Started</Link>
          <div className="absolute inset-0 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </button>

        {/* Optional: Footer */}
        <div className="text-text/40 text-sm pt-8 space-y-1">
            <p>
                © {new Date().getFullYear()} Cavite Institute. All rights reserved.
            </p>
            <p className="text-text/50">
                Developed by <a href={"https://www.facebook.com/kenortz.kenneth"} className="font-medium text-primary" target="_blank">Aries B. Llesis</a>
            </p>
        </div>
      </div>
    </div>
  );
}