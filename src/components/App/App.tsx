import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../Login';
import AuteursList from '../AuteursList';
import Menu from '../Menu';
import LoginProvider from '../../contexts/LoginContext';
import AjoutAuteur from '../AjoutAuteur';
import EditAuteur from '../EditAuteur';

function App() {
  return (
    <>
      <LoginProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Menu />}>
              <Route index element={<AuteursList />} />
              <Route path="ajout" element={<AjoutAuteur />} />
              <Route path="edit/:auteurid" element={<EditAuteur />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </LoginProvider>
    </>
  );
}

export default App;
