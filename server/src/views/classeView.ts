import Classe from '../models/classe';

export default {

    render(classe: Classe){
        return {
            Id: classe.id,
            Nome: classe.nome
        }
    },

    renderMany(classes: Classe[]){
        return classes.map(classe => this.render(classe));
    }
}