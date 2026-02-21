
export const surgeryContent: Record<string, { overview: string; procedure: string; recovery: string }> = {
    // --- GENERAL SURGERY ---
    'Appendectomy': {
        overview: "Appendectomy is the surgical removal of the appendix. It is an emergency procedure performed to treat appendicitis, an inflammation of the appendix. If left untreated, the appendix can rupture and cause a life-threatening infection (peritonitis).",
        procedure: "Most appendectomies are performed laparoscopically (keyhole surgery). The surgeon makes 3 small incisions, inflates the abdomen with gas, and removes the appendix using small instruments. In severe cases (ruptured appendix), open surgery may be required to clean the abdominal cavity.",
        recovery: "Patients usually go home within 24 hours. Recovery takes 1-3 weeks. You can return to school or work within a week but should avoid strenuous activity for a few weeks to allow the incisions to heal."
    },
    'Hernia Repair': {
        overview: "Hernia repair surgery returns displaced tissues to their proper position and reinforces the abdominal wall defects using stitches or surgical mesh. It is essential to prevent complications like strangulation, where the blood supply to the tissue is cut off.",
        procedure: "The surgeon pushes the bulging tissue back into place. A synthetic mesh is often placed over the weak area to strengthen it (Lichtenstein repair). This can be done via open surgery or laparoscopy, depending on the hernia size and location.",
        recovery: "Recovery is generally quick. Most patients are discharged the same day. Pain is managed with oral medication. Avoid heavy lifting (>5kg) for 4-6 weeks to prevent recurrence."
    },
    'Gallbladder Removal (Cholecystectomy)': {
        overview: "Cholecystectomy is the removal of the gallbladder, usually to treat painful gallstones. It is one of the most common surgeries worldwide. Removing the gallbladder does not significantly affect digestion, as the liver continues to produce bile.",
        procedure: "Laparoscopic cholecystectomy is the gold standard. Four small incisions are made. The gallbladder is dissected from the liver and removed through the belly button. Intraoperative cholangiogram (X-ray) may be done to check bile ducts.",
        recovery: "Patients often return home the same day. You can eat a normal diet immediately, though avoiding very fatty foods initially is recommended. Full recovery takes about 1 week."
    },
    'Thyroidectomy': {
        overview: "Thyroidectomy is the removal of all or part of the thyroid gland. It is performed for thyroid cancer, goiter (enlarged thyroid), or hyperthyroidism. The extent of surgery depends on the condition being treated.",
        procedure: "An incision is made in the front of the neck. The surgeon carefully separates the thyroid from the trachea and preserves critical structures like the laryngeal nerves (voice box) and parathyroid glands. A drain may be placed.",
        recovery: "Most patients stay overnight. Voice hoarseness is common but usually temporary. If the total thyroid is removed, lifelong thyroid hormone replacement pills will be required."
    },
    'Hemorrhoidectomy': {
        overview: "Hemorrhoidectomy is surgery to remove severe internal or external hemorrhoids. It is the most effective treatment for recurring or painful hemorrhoids that haven't responded to other treatments.",
        procedure: "The swollen veins are tied off or excised. Techniques include excisional hemorrhoidectomy (cutting), stapled hemorrhoidopexy (lifting), or laser ablation (less painful). Spinal or general anesthesia is used.",
        recovery: "Recovery can be painful for 1-2 weeks. Sitz baths and stool softeners are essential. Most people return to work in 10-14 days."
    },

    // --- GASTROENTEROLOGY ---
    'Colonoscopy': {
        overview: "Colonoscopy is a diagnostic procedure to examine the inner lining of the large intestine (colon) and rectum. It is the gold standard for colon cancer screening and can diagnose polyps, ulcers, and inflammation.",
        procedure: "You will be sedated. A flexible tube with a camera (colonoscope) is inserted through the rectum. The doctor inflates the colon with air to get a better view. If polyps are found, they can be removed (polypectomy) during the same procedure.",
        recovery: "You will stay in recovery for 1-2 hours until sedation wears off. You may feel bloating or gas. You can eat normally the same day but should not drive for 24 hours. Pathology results take a few days."
    },
    'Bariatric Surgery (Gastric Bypass)': {
        overview: "Gastric Bypass is a type of weight-loss surgery that involves creating a small pouch from the stomach and connecting the newly created pouch directly to the small intestine. It changes how your stomach and small intestine handle the food you eat.",
        procedure: "The surgeon staples the stomach to create a small upper pouch (size of an egg). The small intestine is divided, and the lower part is connected to this pouch (Roux-en-Y). This restricts food intake and reduces calorie absorption.",
        recovery: "Hospital stay is 2-3 days. You will start on liquids and slowly progress to soft foods over weeks. Significant weight loss occurs in the first year. Lifelong vitamin supplements are necessary."
    },
    'Upper GI Endoscopy': {
        overview: "Upper GI Endoscopy (EGD) allows your doctor to examine the esophagus, stomach, and duodenum. It is used to investigate symptoms like heartburn, difficulty swallowing, or abdominal pain.",
        procedure: "Throat spray numbs the throat, and sedation is given. A thin scope is passed through the mouth. The doctor examines the lining for inflammation, ulcers, or tumors. Biopsies can be taken if needed.",
        recovery: "The procedure takes 15-30 minutes. You can go home after brief observation. Throat soreness is common for a day. Normal diet can usually be resumed immediately."
    },

    // --- GYNECOLOGY ---
    'Cesarean Section (C-Section)': {
        overview: "A Cesarean section is the surgical delivery of a baby through incisions in the abdomen and uterus. It may be planned or performed as an emergency if vaginal delivery is risky for the mother or baby.",
        procedure: "Spinal or epidural anesthesia numbs the lower body. A horizontal incision (bikini cut) is made just above the pubic hairline. The uterus is opened, and the baby is delivered. The placenta is removed, and layers are stitched closed.",
        recovery: "Hospital stay is 3-4 days. Full recovery takes 6 weeks. Avoid heavy lifting and driving for a few weeks. Pain management and incision care are key during the first week."
    },
    'Laparoscopic Cyst Removal': {
        overview: "Ovarian cystectomy is a surgery to remove a cyst (fluid-filled sac) from the ovary while preserving the ovary itself. It is recommended for large, persistent, or painful cysts.",
        procedure: "Performed under general anesthesia. Small incisions are made near the navel. The cyst is carefully separated from healthy ovarian tissue and placed in a bag to be removed from the abdomen. This minimizes cancer risk if the cyst ruptures.",
        recovery: "This is usually a day-care procedure. You can return to normal activities in 1 week. It is fertility-sparing surgery compared to removing the entire ovary."
    },
    'Myomectomy': {
        overview: "Myomectomy is the surgical removal of uterine fibroids (leiomyomas) while keeping the uterus intact. It is the preferred option for women with fibroids who wish to become pregnant in the future.",
        procedure: "Can be Hysteroscopic (through vagina, no incision), Laparoscopic (keyhole), or Abdominal (open incision) depending on fibroid size and number. The fibroids are shelled out, and the uterine wall is reconstructed.",
        recovery: "Varies by approach. Hysteroscopic: 1-2 days. Laparoscopic: 2-3 weeks. Abdominal: 4-6 weeks. Success rates for symptom relief are high."
    },


    // --- CARDIAC ---
    'Coronary Artery Bypass (CABG)': {
        overview: "Coronary Artery Bypass Grafting (CABG) is a life-saving procedure used to treat severe coronary artery disease. It improves blood flow to the heart by diverting blood around narrowed or clogged arteries using a healthy blood vessel from the leg, arm, or chest. It significantly reduces the risk of heart attack and relieves chest pain (angina).",
        procedure: "The surgeon takes a healthy blood vessel (graft) from another part of your body. Depending on the severity, the surgery may be performed 'on-pump' (using a heart-lung machine) or 'off-pump' (beating heart surgery). The graft is attached above and below the blocked artery, creating a new pathway for blood flow.",
        recovery: "Patients typically spend 1-2 days in the ICU and 5-7 days in the hospital. Full recovery takes 6-12 weeks. Cardiac rehabilitation is strongly recommended to strengthen the heart and establish a heart-healthy lifestyle."
    },
    'Heart Valve Replacement': {
        overview: "Heart Valve Replacement surgery is performed when one or more of the heart's valves are damaged or diseased and cannot function properly. The damaged valve is removed and replaced with either a mechanical valve (long-lasting, requires blood thinners) or a biological valve (from tissue, no long-term blood thinners needed).",
        procedure: "The surgery can be performed via open-heart surgery or minimally invasive techniques (like TAVR for aortic valves). The surgeon accesses the heart, removes the faulty valve, and sutures the new valve into place. The heart function is then assessed before closing.",
        recovery: "Hospital stay is usually 5-7 days. Most patients feel significantly better within 4-6 weeks, with improved energy levels and breathing. Regular follow-up echocardiograms are required to monitor the new valve."
    },
    'Angioplasty with Stent': {
        overview: "Angioplasty is a minimally invasive procedure to open clogged heart arteries. A small balloon is used to widen the blocked artery, and a stent (a small wire mesh tube) is placed to keep it open. This procedure is critical for treating heart attacks and severe angina.",
        procedure: "A catheter is inserted through the wrist or groin and guided to the heart arteries. A balloon at the tip is inflated to push plaque against the artery wall. A drug-eluting stent is then deployed to keep the artery open and prevent re-narrowing.",
        recovery: "Recovery is quick. Most patients go home the next day. You can return to non-strenuous activities within a week. Blood-thinning medication must be taken strictly as prescribed to prevent clots in the stent."
    },

    // --- ORTHOPEDICS ---
    'Total Knee Replacement': {
        overview: "Total Knee Replacement (Arthroplasty) resurfaces a knee damaged by arthritis. Metal and plastic parts are used to cap the ends of the bones that form the knee joint, along with the kneecap. It is highly effective for relieving severe pain and restoring function.",
        procedure: "The damaged cartilage and bone surfaces are removed from the femur and tibia. These are replaced with metal components. A medical-grade plastic spacer is inserted between the metal parts to create a smooth gliding surface. The patella (kneecap) may also be resurfaced.",
        recovery: "You will start walking with a walker on the same day or next day. Hospital stay is 3-4 days. Physical therapy is crucial for regaining range of motion. Most patients resume driving in 4-6 weeks and recreational activities in 3 months."
    },
    'Total Hip Replacement': {
        overview: "Total Hip Replacement involves removing the damaged ball-and-socket joint of the hip and replacing it with an artificial implant. It is the gold standard treatment for advanced hip arthritis or fractures, providing dramatic pain relief and improved mobility.",
        procedure: "The damaged femoral head is removed and replaced with a metal stem and ceramic/metal ball. The damaged cartilage of the socket (acetabulum) is removed and replaced with a metal socket. A plastic or ceramic liner is placed between the new ball and socket to allow smooth movement.",
        recovery: "Walking begins almost immediately with support. Hospital stay is 2-4 days. Pain relief is often immediate. Full recovery and return to normal activities typically occur within 6-12 weeks."
    },
    'Spinal Fusion': {
        overview: "Spinal fusion is surgery to permanently connect two or more vertebrae in your spine, eliminating motion between them. It is used to correct specific problems with spinal bones (vertebrae), such as instability, deformity, or fractures.",
        procedure: "The surgeon accesses the spine from the front (anterior) or back (posterior). Bone grafts or synthetic bone substitutes are placed between the vertebrae. Metal plates, screws, or rods may be used to hold the vertebrae together while the bone graft heals and fuses the bones into one solid unit.",
        recovery: "Hospital stay is 3-5 days. It takes several months for the bones to fuse completely. You may need to wear a brace. Physical therapy starts after initial healing to strengthen back muscles."
    },

    // --- NEURO ---
    'Brain Tumor Removal': {
        overview: "Brain tumor surgery (Craniotomy) aims to remove as much of the tumor as possible while minimizing damage to healthy brain tissue. It is often the first line of treatment for benign and malignant brain tumors to reduce pressure and obtain a diagnosis.",
        procedure: "A section of the skull is temporarily removed (bone flap) to access the brain. Using an operating microscope and sometimes image-guidance systems (neuronavigation), the surgeon carefully dissects the tumor from surrounding brain tissue. The bone flap is secured back in place with mini-plates.",
        recovery: "ICU stay of 1-2 days for close monitoring is standard. Total hospital stay is 5-7 days. Recovery varies widely based on tumor location and neurological status. Rehabilitation (speech, physical, occupational) may be needed."
    },
    'Microdiscectomy': {
        overview: "Microdiscectomy is a minimally invasive spine surgery to remove the portion of a herniated disc that is pressing on a spinal nerve root. It is highly effective for relieving sciatica (leg pain) caused by disc herniation.",
        procedure: "A small incision (less than 1 inch) is made over the affected disc. The surgeon uses a microscope to view the disc and nerves. A small amount of bone is removed to access the nerve, and the herniated portion of the disc is carefully removed to relieve pressure.",
        recovery: "This is often performed as a day-care or overnight procedure. Leg pain relief is typically immediate. Walking is encouraged right away. Return to desk work is possible within 1-2 weeks."
    },

    // --- ONCOLOGY ---
    'Breast Cancer Surgery': {
        overview: "Breast cancer surgery involves removing the cancer while conserving as much healthy tissue as possible. Options range from Lumpectomy (removing just the tumor) to Mastectomy (removing the entire breast), often accompanied by lymph node assessment.",
        procedure: "For Lumpectomy, the tumor and a margin of healthy tissue are removed. For Mastectomy, all breast tissue is removed. Sentinel lymph node biopsy is often done to check for spread. Reconstructive surgery can be performed immediately or at a later date.",
        recovery: "Most patients go home the same day or next day. Drains may be placed to remove fluid. Recovery takes 2-4 weeks. Further treatments like radiation or chemotherapy may follow based on pathology results."
    },
    'Colon Cancer Resection': {
        overview: "Colectomy is the surgical removal of part or all of the colon (large intestine) to treat cancer. The healthy ends of the colon are reconnected (anastomosis) to restore bowel function.",
        procedure: "This can be done via open surgery or laparoscopically (keyhole). The segment of the colon with the tumor and surrounding lymph nodes is removed. The remaining ends are stapled or sewn together. In some cases, a temporary colostomy may be needed to allow the bowel to heal.",
        recovery: "Hospital stay is 5-7 days until bowel function returns. A soft diet is introduced gradually. Full recovery takes 4-6 weeks. Chemotherapy may be recommended depending on the cancer stage."
    },

    // --- GYNECOLOGY ---
    'Hysterectomy': {
        overview: "Hysterectomy is the surgical removal of the uterus. It is a definitive treatment for conditions like uterine fibroids, cancer, endometriosis, or uterine prolapse. Depending on the reason, the cervix and ovaries may also be removed.",
        procedure: "The surgery can be performed vaginally, laparoscopically (minimally invasive), or via an open abdominal incision. Laparoscopic and vaginal approaches offer faster recovery and less pain compared to open surgery.",
        recovery: "Recovery depends on the approach. Laparoscopic/Vaginal: 2-4 weeks. Abdominal: 4-6 weeks. Patients are advised to avoid heavy lifting and strenuous activity during the healing period."
    },

    // --- UROLOGY (Rest) ---
    'TURP (Prostate Surgery)': {
        overview: "Transurethral Resection of the Prostate (TURP) is the standard surgery for treating benign prostatic hyperplasia (BPH). It relieves urinary symptoms caused by an enlarged prostate pressing on the urethra.",
        procedure: "No external incision is made. A resectoscope is inserted through the penis. An electrical loop wire is used to cut away excess prostate tissue and seal blood vessels. A catheter is placed to irrigate the bladder.",
        recovery: "Hospital stay is 2-3 days until the catheter is removed. Blood in urine is common initially. Sexual function is usually preserved, though dry orgasm (retrograde ejaculation) is a common side effect."
    },
    'Circumcision': {
        overview: "Circumcision is the surgical removal of the foreskin covering the tip of the penis. It is performed for medical reasons (phimosis, recurrent balanitis) or cultural/religious reasons.",
        procedure: "The foreskin is freed from the head of the penis, and the excess skin is clipped off. The remaining skin edges are stitched or glued. In adults, the ZSR Stapler technique is popular for being painless and bloodless.",
        recovery: "Healing takes 1-2 weeks. It is usually a day-care procedure. Loose clothing is recommended. Adults should abstain from sexual activity for 4-6 weeks."
    },
    'Vasectomy': {
        overview: "Vasectomy is a minor surgery to block sperm from reaching the semen that is ejaculated. It is a highly effective, permanent form of male birth control.",
        procedure: "Local anesthesia is used. A tiny puncture is made in the scrotum. The vas deferens tubes (which carry sperm) are cut, tied, or sealed. Known as 'No-Scalpel Vasectomy', it involves minimal pain and no stitches.",
        recovery: "You can go home immediately. Rest for 24 hours. Swelling and bruising are mild. Backup birth control is needed for 3 months until a sperm test confirms success."
    },

    // --- ENT ---
    'Septoplasty': {
        overview: "Septoplasty is surgery to straighten a deviated septum (the wall between your nostrils). It improves breathing, reduces snoring, and can help with chronic sinus infections.",
        procedure: "The surgeon works through the nostrils (no external scars). The lining of the septum is lifted, and the bent bone/cartilage is removed or reshaped. The lining is repositioned. Splints may be placed to hold it straight.",
        recovery: "Day-care procedure. Nasal packing may be used for a day. Stuffiness is common for a week. Full healing takes 1-3 months, but breathing improvement is often noticed quickly."
    },
    'Tonsillectomy': {
        overview: "Tonsillectomy is the removal of the tonsils, two oval-shaped pads of tissue at the back of the throat. It is done for recurrent throat infections (tonsillitis) or sleep apnea (breathing trouble).",
        procedure: "Performed under general anesthesia. The tonsils are cut out using a scalpel or removed using cautery (heat) or coblation. Adenoids (behind the nose) are often removed at the same time in children.",
        recovery: "Throat pain is significant for 1-2 weeks. A cold, soft diet (ice cream, yogurt) is recommended. Hydration is critical. Risk of bleeding exists for up to 10 days."
    },
    'Cochlear Implant': {
        overview: "A cochlear implant is an electronic device that bypasses damaged parts of the inner ear (hair cells) to provide sound signals to the brain. It is used for severe-to-profound hearing loss where hearing aids don't help.",
        procedure: "An incision is made behind the ear. The receiver is implanted under the skin. An electrode array is threaded into the cochlea (inner ear). The surgical site heals, and the device is 'switched on' 3-4 weeks later.",
        recovery: "Hospital stay is 1-2 days. The real work begins after activation, with auditory rehabilitation therapy to learn how to interpret the new sounds."
    },

    // --- COSMETIC ---
    'Rhinoplasty (Nose Job)': {
        overview: "Rhinoplasty reshapes the nose for aesthetic reasons or to fix breathing problems. It can change the size, shape, or proportions of your nose to achieve facial harmony.",
        procedure: "Open (small incision on columella) or Closed (incisions inside nostrils) techniques are used. Bone and cartilage are sculpted. If breathing is an issue, the septum is also straightened (Septorhinoplasty).",
        recovery: "A nasal splint is worn for 1 week. Bruising around eyes is common. 80% of swelling goes down in 2 weeks, but refined results take up to a year to settle."
    },
    'Liposuction': {
        overview: "Liposuction uses a suction technique to remove fat from specific areas of the body, such as the abdomen, hips, thighs, or arms. It contours the body but is not a weight-loss solution.",
        procedure: "Tumescent fluid (numbing mix) is injected. A thin tube (cannula) is inserted through tiny cuts to loosen fat. A vacuum sucks the fat out. VASER (ultrasound) or Laser lipo are advanced options for better skin tightening.",
        recovery: "Compression garments must be worn for 4-6 weeks to reduce swelling. Most people return to work in 3-5 days. Final contours appear after 3-6 months."
    },
    'Hair Transplant': {
        overview: "Hair transplant surgery moves hair follicles from a dense area (donor site) to a bald or thinning area (recipient site). It is the most effective long-term solution for male or female pattern baldness.",
        procedure: "FUE (Follicular Unit Extraction) is the modern standard. Individual follicles are harvested from the back of the head and implanted one by one into the balding area. No linear scar is left.",
        recovery: "Tiny scabs form and fall off in 7-10 days. The transplanted hair sheds after 3 weeks (shock loss) and grows back permanently starting month 3. Full results are seen in 9-12 months."
    },

    // --- DENTAL ---
    'Dental Implant': {
        overview: "A dental implant is a titanium post that is surgically positioned into the jawbone beneath the gum line to act as a tooth root. It provides a permanent, stable foundation for a replacement tooth (crown).",
        procedure: "Step 1: The implant is drilled into the jawbone. Step 2 (Wait 3-6 months): Osseointegration (bone fuses to implant). Step 3: An abutment and crown are attached. Immediate loading implants are also available for specific cases.",
        recovery: "Local anesthesia is used. Mild swelling occurs for 2-3 days. You can eat soft foods immediately. Good oral hygiene is vital for implant longevity (20+ years)."
    },
    'Root Canal Treatment': {
        overview: "Root canal treatment repairs a badly decayed or infected tooth instead of removing it. It involves removing the infected pulp (nerve) inside the tooth.",
        procedure: "An opening is made in the crown. The infected pulp is cleaned out using files. The canals are disinfected and filled with a rubber-like material (gutta-percha). The tooth is sealed and usually covered with a crown for strength.",
        recovery: "The procedure is painless with modern anesthesia. The tooth may be sensitive for a few days. Once crowned, it functions like a normal tooth."
    },

    // --- PEDIATRIC ---
    'Pediatric Hernia Repair': {
        overview: "Pediatric hernia repair fixes an inguinal hernia, where a loop of intestine pokes through a weak spot in a child's abdominal muscles. It is one of the most common surgeries in children.",
        procedure: "Performed under general anesthesia. A small incision is made in the groin crease. The hernia sac is separated and closed. No mesh is usually needed in children compared to adults.",
        recovery: "Day-care surgery. Children recover very fast. Pain is minimal. Activity restrictions are usually short (1-2 weeks of no rough play)."
    },

    // --- OPHTHALMOLOGY (Rest) ---
    'LASIK Eye Surgery': {
        overview: "LASIK (Laser-Assisted In Situ Keratomileusis) is a popular refractive surgery to correct myopia (nearsightedness), hyperopia (farsightedness), and astigmatism. It reshapes the cornea to focus light correctly on the retina, often eliminating the need for glasses or contact lenses.",
        procedure: "Numbing drops are applied. A femtosecond laser creates a thin flap in the cornea. The surgeon lifts the flap and uses an excimer laser to reshape the underlying corneal tissue. The flap is repositioned and heals without stitches.",
        recovery: "Vision improves almost immediately. Most patients can drive the next day. Dry eyes and halos are temporary side effects. Full stability is reached in 1-3 months."
    },
    'Glaucoma Surgery': {
        overview: "Glaucoma surgery lowers intraocular pressure to prevent optic nerve damage and blindness. It is performed when eye drops or laser treatments are insufficient to control eye pressure.",
        procedure: "Trabeculectomy is the most common procedure. A tiny drainage hole is created in the sclera (white of the eye) to allow fluid to drain out, lowering pressure. Minimally invasive glaucoma surgery (MIGS) with tiny shunts (stents) is also an option for mild cases.",
        recovery: "Vision may be blurry for a few weeks. Anti-inflammatory eye drops are used. Heavy lifting and bending must be avoided for a month."
    },
    'Retinal Detachment Repair': {
        overview: "Retinal detachment is a medical emergency where the retina pulls away from the back of the eye. Surgery is needed immediately to reattach the retina and prevent permanent vision loss.",
        procedure: "Options include Vitrectomy (removing vitreous gel), Scleral Buckling (placing a band around the eye), or Pneumatic Retinopexy (injecting a gas bubble). Laser is used to seal the tear.",
        recovery: "Recovery takes 2-4 weeks. If a gas bubble is used, you must keep your head in a specific position for several days. Vision improvement depends on how long the retina was detached."
    }
};
