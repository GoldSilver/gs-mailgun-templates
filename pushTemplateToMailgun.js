const secrets = require('./secrets.json').mailgun;
const fs = require('fs');
const mailgun = require('mailgun-js')({
    apiKey: secrets.api_key,
    domain: secrets.domain
});
// get template
const templateIndex = process.argv.indexOf('-template');
let templateName = process.argv[templateIndex + 1];
let type = 'post';
const descriptionIndex = process.argv.indexOf('-description');
let description = descriptionIndex > -1 ? process.argv[descriptionIndex + 1] : null;
const versionIndex = process.argv.indexOf('-version');
let version = versionIndex > -1 ? process.argv[versionIndex + 1] : null;

// get optional type param
const typeIndex = process.argv.indexOf('-type');

if (typeIndex > -1) {
    typeValue = process.argv[typeIndex + 1];

    if (['post', 'put'].includes(typeValue)) {
        type = typeValue;
    }
}

if (templateName) {
    template = fs.readFile('./dist/' + templateName + '.html', 'utf8', (error, data) => {
        if (error) { throw error; }
        if (!data) { throw 'File not found'; }

        let options = {
            template: data
        };

        if (type === 'post') {
            options.name = templateName;
            options.description = description ? description : 'GoldSilver Template';

            if (version) {
                options.tag = version;
            }

            mailgun.post(`/${secrets.domain}/templates`, options);
        } else {
            options.active = true;

            if (description) {
                options.description = description;
            }

            if (version) {
                options.tag = version
            } else {
                throw 'Version not specified.'
            }

            mailgun.post(`/${secrets.domain}/templates/${templateName}/versions`, options);
        }
    });
} else {
    throw 'No template specified';
}
