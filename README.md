# LibraryOfQuote 📚✨

Một ứng dụng web tạo và lưu trữ những câu trích dẫn (quotes) truyền cảm hứng với giao diện hiện đại, hỗ trợ nhiều ngôn ngữ (Anh, Việt, Trung, Nhật). 

Dự án này được thiết kế theo phong cách UI/UX Glassmorphism (hiệu ứng kính mờ), kết hợp với hiệu ứng chuyển động mượt mà và hỗ trợ tính năng xem ngẫu nhiên, lọc theo chủ đề và đóng góp câu trích dẫn mới.

![LibraryOfQuote Demo](frontend/public/logo.png)

## 🚀 Tính năng nổi bật
- **Daily Inspiration (Trích dẫn ngẫu nhiên):** Hiển thị một câu quote ngẫu nhiên một cách đẹp mắt.
- **Browse Library (Thư viện):** Duyệt qua toàn bộ danh sách quote, hỗ trợ lọc theo danh mục (category).
- **Contribute (Đóng góp):** Giao diện cho phép người dùng thêm những câu quote yêu thích của riêng mình vào cơ sở dữ liệu.
- **Tính năng Đa ngôn ngữ:** Cơ sở dữ liệu mặc định được cung cấp các câu trích dẫn bằng tiếng Anh, tiếng Việt, tiếng Trung và tiếng Nhật.

---

## 🛠 Công nghệ sử dụng

### 1. Frontend (Giao diện người dùng)
- **React.js & Vite:** Cung cấp tốc độ khởi tạo và phản hồi ứng dụng nhanh chóng, mượt mà.
- **Tailwind CSS v4:** Framework CSS mạnh mẽ giúp xây dựng UI linh hoạt. Sử dụng kết hợp các lớp tiện ích (utility classes) để tạo bóng đổ (shadows), hiệu ứng kính mờ (backdrop-blur), và gradients tuyệt đẹp.
- **Axios:** Thư viện giúp gửi HTTP requests từ giao diện người dùng giao tiếp với Backend API một cách dễ dàng và gọn gàng.

### 2. Backend (Máy chủ & API)
- **Node.js & Express.js:** Khung máy chủ (web framework) nhẹ và tốc độ cao để xây dựng các API RESTful (GET, POST).
- **PostgreSQL (via Neon):** Cơ sở dữ liệu quan hệ mạnh mẽ lưu trữ các quotes. Ban đầu dự án dùng `SQLite`, nhưng sau đó được nâng cấp lên Serverless Postgres (Neon) để tương thích với môi trường triển khai thực tế của Vercel.
- **pg (node-postgres):** Driver kết nối Node.js với cơ sở dữ liệu PostgreSQL.

### 3. Deployment (Triển khai)
- **Vercel:** Nền tảng hosting cả Frontend (dưới dạng static build) và Backend (dưới dạng Vercel Serverless Functions) trong cùng một dự án duy nhất thông qua file cấu hình gộp `vercel.json`.

---

## 🚧 Những khó khăn gặp phải (Challenges) & Cách giải quyết

Trong quá trình phát triển và đưa dự án lên Internet, đã có một số vướng mắc kỹ thuật đặc thù:

1. **Khắc phục lỗi định tuyến (Routing Configuration) trên Vercel:**
   - *Vấn đề:* Ban đầu, Vercel không biết cách phân luồng giữa việc phục vụ giao diện React và việc chạy API Backend, dẫn đến lỗi `404 Not Found` khi gọi dữ liệu.
   - *Giải quyết:* Cấu hình lại toàn bộ luồng mạng qua một file duy nhất `vercel.json` ở thư mục gốc (root), định tuyến tất cả các yêu cầu `/api/(.*)` chuyển hướng vào máy chủ Node.js (`backend/server.js`), và các đường dẫn còn lại chuyển về thư mục `frontend`.

2. **Giới hạn của Serverless Functions (Hệ thống tệp chỉ đọc):**
   - *Vấn đề:* Ban đầu cơ sở dữ liệu được thiết kế chạy bằng `SQLite` (một file cơ sở dữ liệu vật lý tên là `quotes.db` nằm ngay trong thư mục code). Tuy nhiên, Vercel Serverless chỉ cho phép môi trường "Chỉ Đọc" (Read-Only) sau khi deploy, khiến database không thể ghi hay truy xuất dữ liệu trên điện thoại/máy tính khác.
   - *Giải quyết:* Thực hiện "Migration" (chuyển đổi) toàn bộ mã nguồn quản lý cơ sở dữ liệu sang **PostgreSQL** kết hợp với nền tảng lưu trữ đám mây **Neon**. Thiết lập biến môi trường `DATABASE_URL` an toàn trên Vercel.

3. **Lỗi chặn CORS và mạng kết nối cục bộ (Local Network Prompts):**
   - *Vấn đề:* Khi thử nghiệm trên điện thoại thông minh, ứng dụng không thể hiện thị quote do frontend cố gắng kết nối tới một hard-coded API URL là `http://localhost:5000` (địa chỉ máy tính cục bộ). Các trình duyệt di động hiện đại chặn gắt gao hành vi kết nối mạng nội bộ này vì lý do bảo mật.
   - *Giải quyết:* Viết lại toàn bộ hàm gọi Axios API trên frontend từ địa chỉ cục bộ sang định tuyến tương đối (Relative Routing, ví dụ như `axios.get('/api/quotes')`), đảm bảo giao tiếp API luôn cùng một nguồn (Same-Origin) với giao diện người dùng bất luận chạy trên môi trường nào.

---

## ⚙️ Cài đặt và Chạy thử phục vụ phát triển (Local Development)

Nếu bạn muốn clone dự án này về và chạy trên máy tính cá nhân:

1. **Clone repository này:**
   ```bash
   git clone https://github.com/Quocanh1508/QuoteGener.git
   cd QuoteGener
   ```

2. **Cài đặt thư viện Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Cài đặt thư viện Backend & Khởi tạo Database:**
   Mở một Terminal thứ hai:
   ```bash
   cd backend
   npm install
   # Tạo file .env và thêm DATABASE_URL của bạn (tham khảo .env.example)
   node seed.js # Đổ dữ liệu quotes ban đầu
   node server.js
   ```

🎉 **Mở trình duyệt tại địa chỉ http://localhost:5173 và tận hưởng!**
