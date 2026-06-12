// =============================================================
//  DATA.JS - File dữ liệu điểm thi tuyển sinh vào lớp 10
//  Cập nhật file này sau khi có kết quả chính thức (14-15/6/2026)
//
//  HƯỚNG DẪN:
//  - Điểm số dùng dấu CHẤM, không dùng dấu phẩy (VD: 8.5 không phải 8,5)
//  - ngaySinh định dạng: "DD/MM/YYYY" (VD: "15/03/2011")
//  - Nếu môn nào chưa có điểm, để null
//  - Dùng admin.html để nhập điểm nhanh hơn
// =============================================================

// Tên trường (hiển thị trên trang web)
const SCHOOL_NAME = "Cao Đẳng Viễn Đông";

// Năm học
const SCHOOL_YEAR = "2026 – 2027";

// Điểm chuẩn trúng tuyển (tổng 3 môn). Cập nhật khi có thông báo chính thức.
const PASS_SCORE = 15;

// Hệ số môn (thường là 1, một số trường nhân đôi môn Toán hoặc Văn)
const HE_SO = {
    toan: 1,
    van: 1,
    ngoaiNgu: 1,
};

// =============================================================
//  DANH SÁCH THÍ SINH
//  Mỗi dòng là một thí sinh với cấu trúc:
//  { sbd, hoTen, ngaySinh, toan, van, ngoaiNgu }
// =============================================================
const STUDENTS = [
    // --- DỮ LIỆU MẪU — xóa và thay bằng dữ liệu thực ---
    { sbd: "001001", hoTen: "Nguyễn Văn An",      ngaySinh: "15/03/2011", toan: 8.5, van: 7.0,  ngoaiNgu: 9.0  },
    { sbd: "001002", hoTen: "Trần Thị Bích",       ngaySinh: "22/07/2011", toan: 6.0, van: 7.5,  ngoaiNgu: 5.5  },
    { sbd: "001003", hoTen: "Lê Hoàng Nam",        ngaySinh: "08/11/2010", toan: 4.0, van: 5.0,  ngoaiNgu: 3.5  },
    { sbd: "001004", hoTen: "Phạm Thị Mai",        ngaySinh: "30/01/2011", toan: 9.0, van: 8.5,  ngoaiNgu: 9.5  },
    { sbd: "001005", hoTen: "Hoàng Minh Tuấn",     ngaySinh: "14/05/2011", toan: 7.0, van: 6.5,  ngoaiNgu: 8.0  },
    { sbd: "001006", hoTen: "Vũ Thị Lan",          ngaySinh: "03/09/2011", toan: 5.5, van: 6.0,  ngoaiNgu: 4.0  },
    { sbd: "001007", hoTen: "Đặng Quốc Hùng",      ngaySinh: "20/12/2010", toan: 9.5, van: 8.0,  ngoaiNgu: 7.5  },
    { sbd: "001008", hoTen: "Bùi Thị Hoa",         ngaySinh: "11/06/2011", toan: 3.5, van: 4.5,  ngoaiNgu: 5.0  },
    { sbd: "001009", hoTen: "Nguyễn Thị Mai Anh",  ngaySinh: "25/02/2011", toan: 7.5, van: 8.0,  ngoaiNgu: 6.5  },
    { sbd: "001010", hoTen: "Trần Văn Khải",       ngaySinh: "07/08/2011", toan: 6.5, van: 5.5,  ngoaiNgu: 7.0  },
];
