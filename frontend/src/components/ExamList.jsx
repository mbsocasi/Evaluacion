// ExamList.jsx
import PropTypes from 'prop-types';

const ExamList = ({ exams }) => {
    return (
        <div className='card'>
            <h2>Listado de Exámenes</h2>
            <ul>
                {exams.map((exam) => (
                    <li key={exam.examTitle}>
                        <strong>Título:</strong> {exam.examTitle}<br />
                        <strong>Pregunta 1:</strong> {exam.questions[0].question} - <strong>Respuesta 1:</strong> {exam.questions[0].answer}<br />
                        <strong>Pregunta 2:</strong> {exam.questions[1].question} - <strong>Respuesta 2:</strong> {exam.questions[1].answer}<br />
                        <strong>Pregunta 3:</strong> {exam.questions[2].question} - <strong>Respuesta 3:</strong> {exam.questions[2].answer}<br />
                    </li>
                ))}
            </ul>
        </div>
    );
};

ExamList.propTypes = {
    exams: PropTypes.array.isRequired,
};

export default ExamList;
