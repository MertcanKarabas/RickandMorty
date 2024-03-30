import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import Paginate from '@mui/material/Pagination';
import Episodes from '../pages/Episodes/Episodes';
import Characters from '../pages/Characters/Charaters';
import Locations from '../pages/Locations/Locations';

const Pagination = () => {
    const pathname = useLocation().pathname;
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    const URL = 'https://rickandmortyapi.com/api/';
    let path = ''
    if (pathname === '/')
        path = 'episode';
    else if (pathname === '/character')
        path = 'character';
    else if (pathname === '/location')
        path = 'location'

    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${URL}${path}?page=${page}`);
                setData(response);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchData();
    }, [page, path])

    return (
        <div className='flex flex-col items-center my-5'>
            {
                (pathname === '/') ?
                <Episodes
                    data={data?.data} />
                :
                (pathname === '/character') ?
                <Characters
                    data={data?.data} />
                :
                (pathname === '/location') ?
                <Locations
                    data={data?.data} />
                :
                <h1>Something  went wrong...</h1>
            }
            <Paginate
                className='mt-5'
                count={data?.data?.info.pages}
                shape="rounded"
                page={page}
                onChange={handleChange} />
        </div>
    )
}

export default Pagination;