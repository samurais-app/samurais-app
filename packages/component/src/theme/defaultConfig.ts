import { Theme } from './interface';

const themeConfig:Theme = {
    size: 10,
    unit: 'px',
    mobile: false,
    borderRadius: true,
    color: {
        primary: '#0A992E',
        transparent: 'transparent',
        error: '#fb1f6a',
        background: '#FFFFFF'
    },
    spacing: {
        fontSize: [12,16,22,30,40],
        spacing: [4,8,12,16,20],
        radius: [4,6,8,10,12],
        padding: [8,12,18,26,36]
    }
};

export default themeConfig;