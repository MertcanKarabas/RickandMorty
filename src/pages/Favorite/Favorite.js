import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CharacterCard from "../../components/CharacterCard";
import Search from "../../components/Search";

const Favorite = () => {
    const [data, setData] = useState([]);
    const favoriteCharactersID = useSelector(state => state.favoriteCharacters.favoriteCharacters);
    const searchText = useSelector(state => state.search.searchText);
    const [filteredData, setFilteredData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://rickandmortyapi.com/api/character/${favoriteCharactersID}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };
        fetchData();
    }, [favoriteCharactersID])

    useEffect(() => {
        if (data?.length > 0) {
            setFilteredData(
                data?.filter((character) =>
                character.name.toLowerCase().includes(searchText.toLowerCase()) ||
                character.species.toLowerCase().includes(searchText.toLowerCase()) ||
                character.type.toLowerCase().includes(searchText.toLowerCase()) ||
                character.gender.toLowerCase().includes(searchText.toLowerCase())
                )
            );
        }
    }, [searchText, data])
    return (
        <div className="container mx-auto">
            <Search />
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {
                    (filteredData.length > 0) ?
                        filteredData?.map((character) => (
                            <div key={character.id}> {/* Her karakter için unique key ekleyin */}
                                <CharacterCard
                                    character={character}
                                    isFavorite={true}
                                />
                            </div>
                        )) : <h1>You do not have any favorite characters.</h1>
                }
            </div>
        </div>
    )
}

export default Favorite;
