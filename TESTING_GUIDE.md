# 🧪 TESTING GUIDE - Resilient Web

## 🎯 Complete Testing Checklist

### **Pre-Test Setup**
```bash
# Ensure dev server is running
cd d:\projects\codefusion\resilient-web
npm run dev

# Open browser
http://localhost:3001
```

---

## ✅ **TEST SUITE 1: Core Functionality**

### **1.1 Citizen SOS Submission**
- [ ] Navigate to `/`
- [ ] Click "Press SOS" button (should pulse)
- [ ] Fill in emergency details
- [ ] Check location is auto-detected
- [ ] Submit SOS
- [ ] **Expected:** SOS added to feed below
- [ ] **Expected:** Haptic vibration (on mobile)

### **1.2 Offline Mode Testing**
- [ ] Open DevTools (F12) → Network tab
- [ ] Set to "Offline" mode
- [ ] Submit new SOS
- [ ] **Expected:** "Offline Mode" badge appears
- [ ] **Expected:** SOS saved locally
- [ ] Go back online
- [ ] **Expected:** Auto-sync notification

### **1.3 Multi-Language**
- [ ] Click language toggle (EN/TE)
- [ ] **Expected:** UI text changes
- [ ] Submit SOS in Telugu
- [ ] **Expected:** Saves correctly

---

## ✅ **TEST SUITE 2: Volunteer Dashboard**

### **2.1 Mission List**
- [ ] Login as Volunteer
- [ ] Navigate to `/volunteer`
- [ ] **Expected:** See SOS requests from Test 1
- [ ] **Expected:** Sorted by severity (Critical → Low)
- [ ] Click "+ Test SOS" to generate demo
- [ ] **Expected:** New SOS appears instantly

### **2.2 Response Flow**
- [ ] Click "Respond" on any SOS
- [ ] **Expected:** Button changes to "En Route"
- [ ] **Expected:** Status updates in database
- [ ] Check main page feed
- [ ] **Expected:** Status reflects "assigned"

### **2.3 Map View**
- [ ] Click "Map View" tab
- [ ] **Expected:** Leaflet map loads
- [ ] **Expected:** SOS markers visible
- [ ] Click a marker
- [ ] **Expected:** Popup with details

---

## ✅ **TEST SUITE 3: NGO Logistics**

### **3.1 Inventory Management**
- [ ] Login as NGO
- [ ] Navigate to `/ngo`
- [ ] Click "Inventory" tab
- [ ] Click "+ Generate Demo Inventory"
- [ ] **Expected:** Items appear (medical, food, water)
- [ ] Check "Low Stock" indicators (red/yellow)
- [ ] **Expected:** Alerts for items below threshold

### **3.2 Dispatch Coordination**
- [ ] Click "Dispatch" tab
- [ ] **Expected:** See all active SOS
- [ ] Filter by type (medical/fire/flood)
- [ ] **Expected:** List updates

### **3.3 Beneficiary Registration**
- [ ] Click "Beneficiaries" tab
- [ ] Click "+ Generate Demo Beneficiaries"
- [ ] **Expected:** People appear with statuses
- [ ] Check verification statuses (verified/pending/aid-received)

---

## ✅ **TEST SUITE 4: Authority Command Center**

### **4.1 Command Dashboard**
- [ ] Login as Authority
- [ ] Navigate to `/authority`
- [ ] **Expected:** See real-time stats
- [ ] Check: Total Alerts, Critical, Pending, Resolved
- [ ] **Expected:** Numbers match actual data

### **4.2 Crisis Map**
- [ ] Click "Crisis Map" tab
- [ ] **Expected:** Multi-layer map
- [ ] Toggle layers (SOS, Shelters, Beneficiaries)
- [ ] **Expected:** Markers appear/disappear

### **4.3 Audit Trail**
- [ ] Click "Audit Trail" tab
- [ ] **Expected:** Complete timeline of all SOS
- [ ] Click "Export Log" button
- [ ] **Expected:** CSV file downloads
- [ ] Check CSV contains: timestamp, type, severity, status

### **4.4 Impact Reports**
- [ ] Click "Impact Reports" tab
- [ ] Check statistics display
- [ ] Click "Generate PDF Report"
- [ ] **Expected:** Print dialog opens
- [ ] **Expected:** Formatted report with charts

---

## ✅ **TEST SUITE 5: Shelter Locator**

### **5.1 Shelter List**
- [ ] Navigate to `/shelters`
- [ ] **Expected:** 5 shelters visible
- [ ] Check capacity bars (green/yellow/red)
- [ ] **Expected:** Color based on occupancy %

### **5.2 Filter & Navigation**
- [ ] Click "Available Now" filter
- [ ] **Expected:** Only available shelters shown
- [ ] Click "Navigate" on any shelter
- [ ] **Expected:** Google Maps opens with directions
- [ ] Click phone number
- [ ] **Expected:** Dialer opens (on mobile)

---

## ✅ **TEST SUITE 6: AI Chatbot**

### **6.1 Chat Interaction**
- [ ] Click purple chatbot button (bottom-right)
- [ ] Type "Help!"
- [ ] **Expected:** Response with emergency options
- [ ] Ask "Find shelter"
- [ ] **Expected:** Shows nearest shelters from database
- [ ] Ask "Medical emergency steps"
- [ ] **Expected:** CPR instructions

### **6.2 Quick Actions**
- [ ] Click quick action buttons
- [ ] **Expected:** Relevant responses
- [ ] Check shelter recommendations use real data

---

## ✅ **TEST SUITE 7: Advanced Features**

### **7.1 Accessibility Panel**
- [ ] Look for eye icon (bottom-right, above chatbot)
- [ ] Click to open Accessibility Panel
- [ ] Change theme to "High Contrast"
- [ ] **Expected:** Colors change immediately
- [ ] Change font size to "Large"
- [ ] **Expected:** Text scales up
- [ ] Toggle "Reduce Motion"
- [ ] **Expected:** Animations stop
- [ ] Refresh page
- [ ] **Expected:** Settings persist

### **7.2 System Status**
- [ ] Look for battery/network indicators (top-right)
- [ ] Check battery percentage displays
- [ ] Check online/offline status
- [ ] If battery < 50%, check for "Enable Saver" button
- [ ] **Expected:** Battery saver mode available

### **7.3 Voice SOS (if supported)**
- [ ] On main page, look for "Voice Emergency Report" button
- [ ] Click and allow microphone access
- [ ] Speak: "Medical emergency, chest pain"
- [ ] Click "Stop Recording"
- [ ] **Expected:** Text appears in details field
- [ ] **Expected:** Type auto-set to "medical"
- [ ] **Expected:** Severity auto-set based on keywords

---

## 🐛 **KNOWN ISSUES TO CHECK**

### **Issue 1: IndexedDB "shelters not found"**
**When:** First app load  
**Fix:**
1. Open DevTools (F12)
2. Application → IndexedDB
3. Delete `resilient-web-db`
4. Refresh page

**Expected:** Database recreates with shelters

### **Issue 2: Location not detected**
**When:** GPS unavailable  
**Fix:**
1. Click location badge
2. Enable "Manual Location Mode"
3. Enter coordinates manually

**Expected:** Manual entry works

### **Issue 3: Service Worker caching**
**When:** Code changes not reflecting  
**Fix:**
1. DevTools → Application → Service Workers
2. Click "Unregister"
3. Hard refresh (Ctrl+Shift+R)

---

## 📊 **Performance Tests**

### **P.1 Load Time**
- [ ] Clear cache
- [ ] Load `/` page
- [ ] Open DevTools → Network
- [ ] **Expected:** First load < 2s
- [ ] **Expected:** Subsequent loads < 500ms (cached)

### **P.2 Offline Performance**
- [ ] Go offline
- [ ] Navigate between pages
- [ ] **Expected:** All pages load instantly
- [ ] Submit data
- [ ] **Expected:** No errors, queued locally

### **P.3 Large Dataset**
- [ ] Generate 50+ SOS requests
- [ ] Check volunteer list renders
- [ ] **Expected:** Smooth scrolling
- [ ] Check map with 50+ markers
- [ ] **Expected:** No lag

---

## 🔐 **Security Tests**

### **S.1 Role-Based Access**
- [ ] Login as Citizen
- [ ] Try accessing `/authority` directly
- [ ] **Expected:** Redirect to login
- [ ] Login as Volunteer
- [ ] Try accessing `/ngo`
- [ ] **Expected:** Redirect to login

### **S.2 Data Privacy**
- [ ] Check localStorage/IndexedDB
- [ ] **Expected:** No passwords stored
- [ ] **Expected:** Only necessary data persists

---

## 📱 **Mobile Responsiveness**

### **M.1 Layout**
- [ ] Open DevTools → Toggle device toolbar
- [ ] Test on iPhone SE (375px)
- [ ] **Expected:** UI readable, no horizontal scroll
- [ ] Test on iPad (768px)
- [ ] **Expected:** Proper tablet layout
- [ ] Test on Desktop (1920px)
- [ ] **Expected:** Optimized wide layout

### **M.2 Touch Interactions**
- [ ] Test all buttons on mobile emulation
- [ ] **Expected:** Touch targets ≥ 44x44px
- [ ] Test swipe gestures on map
- [ ] **Expected:** Smooth panning

---

## ✅ **FINAL CHECKLIST**

**Core Features:** [ ] All working  
**Offline Mode:** [ ] Tested  
**Multi-Language:** [ ] Tested  
**All Dashboards:** [ ] Functional  
**Advanced Features:** [ ] Accessible  
**Mobile Responsive:** [ ] Verified  
**Performance:** [ ] Acceptable  
**Security:** [ ] Confirmed  

---

## 🚀 **DEPLOYMENT READINESS**

**When all tests pass:**
```bash
# Build for production
npm run build

# Test production build
npm start

# Deploy to Vercel (recommended)
npx vercel --prod
```

---

## 📞 **Report Issues**

If tests fail:
1. Note the exact steps to reproduce
2. Check browser console for errors (F12)
3. Screenshot the issue
4. Document expected vs actual behavior

---

**Testing Status:** ⏳ Pending  
**Last Updated:** January 23, 2026  
**Tester:** [Your Name]
