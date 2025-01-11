import { GontrelSkeletonIcon } from '../Icons/Icons';
import './GontrelLogoLoader.scss';

interface GontrelLogoLoaderProps {
    className?: string;
}

const GontrelLogoLoader = ({ className }: GontrelLogoLoaderProps) => {
    return (
        <div className={className}>
            <GontrelSkeletonIcon />
        </div>
    );
};

export default GontrelLogoLoader;
