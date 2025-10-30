import { getEle } from "./../controller/main.js";

class Validation {
  checkEmpty(value, errorId, message) {
    if (value.trim() === "") {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML = message;
      return false;
    }
    getEle(errorId).style.display = "none";
    return true;
  }

  checkOption(selectId, errorId, message) {
    // const select = getEle(selectId);
    if (selectId === 0 || selectId === "Chọn chức vụ") {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML = message;
      return false;
    }
    getEle(errorId).style.display = "none";
    return true;
  }

  checkCharacterString(value, errorId, mess) {
    const pattern =
      /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;

    if (!pattern.test(value.trim())) {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML = mess;
      return false;
    }

    getEle(errorId).style.display = "none";
    return true;
  }

  checkId(value, errorId, mess, min, max) {
    const number = /^[0-9]+$/;
    const trimmed = value.trim();

    if (!number.test(trimmed) || trimmed.length < min || trimmed.length > max) {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML = mess;
      return false;
    }

    getEle(errorId).style.display = "none";
    return true;
  }

  checkEmail(value, errorId, mess) {
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (value.trim() === "" || !emailPattern.test(value)) {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML = mess;
      return false;
    }
    getEle(errorId).style.display = "none";
    return true;
  }
  checkPassWord(value, errorId, mess) {
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/;
    if (!passwordPattern.test(value)) {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML = mess;
      return false;
    }
    getEle(errorId).style.display = "none";
    return true;
  }
  checkSalary(value, errorId, mess) {
    if (value < 1e6 || value > 20e6) {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML = mess;
      return false;
    }
    getEle(errorId).style.display = "none";
    return true;
  }
  checkTimeWork(value, errorId, mess) {
    const time = Number(value.trim());

    if (isNaN(time) || time < 80 || time > 200) {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML = mess;
      return false;
    }
    getEle(errorId).style.display = "none";
    return true;
  }
  checkDay(value, errorId, mess) {
    const datePattern = /^\d{2}[\/\-]\d{2}[\/\-]\d{4}$/;
    if (!datePattern.test(value)) {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML = mess;
      return false;
    }
    getEle(errorId).style.display = "none";
    return true;
  }
}

export default Validation;
