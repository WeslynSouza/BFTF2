import Imagem from '../models/imagem';

export default {
    render(imagem: Imagem) {
        return {
            id: imagem.id,
            url: `http://localhost:3333/uploads/${imagem.path}`,
        }
    },

    renderMany(imagens: Imagem[]) {
        return imagens.map(imagem => this.render(imagem));
    }
}