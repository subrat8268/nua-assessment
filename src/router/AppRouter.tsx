import { Routes, Route, Navigate } from 'react-router-dom';
import { ProductPage } from '../pages/ProductPage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/product/1" replace />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="*" element={<Navigate to="/product/1" replace />} />
    </Routes>
  );
}
