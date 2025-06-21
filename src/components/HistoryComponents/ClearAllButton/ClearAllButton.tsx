import { useHistoryService } from '../../../services/historyService';
import Button from '../../UI/Button/Button';

export default function ClearAllButton() {
    const { clearHistory, isHistory } = useHistoryService();
    
    return <>{isHistory && <Button text={"Очистить всё"} variant='clear' onClick={clearHistory}/>}</>;
}
