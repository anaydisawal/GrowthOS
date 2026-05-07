import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xfubenkiotwriswcruqp.supabase.co";

const supabaseKey =
  "sb_publishable_bfh71TWNmI18CNsy4x1dlg_XBq8RZLd";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);