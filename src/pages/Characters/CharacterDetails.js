import axios from "axios";
import { useEffect, useState } from "react";
import { IoSkullOutline } from "react-icons/io5";
import { LuHeartPulse } from "react-icons/lu";
import { VscWorkspaceUnknown } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";

const CharacterDetails = () => {
    const pathname = useLocation().pathname;
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://rickandmortyapi.com/api/character/${pathname.split('/')[2]}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchData();
    }, [pathname])
    return (
        <div className="container mx-auto">
            <div className="flex items-center p-4 my-2 rounded-md bg-gray-200 shadow-md">
                <div className="flex flex-col sm:flex-row space-x-5">
                    <div>
                        <img src={data.image} alt={data.name} className="w-[400px]" />
                    </div>
                    <div className="text-xl p-4 space-y-3">
                        <h1 className="font-bold text-3xl">{data.name}</h1>
                        <div className="flex text-xl items-center space-x-2">
                            <h1 className={(data.status === 'Alive') ? "font-thin text-green-500" : (data.status === 'Dead') ? "font-thin text-red-500" : "font-thin text-gray-500"}>{data.status}</h1>
                            {(data.status === 'Alive') ? (
                                <LuHeartPulse className="text-green-500" />
                            ) : (data.status === 'Dead') ? (
                                <IoSkullOutline className="text-red-500" />
                            ) : (
                                <VscWorkspaceUnknown className="text-gray-500" />
                            )}
                        </div>
                        <div className="flex space-x-1">
                            <p>Species:</p>
                            <p>{data.species}</p>
                        </div>
                        <div className="flex space-x-1">
                            <p>Type:</p>
                            {(data.type === '') ? (
                                <p>Unknown</p>
                            ) : (
                                <p>{data.type}</p>
                            )}
                        </div>
                        <div className="flex space-x-1">
                            <p>Gender:</p>
                            <p>{data.gender}</p>
                        </div>
                        <div className="flex space-x-1">
                            <p>Origin:</p>
                            <Link
                                to={(data.origin?.name !== 'unknown') ? `/location/${data.origin?.url?.split('/')[5]}` : `#`}
                                className="text-blue-500 hover:underline">
                                {data.origin?.name}</Link>
                        </div>
                        <div className="flex space-x-1">
                            <p>Location:</p>
                            <Link
                                to={(data.location?.name !== 'unknown') ? `/location/${data.location?.url?.split('/')[5]}` : `#`}
                                className="text-blue-500 hover:underline">
                                {data.location?.name}</Link>
                        </div>
                        <div className="flex space-x-1">
                            <p>Episodes:</p>
                            <div className="grid grid-cols-7 sm:grid-cols-12">
                                {data.episode?.map((episode, index) => (
                                    <Link
                                        key={index}
                                        to={`/episode/${episode.split('/')[5]}`}
                                        className="text-blue-500 hover:underline">
                                        <p>{(index !== data.episode.length-1) ? <p>{episode.split('/')[5]}, </p> : <p>{episode.split('/')[5]}</p>}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CharacterDetails;