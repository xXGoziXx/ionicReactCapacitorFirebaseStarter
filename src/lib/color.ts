export interface IconProps extends React.SVGProps<SVGSVGElement> {
    isActive?: boolean;
    outlineColor?: ColorState;
    fillColor?: ColorState;
    accentColor?: ColorState;
    slot?: string;
}

export interface ColorState {
    active: string;
    inactive: string;
}

export const initColors = (
    outlineColor?: ColorState,
    fillColor?: ColorState,
    accentColor?: ColorState
) => {
    const outlineInactive = outlineColor?.inactive ?? '#616467';
    const outlineActive = outlineColor?.active ?? 'transparent';
    const fillInactive = fillColor?.inactive ?? 'white';
    const fillActive = fillColor?.active ?? 'black';
    const accentInactive = accentColor?.inactive ?? '#616467';
    const accentActive = accentColor?.active ?? 'white';

    return {
        outlineInactive,
        outlineActive,
        fillInactive,
        fillActive,
        accentInactive,
        accentActive
    };
};
