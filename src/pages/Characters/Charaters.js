import { Link } from "react-router-dom";
import { LuHeartPulse } from "react-icons/lu";
import { IoSkullOutline } from "react-icons/io5";
import { VscWorkspaceUnknown } from "react-icons/vsc";

const Characters = ({ data }) => {

    return (
        <div className="container mx-auto">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {
                    data?.results.map((character, index) => (
                        <Link
                            key={index}
                            to={`/character/${character.id}`}
                            className='flex bg-gray-200 rounded-lg shadow-md hover:scale-105 duration-300 hover:text-orange-500 hover:cursor-pointer'>
                            <img
                                src={character.image}
                                alt={character.name}
                                className="w-40 rounded-lg" />
                            <div className="p-4 my-2">
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
                    ))
                }
            </div>
        </div>
    )
}

export default Characters;