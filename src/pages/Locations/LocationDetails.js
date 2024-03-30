import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const LocationDetails = () => {
    const pathname = useLocation().pathname;
    const [data, setData] = useState([]);
    const [allLocations, setAllLocations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://rickandmortyapi.com/api/location/${pathname.split('/')[2]}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchData();
    }, [pathname])

    useEffect(() => {
        const getCharacters = async () => {
            try {
                const characterPromises = data.residents.map(async (characterUrl) => {
                    try {
                        const response = await axios.get(characterUrl);
                        return response.data;
                    } catch (error) {
                        console.error('Error fetching character:', error);
                        return null;
                    }
                });
                const charactersData = await Promise.all(characterPromises);
                setAllLocations(charactersData.filter(residents => residents !== null));
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };

        if (data.residents) {
            getCharacters();
        }
    }, [data.residents]);

    return (
        <div className="container mx-auto">
            <div className="flex items-center p-4 my-2 rounded-md shadow-md bg-gray-200">
                <div>
                    <div className="flex space-x-1">
                        <h1>Name: </h1>
                        <h1>{data.name}</h1>
                    </div>
                    <div className="flex space-x-1">
                        <h1>Type: </h1>
                        <h1>{data.type}</h1>
                    </div>
                    <div className="flex space-x-1">
                        <h1>Dimension: </h1>
                        <h1>{data.dimension}</h1>
                    </div>
                    <div className="flex flex-col space-x-1">
                        <h1>Residents in Episode: </h1>
                        <div className={`${allLocations.length === 0 ? '' : 'grid grid-cols-3 sm:grid-cols-5 '}`}>
                            {
                                (allLocations?.length > 0) ?
                                    allLocations.map((character) => {
                                        return (
                                            <Link
                                                to={`/character/${character.id}`}
                                                key={character.id}
                                                className="flex flex-col items-center justify-center text-center">
                                                <img
                                                    src={character.image}
                                                    alt={character.name}
                                                    className="rounded-full w-20 h-20 " />
                                                <p>{character.name}</p>
                                            </Link>
                                        )
                                    }) :
                                    <p className="">There are no residents in this location.</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LocationDetails;