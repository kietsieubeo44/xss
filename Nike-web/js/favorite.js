
// localStorage.clear();

function saveInfoFavorite(id, data) {
    localStorage.setItem(id + "-favorite", data);

    // var jsonObject = JSON.parse(localStorage.getItem(id));
    // console.log(jsonObject);
}
function deleteInfoFavorite(id) {
    localStorage.removeItem(id + "-favorite");
}

function getCardItemsElement(element, selector) {
    while (element.parentElement) {
        if (element.parentElement.matches(selector)) {
            return element.parentElement;
        }
        element = element.parentElement;
    }
}

function Favourite(father){
    const favoriteBtns = document.querySelectorAll('.unfavorite-btn');
    favoriteBtns.forEach(function (element) {
        element.onclick = function () {
            const heart = element.querySelector('.fa-heart');
            if (!element.classList.contains('favorite-btn')) {
                //css
                heart.classList.add('fa-regular');
                heart.classList.remove('fa-solid');
                element.classList.add('favorite-btn');
    
                //localStorage
                deleteInfoFavorite(getCardItemsElement(element, father).id);
            }
            else {
                //css
                heart.classList.remove('fa-regular');
                heart.classList.add('fa-solid');
                element.classList.remove('favorite-btn');

                //localStorage
                const cardItemsElement = getCardItemsElement(element, father);
                var elementInfo = {
                    id: cardItemsElement.id,
                    avatarImg: cardItemsElement.querySelector('.cart-items-img').querySelector('img').src,
                    title: cardItemsElement.querySelector('.details-title').innerText,
                    describe: cardItemsElement.querySelector('.details-describe').innerText,
                    prices: cardItemsElement.querySelector('.prices').innerText
                };
                // console.log(elementInfo);
    
                // Chuyển đối tượng JSON thành chuỗi
                var jsonString = JSON.stringify(elementInfo);
                saveInfoFavorite(cardItemsElement.id, jsonString);
            }
        }
    });
}


function appendFavoriteChildToItemsFavorite(child, itemsFavoriteFather) {
    // Tạo phần tử div chứa toàn bộ nội dung
    var divElement = document.createElement("div");
    divElement.classList.add("favorite-item");
    divElement.id = child.id;

    // Tạo phần tử div item-img và thêm nội dung
    var divItemImg = document.createElement("div");
    divItemImg.classList.add("cart-items-img");
    divItemImg.classList.add("item-img");
    
    var aElement = document.createElement("a");
    aElement.href = "#";
    var imgElement = document.createElement("img");
    imgElement.src = child.avatarImg;
    imgElement.alt = "";
    aElement.appendChild(imgElement);
    divItemImg.appendChild(aElement);

    // Tạo phần tử div items-infomation-details và thêm nội dung
    var divInfomationDetails = document.createElement("div");
    divInfomationDetails.classList.add("items-infomation-details");
    var aDetailsTitle = document.createElement("a");
    aDetailsTitle.classList.add("details-title");
    aDetailsTitle.href = "#";
    aDetailsTitle.textContent = child.title;
    var pDetailsDescribe = document.createElement("p");
    pDetailsDescribe.classList.add("details-describe");
    pDetailsDescribe.innerHTML = child.describe;
    divInfomationDetails.appendChild(aDetailsTitle);
    divInfomationDetails.appendChild(pDetailsDescribe);

    // Tạo phần tử div items-money và thêm nội dung
    var divItemsMoney = document.createElement("div");
    divItemsMoney.classList.add("items-money");
    var spanMoney = document.createElement("span");
    spanMoney.classList.add("money", "prices");
    spanMoney.textContent = child.prices;
    var spanUnitMoney = document.createElement("span");
    spanUnitMoney.classList.add("unit-money");
    spanUnitMoney.textContent = "đ";
    divItemsMoney.appendChild(spanMoney);
    divItemsMoney.appendChild(spanUnitMoney);

    // Tạo phần tử div to-product-details và thêm nội dung
    var divToProductDetails = document.createElement("div");
    divToProductDetails.classList.add("to-product-details");
    var btnProductDetails = document.createElement("button");
    btnProductDetails.classList.add("details-btn");
    btnProductDetails.textContent = "Go to product details";
    var btnUnfavorite = document.createElement("button");
    btnUnfavorite.classList.add("unfavorite-btn");
    var iconHeart = document.createElement("i");
    iconHeart.classList.add("fa-solid");
    iconHeart.classList.add("fa-heart");
    btnUnfavorite.appendChild(iconHeart);
    divToProductDetails.appendChild(btnProductDetails);
    divToProductDetails.appendChild(btnUnfavorite);

    // Gắn các phần tử con vào phần tử cha
    divElement.appendChild(divItemImg);
    divElement.appendChild(divInfomationDetails);
    divElement.appendChild(divItemsMoney);
    divElement.appendChild(divToProductDetails);

    // Thêm phần tử div vào phần tử có class "items-favorite"
    itemsFavoriteFather.appendChild(divElement);
}


function loadItemsFavorite(itemsFavoriteSelector) {
    // Lấy phần tử có class "items-favorite"
    var itemsFavorite = document.querySelector(itemsFavoriteSelector);

    var favorites = [];
    // Lặp qua các key trong LocalStorage
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);

        // Kiểm tra key chứa "-favorite"
        if (key.includes("-favorite")) {
            var value = JSON.parse(localStorage.getItem(key));
            favorites.push(value);
        }
    }

    if (favorites.length == 0) {//trường hợp không có favorite nào thì hiện thẻ: <h3>Items added to your Favourites will be saved here.</h3> vào class: items-favorite
        // Tạo phần tử <h3> và đặt nội dung
        var notFavorite = document.createElement("h3");
        notFavorite.textContent = "Items added to your Favourites will be saved here.";
        // Thêm phần tử <h3> vào phần tử có class "items-favorite"
        itemsFavorite.appendChild(notFavorite);
    }
    else {
        //Tiến hành load favorites lên trang
        for (var i = 0; i < favorites.length; i++) {
            appendFavoriteChildToItemsFavorite(favorites[i], itemsFavorite);
        }
    }
}