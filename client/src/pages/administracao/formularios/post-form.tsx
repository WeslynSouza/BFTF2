
export default function PostForm() {
    return (
        <div className="administracao-tab-container">
            <div className="tab-header">
                <h2>Alterar post</h2>
            </div>

            <form>
                <fieldset>
                    <label htmlFor="Titulo">Titulo</label>
                    <input type="text" id='Titulo' name='Titulo'/>
                </fieldset>
                <fieldset>
                    <label htmlFor="Conteudo">Conteudo</label>
                    <input type='text' id="Conteudo" name='Conteudo'/>
                </fieldset>
            </form>
        </div>
    )
}