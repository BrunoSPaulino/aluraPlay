import { conectaApi } from './conectaApi.js';

const lista = document.querySelector('[data-lista]');

// FUNÇÃO PARA BUSCAR OS VÍDEOS NA BARRA DE PESQUISA.

function buscarVideo(evento) {
    evento.preventDefault();

    const busca = conectaApi.buscaVideo(document.getElementById('pesquisar').value);
    const termoPesquisa = document.getElementById('pesquisar').value.toLowerCase();
    const videos = document.querySelectorAll('.videos__item');

    videos.forEach(video => {
        const titulo = video.querySelector('h3').textContent.toLowerCase();
        if (titulo.includes(termoPesquisa)) {
            video.style.display = 'block';
        } else {
            video.style.display = 'none';
        }
    });
    if (busca.length == 0) {
        lista.innerHTML = `<h2 class="mensagem__titulo">Nenhum vídeo encontrado.</h2>`;
    }
};

document.getElementById('pesquisar').addEventListener('input', buscarVideo);