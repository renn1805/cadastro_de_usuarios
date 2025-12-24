
export default class Usuario {
    #nomeUsuario: string;
    get nomeUsuario() {
        return this.#nomeUsuario
    }

    #emailUsuario: string;
    get emailUsuario() {
        return this.#emailUsuario
    }

    #senhaUsuario: string;

    #profissaoUsuario?: string | undefined;
    get profissaoUsuario() {
        return this.#profissaoUsuario
    }

    constructor(nome: string, email: string, senha: string, profissao?: string) {
        this.#nomeUsuario = nome.toLowerCase();
        this.#emailUsuario = email.toLowerCase();
        this.#senhaUsuario = senha;
        this.#profissaoUsuario = profissao
    };

    compararSenha(senhaComparacao: string): Boolean {
        if (this.#senhaUsuario === senhaComparacao) { return true } else { return false }
    }


    toJSON(){
        return {
            nome: this.#nomeUsuario,
            email: this.#emailUsuario,
            profissao: this.profissaoUsuario != undefined? this.#profissaoUsuario : "Sem profissão registrada" 
        }
    }

}

export let listaUsuarios: Usuario[] = [
    new Usuario(
        "Renan Almieda de Araujo",
        "renan.almeida.arau@gmail.com",
        "Ren1805140114!",
        "Engenheiro de software"
    )
]