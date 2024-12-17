// Classe para Material de Leitura
class Material {
    constructor(titulo, autor, tipo, dataInicio, dataFim) {
        if (!titulo || !autor || !tipo) {
            throw new Error("Título, autor e tipo são obrigatórios.");
        }
        this.titulo = titulo;
        this.autor = autor;
        this.tipo = tipo;
        this.dataInicio = dataInicio || null;
        this.dataFim = dataFim || null;
        this.status = "não iniciado";
        this.resumo = "";
    }

    alterarStatus(novoStatus) {
        this.status = novoStatus;
    }

    editarResumo(novoResumo) {
        this.resumo = novoResumo;
    }

    exibirInformacoes() {
        return {
            titulo: this.titulo,
            autor: this.autor,
            tipo: this.tipo,
            status: this.status,
            resumo: this.resumo,
            dataInicio: this.dataInicio,
            dataFim: this.dataFim,
        };
    }
}

// Subclasses específicas
class Livro extends Material {
    constructor(titulo, autor, dataInicio, dataFim, numeroPaginas) {
        super(titulo, autor, "Livro", dataInicio, dataFim);
        this.numeroPaginas = numeroPaginas;
        this.paginasLidas = 0;
    }

    atualizarProgresso(paginasLidas) {
        if (paginasLidas > this.numeroPaginas || paginasLidas < 0) {
            throw new Error("Número de páginas lidas inválido.");
        }
        this.paginasLidas = paginasLidas;
        this.alterarStatus(paginasLidas === this.numeroPaginas ? "lido" : "em andamento");
    }

    exibirInformacoes() {
        const info = super.exibirInformacoes();
        return { ...info, numeroPaginas: this.numeroPaginas, paginasLidas: this.paginasLidas };
    }
}

class Revista extends Material {
    constructor(titulo, autor, dataInicio, dataFim, edicao) {
        super(titulo, autor, "Revista", dataInicio, dataFim);
        this.edicao = edicao;
    }

    exibirInformacoes() {
        const info = super.exibirInformacoes();
        return { ...info, edicao: this.edicao };
    }
}

class Artigo extends Material {
    constructor(titulo, autor, dataInicio, dataFim, linkReferencia) {
        super(titulo, autor, "Artigo", dataInicio, dataFim);
        if (linkReferencia && !linkReferencia.startsWith("http")) {
            throw new Error("Link de referência inválido.");
        }
        this.linkReferencia = linkReferencia;
    }

    exibirInformacoes() {
        const info = super.exibirInformacoes();
        return { ...info, linkReferencia: this.linkReferencia };
    }
}

// Classe para gerenciar materiais de leitura
class GestorDeLeituras {
    constructor() {
        this.materiais = [];
    }

    adicionarMaterial(material) {
        if (this.materiais.some(m => m.titulo.toLowerCase() === material.titulo.toLowerCase())) {
            throw new Error("Material com este título já existe.");
        }
        this.materiais.push(material);
    }

    listarMateriais() {
        return this.materiais.map(material => material.exibirInformacoes());
    }

    buscarMaterial(campo, valor) {
        return this.materiais.filter(material => material[campo]?.toLowerCase().includes(valor.toLowerCase()));
    }

    atualizarStatus(titulo, novoStatus) {
        const material = this.materiais.find(m => m.titulo.toLowerCase() === titulo.toLowerCase());
        if (material) {
            material.alterarStatus(novoStatus);
            return material;
        }
        throw new Error("Material não encontrado.");
    }

    editarResumo(titulo, novoResumo) {
        const material = this.materiais.find(m => m.titulo.toLowerCase() === titulo.toLowerCase());
        if (material) {
            material.editarResumo(novoResumo);
            return material;
        }
        throw new Error("Material não encontrado.");
    }
}

// Exemplo de uso
const gestor = new GestorDeLeituras();

// Criando materiais
const livro = new Livro("O Senhor dos Anéis", "J.R.R. Tolkien", "2024-01-01", "2024-01-31", 1200);
const revista = new Revista("National Geographic", "Diversos", "2024-02-01", null, "Edição 345");
const artigo = new Artigo("Teoria da Relatividade", "Albert Einstein", null, null, "https://example.com/relatividade");

// Adicionando materiais
gestor.adicionarMaterial(livro);
gestor.adicionarMaterial(revista);
gestor.adicionarMaterial(artigo);

// Atualizando progresso do livro
livro.atualizarProgresso(600);

// Listando materiais
console.log("Materiais cadastrados:", gestor.listarMateriais());

// Buscando material
console.log("Busca por título 'relatividade':", gestor.buscarMaterial("titulo", "relatividade"));

// Atualizando status
gestor.atualizarStatus("O Senhor dos Anéis", "lido");

// Editando resumo
gestor.editarResumo("O Senhor dos Anéis", "Uma aventura épica pela Terra Média.");

// Listando materiais atualizados
console.log("Materiais atualizados:", gestor.listarMateriais());