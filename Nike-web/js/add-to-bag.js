
// localStorage.clear();

function saveInfoBag(id, data) {
    localStorage.setItem(id + "-bag", data);

    // var jsonObject = JSON.parse(localStorage.getItem(id));
    // console.log(jsonObject);
}
function deleteInfoBag(id) {
    localStorage.removeItem(id + "-bag");
}

function getCardItemsElement(element) {
    return element.parentElement.parentElement;
}

function AddToBag() {
    const addToBagBtns = document.querySelectorAll('.add-bag-btn');

    addToBagBtns.forEach(function (element) {
        element.onclick = function () {
            const cartShoping = element.querySelector('i');
            if (!element.classList.contains('un-add-bag-btn')) {
                //css
                cartShoping.classList.add('fa-check');
                cartShoping.classList.remove('fa-cart-shopping');
                element.classList.add('un-add-bag-btn');

                //LocalStorage
                const cardItemsElement = getCardItemsElement(element);
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
                saveInfoBag(cardItemsElement.id, jsonString);
            }
            else {
                //css
                cartShoping.classList.remove('fa-check');
                cartShoping.classList.add('fa-cart-shopping');
                element.classList.remove('un-add-bag-btn');

                //LocalStorage
                deleteInfoBag(getCardItemsElement(element).id);
            }
        }
    });
}


function createDetailsOptionsTag() {
    // Tạo phần tử div details-options và thêm nội dung
    var divDetailsOptions = document.createElement("div");
    divDetailsOptions.classList.add("details-options");

    // Tạo phần tử div select-line cho phần tử Size và thêm nội dung
    var divSizeSelectLine = document.createElement("div");
    divSizeSelectLine.classList.add("select-line");
    var labelSize = document.createElement("label");
    labelSize.textContent = "Size: ";
    var selectSize = document.createElement("select");
    selectSize.name = "details-options-size";
    selectSize.id = "details-options-size";
    var sizeOptions = ["S", "M", "L", "XL", "XXL"];
    sizeOptions.forEach(function (optionValue) {
        var option = document.createElement("option");
        option.value = optionValue;
        option.textContent = optionValue;
        selectSize.appendChild(option);
    });
    var iconSize = document.createElement("i");
    iconSize.classList.add("fa-solid", "fa-chevron-down");
    divSizeSelectLine.appendChild(labelSize);
    divSizeSelectLine.appendChild(selectSize);
    divSizeSelectLine.appendChild(iconSize);

    // Tạo phần tử div select-line cho phần tử Quantity và thêm nội dung
    var divQuantitySelectLine = document.createElement("div");
    divQuantitySelectLine.classList.add("select-line");
    var labelQuantity = document.createElement("label");
    labelQuantity.textContent = "Quantity: ";
    var selectQuantity = document.createElement("select");
    selectQuantity.name = "details-options-quantity";
    selectQuantity.classList.add("details-options-quantity");
    var quantityOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    quantityOptions.forEach(function (optionValue) {
        var option = document.createElement("option");
        option.value = optionValue;
        option.textContent = optionValue;
        selectQuantity.appendChild(option);
    });
    var iconQuantity = document.createElement("i");
    iconQuantity.classList.add("fa-solid", "fa-chevron-down");
    divQuantitySelectLine.appendChild(labelQuantity);
    divQuantitySelectLine.appendChild(selectQuantity);
    divQuantitySelectLine.appendChild(iconQuantity);

    // Thêm các phần tử vào phần tử details-options
    divDetailsOptions.appendChild(divSizeSelectLine);
    divDetailsOptions.appendChild(divQuantitySelectLine);
    return divDetailsOptions;
}

function createClearBagItemTag() {
    // Tạo phần tử div clear-bag-items
    var divClearBagItems = document.createElement("div");
    divClearBagItems.classList.add("clear-bag-items");

    // Tạo phần tử button clear-item
    var buttonClearItem = document.createElement("button");
    buttonClearItem.classList.add("clear-item");

    // Tạo phần tử i fa-regular fa-trash-can
    var iconTrashCan = document.createElement("i");
    iconTrashCan.classList.add("fa-regular", "fa-trash-can");

    // Gắn phần tử i vào phần tử button
    buttonClearItem.appendChild(iconTrashCan);

    // Gắn phần tử button vào phần tử div clear-bag-items
    divClearBagItems.appendChild(buttonClearItem);

    return divClearBagItems;
}

function createLineSeperateTag() {
    // Tạo phần tử div line-seperate
    var divLineSeparate = document.createElement("div");
    divLineSeparate.classList.add("line-seperate");

    return divLineSeparate;
}

function appendBagChildToItemsBag(child, itemsBagFather) {
    // Tạo phần tử div chứa toàn bộ nội dung
    // bag-items
    var divBagItems = document.createElement("div");
    divBagItems.classList.add("bag-items");
    divBagItems.id = child.id;

    // Tạo phần tử div bag-items-img và thêm nội dung
    var divBagItemsImg = document.createElement("div");
    divBagItemsImg.classList.add("bag-items-img");
    var aElement = document.createElement("a");
    aElement.href = "#";
    var imgElement = document.createElement("img");
    imgElement.src = child.avatarImg;
    imgElement.alt = "";
    aElement.appendChild(imgElement);
    divBagItemsImg.appendChild(aElement);

    // Tạo phần tử div bag-items-infomation và thêm nội dung
    var divBagItemsInfomation = document.createElement("div");
    divBagItemsInfomation.classList.add("bag-items-infomation");

    // Tạo phần tử div bag-items-infomation-details và thêm nội dung
    var divBagItemsInfomationDetails = document.createElement("div");
    divBagItemsInfomationDetails.classList.add("bag-items-infomation-details");
    var aDetailsTitle = document.createElement("a");
    aDetailsTitle.classList.add("details-title");
    aDetailsTitle.href = "#";
    aDetailsTitle.textContent = child.title;
    var pDetailsDescribe = document.createElement("p");
    pDetailsDescribe.classList.add("details-describe");
    pDetailsDescribe.innerHTML = child.describe;
    divBagItemsInfomationDetails.appendChild(aDetailsTitle);
    divBagItemsInfomationDetails.appendChild(pDetailsDescribe);
    divBagItemsInfomationDetails.appendChild(createDetailsOptionsTag());

    //Thêm vào thẻ bag-items-infomation
    divBagItemsInfomation.appendChild(divBagItemsInfomationDetails);
    divBagItemsInfomation.appendChild(createClearBagItemTag());

    // Tạo phần tử div bag-items-money
    var divBagItemsMoney = document.createElement("div");
    divBagItemsMoney.classList.add("bag-items-money");

    // Tạo phần tử span money prices
    var spanMoneyPrices = document.createElement("span");
    spanMoneyPrices.classList.add("money", "prices");
    spanMoneyPrices.textContent = child.prices;

    // Tạo phần tử span unit-money
    var spanUnitMoney = document.createElement("span");
    spanUnitMoney.classList.add("unit-money");
    spanUnitMoney.textContent = "đ";

    // Gắn phần tử span money prices vào phần tử div bag-items-money
    divBagItemsMoney.appendChild(spanMoneyPrices);

    // Gắn phần tử span unit-money vào phần tử div bag-items-money
    divBagItemsMoney.appendChild(spanUnitMoney);

    // Thêm 4 phần tử div vào phần tử bag-items
    divBagItems.appendChild(divBagItemsImg);
    divBagItems.appendChild(divBagItemsInfomation);
    divBagItems.appendChild(divBagItemsMoney);
    divBagItems.appendChild(createLineSeperateTag());

    /*bag-items
        bag-items-img
        bag-items-infomation
            bag-items-infomation-details
                details-options
            clear-bag-items
        bag-items-money
        line-seperate
    */
   itemsBagFather.appendChild(divBagItems);
}


function loadItemsBag(itemsBagSelector) {
    // Lấy phần tử có class "items-Bag"
    var itemsBag = document.querySelector(itemsBagSelector);

    var bags = [];
    // Lặp qua các key trong LocalStorage
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);

        // Kiểm tra key chứa "-Bag"
        if (key.includes("-bag")) {
            var value = JSON.parse(localStorage.getItem(key));
            bags.push(value);
        }
    }

    if (bags.length == 0) {//trường hợp không có Bag nào thì hiện thẻ: <h3>Items added to your Favourites will be saved here.</h3> vào class: items-Bag
        // Tạo phần tử <h3> và đặt nội dung
        var notBag = document.createElement("h3");
        notBag.id = "no-items";
        notBag.textContent = "There are no items in your bag.";
        // Thêm phần tử <h3> vào phần tử có class "items-Bag"
        itemsBag.appendChild(notBag);
    }
    else {
        //Tiến hành load bags lên trang
        for (var i = 0; i < bags.length; i++) {
            appendBagChildToItemsBag(bags[i], itemsBag);
        }
    }
}