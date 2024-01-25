// AddExamForm.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

const AddExamForm = ({ onExamSubmit }) => {
    const [examTitle, setExamTitle] = useState('');
    const [question1, setQuestion1] = useState('');
    const [question2, setQuestion2] = useState('');
    const [question3, setQuestion3] = useState('');
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (examTitle && question1 && question2 && question3 && answer1 && answer2 && answer3) {
            onExamSubmit(examTitle, question1, answer1, question2, answer2, question3, answer3);
            setExamTitle('');
            setQuestion1('');
            setQuestion2('');
            setQuestion3('');
            setAnswer1('');
            setAnswer2('');
            setAnswer3('');
        } else {
            console.error('Debe ingresar todos los campos del examen.');
        }
    };

    return (
        <div className='card'>
            <form onSubmit={handleSubmit}>
                <label>
                    Título del Examen:
                    <input type="text" value={examTitle} onChange={(e) => setExamTitle(e.target.value)} required /><br />
                </label>
                <label>
                    Pregunta 1:
                    <input type="text" value={question1} onChange={(e) => setQuestion1(e.target.value)} required />
                    Respuesta 1:
                    <input type="text" value={answer1} onChange={(e) => setAnswer1(e.target.value)} required />
                </label><br />
                <label>
                    Pregunta 2:
                    <input type="text" value={question2} onChange={(e) => setQuestion2(e.target.value)} required />
                    Respuesta 2:
                    <input type="text" value={answer2} onChange={(e) => setAnswer2(e.target.value)} required />
                </label><br />
                <label>
                    Pregunta 3:
                    <input type="text" value={question3} onChange={(e) => setQuestion3(e.target.value)} required />
                    Respuesta 3:
                    <input type="text" value={answer3} onChange={(e) => setAnswer3(e.target.value)} required />
                </label><br />
                <input type="submit" value="Agregar Examen" />
            </form>
        </div>
    );
};

AddExamForm.propTypes = {
    onExamSubmit: PropTypes.func.isRequired,
};

export default AddExamForm;
