const fs = require('fs');
const cheerio = require('cheerio');

fs.readFile('real_home.html', 'utf8', (err, html) => {
    if (err) throw err;

    // Load the massive HTML
    const $ = cheerio.load(html);

    // Remove scripts and style tags to minimize noise
    $('script, style, noscript, svg, path, iframe, img').remove();

    // Dump the exact layout structure with classes
    let structure = '';

    // Recursive function to get structure
    function getStructure(node, indent = 0) {
        if (node.type === 'tag') {
            const className = node.attribs.class ? ` class="${node.attribs.class}"` : '';
            const id = node.attribs.id ? ` id="${node.attribs.id}"` : '';

            structure += '  '.repeat(indent) + `<${node.name}${id}${className}>\n`;

            node.children.forEach(child => getStructure(child, indent + 1));

            // Only close block level tags for readability
            if (!['span', 'a', 'p', 'b', 'i', 'strong', 'button'].includes(node.name)) {
                structure += '  '.repeat(indent) + `</${node.name}>\n`;
            } else {
                // We omit the closing tag for inline elements in the map for brevity
                structure = structure.slice(0, -1) + `</${node.name}>\n`;
            }
        } else if (node.type === 'text') {
            const text = node.data.trim();
            if (text && text.length > 2) {
                structure += '  '.repeat(indent) + `${text}\n`;
            }
        }
    }

    const body = $('body').get(0);
    getStructure(body);

    fs.writeFileSync('layout_structure.txt', structure);
    console.log("Extracted clean structure to layout_structure.txt");
});
