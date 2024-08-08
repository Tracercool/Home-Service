import connectionPool from "../utils/db.mjs";

/** POST Promotion Start */
export const postPromotion = async (req, res) => {
  const newPromotion = {
    ...req.body,
    promotion_code: req.body.isPromotionCode,
    discount:
      req.body.isType === "fixed" ? req.body.isNumFixed : req.body.isNumPercent,
    discount_type: req.body.isType,
    usage_limit: req.body.isUsageLimit,
    expiry_date: req.body.isExpiryDate,
    expiry_time: req.body.isExpiryTime,
    create_at: new Date(),
    updated_at: new Date(),
  };
  console.log(newPromotion);
  try {
    await connectionPool.query(
      `insert into promotions (promotion_code, discount, discount_type, usage_limit, expiry_date, expiry_time) 
      values ($1,$2,$3,$4,$5,$6)`,
      [
        newPromotion.promotion_code,
        newPromotion.discount,
        newPromotion.discount_type,
        newPromotion.usage_limit,
        newPromotion.expiry_date,
        newPromotion.expiry_time,
      ]
    );
  } catch (error) {
    console.log(error);
    if (
      !newPromotion.promotion_code ||
      !newPromotion.discount ||
      !newPromotion.discount_type ||
      !newPromotion.usage_limit ||
      !newPromotion.expiry_date ||
      !newPromotion.expiry_time
    ) {
      return res.status(400).json({
        message: "ข้อมูลไม่ครบหรือไม่ถูกต้อง",
      });
    } else {
      return res.status(500).json({
        message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์",
      });
    }
  }
  return res.status(201).json({
    message: "สร้างโปรโมชั่นโค้ดสำเร็จ",
  });
};
/** POST Promotion End */

/** GET All Promotion Start */
export const getAllPromotion = async (req, res) => {
  let results;
  try {
    results = await connectionPool.query(
      `select * from promotions order by updated_at desc`
    );
  } catch (error) {
    return res.status(500).json({
      message: "พบข้อผิดพลาดภายในเซิร์ฟเวอร์",
    });
  }
  return res.status(200).json({
    message: "ดึงข้อมูลโปรโมชั่นโค้ดสำเร็จ",
    data: results.rows,
  });
};
/** GET All Promotion End */

/** GET Promotion By ID Start */
export const getPromotionById = async (req, res) => {
  let results;
  const promotionIdFromAdmin = req.params.id;
  try {
    results = await connectionPool.query(
      `select * from promotions where promotion_id = $1`,
      [promotionIdFromAdmin]
    );
    if (!results.rows[0]) {
      return res.status(404).json({
        message: "ไม่พบโปรโมชั่นโค้ด",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "พบข้อผิดพลาดภายในเซิร์ฟเวอร์",
    });
  }
  return res.status(200).json({
    message: "ดึงข้อมูลโปรโมชั่นโค้ดสำเร็จ",
    data: results.rows,
  });
};
/** GET Promotion By ID End */

/** PUT Promotion By ID Start */
export const putPromotionById = async (req, res) => {
  let results;
  const promotionIdFromAdmin = req.params.id;
  const updatedPromotion = {
    ...req.body,
    updated_at: new Date(),
  };
  console.log("HEe");
  console.log(req.body);
  try {
    results = await connectionPool.query(
      `select * from promotions where promotion_id = $1`,
      [promotionIdFromAdmin]
    );
    if (!results.rows[0]) {
      return res.status(404).json({
        message: "ไม่พบโปรโมชั่นโค้ด",
      });
    }
    await connectionPool.query(
      `update promotions 
      set promotion_code = $2, discount = $3, discount_type = $4,
      usage_limit = $5, expiry_date = $6, expiry_time = $7, updated_at = $8
      where promotion_id = $1`,
      [
        promotionIdFromAdmin,
        updatedPromotion.promotion_code,
        updatedPromotion.discount,
        updatedPromotion.discount_type,
        updatedPromotion.usage_limit,
        updatedPromotion.expiry_date,
        updatedPromotion.expiry_time,
        updatedPromotion.updated_at,
      ]
    );
  } catch (error) {
    console.log(error);
    if (
      !updatedPromotion.promotion_code ||
      !updatedPromotion.discount ||
      !updatedPromotion.discount_type ||
      !updatedPromotion.usage_limit ||
      !updatedPromotion.expiry_date ||
      !updatedPromotion.expiry_time
    ) {
      return res.status(400).json({
        message: "ข้อมูลไม่ครบหรือไม่ถูกต้อง",
      });
    } else {
      return res.status(500).json({
        message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์",
      });
    }
  }
  return res.status(200).json({
    message: "อัพเดตข้อมูลโปรโมชั่นโค้ดสำเร็จ",
    data: updatedPromotion,
  });
};
/** PUT Promotion By ID End */

/** DELETE Promotion By ID Start */
export const deletePromotionById = async (req, res) => {
  let results;
  const promotionIdFromAdmin = req.params.id;
  try {
    // results = await connectionPool.query(
    //   `select * from promotions where promotion_id = $1`,
    //   [promotionIdFromAdmin]
    // );
    results = await connectionPool.query(
      `delete from promotions where promotion_id = $1`,
      [promotionIdFromAdmin]
    );
    if (!results.rowCount) {
      return res.status(404).json({
        message: "ไม่พบโปรโมชั่นโค้ด",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "พบข้อผิดพลาดภายในเซิร์ฟเวอร์",
    });
  }
  return res.status(200).json({
    message: "ลบข้อมูลโปรโมชั่นโค้ดสำเร็จ",
  });
};
/** DELETE Promotion By ID End */
