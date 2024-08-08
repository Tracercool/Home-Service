import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminServicePage from "../pages/admin-service-page";

import AdminPromotionPage from "../pages/admin-promotion-page";
import AdminAddPromotionPage from "../pages/admin-add-promotion-page";
import AdminEditPromotionPage from "../pages/admin-edit-promotion-page";
import AdminViewPromotionPage from "../pages/admin-view-promotion-page";

import AdminCategoryPage from "../pages/admin-category-page";
import AdminAddCategoryPage from "../pages/admin-add-category-page";
import AdminEditCategoryPage from "../pages/admin-edit-category-page";
import AdminViewCategoryPage from "../pages/admin-view-category-page";

function AutenticatedAdmin() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin/category" element={<AdminCategoryPage />} />
        <Route path="/admin/service" element={<AdminServicePage />} />
        <Route path="/admin/promotion" element={<AdminPromotionPage />} />
        <Route
          path="/admin/promotion/add-promotion"
          element={<AdminAddPromotionPage />}
        />
        <Route
          path="/admin/promotion/edit-promotion/:promotion_id"
          element={<AdminEditPromotionPage />}
        />
        <Route
          path="/admin/promotion/:promotion_id"
          element={<AdminViewPromotionPage />}
        />
        <Route
          path="/admin/category/add-category"
          element={<AdminAddCategoryPage />}
        />
        <Route
          path="/admin/category/edit-category/:category_id"
          element={<AdminEditCategoryPage />}
        />
        <Route
          path="/admin/category/:category_id"
          element={<AdminViewCategoryPage />}
        />
      </Routes>
    </div>
  );
}

export default AutenticatedAdmin;
