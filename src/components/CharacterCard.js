import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { IoSkullOutline } from "react-icons/io5";
import { LuHeartPulse } from "react-icons/lu";
import { VscWorkspaceUnknown } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addFavoriteCharacter, removeFavoriteCharacter, resetLimitReachedMessage } from "../features/favoriteCharactersSlice";
import Message from "./Message";

const CharacterCard = ({ character, isFavorite }) => {
    const dispatch = useDispatch();
    const showLimitReachedMessage = useSelector(state => state.favoriteCharacters.showLimitReachedMessage);
    const [isVisible, setIsVisible] = useState(showLimitReachedMessage);

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
            window.confirm('Are you sure you want to remove this character from favorites?') && dispatch(removeFavoriteCharacter(character?.id));
        } else if (!showLimitReachedMessage) {
            dispatch(addFavoriteCharacter(character?.id));
        }
    };

    return (
        <div>
            <Link
                key={character.id}
                to={`/character/${character.id}`}
                className='flex bg-gray-200 rounded-lg shadow-md hover:scale-105 duration-300 hover:text-orange-500 hover:cursor-pointer'>
                <img
                    src={character.image}
                    alt={character.name}
                    className="w-40 rounded-lg" />
                <div className="container p-4 my-2">
                    <h1 className="font-bold">{character.name}</h1>
                    <div className="flex flex-row items-center space-x-2">
                        <h1 className={(character.status === 'Alive') ? "font-thin text-green-500" : (character.status === 'Dead') ? "font-thin text-red-500" : "font-thin text-gray-500"}>{character.status}</h1>
                        {(character.status === 'Alive') ? (
                            <LuHeartPulse className="text-green-500" />
                        ) : (character.status === 'Dead') ? (
                            <IoSkullOutline className="text-red-500" />
                        ) : (
                            <VscWorkspaceUnknown className="text-gray-500" />
                        )}
                    </div>
                    <div className="flex space-x-2">
                        <h1>Species:</h1>
                        <h1 className="font-thin">{character.species}</h1>
                    </div>
                    <div className="flex space-x-2">
                        <h1>Type:</h1>
                        {(character.type === '') ? (
                            <h1 className="font-thin">Unknown</h1>
                        ) : (
                            <h1 className="font-thin">{character.type}</h1>
                        )}
                    </div>
                    <div className="flex space-x-2">
                        <h1>Gender:</h1>
                        <h1 className="font-thin">{character.gender}</h1>
                    </div>
                </div>
            </Link>
            {
                isFavorite &&
                <div className="flex justify-center items-center mt-3">
                    <Button variant="outlined" color="error" onClick={toggleFavorite}>
                        Delete
                    </Button>
                </div>
            }
            {isVisible &&
                <Message
                    title={'Error'}
                    message={'You have exceeded the number of favorite character additions.You must remove another character from favorites.'}
                    severity={'error'}
                />}
        </div>
    )
}

export default CharacterCard;