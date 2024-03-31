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
            <div className="items-center p-4 my-2 rounded-md shadow-md bg-gray-200">
                <div>
                    <div className="flex space-x-1">
                        <h1 className="font-bold">Name: </h1>
                        <h1>{data.name}</h1>
                    </div>
                    <div className="flex space-x-1">
                        <h1 className="font-bold">Type: </h1>
                        <h1>{data.type}</h1>
                    </div>
                    <div className="flex space-x-1">
                        <h1 className="font-bold">Dimension: </h1>
                        <h1>{data.dimension}</h1>
                    </div>
                    <div className="flex flex-col space-x-1">
                        <h1 className="font-bold">Residents in Episode: </h1>
                        <div className={`${allLocations.length === 0 ? '' : 'mt-5 grid grid-cols-3 sm:grid-cols-5 gap-y-5 '}`}>
                            {
                                (allLocations?.length > 0) ?
                                    allLocations.map((character) => {
                                        return (
                                            <div className="container w-48 h-48" key={character.id}>
                                                <div className="bg-white rounded-md shadow-md p-4">
                                                   <Link
                                                        to={`/character/${character.id}`}
                                                        key={character.id}
                                                        className=" flex flex-col items-center justify-center text-center">
                                                        <img
                                                            src={character.image}
                                                            alt={character.name}
                                                            className="rounded-full w-20 h-20 " />
                                                        <p>{character.name}</p>
                                                    </Link>
                                                </div>
                                            </div>
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