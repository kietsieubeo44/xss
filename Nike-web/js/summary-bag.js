

function Summary() {
    //Summary
    const deliveryFeeElement = document.querySelector('#delivery-fee');
    const subTotalElement = document.querySelector('#sub-total');
    const totalElement = document.querySelector('#total');
    const noItemsElement = document.querySelector('#no-items');
    // Tinh tong tien


    const checkOutBtn = document.querySelector('#checkout-btn');

    var subTotal = 0;

    if (!noItemsElement) {
        const items = document.querySelectorAll('.bag-items');
        const quantitiesChange = document.querySelectorAll('.details-options-quantity');



        Array.from(items).forEach(item => {
            var quantity = parseFloat(item.querySelector('.details-options-quantity').value);
            var prices = parseFloat(item.querySelector('.prices').textContent.replace(/,/g, ''));

            subTotal += quantity * prices;
        });
        //Delivery-fee = 250,000đ
        var deliveryFee = 250000;
        deliveryFeeElement.innerHTML = deliveryFee.toLocaleString();
        //Đưa subTotal vao` element id= "sub-total"

        subTotalElement.innerHTML = subTotal.toLocaleString();

        //Tính total = subtotal + delivery-fee
        var total = subTotal + deliveryFee;
        //Đưa subTotal vao` element id= "sub-total"

        totalElement.innerHTML = total.toLocaleString();

        //Lắng nghe sự kiện thay đổi select của các phần tử quantity của các item
        quantitiesChange.forEach(quantityElement => {
            quantityElement.addEventListener("change", function () {
                subTotal = 0;
                Array.from(items).forEach(item => {
                    var quantity = parseFloat(item.querySelector('.details-options-quantity').value);
                    var prices = parseFloat(item.querySelector('.prices').textContent.replace(/,/g, ''));

                    subTotal += quantity * prices;

                    //Đưa subTotal vao` element id= "sub-total"

                    subTotalElement.innerHTML = subTotal.toLocaleString();

                    //Tính total = subtotal + delivery-fee
                    total  = subTotal + deliveryFee;
                    //Đưa subTotal vao` element id= "sub-total"

                    totalElement.innerHTML = total.toLocaleString();
                });
            });
        });

        checkOutBtn.removeAttribute('disabled');
        checkOutBtn.style.cursor = "pointer";

        checkOutBtn.onclick = function (e) {
            e.preventDefault();//bỏ action mặc định

            sessionStorage.setItem('subTotal', subTotal.toString());
            sessionStorage.setItem('total', total.toString());
            sessionStorage.setItem('deliveryFee', deliveryFee.toString());

            window.location.href = 'checkout.html';
        }
    }
    else {
        deliveryFeeElement.innerHTML = "0";
        subTotalElement.innerHTML = "0";
        totalElement.innerHTML = "0";

        checkOutBtn.setAttribute('disabled', 'disabled');
        checkOutBtn.classList.add('disabled');
        checkOutBtn.setAttribute("style", "background-color: #edededcc !important; color: #cccc !important;");
    }
}

function getBagItemsElement(element) {
    return element.parentElement.parentElement.parentElement;
}
//Xoá bag-item
function deleteBagItem() {

    const clearItemElements = document.querySelectorAll('.clear-item');
    //Lặp qua các nút clear và lắng nghe sự kiện click
    var index = clearItemElements.length;
    clearItemElements.forEach(function (clearElement) {
        clearElement.onclick = function () {
            const bagItemsElement = getBagItemsElement(clearElement);
            localStorage.removeItem(bagItemsElement.id + "-bag");


            bagItemsElement.remove();

            index--;
            if (index == 0) {
                // Tạo phần tử <h3> và thiết lập thuộc tính id và nội dung
                const h3Element = document.createElement('h3');
                h3Element.setAttribute('id', 'no-items');
                h3Element.textContent = 'There are no items in your bag.';

                // Chọn phần tử có class "bag"
                const bagElement = document.querySelector('.bag');

                // Thêm phần tử <h3> vào phần tử "bag"
                bagElement.appendChild(h3Element);
            }
            Summary();
        }
    });
}