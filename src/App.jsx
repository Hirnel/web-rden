import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import ClasesList from "./components/Main/ClasesList";
import ClaseDetails from "./components/Main/ClasesList/ClaseItem/ClaseDetails";
import TalentTree from "./components/Main/ClasesList/ClaseItem/ClaseDetails/TalentTree/TalentTree"
import { ClasesContext } from "./context/clasesContext";
import SubClasesInfo from "./components/Main/SubClasesInfo/SubClasesInfo";
import Razas from "./components/Main/Razas/Razas";
import Arquetipo from "./components/Main/Razas/Arquetipo";
import Grilihim from "./components/Main/Razas/Grilihim";
import Humano from "./components/Main/Razas/Humano";
import Maghuta from "./components/Main/Razas/Maghuta";
import Temere from "./components/Main/Razas/Temere";
import Tsunya from "./components/Main/Razas/Tsunya";
import Yaira from "./components/Main/Razas/Yaira";




function App() {
  const [clases, setClases] = useState([]);
  const [claseSeleccionada, setClaseSeleccionada] = useState(null);

  return (
    <ClasesContext.Provider
      value={{ clases, setClases, claseSeleccionada, setClaseSeleccionada }}
    >
      <Router>
        <Header />
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<ClasesList />} />
            <Route path="/clases" element={<ClasesList />} />
            <Route path="/clases/:id" element={<ClaseDetails />} />
            <Route path="/clases/:id/subclases/:idSubclase" element={<ClaseDetails />} />
            <Route path="/subClasesInfo" element={<SubClasesInfo />} />
            <Route path="/razas" element={<Razas />} />
            <Route path="/razas/arquetipo" element={<Arquetipo />} />
            <Route path="/razas/grilihim" element={<Grilihim />} />
            <Route path="/razas/humano" element={<Humano />} />
            <Route path="/razas/maghuta" element={<Maghuta />} />
            <Route path="/razas/temere" element={<Temere />} />
            <Route path="/razas/tsunya" element={<Tsunya />} />
            <Route path="/razas/yaira" element={<Yaira />} />
            {/* <Route path="/reinos" element={<Reinos />} />
            <Route path="/conquest" element={<Conquest />} /> */}
          </Routes>
        </main>
        <Footer />
      </Router>
    </ClasesContext.Provider>
  );
}

export default App;
