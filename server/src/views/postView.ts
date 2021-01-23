import Post from '../models/post';

export default {

    render(post: Post){
        return {
            Id: post.id,
            Autor: post.autor.nick,
            Titulo: post.titulo,
            Conteudo: post.conteudo,
            Imagens: post.imagens.map(imagem =>  imagem.path)
        }
    },

    renderMany(posts: Post[]){
        return posts.map(post => this.render(post));
    }
}