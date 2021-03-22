
import breakpoints from './breakpoints';

const space = 2
const basicGrid = {
    flexDirection: "row",
}
const grids = {
    oneColumnGrid: {
        ...basicGrid,
        gridTemplateColumns: '1fr',
        gridColumnGap: space * 4
    },
    twoColumnGrid: {
        ...basicGrid,
        gridTemplateColumns: '5fr  5fr',
        [breakpoints.largeTablet]: {
            gridTemplateColumns: '1fr',
            gridColumnGap: space * 4
        }

    },
    thirdsGrid: {
        ...basicGrid,
        gridTemplateColumns: '1fr 10fr 1fr',
    },
    fourColumnGrid: {
        ...basicGrid,
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridGap: '8px',
        [breakpoints.tablet]: {
            gridTemplateColumns: '1fr 1fr 1fr',
            gridColumnGap: space * 3
        },
        [breakpoints.largeTablet]: {
            gridTemplateColumns: '1fr 1fr 1fr',
            gridColumnGap: space * 4
        },
        [breakpoints.largePhone]: {
            gridTemplateColumns: '1fr 1fr',
            gridColumnGap: space * 4
        }
    },
    pentaGrid: {
        ...basicGrid,
        justifyItems: 'center',
        gridColumnGap: 1,
        gridGap: '0px',
        gridTemplateColumns: '1fr  1fr 1fr 1fr 1fr ',

    },
    sixColumnGrid: {
        ...basicGrid,
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',

        [breakpoints.largeTablet]: {
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gridColumnGap: space * 4
        },
        [breakpoints.largePhone]: {
            gridTemplateColumns: '1fr 1fr 1fr',
            gridColumnGap: space * 4
        }
    },
    octaGrid: {
        ...basicGrid,
        justifyItems: 'center',
        gridColumnGap: space * 2,
        gridTemplateColumns: '1fr  1fr 1fr 1fr 1fr 1fr 1fr',
    },
    dashboardGrid: {
        ...basicGrid,
        padding: 0,
        gridTemplateColumns: '1fr 5fr',
        [breakpoints.largeTablet]: {
            gridTemplateColumns: '3fr 3fr',
            gridColumnGap: space * 4
        }

    },
    dashboardGrid2: {
        ...basicGrid,
        padding: 0,
        gridTemplateColumns: '1fr  11fr',
        [breakpoints.largeTablet]: {
            gridTemplateColumns: '1fr',
            gridColumnGap: space * 4,
            '&> #menu':{display:'none'}
        }
    },
}

export default grids;
