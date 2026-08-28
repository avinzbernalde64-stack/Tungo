/* ================================================================
   TUNGO — NDMC Campus Wayfinding & Facility Locator
   Based on the official NDMC Campus Directory Map
   Notre Dame of Midsayap College — The First Notre Dame in Asia
   Founded: June 13, 1951 · Quezon Avenue, Midsayap, Cotabato
   ================================================================ */

// ============================================================
//  CAMPUS MAP DEFINITION
// ============================================================
var BLDS = {
  K: { x: 80, y: 40, w: 200, h: 130, fill: '#1B5E20', stroke: '#2E8B3E', code: 'K', name: 'Robert S. Sullivan Building', sub: 'Admin · Registrar · Accounting · Dean · President · HR', type: 'admin' },
  L: { x: 320, y: 40, w: 240, h: 130, fill: '#1B5E20', stroke: '#2E8B3E', code: 'L', name: 'College Building', sub: 'Rooms 101–108 (1F) · Rooms 201–208 (2F) · Faculty', type: 'academic' },
  I: { x: 600, y: 40, w: 160, h: 110, fill: '#14532D', stroke: '#4CAF50', code: 'I', name: 'Library', sub: 'General Ref. · Periodicals · Theses · Online DB', type: 'academic' },
  J: { x: 800, y: 40, w: 140, h: 120, fill: '#1A3A1E', stroke: '#8B5CF6', code: 'J', name: 'Notre Dame Chapel', sub: 'Daily Mass: 7AM & 12NN · Prayer · Reflection', type: 'spiritual', cross: true },
  M: { x: 980, y: 40, w: 140, h: 120, fill: '#1B5E20', stroke: '#2E8B3E', code: 'M', name: 'High School Building', sub: 'HS Rooms 1–6 (1F) · HS Rooms 7–12 (2F)', type: 'academic' },
  G: { x: 80, y: 240, w: 130, h: 110, fill: '#14532D', stroke: '#4CAF50', code: 'G', name: 'Science Laboratories', sub: 'Physics · Chemistry · Biology', type: 'lab' },
  H: { x: 240, y: 240, w: 160, h: 110, fill: '#1A2E22', stroke: '#38BDF8', code: 'H', name: 'Computer Laboratories', sub: 'CompLab 1 · CompLab 2 · CompLab 3 · IT Office', type: 'lab' },
  N: { x: 440, y: 240, w: 150, h: 100, fill: '#14532D', stroke: '#4CAF50', code: 'N', name: 'Elementary Building', sub: 'Grade School Rooms · GS Faculty', type: 'academic' },
  O: { x: 630, y: 230, w: 200, h: 130, fill: '#1A2A1A', stroke: '#F97316', code: 'O', name: 'Gymnasium', sub: 'Basketball · Volleyball · Stage · PE', type: 'sports', court: true },
  P: { x: 870, y: 250, w: 160, h: 100, fill: '#1A2A1A', stroke: '#EC4899', code: 'P', name: 'Auditorium', sub: 'Programs & Events · Capacity: 500', type: 'sports' },
  F: { x: 980, y: 210, w: 140, h: 130, fill: '#2A2218', stroke: '#DABB6A', code: 'F', name: 'Home Economics Room', sub: 'HE Kitchen · Sewing · Food Tech', type: 'lab' },
  A: { x: 80, y: 440, w: 120, h: 90, fill: '#2A1F0E', stroke: '#D97706', code: 'A', name: 'Carpentry Shop', sub: 'Woodworking Tools · Project Area', type: 'shop' },
  B: { x: 230, y: 440, w: 120, h: 90, fill: '#2A1F0E', stroke: '#D97706', code: 'B', name: 'Auto Mechanics Shop', sub: 'Vehicle Repair Bays · Tools', type: 'shop' },
  C: { x: 380, y: 440, w: 110, h: 90, fill: '#2A1F0E', stroke: '#D97706', code: 'C', name: 'Electrical Shop', sub: 'Wiring · Motor Control · Appliances', type: 'shop' },
  D: { x: 522, y: 440, w: 110, h: 90, fill: '#2A1F0E', stroke: '#D97706', code: 'D', name: 'Drafting Room', sub: 'Drawing Tables · Blueprints', type: 'lab' },
  E: { x: 664, y: 440, w: 130, h: 90, fill: '#2A2218', stroke: '#DABB6A', code: 'E', name: 'Food Technology Lab', sub: 'Cooking Stations · Baking Equipment', type: 'lab' },
  canteen: { x: 830, y: 420, w: 140, h: 80, fill: '#2A2218', stroke: '#DABB6A', code: '—', name: 'Canteen', sub: 'Food Stalls · Snacks · Beverages', type: 'facility' },
  clinic: { x: 440, y: 380, w: 130, h: 50, fill: '#2A1A1A', stroke: '#EF4444', code: '—', name: 'Clinic', sub: 'Medical Services · First Aid', type: 'facility' },
  guidance: { x: 600, y: 380, w: 140, h: 50, fill: '#1A2E22', stroke: '#81C784', code: '—', name: 'Guidance & Testing Center', sub: 'Counseling · Testing · Career Guidance', type: 'admin' },
  powerhouse: { x: 1080, y: 440, w: 80, h: 80, fill: '#1A1A1A', stroke: '#6B7280', code: '—', name: 'Powerhouse', sub: 'Generator · Electrical Distribution', type: 'service' },
  guardhouse: { x: 520, y: 620, w: 80, h: 50, fill: '#1B5E20', stroke: '#4CAF50', code: '—', name: 'Guard House', sub: 'Campus Security · Visitor Log', type: 'service' },
  supply: { x: 1080, y: 240, w: 80, h: 70, fill: '#1B5E20', stroke: '#4CAF50', code: '—', name: 'Supply Office', sub: 'Materials · Equipment · Inventory', type: 'service' },
  printing: { x: 1080, y: 340, w: 80, h: 70, fill: '#1B5E20', stroke: '#4CAF50', code: '—', name: 'Printing Press', sub: 'Publications · Reproduction', type: 'service' }
};

var BCENTERS = {};
Object.keys(BLDS).forEach(function (k) { var b = BLDS[k]; BCENTERS[k] = { x: b.x + b.w / 2, y: b.y + b.h / 2 }; });
BCENTERS.maingate = { x: 560, y: 700 };
BCENTERS.field = { x: 170, y: 560 };
BCENTERS.parking = { x: 160, y: 670 };

var LEGEND = [
  { c: '#2E8B3E', l: 'Academic / Admin' }, { c: '#4CAF50', l: 'Science / Elementary' },
  { c: '#38BDF8', l: 'Computer Labs' }, { c: '#8B5CF6', l: 'Chapel / Guidance' },
  { c: '#F97316', l: 'Gym / Auditorium' }, { c: '#D97706', l: 'Workshops (A–E)' },
  { c: '#DABB6A', l: 'Canteen / HE / Food Tech' }, { c: '#EF4444', l: 'Clinic' },
  { c: '#6B7280', l: 'Service Facilities' }
];

// ============================================================
//  DATABASE
// ============================================================
var DB = [
  { id:1, name:"Registrar's Office", cat:"Office", bld:"Robert S. Sullivan Building", floor:"1st Floor", room:"101", dept:"Registrar", hrs:"8:00 AM - 5:00 PM", desc:"Handles student enrollment, transcripts of records, credentials, honorable dismissal, and other academic documents.", bk:"K", featured:true },
  { id:2, name:"Accounting Office", cat:"Office", bld:"Robert S. Sullivan Building", floor:"1st Floor", room:"102", dept:"Finance", hrs:"8:00 AM - 5:00 PM", desc:"Processes tuition and fee payments, issues official receipts, and manages student financial accounts.", bk:"K" },
  { id:3, name:"Dean of College Office", cat:"Office", bld:"Robert S. Sullivan Building", floor:"2nd Floor", room:"201", dept:"College Dean", hrs:"8:00 AM - 5:00 PM", desc:"Office of the College Dean. Handles academic concerns, curriculum matters, and student disciplinary cases.", bk:"K" },
  { id:4, name:"President's Office", cat:"Office", bld:"Robert S. Sullivan Building", floor:"2nd Floor", room:"202", dept:"Administration", hrs:"8:00 AM - 5:00 PM", desc:"The executive office of the NDMC President. Handles institutional planning, external relations, and school administration.", bk:"K" },
  { id:5, name:"HR Office", cat:"Office", bld:"Robert S. Sullivan Building", floor:"1st Floor", room:"103", dept:"Human Resources", hrs:"8:00 AM - 5:00 PM", desc:"Handles faculty and staff recruitment, benefits, payroll, and personnel records.", bk:"K" },
  { id:6, name:"Cashier", cat:"Office", bld:"Robert S. Sullivan Building", floor:"1st Floor", room:"104", dept:"Finance", hrs:"8:00 AM - 4:00 PM", desc:"Accepts payments for tuition, fees, and other school charges.", bk:"K" },
  { id:10, name:"Room 101", cat:"Classroom", bld:"College Building", floor:"1st Floor", room:"101", dept:"Arts & Sciences", hrs:"7:00 AM - 8:00 PM", desc:"Standard lecture classroom, first floor. Seats 40 students.", bk:"L" },
  { id:11, name:"Room 102", cat:"Classroom", bld:"College Building", floor:"1st Floor", room:"102", dept:"Arts & Sciences", hrs:"7:00 AM - 8:00 PM", desc:"First floor lecture room for English and Filipino general education classes.", bk:"L" },
  { id:12, name:"Room 103", cat:"Classroom", bld:"College Building", floor:"1st Floor", room:"103", dept:"Education", hrs:"7:00 AM - 8:00 PM", desc:"Used by the College of Education for major subjects and teaching demonstrations.", bk:"L" },
  { id:13, name:"Room 104", cat:"Classroom", bld:"College Building", floor:"1st Floor", room:"104", dept:"Business Administration", hrs:"7:00 AM - 8:00 PM", desc:"Assigned for Business Administration and Accountancy lecture classes.", bk:"L" },
  { id:14, name:"Room 105", cat:"Classroom", bld:"College Building", floor:"1st Floor", room:"105", dept:"Computer Science", hrs:"7:00 AM - 8:00 PM", desc:"Theory classes for CS/IT when computer labs are occupied.", bk:"L" },
  { id:15, name:"Room 201", cat:"Classroom", bld:"College Building", floor:"2nd Floor", room:"201", dept:"Arts & Sciences", hrs:"7:00 AM - 8:00 PM", desc:"Second floor room for Mathematics and Social Science classes.", bk:"L" },
  { id:16, name:"Room 202", cat:"Classroom", bld:"College Building", floor:"2nd Floor", room:"202", dept:"Computer Science", hrs:"7:00 AM - 8:00 PM", desc:"Theory room for CS and IT major subjects.", bk:"L" },
  { id:17, name:"Room 203", cat:"Classroom", bld:"College Building", floor:"2nd Floor", room:"203", dept:"Education", hrs:"7:00 AM - 8:00 PM", desc:"Second floor room for Education seminars and portfolio defenses.", bk:"L" },
  { id:18, name:"College Faculty Room", cat:"Facility", bld:"College Building", floor:"2nd Floor", room:"205", dept:"Faculty", hrs:"7:00 AM - 8:00 PM", desc:"Faculty office and lounge for college instructors. Consultation hours posted here.", bk:"L" },
  { id:20, name:"NDMC Library", cat:"Facility", bld:"Library", floor:"1st & 2nd Floor", room:"Ground", dept:"Library Services", hrs:"7:30 AM - 7:00 PM", desc:"Main campus library with general reference, periodicals, theses, Filipiniana section, and online database access.", bk:"I", featured:true },
  { id:21, name:"Notre Dame Chapel", cat:"Facility", bld:"Notre Dame Chapel", floor:"Ground Floor", room:"Main", dept:"Campus Ministry", hrs:"6:00 AM - 6:00 PM", desc:"The spiritual heart of NDMC. Daily Mass at 7:00 AM and 12:00 NN. Used for weddings, baptisms, and religious celebrations.", bk:"J", featured:true },
  { id:25, name:"HS Room 1", cat:"Classroom", bld:"High School Building", floor:"1st Floor", room:"HS-1", dept:"High School", hrs:"7:30 AM - 4:30 PM", desc:"Grade 7 homeroom classroom.", bk:"M" },
  { id:26, name:"HS Room 2", cat:"Classroom", bld:"High School Building", floor:"1st Floor", room:"HS-2", dept:"High School", hrs:"7:30 AM - 4:30 PM", desc:"Grade 8 homeroom classroom.", bk:"M" },
  { id:27, name:"HS Room 3", cat:"Classroom", bld:"High School Building", floor:"1st Floor", room:"HS-3", dept:"High School", hrs:"7:30 AM - 4:30 PM", desc:"Grade 9 homeroom classroom.", bk:"M" },
  { id:28, name:"HS Room 4", cat:"Classroom", bld:"High School Building", floor:"1st Floor", room:"HS-4", dept:"High School", hrs:"7:30 AM - 4:30 PM", desc:"Grade 10 homeroom classroom.", bk:"M" },
  { id:29, name:"HS Room 7", cat:"Classroom", bld:"High School Building", floor:"2nd Floor", room:"HS-7", dept:"High School", hrs:"7:30 AM - 4:30 PM", desc:"Grade 11 (Senior High) — STEM strand.", bk:"M" },
  { id:30, name:"HS Room 8", cat:"Classroom", bld:"High School Building", floor:"2nd Floor", room:"HS-8", dept:"High School", hrs:"7:30 AM - 4:30 PM", desc:"Grade 12 (Senior High) — ABM & HUMSS strands.", bk:"M" },
  { id:31, name:"HS Faculty Room", cat:"Facility", bld:"High School Building", floor:"1st Floor", room:"FR-HS", dept:"High School Faculty", hrs:"7:00 AM - 4:30 PM", desc:"Workspace for high school teachers. Parent-teacher conferences held here.", bk:"M" },
  { id:35, name:"Physics Laboratory", cat:"Laboratory", bld:"Science Laboratories", floor:"1st Floor", room:"SLab-1", dept:"Sciences", hrs:"8:00 AM - 5:00 PM", desc:"Equipped with mechanics, optics, and electricity apparatus for physics lab classes.", bk:"G", featured:true },
  { id:36, name:"Chemistry Laboratory", cat:"Laboratory", bld:"Science Laboratories", floor:"1st Floor", room:"SLab-2", dept:"Sciences", hrs:"8:00 AM - 5:00 PM", desc:"Fume hoods, reagent shelves, and lab stations for chemistry experiments.", bk:"G" },
  { id:37, name:"Biology Laboratory", cat:"Laboratory", bld:"Science Laboratories", floor:"2nd Floor", room:"SLab-3", dept:"Sciences", hrs:"8:00 AM - 5:00 PM", desc:"Microscopes, specimen collections, and dissecting kits for biology lab work.", bk:"G" },
  { id:40, name:"Computer Laboratory 1", cat:"Laboratory", bld:"Computer Laboratories", floor:"1st Floor", room:"CL-1", dept:"Information Technology", hrs:"8:00 AM - 8:00 PM", desc:"Main lab with 40 workstations for programming and IT classes.", bk:"H", featured:true },
  { id:41, name:"Computer Laboratory 2", cat:"Laboratory", bld:"Computer Laboratories", floor:"1st Floor", room:"CL-2", dept:"Information Technology", hrs:"8:00 AM - 8:00 PM", desc:"Second lab with 35 workstations for computer literacy training.", bk:"H" },
  { id:42, name:"Computer Laboratory 3", cat:"Laboratory", bld:"Computer Laboratories", floor:"2nd Floor", room:"CL-3", dept:"Information Technology", hrs:"8:00 AM - 8:00 PM", desc:"Advanced lab for networking, database management, and capstone projects.", bk:"H" },
  { id:43, name:"IT Office", cat:"Office", bld:"Computer Laboratories", floor:"2nd Floor", room:"CL-201", dept:"Information Technology", hrs:"8:00 AM - 5:00 PM", desc:"Manages IT infrastructure, network systems, and campus technical support.", bk:"H" },
  { id:45, name:"GS Room 1", cat:"Classroom", bld:"Elementary Building", floor:"1st Floor", room:"GS-1", dept:"Elementary", hrs:"7:30 AM - 4:00 PM", desc:"Grade 1 classroom.", bk:"N" },
  { id:46, name:"GS Room 2", cat:"Classroom", bld:"Elementary Building", floor:"1st Floor", room:"GS-2", dept:"Elementary", hrs:"7:30 AM - 4:00 PM", desc:"Grade 2 classroom.", bk:"N" },
  { id:47, name:"GS Room 3", cat:"Classroom", bld:"Elementary Building", floor:"1st Floor", room:"GS-3", dept:"Elementary", hrs:"7:30 AM - 4:00 PM", desc:"Grade 3 classroom.", bk:"N" },
  { id:48, name:"GS Faculty Room", cat:"Facility", bld:"Elementary Building", floor:"1st Floor", room:"FR-GS", dept:"Elementary Faculty", hrs:"7:00 AM - 4:00 PM", desc:"Faculty office for grade school teachers.", bk:"N" },
  { id:50, name:"NDMC Gymnasium", cat:"Facility", bld:"Gymnasium", floor:"Ground Floor", room:"Main Hall", dept:"Physical Education", hrs:"7:00 AM - 8:00 PM", desc:"Indoor gym with basketball court, volleyball, badminton, and a stage. Hosts PE classes and intramurals.", bk:"O" },
  { id:52, name:"Auditorium", cat:"Facility", bld:"Auditorium", floor:"Ground Floor", room:"Main Hall", dept:"Events", hrs:"8:00 AM - 8:00 PM", desc:"500-seat auditorium with full sound system. Used for graduations, concerts, and conferences.", bk:"P" },
  { id:55, name:"Carpentry Shop", cat:"Laboratory", bld:"Carpentry Shop", floor:"Ground Floor", room:"Shop-A", dept:"Technology & Livelihood", hrs:"8:00 AM - 5:00 PM", desc:"Woodworking tools and project area for TLE carpentry classes.", bk:"A" },
  { id:56, name:"Auto Mechanics Shop", cat:"Laboratory", bld:"Auto Mechanics Shop", floor:"Ground Floor", room:"Shop-B", dept:"Technology & Livelihood", hrs:"8:00 AM - 5:00 PM", desc:"Vehicle repair bays with tools for automotive technology training.", bk:"B" },
  { id:57, name:"Electrical Shop", cat:"Laboratory", bld:"Electrical Shop", floor:"Ground Floor", room:"Shop-C", dept:"Technology & Livelihood", hrs:"8:00 AM - 5:00 PM", desc:"Wiring panels and motor control stations for electrical technology classes.", bk:"C" },
  { id:58, name:"Drafting Room", cat:"Laboratory", bld:"Drafting Room", floor:"Ground Floor", room:"Shop-D", dept:"Technology & Livelihood", hrs:"8:00 AM - 5:00 PM", desc:"Drawing tables and blueprint storage for technical drawing classes.", bk:"D" },
  { id:59, name:"Food Technology Lab", cat:"Laboratory", bld:"Food Technology Lab", floor:"Ground Floor", room:"Shop-E", dept:"Technology & Livelihood", hrs:"8:00 AM - 5:00 PM", desc:"Cooking stations and baking equipment for food technology classes.", bk:"E" },
  { id:60, name:"Home Economics Room", cat:"Laboratory", bld:"Home Economics Room", floor:"Ground Floor", room:"HE-1", dept:"Technology & Livelihood", hrs:"8:00 AM - 5:00 PM", desc:"HE kitchen, sewing machines, and instructional area for home economics.", bk:"F" },
  { id:62, name:"Canteen", cat:"Facility", bld:"Canteen", floor:"Ground Floor", room:"Main", dept:"Food Services", hrs:"7:00 AM - 6:00 PM", desc:"Campus food court with multiple stalls offering affordable meals and snacks.", bk:"canteen" },
  { id:63, name:"Clinic", cat:"Facility", bld:"Clinic", floor:"Ground Floor", room:"Main", dept:"Health Services", hrs:"7:30 AM - 5:00 PM", desc:"Campus health clinic providing first aid, consultations, and medicine dispensing.", bk:"clinic" },
  { id:64, name:"Guidance and Testing Center", cat:"Office", bld:"Guidance & Testing Center", floor:"Ground Floor", room:"GTC-1", dept:"Student Affairs", hrs:"8:00 AM - 5:00 PM", desc:"Counseling services, psychological testing, career guidance, and student development programs.", bk:"guidance", featured:true },
  { id:65, name:"Powerhouse", cat:"Facility", bld:"Powerhouse", floor:"Ground Floor", room:"N/A", dept:"General Services", hrs:"24/7", desc:"Houses generator sets and electrical distribution panels for campus power.", bk:"powerhouse" },
  { id:66, name:"Guard House", cat:"Facility", bld:"Guard House", floor:"Ground Floor", room:"N/A", dept:"Security", hrs:"24/7", desc:"Campus security at the main entrance. Visitor logging and safety monitoring.", bk:"guardhouse" },
  { id:67, name:"Supply Office", cat:"Facility", bld:"Supply Office", floor:"Ground Floor", room:"N/A", dept:"General Services", hrs:"8:00 AM - 5:00 PM", desc:"Manages school supplies, equipment inventory, and material distribution.", bk:"supply" },
  { id:68, name:"Printing Press", cat:"Facility", bld:"Printing Press", floor:"Ground Floor", room:"N/A", dept:"Administration", hrs:"8:00 AM - 5:00 PM", desc:"School publication printing and document reproduction services.", bk:"printing" },
  { id:69, name:"Open Field / Sports Ground", cat:"Facility", bld:"Open Area", floor:"Ground", room:"N/A", dept:"Physical Education", hrs:"6:00 AM - 6:00 PM", desc:"Open sports field for outdoor PE, football, track and field, and school events.", bk:"field" },
  { id:70, name:"Parking Area", cat:"Facility", bld:"Open Area", floor:"Ground", room:"N/A", dept:"General Services", hrs:"6:00 AM - 8:00 PM", desc:"Designated parking along Quezon Avenue for students, faculty, and visitors.", bk:"parking" }
];

var NX = 71, sFilter = 'All', aFilter = 'All', delId = null, selBk = null;
DB.forEach(function (d) { var c = BCENTERS[d.bk]; d.mx = c ? c.x : 560; d.my = c ? c.y : 400; });

// ============================================================
//  UTILITIES
// ============================================================
function catIcon(c) { return { Office:'fa-building-columns', Classroom:'fa-chalkboard-user', Laboratory:'fa-flask', Facility:'fa-landmark' }[c]||'fa-map-pin'; }
function catColor(c) { return { Office:'#DABB6A', Classroom:'#4CAF50', Laboratory:'#81C784', Facility:'#F97316' }[c]||'#8BA3C0'; }

function toast(msg, type) {
  var t = document.getElementById('toast'), ic = { ok:'fa-check-circle', err:'fa-exclamation-circle', inf:'fa-info-circle' };
  t.className = 'toast toast-'+(type||'inf')+' on';
  t.innerHTML = '<i class="fas '+(ic[type]||ic.inf)+'"></i>'+msg;
  setTimeout(function(){ t.classList.remove('on'); }, 3000);
}
function animN(id, target) {
  var el = document.getElementById(id); if(!el) return;
  var cur=0, step=Math.max(1,Math.floor(target/22));
  var iv=setInterval(function(){ cur+=step; if(cur>=target){cur=target;clearInterval(iv)} el.textContent=cur; },28);
}

// ============================================================
//  SVG MAP BUILDER
// ============================================================
function buildSVG(uid, interactive) {
  var s = '<defs>';
  s += '<pattern id="gp'+uid+'" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="#0B1E12"/><circle cx="5" cy="5" r=".5" fill="#14301A" opacity=".5"/><circle cx="15" cy="15" r=".5" fill="#14301A" opacity=".5"/></pattern>';
  s += '<filter id="gl'+uid+'"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
  s += '<linearGradient id="pg'+uid+'" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#C9A84C"/><stop offset="100%" stop-color="#DABB6A"/></linearGradient>';
  s += '</defs>';
  s += '<rect width="1200" height="800" fill="url(#gp'+uid+')"/>';
  s += '<rect x="20" y="20" width="1160" height="760" rx="14" fill="none" stroke="rgba(46,139,62,0.1)" stroke-width="1.5" stroke-dasharray="6 4"/>';
  // Quezon Avenue
  s += '<rect x="20" y="590" width="1160" height="50" rx="4" fill="#1A2744" opacity=".65"/>';
  s += '<line x1="20" y1="615" x2="1180" y2="615" stroke="rgba(201,168,76,0.12)" stroke-width="1.5" stroke-dasharray="12 8"/>';
  s += '<text x="1100" y="619" text-anchor="middle" fill="rgba(201,168,76,0.3)" font-size="11" font-weight="700" font-family="DM Sans" letter-spacing="2">QUEZON AVENUE</text>';
  // North Damas Avenue
  s += '<rect x="1140" y="20" width="40" height="760" rx="4" fill="#1A2744" opacity=".55"/>';
  s += '<line x1="1160" y1="20" x2="1160" y2="780" stroke="rgba(201,168,76,0.1)" stroke-width="1" stroke-dasharray="10 8"/>';
  s += '<text x="1160" y="760" text-anchor="middle" fill="rgba(201,168,76,0.25)" font-size="8" font-weight="700" font-family="DM Sans" letter-spacing="1" transform="rotate(-90,1160,760)">NORTH DAMAS AVE</text>';
  // Internal paths
  s += '<rect x="60" y="370" width="1080" height="28" rx="3" fill="#16203A" opacity=".45"/>';
  s += '<rect x="295" y="30" width="18" height="340" rx="3" fill="#16203A" opacity=".35"/>';
  s += '<rect x="295" y="398" width="18" height="192" rx="3" fill="#16203A" opacity=".35"/>';
  s += '<rect x="580" y="30" width="18" height="340" rx="3" fill="#16203A" opacity=".35"/>';
  s += '<rect x="580" y="398" width="18" height="192" rx="3" fill="#16203A" opacity=".35"/>';
  s += '<rect x="960" y="30" width="18" height="340" rx="3" fill="#16203A" opacity=".35"/>';
  s += '<rect x="960" y="398" width="18" height="192" rx="3" fill="#16203A" opacity=".35"/>';
  s += '<rect x="190" y="398" width="16" height="192" rx="3" fill="#16203A" opacity=".3"/>';
  s += '<rect x="350" y="398" width="16" height="192" rx="3" fill="#16203A" opacity=".3"/>';
  s += '<rect x="500" y="398" width="16" height="192" rx="3" fill="#16203A" opacity=".3"/>';
  s += '<rect x="650" y="398" width="16" height="192" rx="3" fill="#16203A" opacity=".3"/>';
  s += '<rect x="810" y="398" width="16" height="192" rx="3" fill="#16203A" opacity=".3"/>';
  // Main gate
  s += '<rect x="520" y="635" width="80" height="20" rx="4" fill="#C9A84C" opacity=".18"/>';
  s += '<text x="560" y="672" text-anchor="middle" fill="#C9A84C" font-size="10" font-weight="700" font-family="DM Sans">MAIN GATE</text>';
  s += '<polygon points="548,640 572,640 560,630" fill="#C9A84C" opacity=".3"/>';
  // Buildings
  Object.keys(BLDS).forEach(function(k){
    var b=BLDS[k], cls=interactive?' class="map-building" data-bk="'+k+'" onclick="pickBk(\''+k+'\')"':'';
    s+='<g'+cls+'><rect x="'+b.x+'" y="'+b.y+'" width="'+b.w+'" height="'+b.h+'" rx="7" fill="'+b.fill+'" stroke="'+b.stroke+'" stroke-width="1.5"/>';
    s+='<rect x="'+(b.x+4)+'" y="'+(b.y+4)+'" width="'+(b.w-8)+'" height="18" rx="3" fill="'+b.stroke+'" opacity=".1"/>';
    if(b.code&&b.code!=='—'){s+='<rect x="'+(b.x+6)+'" y="'+(b.y+6)+'" width="18" height="14" rx="3" fill="'+b.stroke+'" opacity=".22"/>';s+='<text x="'+(b.x+15)+'" y="'+(b.y+16)+'" text-anchor="middle" fill="'+b.stroke+'" font-size="8" font-weight="800" font-family="DM Sans">'+b.code+'</text>';}
    var nx=b.code&&b.code!=='—'?b.x+30:b.x+b.w/2, na=b.code&&b.code!=='—'?'start':'middle', ns=b.w<120?'6.5':'7.5';
    s+='<text x="'+nx+'" y="'+(b.y+17)+'" text-anchor="'+na+'" fill="'+b.stroke+'" font-size="'+ns+'" font-weight="700" font-family="DM Sans">'+b.name+'</text>';
    var lines=b.sub.split(' · ');for(var i=0;i<lines.length&&i<3;i++)s+='<text x="'+(b.x+b.w/2)+'" y="'+(b.y+33+i*11)+'" text-anchor="middle" fill="'+b.stroke+'" font-size="6.5" opacity=".45" font-family="DM Sans">'+lines[i]+'</text>';
    if(b.cross){s+='<line x1="'+(b.x+b.w/2)+'" y1="'+(b.y-14)+'" x2="'+(b.x+b.w/2)+'" y2="'+(b.y+2)+'" stroke="#C9A84C" stroke-width="1.5"/>';s+='<line x1="'+(b.x+b.w/2-8)+'" y1="'+(b.y-5)+'" x2="'+(b.x+b.w/2+8)+'" y2="'+(b.y-5)+'" stroke="#C9A84C" stroke-width="1"/>';s+='<polygon points="'+(b.x+b.w/2)+','+(b.y-16)+' '+(b.x+b.w/2-10)+','+(b.y+2)+' '+(b.x+b.w/2+10)+','+(b.y+2)+'" fill="'+b.fill+'" stroke="'+b.stroke+'" stroke-width="1"/>';}
    if(b.court){s+='<rect x="'+(b.x+15)+'" y="'+(b.y+35)+'" width="'+(b.w-30)+'" height="'+(b.h-50)+'" rx="4" fill="none" stroke="'+b.stroke+'" opacity=".15" stroke-width="1"/>';s+='<circle cx="'+(b.x+b.w/2)+'" cy="'+(b.y+b.h/2+6)+'" r="22" fill="none" stroke="'+b.stroke+'" opacity=".15" stroke-width="1"/>';}
    if(b.type==='academic'||b.type==='admin'){var wy=b.y+b.h-18;for(var wx=b.x+12;wx<b.x+b.w-12;wx+=20)s+='<rect x="'+wx+'" y="'+wy+'" width="11" height="11" rx="1.5" fill="'+b.stroke+'" opacity=".1"/>';}
    if(b.type==='lab'){for(var li=0;li<3;li++)s+='<circle cx="'+(b.x+25+li*30)+'" cy="'+(b.y+b.h-16)+'" r="5" fill="'+b.stroke+'" opacity=".15" stroke="'+b.stroke+'" stroke-width=".5"/>';}
    if(b.type==='shop'){s+='<rect x="'+(b.x+b.w/2-20)+'" y="'+(b.y+b.h-22)+'" width="16" height="12" rx="2" fill="'+b.stroke+'" opacity=".12"/>';s+='<rect x="'+(b.x+b.w/2+4)+'" y="'+(b.y+b.h-22)+'" width="16" height="12" rx="2" fill="'+b.stroke+'" opacity=".12"/>';}
    s+='</g>';
  });
  // Parking
  s+='<rect x="60" y="645" width="200" height="55" rx="7" fill="rgba(26,39,68,0.35)" stroke="rgba(46,139,62,0.1)" stroke-width="1" stroke-dasharray="4 3"/>';
  s+='<text x="160" y="675" text-anchor="middle" fill="rgba(139,184,232,0.25)" font-size="8" font-family="DM Sans">PARKING AREA</text>';
  // Field
  s+='<rect x="80" y="540" width="180" height="38" rx="6" fill="rgba(34,197,94,0.04)" stroke="rgba(34,197,94,0.1)" stroke-width="1"/>';
  s+='<text x="170" y="562" text-anchor="middle" fill="rgba(34,197,94,0.25)" font-size="7" font-family="DM Sans">OPEN FIELD / SPORTS GROUND</text>';
  // Garden
  s+='<ellipse cx="430" cy="340" rx="48" ry="20" fill="rgba(34,197,94,0.04)" stroke="rgba(34,197,94,0.1)" stroke-width="1" stroke-dasharray="4 3"/>';
  s+='<text x="430" y="338" text-anchor="middle" fill="rgba(34,197,94,0.3)" font-size="7" font-family="DM Sans">NDMC</text>';
  s+='<text x="430" y="349" text-anchor="middle" fill="rgba(34,197,94,0.3)" font-size="7" font-family="DM Sans">GARDEN</text>';
  // Trees
  [[40,200],[40,385],[270,200],[270,385],[555,200],[555,385],[935,200],[935,385],[40,530],[270,530],[555,530],[810,530],[935,530],[1120,530]].forEach(function(t){s+='<circle cx="'+t[0]+'" cy="'+t[1]+'" r="6" fill="rgba(34,197,94,0.08)"/>';});
  // Nav overlay
  if(interactive){
    s+='<g id="navPathG" style="display:none"><path id="navPathL" class="map-path" fill="none" stroke="url(#pg'+uid+')" stroke-width="3" stroke-linecap="round" filter="url(#gl'+uid+')"/></g>';
    s+='<g id="startMk" style="display:none"><circle r="10" fill="rgba(76,175,80,0.3)" stroke="#4CAF50" stroke-width="2"><animate attributeName="r" values="8;13;8" dur="2s" repeatCount="indefinite"/></circle><circle r="4" fill="#4CAF50"/></g>';
    s+='<g id="endMk" style="display:none"><circle r="10" fill="rgba(201,168,76,0.3)" stroke="#C9A84C" stroke-width="2"><animate attributeName="r" values="8;13;8" dur="2s" repeatCount="indefinite"/></circle><circle r="4" fill="#C9A84C"/></g>';
  }
  return s;
}

// ============================================================
//  PAGE NAVIGATION
// ============================================================
function go(p){
  document.querySelectorAll('.page').forEach(function(el){el.classList.remove('active')});
  var pg=document.getElementById('pg-'+p);if(pg)pg.classList.add('active');
  document.querySelectorAll('.nav-link').forEach(function(l){l.classList.toggle('active',l.dataset.p===p)});
  window.scrollTo(0,0);
  if(p==='home')initHome();
  if(p==='search'){doSearch();var si=document.getElementById('sInput');if(si)si.focus();}
  if(p==='map'){renderFullMap();buildLegend();}
  if(p==='admin')renderTbl();
}
function toggleMob(){document.getElementById('mobDrawer').classList.toggle('open')}

// ============================================================
//  HOME
// ============================================================
function initHome(){
  var cats={Office:0,Classroom:0,Laboratory:0,Facility:0},blds=[],depts=[];
  DB.forEach(function(d){cats[d.cat]++;if(blds.indexOf(d.bld)===-1)blds.push(d.bld);if(depts.indexOf(d.dept)===-1)depts.push(d.dept)});
  document.getElementById('hc-off').textContent=cats.Office+' locations';
  document.getElementById('hc-cl').textContent=cats.Classroom+' locations';
  document.getElementById('hc-lab').textContent=cats.Laboratory+' locations';
  document.getElementById('hc-fac').textContent=cats.Facility+' locations';
  animN('st-all',DB.length);animN('st-bld',blds.length);animN('st-dept',depts.length);
  // Featured
  var feat=DB.filter(function(d){return d.featured});
  document.getElementById('featuredScroll').innerHTML=feat.map(function(d){
    var c=catColor(d.cat),ic=catIcon(d.cat),code=(BLDS[d.bk]||{}).code||'';
    return '<div class="card clickable p-5" onclick="showDet('+d.id+')"><div class="flex items-center gap-3 mb-3"><div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:'+c+'12;border:1px solid '+c+'25"><i class="fas '+ic+'" style="color:'+c+'"></i></div><div class="min-w-0"><div class="font-semibold text-sm truncate">'+d.name+'</div><div class="text-[11px] text-ndmc-300/40">'+(code?'['+code+'] ':'')+d.bld+'</div></div></div><p class="text-xs text-ndmc-300/40 line-clamp-2 leading-relaxed mb-3">'+d.desc+'</p><div class="flex items-center gap-2 text-[11px] text-gold-500 font-semibold">View Details <i class="fas fa-arrow-right text-[9px]"></i></div></div>';
  }).join('');
  document.getElementById('homeMap').innerHTML=buildSVG('home',false);
}
function heroGo(){var q=document.getElementById('heroSearch').value.trim();if(!q){toast('Please enter a search term','err');return}document.getElementById('sInput').value=q;go('search')}
function goSearch(cat){go('search');setTimeout(function(){setSF(cat)},80)}

// ============================================================
//  SEARCH
// ============================================================
function setSF(c){
  sFilter=c;document.querySelectorAll('.sf-btn').forEach(function(b){var on=b.dataset.c===c;b.classList.toggle('active',on);b.style.background=on?'rgba(201,168,76,0.12)':'';b.style.borderColor=on?'#C9A84C':'';b.style.color=on?'#DABB6A':''});doSearch();
}
function doSearch(){
  var q=(document.getElementById('sInput')||{}).value||'';q=q.toLowerCase().trim();var r=DB;
  if(sFilter!=='All')r=r.filter(function(d){return d.cat===sFilter});
  if(q)r=r.filter(function(d){return d.name.toLowerCase().indexOf(q)!==-1||d.bld.toLowerCase().indexOf(q)!==-1||d.dept.toLowerCase().indexOf(q)!==-1||d.room.toLowerCase().indexOf(q)!==-1||d.desc.toLowerCase().indexOf(q)!==-1||(BLDS[d.bk]||{}).code.toLowerCase().indexOf(q)!==-1});
  var box=document.getElementById('sResults'),emp=document.getElementById('sEmpty'),cnt=document.getElementById('sCount');
  if(!r.length){box.innerHTML='';emp.classList.remove('hidden');cnt.textContent='No results found';return}
  emp.classList.add('hidden');cnt.textContent='Showing '+r.length+' location'+(r.length>1?'s':'');
  box.innerHTML=r.map(function(d){
    var c=catColor(d.cat),ic=catIcon(d.cat),code=(BLDS[d.bk]||{}).code||'';
    return '<div class="card clickable p-4" onclick="showDet('+d.id+')"><div class="flex items-center gap-3"><div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style="background:'+c+'12;border:1px solid '+c+'25"><i class="fas '+ic+'" style="color:'+c+'"></i></div><div class="flex-1 min-w-0"><div class="flex items-center gap-2 mb-0.5 flex-wrap"><span class="font-semibold text-sm truncate">'+d.name+'</span>'+(code?'<span class="tag" style="background:rgba(201,168,76,0.1);color:#DABB6A;border:1px solid rgba(201,168,76,0.2);font-size:10px;font-weight:700">'+code+'</span>':'')+'<span class="tag" style="background:'+c+'12;color:'+c+';border:1px solid '+c+'20;font-size:10px">'+d.cat+'</span></div><div class="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-ndmc-300/40"><span><i class="fas fa-building mr-1"></i>'+d.bld+'</span><span><i class="fas fa-layer-group mr-1"></i>'+d.floor+'</span><span><i class="fas fa-door-open mr-1"></i>'+d.room+'</span></div></div><i class="fas fa-chevron-right text-ndmc-700 text-xs flex-shrink-0"></i></div></div>';
  }).join('');
}

// ============================================================
//  DETAILS
// ============================================================
function showDet(id){
  var d=DB.find(function(l){return l.id===id});if(!d)return;
  document.getElementById('dCrumb').textContent=d.name;
  var c=catColor(d.cat),ic=catIcon(d.cat),code=(BLDS[d.bk]||{}).code||'';
  var related=DB.filter(function(r){return r.bld===d.bld&&r.id!==d.id}).slice(0,5);
  document.getElementById('dBody').innerHTML=
    '<div class="card p-6 sm:p-8 mb-5" style="cursor:default"><div class="flex items-start gap-4 mb-6"><div class="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style="background:'+c+'12;border:1.5px solid '+c+'35"><i class="'+ic+' text-xl" style="color:'+c+'"></i></div><div><div class="flex items-center gap-2 flex-wrap mb-0.5"><h2 class="font-display text-xl sm:text-2xl font-bold">'+d.name+'</h2>'+(code?'<span class="tag" style="background:rgba(201,168,76,0.1);color:#DABB6A;border:1px solid rgba(201,168,76,0.25);font-weight:700">Code: '+code+'</span>':'')+'<span class="tag" style="background:'+c+'12;color:'+c+';border:1px solid '+c+'25">'+d.cat+'</span></div><p class="text-ndmc-300/40 text-sm">'+d.bld+'</p></div></div><div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">'+tile('Building',d.bld)+tile('Floor',d.floor)+tile('Room',d.room)+tile('Department',d.dept)+'</div><div class="flex items-center gap-3 p-3.5 rounded-xl mb-5" style="background:rgba(201,168,76,0.04);border:1px solid rgba(201,168,76,0.1)"><i class="fas fa-clock text-gold-500"></i><div><div class="text-[10px] text-ndmc-300/40 uppercase tracking-wider font-semibold">Office Hours</div><div class="font-semibold text-sm text-gold-400">'+d.hrs+'</div></div></div><div class="mb-6"><h3 class="text-[10px] uppercase tracking-wider text-ndmc-300/40 font-bold mb-2">Description</h3><p class="text-sm text-ndmc-200/70 leading-relaxed">'+d.desc+'</p></div><div class="flex flex-wrap gap-2"><button class="btn-gold" onclick="startNav('+d.id+')"><i class="fas fa-route"></i>Get Directions</button><button class="btn-ghost" onclick="viewOnMap('+d.id+')"><i class="fas fa-map"></i>View on Map</button></div></div>'+
    '<div class="card p-4 mb-5" style="cursor:default"><h3 class="font-semibold text-sm mb-3 flex items-center gap-2"><i class="fas fa-map-location-dot text-gold-500 text-xs"></i>Location on Campus Map</h3><div class="map-wrap p-2" style="max-height:280px"><svg viewBox="0 0 1200 800" class="w-full h-auto">'+buildSVG('det',false)+'<circle cx="'+d.mx+'" cy="'+d.my+'" r="22" fill="rgba(201,168,76,0.12)" stroke="#C9A84C" stroke-width="2"><animate attributeName="r" values="18;26;18" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;.4;1" dur="2s" repeatCount="indefinite"/></circle><circle cx="'+d.mx+'" cy="'+d.my+'" r="6" fill="#C9A84C"/><circle cx="'+d.mx+'" cy="'+d.my+'" r="2.5" fill="#061A0B"/><text x="'+d.mx+'" y="'+(d.my-16)+'" text-anchor="middle" fill="#C9A84C" font-size="9" font-weight="700" font-family="DM Sans">'+d.name+'</text></svg></div></div>'+
    (related.length?'<div class="card p-5" style="cursor:default"><h3 class="font-semibold text-sm mb-3 flex items-center gap-2"><i class="fas fa-layer-group text-ndmc-300 text-xs"></i>Other Locations in '+d.bld+'</h3><div class="grid gap-2">'+related.map(function(r){var rc=catColor(r.cat),ri=catIcon(r.cat);return '<div class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-ndmc-700/20 transition-colors cursor-pointer" onclick="showDet('+r.id+')"><div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background:'+rc+'10"><i class="fas '+ri+' text-xs" style="color:'+rc+'"></i></div><div class="flex-1 min-w-0"><div class="text-sm font-medium truncate">'+r.name+'</div><div class="text-[11px] text-ndmc-300/40">'+r.floor+' · Room '+r.room+'</div></div><i class="fas fa-chevron-right text-ndmc-700 text-[10px]"></i></div>'}).join('')+'</div></div>':'');
  go('details');
}
function tile(l,v){return '<div class="info-tile"><div class="label">'+l+'</div><div class="value">'+v+'</div></div>'}

// ============================================================
//  MAP PAGE
// ============================================================
function renderFullMap(){document.getElementById('fullMap').innerHTML=buildSVG('full',true)}
function buildLegend(){document.getElementById('mapLegend').innerHTML=LEGEND.map(function(l){return '<div class="flex items-center gap-1.5"><div class="legend-dot" style="background:'+l.c+'"></div><span class="text-ndmc-300/45">'+l.l+'</span></div>'}).join('')}
function pickBk(bk){
  document.querySelectorAll('.map-building').forEach(function(b){b.classList.remove('selected')});
  var el=document.querySelector('.map-building[data-bk="'+bk+'"]');if(el)el.classList.add('selected');
  selBk=bk;var locs=DB.filter(function(d){return d.bk===bk}),bInfo=BLDS[bk],bName=locs.length?locs[0].bld:(bInfo?bInfo.name:bk);
  document.getElementById('mapBadge').classList.remove('hidden');document.getElementById('mapBadgeTxt').textContent=bName;
  var panel=document.getElementById('mapPanel');panel.classList.remove('hidden');
  var stroke=bInfo?bInfo.stroke:'#4CAF50';
  document.getElementById('mpIcon').style.cssText='background:'+stroke+'12;border:1px solid '+stroke+'25';
  document.getElementById('mpIcon').innerHTML='<i class="fas fa-building text-lg" style="color:'+stroke+'"></i>';
  document.getElementById('mpName').textContent=bName;
  document.getElementById('mpCode').textContent=bInfo&&bInfo.code!=='—'?'Code: '+bInfo.code:'';
  document.getElementById('mpCode').style.display=bInfo&&bInfo.code!=='—'?'':'none';
  document.getElementById('mpDesc').textContent=(bInfo?bInfo.sub:'').replace(/ · /g,' · ');
  var tags=[];if(bInfo&&bInfo.code!=='—')tags.push('Code '+bInfo.code);tags.push(locs.length+' location'+(locs.length>1?'s':''));
  document.getElementById('mpTags').innerHTML=tags.map(function(t){return '<span class="tag text-ndmc-300/50 border border-ndmc-600/20 bg-ndmc-700/15 text-[10px]">'+t+'</span>'}).join('');
  var btn=document.getElementById('mpBtn'),dirBtn=document.getElementById('mpDirBtn');
  if(locs.length===1){btn.textContent='View Details';btn.onclick=function(){showDet(locs[0].id)};dirBtn.style.display='';dirBtn.onclick=function(){startNav(locs[0].id)}}
  else{btn.innerHTML='View All '+locs.length+' Locations <i class="fas fa-arrow-right text-[10px]"></i>';btn.onclick=function(){document.getElementById('sInput').value='';setSF('All');go('search');setTimeout(function(){document.getElementById('sInput').value=bName;doSearch()},50)};dirBtn.style.display='none'}
}
function clearSel(){selBk=null;document.querySelectorAll('.map-building').forEach(function(b){b.classList.remove('selected')});document.getElementById('mapBadge').classList.add('hidden');document.getElementById('mapPanel').classList.add('hidden');var np=document.getElementById('navPathG');if(np)np.style.display='none';var sm=document.getElementById('startMk');if(sm)sm.style.display='none';var em=document.getElementById('endMk');if(em)em.style.display='none';hideTip()}
document.addEventListener('mousemove',function(e){var bld=e.target.closest('.map-building');if(!bld||!document.getElementById('pg-map').classList.contains('active')){hideTip();return}var bk=bld.dataset.bk,locs=DB.filter(function(d){return d.bk===bk});if(!locs.length){hideTip();return}var bInfo=BLDS[bk],tip=document.getElementById('mapTip'),cs=bInfo&&bInfo.code!=='—'?' ['+bInfo.code+']':'';tip.innerHTML='<strong style="color:var(--fg)">'+locs[0].bld+cs+'</strong><br><span style="color:var(--muted);font-size:11px">'+locs.length+' location'+(locs.length>1?'s':'')+' · Click to select</span>';var wrap=document.getElementById('mapWrap'),wr=wrap.getBoundingClientRect(),px=e.clientX-wr.left+14,py=e.clientY-wr.top-8;tip.style.left=px+'px';tip.style.top=py+'px';tip.classList.add('on');setTimeout(function(){var tr=tip.getBoundingClientRect();if(tr.right>wr.right-8)tip.style.left=(px-tr.width-28)+'px'},10)});
function hideTip(){document.getElementById('mapTip').classList.remove('on')}
function viewOnMap(id){var d=DB.find(function(l){return l.id===id});if(!d)return;go('map');setTimeout(function(){clearSel();if(BLDS[d.bk])pickBk(d.bk);drawPath('maingate',d.bk);var em=document.getElementById('endMk');em.style.display='block';em.setAttribute('transform','translate('+d.mx+','+d.my+')')},150)}
function drawPath(from,to){var s=BCENTERS[from]||BCENTERS.maingate,e=BCENTERS[to];if(!e)return;var midY=385,d;if(s.y<=midY&&e.y<=midY)d='M'+s.x+','+s.y+' L'+s.x+','+(midY-18)+' L'+e.x+','+(midY-18)+' L'+e.x+','+e.y;else if(s.y>midY&&e.y>midY)d='M'+s.x+','+s.y+' L'+s.x+','+(midY+18)+' L'+e.x+','+(midY+18)+' L'+e.x+','+e.y;else d='M'+s.x+','+s.y+' L'+s.x+','+midY+' L'+e.x+','+midY+' L'+e.x+','+e.y;document.getElementById('navPathL').setAttribute('d',d);document.getElementById('navPathG').style.display='block';var sm=document.getElementById('startMk');sm.style.display='block';sm.setAttribute('transform','translate('+s.x+','+s.y+')');var em=document.getElementById('endMk');em.style.display='block';em.setAttribute('transform','translate('+e.x+','+e.y+')')}

// ============================================================
//  NAVIGATION PAGE
// ============================================================
function startNav(id){
  var d=DB.find(function(l){return l.id===id});if(!d)return;var ec=BCENTERS[d.bk]||{x:d.mx,y:d.my},sc=BCENTERS.maingate,steps=genSteps(sc,ec,d);
  document.getElementById('navBody').innerHTML='<div class="card p-5 mb-5" style="cursor:default"><div class="flex items-center gap-3 mb-4"><div class="w-10 h-10 rounded-xl bg-ndmc-500/15 flex items-center justify-center"><i class="fas fa-location-dot text-gold-500"></i></div><div><div class="text-[10px] text-ndmc-300/40 uppercase tracking-wider font-semibold">Destination</div><div class="font-bold">'+d.name+'</div></div></div><div class="grid grid-cols-2 sm:grid-cols-4 gap-2">'+badge('fa-building',d.bld)+badge('fa-layer-group',d.floor)+badge('fa-door-open','Room '+d.room)+badge('fa-clock',d.hrs)+'</div></div><div class="card p-5 mb-5" style="cursor:default"><h3 class="font-semibold text-sm mb-5 flex items-center gap-2"><i class="fas fa-list-ol text-gold-500 text-xs"></i>Walking Directions from Main Gate</h3><div>'+steps.map(function(st,i){return '<div class="step-row"><div class="step-num">'+(i+1)+'</div><div class="step-line"></div><div class="pt-0.5"><p class="font-medium text-sm">'+st.t+'</p><p class="text-[11px] text-ndmc-300/40 mt-0.5">'+st.d+'</p></div></div>'}).join('')+'</div></div><div class="flex flex-wrap gap-2"><button class="btn-gold" onclick="viewOnMap('+d.id+')"><i class="fas fa-map"></i>View on Map</button><button class="btn-ghost" onclick="showDet('+d.id+')"><i class="fas fa-arrow-left"></i>Back to Details</button></div>';
  go('nav');
}
function badge(ic,txt){return '<div class="info-tile flex items-center gap-2"><i class="fas '+ic+' text-gold-500 text-xs"></i><span class="text-xs">'+txt+'</span></div>'}
function genSteps(s,e,d){var st=[];st.push({t:'Enter through the NDMC Main Gate on Quezon Avenue',d:'The main entrance is along Quezon Avenue. Proceed to campus grounds.'});if(e.y<385){if(e.x<500){st.push({t:'Walk west along Quezon Avenue, then turn north',d:'Head toward the left side of campus.'})}else if(e.x>800){st.push({t:'Walk east along Quezon Avenue, then turn north',d:'Head toward the right side past internal paths.'})}else{st.push({t:'Walk straight north from the gate along the central path',d:'Head toward the upper campus area.'})}st.push({t:'Cross the internal pathway and continue north',d:'Walk toward the upper campus buildings.'})}else{if(e.x<500){st.push({t:'Walk west along Quezon Avenue toward the workshop area',d:'The shops are on the lower left side.'})}else if(e.x>800){st.push({t:'Walk east along Quezon Avenue toward facilities',d:'Canteen and other facilities on the lower right.'})}else{st.push({t:'Walk south from the gate area along the internal path',d:'Head toward the lower campus facilities.'})}}st.push({t:'Approach the '+d.bld,d:'Look for the building signage and entrance.'});if(d.floor!=='Ground'&&d.floor!=='Ground Floor'&&d.floor!=='Ground')st.push({t:'Go to the '+d.floor,d:'Use the stairs or elevator.'});st.push({t:'Locate Room '+d.room,d:d.name+' — '+d.dept});return st}

// ============================================================
//  ADMIN
// ============================================================
function setAF(c){aFilter=c;document.querySelectorAll('.af-btn').forEach(function(b){var on=b.dataset.c===c;b.classList.toggle('active',on);b.style.background=on?'rgba(201,168,76,0.12)':'';b.style.borderColor=on?'#C9A84C':'';b.style.color=on?'#DABB6A':''});renderTbl()}
function renderTbl(){var q=(document.getElementById('aInput')||{}).value||'';q=q.toLowerCase().trim();var r=DB;if(aFilter!=='All')r=r.filter(function(d){return d.cat===aFilter});if(q)r=r.filter(function(d){return d.name.toLowerCase().indexOf(q)!==-1||d.bld.toLowerCase().indexOf(q)!==-1||d.dept.toLowerCase().indexOf(q)!==-1});var tb=document.getElementById('aBody');if(!r.length){tb.innerHTML='<tr><td colspan="7" class="text-center py-14 text-ndmc-300/30 text-sm">No locations found</td></tr>';return}tb.innerHTML=r.map(function(d){var c=catColor(d.cat),code=(BLDS[d.bk]||{}).code||'—';return '<tr><td class="font-medium text-xs">'+d.name+'</td><td><span class="tag" style="background:rgba(201,168,76,0.1);color:#DABB6A;border:1px solid rgba(201,168,76,0.2);font-size:10px;font-weight:700">'+code+'</span></td><td><span class="tag" style="background:'+c+'12;color:'+c+';font-size:10px">'+d.cat+'</span></td><td class="text-ndmc-300/50 text-xs">'+d.bld+'</td><td class="text-ndmc-300/50 text-xs">'+d.floor+'</td><td class="text-ndmc-300/50 text-xs">'+d.room+'</td><td><div class="flex gap-1"><button class="btn-icon" style="width:28px;height:28px" onclick="openEdit('+d.id+')" title="Edit"><i class="fas fa-pen" style="font-size:9px"></i></button><button class="btn-icon" style="width:28px;height:28px" onclick="openDel('+d.id+')" title="Delete"><i class="fas fa-trash" style="font-size:9px"></i></button></div></td></tr>'}).join('')}
function populateCodeSel(){var sel=document.getElementById('fCode');sel.innerHTML='<option value="none">— None —</option>';Object.keys(BLDS).forEach(function(k){var b=BLDS[k];sel.innerHTML+='<option value="'+k+'">'+(b.code!=='—'?'['+b.code+'] ':'')+b.name+'</option>'})}
function openAdd(){document.getElementById('fmTitle').textContent='Add New Location';document.getElementById('fId').value='';document.getElementById('locForm').reset();document.getElementById('formModal').classList.add('on')}
function openEdit(id){var d=DB.find(function(l){return l.id===id});if(!d)return;document.getElementById('fmTitle').textContent='Edit Location';document.getElementById('fId').value=d.id;document.getElementById('fName').value=d.name;document.getElementById('fCat').value=d.cat;document.getElementById('fCode').value=d.bk;document.getElementById('fFloor').value=d.floor;document.getElementById('fRoom').value=d.room;document.getElementById('fDept').value=d.dept;document.getElementById('fHrs').value=d.hrs;document.getElementById('fDesc').value=d.desc;document.getElementById('formModal').classList.add('on')}
function closeForm(){document.getElementById('formModal').classList.remove('on')}
function saveLoc(e){e.preventDefault();var id=document.getElementById('fId').value,codeKey=document.getElementById('fCode').value,data={name:document.getElementById('fName').value.trim(),cat:document.getElementById('fCat').value,bld:codeKey!=='none'?BLDS[codeKey].name:'Open Area',floor:document.getElementById('fFloor').value.trim()||'Ground Floor',room:document.getElementById('fRoom').value.trim()||'N/A',dept:document.getElementById('fDept').value.trim()||'N/A',hrs:document.getElementById('fHrs').value.trim()||'8:00 AM - 5:00 PM',desc:document.getElementById('fDesc').value.trim()||'No description.',bk:codeKey!=='none'?codeKey:'field'};var ctr=BCENTERS[data.bk]||{x:560,y:400};data.mx=ctr.x;data.my=ctr.y;if(id){var idx=DB.findIndex(function(l){return l.id===parseInt(id)});if(idx!==-1){data.id=parseInt(id);DB[idx]=data;toast('Location updated','ok')}}else{data.id=NX++;DB.push(data);toast('Location added','ok')}closeForm();renderTbl()}
function openDel(id){delId=id;var d=DB.find(function(l){return l.id===id});if(d){document.getElementById('delName').textContent=d.name;document.getElementById('delModal').classList.add('on')}}
function closeDel(){document.getElementById('delModal').classList.remove('on');delId=null}
function doDel(){if(delId!==null){DB=DB.filter(function(l){return l.id!==delId});toast('Location deleted','ok');closeDel();renderTbl()}}

// ============================================================
//  INIT
// ============================================================
document.addEventListener('DOMContentLoaded', function () {

    // Render NDMC logo into all logo containers
    var logoContainers = ['navLogo', 'heroLogo', 'mobLogo'];

    logoContainers.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) {
            el.innerHTML = '<img src="image/ndmc-logo.png" alt="NDMC Seal" class="ndmc-logo" onerror="this.parentElement.innerHTML=\'<div style=display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:#DABB6A;font-weight:800;font-size:11px;background:rgba(201,168,76,0.08)>NDMC<\/div>\'">';
        }
    });

    populateCodeSel();
    initHome();

    window.addEventListener('scroll', function () {
        document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
    });

    document.getElementById('formModal').addEventListener('click', function (e) {
        if (e.target === this) closeForm();
    });

    document.getElementById('delModal').addEventListener('click', function (e) {
        if (e.target === this) closeDel();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeForm();
            closeDel();
        }
    });

});