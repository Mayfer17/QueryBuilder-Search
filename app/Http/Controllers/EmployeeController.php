<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
//use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;


class EmployeeController extends Controller
{

    public function index(Request $request) // เพิ่ม Request เข้ามาเป็น parameter
    {
        $query = $request->input('search'); //หาข้อความได้ทั้งชื่อและนามสกุล

        // ค้นหาพนักงานที่มีชื่อหรือคำนำหน้าชื่อ หรือ นามสกุล ตรงกับคำค้นหาที่กรอกเข้ามา
        $employees = DB::table('employees')
        ->where('first_name', 'like', '%' . $query . '%')
        ->orWhere('last_name', 'like', '%' . $query . '%') // ใช้ orWhere ใช้เมื่อเราต้องการให้เงื่อนไขการค้นหามีหลายตัวเลือกที่เชื่อมโยงกันด้วย OR
        ->paginate(10);// ใช้ paginate ในการแบ่งหน้าผลลัพธ์ใน Laravel โดยแสดงผลแค่ 10 รายการต่อหน้า.

        //->take(10)->get()
        //->paginate(10); //ใช้สำหรับแบ่งหน้าผลลัพธ์ใน Laravel โดยแสดงผลแค่ 10 รายการต่อหน้า.
        // Log::info($employees); // ใช้บันทึกข้อมูลหรือข้อความที่ไม่ได้เป็นข้อผิดพลาด เพื่อช่วยในการตรวจสอบหรือดีบักแอปพลิเคชัน.
        //$data = json_decode(json_encode($employees), true); // ใช้ json ในการแสดงผล array
        // Log::info($data);
        //return response($data); //ส่งข้อมูล $data กลับไปในรูปแบบ JSON ให้กับผู้ใช้ผ่าน HTTP Response.
        //return response()->json($data);
        return Inertia::render('Employee/index', [
            'employees' => $employees,//ข้อมูลพนักงานทั้งหมด
            'query' => $query, //ข้อมูลที่พิมพ์เข้าไปเราต้องการให้ค้างอยู่ในช่องค้นหา
        ]);
        // return response($employees);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        //
    }
}
