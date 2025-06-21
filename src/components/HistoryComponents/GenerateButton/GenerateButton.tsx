import Button from '../../UI/Button/Button';
import { useNavigate } from 'react-router-dom';

export default function GenerateButton() {
    const navigate = useNavigate();
    return <Button text="Сгенерировать больше" onClick={() => navigate('/generator')} />;
}
