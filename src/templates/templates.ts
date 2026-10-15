import { DocumentTemplate } from '../types';

export const TEMPLATES: DocumentTemplate[] = [
  {
    id: 'nikhil-grover-resume',
    title: 'Nikhil Grover — Technical Lead Resume',
    category: 'Resume & CV',
    badge: 'Official',
    description: 'Authentic 9 YOE Full Stack Developer & Technical Lead resume with Amazon, Cisco, and T-Mobile experience.',
    defaultSettings: {
      pageSize: 'letter',
      margin: 'compact',
      font: 'inter',
      fontSize: '10pt',
      lineHeight: 'tight',
      themeStyle: 'modern',
      accentColor: '#d97706', // amber-600
      showPageNumbers: false,
      showHeader: false,
    },
    markdown: `# NIKHIL GROVER
<div class="resume-contact-bar">
  <span>nikhil_ihs@hotmail.com</span> •
  <span>(425) 988-4101</span> •
  <a href="https://tinyurl.com/nikgrovlinkedin">tinyurl.com/nikgrovlinkedin</a> •
  <span>New York, NY</span>
</div>

---

### PROFESSIONAL SUMMARY
**Full Stack Developer & Technical Lead** with **9 years of experience** architecting high-scale ad platforms, low-latency satellite ground systems, real-time IoT firmware, and distributed health platforms across **Amazon**, **Cisco**, and **T-Mobile**. Proven track record driving AI chatbot ad integration, engineering audience segment bidding contributing to **$50M in revenue**, and optimizing operational workflows to reduce resolution times by **95%**.

---

### EXPERIENCE (9 YEARS TOTAL)

#### **Software Engineer — Full Stack Developer & Technical Lead** | Amazon Ads (Sponsored Brands)
*Dec 2024 — Present | New York, NY*
- Worked across organizations to integrate **Alexa for Shopping (Rufus)** into brand-forward, top-of-search ads, enabling a continuous brand-driven chatbot experience.
- Conducted rigorous technical interviews for internal and external Software Development Engineer (SDE) candidates across Amazon.
- Optimized a recurring operational process using an **AI-driven workflow (Claude & Kiro)**, reducing ticket resolution time by **95%**.
- Implemented a solution to enable pre-built audience segment bidding for vendors and sellers on Amazon. The initial launch rolled out a segment targeting new-to-brand shoppers with flexibility to onboard newer segments in at most **5 developer days**, contributing to **$50M in revenue**.
- Built an **Amazon S3 configuration-based experimentation platform**, enabling line-item updates to experimental ads in minutes.
- *Technologies:* Claude, Kiro, Java, Python, AWS CDK, TypeScript, Markdown

#### **Software Engineer — Full Stack Developer** | Project Kuiper (Amazon)
*Sep 2023 — Dec 2024 | Redmond, WA / Remote*
- Rebuilt Kuiper's eCommerce and Networking service strategy to enable **B2B2X sales** and self-service onboarding for any ISP.
- Created a comprehensive **localization strategy** adopted across the entire Kuiper customer experience organization.
- Mentored multiple junior developers on the team, enabling them to publish **~1 code review every 1.5 days** after 2 weeks of ramp-up.
- Served as an intern mentor, overseeing an engineering project to integrate server-side configuration for the Kuiper application.
- Designed and implemented **firmware APIs** to unblock communication between Kuiper satellite user terminals and customer client interfaces.
- *Technologies:* SwiftUI, ARKit, RealityKit, TestFlight, Rust, Java

#### **Lead Full Stack Developer / SCRUM Master** | Amazon Halo
*Nov 2021 — Sep 2023 | Seattle, WA / New York, NY*
- Integrated short-form sleep and mindfulness content into the Halo app, reaching **250+ daily active users** with average page latency **< 200 ms**.
- Delivered a critical feature moving sleep metrics in front of the app paywall to make them freely accessible to all Halo customers.
- Designed a solution to onboard all Halo domains to a unified health metrics dashboard, leveraging a backend-driven model and reducing deployment SLA from **~2 weeks to ~3 hours**.
- Led architectural redesign and refactoring of common sleep computation logic, increasing test coverage by **5%**.
- Optimized SCRUM practices to eliminate redundant rituals, saving **~8 developer hours per sprint**.
- Mentored peer engineers on full-stack architecture, testing methodologies, and design patterns.
- *Technologies:* React Native, TypeScript, Jest, Python, Java, Kotlin, Brazil, ECS, AWS CDK

<!-- pagebreak -->

#### **Backend Engineer — WebEx Calendar & Signaling** | Cisco
*Sep 2019 — Oct 2021 | San Jose, CA / Remote*
- Engineered a compliance feature to obfuscate customer signaling data in EU regions in strict alignment with **Brexit regulatory requirements**.
- Designed and implemented an automated unified test suite that eliminated code duplication across calendar providers (**Office 365, Google Calendar, WebEx**).
- Built a collaborative meeting bot integrating **WebEx with Spotify**, allowing meeting participants to queue and play music synchronously using Spotify URLs/URIs.
- *Technologies:* Java, Python, Docker, Jenkins, Akka Streams, Kafka, Maven

#### **Backend Engineer — eSIM Platform** | T-Mobile
*Jan 2018 — Aug 2019 | Bellevue, WA*
- Led development and validation of the **eSIM provisioning solution** for the Samsung Galaxy Watch nationwide commercial launch.
- Managed and maintained legacy infrastructure and CI/CD pipelines for the engineering development team.
- Designed and implemented a notification management system for real-time customer data changes, impacting all **T-Mobile.com registered customers**.
- *Technologies:* Java, Spring, Docker, SQL

---

### FEATURED PROJECTS

#### **NYC Subway Real-Time GTFS Telemetry & LED Display** (*React 19, TypeScript, Protobuf, Firebase, CircuitPython*)
- Production real-time transit tracker ingesting official **MTA GTFS-Realtime Protocol Buffers** across 496 stations.
- Decodes binary feeds in-browser with **88.8% payload compression** over raw JSON (12KB vs 140KB).
- Extended with CircuitPython firmware driving physical LED matrix panels on Adafruit MatrixPortal M4 hardware.
- *Source:* [github.com/nikhilgrover/mta-feed](https://github.com/nikhilgrover/mta-feed) | *Live:* [mta-feed.web.app](https://mta-feed.web.app)

#### **Deep Focus Mode: Physical NFC Lock for iOS** (*Swift, SwiftUI, CoreNFC, Screen Time API*)
- Built an iOS app using **CoreNFC** and Apple's **Screen Time API (ManagedSettings / FamilyControls)** to lock distraction apps upon tapping an NFC tag, requiring another physical tap to unlock.
- Provides a physical barrier against doom-scrolling with 100% on-device cryptographic verification.

---

### EDUCATION
**University of Washington** | Bachelor of Science in Electrical Engineering  
*2014 — 2017 | Seattle, WA*

---

### TECHNICAL SKILLS
- **Languages:** Java, Python, Swift, TypeScript, JavaScript, Kotlin, Rust, Go, SQL
- **Frameworks & Mobile:** SwiftUI, React Native, React 19, Tailwind CSS, CoreNFC, Screen Time API, Web Audio API
- **Cloud & DevOps:** AWS (CDK, ECS, S3, CloudFront), Docker, Firebase Hosting, Brazil, Jenkins, CI/CD, Nginx
- **Distributed & Streaming:** Kafka, Akka Streams, Protocol Buffers (GTFS-RT), Redis Streams & Pub/Sub, WebSockets
- **AI & Developer Tooling:** Claude, Kiro, Jest, JUnit, PyTest, MockK, Xcode, TestFlight, Shell / Bash
`
  },
  {
    id: 'modern-compact-resume',
    title: 'Modern Single-Page Software Engineer Resume',
    category: 'Resume & CV',
    badge: 'Popular',
    description: 'Ultra-clean single-page tech resume designed to maximize readability, ATS friendliness, and impact metrics.',
    defaultSettings: {
      pageSize: 'letter',
      margin: 'compact',
      font: 'plus-jakarta',
      fontSize: '9pt',
      lineHeight: 'tight',
      themeStyle: 'modern',
      accentColor: '#2563eb', // blue-600
      showPageNumbers: false,
      showHeader: false,
    },
    markdown: `# ALEX RIVERA
<div class="resume-contact-bar">
  <span>alex.rivera@example.com</span> •
  <span>(555) 234-5678</span> •
  <a href="https://github.com">github.com/arivera</a> •
  <a href="https://linkedin.com">linkedin.com/in/arivera</a> •
  <span>San Francisco, CA</span>
</div>

---

### TECHNICAL SKILLS
- **Languages:** Go, TypeScript, Python, Rust, SQL, Bash
- **Backend & Cloud:** Kubernetes, Docker, AWS (EKS, RDS, S3, Lambda), Terraform, Kafka, gRPC, PostgreSQL
- **Frontend & Web:** React 19, Next.js, Tailwind CSS, Vite, WebSockets
- **Observability & Tools:** Prometheus, Grafana, OpenTelemetry, Datadog, GitHub Actions, ArgoCD

---

### PROFESSIONAL EXPERIENCE

#### **Staff Infrastructure Engineer** | CloudScale Technologies
*2022 — Present | San Francisco, CA*
- Architected multi-region Kubernetes ingress gateway processing **2.4 billion requests/day** with 99.995% availability.
- Reduced annual AWS computing spend by **$420,000** through automated spot instance provisioning and Karpenter autoscaling.
- Engineered zero-downtime database migration tooling for 40TB PostgreSQL cluster with continuous CDC replication.
- Mentored 12 distributed systems engineers and authored company-wide RFC governance framework.

#### **Senior Backend Engineer** | FinPulse Networks
*2019 — 2022 | New York, NY*
- Built real-time trade settlement microservices in Go, cutting p99 execution latency from **140ms to 12ms**.
- Implemented event-sourcing ledger using Apache Kafka and CockroachDB guaranteeing strictly once transaction ordering.
- Spearheaded SOC 2 Type II audit remediation, automating cryptographic secret rotation across 200+ container nodes.

#### **Software Engineer** | DataStream Systems
*2017 — 2019 | Austin, TX*
- Developed distributed ingestion pipeline ingesting 80,000 events/second using Go worker pools and Redis Streams.
- Optimized SQL execution plans across analytical queries, delivering an average **4.5x throughput improvement**.

---

### FEATURED PROJECTS

#### **KubeFlow-Edge** | *Go, eBPF, Kubernetes, Grafana*
- Open-source lightweight eBPF network packet analyzer providing sub-millisecond connection tracing inside k8s pods.
- Starred by 1,800+ developers on GitHub; adopted in production by 3 fintech unicorns.

#### **Distributed Task Queue (Disq)** | *Rust, Tokio, Raft, Protocol Buffers*
- High-throughput Raft-replicated message queue with deterministic leader election and at-least-once delivery semantics.

---

### EDUCATION & CERTIFICATIONS
**University of California, Berkeley** — B.S. in Computer Science (*2013 — 2017*)  
**AWS Certified Solutions Architect – Professional** (*Active*)
`
  },
  {
    id: 'system-design-spec',
    title: 'High-Level System Architecture Specification (HLD)',
    category: 'Engineering & System Design',
    badge: 'Staff Spec',
    description: 'Detailed system architecture document complete with requirements, component topology, data flows, and risk matrices.',
    defaultSettings: {
      pageSize: 'letter',
      margin: 'standard',
      font: 'inter',
      fontSize: '10.5pt',
      lineHeight: 'normal',
      themeStyle: 'corporate',
      accentColor: '#0f766e', // teal-700
      showPageNumbers: true,
      showHeader: true,
      headerText: 'CONFIDENTIAL — System Architecture Specification',
    },
    markdown: `# SYSTEM DESIGN SPECIFICATION: Real-Time Telemetry & Alerting Platform
**Document Version:** 2.4.0  
**Authors:** Architecture Review Board (ARB)  
**Status:** Approved for Implementation  
**Target Delivery:** Q1 2027  

---

## 1. Executive Summary
This document specifies the target architecture for the next-generation **Real-Time Telemetry & Event Ingestion Platform**. The platform is engineered to ingest, process, and broadcast high-frequency transit and IoT telemetry across 500,000 concurrent subscribers with sub-50ms glass-to-glass latency and zero single points of failure.

---

## 2. Requirements & Service Level Objectives (SLOs)

### 2.1 Functional Requirements
1. **Multi-Protocol Ingestion:** Support inbound HTTP/2, WebSocket binary frames, and GTFS-Realtime Protocol Buffers.
2. **Stateful Session Sharding:** Route subscribers to affinity-keyed gateway workers based on line/route identifier.
3. **Wayside Buffering:** Retain rolling 60-second in-memory windows for instant replay during client reconnection.

### 2.2 Non-Functional Requirements & SLOs
| Metric | Objective | Enforcement Mechanism |
| :--- | :--- | :--- |
| **Ingestion Latency (p99)** | < 35 ms | Ring buffer serialization in C++/Rust |
| **Broadcast Fanout (p99)** | < 50 ms | Epoll-driven WebSocket cluster with Redis 7 Streams |
| **Payload Compression** | > 80% vs JSON | Protocol Buffers (proto3) wire encoding |
| **Uptime SLA** | 99.99% | Multi-AZ Kubernetes with PodDisruptionBudgets |

---

## 3. High-Level Component Topology

\`\`\`
  [Edge Clients: Web / iOS / Hardware Displays]
                         │
           (TLS Termination & WebSocket Upgrade)
                         ▼
             [Edge Ingress CDN / Envoy Proxy]
                         │
    ┌────────────────────┴────────────────────┐
    ▼                                         ▼
[Gateway Node A]                       [Gateway Node B]
    │                                         │
    └─────────────────┬───────────────────────┘
                      ▼
         [Redis 7 Cluster / Streams]
            (Consumer Group Fanout)
                      │
    ┌─────────────────┼───────────────────────┐
    ▼                 ▼                       ▼
[Worker: Decoder]  [Worker: Alert Rules]  [Worker: Cold Storage]
\`\`\`

<!-- pagebreak -->

## 4. Data Model & Wire Protocol

The wire contract utilizes Protocol Buffers for bandwidth efficiency and zero-copy deserialization:

\`\`\`protobuf
syntax = "proto3";
package transit.telemetry.v1;

message VehiclePositionUpdate {
  string vehicle_id = 1;
  string route_id = 2;
  int64 timestamp_utc_ms = 3;
  double latitude = 4;
  double longitude = 5;
  float bearing_degrees = 6;
  int32 speed_kmh = 7;
  OccupancyStatus occupancy = 8;
}

enum OccupancyStatus {
  UNKNOWN = 0;
  EMPTY = 1;
  MANY_SEATS_AVAILABLE = 2;
  FEW_SEATS_AVAILABLE = 3;
  STANDING_ROOM_ONLY = 4;
  FULL = 5;
}
\`\`\`

---

## 5. Failure Modes & Graceful Degradation

> **Architectural Invariant:** An origin failure or transit sensor outage MUST NEVER cause gateway crashes or consumer stall cascades.

1. **Backpressure Propagation:** When client socket send buffers exceed 256KB, the connection is paused via TCP flow control; if unacknowledged after 5 seconds, the socket is dropped with status code \`4429\`.
2. **Stale Cache Fallback:** If upstream GTFS feeds fail to refresh within 45 seconds, the system serves cached entries flagged with \`is_stale: true\` and amber visual indicator.
3. **Partition Tolerance:** In the event of an inter-region network split, each local cluster operates autonomously in read-only degraded mode.

---

## 6. Verification & Sign-Off
- [x] Security Review (TLS 1.3, Rate-limiting, HMAC payload tokens)
- [x] Load Testing (50,000 synthetic WebSocket clients sustained for 4 hours)
- [x] Failover Validation (Chaos Monkey AZ termination test passed)
`
  },
  {
    id: 'engineering-rfc',
    title: 'Request for Comments (RFC): Technical Proposal',
    category: 'Proposals & RFCs',
    badge: 'RFC Template',
    description: 'Formal technical proposal standard used by high-performing engineering organizations to align on architectural decisions.',
    defaultSettings: {
      pageSize: 'letter',
      margin: 'standard',
      font: 'merriweather',
      fontSize: '10pt',
      lineHeight: 'normal',
      themeStyle: 'academic',
      accentColor: '#4f46e5', // indigo-600
      showPageNumbers: true,
      showHeader: true,
      headerText: 'RFC-0089: Zero-Copy Binary Serialization Migration',
    },
    markdown: `# RFC-0089: Migration from JSON REST to Protocol Buffers for Edge Ingestion
**Status:** In Review  
**Author:** Nikhil Grover (Technical Lead)  
**Stakeholders:** Core Platform, Edge Gateway, Mobile Client Teams  
**Target Deployment:** Sprint 42  

---

### Abstract
This RFC proposes replacing JSON-based payloads with Protocol Buffers (proto3) across all edge telemetry feeds. By switching serialization formats, we forecast an **88% reduction in network payload volume**, a **4.2x speedup in client-side deserialization**, and strict compile-time type safety across client platforms (Web, iOS, and Embedded IoT).

---

### 1. Problem Statement
Our current transit telemetry endpoint transmits JSON payloads averaging 140KB per request every 15 seconds to ~10,000 concurrent clients:
- **Bandwidth Overhead:** 1.4 GB/sec egress traffic costing ~$9,200/month on AWS CloudFront.
- **Client Parsing Jitter:** JSON.parse() on low-powered mobile devices introduces 18–35ms main thread locks during frame decoding.
- **Schema Drift:** Lack of strict wire schemas has caused 3 production incidents over the last quarter due to unexpected null fields.

---

### 2. Proposed Architecture

\`\`\`
[Upstream GTFS API] ──> [Proto Generator Service] ──> [CloudFront CDN] ──> [Client: In-Browser Decoder]
                                                             │
                                                (Direct Binary Blob)
\`\`\`

#### Comparative Benchmarks (10,000 Sample Records)
| Serialization Format | Payload Size | Serialization Time | Deserialization Time | Memory Footprint |
| :--- | :--- | :--- | :--- | :--- |
| **JSON (gzip)** | 38.4 KB | 12.8 ms | 18.2 ms | 3.8 MB |
| **MessagePack** | 22.1 KB | 8.4 ms | 7.9 ms | 2.1 MB |
| **Protocol Buffers** | **12.4 KB** | **3.1 ms** | **4.2 ms** | **0.9 MB** |

---

### 3. Migration Plan & Phases
1. **Phase 1 (Week 1–2):** Publish proto schemas and generate TypeScript, Swift, and Java client SDK packages.
2. **Phase 2 (Week 3–4):** Deploy dual-format edge endpoints supporting \`Accept: application/x-protobuf\` with fallback to \`application/json\`.
3. **Phase 3 (Week 5–6):** Roll out binary decoding to 10% of web clients; monitor CPU and crash metrics.
4. **Phase 4 (Week 7):** Complete cutover and deprecate legacy JSON endpoint.

---

### 4. Alternatives Considered
- **Cap'n Proto / FlatBuffers:** Outstanding zero-allocation read performance, but lacking native browser TypeScript bindings maturity compared to \`protobuf.js\`.
- **Zstandard Compression over JSON:** Decreases wire size, but increases client decompressive CPU burn on mobile devices.
`
  },
  {
    id: 'clean-article-doc',
    title: 'Clean Technical Article & Whitepaper',
    category: 'Documentation',
    badge: 'Minimalist',
    description: 'Elegant layout with classical typography, perfect for essays, documentation, blog posts, and whitepapers.',
    defaultSettings: {
      pageSize: 'letter',
      margin: 'spacious',
      font: 'lora',
      fontSize: '11pt',
      lineHeight: 'relaxed',
      themeStyle: 'minimal',
      accentColor: '#18181b', // zinc-900
      showPageNumbers: true,
      showHeader: false,
    },
    markdown: `# The Art of Resilient Systems: Backpressure, Circuit Breakers, and Graceful Degradation
*By Nikhil Grover — October 2026*

---

> "Everything fails, all the time." — Werner Vogels

In the era of microservices and real-time distributed streaming, building software that operates flawlessly under happy paths is trivial. The true measure of senior engineering craftsmanship lies in how a system behaves when everything goes wrong: when network links flap, third-party APIs crawl, memory saturates, and database connection pools exhaust.

### The Illusion of Infinite Capacity

Every distributed system contains hidden queues. If you do not explicitly bound your queues, the operating system and runtimes will do it for you—typically by running out of memory and crashing via the Linux OOM killer.

Consider a simple WebSocket broadcast node fanout:
1. Producer pushes events at 1,000 msg/sec.
2. A single mobile subscriber on a 3G subway link can only acknowledge at 50 msg/sec.
3. Without backpressure, 950 messages per second accumulate in that subscriber's outbound buffer.
4. Within 2 minutes, 114,000 pending objects consume 200MB of heap. Multiply this by 10 slow clients, and the entire cluster node crashes.

### Three Rules of Production Resilience

#### 1. Bounded Buffers Everywhere
Never instantiate an unbounded channel, ring buffer, or thread pool. If an internal buffer fills:
- **Drop Oldest:** In real-time telemetry (such as train arrivals), older predictions are worthless anyway.
- **Fail Fast:** Immediately respond to upstream callers with \`HTTP 429 Too Many Requests\` or \`HTTP 503 Service Unavailable\`.

#### 2. The Token Bucket Rate Limiter
A token bucket algorithm guarantees both sustained throughput caps and controlled burst allowances. Rather than relying on simple sliding windows that reset abruptly, token buckets allow smooth debiting and deterministic replenishment.

#### 3. Client-Side Clock Skew Tolerance
Never trust timestamps supplied by external clients or sensors. Always anchor causality in monotonic timers (\`clock_gettime(CLOCK_MONOTONIC)\`) or Lamport timestamps.
`
  }
];
