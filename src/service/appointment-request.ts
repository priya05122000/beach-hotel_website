import { apiPost } from "@/src/lib/api";
import type { ApiListResponse, AppointmentRequest } from "@/src/types";

export function submitAppointmentEnquiry(
  payload: Omit<AppointmentRequest, "id" | "created_at" | "updated_at" | "deleted_at" | "is_handled" | "handled_by" | "created_by" | "updated_by" | "deleted_by">,
): Promise<ApiListResponse<AppointmentRequest>> {
  return apiPost<ApiListResponse<AppointmentRequest>>(
    "/api/appointment-requests/create",
    payload,
  );
}
