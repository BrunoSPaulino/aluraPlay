import { conectaApi } from './conectaApi.js';

const lista = document.querySelector('[data-lista]');

function constroiCard(id, titulo, descricao, imagem, url) {
    const video = document.createElement("li");
    video.className = "videos__item";
    video.innerHTML = `
        <iframe width="100%" height="72%" src="${url}" 
            title="${titulo}" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
            <button class="excluir-video">Excluir</button>
        <div class="descricao-video">
            <img src="${imagem}" alt="Logo do canal Alura Cursos Online">
            <h3>${titulo}</h3>
            <p>${descricao}</p>
        </div>
    `;

    // Adiciona evento de clique ao botão de exclusão
    video.querySelector('.excluir-video').addEventListener('click', async () => {
        await conectaApi.excluiVideo(id);
        video.remove();
    });

    return video;
};

async function listaVideos() {
    try {
    const listaApi = await conectaApi.listaVideos();
    listaApi.forEach(elemento => lista.appendChild(constroiCard(elemento.id, elemento.titulo, elemento.descricao, elemento.imagem, elemento.url)));
    } catch {
        lista.innerHTML = `<h2 class="mensagem__titulo">Não foi possível carregar os vídeos.</h2>`;
    }
};

listaVideos();

function filtrarVideos(event) {
    event.preventDefault();
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
};