import { createPortal } from 'react-dom';
import styles from './ItemModal.module.css';
import type { NormalizedResult } from '../../../../../utils/normalizeMetrics';
import { metricsMap } from '../../../../AnalyticsComponents/Highlights/Highlights';

export default function ItemModal({
    open,
    onClose,
    metrics,
}: {
    open: boolean;
    onClose: () => void;
    metrics: NormalizedResult | undefined;
}) {
    return createPortal(
        <>
            {open && metrics !== undefined && (
                <div
                    className={styles.backdrop}
                    onClick={onClose}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            onClose();
                        }
                    }}
                >
                    <div
                        className={styles.modal}
                        data-testid="modal"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                        role="button"
                        tabIndex={0}
                    >
                        <div className={styles.content}>
                            {metricsMap.map((item) => (
                                <div className={styles.row} key={item.key}>
                                    <p className={styles.value}>{metrics[item.key]}</p>
                                    <p className={styles.label}>{item.label}</p>
                                </div>
                            ))}
                        </div>
                        <button className={styles.closeButton} onClick={onClose}>
                            <img src="/close.svg" alt={'Закрыть'} />
                        </button>
                    </div>
                </div>
            )}
        </>,
        document.body,
    );
}
