import { useState } from 'react';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import SearchBar from '@/components/SearchBar';
import Card from '@/components/Card';
import type { Filme } from '@/types';
import dadosFilmes from '@/data/movies.json';

export default function Home() {
    
    const [Filmes] = useState<Filme[]>(dadosFilmes);

    return (
        <div className="min-h-screen bg-black px-4">
            <Header />
            <Banner filme={Filmes[0]} />
            <section className="bg-black pt-12 pb-20">
                <div className="container">
            
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {
                            Filmes.map((filme) => (
                                <Card key={filme.id} movie={filme} />
                            ))
                        }
                    </div>
                </div>
            </section>
        </div>
    );
}