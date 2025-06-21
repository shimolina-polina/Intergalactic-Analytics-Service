import { useHistoryService } from '../../../services/historyService';
import Button from '../../UI/Button/Button';

export default function ClearAllButton() {
    const { clearHistory } = useHistoryService();

    return <Button text={"Очистить всё"} variant='clear' onClick={clearHistory}/>;
}
