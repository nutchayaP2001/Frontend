import { HiHome } from "react-icons/hi";

export const dropMenu = [
    {
        title: "หน้าแรก",
        path: "../home",
        // icon: <HiHome/>
    },
    {
        title: "ระบบหน้าร้าน",
        subMenu: [
            {
                title: "ขายสินค้า",
                path: "../sells"
            },
            {
                title: "รายการขายสินค้า",
                path: "../checkout"
            }
        ]
    },
    {
        title: "ระบบออนไลน์",
        subMenu: [
            {
                title: "รายการสั่งซื้อสินค้า",
                path: "../orders"
            },
            // {
            //     title: "รายการสั่งซื้อสินค้าสั่งทำ",
            //     path: "../ordersmade"
            // },
            {
                title: "รายการแจ้งชำระเงิน",
                path: "../pays"
            },
            // {
            //     title: "รายงานบัญชีผู้ใช้",
            //     path: "../banusers"
            // },
            {
                title: "รายการสินค้าชำรุด",
                path: "../productdamages"
            },
        ]
    },
    {
        title: "สินค้าทั้งหมด",
        subMenu: [
            {
                title: "หมวดหมู่สินค้า",
                path: "../category"
            },
            // {
            //     title: "รายการส่วนลดสินค้า",
            //     path: "../promotions"
            // },
            {
                title: "รายการสินค้า",
                path: "../products"
            }
        ]
    },
    
    
]
