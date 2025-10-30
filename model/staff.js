
class NhanVien {
  constructor(tknv, tenNV, email, matKhau, ngayLam, luongCB, chucVu, gioLam) {
    this.tknv = tknv;
    this.tenNV = tenNV;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLam = ngayLam;
    this.luongCB = luongCB;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
    this.tongLuong = 0;
    this.xepLoai = "";
  }

  tinhTongLuong() {
    const luongCBFloat = parseFloat(this.luongCB);
    if (this.chucVu === "Sếp") {
      this.tongLuong = luongCBFloat * 3;
    } else if (this.chucVu === "Trưởng phòng") {
      this.tongLuong = luongCBFloat * 2;
    } else if (this.chucVu === "Nhân viên") {
      this.tongLuong = luongCBFloat * 1;
    } else {
      this.tongLuong = 0;
    }
  }

  tinhXepLoai() {
    const gioLamFloat = parseFloat(this.gioLam);
    if (gioLamFloat >= 192) {
      this.xepLoai = "Nhân viên xuất sắc";
    } else if (gioLamFloat >= 176) {
      this.xepLoai = "Nhân viên giỏi";
    } else if (gioLamFloat >= 160) {
      this.xepLoai = "Nhân viên khá";
    } else {
      this.xepLoai = "Nhân viên trung bình";
    }
  }
}

export default NhanVien;
