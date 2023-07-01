import styles from './LoadingOverlay.module.scss';
import './LoadingOverlay.scss';
import { Wrapper } from './Wrapper';

export const LoadingOverlay = () => {
    return (
        <Wrapper>
            <div className={styles.loadingIcon}>
                <div className="loadingio-spinner-dual-ring-3hlymsf6nfi"><div className="ldio-ax86xcloi0p">
                    <div></div><div><div></div></div>
                </div></div>
            </div>
        </Wrapper>
    )
}
