// App.jsx
import { useState, useEffect } from 'react';
import AdoptionForm from './components/AdoptionForm';
import AdoptionList from './components/AdoptionList';
import AvailableList from './components/AvailableList';
import AddAdopterForm from './components/AddAdopterForm';
import AddExamForm from './components/AddExamForm';
import ExamList from './components/ExamList';


const App = () => {
  const [dogs, setDogs] = useState([]);
  const [adopters, setAdopters] = useState([]);
  const [adoptions, setAdoptions] = useState([]);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dogsResponse = await fetch('http://localhost:3001/dogs');
        const dogsData = await dogsResponse.json();
        setDogs(dogsData);

        const examsResponse = await fetch('http://localhost:3001/exams');
        const examsData = await examsResponse.json();
        setExams(examsData);

        const adoptersResponse = await fetch('http://localhost:3001/adopters');
        const adoptersData = await adoptersResponse.json();
        setAdopters(adoptersData);

        const adoptionsResponse = await fetch('http://localhost:3001/adoptions');
        const adoptionsData = await adoptionsResponse.json();
        setAdoptions(adoptionsData);
      } catch (error) {
        console.error('Error al cargar datos:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleAdoptionSubmit = async (dogId, adopterId) => {
    try {
      const response = await fetch('http://localhost:3001/adoptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dogId,
          adopterId,
        }),
      });

      if (response.ok) {
        const newAdoption = await response.json();
        setAdoptions((prevAdoptions) => [...prevAdoptions, newAdoption]);

        // Mostrar una alerta con los datos de la nueva adopción
        alert(`¡Adopción realizada con éxito!\nID: ${newAdoption.id}\nPerro: ${newAdoption.dogId}\nAdoptante: ${newAdoption.adopterId}`);
      } else {
        throw new Error('Error al enviar la solicitud de adopción.');
      }
    } catch (error) {
      console.error('Error en la solicitud de adopción:', error.message);
      throw error;
    }
  };

  const handleAdopterSubmit = async (adopterName, adopterAddress, province, city, district, neighborhood) => {
    try {
      const response = await fetch('http://localhost:3001/adopters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: adopterName,
          address: adopterAddress,
          province,
          city,
          district,
          neighborhood,
        }),
      });

      if (response.ok) {
        const newAdopter = await response.json();

        // Imprime newAdopter para ver qué propiedades tiene
        console.log(newAdopter);

        if (!newAdopter.id || !newAdopter.name || !newAdopter.address) {
          throw new Error('El nuevo adoptante no tiene ID o nombre o dirección');
        }

        setAdopters((prevAdopters) => [...prevAdopters, newAdopter]);

        // Mostrar una alerta con los datos del nuevo adoptante
        alert(`¡Nuevo adoptante creado con éxito!\nID: ${newAdopter.id}\nNombre: ${newAdopter.name}\nDirección: ${newAdopter.address}\nProvincia: ${newAdopter.province}\nCiudad: ${newAdopter.city}\nDistrito: ${newAdopter.district}\nBarrio: ${newAdopter.neighborhood}`);
      } else {
        throw new Error('Error al crear el nuevo adoptante');
      }
    } catch (error) {
      console.error('Error en la solicitud de nuevo adoptante:', error.message);
      throw error;
    }
  };

  const handleExamSubmit = async (examTitle, question1, answer1, question2, answer2, question3, answer3) => {
    try {
      const response = await fetch('http://localhost:3001/exams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          examTitle,
          questions: [
            { question: question1, answer: answer1 },
            { question: question2, answer: answer2 },
            { question: question3, answer: answer3 },
          ],
        }),
      });

      if (response.ok) {
        const newExam = await response.json();
        setExams((prevExams) => [...prevExams, newExam]);
        alert(`¡Nuevo examen agregado con éxito!\nTítulo: ${newExam.examTitle}`);
      } else {
        throw new Error('Error al enviar el examen.');
      }
    } catch (error) {
      console.error('Error al enviar el examen:', error.message);
      throw error;
    }
  };

  return (
    <div className="App">
      <h1>Nuevo Examen</h1>
      <AddExamForm onExamSubmit={handleExamSubmit} />
      <h1>Listado de Exámenes</h1>
      <ExamList exams={exams} />
      <h1>Lista de Asignacion</h1>
      <AdoptionList adoptions={adoptions} dogs={dogs} adopters={adopters} />
      <h1>Examenes disponibles</h1>
      <AvailableList dogs={dogs} adopters={adopters} />
      <h1>Nuevo Alumno</h1>
      <AddAdopterForm adopters={adopters} onAdopterSubmit={handleAdopterSubmit} />
      <h1>Nueva Asignacion de examenes</h1>
      <AdoptionForm dogs={dogs} adopters={adopters} onAdoptionSubmit={handleAdoptionSubmit} />
    </div>
  );
};

export default App;
