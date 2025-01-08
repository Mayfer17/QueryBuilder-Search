//import React, { useState } from 'react'; // นำเข้า React และ useState hook จาก 'react' สำหรับใช้ในการสร้าง component และจัดการสถานะ
import { router } from '@inertiajs/react'; // นำเข้า router จาก Inertia.js สำหรับการส่ง request แบบ SPA
import { useState } from 'react'; // นำเข้า useState hook สำหรับจัดการสถานะ

//query = ค่าของการค้นหาที่ส่งมาจาก controller
//employees = ข้อมูลพนักงานทั้งหมดที่ส่งมาจาก controller

//ส่วนค้นหา
export default function Index({ employees, query }) { // นิยามฟังก์ชัน Index ซึ่งรับ props เป็น `employees`
    const [search, setSearch] = useState(query || ''); // กำหนด state สำหรับเก็บค่าการค้นหา โดยค่าเริ่มต้นมาจาก query
    const [sortColumn, setSortColumn] = useState(''); // กำหนด state สำหรับเก็บ column ที่ต้องการเรียงลำดับ
    const [sortDirection, setSortDirection] = useState('asc'); // กำหนด state สำหรับเก็บทิศทางการเรียงลำดับ

    const handleSearch = (e) => { // ฟังก์ชันสำหรับจัดการเมื่อทำการค้นหา
        e.preventDefault(); // ป้องกันการรีเฟรชหน้า
        router.get('/employee', { search }); // ส่ง request พร้อมค่าค้นหาไปยัง route `/employee`
    };

    const handlePageChange = (page) => { // ตรวจสอบและเปลี่ยนหน้า
        if (page < 1 || page > employees.last_page) return; // ตรวจสอบให้แน่ใจว่าหน้าไม่เกินขอบเขต

        router.get('/employee', { search, page }); // ส่งคำขอไปที่หน้าถัดไปพร้อมกับการค้นหาหรือหน้า
    };

    const handleSort = (column) => { // ฟังก์ชันสำหรับเรียงลำดับข้อมูล
        const newDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortDirection(newDirection);

        router.get('/employee', { search, sort: column, direction: newDirection }); // ส่ง request พร้อมข้อมูลการเรียงลำดับ
    };

    return ( // คืนค่าของ component เป็น JSX ที่จะถูกแสดงใน UI
        <div className="p-6 bg-gray-100 min-h-screen"> {/* ใช้ Tailwind CSS ตกแต่งพื้นหลังและระยะห่าง */}
            <h1 className="text-4xl font-extrabold mb-6 text-center text-black">Employee List</h1> {/* แสดงหัวข้อ "Employee List" พร้อมตกแต่งด้วยฟอนต์ที่โดดเด่น */}
            <form onSubmit={handleSearch} className="mb-6 flex justify-center"> {/* ฟอร์มค้นหาพร้อมจัดวางแบบกลาง */}
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} // เมื่อมีการเปลี่ยนแปลงใน input จะเรียกใช้ฟังก์ชันนี้
                    className="border rounded-l px-4 py-2 w-80" // ใช้ Tailwind CSS ตกแต่ง input
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600" // ใช้ Tailwind CSS ตกแต่งปุ่มค้นหา
                >
                    Search
                </button>
            </form>

            <div className="overflow-x-auto"> {/* เพิ่มส่วนนี้เพื่อให้ตารางเลื่อนได้ในแนวนอน */}
                <table className="table-auto w-full bg-white border-collapse border border-gray-200 rounded-lg shadow-md"> {/* ใช้ Tailwind CSS ตกแต่งตาราง */}
                    <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('emp_no')}>ID</th>
                            <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('first_name')}>Name</th>
                            <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('last_name')}>Last Name</th>
                            <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('birth_date')}>Birthday</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm font-light">
                        {employees.data.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="py-4 px-6 text-center text-gray-500"> {/* กรณีไม่มีข้อมูล */}
                                    ไม่พบข้อมูล
                                </td>
                            </tr>
                        ) : (
                            employees.data.map((employee) => ( // แสดงข้อมูลพนักงาน
                                <tr key={employee.emp_no} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6">{employee.emp_no}</td>
                                    <td className="py-3 px-6">{employee.first_name}</td>
                                    <td className="py-3 px-6">{employee.last_name}</td>
                                    <td className="py-3 px-6">{employee.birth_date}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6"> {/* ส่วนควบคุมการเปลี่ยนหน้า */}
                <button
                    onClick={() => handlePageChange(employees.current_page - 1)} // ย้อนกลับไปหน้าที่แล้ว
                    disabled={employees.current_page === 1} // ปิดปุ่มเมื่ออยู่หน้าสุดท้าย
                    className={`px-4 py-2 rounded ${
                        employees.current_page === 1
                            ? 'bg-gray-300 cursor-not-allowed' // ถ้าปิดปุ่ม ให้ใช้สีเทา
                            : 'bg-blue-500 text-white hover:bg-blue-600' // ถ้าใช้งานได้ ให้ใช้สีฟ้า
                    }`}
                >
                    Previous
                </button>

                <span className="text-gray-600">
                    Page {employees.current_page} of {employees.last_page} {/* แสดงหน้าปัจจุบัน */}
                </span>

                <button
                    onClick={() => handlePageChange(employees.current_page + 1)} // ไปหน้าถัดไป
                    disabled={employees.current_page === employees.last_page} // ปิดปุ่มเมื่ออยู่หน้าสุดท้าย
                    className={`px-4 py-2 rounded ${
                        employees.current_page === employees.last_page
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
