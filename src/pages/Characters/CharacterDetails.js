import axios from "axios";
import { useEffect, useState } from "react";
import { IoSkullOutline } from "react-icons/io5";
import { LuHeartPulse } from "react-icons/lu";
import { VscWorkspaceUnknown } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteCharacter, removeFavoriteCharacter, resetLimitReachedMessage } from '../../features/favoriteCharactersSlice';
import { MdFavoriteBorder } from "react-icons/md";
import Message from "../../components/Message";

const CharacterDetails = () => {
    const pathname = useLocation().pathname;
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const showLimitReachedMessage = useSelector(state => state.favoriteCharacters.showLimitReachedMessage);
    const [isVisible, setIsVisible] = useState(showLimitReachedMessage);
    
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

    useEffect(() => {
        setIsVisible(showLimitReachedMessage);

        if (showLimitReachedMessage) {
            const timer = setTimeout(() => {
                dispatch(resetLimitReachedMessage());
                setIsVisible(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showLimitReachedMessage, dispatch]);

    const toggleFavorite = () => {
        if (isFavorite) {
            window.confirm('Are you sure you want to remove this character from favorites?') && dispatch(removeFavoriteCharacter(data?.id));
        } else if (!showLimitReachedMessage) {
            dispatch(addFavoriteCharacter(data?.id));
        }
    };

    const isFavorite = useSelector(state =>
        state.favoriteCharacters.favoriteCharacters.includes(data?.id)
    );

    return (
        <div className="container mx-auto flex">
            <div className="flex items-center py-4 pl-4 my-2 rounded-md bg-gray-200 shadow-md">
                <div className="flex flex-col sm:flex-row space-x-5 justify-between">
                    <div>
                        <img src={data.image} alt={data.name} className="w-[400px]" />
                    </div>
                    <div className="text-xl p-4 space-y-3 items-center">
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
                            <p className="font-bold">Species:</p>
                            <p>{data.species}</p>
                        </div>
                        <div className="flex space-x-1">
                            <p className="font-bold">Type:</p>
                            {(data.type === '') ? (
                                <p>Unknown</p>
                            ) : (
                                <p>{data.type}</p>
                            )}
                        </div>
                        <div className="flex space-x-1">
                            <p className="font-bold">Gender:</p>
                            <p>{data.gender}</p>
                        </div>
                        <div className="flex space-x-1">
                            <p className="font-bold">Origin:</p>
                            <Link
                                to={(data.origin?.name !== 'unknown') ? `/location/${data.origin?.url?.split('/')[5]}` : `#`}
                                className="text-blue-500 hover:underline">
                                {data.origin?.name}</Link>
                        </div>
                        <div className="flex space-x-1">
                            <p className="font-bold">Location:</p>
                            <Link
                                to={(data.location?.name !== 'unknown') ? `/location/${data.location?.url?.split('/')[5]}` : `#`}
                                className="text-blue-500 hover:underline">
                                {data.location?.name}</Link>
                        </div>
                        <div className="flex space-x-1">
                            <p className="font-bold">Episodes:</p>
                            <div className="grid grid-cols-7 sm:grid-cols-12">
                                {data.episode?.map((episode, index) => (
                                    <Link
                                        key={index}
                                        to={`/episode/${episode.split('/')[5]}`}
                                        className="text-blue-500 hover:underline">
                                        <p>{(index !== data.episode.length - 1) ? <p>{episode.split('/')[5]}, </p> : <p>{episode.split('/')[5]}</p>}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <MdFavoriteBorder
                            onClick={toggleFavorite}
                            className={isFavorite ? "text-3xl text-red-500 hover:text-black duration-300" : "text-3xl text-black hover:text-red-500 duration 300"} />
                        {isVisible &&
                            <Message
                                title={'Error'}
                                message={'You have exceeded the number of favorite character additions.You must remove another character from favorites.'}
                                severity={'error'}
                            />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CharacterDetails;