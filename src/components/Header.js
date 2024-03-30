import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
    const pathname = useLocation().pathname;
    const splittedPath = pathname.split('/')[1];

    return (
        <header className="container mx-auto">
            <div className=" flex flex-row justify-between items-center font-light my-3">
                <div className="font-bold text-3xl">
                    <NavLink to={'/'}>Rick and Morty</NavLink>
                </div>
                <div>
                    <div className="flex flex-row space-x-10">
                        <NavLink to={'/'} className={(splittedPath === '' || splittedPath === 'episode') ? "text-blue-600 cursor-pointer" : "hover:text-blue-600 cursor-pointer"}>Episodes</NavLink>
                        <NavLink to={'/character'} className={(splittedPath === 'character') ? "text-blue-600 cursor-pointer" : "hover:text-blue-600 cursor-pointer"}>Characters</NavLink>
                        <NavLink to={'/location'} className={(splittedPath === 'location') ? "text-blue-600 cursor-pointer" : "hover:text-blue-600 cursor-pointer"}>Locations</NavLink>
                        <NavLink to={'/favorite'} className={(splittedPath === 'favorite') ? "text-blue-600 cursor-pointer" : "hover:text-blue-600 cursor-pointer"}>Favorites</NavLink>
                    </div>
                </div>
            </div>
            <hr />
        </header>
    )
}

export default Header;