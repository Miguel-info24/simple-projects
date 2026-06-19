import { Link } from 'wouter';
import { Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Movie } from '@/types';

interface Props {
    movie: Movie;
}

export default function MovieCard({ movie }: Props) {

    // Lógica para verificar se o filme está nos favoritos
    const favorite = false;

    const handleFavorite = () => {
        // Lógica para adicionar ou remover dos favoritos
    }

    return (
        <Link href={`/filme/${movie.id}`} className="group inline-block w-[189px] h-[280px] justify-self-start">
            <a >
                <Card className="relative w-full h-full overflow-hidden bg-neutral-900 hover:border-red-600 transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/20 hover:scale-105">

                    <img
                        src={movie.imagem}
                        alt={movie.titulo}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">

                        <h3 className="text-sm font-bold text-white line-clamp-2 mb-2">
                            {movie.titulo}
                        </h3>

                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-neutral-300">
                                {movie.ano}
                            </span>

                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleFavorite();
                                }}
                                variant="ghost"
                                size="xs"
                                className={`p-1.5 rounded-full ${favorite
                                        ? 'bg-red-600 text-white hover:bg-red-700'
                                        : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white'
                                    }`}
                            >
                                <Heart
                                    size={16}
                                    fill={favorite ? 'currentColor' : 'none'}
                                />
                            </Button>
                        </div>

                        <p className="text-xs text-neutral-300 line-clamp-2">
                            {movie.genero.join(', ')}
                        </p>

                    </div>
                </Card>
            </a>
        </Link>
    )
}