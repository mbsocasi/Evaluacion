// AddAdopterForm.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

const AddAdopterForm = ({ onAdopterSubmit }) => {
    const [adopterName, setAdopterName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (adopterName) {
            onAdopterSubmit(adopterName);
            setAdopterName('');
        } else {
            console.error('Debe ingresar el nombre del adoptante.');
        }
    };

    return (
        <div className='card'>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input type="text" value={adopterName} onChange={(e) => setAdopterName(e.target.value)} required />
                </label>
                <input type="submit" value="Agregar Alumno" />
            </form>
        </div>
    );
};

AddAdopterForm.propTypes = {
    onAdopterSubmit: PropTypes.func.isRequired,
};

export default AddAdopterForm;
