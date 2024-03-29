import { Link } from "react-router-dom";

const Locations = ({ data }) => {
    return (
        <div className="container mx-auto">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {
                    data?.results.map((location, index) => (
                        <Link
                        to={`/location/${location.id}`}
                        key={index} 
                        className='flex bg-gray-200 space-x-5 p-4 my-2 rounded-lg shadow-md hover:scale-105 duration-300 hover:text-orange-500 hover:cursor-pointer'>
                        <h1 className="font-bold">{location.id}</h1>
                        <div className="flex flex-col ">
                            <h1 className="font-bold">{location.name}</h1>
                            <p>{location.type}</p>
                            <p>{location.dimension}</p>
                        </div>
                    </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Locations;