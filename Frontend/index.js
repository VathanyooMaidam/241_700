function submitData(data) {
    let firstNameDom = document.querySelector('input[name="first_name"]');
    let lastNameDom = document.querySelector('input[name="last_name"]');
    let ageDom = document.querySelector('input[name="age"]');
    let genderDom = document.querySelector('input[name="gender"]:checked');
    let interestsDoms = document.querySelectorAll('input[name="interests"]:checked');
    let descriptionDom = document.querySelector('textarea[name="description"]');

    let interests = ''
    for (let i = 0; i < interestsDoms.length; i++) {
        interests += interestsDoms[i].value
        if (i !== interestsDoms.length - 1) {
            interests += ', '
        }
    }

    let userData = {
        first_name: firstNameDom.value,
        last_name: lastNameDom.value,
        age: ageDom.value,
        gender: genderDom.value,
        description: descriptionDom.value,
        interests: interests
    }
    console.log('submitData', userData);
}