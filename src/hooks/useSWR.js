// src/hooks/useSWR.js
// Re-export all hooks from separate files for convenience

export { useSummary } from './useSummary';
export { useSchools, usePublicSchools, useReviewerSchools } from './useSchools';
export { useSchoolDetail, useSchoolDetailLocal } from './useSchoolDetail';
export { useSchoolReviews } from './useReviews';
export {
  useCategories,
  useCategoryById,
  useIndicators,
  useIndicatorsByCategory,
  useIndicatorById,
  createCategory,
  updateCategory,
  deleteCategory,
  createIndicator,
  updateIndicator,
  deleteIndicator,
} from './useIndicators';
export {
  useNotifications,
  useNotificationDetail,
  markNotificationAsRead,
} from './useNotifications';
export {
  useAccountRequests,
  useAccountRequestDetail,
  acceptRequest,
  rejectRequest,
} from './useAccountRequests';
export { useDashboardSummary } from './useDashboardSummary';
