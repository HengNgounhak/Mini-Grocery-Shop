// var btnSave = document.getElementById("saveBtn");
// btnSave.addEventListener("click", saveProduct);

// async function saveProduct() {
//   const product = {
//     name: document.getElementById('name').value,
//     qty: document.getElementById('qty').value,
//     type: document.getElementById('type').value,
//     unit: document.getElementById('unit').value,
//     price: document.getElementById('price').value,
//     discountPrice: document.getElementById('discountPrice').value,
//     desription: document.getElementById('description').value,
//     image: document.getElementById('inputFile').files[0],
//     date: new Date().toISOString().split("T")[0],
//   }
//   // console.log(product)
//   await axios.post('/addProduct', product, {
//     headers: {
//       'content-type': 'multipart/form-data'
//     }
//   }).then(result => {
//         console.log(result);
//         // if (result.success = true) {
//         //     location.replace("http://localhost:3000/adminPanel");
//         // }
//     }).catch(err => {
//         console.log(err);
//     });
// }

async function saveProduct() {
    const formData = new FormData(document.querySelector('form'));
    let dataToSubmit = {};

    for (var pair of formData.entries()) {
        dataToSubmit[pair[0]] = pair[1];
    }

    // console.log(dataToSubmit);
    // await axios.post('http://localhost:3000/addProduct', dataToSubmit)
    //     .then(result => {
    //         console.log(result);
    //         // if (result.success = true) {
    //         //     location.replace("http://localhost:3000/adminPanel");
    //         // }
    //     }).catch(err => {
    //         console.log(err);
    //     });
}

async function deleteProduct(id) {
    // console.log(id);
    await axios.delete('/deleteProduct/' + id)
        .then(result => {
            location.reload();
        })
        .catch(err => {
            console.log(err);
        })
}

async function updateProduct(id) {
    const data = {
      name: document.getElementById("name" + id).value,
      qty: document.getElementById("qty" + id).value,
      unit: document.getElementById("unit" + id).value,
      type: document.getElementById("type" + id).value,
      price: document.getElementById("price" + id).value,
      discountPrice: document.getElementById("discountPrice" + id).value,
      image: document.getElementById("file" + id).files,
      description: document.getElementById("description" + id).value
    }
    // console.log(data)
    await axios.post('/updateProduct/' + id, data)
        .then(result => {
            if (result.data == true) {
                location.reload();
            }
        })
        .catch(err => {
            console.log(err);
        })
}

{/* <td class="text-nowrap text-center"><img src="/Assets/uploadImage/${element._id}" style="max-width:60px; max-height:60px"></td>
                <td class="text-nowrap align-middle">${element.name}</td>
                <td class="text-nowrap align-middle">${element.unit}</td>
                <td class="text-nowrap align-middle">${element.qty}</td>
                <td class="text-nowrap align-middle">${element.price}$</td>
                <td class="text-nowrap align-middle">${element.discountPrice}</td>
                <td class="text-nowrap align-middle">${element.type}</td>
                <td class="text-nowrap text-center align-middle">${element.date}</td>
                <td class="align-middle">${element.description}</td>
                <td class="text-nowrap text-center align-middle">
                    <i class="fas fa-edit" data-toggle="modal" data-target="#edit${element._id}"></i>
                    <i class="fas fa-trash-alt" id="${element._id}" onclick="deleteProduct(this.id)></i>
                </td> */}

async function getProduct() {
    await axios.get('/getProduct')
        .then(products => {
            // render data from server
            // console.log(posts)
            let parentPost = document.getElementById("productTable");
            products.data.forEach(element => {
                var childPost = document.createElement("tr");
                childPost.setAttribute("class", element._id);
                childPost.innerHTML = `<td class="text-nowrap text-center"><img src="/Assets/uploadImage/${element._id}" style="max-width:60px; max-height:60px"></td>
                <td class="text-nowrap align-middle">${element.name}</td>
                <td class="text-nowrap align-middle">${element.unit}</td>
                <td class="text-nowrap align-middle">${element.qty}</td>
                <td class="text-nowrap align-middle">${element.price}$</td>
                <td class="text-nowrap align-middle">${element.discountPrice}</td>
                <td class="text-nowrap align-middle">${element.type}</td>
                <td class="text-nowrap text-center align-middle">${element.date}</td>
                <td class="align-middle">${element.description}</td>
                <td class="text-nowrap text-center align-middle" ><i class="fas fa-edit" data-toggle="modal" data-target="#edit${element._id}"></i>&nbsp;&nbsp;<i class="fas fa-trash-alt" id="${element._id}" onclick="deleteProduct(this.id)"></i></td>
                <div class="modal fade" id="edit${element._id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <form id="update${element._id}" class="needs-validation" novalidate>
                    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h6 class="modal-title" id="exampleModalLongTitle"> Product</h6>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label class="font-weight-bold">Product Name</label>
                                        <input type="text" class="form-control form-control-sm" id="name${element._id}"
                                            value="${element.name}" placeholder="Name" name="name" required>
                                        <div class="invalid-feedback">Please fill out this field</div>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label class="font-weight-bold">Product Qty</label>
                                        <input type="number" class="form-control form-control-sm" id="qty${element._id}"
                                            placeholder="Qty" value="${element.qty}" name="qty" required>
                                        <div class="invalid-feedback">Please fill out this field</div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label class="font-weight-bold">Type</label>
                                        <select id="type${element._id}" class="form-control form-control-sm" name="type" required>
                                            <option ${ element.type == "Food" ? '':'selected'}>Food</option>
                                            <option ${ element.type == "Drink" ? '':'selected'}>Drink</option>
                                            <option ${ element.type == "Ingredient" ? '':'selected'}>Ingredient</option>
                                            <option ${ element.type == "Fruit & Vegetable" ? '':'selected'}>Fruit & Vegetable</option>
                                            <option ${ element.type == "Meat & Seafood" ? '':'selected'}>Meat & Seafood</option>
                                        </select>
                                        <div class="invalid-feedback">Please fill out this field</div>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label class="font-weight-bold">Unit</label>
                                        <input type="text" class="form-control form-control-sm" id="unit${element._id}"
                                            value="${element.unit}" placeholder="Ex: 1kg, 1 Bottle, ..." name="unit" required>
                                        <div class="invalid-feedback">Please fill out this field</div>
                                    </div>
                                </div>
                                <div class="form-row mb-0">
                                    <div class="form-group col-md-6">
                                        <label class="font-weight-bold">Price($)</label>
                                        <input type="number" class="form-control form-control-sm" id="price${element._id}"
                                            value="${element.price}" placeholder="Price" name="price" required>
                                        <div class="invalid-feedback">Please fill out this field</div>
                                        <label class="font-weight-bold mt-3">Discount Price(%)</label>
                                        <input type="number" class="form-control form-control-sm" id="discountPrice${element._id}"
                                            value="${element.price}" placeholder="Discount Price(%)" inputmode="decimal" min="0" max="100"
                                            name="discountPrice" required>
                                        <div class="invalid-feedback">Please fill out this field with integer number (1 to 100 only)
                                        </div>
                                        <label class="font-weight-bold mt-3">Product Image</label>
                                        <div class="input-group mb-3">
                                            <div class="custom-file">
                                                <input type="file" id="file${element._id}" class="inputFile custom-file-input" name="image"
                                                    accept="image/png, image/jpeg" onchange="inputChange(event, '${element._id}')">
                                                <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                                                <div class="invalid-feedback">Please fill out this field</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group col-md-6 text-center">
                                        <img class="preview-images" src="/Assets/uploadImage/${element._id}"
                                            id="preview-${element._id}">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="font-weight-bold">Description</label>
                                    <input type="text" class="form-control form-control-sm" id="description${element._id}"
                                        placeholder="Product description" value="${element.description}" name="description" required>
                                    <div class="invalid-feedback">Please fill out this field</div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" onclick="updateProduct('${element._id}')" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </form>
                </div>`;
                parentPost.appendChild(childPost);
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

async function getUser() {
    await axios.get('/getUser')
        .then(users => {
            // render data from server
            // console.log(posts)
            let parentPost = document.getElementById("userTable");
            users.data.forEach(element => {
                var childPost = document.createElement("tr");
                childPost.setAttribute("class", element._id);
                childPost.innerHTML = `
                    <td>${element.username}</td>
                    <td>${element.email}</td>
                    <td>${element.isAdmin ? "Admin": "Normal"}</td>
                    <td>
                        <i class="fas fa-edit"></i>
                        <i class="fas fa-trash-alt"></i>
                    </td>
                `;
                parentPost.appendChild(childPost);
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

getProduct();
getUser();