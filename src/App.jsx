import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import ClasesList from "./components/Main/ClasesList";
import ClaseDetails from "./components/Main/ClasesList/ClaseItem/ClaseDetails";
import TalentTree from "./components/Main/ClasesList/ClaseItem/ClaseDetails/TalentTree/TalentTree"
import { ClasesContext } from "./context/clasesContext";
import SubClases from "./components/Main/SubClasesInfo/SubClasesInfo";


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
            <Route path="/SubClasesInfo" element={<SubClases />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </ClasesContext.Provider>
  );
}

export default App;
