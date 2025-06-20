import Generator from '../../components/GeneratorComponents/Generator/Generator';

import styles from './GeneratorPage.module.css';

interface GeneratorPageProps {}

const GeneratorPage: React.FC<GeneratorPageProps> = ({}) => {
    return (
        
            <div className={styles.container}>
                <Generator />
            </div>
        
    );
};

export default GeneratorPage;
