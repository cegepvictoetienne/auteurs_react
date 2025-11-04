import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../contexts/LoginContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditAuteur() {
  const { setPageRedirectAfterLogin, token } = useContext(LoginContext);
  const [_id, set_Id] = useState('');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');

  const { auteurid } = useParams();

  useEffect(() => {
    setPageRedirectAfterLogin('/edit/' + auteurid);
  }, []);

  useEffect(() => {
    if (auteurid) {
      axios
        .get(
          `https://auteursapi-f0h4cgfxg9ceauh3.canadacentral-01.azurewebsites.net/api/auteurs/${auteurid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          const { _id, prenom, nom, dateNaissance } = response.data.auteur;
          set_Id(_id);
          setPrenom(prenom);
          setNom(nom);
          setDateNaissance(dateNaissance);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération de l'auteur:", error);
        });
    }
  }, [auteurid]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    // former les données de l'auteur à envoyer
    const auteur = {
      _id,
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
      .put(
        `https://auteursapi-f0h4cgfxg9ceauh3.canadacentral-01.azurewebsites.net/api/auteurs/update`,
        { auteur },
        config,
      )
      .then((response) => {
        console.log('Auteur modifié avec succès:', response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la modification de l'auteur:", error);
      });
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Modification d'un auteur
      </h2>
      <form>
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
            value={prenom}
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
            value={nom}
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
            value={dateNaissance}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Modifier un auteur
          </button>
        </div>
      </form>
    </div>
  );
}
export default EditAuteur;
