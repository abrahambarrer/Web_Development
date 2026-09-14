/* add your code here */

const photos = JSON.parse(content);

const constructStyle = (color) => {
    const luminance = color.luminance < 70 ? `color: white; ` : ``;
    const style = `style="background-color: ` + color.hex + `; ` + luminance + `"`
    return style;
}

const constructColor = (color) => {
    const markupColor = `<span ` + constructStyle(color) + `>` + color.name + `</span>`;
    return markupColor;
}

const outputColors = (colorsArray) => {
    for (const color of colorsArray) {
        document.write(constructColor(color));
    }
}

const outputCard = (photo) => {
    document.write(`<article>`);
    document.write(`<img src="images/` + photo.filename + `" alt="`+ photo.title + `">`);
    document.write(`<div class="caption"`);
    document.write(`<h2>` + photo.title + `</h2>`);
    document.write(`<p>` + photo.location.city + `, ` + photo.location.country + `</p>`);
    document.write(`<h3>Colors</h3>`);
    outputColors(photo.colors);
    document.write(`</article>`);
}

for (const photo of photos) {
    outputCard(photo);
}