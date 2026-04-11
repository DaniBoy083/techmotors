export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-black">
              Tech<span className="text-black">Motors</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-8">
            <a 
              href="/" 
              className="text-gray-700 hover:text-black transition font-medium"
            >
              Home
            </a>
            <a 
              href="/servicos" 
              className="text-gray-700 hover:text-black transition font-medium"
            >
              Serviços
            </a>
            <a 
              href="/contato" 
              className="text-gray-700 hover:text-black transition font-medium"
            >
              Contato
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
