//import ./model/staffManager.js

class StaffManager {
  constructor() {
    this.arr = [];
  }
  themNhanVien(nhanvien) {
    this.arr.push(nhanvien);
  }

  deleteStaff(id) {
    this.arr = this.arr.filter((nhanvien) => nhanvien.tknv !== id);
  }

  editStaff(id) {
    return this.arr.find((nhanvien) => nhanvien.tknv === id);
  }

  updateStaff(id) {
    const index = this.arr.findIndex((nhanvien) => nhanvien.tknv === id.tknv);
    if (index !== -1) {
      this.arr[index] = id;
    }
  }
  searchStaff(keyWord) {
    let result = [];
    for (let i = 0; i < this.arr.length; i++) {
      const staff = this.arr[i];
      const lowerCase = keyWord.toLowerCase()
      const staffLowerCase = staff.xepLoai.toLowerCase()
      if (staffLowerCase.indexOf(lowerCase) !== -1) {
        result.push(staff);
      }
    }
    return result;
  }
}

export default StaffManager;
