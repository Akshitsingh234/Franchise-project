import { useState } from "react";
import {
  UserPlus,
  User,
  IdCard,
  MapPin,
  Goal,
  Mail,
  Phone,
  CalendarClock,
  Send,
  CheckCircle2,
} from "lucide-react";

export default function UserRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    userId: "",
    location: "",
    intent: "",
    email: "",
    phone: "",
    contactTime: "",
  });

  const [message, setMessage] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
const [visible, setVisible] = useState(false);

 

const handleMouseMove = (e) => {
  setMousePos({ x: e.clientX, y: e.clientY });
  setVisible(true);

  clearTimeout(window.spotlightTimeout);
  window.spotlightTimeout = setTimeout(() => {
    setVisible(false);
  }, 700); // 🔹 fast fade
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("✅ Registration successful!");
        setFormData({
          name: "",
          userId: "",
          location: "",
          intent: "",
          email: "",
          phone: "",
          contactTime: "",
        });
      } else {
        setMessage("❌ Failed to register user.");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Error connecting to server.");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-black text-white relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Background with waves */}
      <div
        className="absolute inset-0 transition-opacity duration-500 z-0"
        style={{
          background: visible
            ? `
              radial-gradient(
                circle at ${mousePos.x}px ${mousePos.y}px,
                rgba(255,255,255,0.08),
                transparent 200px
              ),
              repeating-radial-gradient(
                circle at ${mousePos.x}px ${mousePos.y}px,
                rgba(255,255,255,0.02) 0,
                transparent 30px
              )
            `
            : "transparent",
          backgroundSize: "200% 200%",
          animation: visible ? "waveMotion 6s infinite linear" : "none",
          opacity: visible ? 1 : 0,
        }}
      />

   
    {/* Content Above */}
  <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <UserPlus className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            User Registration
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-300 max-w-3xl mx-auto">
            Register your interest in franchise opportunities. Our team will
            review your details and contact you with relevant matches.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Left: Highlights */}
          <div className="order-2 lg:order-1 bg-white/70 backdrop-blur rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 transition-all duration-300 transform hover:-translate-y-2">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Why register?
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 w-5 h-5 text-emerald-600 flex-shrink-0" />
                Get matched with curated franchise opportunities.
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 w-5 h-5 text-emerald-600 flex-shrink-0" />
                Priority contact from our support team.
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 w-5 h-5 text-emerald-600 flex-shrink-0" />
                Personalized recommendations based on your goals and location.
              </li>
            </ul>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-blue-100 p-4 bg-blue-50">
                <div className="flex items-center gap-3">
                  <Goal className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Average response</p>
                    <p className="font-semibold text-gray-900">24-48 hours</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-purple-100 p-4 bg-purple-50">
                <div className="flex items-center gap-3">
                  <CalendarClock className="w-5 h-5 text-purple-700" />
                  <div>
                    <p className="text-sm text-gray-500">Scheduling flexibility</p>
                    <p className="font-semibold text-gray-900">
                      Your preferred time
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="order-1 lg:order-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white/70 backdrop-blur rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 transition-all duration-300 transform hover:-translate-y-2"
            >
              {message && (
                <div className="mb-5 rounded-lg border border-blue-200 bg-blue-50 text-blue-800 px-4 py-3 text-sm sm:text-base">
                  {message}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Full name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full rounded-lg border text-black border-gray-300 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* User ID */}
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    User ID
                  </label>
                  <div className="relative">
                    <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
                    <input
                      type="text"
                      name="userId"
                      value={formData.userId}
                      onChange={handleChange}
                      placeholder="e.g., JD-1024"
                      className="w-full rounded-lg border text-black border-gray-300 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, Country"
                      className="w-full rounded-lg border text-black border-gray-300 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Intent */}
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Intent / Goal
                  </label>
                  <div className="relative">
                    <Goal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
                    <input
                      type="text"
                      name="intent"
                      value={formData.intent}
                      onChange={handleChange}
                      placeholder="What are you looking for?"
                      className="w-full rounded-lg border text-black border-gray-300 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-lg border text-black border-gray-300 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 555 123 4567"
                      pattern="^[+]?[0-9 ()-]{7,}$"
                      className="w-full rounded-lg border text-black border-gray-300 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Contact Time */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-black mb-1">
                    Preferred contact time
                  </label>
                  <div className="relative">
                    <CalendarClock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
                    <input
                      type="datetime-local"
                      name="contactTime"
                      value={formData.contactTime}
                      onChange={handleChange}
                      className="w-full rounded-lg border text-black border-gray-300 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              >
                <Send className="w-4 h-4" /> Submit Registration
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
      </div>

  );
}
