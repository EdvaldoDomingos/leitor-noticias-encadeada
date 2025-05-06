// Estrutura de Nó (Node) para Lista Encadeada
class No {
    constructor(id, titulo, conteudo) {
      this.id = id;
      this.titulo = titulo;
      this.conteudo = conteudo;
      this.proximo = null;
    }
  }
  
  // Lista Encadeada de Notícias
  class ListaEncadeada {
    constructor() {
      this.inicio = null;
    }
  
    adicionarNoFim(id, titulo, conteudo) {
      const novoNo = new No(id, titulo, conteudo);
      if (!this.inicio) {
        this.inicio = novoNo;
      } else {
        let atual = this.inicio;
        while (atual.proximo) {
          atual = atual.proximo;
        }
        atual.proximo = novoNo;
      }
    }
  
    removerPorId(id) {
      if (!this.inicio) return false;
  
      if (this.inicio.id === id) {
        this.inicio = this.inicio.proximo;
        return true;
      }
  
      let atual = this.inicio;
      while (atual.proximo && atual.proximo.id !== id) {
        atual = atual.proximo;
      }
  
      if (atual.proximo) {
        atual.proximo = atual.proximo.proximo;
        return true;
      }
  
      return false;
    }
  
    buscarPorIndice(indice) {
      let atual = this.inicio;
      let contador = 0;
      while (atual && contador < indice) {
        atual = atual.proximo;
        contador++;
      }
      return atual;
    }
  
    comprimento() {
      let atual = this.inicio;
      let contador = 0;
      while (atual) {
        contador++;
        atual = atual.proximo;
      }
      return contador;
    }
  
    ultimoId() {
      let atual = this.inicio;
      let ultimo = 0;
      while (atual) {
        ultimo = atual.id;
        atual = atual.proximo;
      }
      return ultimo;
    }
  }
  
  // Instância da lista de notícias
  const listaNoticias = new ListaEncadeada();
  listaNoticias.adicionarNoFim(1, "Notícia 1", "Conteúdo da Notícia 1");
  listaNoticias.adicionarNoFim(2, "Notícia 2", "Conteúdo da Notícia 2");
  listaNoticias.adicionarNoFim(3, "Notícia 3", "Conteúdo da Notícia 3");
  
  let historico = []; // Pilha
  let indiceAtual = 0;
  
  // Exibir a notícia atual
  function exibirNoticia() {
    const noticia = listaNoticias.buscarPorIndice(indiceAtual);
    if (!noticia) return;
    document.getElementById("titulo").innerText = `${noticia.titulo} (ID: ${noticia.id})`;
    document.getElementById("conteudo").innerText = noticia.conteudo;
  }
  
  // Navegação
  function proxima() {
    if (indiceAtual < listaNoticias.comprimento() - 1) {
      historico.push(indiceAtual);
      indiceAtual++;
      exibirNoticia();
    }
  }
  
  function anterior() {
    if (indiceAtual > 0) {
      historico.push(indiceAtual);
      indiceAtual--;
      exibirNoticia();
    }
  }
  
  function voltar() {
    historico.pop(); // Remove atual
    const anterior = historico.pop(); // Pega anterior
    if (anterior !== undefined) {
      indiceAtual = anterior;
      exibirNoticia();
    }
  }
  
  // Adicionar notícia
  function adicionarNoticia() {
    const titulo = document.getElementById("novoTitulo").value;
    const conteudo = document.getElementById("novoConteudo").value;
    if (titulo && conteudo) {
      const novoId = listaNoticias.ultimoId() + 1;
      listaNoticias.adicionarNoFim(novoId, titulo, conteudo);
      alert("Notícia adicionada!");
      document.getElementById("novoTitulo").value = "";
      document.getElementById("novoConteudo").value = "";
    } else {
      alert("Preencha título e conteúdo!");
    }
  }
  
  // Remover por ID
  function removerNoticia() {
    const id = parseInt(document.getElementById("removerId").value);
    const removido = listaNoticias.removerPorId(id);
    if (removido) {
      alert(`Notícia ID ${id} removida!`);
      if (indiceAtual >= listaNoticias.comprimento()) {
        indiceAtual = listaNoticias.comprimento() - 1;
      }
      exibirNoticia();
    } else {
      alert("ID não encontrado!");
    }
  }
  
  // Inicializar
  window.onload = exibirNoticia;
  