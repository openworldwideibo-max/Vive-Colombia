export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <h1 className="text-xl font-bold">
          VIVE
          <span className="text-blue-600">+</span>
          COLOMBIA
        </h1>

        <nav className="hidden gap-8 md:flex">

          <a href="#">Inicio</a>

          <a href="#">Mapa</a>

          <a href="#">Eventos</a>

          <a href="#">Explorar</a>

          <a href="#">Marketplace</a>

          <a href="#">ANDES IA</a>

        </nav>

      </div>
    </header>
  )
}