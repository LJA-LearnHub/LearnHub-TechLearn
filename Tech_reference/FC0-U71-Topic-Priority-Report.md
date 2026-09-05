# FC0-U71 (CompTIA Tech+) Practice Bank Analysis
### Source: 192 questions, all 6 official exam domains

This report breaks your 192-question set into **specific tested concepts**, ranked from "know this cold" down to "safe to skim." The ranking is based on two things: how many times a concept (or a near-identical rephrasing of it) shows up in your own question bank, and how core it is to the official exam objectives. Where the same fact is tested more than once with different wording, I've called that out explicitly — that repetition is the strongest signal in the data that CompTIA considers it high-yield.

---

## 1. Domain Distribution (192 questions)

| Domain | # Questions | % of bank |
|---|---|---|
| Infrastructure | 46 | 24% |
| IT Concepts & Terminology | 41 | 21% |
| Security | 37 | 19% |
| Data & Database Fundamentals | 25 | 13% |
| Applications and Software | 22 | 11% |
| Software Development Concepts | 21 | 11% |

Format note: three questions are "choose two" (Q12, Q25, Q101) — all three are on core input-device / PII / IPOS-model concepts, not edge cases.

---

## 2. TIER 1 — Must Know Cold (tested repeatedly, foundational)

These concepts each show up **3+ times** in your bank in different scenario wrapping. If you only have limited time, this section is where it goes.

### Number systems & units of measurement (~17 questions)
The single largest recurring cluster in the whole bank.
- **Byte = 8 bits** — asked verbatim twice (Q16, Q131)
- **Storage unit ordering** (KB < MB < GB < TB < PB) tested at least 4 different ways (Q6 smallest, Q81 largest, Q107 largest drive, Q108 largest unit)
- **Clock speed = MHz/GHz** for CPU speed, tested 3 ways (Q50, Q91, Q192 — highest value comparison)
- **Number base conversions** (binary/octal/decimal/hexadecimal), tested 5+ ways:
  - Hex is used for physical/MAC addresses (Q13, Q98)
  - Hex uses 0–9 and A–F (Q167)
  - Hex represents values in the fewest characters vs. binary/decimal (Q117)
  - Converting hex→binary (Q176) and decimal→binary (Q33)
  - Valid IP address format recognition (Q178)
- **Throughput units** (bps < Mbps < Gbps < Tbps) (Q135, Q162)

**Bottom line:** memorize the full unit hierarchy (bit→byte→KB→MB→GB→TB→PB) and be able to convert between binary/octal/decimal/hex on sight. This is worth more raw points than any other single topic.

### CompTIA's troubleshooting methodology (Q9, Q96, Q106)
Three separate questions each test a *different step* of the same 6-step process:
1. Identify the problem
2. Establish a theory of probable cause
3. **Test the theory**
4. Establish a plan of action / **implement the solution**
5. Verify full system functionality
6. **Document findings, actions, and outcomes**

Know the *order*, not just the steps — every question in this cluster is really asking "what comes next."

### Security concepts: AAA + non-repudiation (Q26, Q46, Q69, Q72, Q95)
- **Authentication** = proving who you are (login)
- **Authorization** = what you're allowed to do once logged in (can't access a shared folder despite being logged in = authorization, not authentication)
- **Accounting** = logging/tracking what was done (log files, login counts)
- **Non-repudiation** = proof an action can't be denied later (audit trail tied to a specific user)
- Related: least-privilege access (Q86), admin vs. standard user rights (Q95)

### Encryption & secure transport (9 questions: Q23, Q28, Q34, Q74, Q127, Q140, Q141, Q161, Q168)
- Encryption = confidentiality (unreadable without a key)
- **VPN** = encrypted tunnel for remote access (Q28, Q140)
- **HTTPS/TLS** = encrypts web traffic in transit (Q127)
- **File-level encryption** = protects data **at rest** (Q34)
- **Integrity** (not confidentiality) = checking a downloaded file is unchanged (Q141) — this distinction (confidentiality vs. integrity vs. availability) is tested repeatedly across the bank, not just here

### Password policy vocabulary (Q5, Q10, Q32, Q37)
- **Expiration** = forced periodic reset (every 60 days)
- **Complexity** = character requirements
- **Reuse policy** = blocks the same password across sites/history
- Also: rogue/unauthorized devices on a network → fix is to **change the password**, not reset the router (Q10)

### Input / Output / Processing / Storage (IPOS) classification (7 questions: Q12, Q52, Q55, Q93, Q99, Q101, Q119)
Classic device-sorting questions — keyboard/scanner/mouse = input, printer/monitor/smart TV = output, GPU/CPU = processing, HDD/SSD = storage. Touchscreens are the trick answer: **both input and output** (Q101).

### Database fundamentals (~15 of the 25 Data-domain questions)
- **Primary key** = unique identifier, no duplicates allowed (Q53, Q80, Q130) — tested 3 times
- **Relational** database = uses primary/foreign keys; **non-relational** = key/value pairs, document stores (Q80, Q109)
- **Query** = retrieve specific data (Q17, Q30, Q142) — tested 3 times, including reading actual pseudocode (`SELECT...WHERE`)
- **Schema** = the outline/structure of a database (Q3, Q150)
- Database vs. flat file: databases win on indexing/querying/concurrent access; flat files win on simplicity for small, single-user data (Q36, Q126, Q160, Q169)

---

## 3. TIER 2 — High Priority (tested 2–3 times, core to a domain)

- **Networking hardware & cabling**: access points extend range (Q2); firewalls control/permit traffic (Q14, Q134, Q181); crimpers/cable testers/punchdown tools and their *order of use* (Q54, Q143); fiber uses SFP connectors (Q124, Q171)
- **Internet service types**: fiber = fastest (Q83), satellite = highest latency but works with no cabling/towers (Q8, Q41), DSL/cable as middle ground
- **Storage device speed hierarchy**: NVMe (fastest, M.2 form factor) > SSD > HDD > optical/flash for raw speed (Q105, Q149, Q183); SSD is non-magnetic/non-volatile/non-optical (Q149)
- **Browser troubleshooting**: clear cache for stale/outdated page content (Q19, Q56); pop-up blockers block hyperlinks/reports from opening (Q92); clicking the padlock validates a site certificate (Q64)
- **Data handling vocabulary**: critical data (Q151, Q190), PII (Q25), data monetization (Q68, Q148), data capture (Q152), data analytics (Q121), meaningful reporting for decisions (Q94, Q186) — these all sound similar; the difference is usually *who benefits and how*
- **AI types**: generative (drafts content/code — Q122, Q174), predictive (text prediction — Q59), assistive/chatbot (customer-facing Q&A — Q66, Q115, Q118)
- **Programming constructs**: loops (Q11, Q104, Q110, Q146 — 4x), branching/if-else (Q60, Q133), variables vs. constants (Q21, Q85, Q153, Q173 — value that changes vs. stays fixed)
- **Software licensing**: open-source = you can modify the code (Q40); product key = activates software (Q128); removing software that duplicates OS-native features = "unnecessary," not malicious (Q154)
- **Productivity software categories**: presentation (Q29), diagramming (Q42, Q132), conferencing (Q97, Q129), word processing/spreadsheet as contrast options

---

## 4. TIER 3 — Moderate Priority (tested 1–2 times, worth recognizing)

- Virtualization: hypervisor manages VM resources (Q44, Q159); IaaS/PaaS/SaaS distinctions (Q138)
- Backup & availability: cloud storage for high availability/collaboration (Q15); UPS for short-term power-loss protection (Q180); backups must include application data, not just files (Q87); restoring vs. backing up (Q137)
- Data types: string vs. integer vs. float vs. boolean vs. char (Q43, Q76, Q77, Q102, Q103, Q112, Q114, Q116, Q179) — phone numbers are strings (not integers, since you don't do math on them); one dataset in your bank (Q43) is a trick: numbers sorted as text (1, 10, 2, 3...) signal a **string**, not a numeric type
- Programming language types: markup (tags, e.g., HTML — Q18, Q51, Q82, Q164), compiled (fastest runtime/best hardware optimization — Q90, Q120), assembly (closest to machine code — Q188), scripting vs. query as contrast options
- IoT & specialty devices: smartwatches for continuous health monitoring (Q125), smart thermostats as IoT (Q111), e-readers for outdoor/sunlight reading (Q39, Q45, Q88)
- Comments in code = documentation only, no effect on program output (Q113, Q187)

---

## 5. TIER 4 — Lower Priority (tested once, still a real objective)

- Flowchart symbols: diamond = decision point (Q75)
- File compression for bundling files into ZIP archives (Q144)
- OEM vs. third-party vendor sourcing for drivers (Q156)
- Physical security devices: cable locks for laptop theft, not privacy screens or firewalls (Q58)
- Screen mirroring for presenting identical content across displays (Q157)
- WPA2 as the "most secure" router config option among the choices given (Q147) — note: real-world best practice has moved to WPA3, but this bank still frames WPA2 as the answer
- Router setup order: change the default password before touching IP/channel settings (Q172); post-setup server hardening = changing default usernames/passwords (Q166)
- Onboard vs. expansion-card NICs — onboard is built into the motherboard (Q185)

---

## 6. TIER 5 — Lowest Priority (one-off scenario trivia, safe to skim last)

These appear exactly once, test a narrow real-world scenario rather than a core objective, and have little "reuse" value if the real exam rephrases things:
- Refrigerator sending a milk alert = embedded OS example (Q57)
- Scanner detected but some buttons not working → install vendor software (Q24)
- Wi-Fi drop near a kitchen = microwave interference (Q79, Q100)
- Gaming monitor's measurement unit oddly framed around MHz among the given choices (Q91)
- Webcam visible to student but not teacher → update device driver (Q61)
- Help-desk technician installing software for a user in another state = remote support software, distinguished from conferencing/IM (Q129)

---

## 7. One-Page Cheat Sheet (if you only review one section before the exam)

1. Byte = 8 bits. Order: bit → byte → KB → MB → GB → TB → PB.
2. Troubleshooting order: identify → theory → **test theory** → plan/implement → verify → **document**.
3. AAA: Authentication (who), Authorization (what you can do), Accounting (log of what happened), Non-repudiation (proof you can't deny it).
4. CIA triad shows up disguised as scenarios: Confidentiality (encryption), Integrity (unchanged file), Availability (backups/uptime).
5. Primary key = unique, no duplicates. Relational = keys/tables. Non-relational = key/value.
6. Encryption at rest (file-level) vs. in transit (VPN, HTTPS/TLS).
7. NVMe > SSD > HDD > optical, in speed.
8. Loop = repeat until condition; Branch = if/else; Variable = changes; Constant = fixed.
9. Generative AI = creates new content/code; Predictive AI = text prediction; Chatbot/Assistive = conversational Q&A.
10. Touchscreens = input **and** output; scanners/keyboards/mice = input only; printers/monitors = output only.

---

*Analysis based on the 192 questions in `fc0-u71-all-questions.md`. Three questions referenced schema/dataset images that weren't fully legible from the text extraction (Q3, Q53, Q112) — those are noted in the Data & Database section but flagged here in case you want to double-check the figures directly.*
