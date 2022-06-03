function whitespaceIdentifier(event) {
    let inputElement = event.target.value;
    const formButtonSubmit = document.querySelector(".form__button_submit");
    

    const whitespacesearch = /\s/g;
    let detectedWhitespace = inputElement.match(whitespacesearch);

    detectedWhitespace ? formButtonSubmit.setAttribute("disabled", "") : console.log("continue");
    
} 

function invalidCharacterUsername(event) {
    let inputElement = event.target.value;
    const formButtonSubmit = document.querySelector(".form__button_submit");

    const invalidCharacters = /[,/;:'"\|]/g;
    let detectedInvalidCharacters = inputElement.match(invalidCharacters);

    detectedInvalidCharacters ? formButtonSubmit.setAttribute("disabled", "") : console.log("continue");

}