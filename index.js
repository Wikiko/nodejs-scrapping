const rp = require('request-promise');
const cheerio = require('cheerio');

const options = {
    url: 'https://globoesporte.globo.com/futebol/brasileirao-serie-a',
    transform: body => cheerio.load(body)
};

const extractTeams = $ => $('.tabela-body-linha')
    .filter((i, element) =>
        $(element).find('.tabela-times-time-nome').text() !== '')
    .map((i, element) => ({
        nome: $(element).find('.tabela-times-time-nome').text(),
        posicao: parseInt($(element).find('.tabela-times-posicao').text())
    }))
    .get();

// simulando salvar no banco de daddos.
const processData = dados => console.log(JSON.stringify(dados));

rp(options)
    .then(extractTeams)
    .then(processData)
    .catch(err => {
        console.log(err);
    });
