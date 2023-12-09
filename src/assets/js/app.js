import { ProductCrud } from "./productCrud.js"

const productCrud = new ProductCrud()

function addProduct() {
    const productName = document.getElementById('productName').value
    const productPrice = document.getElementById('productPrice').value
    const productQtd = document.getElementById('productQtd').value

    if (
        productName &&
        productPrice &&
        !isNaN(productQtd) &&
        productQtd !== ''
    ) {
        const newProduct = {
            id: productCrud.generateProductId(),
            name: productName,
            price: Number(productPrice),
            qtdEstoque: Number(productQtd),
        }

        // Adiciona o novo produto a lista
        productCrud.addProduct(newProduct)

        // Atualiza a lista contendo o novo produto
        updateTable()

        // Limpa o formulário
        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
        document.getElementById('productQtd').value = '';

    } else {
        alert('Por favor, preencha todos os campos!')
    }
}

// Função para atualizar registro
function updateProduct(productId, product) {
    if (
        productId &&
        product.updateName &&
        product.updatePrice &&
        product.updateQtd
    ) {
        productCrud.updateProduct(productId, {
            name: product.updateName,
            price: product.updatePrice,
            qtdEstoque: product.updateQtd,
        })

        // Atualiza a lista contendo o produto atualizado
        updateTable()
    } else {
        alert('Preencha todos os campos!')
    }
}

// Função para excluir um produto
function deleteProduct(productId) {
    const confirmDelete = confirm(`Tem certeza que deseja excluir o item ${productId}?`)
    if (confirmDelete) {
        productCrud.deleteProduct(productId)

        // Atualiza a lista
        updateTable()
    }
}

// Função para atualizar e listar tabela com produtos
function updateTable() {
    const tableBody = document.querySelector('#productTable tbody')

    // Garantia que a tabela esteja vazia
    tableBody.innerHTML = ''

    // Obter todos os produtos
    const products = productCrud.getAllProducts()

    products.forEach(product => {
        const row = document.createElement('tr')

        // Formatar para unidade monetária BRL
        const formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })

        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${formatter.format(product.price)}</td>
            <td>${product.qtdEstoque}</td>
            <td id="actions">
                <button class="openModalBtn" data-product-id="${product.id}" type="button">Editar</button>
                <button class="deleteBtn" data-product-id="${product.id}" type="button">Excluir</button>
            </td>
     `

        tableBody.appendChild(row)
    })
}

updateTable()

const btnForm = document.getElementById('productForm')
btnForm.addEventListener('submit', function (event) {
    // Previne o envio padrão do formulário
    event.preventDefault()
    // Chamar a função de adicionar produto
    addProduct()
})

const actions = document.getElementById('productTable')
const modal = document.querySelector('.modal')
const updateProductBtn = document.getElementById('updateProductBtn')
let productId

actions.addEventListener('click', function (event) {
    const target = event.target

    if (target.classList.contains('deleteBtn')) {
        productId = target.dataset.productId
        deleteProduct(productId)
    } else if (target.classList.contains('openModalBtn')) {
        productId = target.dataset.productId

        insertModalFields()
        modal.style.display = "block"
    }

})

updateProductBtn.addEventListener('click', function () {
    const productNameInput = document.getElementById('updateProductName')
    const productPriceInput = document.getElementById('updateProductPrice')
    const productQtdInput = document.getElementById('updateProductQtd')

    updateProduct(productId, {
        updateName: productNameInput.value,
        updatePrice: productPriceInput.value,
        updateQtd: productQtdInput.value,
    })
    modal.style.display = "none"
})

// Função para fechar modal
modal.addEventListener('click', function (event) {
    if (event.target === modal || event.target.classList.contains('close')) {
        modal.style.display = "none"
    }
})

// Função responsável por inserir os dados nos inputs da modal
function insertModalFields() {
    const product = productCrud.getProductById(productId)

    document.getElementById('updateProductName').value = product.name
    document.getElementById('updateProductPrice').value = product.price
    document.getElementById('updateProductQtd').value = product.qtdEstoque
}
