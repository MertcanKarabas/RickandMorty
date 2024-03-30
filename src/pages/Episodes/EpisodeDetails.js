import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const EpisodeDetails = () => {
    const pathname = useLocation().pathname;
    const [data, setData] = useState([]);
    const [allCharacters, setAllCharacters] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://rickandmortyapi.com/api/episode/${pathname.split('/')[2]}`);
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
                const characterPromises = data.characters.map(async (characterUrl) => {
                    try {
                        const response = await axios.get(characterUrl);
                        return response.data;
                    } catch (error) {
                        console.error('Error fetching character:', error);
                        return null;
                    }
                });
                const charactersData = await Promise.all(characterPromises);
                setAllCharacters(charactersData.filter(character => character !== null));
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };

        if (data.characters) {
            getCharacters();
        }
    }, [data.characters]);


    return (
        <div className="container mx-auto">
            <div className="items-center p-4 my-2 rounded-md shadow-md bg-gray-200">
                <div>
                    <div className="flex space-x-1">
                        <h1 className="font-bold">Name: </h1>
                        <h1>{data.name}</h1>
                    </div>
                    <div className="flex space-x-1">
                        <h1 className="font-bold">Episode: </h1>
                        <h1>{data.episode}</h1>
                    </div>
                    <div className="flex space-x-1">
                        <h1 className="font-bold">Air Date: </h1>
                        <h1>{data.air_date}</h1>
                    </div>
                    <div className="flex flex-col space-x-1">
                        <h1 className="font-bold">Characters in Episode: </h1>
                        <div className="mt-5 grid grid-cols-3 sm:grid-cols-5 gap-y-5">
                            {
                                (allCharacters?.length > 0) && allCharacters.map((character) => {
                                    return (
                                        <div className="container w-48 h-48">
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
                                })
                            }
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EpisodeDetails;