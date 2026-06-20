import { apiPost } from "@/src/lib/api";

export interface ContactEnquiryPayload {
    full_name: string;
    email: string;
    phone_number: string;
    location: string;
    message: string;
}

export interface ContactEnquiryResponse {
    success: boolean;
    message: string;
}

export function submitContactEnquiry(
    payload: ContactEnquiryPayload
): Promise<ContactEnquiryResponse> {
    const [first_name, ...rest] = payload.full_name.trim().split(" ");
    const last_name = rest.join(" ");

    return apiPost<ContactEnquiryResponse>("/api/contacts/create", {
        first_name,
        last_name,
        email: payload.email,
        phone_number: payload.phone_number,
        city: payload.location,
        address: payload.message,
    });
}
