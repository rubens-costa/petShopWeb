class ProductCrud {
    constructor() {
        // Recuperar produtos do localstorage ou inicializar com array vazio
        this.products = JSON.parse(localStorage.getItem('products')) || []
    }

    // Atualizar o localstorage com a lista atualizada de produtos
    updateLocalStorage() {
        localStorage.setItem('products', JSON.stringify(this.products))
    }

    // Adicionar um produto
    addProduct(product) {
        this.products.push(product)
        this.updateLocalStorage()
    }

    // Obter todos os produtos
    getAllProducts() {
        return this.products
    }

    // Obter um produto por ID
    getProductById(id) {
        return this.products.find(product => Number(product.id) === Number(id))
    }

    // Editar um produto por ID
    updateProduct(id, updateProduct) {
        // Encontrar o índice do produto no array
        const index = this.products.findIndex(product => Number(product.id) === Number(id))

        // Se o produto for encontrado, atualizar as propriedades
        if (index !== -1) {
            // Sobrescreve o nosso produto original com os novos valores
            this.products[index] = { ...this.products[index], ...updateProduct }
            this.updateLocalStorage()
        }
    }

    // Remover um produto por ID
    deleteProduct(id) {
        this.products = this.products.filter(product => Number(product.id) !== Number(id))
        this.updateLocalStorage()
    }

    // Função para gerar um ID único para o produto
    generateProductId() {
        return Math.floor(Math.random() * 1000) + 1
    }
}

export { ProductCrud }
