-- posting_location
INSERT INTO posting_location (id, name) VALUES
                                            (1, 'DVIDS'),
                                            (2, 'Facebook'),
                                            (3, 'Instagram'),
                                            (4, 'X (Twitter)'),
                                            (5, 'YouTube'),
                                            (6, 'LinkedIn'),
                                            (7, 'Unit Website'),
                                            (8, 'Army.mil');
-- =============================================
-- REFERENCE / LOOKUP TABLES (no FK deps)
-- =============================================

-- rank
INSERT INTO rank (id, name, abbreviation) VALUES
                                              (1, 'Private',              'PVT'),
                                              (2, 'Private Second Class', 'PV2'),
                                              (3, 'Private First Class',  'PFC'),
                                              (4, 'Specialist',           'SPC'),
                                              (5, 'Corporal',             'CPL'),
                                              (6, 'Sergeant',             'SGT'),
                                              (7, 'Staff Sergeant',       'SSG'),
                                              (8, 'Sergeant First Class', 'SFC'),
                                              (9, 'Master Sergeant',      'MSG'),
                                              (10,'First Sergeant',       '1SG'),
                                              (11,'Sergeant Major',       'SGM'),
                                              (12,'Second Lieutenant',    '2LT'),
                                              (13,'First Lieutenant',     '1LT'),
                                              (14,'Captain',              'CPT'),
                                              (15,'Major',                'MAJ');

-- event_status
INSERT INTO event_status (id, name, description) VALUES
                                                     (1, 'Draft',     'Event is being planned and not yet published'),
                                                     (2, 'Published', 'Event is live and visible to all users'),
                                                     (3, 'Ongoing',   'Event is currently in progress'),
                                                     (4, 'Completed', 'Event has concluded'),
                                                     (5, 'Cancelled', 'Event was cancelled before completion');

-- event_type
INSERT INTO event_type (id, name, description) VALUES
                                                   (1, 'Press Conference',   'Formal media engagement with prepared statements'),
                                                   (2, 'Community Outreach', 'Public engagement and community relations event'),
                                                   (3, 'Media Embed',        'Journalist embedded with a unit for coverage'),
                                                   (4, 'Change of Command',  'Official ceremony for leadership transition'),
                                                   (5, 'Award Ceremony',     'Recognition of service member achievements'),
                                                   (6, 'Training Exercise',  'Field exercise open to media coverage');

-- product_type
INSERT INTO product_type (id, name, description) VALUES
                                                     (1, 'News Release',     'Official written statement released to media outlets'),
                                                     (2, 'Feature Story',    'In-depth narrative piece on a person or event'),
                                                     (3, 'Photo Package',    'Curated set of photos with captions'),
                                                     (4, 'Video Package',    'Edited video product for broadcast or digital use'),
                                                     (5, 'Social Media Post','Content formatted for official social media channels'),
                                                     (6, 'Command Info',     'Internal information product for leadership');


-- theme
INSERT INTO theme (id, name) VALUES
                                 (1, 'Readiness'),
                                 (2, 'People & Families'),
                                 (3, 'Modernization'),
                                 (4, 'Partnerships'),
                                 (5, 'Recruiting & Retention');

-- =============================================
-- THEME_EXAMPLE (depends on theme)
-- =============================================

INSERT INTO theme_example (id, name, description, theme_id) VALUES
                                                                (1,  'Combat Readiness Training',      'Unit demonstrates live-fire readiness at NTC',                               1),
                                                                (2,  'Medical Readiness Exercise',     'Soldiers complete annual medical and dental requirements',                    1),
                                                                (3,  'Family Readiness Group Event',   'FRG hosts quarterly community support meeting',                              2),
                                                                (4,  'Soldier & Family Action Plan',   'Command initiative to improve quality of life for families',                 2),
                                                                (5,  'Next Generation Squad Weapon',   'Unit receives and qualifies on NGSW platform',                               3),
                                                                (6,  'Integrated Visual Augmentation', 'IVAS fielding and soldier feedback demonstration',                           3),
                                                                (7,  'NATO Joint Exercise',            'Multi-national training event with allied partners',                         4),
                                                                (8,  'Civil Authority Support',        'Unit assists local emergency management agency',                             4),
                                                                (9,  'Future Soldier Program Visit',   'Recruiter-led engagement at local high school',                              5),
                                                                (10, 'Retention NCO Spotlight',        'Feature on retention NCO efforts across the brigade',                        5);

-- =============================================
-- UNIT (self-referencing hierarchy)
-- =============================================

-- Division first (no parent)
INSERT INTO unit (id, name, parent_id) VALUES
    (1, '1st Cavalry Division', NULL);

-- Brigades (parent = division)
INSERT INTO unit (id, name, parent_id) VALUES
                                           (2, '1st Brigade Combat Team, 1CD', 1),
                                           (3, '2nd Brigade Combat Team, 1CD', 1),
                                           (4, '3rd Brigade Combat Team, 1CD', 1),
                                           (5, 'Division Artillery, 1CD',      1),
                                           (6, 'Combat Aviation Brigade, 1CD', 1);

-- Battalions (parent = brigades)
INSERT INTO unit (id, name, parent_id) VALUES
                                           (7,  '1-5 Cavalry Regiment',   2),
                                           (8,  '2-5 Cavalry Regiment',   2),
                                           (9,  '1-8 Cavalry Regiment',   3),
                                           (10, '2-8 Cavalry Regiment',   3),
                                           (11, 'Division PAO',           1);

-- =============================================
-- USER_PROFILE (depends on rank, unit)
-- =============================================

INSERT INTO user_profile (id, username, first_name, last_name, role, unit_id, rank_id) VALUES
                                                                                           (1,  'james.miller',    'James',    'Miller',    'PAO_UNIT',  11,  7),
                                                                                           (2,  'sarah.johnson',   'Sarah',    'Johnson',   'PAO_UNIT',  11,  14),
                                                                                           (3,  'derek.washington','Derek',    'Washington','PAO_UNIT',  2,   6),
                                                                                           (4,  'tina.brooks',     'Tina',     'Brooks',    'PAO_UNIT',  2,   8),
                                                                                           (5,  'marcus.evans',    'Marcus',   'Evans',     'HQ_VIEWER', 7,   14),
                                                                                           (6,  'rachel.nguyen',   'Rachel',   'Nguyen',    'PAO_UNIT',  3,   13),
                                                                                           (7,  'leon.harris',     'Leon',     'Harris',    'PAO_UNIT',  3,   7),
                                                                                           (8,  'diana.chen',      'Diana',    'Chen',      'PAO_UNIT',  11,  4),
                                                                                           (9,  'carlos.reyes',    'Carlos',   'Reyes',     'HQ_VIEWER', 1,   15),
                                                                                           (10, 'brittany.scott',  'Brittany', 'Scott',     'PAO_UNIT',  4,   6);
-- =============================================
-- EVENT (depends on event_type, user_profile)
-- Uses event_seq — values spaced by 50
-- =============================================

INSERT INTO event (id, name, description, event_type_id, start_date, end_date, user_id) VALUES
                                                                                            (1,   '1CD Spring Press Conference',     'Division-level media engagement covering Q2 readiness posture',        1, '2026-04-10 09:00:00', '2026-04-10 11:00:00', 2),
                                                                                            (51,  'Fort Cavazos Community Day',      'Annual outreach event open to local civilians and families',           2, '2026-04-15 10:00:00', '2026-04-15 16:00:00', 1),
                                                                                            (101, 'Media Embed – 1-5 CAV Exercise', 'Embedded journalist coverage of squadron field training exercise',     3, '2026-04-21 06:00:00', '2026-04-23 18:00:00', 4),
                                                                                            (151, '1BCT Change of Command',          'Outgoing and incoming BCT commander ceremony',                         4, '2026-05-01 10:00:00', '2026-05-01 12:00:00', 2),
                                                                                            (201, 'Division Soldier of the Year',    'Award ceremony recognizing top enlisted performers across the division',5,'2026-05-14 13:00:00', '2026-05-14 15:00:00', 1),
                                                                                            (251, 'Iron Horse Warfighter Exercise',  'Brigade-level warfighter exercise with media access for key events',   6, '2026-06-02 07:00:00', '2026-06-06 18:00:00', 6),
                                                                                            (301, 'NATO Media Day – Joint Exercise', 'Multi-national press event during bilateral training exercise',         2, '2026-06-10 09:00:00', '2026-06-10 14:00:00', 9),
                                                                                            (351, '2BCT Change of Command',          'Ceremony transitioning brigade command to incoming commander',          4, '2026-06-20 10:00:00', '2026-06-20 12:00:00', 6),
                                                                                            (401, 'NGSW Fielding Media Demo',        'Press demonstration of Next Generation Squad Weapon fielding to 1CD',  1, '2026-07-08 08:00:00', '2026-07-08 10:30:00', 2),
                                                                                            (451, 'Soldier Family Appreciation Day', 'Community and family engagement event hosted by Division G9 and PAO',  2, '2026-07-19 11:00:00', '2026-07-19 17:00:00', 1);