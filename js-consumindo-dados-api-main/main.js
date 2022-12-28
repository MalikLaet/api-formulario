async function buscaEndereco(cep) {
    let mensagemErro = document.getElementById("erro")
    mensagemErro.innerHTML = "";
    try {
        let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        let consultaCEPConvertida = await consultaCEP.json()
        if (consultaCEPConvertida.erro) {
            throw Error("cep invalido")
        }
        let endereco = document.getElementById("endereco");
        let bairro = document.getElementById("bairro");
        let cidade = document.getElementById("cidade");
        let estado = document.getElementById("estado");

        cidade.value = consultaCEPConvertida.localidade;
        estado.value = consultaCEPConvertida.uf;
        endereco.value = consultaCEPConvertida.logradouro;
        bairro.value = consultaCEPConvertida.bairro

        // console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch (erro) {
        mensagemErro.innerHTML =  `<p>CEP inválido. Tente novamente!</p>`
        // console.log(erro)
    }
}

let cep = document.getElementById('cep')
cep.addEventListener("focusout", () => buscaEndereco(cep.value))