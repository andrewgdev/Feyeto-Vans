function formFiltersPopup() {
    const popupForm = document.querySelector(".filters__div_popup");
    const body = document.querySelector(".darken");
    
    popupForm.style.display = "block";
    body.style.display = "block";

}

function closePopupForm() {
    const popupForm = document.querySelector(".filters__div_popup");
    const body = document.querySelector(".darken");

    popupForm.style.display = "none";
    body.style.display = "none";
}