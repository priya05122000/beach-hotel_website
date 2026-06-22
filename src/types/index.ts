// types/index.ts

export interface ApiListResponse<T> {
  success: boolean;
  total: number;
  data: T[];
}

export interface Module {
  module_id: number;
  module_name: string;
  description?: string;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;

  created_by?: string;
  updated_by?: string;
  deleted_by?: string;
}

export interface Org {
  id: number;

  logo?: string | null;
  brand_name?: string | null;
  description?: string | null;

  email?: string | null;
  phone_number?: string | null;
  alternate_phonenumber?: string | null;

  state?: string | null;
  country?: string | null;
  pincode?: string | null;
  address?: string | null;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;

  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
}

export interface RoleManagement {
  id: number;

  role_name: string;

  module_manage?: {
    module_id: number;
    permission: string;
  }[];

  role_type?: "org" | "venue" | null;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;

  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
}

export interface OrgUser {
  id: number;

  org_id: number;
  role_id: number;

  name: string;
  email?: string | null;
  password_hash?: string | null;

  phone_number?: string | null;
  gender?: string | null;

  image_url?: string | null;
  address?: string | null;

  is_active?: boolean;
  org_role?: string | null;

  session_id?: string | null;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;

  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
}

export interface OrgUserRole {
  id: number;

  org_user_id: number;
  role_id: number;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;

  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
}

export interface OrgUserSession {
  id: string;

  org_user_id: number;

  ip_address?: string;
  user_agent?: string;

  login_time?: string;
  logout_time?: string;

  is_active?: boolean;

  created_at?: string;
}

export interface OrgUserLoginHistory {
  id: string;

  venue_user_id: number;
  session_id?: string;

  ip_address?: string;
  user_agent?: string;

  login_time?: string;
  logout_time?: string;

  login_status?: "success" | "failure";

  captcha_verified?: boolean;

  failure_reason?: string;

  created_at?: string;
}

export interface OrgUserPasswordReset {
  id: string;

  org_user_id: number;

  method: "email" | "phone";
  destination?: string;

  otp_code: string;

  is_used?: boolean;

  expires_at?: string;
  created_at?: string;
}

export interface Contact {
  id: number;

  first_name: string;
  last_name?: string;

  email: string;
  phone_number: string;

  password: string;

  address?: string;
  postcode?: string;
  city?: string;
  state?: string;

  is_active?: boolean;

  last_login?: string;

  email_verified?: boolean;
  phone_verified?: boolean;

  created_by?: number;
  updated_by?: number;

  created_at?: string;
  updated_at?: string;
}

export interface AuthSession {
  id: string;

  contact_id: number;

  device_info?: string;
  ip_address?: string;

  auth_method?: "password" | "otp_only";

  is_active?: boolean;

  created_at?: string;
  last_used_at?: string;
}

export interface ContactOtp {
  id: string;

  contact_id: number;

  contact_method: "email" | "phone";
  contact_value: string;

  otp_code: string;

  expires_at: string;

  is_used?: boolean;

  created_at?: string;
}

export interface ContactPasswordReset {
  id: string;

  contact_id: number;

  method: "email" | "phone";

  destination?: string;

  otp_code: string;

  is_used?: boolean;

  expires_at?: string;

  created_at?: string;
}

export interface Banner {
  id: number;

  title: string;
  sub_title: string;

  image_url: string;

  is_active?: boolean;

  display_order?: number;

  created_by?: string;
  updated_by?: string;
  deleted_by?: string;

  is_deleted?: boolean;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface Announcement {
  id: number;

  title?: string;
  description?: string;

  is_active?: boolean;

  display_order?: number;

  start_date?: string;
  end_date?: string;

  created_by?: number;
  updated_by?: number;
  deleted_by?: number;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface Offer {
  id: string;

  title: string;

  short_description?: string;
  description?: string;

  image_url?: string;

  start_date?: string;
  end_date?: string;

  is_featured?: boolean;
  is_active?: boolean;

  display_order?: number;

  created_by?: number;
  updated_by?: number;
  deleted_by?: number;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface PromoCode {
  id: string;

  offer_id: string;

  promo_code: string;

  discount_type: "percentage" | "fixed";

  discount_value?: number;

  minimum_booking_amount?: number;

  maximum_discount?: number;

  usage_limit?: number;
  used_count?: number;

  start_date?: string;
  expiry_date?: string;

  is_active?: boolean;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;

  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
}

export interface Facility {
  id: number;

  facility_name: string;

  icon_url?: string;
  image_url?: string | string[];

  short_description?: string;
  description?: string;

  is_featured?: boolean;
  is_active?: boolean;

  display_order?: number;

  created_by?: number;
  updated_by?: number;
  deleted_by?: number;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface GuestReview {
  id: number;

  contact_id: number;

  guest_name?: string;
  guest_email?: string;

  rating?: number;

  review_title?: string;
  review?: string;

  image_url?: string;

  is_approved?: boolean;
  is_featured?: boolean;
  is_active?: boolean;

  admin_reply?: string;
  reply_date?: string;

  created_by?: number;
  updated_by?: number;
  deleted_by?: number;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface GalleryCategory {
  id: number;

  category_name: string;

  category_image?: string;

  short_description?: string;

  is_active?: boolean;

  display_order?: number;

  created_by?: number;
  updated_by?: number;
  deleted_by?: number;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface Gallery {
  id: number;

  title?: string;

  media_type: "image" | "video";

  media_url: string;

  thumbnail_url?: string;

  category_id?: number;

  short_description?: string;

  is_featured?: boolean;
  is_active?: boolean;

  display_order?: number;

  created_by?: number;
  updated_by?: number;
  deleted_by?: number;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface FaqCategory {
  id: number;

  category_name: string;

  short_description?: string;

  is_active?: boolean;

  display_order?: number;

  created_by?: number;
  updated_by?: number;
  deleted_by?: number;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface FAQ {
  id: number;

  question: string;
  answer: string;

  category_id: number;

  is_featured?: boolean;
  is_active?: boolean;

  display_order?: number;

  created_by?: number;
  updated_by?: number;
  deleted_by?: number;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface NearbyDestination {
  id: number;

  destination_name: string;
  distance?: string;

  image_url?: string | string[];

  short_description?: string;
  description?: string;

  is_featured?: boolean;
  is_active?: boolean;

  display_order?: number;

  created_by?: number;
  updated_by?: number;
  deleted_by?: number;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface ActivityLog {
  id: number;

  module_name?: string;

  record_id?: number;

  action_type?: string;

  description?: string;

  performed_by?: number;

  ip_address?: string;

  created_at?: string;
}
