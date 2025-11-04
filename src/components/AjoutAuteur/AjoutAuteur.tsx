import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../contexts/LoginContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AjoutAuteur() {
  const { setPageRedirectAfterLogin, token } = useContext(LoginContext);
  const [id, setId] = useState('');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setPageRedirectAfterLogin('/ajout');
  }, []);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    // former les données de l'auteur à envoyer
    const auteur = {
      id,
      prenom,
      nom,
      dateNaissance,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(config);
    axios
      .post(
        'https://auteursapi-f0h4cgfxg9ceauh3.canadacentral-01.azurewebsites.net/api/auteurs/add',
        { auteur },
        config,
      )
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        alert("Erreur lors de l'ajout de l'auteur");
      });
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Ajout d'un auteur
      </h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ID
          </label>
          <input
            type="text"
            id="id"
            name="id"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter ID"
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Prénom
          </label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Prénom"
            onChange={(e) => setPrenom(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nom
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Nom"
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Date de Naissance
          </label>
          <input
            type="date"
            id="datenaissance"
            name="datenaissance"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setDateNaissance(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Ajouter un auteur
          </button>
        </div>
      </form>
    </div>
  );
}
export default AjoutAuteur;
