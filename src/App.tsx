import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronRight, ArrowRight } from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import LoadingScreen from './components/LoadingScreen';

const stats = [
  { value: '250+', label: 'projects' },
  { value: '180+', label: 'clients' },
  { value: '15+', label: 'experience' },
  { value: '50+', label: 'employees' },
];

const projects = [
  {
    image: "https://vialbania.com/wp-content/uploads/2023/11/Akses-Prezantim-Business-English-Small_Page_15-edited.jpg",
    title: "Modern Office Building",
    category: "Commercial"
  },
  {
    image: "https://a0.muscache.com/im/pictures/73171022-a214-4d1d-9200-a68226d8f787.jpg?aki_policy=large",
    title: "Luxury Residential Complex",
    category: "Residential"
  },
  {
    image: "https://www.molon.de/galleries/Albania/Tirana/images01/15%20Toptani%20shopping%20mall.jpg",
    title: "Shopping Mall",
    category: "Commercial"
  },
  {
    image: "https://media.istockphoto.com/id/855680246/photo/building-with-large-h-sign-for-hospital.webp?a=1&b=1&s=612x612&w=0&k=20&c=DAHGmJRdmNaLc7Z1H-F1lNhRSb6Q7eVTnDNNli7iZF8=",
    title: "Modern Hospital",
    category: "Healthcare"
  }
];

function MainApp() {
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { translations, language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 96; // height of navbar (24 * 4 = 96px)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      
      <div className="min-h-screen bg-[#1b1b1b] text-[#e0e0e0]">
        {/* Navigation */}
        <nav className="fixed w-full bg-[#1b1b1b]/90 backdrop-blur-sm z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-24">
              <div className="flex items-center">
                <span 
                  className="text-3xl font-bold text-[#c17f59] cursor-pointer" 
                  onClick={() => scrollToSection('home')}
                >
                  Ballo SH.P.K
                </span>
              </div>
              
              <div className="hidden md:flex items-center space-x-12">
                {Object.entries(translations.nav).map(([key, value]) => (
                  <button 
                    key={key} 
                    onClick={() => scrollToSection(key)}
                    className="text-sm uppercase tracking-widest hover:text-[#c17f59] transition-colors relative group"
                  >
                    {value}
                    <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#c17f59] transition-all duration-300 group-hover:w-full"></span>
                  </button>
                ))}
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2 hover:text-[#c17f59] transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  <span>{language.toUpperCase()}</span>
                </button>
              </div>

              <div className="md:hidden flex items-center">
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-[#1b1b1b] border-t border-[#333]">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {Object.entries(translations.nav).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => scrollToSection(key)}
                    className="w-full text-left px-3 py-2 text-sm uppercase tracking-widest hover:text-[#c17f59] transition-colors"
                  >
                    {value}
                  </button>
                ))}
                <button
                  onClick={toggleLanguage}
                  className="w-full text-left px-3 py-2 hover:text-[#c17f59] transition-colors flex items-center space-x-2"
                >
                  <Globe className="w-5 h-5" />
                  <span>{language.toUpperCase()}</span>
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="home" className="relative h-screen">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80"
              alt="Modern Building"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/50" />
          </div>
          <div className="relative h-full flex items-center px-4 max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">{translations.hero.title}</h1>
              <p className="text-xl md:text-2xl mb-16 text-gray-300 leading-relaxed">{translations.hero.subtitle}</p>
              <button 
                className="bg-[#c17f59] text-white px-10 py-5 font-medium hover:bg-[#a66d4b] transition-colors flex items-center group space-x-4"
                onClick={() => scrollToSection('contact')}
              >
                <span className="uppercase tracking-widest">{translations.hero.cta}</span>
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </section>

          {/* About Us Section */}
<section id="about" className="py-32 px-4 bg-[#252525]">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    {/* Image Section */}
    <div className="rounded-lg overflow-hidden">
      <img
        src="https://media.istockphoto.com/id/2164305033/photo/happy-project-manager-greeting-a-construction-worker-in-the-building.webp?a=1&b=1&s=612x612&w=0&k=20&c=pDIAp_9Gjf5-UHzRn98g4P220dXNbGW9BRFFCtJ4aUk="
        alt="About Us"
        
        className="w-11/12 h-[416px] object-cover rounded-lg"
      />
    </div>

    {/* Text Section */}
    <div className="text-left">
      <h2 className="text-4xl md:text-5xl font-bold text-[#c17f59] mb-6">Building Excellence Since 1998</h2>
      <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
        With over two decades of experience, Ballo SH.P.K has established itself as a leader in construction and architectural innovation. Our commitment to quality, sustainability, and client satisfaction has earned us a reputation for excellence in the industry.
      </p>
    </div>
  </div>
</section>



        {/* Services Section */}
        <section id="services" className="py-32 px-4 bg-[#252525]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-24 text-center">{translations.services.title}</h2>
            <div className="grid md:grid-cols-3 gap-16">
              {translations.services.items.map((service, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="aspect-[4/3] mb-8 overflow-hidden relative">
                    <img
                      src={[
                        "https://media.istockphoto.com/id/1944772735/photo/closeup-of-team-of-industrial-engineers-meeting-analyze-machinery-blueprints-consult-project.webp?a=1&b=1&s=612x612&w=0&k=20&c=3L6GzV-g6fSfZrrhudYguwCTSpQV84hrvlY3FhWpx9E=",
                        "https://media.istockphoto.com/id/1418201298/photo/cad-home-insulation.webp?a=1&b=1&s=612x612&w=0&k=20&c=Mp4qZ7dlbRoq_71p0urRlQ2w1SkryZQGmFPfBpfUjhI=",
                        "https://media.istockphoto.com/id/1485996637/photo/top-view-team-engineer-building-inspection-use-tablet-computer-and-blueprint-working-at.webp?a=1&b=1&s=612x612&w=0&k=20&c=bwQgxdmKYaZWbwCsb7smt6BK9R3YTl-WWg5Ostl_yXw="
                      ][index]}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-[#c17f59] group-hover:text-[#a66d4b] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-24 text-center">Our Projects</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {projects.map((project, index) => (
                <div key={index} className="group cursor-pointer relative overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-[#c17f59] uppercase tracking-widest text-sm">{project.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="py-32 px-4 bg-[#252525]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl md:text-6xl font-bold text-[#c17f59] mb-4">{stat.value}</div>
                  <div className="text-sm uppercase tracking-widest">{translations.stats[stat.label as keyof typeof translations.stats]}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-24">{translations.contact.title}</h2>
            <form className="space-y-10">
              <div>
                <label className="block mb-3 uppercase text-sm tracking-widest">{translations.contact.name}</label>
                <input
                  type="text"
                  className="w-full px-6 py-4 bg-[#252525] focus:outline-none focus:border-[#c17f59] border-b-2 border-transparent transition-colors"
                />
              </div>
              <div>
                <label className="block mb-3 uppercase text-sm tracking-widest">{translations.contact.email}</label>
                <input
                  type="email"
                  className="w-full px-6 py-4 bg-[#252525] focus:outline-none focus:border-[#c17f59] border-b-2 border-transparent transition-colors"
                />
              </div>
              <div>
                <label className="block mb-3 uppercase text-sm tracking-widest">{translations.contact.message}</label>
                <textarea
                  rows={6}
                  className="w-full px-6 py-4 bg-[#252525] focus:outline-none focus:border-[#c17f59] border-b-2 border-transparent transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#c17f59] text-white py-5 font-medium hover:bg-[#a66d4b] transition-colors uppercase tracking-widest"
              >
                {translations.contact.submit}
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-[#333]">
          <div className="max-w-7xl mx-auto text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Ballo SH.P.K. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}

export default App;