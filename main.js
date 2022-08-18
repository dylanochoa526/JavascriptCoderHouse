const agregarACarritoBotones = document.querySelectorAll(`.agregarACarrito`)
agregarACarritoBotones.forEach(agregarACarritoBoton => {
    agregarACarritoBoton.addEventListener(`click`, agregarACarritoClick)
})

const contenedorItemConteiner = document.querySelector('.contenedorItemCarrito')

const mensaje =document.querySelector(`.finalizar`)
mensaje.addEventListener(`click`, finalizar)
function finalizar(){
    alert("Gracias por comprar")
}

function agregarACarritoClick(event) {
    const button = event.target;
    const item = button.closest(`.item`);

    const itemNombre = item.querySelector(`.item-nombre`).textContent;
    const itemPrecio = item.querySelector(`.item-precio`).textContent;
    const itemImagen = item.querySelector(`.item-imagen`).src;

    agregarItemACarrito(itemNombre, itemPrecio, itemImagen)
}

function agregarItemACarrito(itemNombre, itemPrecio, itemImagen) {
    
    const columnaCarrito = document.createElement(`tr`)
    columnaCarrito.className ="itemCarrito"
    const carritoContenedor = `
    <td>
    <img class="imageCarrito" src="${itemImagen}" >
    </td>
    <td>
        <div class="email">
            <span>${itemNombre}</span>
        </div>
    </td>
    <td class="precioItemCarrito">${itemPrecio}</td>
    <td>
                                <div class="col-4">
                                    <div
                                        class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                                        <input class="cantidadItemCarritoInput cantidadItemCarrito" type="number"
                                            value="1">
                                    </div>
                                </div>
                            </td>
    <td>
        <button class="btn btn-danger botonBorrar" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true"><i class="fa fa-close"></i>x</span>
        </button>
    </td>
    </tr>`
    columnaCarrito.innerHTML = carritoContenedor
    contenedorItemConteiner.append(columnaCarrito)
    columnaCarrito.querySelector(`.botonBorrar`).addEventListener(`click`,borrarItemCarrito)
    columnaCarrito.querySelector(`.cantidadItemCarrito`).addEventListener(`change`,cambiarCantidadCarrito)

    actualizarPrecioTotal()
}

function actualizarPrecioTotal() {
    let total = 0;
    const precioTotal = document.querySelector(".precioTotal")
    const itemsCarrito = document.querySelectorAll(".itemCarrito")

    itemsCarrito.forEach((itemCarrito) => {
        const precioItemCarritoElement = itemCarrito.querySelector(`.precioItemCarrito`);
        const precioItemCarrito = Number( precioItemCarritoElement.textContent.replace("$", " "));

        const cantidadItemCarritoElemento = itemCarrito.querySelector(`.cantidadItemCarrito`)
        const cantidadItemCarrito =  Number(cantidadItemCarritoElemento.value);

        total = total + precioItemCarrito * cantidadItemCarrito

        console.log(total)

        precioTotal.innerHTML =`$${total}`
    })
}
function borrarItemCarrito(event){
    const clickBottonBorrar = event.target;
    clickBottonBorrar.closest(`.itemCarrito`).remove();
    actualizarPrecioTotal()
}

function cambiarCantidadCarrito(event){
    const input = event.target;
    if (input.value <= 0){
        input.value = 1;
    }
    actualizarPrecioTotal();
}