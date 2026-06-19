import { Link } from "wouter";
import { House, Search, Radio, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-neutral-900">
      <nav className="container h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <a className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200 ps-6 mr-8">
              <span className="text-3xl font-black text-white">globoplay</span>
            </a>
          </Link>


          <Link href="/">
            <a>
              <Button
                variant="default"
                className="text-sm font-medium text-neutral-300 hover:text-white hover:bg-transparent"
              >
                <House size={20} />
                Início
              </Button>
            </a>
          </Link>
          <Link href="/agrtv">
            <a>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-white hover:bg-transparent"
              >
                <Radio size={20} />
                Agora na TV
              </Button>
            </a>
          </Link>
          <Link href="/novelas">
            <a>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-white hover:bg-transparent"
              >
                Novelas
              </Button>
            </a>
          </Link>
          <Link href="/series">
            <a>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-white hover:bg-transparent"
              >
                Séries
              </Button>
            </a>
          </Link>
          <Link href="/filmes">
            <a>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-white hover:bg-transparent"
              >
                Filmes
              </Button>
            </a>
          </Link>
          <Link href="/infantil">
            <a>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-white hover:bg-transparent"
              >
                Infantil
              </Button>
            </a>
          </Link>
          <Link href="/explore">
            <a>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-white hover:bg-transparent"
              >
                Explorar
              </Button>
            </a>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/buscar">
            <a>
              <Button
                variant="default"
                className="flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-white hover:bg-transparent "
              >
                <Search size={20} />
              </Button>
            </a>
          </Link>

          <Link href="/perfil">
            <a>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-white hover:bg-transparent"
              >
                <User size={20} />
              </Button>
            </a>
          </Link>
        </div>
      </nav>
    </header>
  );
}
