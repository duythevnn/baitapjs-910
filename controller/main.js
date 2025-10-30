import NhanVien from "./../model/staff.js";
import StaffManager from "./../model/staffManager.js";
import validation from "../model/validation.js";
const manager = new StaffManager();
const validate = new validation();
export function getEle(id) {
  return document.getElementById(id);
}

const layThongTinNhanVien = () => {
  const tknv = getEle("tknv").value;
  const tenNV = getEle("name").value;
  const email = getEle("email").value;
  const matKhau = getEle("password").value;
  const ngayLam = getEle("datepicker").value;
  const luongCB = getEle("luongCB").value;
  const chucVu = getEle("chucvu").value;
  const gioLam = getEle("gioLam").value;

  let isValid = true;

  isValid =
    validate.checkEmpty(tknv, "tbTKNV", "(*) Vui long nhap id nhan vien") &&
    validate.checkId(tknv, "tbTKNV", "(*) vui long nhap 4-6 ky so", 4, 6) &&
    isValid;
  isValid =
    validate.checkEmpty(tenNV, "tbTen", "(*) Vui long nhap ten nhan vien") &&
    validate.checkCharacterString(tenNV, "tbTen", "(*)Vui long nhap chu") &&
    isValid;
  isValid =
    validate.checkEmpty(email, "tbEmail", "(*) Vui long nhap emai nhan vien") &&
    validate.checkEmail(
      email,
      "tbEmail",
      "(*) Vui long nhap dung dinh dang  email"
    ) &&
    isValid;
  isValid =
    validate.checkEmpty(matKhau, "tbMatKhau", "(*) Vui long nhap mat khau ") &&
    validate.checkPassWord(
      matKhau,
      "tbMatKhau",
      "(*) 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt) "
    ) &&
    isValid;
  isValid =
    validate.checkEmpty(
      ngayLam,
      "tbNgay",
      "(*) Vui long nhap ngay tao tai khoan "
    ) &&
    validate.checkDay(
      ngayLam,
      "tbNgay",
      "(*) Vui long nhap dung dinh dang ngay/thang/nam"
    ) &&
    isValid;
  isValid =
    validate.checkEmpty(
      luongCB,
      "tbLuongCB",
      "(*) Vui long nhap luong nhan vien"
    ) &&
    validate.checkSalary(
      luongCB,
      "tbLuongCB",
      "(*) Vui long nhap luong co ban tu 1tr - 20tr"
    ) &&
    isValid;

  isValid =
    validate.checkEmpty(
      gioLam,
      "tbGiolam",
      "(*) Vui long nhap gio lam cua nhan vien"
    ) &&
    validate.checkTimeWork(
      gioLam,
      "tbGiolam",
      "(*) Vui long nhap gio lam tu 80 - 200"
    ) &&
    isValid;
  isValid =
    validate.checkOption(
      chucVu,
      "tbChucVu",
      "(*) Vui long nhap chuc vu nhan vien"
    ) && isValid;

  if (!isValid) return null;

  const nhanvien = new NhanVien(
    tknv,
    tenNV,
    email,
    matKhau,
    ngayLam,
    luongCB,
    chucVu,
    gioLam
  );

  nhanvien.tinhTongLuong();
  nhanvien.tinhXepLoai();

  return nhanvien;
};

const renderNhanVien = (data) => {
  let contentHTML = "";
  for (let i = 0; i < data.length; i++) {
    const nhanvien = data[i];
    contentHTML += `
<tr>
  <td>${nhanvien.tknv}</td>
  <td>${nhanvien.tenNV}</td>
  <td>${nhanvien.email}</td>
  <td>${nhanvien.ngayLam}</td>
  <td>${nhanvien.chucVu}</td>
  <td>${nhanvien.tongLuong.toLocaleString()} VNĐ</td>
  <td>${nhanvien.xepLoai}</td>
  <td>
    <button class="btn btn-danger" onclick="handleDeleteStaff('${
      nhanvien.tknv
    }')">Delete</button>
  </td>
  <td>
  <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="handleEditStaff('${
    nhanvien.tknv
  }')">Edit</button>
</td>
</tr>
`;
  }
  getEle("tableDanhSach").innerHTML = contentHTML;
};

const handleEditStaff = (id) => {
  getEle("btnThemNV").style.display = "none";
  getEle("btnCapNhat").style.display = "block";
  const nhanvien = manager.editStaff(id);
  getEle("header-title").innerHTML = "Cập nhật nhân viên";
  if (nhanvien) {
    getEle("tknv").value = nhanvien.tknv;
    getEle("tknv").setAttribute("disabled", true);
    getEle("name").value = nhanvien.tenNV;
    getEle("email").value = nhanvien.email;
    getEle("password").value = nhanvien.matKhau;
    getEle("datepicker").value = nhanvien.ngayLam;
    getEle("luongCB").value = nhanvien.luongCB;
    getEle("chucvu").value = nhanvien.chucVu;
    getEle("gioLam").value = nhanvien.gioLam;
  }
};
window.handleEditStaff = handleEditStaff;

const handleDeleteStaff = (id) => {
  manager.deleteStaff(id);
  renderNhanVien(manager.arr);
  setLocalStorage();
};
window.handleDeleteStaff = handleDeleteStaff;

const setLocalStorage = () => {
  const dataString = JSON.stringify(manager.arr);
  localStorage.setItem("LISTSTAFF", dataString);
};

const getLocalStorage = () => {
  const dataString = localStorage.getItem("LISTSTAFF");
  if (dataString) {
    const dataArr = JSON.parse(dataString);
    const reinstatedArr = dataArr.map((item) => {
      const nhanvien = new NhanVien(
        item.tknv,
        item.tenNV,
        item.email,
        item.matKhau,
        item.ngayLam,
        item.luongCB,
        item.chucVu,
        item.gioLam
      );
      nhanvien.tinhTongLuong();
      nhanvien.tinhXepLoai();
      return nhanvien;
    });
    manager.arr = reinstatedArr;
    renderNhanVien(manager.arr);
  }
};
getLocalStorage();

// Thêm nhân viên
getEle("btnThemNV").onclick = function () {
  const themNV = layThongTinNhanVien();
  if (!themNV) return;

  manager.themNhanVien(themNV);
  renderNhanVien(manager.arr);
  setLocalStorage();
};

getEle("btnCapNhat").onclick = function () {
  const nhanvienDaCapNhat = layThongTinNhanVien();
  manager.updateStaff(nhanvienDaCapNhat);
  renderNhanVien(manager.arr);
  setLocalStorage();
  getEle("tknv").removeAttribute("disabled", true);
  getEle("fromNhanVien").reset();
};

// getEle("btnThem").onclick = function () {
getEle("btnThem").onclick = function () {
  getEle("btnThemNV").style.display = "block";
  getEle("btnCapNhat").style.display = "none";
  getEle("header-title").innerHTML = "Thêm Nhân Viên";

  getEle("fromNhanVien").reset();

  getEle("tknv").removeAttribute("disabled");
};
// };

getEle("searchName").addEventListener("keyup", function () {
  const keyWord = getEle("searchName").value;
  const timKiem = manager.searchStaff(keyWord);
  renderNhanVien(timKiem);
});
