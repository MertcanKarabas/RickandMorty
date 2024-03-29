import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const LocationDetails = () => {
    const pathname = useLocation().pathname;
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://rickandmortyapi.com/api/location/${pathname.split('/')[2]}`);
                setData(response);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchData();
    }, [pathname])
    return (
        <div>   
            <h1>{data.data?.name}</h1>
        </div>
    )
}

export default LocationDetails;