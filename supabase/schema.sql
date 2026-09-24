-- ==============================================================================
-- LCB BRIGADE & PORTFOLIO CONTENT MANAGEMENT SYSTEM (CMS) - SUPABASE SCHEMA
-- ==============================================================================

-- 1. Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY DEFAULT 'primary',
  site_title TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  tagline TEXT,
  short_intro TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  linkedin TEXT,
  website TEXT,
  hero_image TEXT,
  seo_meta_title TEXT,
  seo_meta_description TEXT,
  seo_keywords TEXT,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Page Content / Home Sections Table
CREATE TABLE IF NOT EXISTS page_content (
  id TEXT PRIMARY KEY DEFAULT 'home',
  hero_title TEXT NOT NULL,
  hero_tagline TEXT,
  hero_description TEXT,
  hero_image TEXT,
  hero_cta_primary_text TEXT,
  hero_cta_primary_link TEXT,
  hero_cta_secondary_text TEXT,
  hero_cta_secondary_link TEXT,
  about_heading TEXT,
  about_subheading TEXT,
  about_biography JSONB DEFAULT '[]'::jsonb,
  about_vision TEXT,
  about_mission TEXT,
  about_core_values JSONB DEFAULT '[]'::jsonb,
  about_image TEXT,
  section_headings JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Meetings Table (DGAMs, Club Assemblies, Service Meetings)
CREATE TABLE IF NOT EXISTS meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT,
  location TEXT,
  description TEXT,
  image TEXT,
  status_category TEXT NOT NULL DEFAULT 'Regular Meeting',
  status TEXT NOT NULL DEFAULT 'published', -- 'draft' or 'published'
  display_order INT DEFAULT 1,
  dignitaries JSONB DEFAULT '[]'::jsonb,
  key_outcomes JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Services Table
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT DEFAULT 'Globe',
  image TEXT,
  category TEXT,
  years_of_experience INT DEFAULT 0,
  features JSONB DEFAULT '[]'::jsonb,
  tag TEXT,
  display_order INT DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Team Members Table (Leadership, Officers, Core Staff)
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  position TEXT NOT NULL,
  profile_image TEXT,
  biography TEXT,
  organization TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  display_order INT DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Achievements Table (Honors, Awards, CSR Milestones)
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  year_date TEXT NOT NULL,
  description TEXT NOT NULL,
  value_metric TEXT,
  image TEXT,
  icon_name TEXT,
  category TEXT NOT NULL,
  impact_details TEXT,
  display_order INT DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Charter Sections Table (LCB Brigade Governance & Charter)
CREATE TABLE IF NOT EXISTS charter_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_title TEXT NOT NULL,
  section_content TEXT NOT NULL,
  category TEXT NOT NULL,
  display_order INT DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Media Assets Table
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  url TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  mime_type TEXT,
  size_bytes BIGINT DEFAULT 0,
  alt_text TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE charter_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Public Visitors: READ-ONLY access to PUBLISHED content
CREATE POLICY "Public Read Settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Page Content" ON page_content FOR SELECT USING (true);
CREATE POLICY "Public Read Published Meetings" ON meetings FOR SELECT USING (status = 'published');
CREATE POLICY "Public Read Published Services" ON services FOR SELECT USING (status = 'published');
CREATE POLICY "Public Read Published Team" ON team_members FOR SELECT USING (status = 'published');
CREATE POLICY "Public Read Published Achievements" ON achievements FOR SELECT USING (status = 'published');
CREATE POLICY "Public Read Published Charter" ON charter_sections FOR SELECT USING (status = 'published');
CREATE POLICY "Public Read Media" ON media FOR SELECT USING (true);

-- Authenticated Admin: Full CRUD Access
CREATE POLICY "Admin Full Access Settings" ON site_settings FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Page Content" ON page_content FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Meetings" ON meetings FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Services" ON services FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Team" ON team_members FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Achievements" ON achievements FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Charter" ON charter_sections FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Media" ON media FOR ALL TO authenticated USING (true);
