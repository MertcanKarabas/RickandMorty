import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const EpisodeDetails = () => {
    const pathname = useLocation().pathname;
    const [data, setData] = useState([]);

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
    return (
        <div className="container mx-auto">   
            <div className="flex items-center p-4 my-2 rounded-md shadow-md bg-gray-200">
                <div>
                    <h1>{data.name}</h1>
                </div>
            </div>
        </div>
    )
}

export default EpisodeDetails;