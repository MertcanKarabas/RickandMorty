import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Episodes from './pages/Episodes/index';
import Characters from './pages/Characters/index';
import Locations from './pages/Locations/index';
import Search from './pages/Search/index';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import CharacterDetails from './pages/Characters/CharacterDetails';
import LocationDetails from './pages/Locations/LocationDetails';
import EpisodeDetails from './pages/Episodes/EpisodeDetails';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Episodes />} />
        <Route path="episode/:id" element={<EpisodeDetails />} />
        <Route path="character" element={<Characters />} />
        <Route path="character/:id" element={<CharacterDetails />} />
        <Route path="location" element={<Locations />} />
        <Route path="location/:id" element={<LocationDetails />} />
        <Route path="search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
