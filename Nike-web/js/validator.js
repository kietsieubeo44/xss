// Đối tượng `Validator`
function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    // Hàm thực hiện validate
    function validate(inputElement, rule) {//rule : [selector, test function return true || false]
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;

        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];
        
        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc kiểm
        for (var i = 0; i < rules.length; ++i) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    ////Bản thân cái rules[index] đang là cái function test ở dưới => gọi như hàm test: funtion(value)
                    // => rules[index](value)
                    // 
                    errorMessage = rules[i](//gọi test function
                        //query vào cái selector được check > nếu không có => NULL
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    //gọi test function
                    errorMessage = rules[i](inputElement.value);
            }
            // nếu thấy có lỗi thì break luôn
            if (errorMessage) break;
        }
        
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.classList.add('invalid');
        } else {
            errorElement.innerText = '';
            inputElement.classList.remove('invalid');
        }
        // return lại là có lỗi hay không
        return !errorMessage;
    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
        // Khi submit form
        if(options.submitSelector){
            var submitElement = document.querySelector(options.submitSelector);
            submitElement.onclick = function (e) {
                e.preventDefault();//bỏ action mặc định
    
                var isFormValid = true;
    
                // Lặp qua từng rules và validate
                options.rules.forEach(function (rule) {
                    var inputElement = formElement.querySelector(rule.selector);
                    var isValid = validate(inputElement, rule);
                    if (!isValid) {
                        isFormValid = false;
                    }
                });
                //Khi form valid thì chúng ta lấy dữ liệu về cái object để xử lí
                if (isFormValid) {
                    // Trường hợp submit với javascript
                    if (typeof options.onSubmit === 'function') {
                        //query vào các element có attribute [name] tạo thành cái enableInputs dạng NodeList
                        var enableInputs = formElement.querySelectorAll('[name]');
                        var formValues = Array.from(enableInputs).reduce(function (values, input) {
                            
                            switch(input.type) {
                                case 'radio':
                                    values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                    break;
                                case 'checkbox':
                                    if (!formElement.querySelector('input[name="' + input.name + '"]:checked')) {
                                        values[input.name] = '';
                                        return values;
                                    } 
                                    if (!Array.isArray(values[input.name])) {
                                        values[input.name] = [];
                                    }                        
                                    if(input.matches(':checked')){
                                        values[input.name].push(input.value); 
                                    }
                                    
                                    break;
                                case 'file':
                                    values[input.name] = input.files;
                                    break;
                                default:
                                    values[input.name] = input.value;
                            }
                            
                            return values;
                        }, {});//giá trị khởi tạo của reduce là cái object rỗng
                        //Gọi lại hàm onSubmit, đã định nghĩa ở bên file html để call API xử lí hoặc ở đây thì console.log cái object formValues ra
                        // Hàm ở file html:
                        // onSubmit: function (data) {
                        //     // Call API
                        //     console.log(data);
                        //}
                        options.onSubmit(formValues);
                    }
                    // Trường hợp submit với hành vi mặc định
                    else {
                        formElement.submit();
                    }
                }
            }
        }
        
        function removeErrorMessage(inputElement){
            var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
    
            errorElement.innerText = '';
            inputElement.classList.remove('invalid');
        }
        //Khi press clear
        if(options.clearSelector){
            var clearElement = document.querySelector(options.clearSelector);
            clearElement.onclick = function(e){
                e.preventDefault();//bỏ action mặc định
                //reset lại text, select trong các input của cái form đang chọn
                document.getElementById(formElement.id).reset();
    
                // Lặp qua từng rules và remove errormessage
                options.rules.forEach(function (rule) {
                    var inputElement = formElement.querySelector(rule.selector);
                    removeErrorMessage(inputElement);
                });

                document.querySelector(options.focusIfClearSelector).focus();
            }
        }
        

        // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
        options.rules.forEach(function (rule) {

            // Lưu lại các rules cho mỗi input
            
            if (Array.isArray(selectorRules[rule.selector])) {//Nếu cái selector đã có 1 rule trước thì push thêm cái mới vào
                selectorRules[rule.selector].push(rule.test);
            } else {// trường hợp selector chưa có cái rule nào thì gán nó = cái mảng có cái rule đầu tiên(đang xét)
                selectorRules[rule.selector] = [rule.test];
            }

            // Selector ex: id, input[name="..."], ...
            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function (inputElement) {
               // Xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }

                // Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function () {
                    removeErrorMessage(inputElement);
                } 
            });
        });
    }
}



// Định nghĩa rules
// Nguyên tắc của các rules:
// 1. Khi có lỗi => Trả ra message lỗi
// 2. Khi hợp lệ => Không trả ra cái gì cả (undefined)
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined :  message || '*Vui lòng nhập trường này'
        }
    };
}
Validator.isRequiredNation = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^[A-Za-z]{2}$/;
            return regex.test(value) ? undefined :  message || '*Vui lòng nhập trường này'
        }
    };
}

Validator.isRequiredLength = function (selector, rlength, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length == rlength ? undefined :  message || `*Vui lòng nhập đủ ${rlength} kí tự`;
        }
    };
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined :  message || '*Trường này phải là email';
        }
    };
}
Validator.isTelePhoneNumber = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
            return regex.test(value) ? undefined :  message || '*Trường này phải là số điện thoại';
        }
    };
}

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined :  message || `*Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    };
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || '*Giá trị nhập vào không chính xác';
        }
    }
}
