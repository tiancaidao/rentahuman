const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('real_home.html', 'utf8');
const $ = cheerio.load(html);

const humans = [];

$('.group.flex-shrink-0.w-56').each((i, el) => {
    // Only parse the first 30 humans to avoid massive seed files
    if (i >= 30) return;

    const name = $(el).find('h3').text().trim();
    const location = $(el).find('p.text-zinc-500').text().trim();

    // Services
    const skills = [];
    $(el).find('.flex-wrap span').each((j, span) => {
        const skill = $(span).text().trim();
        if (skill) skills.push(skill);
    });

    // Rate String e.g. "$25/hr"
    let rateStr = $(el).find('span.text-orange-400').last().text().trim();
    let rate = 50; // default
    if (rateStr) {
        const match = rateStr.match(/\$(\d+)/);
        if (match) rate = parseInt(match[1]);
    }

    if (name) {
        humans.push({
            name,
            location,
            skills,
            rate
        });
    }
});

fs.writeFileSync('crawled_humans.json', JSON.stringify(humans, null, 2));
console.log(`Extracted ${humans.length} humans to crawled_humans.json`);
