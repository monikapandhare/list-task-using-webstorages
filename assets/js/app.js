let cl = console.log;



const formContainer = document.getElementById("formContainer");
const listContainer = document.getElementById("listContainer");
const listControl = document.getElementById("list");
const UpdateBtn = document.getElementById("UpdateBtn");
const submitBtn = document.getElementById("submitBtn");

const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};

let listArray = [];

listArray = JSON.parse(localStorage.getItem("listInfo")) || [];

function listTemp (arr) {
    let result = "";
    arr.forEach(std => {
        result += `
        <div class="card card-info mt-5">
            <div class="card-body" id="${std.id}">
                <div class="row">
                    <div class="col-sm-10">
                        <div class="alert alert-danger">
                            <p class="font-weight-bold">${std.list}</p>
                            <button type="button" class="close btn btn-danger" onclick="onDeleteBtn(this)"><span aria-hidden="true">&times;</span></button>
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <button type="button" class="btn btn-primary mt-1" onclick="onEditBtn(this)"><i class="fa-solid fa-pen-to-square"></i></button>
                    </div>
                </div>
            </div>
        </div>
        `
    })
    listContainer.innerHTML = result;
}
listTemp(listArray)
const onSubmitHandgler = (eve) => {
    eve.preventDefault()
    let obj = {
        list : listControl.value,
        id : generateUuid()
    }
    listArray.unshift(obj);
    listTemp(listArray);
    eve.target.reset();
    localStorage.setItem("listInfo", JSON.stringify(listArray));
}

const onEditBtn = (ele) => {
    let editId = ele.closest(".card-body").id;
    localStorage.setItem("editId",editId);
    let getItemId = listArray.find(ele =>ele.id === editId);
    listControl.value = getItemId.list;

    UpdateBtn.classList.remove("d-none");
    submitBtn.classList.add("d-none");

} 

const onupdateHandler = () => {
    let updateId = localStorage.getItem("editId");
    listArray.forEach(obj =>{
        if(obj.id === updateId)
        obj.list = listControl.value;
    })
    localStorage.setItem("listInfo",JSON.stringify(listArray));
    listTemp(listArray);
    formContainer.reset();
}

const onDeleteBtn = (ele) => {
    let deleteItem = ele.closest(".card-body").id;
    let findItem = listArray.findIndex(arr => arr.id === deleteItem);
    listArray.splice(findItem,1);
    localStorage.setItem("listInfo",JSON.stringify(listArray));
    listTemp(listArray);
}


formContainer.addEventListener("submit",onSubmitHandgler);
UpdateBtn.addEventListener("click",onupdateHandler)