-- =============================================================================
-- PAO REPORTING TOOL — REPEATABLE SEED DATA
-- Flyway repeatable migration: re-runs whenever this file changes
-- Source: V Corps Communication Playbook FY25 Q3
-- Hierarchy: V Corps → 1st Armored Division → Subordinate Brigades
-- =============================================================================

-- -----------------------------------------------------------------------------
-- TRUNCATE — FK-safe order: dependents first, then lookup/root tables
-- RESTART IDENTITY resets sequences so explicit IDs stay in sync
-- CASCADE handles any remaining FK dependencies
-- -----------------------------------------------------------------------------

TRUNCATE TABLE
    event,
    user_profile,
    theme_example,
    theme,
    unit,
    rank,
    posting_location,
    event_status,
    event_type,
    product_type
RESTART IDENTITY CASCADE;


-- -----------------------------------------------------------------------------
-- RANK
-- Populated before user_profile since user_profile.rank_id references rank.id
-- -----------------------------------------------------------------------------

INSERT INTO rank (id, name, abbreviation) VALUES
  (1,  'Second Lieutenant',      '2LT'),
  (2,  'First Lieutenant',       '1LT'),
  (3,  'Captain',                'CPT'),
  (4,  'Major',                  'MAJ'),
  (5,  'Lieutenant Colonel',     'LTC'),
  (6,  'Colonel',                'COL'),
  (7,  'Staff Sergeant',         'SSG'),
  (8,  'Sergeant First Class',   'SFC'),
  (9,  'Specialist',             'SPC'),
  (10, 'Sergeant',               'SGT');


-- -----------------------------------------------------------------------------
-- UNIT
-- parent_id is self-referencing; V Corps has no parent (NULL)
-- -----------------------------------------------------------------------------

INSERT INTO unit (id, name, parent_id) VALUES
  (1, 'V Corps',                                               NULL),
  (2, '1st Armored Division',                                  1),
  (3, '1st Armored Division Artillery',                        2),
  (4, '1st Armored Division Combat Aviation Brigade',          2),
  (5, '1st Armored Division Sustainment Brigade',              2),
  (6, '3rd Armored Brigade Combat Team, 1st Armored Division', 2);


-- -----------------------------------------------------------------------------
-- USER_PROFILE
-- One per unit; 1AD HQ gets both an HQ_VIEWER and a PAO_UNIT user
-- -----------------------------------------------------------------------------

INSERT INTO user_profile (id, username, first_name, last_name, role, unit_id, rank_id) VALUES
  (1, 'mhensley',  'Marcus',  'Hensley',  'PAO_UNIT',  1, 4),  -- MAJ  — V Corps
  (2, 'swhitmore', 'Sandra',  'Whitmore', 'HQ_VIEWER', 2, 5),  -- LTC  — 1AD HQ viewer
  (3, 'dokafor',   'Derek',   'Okafor',   'PAO_UNIT',  2, 3),  -- CPT  — 1AD HQ PAO
  (4, 'pnambiar',  'Priya',   'Nambiar',  'PAO_UNIT',  3, 3),  -- CPT  — 1AD DIVARTY
  (5, 'jkowalski', 'James',   'Kowalski', 'PAO_UNIT',  4, 4),  -- MAJ  — 1AD CAB
  (6, 'tfigueroa', 'Tara',    'Figueroa', 'PAO_UNIT',  5, 3),  -- CPT  — 1AD SB
  (7, 'edrummond', 'Elijah',  'Drummond', 'PAO_UNIT',  6, 3);  -- CPT  — 3ABCT


-- -----------------------------------------------------------------------------
-- THEME
-- Drawn from the V Corps FY25 Q3 Communication Playbook
-- -----------------------------------------------------------------------------

INSERT INTO theme (id, name) VALUES
  (1,  'Warfighting Readiness'),
  (2,  'Posture'),
  (3,  'Security Cooperation'),
  (4,  'NATO Battle Group Contribution'),
  (5,  'Training & Exercises'),
  (6,  'Community Outreach'),
  (7,  'Enabling Warfighting'),
  (8,  'HIMARS Initiative (EHI)'),
  (9,  'Polish Apache Initiative'),
  (10, 'Transforming in Contact (TiC)'),
  (11, 'DEFENDER 25');


-- -----------------------------------------------------------------------------
-- THEME_EXAMPLE
-- name = short label, description = full talking point from the playbook
-- -----------------------------------------------------------------------------

INSERT INTO theme_example (id, name, description, theme_id) VALUES
  -- Warfighting Readiness
  (1,  'Forward HQ Readiness',
       'V Corps is the U.S. Army''s only forward-deployed corps headquarters, ready to respond to any threat in USEUCOM''s area of responsibility.',
       1),
  (2,  'Cornerstone Capabilities',
       'Armored tanks, attack aviation, and long-range artillery are V Corps'' cornerstone warfighting capabilities enabling lethality and agility along NATO''s Eastern Flank.',
       1),
  (3,  'Joint Education & Deterrence',
       'V Corps educates the U.S. joint force, NATO Allies, and partners through lethality initiatives and transformation efforts to deter aggression and prepare for large-scale combat operations.',
       1),

  -- Posture
  (4,  'Force Array',
       'V Corps forces are arrayed to defend national security, deter aggression, and defeat any adversary alongside NATO Allies and regional partners.',
       2),
  (5,  'Sustainment Network',
       'V Corps uses an interconnected sustainment network to support its mission, enable NATO warfighting capacity, and modernize its force.',
       2),
  (6,  'Enduring Presence',
       'The enduring presence of V Corps in Europe allows it to build continuity in an ever-changing environment.',
       2),

  -- Security Cooperation
  (7,  'Allied Lethality',
       'V Corps security cooperation efforts help allied forces develop lethality, interoperability, and skills critical to defeating potential adversaries.',
       3),
  (8,  'Apprenticeship Programs',
       'Assigned and rotational units participate in multinational summits and host Allies for apprenticeships allowing combined forces to share knowledge and strengthen relationships.',
       3),
  (9,  'Unified Response',
       'A collaborative approach enhances the ability to respond decisively as a unified force if the region transitions from crisis to conflict.',
       3),

  -- NATO Battle Group Contribution
  (10, 'Battle Group Poland',
       'V Corps provides a battalion task force capability to Forward Land Forces Battle Group Poland as the lead framework nation.',
       4),
  (11, 'Eastern Flank Companies',
       'V Corps provides four companies to the NATO battle groups in Hungary, Romania, Bulgaria, and Slovakia.',
       4),

  -- Training & Exercises
  (12, 'Interoperability Standard',
       'V Corps has raised the bar on interoperability from simple radio communication to executing complex combined scenarios where forces can shoot, move, and communicate together.',
       5),
  (13, 'People & Processes',
       'Interoperability is not just about systems and technology — it is about people, processes, and relationships that build stronger teams and increase lethality.',
       5),
  (14, 'Full Spectrum Readiness',
       'Training enables V Corps to fight and win across the full spectrum of military operations, from contingency response to large-scale combat operations.',
       5),

  -- Community Outreach
  (15, 'Shared History',
       'V Corps has a long and enduring history with Europe, and by participating in significant historical outreach events we memorialize the actions of Victory Corps Soldiers that came before us.',
       6),
  (16, 'Host Nation Bonds',
       'By participating in outreach events, we build stronger bonds with our host nation, increase local ties, and become better neighbors.',
       6),
  (17, 'Soldier Ambassadors',
       'V Corps Soldiers are ambassadors for the American way of life while serving in Europe.',
       6),

  -- Enabling Warfighting
  (18, 'Collaborative Readiness',
       'V Corps builds readiness, lethality, and interoperability through collaborative forums, international exercises, unit-level training, mentorship, and personal relationships with Allies.',
       7),
  (19, 'Precision Strike',
       'V Corps will enhance precision strike capabilities to provide more effective targeting of enemy positions, allowing for a more decisive response to emerging threats.',
       7),
  (20, 'UAV / ISR',
       'V Corps will increase UAV capabilities to provide enhanced ISR, supporting warfighting operations and enabling more informed decision making.',
       7),

  -- HIMARS Initiative (EHI)
  (21, 'Scalable Education',
       'The EHI is designed to be a scalable and tailorable approach to educate leaders, mentor operators, and share lessons on sustaining HIMARS systems and associated equipment.',
       8),
  (22, 'Reach & Mobility',
       'HIMARS superior reach and improved mobility add depth, allowing the commander to reach targets on the battlefield while maneuvering over challenging terrain.',
       8),
  (23, 'Digital Interoperability',
       'Artillery Systems Cooperation Activities allow commands to communicate digitally in real time, nullifying language barriers and increasing signal speed.',
       8),

  -- Polish Apache Initiative
  (24, 'First Summit',
       'The first European Apache Initiative summit familiarized 45 participants from Poland, Netherlands, and the UK with tactics, lessons learned, and resources for attack aviation platforms.',
       9),
  (25, 'Lines of Effort',
       'Summit discussion topics fall under four main lines of effort: organizing, training, fighting, and sustaining.',
       9),
  (26, 'Polish Apache Fleet',
       'Poland''s purchase of 96 AH-64E Apache Guardian helicopters makes it the second-largest operator of Apaches, second only to the U.S.',
       9),

  -- Transforming in Contact (TiC)
  (27, 'Accelerated Development',
       'TiC accelerates technology development, facilitates learning on how to best utilize and integrate technology into operations, and provides leaders with practical experience as technology evolves.',
       10),
  (28, 'Prototype Testing',
       'V Corps units test equipment prototypes including UAS, C-UAS, EW, and loitering munition capability, then evaluate systems and collect lessons learned.',
       10),
  (29, 'Modernization Now',
       'TiC gives units rotating to Europe the ability to modernize with equipment available now versus the normal multi-year acquisition process.',
       10),

  -- DEFENDER 25
  (30, 'Combat Ready Returns',
       'U.S. forces return from large-scale training in Europe more combat ready, capable, and interoperable.',
       11),
  (31, 'Scale of Exercise',
       'DEFENDER 25 integrates more than 23,000 U.S., Allied, and partner forces hosted in 15 countries from May 11 through June 24, 2025.',
       11),
  (32, 'Deployment Rehearsal',
       'Multinational exercises like DEFENDER 25 rehearse the deployment, employment, and integration of U.S. Army forces to enable NATO and partners and deter aggressors.',
       11);


-- -----------------------------------------------------------------------------
-- EVENT_STATUS
-- -----------------------------------------------------------------------------

INSERT INTO event_status (id, name, description) VALUES
  (1, 'Draft',        'Created but not yet submitted for review'),
  (2, 'Submitted',    'Submitted to HQ for review'),
  (3, 'Under Review', 'Being reviewed by Division HQ staff'),
  (4, 'Approved',     'Approved by HQ; cleared for publication'),
  (5, 'Published',    'Published and publicly released'),
  (6, 'Archived',     'No longer active; retained for record');


-- -----------------------------------------------------------------------------
-- EVENT_TYPE
-- -----------------------------------------------------------------------------

INSERT INTO event_type (id, name, description) VALUES
  (1, 'News Release',      'Official press release distributed to media outlets'),
  (2, 'Feature Story',     'In-depth narrative story highlighting Soldiers or missions'),
  (3, 'Photo Package',     'Curated set of imagery with captions for media use'),
  (4, 'Video Package',     'Edited video content for broadcast or digital distribution'),
  (5, 'Social Media Post', 'Content formatted for unit social media channels'),
  (6, 'Command Information','Internal communication intended for Soldier audiences'),
  (7, 'Media Interview',   'Coordinated interview between media and unit leadership'),
  (8, 'Talking Points',    'Prepared Q&A or key messages for leadership use');


-- -----------------------------------------------------------------------------
-- POSTING_LOCATION
-- -----------------------------------------------------------------------------

INSERT INTO posting_location (id, name) VALUES
  (1, 'DVIDS'),
  (2, 'Unit Facebook Page'),
  (3, 'Unit Instagram'),
  (4, 'Unit Twitter / X'),
  (5, 'Army.mil'),
  (6, 'Stars and Stripes'),
  (7, 'Local / Host Nation Media');


-- -----------------------------------------------------------------------------
-- PRODUCT_TYPE
-- -----------------------------------------------------------------------------

INSERT INTO product_type (id, name, description) VALUES
  (1, 'Print',    'Printed media including newspapers and magazines'),
  (2, 'Digital',  'Online and web-based publication'),
  (3, 'Broadcast','Television and radio distribution'),
  (4, 'Social',   'Social media platform content'),
  (5, 'Internal', 'Command information and internal Army channels');


-- -----------------------------------------------------------------------------
-- EVENT
-- One per unit; spans all status states for a realistic demo
-- event.user_id = the PAO who owns/submitted the event
-- Each event has a single theme_id and posting_location_id per the schema
-- -----------------------------------------------------------------------------

INSERT INTO event (id, name, description, event_type_id, start_date, end_date, user_id, event_status_id, theme_id, posting_location_id) VALUES
  (1,
   'DEFENDER 25 Media Embed Coverage',
   'Coordinated media embed covering 3ABCT participation in DEFENDER 25 Swift Response phase.',
   1, '2025-05-12 08:00:00', '2025-05-18 17:00:00',
   7, 2, 11, 1),   -- user: edrummond (3ABCT) | Submitted | DEFENDER 25 | DVIDS

  (2,
   'EHI 6 Summit Feature Story',
   'Feature story on 1AD DIVARTY participation in EHI 6 in Cincu, Romania, highlighting U.S.-Romanian HIMARS interoperability.',
   2, '2025-06-03 08:00:00', '2025-06-07 17:00:00',
   4, 1, 8, 1),    -- user: pnambiar (DIVARTY) | Draft | HIMARS Initiative | DVIDS

  (3,
   'Polish Apache Initiative — CAB Media Day',
   'Photo package supporting 1AD CAB participation in the Polish Apache Initiative summit at Katterbach Army Airfield.',
   3, '2025-01-22 09:00:00', '2025-01-24 17:00:00',
   5, 4, 9, 2),    -- user: jkowalski (CAB) | Approved | Polish Apache Initiative | Facebook

  (4,
   'Community Outreach: Bolesławiec Cultural Festival',
   '1AD HQ Soldiers participated in the local cultural festival in Bolesławiec, Poland.',
   6, '2025-04-19 10:00:00', '2025-04-19 18:00:00',
   3, 5, 6, 3),    -- user: dokafor (1AD HQ PAO) | Published | Community Outreach | Instagram

  (5,
   '1AD Sustainment Brigade Logistics Feature',
   'Command information piece highlighting the sustainment network supporting rotational forces across nine nations.',
   6, '2025-05-05 08:00:00', '2025-05-09 17:00:00',
   6, 3, 2, 1),    -- user: tfigueroa (SB) | Under Review | Posture | DVIDS

  (6,
   'TiC Equipment Fielding — Combined Resolve 25-02',
   'News release covering V Corps TiC prototype fielding during Combined Resolve 25-02, including UAS and C-UAS system evaluations.',
   1, '2025-03-10 07:00:00', '2025-03-14 18:00:00',
   1, 6, 10, 5);   -- user: mhensley (V Corps) | Archived | TiC | Army.mil
