function openFormFiltersPopup() {
    const popupForm = document.querySelector(".filters__div_popup");
    const body = document.querySelector(".darken");
    
    popupForm.style.display = "block";
    body.style.display = "block";

}

function closeFormFiltersPopup() {
    const popupForm = document.querySelector(".filters__div_popup");
    const body = document.querySelector(".darken");

    popupForm.style.display = "none";
    body.style.display = "none";
}

function priceRangeTextChange() {
    const inputRangeNumber = document.getElementById("price-range").value;
    
    document.getElementById("number__p_price").innerHTML = "$" + inputRangeNumber;    
}

function filterNewOrUsed() {
    let filterButtonText = document.querySelector(".filter__button_new-used").innerText;
    const usedText = "Used";
    const newText = "New";

    if (filterButtonText == "New") {
        document.querySelector(".filter__button_new-used").innerHTML = usedText;
    } else if (filterButtonText == "Used") {
        document.querySelector(".filter__button_new-used").innerHTML = newText;
    }
}

