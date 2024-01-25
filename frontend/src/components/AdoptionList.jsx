// AdoptionList.jsx
import PropTypes from 'prop-types';

function AdoptionList({ adoptions, dogs, adopters }) {
    // Si los datos aún no están disponibles, renderiza un mensaje de carga
    if (!adoptions.length || !dogs.length || !adopters.length) {
        return <p>Cargando...</p>;
    }

    return (
        <div className='card'>

            <ul>
                {adoptions.map((adoption) => {
                    const dog = dogs.find((dog) => dog.id === Number(adoption.dogId));
                    const adopter = adopters.find((adopter) => adopter.id === Number(adoption.adopterId));
                    return (
                        <li key={adoption.id}>
                            {dog && ` Examen: ${dog.name}, `}
                            {adopter && `👤 Alumno: ${adopter.name}`}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

AdoptionList.propTypes = {
    adoptions: PropTypes.array.isRequired,
    dogs: PropTypes.array.isRequired,
    adopters: PropTypes.array.isRequired,
};

export default AdoptionList;