import { Link } from "react-router-dom";
import { ArrowRight, Building, Users, TrendingUp } from "lucide-react";
import { CheckCircle, DollarSign, BookOpen, Handshake } from "lucide-react";
import { Award, Globe } from "lucide-react";
import Spline from "@splinetool/react-spline";

export default function WelcomePage() {
  const benefits = [
    {
      icon: CheckCircle,
      title: "Proven Business Model",
      description:
        "All franchises come with tested and successful business models with track records.",
    },
    {
      icon: DollarSign,
      title: "Investment Transparency",
      description:
        "Clear investment requirements and expected returns for every franchise opportunity.",
    },
    {
      icon: BookOpen,
      title: "Training & Support",
      description:
        "Comprehensive training programs and ongoing support from franchise partners.",
    },
    {
      icon: Handshake,
      title: "Trusted Network",
      description:
        "Connect with verified franchise partners and successful business owners.",
    },
  ];

  return (
    <section className="relative py-20 px-4 text-center font-bold overflow-hidden">
      <style>{`
        /* Hide Spline watermark/link on this page */
        .spline-container { pointer-events: none; }
        .spline-container a[href*="spline.design"],
        .spline-container .watermark,
        .spline-container [data-watermark],
        .spline-container [aria-label*="Spline"],
        .spline-container [title*="Spline"],
        .spline-container [class*="watermark"],
        /* Fallback global selectors active only while this page is mounted */
        a[href*="spline.design"],
        [data-watermark],
        [aria-label*="Spline"],
        [title*="Spline"],
        [class*="spline-watermark"],
        [class*="SplineWatermark"] {
          display: none !important;
        }
      `}</style>
      {/* Black background behind everything (covers viewport to sit behind transparent navbar) */}
      <div className="fixed inset-0 bg-black -z-20"></div>

      {/* Spline background */}
      <div className="fixed inset-0 -z-10 spline-container">
        <Spline scene="https://prod.spline.design/nF9PB33JkBVibZpN/scene.splinecode" />
      </div>

      {/* Hero Section */}
      <div className="container mx-auto max-w-4xl relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-pink-500 to-green-500 bg-clip-text text-transparent">
          Find Your Perfect Franchise Opportunity
        </h1>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Discover profitable franchise opportunities across various industries.
          From education to retail, we connect entrepreneurs with the right
          franchise partners.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-white" />
            <span className="font-medium text-white">500+ Franchises</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-white" />
            <span className="font-medium text-white">Trusted Partners</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-white" />
            <span className="font-medium text-white">Proven Success</span>
          </div>
        </div>

        <Link to="/categories">
          <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center gap-2 mx-auto">
            Explore Franchises
            <ArrowRight className="w-5 h-5" />
          </button>
        </Link>
      </div>

      {/* Why Choose Section */}
      <div className="container mx-auto mt-20 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Why Choose FranchiseHub?
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            We make finding and starting your franchise journey simple,
            transparent, and successful.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gray-700/70 p-6 rounded-2xl text-center shadow-sm hover:shadow-lg transition-all duration-300 
    transform hover:-translate-y-2"
            >
              <div className="mx-auto w-12 h-12 bg-indigo-700 http://localhost:5173/ rounded-full flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">
                {benefit.title}
              </h3>
              <p className="text-gray-200">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="container mx-auto mt-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              About FranchiseHub
            </h2>
            <p className="text-lg text-gray-200 mb-6">
              We are the leading platform connecting aspiring entrepreneurs with
              established franchise opportunities. Our mission is to simplify
              the franchise discovery process and help you find the perfect
              business opportunity that matches your goals, budget, and
              expertise.
            </p>
            <p className="text-lg text-gray-200 mb-8">
              With over a decade of experience in the franchise industry, we've
              helped thousands of entrepreneurs start successful businesses
              across various sectors including education, retail, food service,
              and professional services.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-500 mb-1">
                  500+
                </div>
                <div className="text-sm text-gray-200">Franchises</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500 mb-1">
                  10K+
                </div>
                <div className="text-sm text-gray-200">Success Stories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-500 mb-1">
                  50+
                </div>
                <div className="text-sm text-gray-200">Industries</div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="space-y-6">
            <div className="bg-gray-700/60  p-6 rounded-xl flex items-start gap-4 shadow-sm hover:shadow-md transition-all duration-300 
    transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-indigo-600 bg-opacity-30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-white">Expert Guidance</h3>
                <p className="text-gray-200">
                  Our team of franchise experts provides personalized guidance
                  throughout your journey.
                </p>
              </div>
            </div>

            <div className="bg-gray-700/60 p-6 rounded-xl flex items-start gap-4 shadow-sm hover:shadow-mdtransition-all duration-300 
    transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-green-600 bg-opacity-30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-white">
                  Verified Opportunities
                </h3>
                <p className="text-gray-200">
                  All franchise opportunities are thoroughly vetted for
                  legitimacy and potential.
                </p>
              </div>
            </div>

            <div className="bg-gray-700/60 p-6 rounded-xl flex items-start gap-4 shadow-sm hover:shadow-mdtransition-all duration-300 
    transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-pink-600 bg-opacity-30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-white">
                  Nationwide Network
                </h3>
                <p className="text-gray-200">
                  Access franchise opportunities across the country in various
                  markets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
