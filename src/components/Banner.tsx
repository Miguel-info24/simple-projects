import { Link } from 'wouter';
import { Play, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Filme } from '@/types';

interface Props {
  filme: Filme;
}

export default function Banner({ filme }: Props) {
  return (
    <div className="relative w-full h-[500px] bg-black overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={filme.fundo}
          alt={filme.titulo}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
      </div>

      <div className="relative h-full flex flex-col justify-center items-start container">
        <div className="max-w-2xl">
          
          <h1 className="text-6xl md:text-7xl font-black text-white mb-4 leading-tight tracking-tight">
            {filme.titulo}
          </h1>

          <div className="flex items-center gap-4 mb-6 text-neutral-200">
            <span className="text-lg bg-red-600 py-1 px-2 border-2 border-white font-bold">{filme.idade}</span>
            <span className="text-lg">{filme.genero.join(', ')}</span>
          </div>

          <p className="text-lg text-neutral-300 mb-8 max-w-xl leading-relaxed">
            {filme.descricao}
          </p>

          <div className="flex gap-4">
            <Link href={`/filme/${filme.id}`}>
              <a>
                <Button 
                  className="flex items-center gap-2 px-8 py-3  text-white font-bold rounded-lg hover:bg-grey-700 transition-all duration-200 hover:shadow-lg hover:shadow-red-600/50 active:scale-95"
                >
                  <Play size={20} />
                  Assistir
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
