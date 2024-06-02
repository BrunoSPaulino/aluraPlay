async function listaVideos() {
    const conexao = await fetch('http://localhost:3000/videos');
    const conexaoConvertida = await conexao.json();
    
    return conexaoConvertida;
};

async function criaVideo(titulo, descricao, url, imagem) {
    const conexao = await fetch('http://localhost:3000/videos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            titulo: titulo,
            descricao: `${descricao} mil visualizações`,
            url: url,
            imagem: imagem
        })
    });

    if (!conexao.ok) {
        throw new Error('Não foi possível criar o vídeo.');
    }

    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
};

async function excluiVideo(id) {
    const response = await fetch(`http://localhost:3000/videos/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Não foi possível excluir o vídeo');
    }
};

async function buscaVideo (termoDeBusca) {
    const conexao = await fetch(`http://localhost:3000/videos?q=${termoDeBusca}`);
    const conexaoConvertida = await conexao.json();
    
    return conexaoConvertida;
};

export const conectaApi = {
    listaVideos, criaVideo, excluiVideo, buscaVideo
};