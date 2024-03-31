import { useEffect, useState } from "react";
import CharacterCard from "../../components/CharacterCard";
import Search from "../../components/Search";
import { useSelector } from "react-redux";

const Characters = ({ data }) => {
    const searchText = useSelector(state => state.search.searchText);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (data?.results.length > 0) {
            setFilteredData(
                data?.results.filter((character) =>
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
                    filteredData?.map((character) => (
                        <CharacterCard
                            key={character.id}
                            character={character}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Characters;