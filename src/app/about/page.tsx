// // Created using gpt
// "use client";

// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";

// export default function AboutPage() {
//   return (
//     <section className="min-h-screen bg-background text-foreground">
//       <div className="container py-16">
//         {/* Hero Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center max-w-3xl mx-auto mb-14"
//         >
//           <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-primary-foreground">
//             About <span className="text-accent-foreground">FitFlair</span>
//           </h1>
//           <p className="text-muted-foreground text-lg">
//             At <span className="font-semibold text-foreground">FitFlair</span>, we believe that fashion
//             and comfort should go hand in hand. Our mission is to bring you
//             trendy, sustainable, and affordable clothing that empowers your
//             lifestyle — whether you’re in the gym, at work, or out with friends.
//           </p>
//         </motion.div>

//         {/* Values Section */}
//         <div className="grid md:grid-cols-3 gap-8 mb-20">
//           {[
//             {
//               title: "Quality & Comfort",
//               desc: "We use premium fabrics and ethical production practices to ensure each piece feels as good as it looks.",
//             },
//             {
//               title: "Style & Confidence",
//               desc: "Our designs are made to make you look sharp and feel unstoppable — fitness or fashion, you set the trend.",
//             },
//             {
//               title: "Sustainability",
//               desc: "From packaging to materials, we’re committed to reducing our footprint and promoting conscious fashion.",
//             },
//           ].map((item, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: i * 0.1 }}
//               viewport={{ once: true }}
//               className="bg-card border border-border rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300"
//             >
//               <h3 className="text-xl font-semibold mb-3 text-primary-foreground">
//                 {item.title}
//               </h3>
//               <p className="text-muted-foreground">{item.desc}</p>
//             </motion.div>
//           ))}
//         </div>

//         {/* CTA Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center"
//         >
//           <h2 className="text-3xl font-bold mb-4 text-primary-foreground">
//             Ready to explore our latest collection?
//           </h2>
//           <p className="text-muted-foreground mb-8">
//             Discover outfits that fit your style, mood, and every moment.
//           </p>
//           <Button
//             variant="default"
//             className="bg-accent text-accent-foreground hover:bg-accent/80 px-6 py-3 rounded-xl transition-all"
//           >
//             Start Shopping
//           </Button>
//         </motion.div>
//       </div>
//     </section>
//   );
// }




// created using claude
import React from 'react';
import { Heart, Shield, Truck, Award, Users, Target } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Passion for Fitness",
      description: "We live and breathe fitness, bringing you products that fuel your active lifestyle."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Quality Assured",
      description: "Every product is carefully curated and tested to meet our high standards."
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Fast Delivery",
      description: "Quick and reliable shipping so you can start your fitness journey without delay."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Expert Guidance",
      description: "Access to fitness tips and product recommendations from certified professionals."
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "1000+", label: "Products" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support" }
  ];

  const team = [
    {
      name: "Abdullah Qureshi",
      role: "Founder & CEO",
      description: "Former athlete with 15+ years in fitness industry"
    },
    {
      name: "Sheikh Abdullah",
      role: "Head of Product",
      description: "Certified nutritionist and fitness equipment specialist"
    },
    {
      name: "Sara Ali",
      role: "Community Manager",
      description: "Yoga instructor passionate about wellness"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary to-accent">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            About FitFlair
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Empowering your fitness journey with premium activewear and equipment since 2020
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  FitFlair was born from a simple belief: everyone deserves access to high-quality fitness gear that doesn&apos;t break the bank. What started as a small online shop in 2020 has grown into a thriving community of fitness enthusiasts.
                </p>
                <p>
                  We understand the struggle of finding the perfect workout gear—pieces that perform as good as they look. That&apos;s why we&apos;ve made it our mission to source and create products that combine style, functionality, and affordability.
                </p>
                <p>
                  Today, we&apos;re proud to serve thousands of customers worldwide, helping them look good and feel great while crushing their fitness goals.
                </p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <Target className="w-12 h-12 text-accent-foreground" />
                <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                To inspire and enable people of all fitness levels to pursue their health goals with confidence, supported by quality products and a passionate community.
              </p>
              <div className="flex items-center gap-4">
                <Users className="w-12 h-12 text-accent-foreground" />
                <h3 className="text-2xl font-bold text-foreground">Our Vision</h3>
              </div>
              <p className="text-lg text-muted-foreground mt-6">
                Creating a world where fitness is accessible, enjoyable, and sustainable for everyone, everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-4">
            What We Stand For
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Our core values guide everything we do, from product selection to customer service
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-accent-foreground mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-4">
            Meet Our Team
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Passionate individuals dedicated to your fitness success
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="w-24 h-24 bg-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl font-bold text-accent-foreground">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {member.name}
                </h3>
                <div className="text-accent-foreground font-medium mb-3">
                  {member.role}
                </div>
                <p className="text-muted-foreground text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-accent to-muted">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Join the FitFlair Community
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start your fitness journey with us today and experience the difference
          </p>
          <button className="bg-foreground text-background hover:bg-foreground/90 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 hover:shadow-xl hover:scale-105">
            Shop Now
          </button>
        </div>
      </section>
    </div>
  );
}