import styles from './HistoryItem.module.css';
import type { HistoryItem } from '../../../../api/historyApi';
import fileIcon from '/file.svg'
import smileFace from '/smileFace.svg'
import smileFaceDisabled from '/smileFaceDisabled.svg'
import sadFace from '/sadFace.svg'
import sadFaceDisabled from '/sadFaceDisabled.svg'
import trash from '/trash.svg'

export default function HistoryItem({ item, onDelete }: { item: HistoryItem, onDelete: (id: string) => void; }) {
    return (
        <div className={styles.container}>
            <div className={styles.record}>
                <div className={styles.title}>
                    <img src={fileIcon} className={styles.fileIcon}/>
                    <p className={styles.titleText}>{item.title}</p>
                </div>
                <p>{item.createdAt}</p>
                <div className={`${styles.status} ${item.result === 'success'? styles.enabled : styles.disabled}`}>
                    <p>Обработан успешно</p>
                    {item.result === 'success'? <img src={smileFace}/> : <img src={smileFaceDisabled}/>}
                </div>
                <div className={`${styles.status} ${item.result === 'fail'? styles.enabled : styles.disabled}`}>
                    <p>Не удалось обработать</p>
                    {item.result === 'success'? <img src={sadFaceDisabled}/> : <img src={sadFace}/>}
                </div>
            </div>
            <button className={styles.delete} onClick={() => onDelete(item.id)}>
                <img src={trash}/>
            </button>
        </div>
    );
}
