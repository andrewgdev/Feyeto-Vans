function whitespaceIdentifier(event) {
    let inputElement = event.target.value;
    const formButtonSubmit = document.querySelector(".form__button_submit");
    

    const whitespacesearch = /\s/g;
    let detectedWhitespace = inputElement.match(whitespacesearch);

    detectedWhitespace ? formButtonSubmit.setAttribute("disabled", "") : formButtonSubmit.removeAttribute("disabled");
} 

function invalidCharacterUsername(event) {
    let inputElement = event.target.value;
    const formButtonSubmit = document.querySelector(".form__button_submit");

    const invalidCharacters = /[,/;:'"\|]/g;
    let detectedInvalidCharacters = inputElement.match(invalidCharacters);

    detectedInvalidCharacters ? formButtonSubmit.setAttribute("disabled", "") : formButtonSubmit.removeAttribute("disabled");

}