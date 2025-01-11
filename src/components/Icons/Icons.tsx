import React from 'react';
import { uuidv4 } from '@firebase/util';
import './Icons.scss';
import { IconProps, initColors } from '../../lib/color';

export const HomeIcon: React.FC<IconProps> = ({ isActive = false, outlineColor, fillColor, accentColor, ...props }) => {
    const {
        outlineInactive,
        outlineActive,
        fillInactive,
        fillActive,
        accentInactive,
        accentActive
    } = initColors(outlineColor, fillColor, accentColor);

    const outline = isActive ? outlineActive : outlineInactive;
    const fill = isActive ? fillActive : fillInactive;
    const accent = isActive ? accentActive : accentInactive;

    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M9.02 2.84016L3.63 7.04016C2.73 7.74016 2 9.23016 2 10.3602V17.7702C2 20.0902 3.89 21.9902 6.21 21.9902H17.79C20.11 21.9902 22 20.0902 22 17.7802V10.5002C22 9.29016 21.19 7.74016 20.2 7.05016L14.02 2.72016C12.62 1.74016 10.37 1.79016 9.02 2.84016Z"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 17.9902V14.9902"
                stroke={accent}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const ProfileIcon: React.FC<IconProps> = ({ isActive = false, outlineColor, fillColor, ...props }) => {
    const clipPathId = `clip0_${uuidv4()}`;
    const { outlineInactive, outlineActive, fillInactive, fillActive } =
        initColors(outlineColor, fillColor);

    const outline = isActive ? outlineActive : outlineInactive;
    const fill = isActive ? fillActive : fillInactive;

    return (
        <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g id="vuesax/linear/profile" clipPath={`url(#${clipPathId})`}>
                <g id="vuesax/linear/profile_2">
                    <g id="profile">
                        <path
                            id="Vector"
                            d="M12.6601 10.87C12.5601 10.86 12.4401 10.86 12.3301 10.87C9.95006 10.79 8.06006 8.84 8.06006 6.44C8.06006 3.99 10.0401 2 12.5001 2C14.9501 2 16.9401 3.99 16.9401 6.44C16.9301 8.84 15.0401 10.79 12.6601 10.87Z"
                            stroke={outline}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            id="Vector_2"
                            d="M7.65997 14.56C5.23997 16.18 5.23997 18.82 7.65997 20.43C10.41 22.27 14.92 22.27 17.67 20.43C20.09 18.81 20.09 16.17 17.67 14.56C14.93 12.73 10.42 12.73 7.65997 14.56Z"
                            stroke={outline}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </g>
                </g>
            </g>
            <defs>
                <clipPath id={clipPathId}>
                    <rect
                        width="24"
                        height="24"
                        fill={fill}
                        transform="translate(0.5)"
                    />
                </clipPath>
            </defs>
        </svg>
    );
};

export const UnlockIcon: React.FC<IconProps> = ({ isActive = false, outlineColor, fillColor, ...props }) => {
    const { outlineInactive, outlineActive } = initColors(
        outlineColor,
        fillColor
    );

    const outline = isActive ? outlineActive : outlineInactive;
    const fill = 'transparent';

    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6 10V8C6 4.69 7 2 12 2C16.5 2 18 4 18 7"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const FilterIcon: React.FC<IconProps> = ({
    isActive = false,
    outlineColor = { active: 'white', inactive: 'white' },
    fillColor = { active: 'transparent', inactive: 'white' },
    ...props
}) => {
    const { outlineInactive, outlineActive, fillInactive } = initColors(
        outlineColor,
        fillColor
    );
    const outline = isActive ? outlineActive : outlineInactive;
    const fill = isActive ? 'transparent' : fillInactive;
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M29.3333 8.66663H21.3333"
                stroke={outline}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.00008 8.66663H2.66675"
                stroke={outline}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13.3334 13.3333C15.9107 13.3333 18.0001 11.244 18.0001 8.66667C18.0001 6.08934 15.9107 4 13.3334 4C10.7561 4 8.66675 6.08934 8.66675 8.66667C8.66675 11.244 10.7561 13.3333 13.3334 13.3333Z"
                stroke={outline}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M29.3333 23.3334H24"
                stroke={outline}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.6667 23.3334H2.66675"
                stroke={outline}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M18.6667 28C21.244 28 23.3333 25.9106 23.3333 23.3333C23.3333 20.756 21.244 18.6666 18.6667 18.6666C16.0893 18.6666 14 20.756 14 23.3333C14 25.9106 16.0893 28 18.6667 28Z"
                stroke={outline}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const SendIcon: React.FC<IconProps> = ({ isActive = false, outlineColor, fillColor, ...props }) => {
    const { outlineInactive, outlineActive, fillInactive } = initColors(
        outlineColor,
        fillColor
    );
    const outline = isActive ? outlineActive : outlineInactive;
    const fill = isActive ? 'transparent' : fillInactive;

    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={outline}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M18.0703 8.50989L9.51026 4.22989C3.76026 1.34989 1.40026 3.70989 4.28026 9.45989L5.15026 11.1999C5.40026 11.7099 5.40026 12.2999 5.15026 12.8099L4.28026 14.5399C1.40026 20.2899 3.75026 22.6499 9.51026 19.7699L18.0703 15.4899C21.9103 13.5699 21.9103 10.4299 18.0703 8.50989ZM14.8403 12.7499H9.44026C9.03026 12.7499 8.69026 12.4099 8.69026 11.9999C8.69026 11.5899 9.03026 11.2499 9.44026 11.2499H14.8403C15.2503 11.2499 15.5903 11.5899 15.5903 11.9999C15.5903 12.4099 15.2503 12.7499 14.8403 12.7499Z"
                fill={fill}
            />
        </svg>
    );
};

export const HeartIcon: React.FC<IconProps> = ({ isActive = false, outlineColor, fillColor, ...props }) => {
    const gradientId = `paint0_linear_${uuidv4()}`;
    const { fillInactive, fillActive } = initColors(
        outlineColor,
        fillColor
    );
    const outline = 'transparent';
    const fill = (isActive ? fillActive : fillInactive).split(',');

    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill={outline}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M21.9198 4.1333C19.5065 4.1333 17.3465 5.30663 15.9998 7.10663C14.6532 5.30663 12.4932 4.1333 10.0798 4.1333C5.9865 4.1333 2.6665 7.46663 2.6665 11.5866C2.6665 13.1733 2.91984 14.64 3.35984 16C5.4665 22.6666 11.9598 26.6533 15.1732 27.7466C15.6265 27.9066 16.3732 27.9066 16.8265 27.7466C20.0398 26.6533 26.5332 22.6666 28.6398 16C29.0798 14.64 29.3332 13.1733 29.3332 11.5866C29.3332 7.46663 26.0132 4.1333 21.9198 4.1333Z"
                fill={fill[1] ? fill[1] : fill[0]}
            />
            <path
                d="M21.9198 4.1333C19.5065 4.1333 17.3465 5.30663 15.9998 7.10663C14.6532 5.30663 12.4932 4.1333 10.0798 4.1333C5.9865 4.1333 2.6665 7.46663 2.6665 11.5866C2.6665 13.1733 2.91984 14.64 3.35984 16C5.4665 22.6666 11.9598 26.6533 15.1732 27.7466C15.6265 27.9066 16.3732 27.9066 16.8265 27.7466C20.0398 26.6533 26.5332 22.6666 28.6398 16C29.0798 14.64 29.3332 13.1733 29.3332 11.5866C29.3332 7.46663 26.0132 4.1333 21.9198 4.1333Z"
                fill={isActive ? `url(#${gradientId})` : fill[0]}
            />
            <defs>
                <linearGradient
                    id={gradientId}
                    x1="2.6665"
                    y1="4.1333"
                    x2="32.8051"
                    y2="22.0148"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor={fill[0]} />
                    <stop
                        offset="1"
                        stopColor={fill[1] ? fill[1] : fill[0]}
                    />
                </linearGradient>
            </defs>
        </svg>
    );
};

export const MessagesIcon: React.FC<IconProps> = ({ isActive = false, outlineColor, fillColor, ...props }) => {
    const { fillActive, fillInactive } = initColors(
        outlineColor,
        fillColor
    );
    const outline = 'transparent';
    const fill = isActive ? fillActive : fillInactive;

    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill={outline}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M17.5865 8H9.05317C8.7065 8 8.37317 8.01333 8.05317 8.05333C4.4665 8.36 2.6665 10.48 2.6665 14.3867V19.72C2.6665 25.0533 4.79984 26.1067 9.05317 26.1067H9.5865C9.87984 26.1067 10.2665 26.3067 10.4398 26.5333L12.0398 28.6667C12.7465 29.6133 13.8932 29.6133 14.5998 28.6667L16.1998 26.5333C16.3998 26.2667 16.7198 26.1067 17.0532 26.1067H17.5865C21.4932 26.1067 23.6132 24.32 23.9198 20.72C23.9598 20.4 23.9732 20.0667 23.9732 19.72V14.3867C23.9732 10.1333 21.8398 8 17.5865 8ZM8.6665 18.6667C7.91984 18.6667 7.33317 18.0667 7.33317 17.3333C7.33317 16.6 7.93317 16 8.6665 16C9.39984 16 9.99984 16.6 9.99984 17.3333C9.99984 18.0667 9.39984 18.6667 8.6665 18.6667ZM13.3198 18.6667C12.5732 18.6667 11.9865 18.0667 11.9865 17.3333C11.9865 16.6 12.5865 16 13.3198 16C14.0532 16 14.6532 16.6 14.6532 17.3333C14.6532 18.0667 14.0665 18.6667 13.3198 18.6667ZM17.9865 18.6667C17.2398 18.6667 16.6532 18.0667 16.6532 17.3333C16.6532 16.6 17.2532 16 17.9865 16C18.7198 16 19.3198 16.6 19.3198 17.3333C19.3198 18.0667 18.7198 18.6667 17.9865 18.6667Z"
                fill={fill}
            />
            <path
                d="M29.3068 9.05329V14.3866C29.3068 17.0533 28.4802 18.8666 26.8268 19.8666C26.4268 20.1066 25.9602 19.7866 25.9602 19.32L25.9735 14.3866C25.9735 9.05329 22.9202 5.99996 17.5868 5.99996L9.46683 6.01329C9.00017 6.01329 8.68017 5.54663 8.92017 5.14663C9.92017 3.49329 11.7335 2.66663 14.3868 2.66663H22.9202C27.1735 2.66663 29.3068 4.79996 29.3068 9.05329Z"
                fill={fill}
            />
        </svg>
    );
};

export const ShareIcon: React.FC<IconProps> = ({ isActive = false, outlineColor, fillColor, ...props }) => {
    const { fillActive, fillInactive } = initColors(
        outlineColor,
        fillColor
    );
    const outline = 'transparent';
    const fill = isActive ? fillActive : fillInactive;

    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill={outline}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M21.5202 3.94672L9.48016 7.94672C1.38682 10.6534 1.38682 15.0667 9.48016 17.7601L13.0535 18.9467L14.2402 22.5201C16.9335 30.6134 21.3602 30.6134 24.0535 22.5201L28.0668 10.4934C29.8535 5.09339 26.9202 2.14672 21.5202 3.94672ZM21.9468 11.1201L16.8802 16.2134C16.6802 16.4134 16.4268 16.5067 16.1735 16.5067C15.9202 16.5067 15.6668 16.4134 15.4668 16.2134C15.0802 15.8267 15.0802 15.1867 15.4668 14.8001L20.5335 9.70672C20.9202 9.32006 21.5602 9.32006 21.9468 9.70672C22.3335 10.0934 22.3335 10.7334 21.9468 11.1201Z"
                fill={fill}
            />
        </svg>
    );
};

export const ClockIcon: React.FC<IconProps> = ({ isActive = false, outlineColor, fillColor, ...props }) => {
    const { fillActive, fillInactive, outlineActive, outlineInactive } =
        initColors(outlineColor, fillColor);
    const outline = isActive ? outlineActive : outlineInactive;
    const fill = isActive ? fillActive : fillInactive;

    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M18.3332 9.99996C18.3332 14.6 14.5998 18.3333 9.99984 18.3333C5.39984 18.3333 1.6665 14.6 1.6665 9.99996C1.6665 5.39996 5.39984 1.66663 9.99984 1.66663C14.5998 1.66663 18.3332 5.39996 18.3332 9.99996Z"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13.0919 12.65L10.5086 11.1083C10.0586 10.8416 9.69189 10.2 9.69189 9.67497V6.2583"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const LocationIcon: React.FC<IconProps> = ({ isActive = false, outlineColor, fillColor, ...props }) => {
    const { fillActive, fillInactive, outlineActive, outlineInactive } =
        initColors(outlineColor, fillColor);
    const outline = isActive ? outlineActive : outlineInactive;
    const fill = isActive ? fillActive : fillInactive;

    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M9.9999 11.1917C11.4358 11.1917 12.5999 10.0276 12.5999 8.5917C12.5999 7.15576 11.4358 5.9917 9.9999 5.9917C8.56396 5.9917 7.3999 7.15576 7.3999 8.5917C7.3999 10.0276 8.56396 11.1917 9.9999 11.1917Z"
                stroke={outline}
                strokeWidth="1.5"
            />
            <path
                d="M3.01675 7.07496C4.65842 -0.141705 15.3501 -0.133372 16.9834 7.08329C17.9418 11.3166 15.3084 14.9 13.0001 17.1166C11.3251 18.7333 8.67508 18.7333 6.99175 17.1166C4.69175 14.9 2.05842 11.3083 3.01675 7.07496Z"
                stroke={outline}
                strokeWidth="1.5"
            />
        </svg>
    );
};

export const EmailSendIcon: React.FC<IconProps> = ({ isActive = false, outlineColor, fillColor, ...props }) => {
    const { outlineActive, outlineInactive } = initColors(
        outlineColor,
        fillColor
    );
    const outline = isActive ? outlineActive : outlineInactive;
    const fill = 'transparent';

    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M2 8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5H7"
                stroke={outline}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
                stroke={outline}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M2 16.5H8"
                stroke={outline}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M2 12.5H5"
                stroke={outline}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const GlobeIcon: React.FC<IconProps> = ({ isActive = false, outlineColor, fillColor, ...props }) => {
    const { fillActive, fillInactive, outlineActive, outlineInactive } =
        initColors(outlineColor, fillColor);
    const outline = isActive ? outlineActive : outlineInactive;
    const fill = isActive ? fillActive : fillInactive;

    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M9.99984 18.3333C14.6022 18.3333 18.3332 14.6023 18.3332 9.99996C18.3332 5.39759 14.6022 1.66663 9.99984 1.66663C5.39746 1.66663 1.6665 5.39759 1.6665 9.99996C1.6665 14.6023 5.39746 18.3333 9.99984 18.3333Z"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.66667 2.5H7.5C5.875 7.36667 5.875 12.6333 7.5 17.5H6.66667"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.5 2.5C14.125 7.36667 14.125 12.6333 12.5 17.5"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M2.5 13.3333V12.5C7.36667 14.125 12.6333 14.125 17.5 12.5V13.3333"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M2.5 7.5C7.36667 5.875 12.6333 5.875 17.5 7.5"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const MenuIcon: React.FC<IconProps> = ({ isActive = false, outlineColor, fillColor, ...props }) => {
    const { fillActive, fillInactive, outlineActive, outlineInactive } =
        initColors(outlineColor, fillColor);
    const outline = isActive ? outlineActive : outlineInactive;
    const fill = isActive ? fillActive : fillInactive;

    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M18.3332 13.95V3.89162C18.3332 2.89162 17.5165 2.14995 16.5248 2.23329H16.4748C14.7248 2.38329 12.0665 3.27495 10.5832 4.20829L10.4415 4.29995C10.1998 4.44995 9.79984 4.44995 9.55817 4.29995L9.34984 4.17495C7.8665 3.24995 5.2165 2.36662 3.4665 2.22495C2.47484 2.14162 1.6665 2.89162 1.6665 3.88329V13.95C1.6665 14.75 2.3165 15.5 3.1165 15.6L3.35817 15.6333C5.1665 15.875 7.95817 16.7916 9.55817 17.6666L9.5915 17.6833C9.8165 17.8083 10.1748 17.8083 10.3915 17.6833C11.9915 16.8 14.7915 15.875 16.6082 15.6333L16.8832 15.6C17.6832 15.5 18.3332 14.75 18.3332 13.95Z"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10 4.57495V17.075"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.4585 7.07495H4.5835"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.0835 9.57495H4.5835"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const RestaurantIcon: React.FC<IconProps> = ({
    isActive = false,
    outlineColor,
    fillColor = { active: 'white', inactive: 'transparent' },
    ...props
}) => {
    const { fillActive, fillInactive } = initColors(
        outlineColor,
        fillColor
    );
    const outline = 'transparent';
    const fill = isActive ? fillActive : fillInactive;

    return (
        <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill={outline}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.7744 2.23274C15.7548 2.24588 15.7362 2.2611 15.7188 2.27841L14.0316 3.96022C14.0308 3.96106 14.0307 3.96242 14.0315 3.9633C14.0324 3.9642 14.0323 3.96559 14.0314 3.96643L14.025 3.9727C13.8799 4.11695 13.8746 4.35596 14.013 4.50654C14.1515 4.65712 14.3813 4.66226 14.5264 4.51801C14.5397 4.50477 14.5522 4.4908 14.5648 4.47683C14.5772 4.463 14.5896 4.44918 14.6028 4.43607L16.2414 2.80269C16.2666 2.77758 16.2874 2.7497 16.3039 2.72003L16.8773 2.14499C16.897 2.1199 16.9185 2.09571 16.9417 2.07256C17.2608 1.75333 17.7782 1.75333 18.0973 2.07256C18.4165 2.39178 18.4165 2.90934 18.0973 3.22856L18.0849 3.2407C18.0837 3.24184 18.0837 3.24374 18.0849 3.24491C18.086 3.24605 18.086 3.24791 18.0849 3.24906L16.0853 5.25457L16.0864 5.25656L15.8809 5.46148C15.8799 5.46241 15.8799 5.46391 15.8808 5.46488C15.8817 5.46587 15.8816 5.46741 15.8807 5.46833L15.8739 5.47489C15.7221 5.62591 15.7165 5.87615 15.8614 6.0338C16.0064 6.19146 16.247 6.19684 16.3989 6.04581C16.4049 6.03989 16.4107 6.03382 16.4164 6.02767L16.42 6.0409L18.5412 3.91348C18.561 3.88839 18.5825 3.8642 18.6056 3.84105C18.9248 3.52182 19.4422 3.52182 19.7613 3.84105C20.0804 4.16027 20.0804 4.67783 19.7613 4.99705L19.7558 5.00248L19.7525 5.00573L19.7489 5.00919C19.7477 5.01033 19.7477 5.01223 19.7489 5.0134C19.75 5.01454 19.75 5.0164 19.7489 5.01755L15.7306 9.04762C15.6868 9.09154 15.6356 9.12364 15.5811 9.14389C15.0088 9.70541 14.2248 10.0517 13.3599 10.0517C12.9384 10.0517 12.5361 9.96947 12.1682 9.82017L2.21354 19.804C2.18461 19.8403 2.15336 19.8753 2.11979 19.9089C1.63486 20.394 0.848629 20.394 0.363698 19.9089C-0.121233 19.4238 -0.121233 18.6374 0.363698 18.1523L0.371888 18.1442C0.373466 18.1426 0.37348 18.1401 0.371914 18.1385C0.370363 18.137 0.37036 18.1345 0.371907 18.1329L10.4151 8.06028C10.2685 7.69512 10.1879 7.29639 10.1879 6.87881C10.1879 6.03796 10.5149 5.2735 11.0486 4.70573C11.0688 4.65417 11.0998 4.60584 11.1413 4.56412L15.1093 0.584553C15.1291 0.559467 15.1505 0.535273 15.1737 0.512122C15.4928 0.192899 16.0102 0.192899 16.3293 0.512122C16.6485 0.831344 16.6485 1.34891 16.3293 1.66813L16.317 1.68026C16.3158 1.68141 16.3158 1.68331 16.3169 1.68447C16.3181 1.68562 16.3181 1.68748 16.3169 1.68863L15.7744 2.23274ZM2.32714 0.72452L7.67216 6.15435C8.51087 7.00637 8.50558 8.37531 7.66032 9.22083C6.80952 10.0719 5.41649 10.085 4.55977 9.23993C4.01361 8.7012 3.41746 8.09833 2.87787 7.50853L2.7455 7.36414C2.03278 6.58748 1.27303 5.75957 0.954007 4.80237C0.334354 2.94316 0.632583 0.919861 1.30245 0.375431C1.62277 0.11509 2.03757 0.430355 2.32714 0.72452ZM13.3525 11.8637C12.8676 11.3782 12.081 11.3778 11.5957 11.8628C11.1106 12.3475 11.1102 13.1337 11.5948 13.619L17.8428 19.8753C17.8502 19.883 17.8576 19.8907 17.8652 19.8983C18.3492 20.3842 19.1353 20.3856 19.621 19.9015C20.1068 19.4174 20.1082 18.6311 19.6242 18.1452L19.6141 18.1351L19.6139 18.1348L19.6141 18.1343C19.6143 18.1341 19.6143 18.1337 19.6141 18.1335L13.3525 11.8637Z"
                fill={fill}
            />
        </svg>
    );
};

export const CalendarTickIcon: React.FC<IconProps> = ({ isActive = false, outlineColor, fillColor, ...props }) => {
    const { fillActive, fillInactive } = initColors(
        outlineColor,
        fillColor
    );
    const outline = 'transparent';
    const fill = isActive ? fillActive : fillInactive;

    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill={outline}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M6.6665 1.66663V4.16663"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={fill}
            />
            <path
                d="M13.3335 1.66663V4.16663"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={fill}
            />
            <path
                d="M2.9165 7.57495H17.0832"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={fill}
            />
            <path
                d="M18.3332 15.8333C18.3332 16.4583 18.1582 17.05 17.8498 17.55C17.2748 18.5167 16.2165 19.1667 14.9998 19.1667C14.1582 19.1667 13.3915 18.8583 12.8082 18.3333C12.5498 18.1167 12.3248 17.85 12.1498 17.55C11.8415 17.05 11.6665 16.4583 11.6665 15.8333C11.6665 13.9917 13.1582 12.5 14.9998 12.5C15.9998 12.5 16.8915 12.9417 17.4998 13.6333C18.0165 14.225 18.3332 14.9917 18.3332 15.8333Z"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={fill}
            />
            <path
                d="M13.6997 15.8333L14.5247 16.6583L16.2997 15.0166"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={fill}
            />
            <path
                d="M17.5 7.08329V13.6333C16.8917 12.9416 16 12.5 15 12.5C13.1583 12.5 11.6667 13.9916 11.6667 15.8333C11.6667 16.4583 11.8417 17.05 12.15 17.55C12.325 17.85 12.55 18.1166 12.8083 18.3333H6.66667C3.75 18.3333 2.5 16.6666 2.5 14.1666V7.08329C2.5 4.58329 3.75 2.91663 6.66667 2.91663H13.3333C16.25 2.91663 17.5 4.58329 17.5 7.08329Z"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={fill}
            />
            <path
                d="M9.99607 11.4167H10.0036"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={fill}
            />
            <path
                d="M6.91209 11.4167H6.91957"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={fill}
            />
            <path
                d="M6.91209 13.9167H6.91957"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={fill}
            />
        </svg>
    );
};

export const SearchIcon: React.FC<IconProps> = ({ isActive = false, outlineColor, fillColor, ...props }) => {
    const { outlineActive, outlineInactive } = initColors(
        outlineColor,
        fillColor
    );

    const outline = isActive ? outlineActive : outlineInactive;
    const fill = 'transparent';

    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={outline}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={fill}
            />
            <path
                d="M22 22L20 20"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const CloseIcon: React.FC<IconProps> = ({ isActive = false, outlineColor, fillColor, ...props }) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.1677 6.91838C16.5583 6.52786 17.1914 6.52786 17.582 6.91838C17.9725 7.30891 17.9725 7.94207 17.582 8.3326L13.6643 12.2503L17.582 16.168C17.9725 16.5585 17.9725 17.1917 17.582 17.5822C17.1914 17.9727 16.5583 17.9727 16.1678 17.5822L12.2501 13.6645L8.33235 17.5822C7.94183 17.9727 7.30866 17.9727 6.91814 17.5822C6.52761 17.1917 6.52761 16.5585 6.91814 16.168L10.8358 12.2503L6.91815 8.3326C6.52762 7.94207 6.52762 7.30891 6.91815 6.91838C7.30867 6.52786 7.94184 6.52786 8.33236 6.91838L12.2501 10.8361L16.1677 6.91838Z"
                fill="#7A7D80"
            />
        </svg>
    );
};

export const GontrelSkeletonIcon: React.FC<IconProps> = ({
    isActive = false,
    outlineColor = { active: '#393939', inactive: '#393939' },
    fillColor = { active: '#242424', inactive: '#242424' },
    ...props
}) => {
    const { fillActive, fillInactive, outlineActive, outlineInactive } =
        initColors(outlineColor, fillColor);
    const outline = isActive ? outlineActive : outlineInactive;
    const fill = isActive ? fillActive : fillInactive;
    const gradientId = `gradient_${uuidv4()}`;
    const skeletonId = `skeleton_${uuidv4()}`;
    const styles = {
        background:
            'linear-gradient(to right, rgba(255, 255, 255, 0.13) 8%, rgba(255, 255, 255, 0.27) 18%, rgba(255, 255, 255, 0.13) 33%)',
        backgroundSize: '800px 104px',
        animation: 'svgShimmer 1s linear infinite',
        clipPath: `url(#${skeletonId})`,
        transform: 'scale(1.25)'
    };

    return (
        <div style={styles}>
            <svg
                width="98"
                height="93"
                viewBox="0 0 98 93"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
            >
                <clipPath id={skeletonId}>
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M47.0484 40.7819C47.0484 39.6773 46.153 38.7819 45.0484 38.7819H36.1303C35.0257 38.7819 34.1303 37.8864 34.1303 36.7819V31.3262C34.1303 30.2217 35.0257 29.3262 36.1303 29.3262H53.8074C57.3962 21.1777 65.4979 15.4942 74.9172 15.4942C87.6655 15.4942 98 25.9048 98 38.747C98 51.5893 87.6655 62 74.9172 62C66.3367 62 58.8496 57.2836 54.8713 50.2838C54.5658 50.6692 54.2434 51.0566 53.9031 51.4472C48.9765 57.1027 42.1761 60.76 34.7702 61.7373C27.3642 62.7146 19.8582 60.9451 13.6517 56.7588C7.44531 52.5724 2.96218 46.255 1.03833 38.9846C-0.885522 31.7142 -0.118766 23.9871 3.19562 17.2441C6.51001 10.5012 12.1458 5.20271 19.052 2.33678C25.9582 -0.529156 33.6634 -0.766931 40.7308 1.66779C44.8611 3.09066 48.6087 5.36952 51.7524 8.32045C52.1983 8.739 52.9535 8.68316 53.3802 8.24479C54.0667 7.53944 55.1868 8.08121 55.1907 9.06906L55.2053 12.83C55.2111 14.313 54.0195 15.5183 52.5474 15.5183H47.5067C46.6177 15.5183 45.7739 15.1534 45.106 14.5624C42.9881 12.6884 40.5112 11.2324 37.8008 10.2987C32.813 8.58034 27.375 8.74815 22.5009 10.7708C17.6268 12.7934 13.6493 16.5328 11.3102 21.2917C8.97106 26.0506 8.42992 31.504 9.78768 36.6352C11.1455 41.7663 14.3094 46.2248 18.6896 49.1794C23.0699 52.1339 28.3673 53.3827 33.5941 52.693C38.4237 52.0557 42.8884 49.8034 46.2821 46.3159C46.7898 45.7943 47.0484 45.0852 47.0484 44.3573L47.0484 40.7819ZM74.2046 35.4884L71.1814 38.5338C71.0061 38.7105 70.7215 38.7107 70.544 38.5362C70.4078 38.4024 70.2546 38.2528 70.088 38.0903C69.2341 37.2569 68.0312 36.0829 67.0013 34.9492L66.8436 34.776C65.9944 33.8439 65.089 32.8504 64.7089 31.7018C63.8019 28.9612 64.5452 25.9235 65.7324 26.2429C65.7921 26.2589 65.8443 26.2959 65.8876 26.3402L74.207 34.8514C74.38 35.0284 74.3789 35.3128 74.2046 35.4884ZM78.8601 39.5473C78.6265 39.3118 78.2475 39.3116 78.0137 39.5469L76.7667 40.8018C76.5329 41.0371 76.5327 41.4188 76.7663 41.6544L84.8509 49.807L84.8613 49.8176C85.4381 50.4007 86.3749 50.4025 86.9538 49.8214C87.5327 49.2404 87.5344 48.2966 86.9577 47.7135L86.9448 47.7006L78.8601 39.5473ZM82.3672 28.6196C82.3444 28.6352 82.3227 28.6531 82.3024 28.6734L80.2919 30.6923L80.2912 30.6938L80.2918 30.6959L80.2917 30.6996L80.2844 30.7068C80.1115 30.8799 80.1052 31.1668 80.2702 31.3475C80.4352 31.5282 80.7091 31.5344 80.882 31.3613C80.8873 31.3559 80.8925 31.3504 80.8976 31.3449L80.9171 31.3228C80.93 31.308 80.9429 31.2932 80.9567 31.2794L82.9251 29.3028C82.9556 29.2722 82.9806 29.2383 83.0004 29.2021L83.6829 28.5128C83.7064 28.4827 83.732 28.4537 83.7596 28.4259C84.1399 28.0428 84.7564 28.0428 85.1367 28.4259C85.517 28.809 85.517 29.43 85.1367 29.8131L85.1219 29.8277L85.1208 29.83L85.1219 29.8327L85.1228 29.8359L85.1219 29.8377L82.7391 32.2444L82.7407 32.247L82.4951 32.4936L82.495 32.497L82.4957 32.4986L82.4949 32.5006L82.4866 32.5087C82.3056 32.6899 82.2989 32.9903 82.4717 33.1795C82.6445 33.3687 82.9312 33.3752 83.1122 33.1939L83.1201 33.1858C83.1247 33.181 83.1291 33.1762 83.1334 33.1712L83.138 33.188L85.6656 30.635C85.6892 30.6049 85.7148 30.5759 85.7424 30.5481C86.1226 30.165 86.7392 30.165 87.1195 30.5481C87.4997 30.9312 87.4997 31.5523 87.1195 31.9353L87.1129 31.9419L87.109 31.9458L87.1047 31.9499L87.1036 31.9524L87.1047 31.955L87.1057 31.9571L87.1047 31.9599L82.3165 36.7961C82.2643 36.8488 82.2033 36.8873 82.1383 36.9116C81.4565 37.5855 80.5222 38.001 79.4915 38.001C78.9893 38.001 78.51 37.9024 78.0716 37.7232L66.2097 49.704C66.1752 49.7476 66.138 49.7896 66.098 49.8299C65.5201 50.412 64.5833 50.412 64.0054 49.8299C63.4276 49.2478 63.4276 48.3041 64.0054 47.722L64.0152 47.7122L64.0166 47.7086L64.0152 47.7054L64.0138 47.7017L64.0152 47.6987L75.9826 35.6113C75.808 35.1731 75.7119 34.6946 75.7119 34.1935C75.7119 33.1845 76.1015 32.2671 76.7375 31.5857C76.7616 31.5239 76.7984 31.4659 76.848 31.4158L81.5761 26.6402C81.5997 26.6101 81.6253 26.5811 81.6529 26.5533C82.0332 26.1702 82.6497 26.1702 83.03 26.5533C83.4103 26.9364 83.4103 27.5575 83.03 27.9406L83.0152 27.9551L83.0152 27.9602V27.9652L82.3672 28.6196Z"
                        fill="white"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M47.0484 40.7819C47.0484 39.6773 46.153 38.7819 45.0484 38.7819H36.1303C35.0257 38.7819 34.1303 37.8864 34.1303 36.7819V31.3262C34.1303 30.2217 35.0257 29.3262 36.1303 29.3262H53.8074C57.3962 21.1777 65.4979 15.4942 74.9172 15.4942C87.6655 15.4942 98 25.9048 98 38.747C98 51.5893 87.6655 62 74.9172 62C66.3367 62 58.8496 57.2836 54.8713 50.2838C54.5658 50.6692 54.2434 51.0566 53.9031 51.4472C48.9765 57.1027 42.1761 60.76 34.7702 61.7373C27.3642 62.7146 19.8582 60.9451 13.6517 56.7588C7.44531 52.5724 2.96218 46.255 1.03833 38.9846C-0.885522 31.7142 -0.118766 23.9871 3.19562 17.2441C6.51001 10.5012 12.1458 5.20271 19.052 2.33678C25.9582 -0.529156 33.6634 -0.766931 40.7308 1.66779C44.8611 3.09066 48.6087 5.36952 51.7524 8.32045C52.1983 8.739 52.9535 8.68316 53.3802 8.24479C54.0667 7.53944 55.1868 8.08121 55.1907 9.06906L55.2053 12.83C55.2111 14.313 54.0195 15.5183 52.5474 15.5183H47.5067C46.6177 15.5183 45.7739 15.1534 45.106 14.5624C42.9881 12.6884 40.5112 11.2324 37.8008 10.2987C32.813 8.58034 27.375 8.74815 22.5009 10.7708C17.6268 12.7934 13.6493 16.5328 11.3102 21.2917C8.97106 26.0506 8.42992 31.504 9.78768 36.6352C11.1455 41.7663 14.3094 46.2248 18.6896 49.1794C23.0699 52.1339 28.3673 53.3827 33.5941 52.693C38.4237 52.0557 42.8884 49.8034 46.2821 46.3159C46.7898 45.7943 47.0484 45.0852 47.0484 44.3573L47.0484 40.7819ZM74.2046 35.4884L71.1814 38.5338C71.0061 38.7105 70.7215 38.7107 70.544 38.5362C70.4078 38.4024 70.2546 38.2528 70.088 38.0903C69.2341 37.2569 68.0312 36.0829 67.0013 34.9492L66.8436 34.776C65.9944 33.8439 65.089 32.8504 64.7089 31.7018C63.8019 28.9612 64.5452 25.9235 65.7324 26.2429C65.7921 26.2589 65.8443 26.2959 65.8876 26.3402L74.207 34.8514C74.38 35.0284 74.3789 35.3128 74.2046 35.4884ZM78.8601 39.5473C78.6265 39.3118 78.2475 39.3116 78.0137 39.5469L76.7667 40.8018C76.5329 41.0371 76.5327 41.4188 76.7663 41.6544L84.8509 49.807L84.8613 49.8176C85.4381 50.4007 86.3749 50.4025 86.9538 49.8214C87.5327 49.2404 87.5344 48.2966 86.9577 47.7135L86.9448 47.7006L78.8601 39.5473ZM82.3672 28.6196C82.3444 28.6352 82.3227 28.6531 82.3024 28.6734L80.2919 30.6923L80.2912 30.6938L80.2918 30.6959L80.2917 30.6996L80.2844 30.7068C80.1115 30.8799 80.1052 31.1668 80.2702 31.3475C80.4352 31.5282 80.7091 31.5344 80.882 31.3613C80.8873 31.3559 80.8925 31.3504 80.8976 31.3449L80.9171 31.3228C80.93 31.308 80.9429 31.2932 80.9567 31.2794L82.9251 29.3028C82.9556 29.2722 82.9806 29.2383 83.0004 29.2021L83.6829 28.5128C83.7064 28.4827 83.732 28.4537 83.7596 28.4259C84.1399 28.0428 84.7564 28.0428 85.1367 28.4259C85.517 28.809 85.517 29.43 85.1367 29.8131L85.1219 29.8277L85.1208 29.83L85.1219 29.8327L85.1228 29.8359L85.1219 29.8377L82.7391 32.2444L82.7407 32.247L82.4951 32.4936L82.495 32.497L82.4957 32.4986L82.4949 32.5006L82.4866 32.5087C82.3056 32.6899 82.2989 32.9903 82.4717 33.1795C82.6445 33.3687 82.9312 33.3752 83.1122 33.1939L83.1201 33.1858C83.1247 33.181 83.1291 33.1762 83.1334 33.1712L83.138 33.188L85.6656 30.635C85.6892 30.6049 85.7148 30.5759 85.7424 30.5481C86.1226 30.165 86.7392 30.165 87.1195 30.5481C87.4997 30.9312 87.4997 31.5523 87.1195 31.9353L87.1129 31.9419L87.109 31.9458L87.1047 31.9499L87.1036 31.9524L87.1047 31.955L87.1057 31.9571L87.1047 31.9599L82.3165 36.7961C82.2643 36.8488 82.2033 36.8873 82.1383 36.9116C81.4565 37.5855 80.5222 38.001 79.4915 38.001C78.9893 38.001 78.51 37.9024 78.0716 37.7232L66.2097 49.704C66.1752 49.7476 66.138 49.7896 66.098 49.8299C65.5201 50.412 64.5833 50.412 64.0054 49.8299C63.4276 49.2478 63.4276 48.3041 64.0054 47.722L64.0152 47.7122L64.0166 47.7086L64.0152 47.7054L64.0138 47.7017L64.0152 47.6987L75.9826 35.6113C75.808 35.1731 75.7119 34.6946 75.7119 34.1935C75.7119 33.1845 76.1015 32.2671 76.7375 31.5857C76.7616 31.5239 76.7984 31.4659 76.848 31.4158L81.5761 26.6402C81.5997 26.6101 81.6253 26.5811 81.6529 26.5533C82.0332 26.1702 82.6497 26.1702 83.03 26.5533C83.4103 26.9364 83.4103 27.5575 83.03 27.9406L83.0152 27.9551L83.0152 27.9602V27.9652L82.3672 28.6196Z"
                        fill={`url(#${gradientId})`}
                    />
                    <path
                        d="M6.3449 89V79.2H7.6749V89H6.3449ZM12.6808 89.168C11.9808 89.168 11.3648 89.014 10.8328 88.706C10.3008 88.3887 9.88077 87.9547 9.57277 87.404C9.27411 86.8533 9.12477 86.2187 9.12477 85.5C9.12477 84.7813 9.27411 84.1467 9.57277 83.596C9.87144 83.0453 10.2868 82.616 10.8188 82.308C11.3508 81.9907 11.9621 81.832 12.6528 81.832C13.3434 81.832 13.9548 81.9907 14.4868 82.308C15.0188 82.616 15.4341 83.0453 15.7328 83.596C16.0314 84.1467 16.1808 84.7813 16.1808 85.5C16.1808 86.2187 16.0314 86.8533 15.7328 87.404C15.4341 87.9547 15.0188 88.3887 14.4868 88.706C13.9641 89.014 13.3621 89.168 12.6808 89.168ZM12.6808 87.95C13.1008 87.95 13.4741 87.8473 13.8008 87.642C14.1274 87.4273 14.3794 87.138 14.5568 86.774C14.7434 86.41 14.8368 85.9853 14.8368 85.5C14.8368 85.0147 14.7434 84.59 14.5568 84.226C14.3794 83.862 14.1228 83.5773 13.7868 83.372C13.4508 83.1573 13.0728 83.05 12.6528 83.05C12.2234 83.05 11.8454 83.1573 11.5188 83.372C11.1921 83.5773 10.9354 83.862 10.7488 84.226C10.5621 84.59 10.4688 85.0147 10.4688 85.5C10.4688 85.9853 10.5621 86.41 10.7488 86.774C10.9354 87.138 11.1968 87.4273 11.5328 87.642C11.8688 87.8473 12.2514 87.95 12.6808 87.95ZM21.9359 89L21.8799 87.782V85.346C21.8799 84.8327 21.8192 84.4033 21.6979 84.058C21.5859 83.7127 21.4085 83.4513 21.1659 83.274C20.9325 83.0967 20.6199 83.008 20.2279 83.008C19.8639 83.008 19.5465 83.0827 19.2759 83.232C19.0145 83.3813 18.7952 83.6147 18.6179 83.932L17.4419 83.484C17.6099 83.1667 17.8199 82.8867 18.0719 82.644C18.3239 82.392 18.6272 82.196 18.9819 82.056C19.3365 81.9067 19.7519 81.832 20.2279 81.832C20.8905 81.832 21.4412 81.9627 21.8799 82.224C22.3185 82.4853 22.6452 82.8633 22.8599 83.358C23.0839 83.8527 23.1912 84.464 23.1819 85.192L23.1679 89H21.9359ZM19.8779 89.168C19.0472 89.168 18.3985 88.9813 17.9319 88.608C17.4745 88.2253 17.2459 87.698 17.2459 87.026C17.2459 86.3073 17.4839 85.7613 17.9599 85.388C18.4452 85.0053 19.1172 84.814 19.9759 84.814H21.9219V85.864H20.3399C19.6959 85.864 19.2432 85.9667 18.9819 86.172C18.7205 86.368 18.5899 86.6433 18.5899 86.998C18.5899 87.3247 18.7112 87.5813 18.9539 87.768C19.2059 87.9453 19.5512 88.034 19.9899 88.034C20.3725 88.034 20.7039 87.9547 20.9839 87.796C21.2639 87.628 21.4832 87.3947 21.6419 87.096C21.8005 86.7973 21.8799 86.4567 21.8799 86.074H22.3419C22.3419 87.026 22.1365 87.782 21.7259 88.342C21.3245 88.8927 20.7085 89.168 19.8779 89.168ZM29.9806 89L29.9246 87.698V79.2H31.2406V89H29.9806ZM27.6286 89.168C26.994 89.168 26.4386 89.014 25.9626 88.706C25.496 88.398 25.1273 87.9687 24.8566 87.418C24.5953 86.8673 24.4646 86.228 24.4646 85.5C24.4646 84.7627 24.5953 84.1233 24.8566 83.582C25.1273 83.0313 25.496 82.602 25.9626 82.294C26.4386 81.986 26.994 81.832 27.6286 81.832C28.2166 81.832 28.7253 81.986 29.1546 82.294C29.5933 82.602 29.9293 83.0313 30.1626 83.582C30.396 84.1233 30.5126 84.7627 30.5126 85.5C30.5126 86.228 30.396 86.8673 30.1626 87.418C29.9293 87.9687 29.5933 88.398 29.1546 88.706C28.7253 89.014 28.2166 89.168 27.6286 89.168ZM27.9366 87.964C28.3286 87.964 28.674 87.8613 28.9726 87.656C29.2713 87.4413 29.5046 87.152 29.6726 86.788C29.8406 86.4147 29.9246 85.9853 29.9246 85.5C29.9246 85.0147 29.8406 84.59 29.6726 84.226C29.5046 83.8527 29.2713 83.5633 28.9726 83.358C28.674 83.1433 28.324 83.036 27.9226 83.036C27.512 83.036 27.148 83.1433 26.8306 83.358C26.5133 83.5633 26.266 83.8527 26.0886 84.226C25.9113 84.59 25.8226 85.0147 25.8226 85.5C25.8226 85.9853 25.9113 86.4147 26.0886 86.788C26.2753 87.152 26.5273 87.4413 26.8446 87.656C27.162 87.8613 27.526 87.964 27.9366 87.964ZM33.1711 89V82H34.5011V89H33.1711ZM33.8431 80.516C33.6284 80.516 33.4418 80.4367 33.2831 80.278C33.1244 80.11 33.0451 79.9187 33.0451 79.704C33.0451 79.48 33.1244 79.2933 33.2831 79.144C33.4418 78.9853 33.6284 78.906 33.8431 78.906C34.0671 78.906 34.2538 78.9853 34.4031 79.144C34.5618 79.2933 34.6411 79.48 34.6411 79.704C34.6411 79.9187 34.5618 80.11 34.4031 80.278C34.2538 80.4367 34.0671 80.516 33.8431 80.516ZM36.4504 89V82H37.6964L37.7804 83.288V89H36.4504ZM41.2944 89V85.416H42.6244V89H41.2944ZM41.2944 85.416C41.2944 84.7813 41.2197 84.3007 41.0704 83.974C40.9304 83.638 40.7297 83.4047 40.4684 83.274C40.2164 83.1433 39.9224 83.0733 39.5864 83.064C39.017 83.064 38.5737 83.2647 38.2564 83.666C37.939 84.0673 37.7804 84.632 37.7804 85.36H37.2064C37.2064 84.6227 37.3137 83.9927 37.5284 83.47C37.7524 82.938 38.065 82.532 38.4664 82.252C38.877 81.972 39.3624 81.832 39.9224 81.832C40.473 81.832 40.949 81.944 41.3504 82.168C41.761 82.392 42.0737 82.742 42.2884 83.218C42.5124 83.6847 42.6244 84.3007 42.6244 85.066V85.416H41.2944ZM47.196 91.982C46.7294 91.982 46.3047 91.9353 45.922 91.842C45.5394 91.758 45.2174 91.66 44.956 91.548C44.6947 91.436 44.4987 91.338 44.368 91.254L44.872 90.176C44.9934 90.2507 45.166 90.3347 45.39 90.428C45.614 90.5307 45.8754 90.6147 46.174 90.68C46.4727 90.7547 46.804 90.792 47.168 90.792C47.5974 90.792 47.98 90.7033 48.316 90.526C48.652 90.358 48.9134 90.092 49.1 89.728C49.296 89.364 49.394 88.8973 49.394 88.328V82H50.724V88.3C50.724 89.1027 50.57 89.7747 50.262 90.316C49.9634 90.8667 49.548 91.282 49.016 91.562C48.4934 91.842 47.8867 91.982 47.196 91.982ZM47.07 88.902C46.4354 88.902 45.88 88.7573 45.404 88.468C44.9374 88.1693 44.5687 87.7587 44.298 87.236C44.0367 86.704 43.906 86.0927 43.906 85.402C43.906 84.6833 44.0367 84.058 44.298 83.526C44.5687 82.994 44.9374 82.5787 45.404 82.28C45.88 81.9813 46.4354 81.832 47.07 81.832C47.6487 81.832 48.1527 81.9813 48.582 82.28C49.0207 82.5787 49.3567 82.9987 49.59 83.54C49.8327 84.072 49.954 84.6973 49.954 85.416C49.954 86.1067 49.8327 86.718 49.59 87.25C49.3567 87.7727 49.0207 88.1787 48.582 88.468C48.1527 88.7573 47.6487 88.902 47.07 88.902ZM47.406 87.782C47.798 87.782 48.1387 87.6793 48.428 87.474C48.7174 87.2593 48.946 86.9747 49.114 86.62C49.282 86.256 49.366 85.8407 49.366 85.374C49.366 84.9073 49.282 84.4967 49.114 84.142C48.946 83.7873 48.7127 83.512 48.414 83.316C48.1247 83.1107 47.784 83.008 47.392 83.008C46.9814 83.008 46.6174 83.1107 46.3 83.316C45.992 83.512 45.7494 83.7873 45.572 84.142C45.3947 84.4967 45.306 84.9073 45.306 85.374C45.306 85.8407 45.3947 86.256 45.572 86.62C45.7587 86.9747 46.006 87.2593 46.314 87.474C46.6314 87.6793 46.9954 87.782 47.406 87.782ZM56.0575 91.8V82H57.3035L57.3875 83.288V91.8H56.0575ZM59.6835 89.168C59.0955 89.168 58.5821 89.014 58.1435 88.706C57.7141 88.398 57.3828 87.9687 57.1495 87.418C56.9161 86.8673 56.7995 86.228 56.7995 85.5C56.7995 84.7627 56.9161 84.1233 57.1495 83.582C57.3828 83.0313 57.7141 82.602 58.1435 82.294C58.5821 81.986 59.0955 81.832 59.6835 81.832C60.3088 81.832 60.8595 81.986 61.3355 82.294C61.8115 82.602 62.1801 83.0313 62.4415 83.582C62.7121 84.1233 62.8475 84.7627 62.8475 85.5C62.8475 86.228 62.7121 86.8673 62.4415 87.418C62.1801 87.9687 61.8115 88.398 61.3355 88.706C60.8595 89.014 60.3088 89.168 59.6835 89.168ZM59.3615 87.964C59.7815 87.964 60.1501 87.8613 60.4675 87.656C60.7848 87.4413 61.0321 87.152 61.2095 86.788C61.3961 86.4147 61.4895 85.9853 61.4895 85.5C61.4895 85.0147 61.4008 84.59 61.2235 84.226C61.0461 83.8527 60.7988 83.5633 60.4815 83.358C60.1641 83.1433 59.7955 83.036 59.3755 83.036C58.9928 83.036 58.6475 83.1433 58.3395 83.358C58.0408 83.5633 57.8075 83.8527 57.6395 84.226C57.4715 84.5993 57.3875 85.024 57.3875 85.5C57.3875 85.9853 57.4715 86.4147 57.6395 86.788C57.8075 87.152 58.0408 87.4413 58.3395 87.656C58.6381 87.8613 58.9788 87.964 59.3615 87.964ZM67.464 89.168C66.764 89.168 66.148 89.014 65.616 88.706C65.084 88.3887 64.664 87.9547 64.356 87.404C64.0573 86.8533 63.908 86.2187 63.908 85.5C63.908 84.7813 64.0573 84.1467 64.356 83.596C64.6546 83.0453 65.07 82.616 65.602 82.308C66.134 81.9907 66.7453 81.832 67.436 81.832C68.1266 81.832 68.738 81.9907 69.27 82.308C69.802 82.616 70.2173 83.0453 70.516 83.596C70.8146 84.1467 70.964 84.7813 70.964 85.5C70.964 86.2187 70.8146 86.8533 70.516 87.404C70.2173 87.9547 69.802 88.3887 69.27 88.706C68.7473 89.014 68.1453 89.168 67.464 89.168ZM67.464 87.95C67.884 87.95 68.2573 87.8473 68.584 87.642C68.9106 87.4273 69.1626 87.138 69.34 86.774C69.5266 86.41 69.62 85.9853 69.62 85.5C69.62 85.0147 69.5266 84.59 69.34 84.226C69.1626 83.862 68.906 83.5773 68.57 83.372C68.234 83.1573 67.856 83.05 67.436 83.05C67.0066 83.05 66.6286 83.1573 66.302 83.372C65.9753 83.5773 65.7186 83.862 65.532 84.226C65.3453 84.59 65.252 85.0147 65.252 85.5C65.252 85.9853 65.3453 86.41 65.532 86.774C65.7186 87.138 65.98 87.4273 66.316 87.642C66.652 87.8473 67.0346 87.95 67.464 87.95ZM74.9271 89.168C74.4324 89.168 73.9891 89.0933 73.5971 88.944C73.2144 88.7947 72.8877 88.594 72.6171 88.342C72.3557 88.09 72.1597 87.8053 72.0291 87.488L73.1771 86.984C73.3264 87.2733 73.5504 87.5113 73.8491 87.698C74.1477 87.8847 74.4791 87.978 74.8431 87.978C75.2444 87.978 75.5757 87.9033 75.8371 87.754C76.0984 87.6047 76.2291 87.3947 76.2291 87.124C76.2291 86.8627 76.1311 86.6573 75.9351 86.508C75.7391 86.3587 75.4544 86.2373 75.0811 86.144L74.4231 85.976C73.7697 85.7987 73.2611 85.5327 72.8971 85.178C72.5424 84.8233 72.3651 84.422 72.3651 83.974C72.3651 83.2927 72.5844 82.7653 73.0231 82.392C73.4617 82.0187 74.1104 81.832 74.9691 81.832C75.3891 81.832 75.7717 81.8927 76.1171 82.014C76.4717 82.1353 76.7704 82.308 77.0131 82.532C77.2651 82.756 77.4424 83.022 77.5451 83.33L76.4251 83.834C76.3131 83.554 76.1217 83.3487 75.8511 83.218C75.5804 83.078 75.2631 83.008 74.8991 83.008C74.5257 83.008 74.2317 83.092 74.0171 83.26C73.8024 83.4187 73.6951 83.6427 73.6951 83.932C73.6951 84.0907 73.7837 84.2447 73.9611 84.394C74.1477 84.534 74.4184 84.6507 74.7731 84.744L75.5291 84.926C75.9864 85.038 76.3644 85.2107 76.6631 85.444C76.9617 85.668 77.1857 85.9247 77.3351 86.214C77.4844 86.494 77.5591 86.788 77.5591 87.096C77.5591 87.516 77.4424 87.8847 77.2091 88.202C76.9851 88.51 76.6724 88.748 76.2711 88.916C75.8791 89.084 75.4311 89.168 74.9271 89.168ZM81.6446 89.168C80.9446 89.168 80.4032 88.9907 80.0206 88.636C79.6379 88.272 79.4466 87.754 79.4466 87.082V79.816H80.7766V86.886C80.7766 87.2313 80.8606 87.4973 81.0286 87.684C81.2059 87.8613 81.4579 87.95 81.7846 87.95C81.8779 87.95 81.9806 87.9313 82.0926 87.894C82.2046 87.8567 82.3399 87.782 82.4986 87.67L83.0026 88.706C82.7599 88.8647 82.5266 88.9813 82.3026 89.056C82.0879 89.1307 81.8686 89.168 81.6446 89.168ZM78.2566 83.148V82H82.7646V83.148H78.2566ZM84.9176 89.196C84.6843 89.196 84.4789 89.112 84.3016 88.944C84.1336 88.776 84.0496 88.5707 84.0496 88.328C84.0496 88.0853 84.1336 87.88 84.3016 87.712C84.4789 87.544 84.6843 87.46 84.9176 87.46C85.1603 87.46 85.3656 87.544 85.5336 87.712C85.7109 87.88 85.7996 88.0853 85.7996 88.328C85.7996 88.5707 85.7109 88.776 85.5336 88.944C85.3656 89.112 85.1603 89.196 84.9176 89.196ZM87.9801 89.196C87.7468 89.196 87.5414 89.112 87.3641 88.944C87.1961 88.776 87.1121 88.5707 87.1121 88.328C87.1121 88.0853 87.1961 87.88 87.3641 87.712C87.5414 87.544 87.7468 87.46 87.9801 87.46C88.2228 87.46 88.4281 87.544 88.5961 87.712C88.7734 87.88 88.8621 88.0853 88.8621 88.328C88.8621 88.5707 88.7734 88.776 88.5961 88.944C88.4281 89.112 88.2228 89.196 87.9801 89.196ZM91.0426 89.196C90.8093 89.196 90.6039 89.112 90.4266 88.944C90.2586 88.776 90.1746 88.5707 90.1746 88.328C90.1746 88.0853 90.2586 87.88 90.4266 87.712C90.6039 87.544 90.8093 87.46 91.0426 87.46C91.2853 87.46 91.4906 87.544 91.6586 87.712C91.8359 87.88 91.9246 88.0853 91.9246 88.328C91.9246 88.5707 91.8359 88.776 91.6586 88.944C91.4906 89.112 91.2853 89.196 91.0426 89.196Z"
                        fill={`url(#${gradientId})`}
                    />
                </clipPath>
                <defs>
                    <linearGradient
                        id={gradientId}
                        x1="0"
                        y1="31"
                        x2="98"
                        y2="31"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor={outline} />
                        <stop offset="1" stopColor={fill} />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

export const BookmarkIcon: React.FC<IconProps> = ({ isActive = false, outlineColor, fillColor, ...props }) => {
    const gradientId = `paint0_linear_${uuidv4()}`;
    const { fillInactive, fillActive } = initColors(
        outlineColor,
        fillColor
    );
    const outline = 'transparent';
    const fill = (isActive ? fillActive : fillInactive).split(',');
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill={outline}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M9.57336 2.54688H22.4267C25.2667 2.54688 27.5734 4.86688 27.5867 7.69354V26.4802C27.5867 28.8935 25.8667 29.9069 23.76 28.7335L17.2534 25.1202C16.5734 24.7335 15.4534 24.7335 14.76 25.1202L8.25336 28.7335C6.1467 29.8935 4.4267 28.8802 4.4267 26.4802V7.69354C4.4267 4.86688 6.7467 2.54688 9.57336 2.54688Z"
                fill={`url(#${gradientId})`}
            />
            <defs>
                <linearGradient
                    id={gradientId}
                    x1="6.50092"
                    y1="5.5"
                    x2="30.5734"
                    y2="15.5775"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor={fill[0]} />
                    <stop
                        offset="100%"
                        stopColor={fill[1] ? fill[1] : fill[0]}
                    />
                </linearGradient>
            </defs>
        </svg>
    );
};

export const BookmarkOutlineIcon: React.FC<IconProps> = ({
    isActive = false,
    outlineColor = { active: 'black', inactive: 'black' },
    fillColor = { active: 'transparent', inactive: 'transparent' },
    ...props
}) => {
    const { fillActive, fillInactive, outlineActive, outlineInactive } =
        initColors(outlineColor, fillColor);

    const outline = isActive ? outlineActive : outlineInactive;
    const fill = isActive ? fillActive : fillInactive;

    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M14.0167 1.6665H5.98334C4.20834 1.6665 2.76667 3.1165 2.76667 4.88317V16.6248C2.76667 18.1248 3.84167 18.7582 5.15834 18.0332L9.225 15.7748C9.65834 15.5332 10.3583 15.5332 10.7833 15.7748L14.85 18.0332C16.1667 18.7665 17.2417 18.1332 17.2417 16.6248V4.88317C17.2333 3.1165 15.7917 1.6665 14.0167 1.6665Z"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const ShieldCrossIcon: React.FC<IconProps> = ({
    isActive = false,
    outlineColor = { active: 'white', inactive: 'white' },
    fillColor = { active: 'white', inactive: 'white' },
    ...props
}) => {
    const { outlineActive, outlineInactive } = initColors(
        outlineColor,
        fillColor
    );

    const outline = isActive ? outlineActive : outlineInactive;

    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M10.4902 2.22957L5.50016 4.10957C4.35016 4.53957 3.41016 5.89957 3.41016 7.11957V14.5496C3.41016 15.7296 4.19016 17.2796 5.14016 17.9896L9.44016 21.1996C10.8502 22.2596 13.1702 22.2596 14.5802 21.1996L18.8802 17.9896C19.8302 17.2796 20.6102 15.7296 20.6102 14.5496V7.11957C20.6102 5.88957 19.6702 4.52957 18.5202 4.09957L13.5302 2.22957C12.6802 1.91957 11.3202 1.91957 10.4902 2.22957Z"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.1504 13.4404L9.90039 9.19043"
                stroke={outline}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.0996 9.24023L9.84961 13.4902"
                stroke={outline}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const ShieldTickIcon: React.FC<IconProps> = ({
    isActive = false,
    outlineColor = { active: 'white', inactive: 'white' },
    fillColor = { active: 'white', inactive: 'white' },
    ...props
}) => {
    const { outlineActive, outlineInactive } = initColors(
        outlineColor,
        fillColor
    );

    const outline = isActive ? outlineActive : outlineInactive;

    return (
        <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M10.9902 2.22957L6.00016 4.10957C4.85016 4.53957 3.91016 5.89957 3.91016 7.11957V14.5496C3.91016 15.7296 4.69016 17.2796 5.64016 17.9896L9.94016 21.1996C11.3502 22.2596 13.6702 22.2596 15.0802 21.1996L19.3802 17.9896C20.3302 17.2796 21.1102 15.7296 21.1102 14.5496V7.11957C21.1102 5.88957 20.1702 4.52957 19.0202 4.09957L14.0302 2.22957C13.1802 1.91957 11.8202 1.91957 10.9902 2.22957Z"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.5498 11.8697L11.1598 13.4797L15.4598 9.17969"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const GridIcon: React.FC<IconProps> = ({
    isActive = false,
    outlineColor = { active: 'white', inactive: 'white' },
    fillColor = { active: 'white', inactive: 'white' },
    ...props
}) => {
    const { fillActive, fillInactive, outlineActive, outlineInactive } =
        initColors(outlineColor, fillColor);

    const outline = isActive ? outlineActive : outlineInactive;
    const fill = isActive ? fillActive : fillInactive;

    return (
        <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M8.00008 18.3332H13.0001C17.1667 18.3332 18.8334 16.6665 18.8334 12.4998V7.49984C18.8334 3.33317 17.1667 1.6665 13.0001 1.6665H8.00008C3.83341 1.6665 2.16675 3.33317 2.16675 7.49984V12.4998C2.16675 16.6665 3.83341 18.3332 8.00008 18.3332Z"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M2.16675 10H18.8334"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.375 10V17.9167"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13.625 18.3333V10"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.375 9.99984V1.6665"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13.625 10V2.1167"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const PlayIcon: React.FC<IconProps> = ({
    isActive = false,
    outlineColor = { active: 'black', inactive: 'black' },
    fillColor = { active: 'white', inactive: 'white' },
    ...props
}) => {
    const { fillActive, fillInactive, outlineActive, outlineInactive } =
        initColors(outlineColor, fillColor);

    const outline = isActive ? outlineActive : outlineInactive;
    const fill = isActive ? fillActive : fillInactive;
    return (
        <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect
                width="64"
                height="64"
                rx="32"
                fill={outline}
                fillOpacity="0.4"
            />
            <g filter="url(#filter0_d_3746_31726)">
                <path
                    d="M46 28.5359C48.6667 30.0755 48.6667 33.9245 46 35.4641L28 45.8564C25.3333 47.396 22 45.4715 22 42.3923L22 21.6077C22 18.5285 25.3333 16.604 28 18.1436L46 28.5359Z"
                    fill={fill}
                />
                <path
                    d="M45.75 28.9689C48.0833 30.3161 48.0833 33.6839 45.75 35.0311L27.75 45.4234C25.4167 46.7705 22.5 45.0866 22.5 42.3923L22.5 21.6077C22.5 18.9134 25.4167 17.2295 27.75 18.5766L45.75 28.9689Z"
                    stroke={outline}
                />
            </g>
            <defs>
                <filter
                    id="filter0_d_3746_31726"
                    x="18"
                    y="13.6017"
                    width="34"
                    height="36.7966"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_3746_31726"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_3746_31726"
                        result="shape"
                    />
                </filter>
            </defs>
        </svg>
    );
};

export const PauseIcon: React.FC<IconProps> = ({
    isActive = false,
    outlineColor = { active: 'black', inactive: 'black' },
    fillColor = { active: 'white', inactive: 'white' },
    ...props
}) => {
    const { fillActive, fillInactive, outlineActive, outlineInactive } =
        initColors(outlineColor, fillColor);

    const outline = isActive ? outlineActive : outlineInactive;
    const fill = isActive ? fillActive : fillInactive;

    return (
        <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect
                width="64"
                height="64"
                rx="32"
                fill={outline}
                fillOpacity="0.4"
            />
            <rect x="18" y="18" width="12" height="28" rx="3" fill={fill} />
            <rect x="34" y="18" width="12" height="28" rx="3" fill={fill} />
        </svg>
    );
};

export const EllipsisVerticalIcon: React.FC<IconProps> = ({
    isActive = false,
    outlineColor = { active: 'black', inactive: 'black' },
    fillColor = { active: 'black', inactive: 'black' },
    ...props
}) => {
    const { fillActive, fillInactive } = initColors(
        outlineColor,
        fillColor
    );

    const fill = isActive ? fillActive : fillInactive;

    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle cx="16" cy="6" r="2" fill={fill} />
            <circle cx="16" cy="16" r="2" fill={fill} />
            <circle cx="16" cy="26" r="2" fill={fill} />
        </svg>
    );
};

export const VideoSlashIcon: React.FC<IconProps> = ({
    isActive,
    outlineColor = { active: 'white', inactive: 'white' },
    fillColor = { active: 'white', inactive: 'white' },
    ...props
}) => {
    const { outlineActive, outlineInactive } = initColors(
        outlineColor,
        fillColor
    );

    const outline = isActive ? outlineActive : outlineInactive;

    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M16.63 7.58008C16.63 7.58008 16.66 6.63008 16.63 6.32008C16.46 4.28008 15.13 3.58008 12.52 3.58008H6.21C3.05 3.58008 2 4.63008 2 7.79008V16.2101C2 17.4701 2.38 18.7401 3.37 19.5501L4 20.0001"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M16.74 10.9502V16.2102C16.74 19.3702 15.69 20.4202 12.53 20.4202H7.26001"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M22 6.74023V15.8102C22 17.4802 20.88 18.0602 19.52 17.1002L16.74 15.1502"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M22.02 2.18994L2.02002 22.1899"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const DefaultProfileIcon: React.FC<IconProps> = ({
    isActive = false,
    outlineColor = { active: '#0070F3', inactive: '#0070F3' },
    fillColor = { active: 'white', inactive: 'white' },
    ...props
}) => {
    const { fillActive, fillInactive, outlineActive, outlineInactive } =
        initColors(outlineColor, fillColor);

    const outline = isActive ? outlineActive : outlineInactive;
    const fill = isActive ? fillActive : fillInactive;

    return (
        <svg
            width="121"
            height="120"
            viewBox="0 0 121 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect x="0.5" width="120" height="120" rx="60" fill={outline} />
            <path
                d="M60.5 25C51.33 25 43.875 32.455 43.875 41.625C43.875 50.62 50.91 57.9 60.08 58.215C60.36 58.18 60.64 58.18 60.85 58.215C60.92 58.215 60.955 58.215 61.025 58.215C61.06 58.215 61.06 58.215 61.095 58.215C70.055 57.9 77.09 50.62 77.125 41.625C77.125 32.455 69.67 25 60.5 25Z"
                fill={fill}
            />
            <path
                d="M78.28 67.5251C68.515 61.0151 52.59 61.0151 42.755 67.5251C38.31 70.5001 35.86 74.5251 35.86 78.8301C35.86 83.1351 38.31 87.1251 42.72 90.0651C47.62 93.3551 54.06 95.0001 60.5 95.0001C66.94 95.0001 73.38 93.3551 78.28 90.0651C82.69 87.0901 85.14 83.1001 85.14 78.7601C85.105 74.4551 82.69 70.4651 78.28 67.5251Z"
                fill={fill}
            />
        </svg>
    );
};

export const BookmarkOutlineSlashIcon: React.FC<IconProps> = ({
    isActive = false,
    outlineColor = { active: 'black', inactive: 'black' },
    fillColor = { active: 'transparent', inactive: 'transparent' },
    ...props
}) => {
    const { fillActive, fillInactive, outlineActive, outlineInactive } =
        initColors(outlineColor, fillColor);

    const outline = isActive ? outlineActive : outlineInactive;
    const fill = isActive ? fillActive : fillInactive;

    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M22 2L2 22"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M20.68 8.70996V19.71C20.68 21.72 19.24 22.57 17.48 21.59L11 17.54"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.32007 19.95V5.86C3.32007 3.74 5.05007 2 7.18007 2H16.8301C18.0401 2 19.1201 2.56 19.8301 3.44"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const InfoCircleIcon: React.FC<IconProps> = ({
    isActive = false,
    outlineColor = { active: '#393D41', inactive: '#393D41' },
    fillColor = { active: 'transparent', inactive: 'transparent' },
    ...props
}) => {
    const { fillActive, fillInactive, outlineActive, outlineInactive } =
        initColors(outlineColor, fillColor);

    const outline = isActive ? outlineActive : outlineInactive;
    const fill = isActive ? fillActive : fillInactive;

    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M9.99996 1.66659C14.5833 1.66659 18.3333 5.41659 18.3333 9.99992C18.3333 14.5833 14.5833 18.3333 9.99996 18.3333C5.41663 18.3333 1.66663 14.5833 1.66663 9.99992C1.66663 5.41659 5.41663 1.66659 9.99996 1.66659Z"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10 13.3333V9.16659"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.99536 6.66675H10.0028"
                stroke={outline}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const AddIcon: React.FC<IconProps> = ({
    isActive = false,
    outlineColor = { active: 'black', inactive: 'black' },
    fillColor = { active: 'black', inactive: 'black' },
    ...props
}) => {
    const { fillActive, fillInactive } = initColors(
        outlineColor,
        fillColor
    );

    const fill = isActive ? fillActive : fillInactive;

    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z"
                fill={fill}
            />
            <path
                d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V18C12.75 18.41 12.41 18.75 12 18.75Z"
                fill={fill}
            />
        </svg>
    );
};

export const TrashIcon: React.FC<IconProps> = ({
    isActive = false,
    outlineColor = { active: 'black', inactive: 'black' },
    fillColor = { active: 'black', inactive: 'black' },
    ...props
}) => {
    const { outlineActive, outlineInactive } = initColors(
        outlineColor,
        fillColor
    );

    const outline = isActive ? outlineActive : outlineInactive;

    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M18.8499 9.14014L18.1999 19.2101C18.0899 20.7801 17.9999 22.0001 15.2099 22.0001H8.7899C5.9999 22.0001 5.9099 20.7801 5.7999 19.2101L5.1499 9.14014"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.3301 16.5H13.6601"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.5 12.5H14.5"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const TickIcon: React.FC<IconProps> = ({
    isActive = false,
    outlineColor = { active: 'black', inactive: 'black' },
    fillColor = { active: 'black', inactive: 'black' },
    ...props
}) => {
    const { outlineActive, outlineInactive } = initColors(
        outlineColor,
        fillColor
    );

    const outline = isActive ? outlineActive : outlineInactive;

    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M5 11.6922L7.64299 14.8004C8.39972 15.6903 9.75483 15.745 10.5808 14.919L18.5 6.99977"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
};

export const InfoCircle: React.FC<IconProps> = ({
    isActive = false,
    outlineColor = { active: 'black', inactive: 'black' },
    fillColor = { active: 'black', inactive: 'black' },
    ...props
}) => {
    const { outlineActive, outlineInactive } = initColors(
        outlineColor,
        fillColor
    );

    const outline = isActive ? outlineActive : outlineInactive;

    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2Z"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 16V11"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.9946 8H12.0036"
                stroke={outline}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const ClipboardIcon: React.FC<IconProps> = ({
    isActive = false,
    outlineColor = { active: 'black', inactive: 'black' },
    fillColor = { active: 'transparent', inactive: 'transparent' },
    ...props
}) => {
    const { outlineActive, outlineInactive } = initColors(
        outlineColor,
        fillColor
    );

    const outline = isActive ? outlineActive : outlineInactive;

    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const CalendarIcon: React.FC<IconProps> = ({ isActive = false, outlineColor, fillColor, ...props }) => {
    const { fillActive, fillInactive } = initColors(
        outlineColor,
        fillColor
    );
    const outline = 'transparent';
    const fill = isActive ? fillActive : fillInactive;

    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={outline}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M8 2V5"
                stroke={fill}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M16 2V5"
                stroke={fill}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.5 9.08984H20.5"
                stroke={fill}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                stroke={fill}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15.6947 13.7002H15.7037"
                stroke={fill}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15.6947 16.7002H15.7037"
                stroke={fill}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.9955 13.7002H12.0045"
                stroke={fill}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.9955 16.7002H12.0045"
                stroke={fill}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.29431 13.7002H8.30329"
                stroke={fill}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.29431 16.7002H8.30329"
                stroke={fill}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const CrossIcon: React.FC<IconProps> = ({ isActive = false, outlineColor, fillColor, ...props }) => {
    const { outlineActive, outlineInactive } = initColors(
        outlineColor,
        fillColor
    );
    const fill = 'transparent';
    const outline = isActive ? outlineActive : outlineInactive;

    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.70711 4.29289C5.31658 3.90237 4.68342 3.90237 4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289 5.70711L8.83625 10.2505L4.29293 14.7938C3.90241 15.1843 3.90241 15.8175 4.29293 16.208C4.68346 16.5985 5.31662 16.5985 5.70715 16.208L10.2505 11.6647L14.7938 16.208C15.1843 16.5985 15.8175 16.5985 16.208 16.208C16.5985 15.8175 16.5985 15.1843 16.208 14.7938L11.6647 10.2505L16.208 5.70711C16.5986 5.31658 16.5986 4.68342 16.208 4.29289C15.8175 3.90237 15.1844 3.90237 14.7938 4.29289L10.2505 8.83625L5.70711 4.29289Z"
                fill={outline}
            />
        </svg>
    );
};

export const EditIcon: React.FC<IconProps> = ({ isActive = false, outlineColor, fillColor, ...props }) => {
    const { outlineActive, outlineInactive } = initColors(
        outlineColor,
        fillColor
    );
    const fill = 'transparent';
    const outline = isActive ? outlineActive : outlineInactive;

    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
                stroke={outline}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M16.0399 3.01976L8.15988 10.8998C7.85988 11.1998 7.55988 11.7898 7.49988 12.2198L7.06988 15.2298C6.90988 16.3198 7.67988 17.0798 8.76988 16.9298L11.7799 16.4998C12.1999 16.4398 12.7899 16.1398 13.0999 15.8398L20.9799 7.95976C22.3399 6.59976 22.9799 5.01976 20.9799 3.01976C18.9799 1.01976 17.3999 1.65976 16.0399 3.01976Z"
                stroke={outline}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.9099 4.1499C15.5799 6.5399 17.4499 8.4099 19.8499 9.0899"
                stroke={outline}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const MoreCircleIcon: React.FC<IconProps> = ({ isActive = false, outlineColor, fillColor, ...props }) => {
    const { fillActive, fillInactive } = initColors(
        outlineColor,
        fillColor
    );
    const outline = 'transparent';
    const fill = isActive ? fillActive : fillInactive;

    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill={outline}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M15.9998 2.66675C8.65317 2.66675 2.6665 8.65341 2.6665 16.0001C2.6665 23.3467 8.65317 29.3334 15.9998 29.3334C23.3465 29.3334 29.3332 23.3467 29.3332 16.0001C29.3332 8.65341 23.3465 2.66675 15.9998 2.66675ZM10.6665 17.3334C9.91984 17.3334 9.33317 16.7334 9.33317 16.0001C9.33317 15.2667 9.93317 14.6667 10.6665 14.6667C11.3998 14.6667 11.9998 15.2667 11.9998 16.0001C11.9998 16.7334 11.4132 17.3334 10.6665 17.3334ZM15.9998 17.3334C15.2532 17.3334 14.6665 16.7334 14.6665 16.0001C14.6665 15.2667 15.2665 14.6667 15.9998 14.6667C16.7332 14.6667 17.3332 15.2667 17.3332 16.0001C17.3332 16.7334 16.7465 17.3334 15.9998 17.3334ZM21.3332 17.3334C20.5865 17.3334 19.9998 16.7334 19.9998 16.0001C19.9998 15.2667 20.5998 14.6667 21.3332 14.6667C22.0665 14.6667 22.6665 15.2667 22.6665 16.0001C22.6665 16.7334 22.0798 17.3334 21.3332 17.3334Z"
                fill={fill}
            />
        </svg>
    );
};

export const FlagOutlineIcon: React.FC<IconProps> = ({
    isActive = false,
    outlineColor = { active: 'black', inactive: 'black' },
    fillColor = { active: 'black', inactive: 'black' },
    ...props
}) => {
    const fill = 'transparent';
    const { outlineActive } = initColors(outlineColor, fillColor);

    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M5.1499 2V22"
                stroke={outlineActive}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.1499 4H16.3499C19.0499 4 19.6499 5.5 17.7499 7.4L16.5499 8.6C15.7499 9.4 15.7499 10.7 16.5499 11.4L17.7499 12.6C19.6499 14.5 18.9499 16 16.3499 16H5.1499"
                stroke={outlineActive}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const VolumeOutlineIcon: React.FC<IconProps> = ({
    isActive = false,
    outlineColor = { active: 'black', inactive: 'black' },
    fillColor = { active: 'black', inactive: 'black' },
    ...props
}) => {
    const fill = 'transparent';
    const { outlineActive } = initColors(outlineColor, fillColor);
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M2 10V14C2 16 3 17 5 17H6.43C6.8 17 7.17 17.11 7.49 17.3L10.41 19.13C12.93 20.71 15 19.56 15 16.59V7.41003C15 4.43003 12.93 3.29003 10.41 4.87003L7.49 6.70003C7.17 6.89003 6.8 7.00003 6.43 7.00003H5C3 7.00003 2 8.00003 2 10Z"
                stroke={outlineActive}
                strokeWidth="1.5"
            />
            <path
                d="M18 8C19.78 10.37 19.78 13.63 18 16"
                stroke={outlineActive}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M19.8301 5.5C22.7201 9.35 22.7201 14.65 19.8301 18.5"
                stroke={outlineActive}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const VolumeMuteOutlineIcon: React.FC<IconProps> = ({
    isActive = false,
    outlineColor = { active: 'black', inactive: 'black' },
    fillColor = { active: 'black', inactive: 'black' },
    ...props
}) => {
    const fill = 'transparent';
    const { outlineActive } = initColors(outlineColor, fillColor);
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M15 8.37003V7.41003C15 4.43003 12.93 3.29003 10.41 4.87003L7.49 6.70003C7.17 6.89003 6.8 7.00003 6.43 7.00003H5C3 7.00003 2 8.00003 2 10V14C2 16 3 17 5 17H7"
                stroke={outlineActive}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.4102 19.13C12.9302 20.71 15.0002 19.56 15.0002 16.59V12.95"
                stroke={outlineActive}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M18.81 9.41992C19.71 11.5699 19.44 14.0799 18 15.9999"
                stroke={outlineActive}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M21.1501 7.80005C22.6201 11.29 22.1801 15.37 19.8301 18.5"
                stroke={outlineActive}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M22 2L2 22"
                stroke={outlineActive}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const EmailIcon: React.FC<IconProps> = ({
    isActive = false,
    outlineColor = { active: 'black', inactive: 'black' },
    fillColor = { active: 'black', inactive: 'black' },
    accentColor,
    ...props
}) => {
    const { outlineInactive, outlineActive } = initColors(
        outlineColor,
        fillColor,
        accentColor
    );

    const outline = isActive ? outlineActive : outlineInactive;

    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="transparent"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                stroke={outline}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
                stroke={outline}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
