import React from 'react';
import image from '../Components/Assets/image.jpg';
import baocao from '../Components/Assets/baocao.pdf';

function Profile() {
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center', // Đưa toàn bộ phần tử ra giữa theo chiều ngang
            alignItems: 'center', // Đưa toàn bộ phần tử ra giữa theo chiều dọc
            height: '100vh', // Chiều cao toàn màn hình
            backgroundColor: '#f0f8ff', // Màu nền của trang (xanh nhạt)
        },
        box: {
            display: 'flex',
            alignItems: 'center',
            gap: '20px', // Khoảng cách giữa ảnh và thông tin
            padding: '20px', // Khoảng cách padding trong box
            backgroundColor: '#e0f7fa', // Màu nền xanh nhạt cho box
            borderRadius: '10px', // Bo tròn góc của box
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Tạo hiệu ứng đổ bóng nhẹ
        },
        image: {
            width: '150px', // Kích thước ảnh
            height: '150px',
            objectFit: 'cover', // Cắt ảnh nếu kích thước vượt quá
            borderRadius: '50%', // Tạo ảnh tròn
        },
        info: {
            maxWidth: '500px', // Giới hạn chiều rộng của khối thông tin
        },
        h2: {
            margin: 0,
            whiteSpace: 'nowrap', // Ngăn tiêu đề xuống dòng
        },
        p: {
            margin: '5px 0',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.box}>
                <div className="image">
                    <img
                        src={image}
                        alt="Profile"
                        style={styles.image}
                    />
                </div>

                <div className="info" style={styles.info}>
                    <h2 style={styles.h2}>Họ và Tên: Nguyễn Lê Quốc Khánh</h2>
                    <p style={styles.p}>Mã Sinh Viên: B21DCCN454</p>
                    <div>
                        File báo cáo: <a href={baocao} download="Profile.pdf">Download</a>
                    </div>
                    <p style={styles.p}>Github: <a href="https://github.com/banmike">link</a></p>
                </div>
            </div>
        </div>
    );
}

export default Profile;
