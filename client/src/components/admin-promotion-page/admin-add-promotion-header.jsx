import React from "react";
import { useNavigate } from "react-router-dom";
import { usePromotion } from "../../context/promotion-context";
import { adminPromotionValidate } from "../../validations/admin-promotion-validations";
import { toast } from "react-toastify";

function AdminAddPromotionHeader() {
  const navigate = useNavigate();
  const { createPromotion, isNumPercent } = usePromotion();

  const handlePromotionSubmit = (e) => {
    e.preventDefault();

    const newErrors = adminPromotionValidate(isNumPercent);

    if (Object.keys(newErrors).length === 0) {
      createPromotion();
    } else {
      toast.error(Object.values(newErrors)[0]);
    }
  };

  return (
    <div className="w-full h-full max-h-[80px] border-b-[1px] border-gray-300 flex items-center bg-white px-[40px] justify-between py-[20px]">
      <span className="font-prompt text-[20px] font-medium text-black">
        เพิ่ม Promotion Code
      </span>
      <div className="flex w-full max-w-[250px] h-full max-h-[45px] justify-between">
        <button
          className="w-full h-full max-w-[112px] max-h-[45px] rounded-[8px] bg-white border-[1px] border-blue-600 flex items-center justify-center"
          onClick={() => {
            navigate("/admin/promotion");
          }}
        >
          <span className="font-prompt font-medium text-[16px] text-blue-600">
            ยกเลิก
          </span>
        </button>
        <button
          className="w-full h-full max-w-[112px] max-h-[45px] rounded-[8px] bg-blue-600 flex items-center justify-center"
          type="submit"
          onClick={handlePromotionSubmit}
        >
          <span className="font-prompt font-medium text-[16px] text-white">
            สร้าง
          </span>
        </button>
      </div>
    </div>
  );
}

export default AdminAddPromotionHeader;
