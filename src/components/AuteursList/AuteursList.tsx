import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../constants';
import axios from 'axios';

interface IAuteur {
  _id: string;
  prenom: string;
  nom: string;
  dateNaissance: string;
}

function UserList() {
  const listeVide: IAuteur[] = [];
  const { isLoggedIn, token } = useContext(LoginContext);
  const [auteursList, setAuteursList] = useState(listeVide);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      axios
        .get(`${API_BASE_URL}/auteurs/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setAuteursList(response.data.auteurs));
    }
  }, [isLoggedIn]);

  function handleDelete(auteurId: string) {
    axios
      .delete(`${API_BASE_URL}/auteurs/delete/${auteurId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setAuteursList(auteursList.filter((auteur) => auteur._id !== auteurId));
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de l'auteur:", error);
      });
  }

  function handleEdit(auteurId: string) {
    navigate(`/edit/${auteurId}`);
  }

  return (
    <>
      {auteursList &&
        auteursList.map((auteur) => {
          return (
            <div
              key={auteur._id}
              className="flex flex-row max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="flex flex-row px-3 py-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-1 px-1 rounded-full mr-4"
                  onClick={() => handleEdit(auteur._id)}
                >
                  Éditer
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold text-sm py-1 px-1 rounded-full"
                  onClick={() => handleDelete(auteur._id)}
                >
                  Supprimer
                </button>
              </div>
              <div className="px-6 py-4">
                <div className="text-gray-700 text-base pr-1">
                  {auteur.prenom}
                </div>
                <p className="text-gray-700 text-base">{auteur.nom}</p>
                <p className="text-gray-700 text-base">
                  {auteur.dateNaissance}
                </p>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default UserList;
