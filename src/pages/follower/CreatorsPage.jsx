import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Search } from 'lucide-react';
import AppLayout from '../../components/layout/AppLayout.jsx';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import Input from '../../components/ui/Input.jsx';
import { getAllCreators } from '../../api/followerService.js';
import { uploadUrl } from '../../utils/media.js';

export default function CreatorsPage() {
    const [query, setQuery] = useState('');
    const [allCreators, setAllCreators] = useState([]);

    useEffect(() => {
        getAllCreators().then(setAllCreators);
    }, []);

    const filtered = allCreators.filter((c) =>
        c.nombre.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <AppLayout title="Creadores">
            <Card className="p-5">
                <div className="flex flex-col gap-3 sm:flex-row">
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Filtrar por nombre"
                    />
                    <Button variant="accent">
                        <Search size={18} />
                        Buscar
                    </Button>
                </div>
            </Card>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
                {filtered.length === 0 && (
                    <div className="md:col-span-2">
                        <EmptyState title="Sin resultados" description="Prueba con otro nombre." />
                    </div>
                )}
                {filtered.map((creator) => (
                    <Card key={creator.id} className="overflow-hidden">
                        <div className="h-28 bg-stone-200">
                            {creator.perfil?.banner && (
                                <img className="h-full w-full object-cover" src={uploadUrl(creator.perfil.banner)} alt="" />
                            )}
                        </div>
                        <div className="p-5">
                            <h2 className="text-lg font-bold text-ink">{creator.nombre}</h2>
                            <p className="mt-1 line-clamp-2 text-sm text-stone-600">{creator.perfil?.descripcion}</p>
                            <Link className="mt-4 inline-block text-sm font-semibold text-berry underline" to={`/seguidor/creadores/${creator.id}`}>
                                Ver perfil
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>
        </AppLayout>
    );
}