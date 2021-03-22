
export const checkNull = (x) => {
    if (typeof x === 'undefined' || x === null || x === '') {
        return true;
    }
    else {
        return false
    }
}

export const checkLength = (x, minus, max) => {

    if (x.length < minus || x.length > max) {
        return true;
    }
    else {
        return false
    }
}

export const checkPassword = (password) => {
    let re_pass = new RegExp(/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&amp;*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);
    if (!re_pass.test(password) ||
        checkLength(password, 8, 30) ||
        checkNull(password)) {
        return true;
    }
    else { return false }
}
export const checkEquality = (password, password2) => {

    if (password !== password2) {
        return true;
    }
    else { return false }
}
export const checkPasswordLogin = (password) => {

    if (checkLength(password, 8, 30) ||
        checkNull(password)) {
        return true;
    }
    else { return false }
}

export const checkNumber = (x, minus, max) => {
    let re_number = new RegExp(/^[0-9]*$/);
    if (!re_number.test(x) ||
        checkLength(x, minus, max)) {
        return true;
    }
    else { return false }
}

export const checkEmail = (email) => {

    let re_email = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

    if (!re_email.test(email) ||
        checkLength(email, 5, 100) ||
        checkNull(email)
    ) {
        return true;
    }
    else { return false }
}

export const nullInObj = (obj) => {
    let nulls = []
    for (var prop in obj) {
        if (checkNull(obj[prop])) nulls.push(prop)
    }
    return nulls
}

export const resizeImage = (image, width, height) => {
    return new Promise((res, rej) => {
        const imgElement = document.createElement("img");
        imgElement.src = image
        imgElement.onload = (e) => {
            const canvas = document.createElement("canvas");
            const aspectRatio = width / e.target.width
            canvas.width = width;
            canvas.height = e.target.height * aspectRatio;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height)
            const fileResized = ctx.canvas.toDataURL(e.target, "image/jpeg");
            res(fileResized);
            // ctx.canvas.toBlob((blob) => {
            //     res([fileResized, blob]);
            // });

        }
    });
}
