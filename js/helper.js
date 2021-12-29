/**
 * @param {number,number,number,number} x and y coordinates of two points
 * @returns {number}
 **/
function distance(x1, y1, x2, y2) {
    const x = x1 - x2;
    const y = y1 - y2;
    const distSq = x * x + y * y;
    return Math.sqrt(distSq);
}

function random(min, max) {
    return min + Math.random() * (max - min);
}