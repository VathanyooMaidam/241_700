const validateData = (userData) => {
    let errors = [];
    if(!userData.firstname) {
        errors.push("กรุณากรอกชื่อ");
    }   
    if(!userData.lastname) {
        errors.push("กรุณากรอกนามสกุล");
    }
    if(!userData.age) {
        errors.push("กรุณากรอกอายุ");
    } else if (isNaN(userData.age)) {
        errors.push("กรุณากรอกอายุเป็นตัวเลข");
    }
    if(!userData.gender) {
        errors.push("กรุณาเลือกเพศ");
    }
    if(!userData.interests) {
        errors.push("กรุณาเลือกงานอดิเรกอย่างน้อย 1 อย่าง");
    }
    if(!userData.description) {
        errors.push("กรุณากรอกคำอธิบาย");
    }
    return errors;
}

const submitData = async () => {
    let firstname = document.querySelector('input[name="firstname"]').value;
    let lastname = document.querySelector('input[name="lastname"]').value;
    let ageDom = document.querySelector('input[name="age"]');
    let genderDom = document.querySelector('input[name="gender"]:checked');
    let interestDoms = document.querySelectorAll('input[name="interests"]:checked');
    let descriptionDom = document.querySelector('textarea[name="description"]');
    let messageDom = document.getElementById('message');

    try {
        let interests = "";
        for (let i = 0; i < interestDoms.length; i++) {
            interests += interestDoms[i].value;
            if (i !== interestDoms.length - 1) {
                interests += ", ";
            }
        }

        let userData = {
            firstname: firstname,
            lastname: lastname,
            age: ageDom ? ageDom.value : "",
            gender: genderDom ? genderDom.value : "",
            interests: interests,
            description: descriptionDom ? descriptionDom.value : ""
        };

        const errors = validateData(userData);
        if(errors.length > 0) {
            throw {
                message: "กรุณากรอกข้อมูลให้ครบถ้วน",
                errors: errors
            };
        }

        const response = await axios.post('http://localhost:8000/users', userData);
        console.log("Response from server:", response.data);
        messageDom.innerText = "บันทึกข้อมูลสำเร็จ!";
        messageDom.className = "message success";

    } catch (error) {
        let htmlData = '<div>' + (error.message || "เกิดข้อผิดพลาด") + '</div>';
        
        if (error.errors && error.errors.length > 0) {
            htmlData += '<ul>';
            for (let i = 0; i < error.errors.length; i++) {
                htmlData += '<li>' + error.errors[i] + '</li>';
            }
            htmlData += '</ul>';
        }
        
        messageDom.innerHTML = htmlData;
        messageDom.className = "message danger";
    }
}
