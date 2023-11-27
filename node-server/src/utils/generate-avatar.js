const { createCanvas } = require('canvas');
const { floor, random } = require('lodash');

function avatarColor() {
    const colors = [
        '#f44336',
        '#e91e63',
        '#2196f3',
        '#9c27b0',
        '#3f51b5',
        '#00bcd4',
        '#4caf50',
        '#ff9800',
        '#8bc34a',
        '#009688',
        '#03a9f4',
        '#cddc39',
        '#2962ff',
        '#448aff',
        '#84ffff',
        '#00e676',
        '#43a047',
        '#d32f2f',
        '#ff1744',
        '#ad1457',
        '#6a1b9a',
        '#1a237e',
        '#1de9b6',
        '#d84315'
    ];
    return colors[floor(random(0.9) * colors.length)];
}

function generateAvatar(text, backgroundColor, foregroundColor = 'white') {
    const canvas = createCanvas(200, 200);
    const context = canvas.getContext('2d');

    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.font = 'normal 80px sans-serif';
    context.fillStyle = foregroundColor;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    return canvas.toBuffer();
}

function generateAvatarFromName(name) {
    const backgroundColor = avatarColor();
    const foregroundColor = 'white';
    const initials = name.split(' ').map((word, i) => i < 2 ? word[0] : '').join('').toUpperCase();
    return generateAvatar(initials, backgroundColor, foregroundColor);
}

module.exports = {
    generateAvatarFromName,
}