
function rem(px: number) {
    const fontSize = window.getComputedStyle(document.documentElement)[
        'font-size'
    ];
    const DESIGN_WIDTH = 750;
    const windowWidth = window.innerWidth;
    return `${((windowWidth / DESIGN_WIDTH) * px) / fontSize}rem`;
}

export default {
    rem
};