export interface Testimonial {
    id: string;
    patientName: string
    surgeryType: string;
    city: string;
    rating: number;
    story: string;
    date: string;
    verified: boolean;
}

export const testimonials: Testimonial[] = [
    {
        id: '1',
        patientName: 'Rajesh Kumar',
        surgeryType: 'Total Knee Replacement',
        city: 'Mumbai',
        rating: 5,
        story: 'I was suffering from severe knee pain for years. HealthExpress connected me with an excellent orthopedic surgeon at a top hospital in Mumbai. The surgery went smoothly, and I was walking the next day! Their team coordinated everything from admission to discharge.',
        date: 'January 2026',
        verified: true,
    },
    {
        id: '2',
        patientName: 'Priya Sharma',
        surgeryType: 'Laparoscopic Cyst Removal',
        city: 'Delhi',
        rating: 5,
        story: 'I was very nervous about the surgery, but the team at HealthExpress made everything so easy. They found me a great hospital with insurance cashless facility. The surgery was done laparoscopically, and I recovered quickly. Very grateful!',
        date: 'December 2025',
        verified: true,
    },
    {
        id: '3',
        patientName: 'Anil Patel',
        surgeryType: 'Angioplasty with Stent',
        city: 'Ahmedabad',
        rating: 5,
        story: 'Had a heart attack and needed urgent angioplasty. HealthExpress arranged priority admission within hours. The cardiac team was excellent, and I got a drug-eluting stent. I am back to normal life now. Thank you for saving my life!',
        date: 'November 2025',
        verified: true,
    },
    {
        id: '4',
        patientName: 'Sneha Reddy',
        surgeryType: 'Cesarean Section',
        city: 'Hyderabad',
        rating: 5,
        story: 'My baby delivery was planned as a C-section. HealthExpress helped me choose the best maternity hospital in Hyderabad. The gynecologist was very caring, and the nursing staff was wonderful. Both me and my baby are healthy!',
        date: 'October 2025',
        verified: true,
    },
    {
        id: '5',
        patientName: 'Vikram Singh',
        surgeryType: 'LASIK Eye Surgery',
        city: 'Bangalore',
        rating: 5,
        story: 'Wore glasses for 15 years. Finally got LASIK done through HealthExpress. They connected me with one of the best eye surgeons. The procedure took only 10 minutes, and I could see clearly the next morning. Life-changing experience!',
        date: 'September 2025',
        verified: true,
    },
    {
        id: '6',
        patientName: 'Meera Iyer',
        surgeryType: 'Gallbladder Removal',
        city: 'Chennai',
        rating: 5,
        story: 'I had severe gallstone pain. HealthExpress team was very responsive and arranged everything quickly. The laparoscopic surgery was painless, and I went home the same evening. Recovery was much faster than I expected.',
        date: 'August 2025',
        verified: true,
    },
    {
        id: '7',
        patientName: 'Ramesh Gupta',
        surgeryType: 'Hernia Repair',
        city: 'Pune',
        rating: 5,
        story: 'Had an inguinal hernia for months. The consultation with HealthExpress was very helpful. They explained everything clearly and got me a good surgeon. Surgery was done with mesh, and I had no complications. Very happy with the service.',
        date: 'July 2025',
        verified: true,
    },
    {
        id: '8',
        patientName: 'Kavita Desai',
        surgeryType: 'Thyroidectomy',
        city: 'Surat',
        rating: 5,
        story: 'I was diagnosed with thyroid nodules. HealthExpress helped me find a skilled ENT surgeon who removed half my thyroid. The scar is barely visible. Post-surgery care instructions were very clear. Thank you for the support!',
        date: 'June 2025',
        verified: true,
    },
    {
        id: '9',
        patientName: 'Arjun Nair',
        surgeryType: 'Appendectomy',
        city: 'Kochi',
        rating: 5,
        story: 'Had sudden appendicitis at midnight. Called HealthExpress emergency line, and they arranged admission immediately. Surgery was done laparoscopically within an hour. The quick response saved me from complications. Excellent service!',
        date: 'May 2025',
        verified: true,
    },
    {
        id: '10',
        patientName: 'Sanjana Joshi',
        surgeryType: 'Hair Transplant',
        city: 'Mumbai',
        rating: 5,
        story: 'I was losing confidence due to hair loss. HealthExpress connected me with a top cosmetic surgeon. FUE transplant was done perfectly with 2500 grafts. After 8 months, the results are amazing! Natural-looking hair growth. Highly recommend.',
        date: 'April 2025',
        verified: true,
    },
];

export function getTestimonialsBySurgery(surgeryType: string): Testimonial[] {
    return testimonials.filter((t) =>
        t.surgeryType.toLowerCase().includes(surgeryType.toLowerCase())
    );
}

export function getRandomTestimonials(count: number = 3): Testimonial[] {
    const shuffled = [...testimonials].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
