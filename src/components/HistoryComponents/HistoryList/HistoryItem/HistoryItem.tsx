import styles from './HistoryItem.module.css';
import type { HistoryItem } from '../../../../api/historyApi';
import fileIcon from '/file.svg';
import smileFace from '/smileFace.svg';
import smileFaceDisabled from '/smileFaceDisabled.svg';
import sadFace from '/sadFace.svg';
import sadFaceDisabled from '/sadFaceDisabled.svg';
import trash from '/trash.svg';
import ItemModal from './ItemModal/ItemModal';
import { useState } from 'react';

export default function HistoryItem({
    item,
    onDelete,
}: {
    item: HistoryItem;
    onDelete: (id: string) => void;
}) {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    return (
        <div className={styles.container}>
            <button
                className={`${styles.record}`}
                disabled={item.result === 'fail'}
                onClick={() => setModalOpen(true)}
            >
                <div className={styles.title}>
                    <img src={fileIcon} className={styles.fileIcon} alt={"Файл"}/>
                    <p className={styles.titleText}>{item.title}</p>
                </div>
                <p>{item.createdAt}</p>
                <div
                    className={`${styles.status} ${item.result === 'success' ? styles.enabled : styles.disabled}`}
                >
                    <p>Обработан успешно</p>
                    {item.result === 'success' ? (
                        <img src={smileFace} alt={"Успех"}/>
                    ) : (
                        <img src={smileFaceDisabled} alt={"Неудача"}/>
                    )}
                </div>
                <div
                    className={`${styles.status} ${item.result === 'fail' ? styles.enabled : styles.disabled}`}
                >
                    <p>Не удалось обработать</p>
                    {item.result === 'success' ? (
                        <img src={sadFaceDisabled} alt={"Успех"}/>
                    ) : (
                        <img src={sadFace} alt={"Неудача"}/>
                    )}
                </div>
            </button>
            <button className={styles.delete} onClick={() => onDelete(item.id)}>
                <img src={trash} alt={"Удалить"}/>
            </button>
            <ItemModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                metrics={item.metrics}
            />
        </div>
    );
}
