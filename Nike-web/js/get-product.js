function putProductChildToPage(child) {
    const mainContent = document.querySelector('.main-content');
    mainContent.id = child.id;
    const subContentImg = document.querySelector('.sub-content-img-item');
    subContentImg.querySelector('img').src = child.avatarImg;
    const mainContentImg = document.querySelector('.main-content-img');
    mainContentImg.querySelector('img').src = child.avatarImg;
    const detailTitle = document.querySelector('.details-title');
    detailTitle.innerHTML = child.title;
    const detailDescribe = document.querySelector('.details-describe');
    detailDescribe.innerHTML = child.describe;
    const prices = document.querySelector('.prices');
    prices.innerHTML = child.prices;
}


function loadShoesProduct() {
    // Lặp qua các key trong sessionStorage
    for (var i = 0; i < sessionStorage.length; i++) {
        var key = sessionStorage.key(i);

        // Kiểm tra key chứa "shoes" hoặc "clothing"
        if (key.includes("shoes")) {
            var value = JSON.parse(sessionStorage.getItem(key));
            break;
        }
    }

    if (value) {
        putProductChildToPage(value);
    }
}

function AddToBagThisProduct(size){
    // Lặp qua các key trong sessionStorage
    for (var i = 0; i < sessionStorage.length; i++) {
        var key = sessionStorage.key(i);

        // Kiểm tra key chứa "shoes" hoặc "clothing"
        if (key.includes("shoes") || key.includes("clothing")) {
            var value = JSON.parse(sessionStorage.getItem(key));
            break;
        }
    }


    value.size = size;
    //LocalStorage
    // Chuyển đối tượng JSON thành chuỗi
    var jsonString = JSON.stringify(value);
    localStorage.setItem(value.id + "-bag", jsonString);
}

function loadClothingProduct() {
    // Lặp qua các key trong sessionStorage
    for (var i = 0; i < sessionStorage.length; i++) {
        var key = sessionStorage.key(i);

        // Kiểm tra key chứa "shoes" hoặc "clothing"
        if (key.includes("clothing")) {
            var value = JSON.parse(sessionStorage.getItem(key));
            break;
        }
    }

    if (value) {
        putProductChildToPage(value);
    }
}
