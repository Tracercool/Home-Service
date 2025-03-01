import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePromotion } from "../../context/promotion-context";
import { adminPromotionValidate } from "../../validations/admin-promotion-validations";
import { toast } from "react-toastify";

function AdminEditPromotionHeader() {
  const {
    getPromotionById,
    isOnePromotion,
    updatedPromotion,
    isOldPromotionCode,
  } = usePromotion();

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getPromotionById(params.promotion_id);
  }, []);

  const handleUpdatedPromotion = (e) => {
    e.preventDefault();
    if (isOnePromotion.discount_type === "percent") {
      const newErrors = adminPromotionValidate(isOnePromotion.discount);
      if (Object.keys(newErrors).length === 0) {
        updatedPromotion(isOnePromotion.promotion_id);
      } else {
        toast.error(Object.values(newErrors)[0]);
      }
    } else {
      updatedPromotion(isOnePromotion.promotion_id);
    }
  };

  return (
    <div className="w-full h-full max-h-[80px] border-b-[1px] border-gray-300 flex items-center bg-white px-[40px] justify-between py-[20px]">
      <div className="gap-[14px] h-full max-h-[50px] flex items-center">
        <button
          className="w-[40px] h-[40px] flex items-center justify-center"
          onClick={() => {
            navigate("/admin/promotion");
          }}
        >
          <img src="/icons/left-icon.png" alt="" />
        </button>
        <div className="flex flex-col justify-between">
          <span className="font-prompt text-[12px] text-gray-700">
            Promotion Code
          </span>
          <span className="font-prompt font-medium text-[20px] text-gray-950">
            {isOldPromotionCode}
          </span>
        </div>
      </div>
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
          onClick={handleUpdatedPromotion}
        >
          <span className="font-prompt font-medium text-[16px] text-white">
            สร้าง
          </span>
        </button>
      </div>
    </div>
  );
}

export default AdminEditPromotionHeader;
