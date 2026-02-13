import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Gift, Mail, Tv, Utensils, Moon, Music, Camera, Gamepad, Coffee } from 'lucide-react';
import confetti from 'canvas-confetti';


const ValentineSite = () => {
  const [loading, setLoading] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [yesButtonScale, setYesButtonScale] = useState(1);
  // Update this state at the top of your component
  const [revealedMemories, setRevealedMemories] = useState(new Array(40).fill(false));

const schedule = [
  { date: "Feb 7", title: "Rose Day 🌹", wish: "I wanted to give you a bouquet that never fades—one where every petal tells a story of us. Each rose here represents a piece of my heart and a promise for our future..", mems: [{ url: "/rose1.jpg", caption: "Peach Roses 🌹🩷(The First Blush of Love): This is a nod to how it all started—that sweet, innocent spark that hasn't faded. It’s a reminder of the sincerity and softness at the heart of my feelings for you." }, { url: "/rose2.jpeg", caption: "Always blooming with you" },
    { url: "/rose3.jpg", caption: "Juat a small bouquet of All roses" },{ url: "/rose4.jpg", caption: "A Rose bouquet made with love , for Red Rose 🌹 of my life " }] },
  { date: "Feb 8", title: "Propose Day 💍", wish: "I give you my whole heart and life, and I know you will hold it precious, just as I hold you.Happy Propose Day, my forever valentine 💘 💌", mems: [{ url: "/prop1.jpg", caption: "Happy Propose Day, Diuu. It’s not just the big moments I’m grateful for; it’s the quiet ones, the laughs, and the way you just 'get' me. You are my greatest necessity. Thank you for being my person and for letting me need you as much as I do. You are my world. 🫵🏻 🌍" }, { url: "/prop2.jpg", caption: "Diuu, before you came along, I was just drifting. You’ve become the anchor that keeps me steady and the North Star* that guides me home. I’m so incredibly grateful for *your love* ⚫️🤞🏻, but more than that, I’m grateful for you 🫵🏻. I need you🥹 like I need the air 🌬️ I breathe. Happy Propose Day to my everything. 🌍 " }] },
  { date: "Feb 9", title: "Chocolate Day 🍫", wish: "You're my favorite flavor, and Our love is like chocolate rich, sweet, and irresistible", mems: [{ url: "/choc1.jpg", caption: "They say chocolate is the secret to happiness, but they clearly haven't met you yet. You're my favorite treat." }, { url: "/choc2.jpeg", caption: "In a world that’s always in a hurry, you are the one thing I want to slow down for. Just like a piece of luxury chocolate, I want to taste the sweetness of your love patiently, bit by bit, making sure I never miss a single detail of who you are. You make my life so much richer just by being in it. Happy Chocolate Day to the woman who is sweeter than anything I’ve ever known." }] },
  { date: "Feb 10", title: "Teddy Day 🧸", wish: "A big virtual bear hug until I can give you a real one.", mems: [{ url: "/teddy1.jpg", caption: "My favorite cuddle buddy" },{ url: "/teddy2.jpg", caption: "An special Coupon for my fav person to redeeem it anytime.   Validity : Lifetime ∞" }] },
  { date: "Feb 11", title: "Promise Day 🤝", wish: "I promise to always be your peace and your biggest fan.", mems: [{ url: "/prom1.jpg", caption: "Hand in hand" },{ url: "/prom2.jpg", caption: "Half and half , unites to mkae a one . Even in heart or in real life (SoulMatches)" }] },
  { date: "Feb 12", title: "Hug Day 🫂", wish: "Happy Hug Day, my Diuu. More than just a day, I’m waiting for that moment when I can finally pull you into my arms and never let go. I want to hold you so tightly that you can feel my heart beating against yours, whispering that you’re exactly where you belong—with me, forever", mems: [{ url: "/hug1.jpg", caption: "The safest place in the world is inside your arms." },{ url: "/hug2.jpg", caption: "Warmest place to be"}] },
  { date: "Feb 13", title: "Kiss Day 💋", wish: "Happy Kiss Day, my Diuu! Starting this countdown because one day isn't enough to show you how much I crave you ,💋 my baby 😘💝 | Sending a million virtual kisses your way!", mems: [{ url: "/kiss1.jpg", caption: "The thought of tasting you is becoming an obsession. I want to explore every inch of your smile._Jawline_  Tracing your jawline with my lips,  👄 moving slowly. I’m savoring every inch of you today. |" },{ url: "/kiss2.jpg", caption: "Forehead | Starting at the top. I know how much you love those forehead kisses. I’m leaning in to *plant a long, soft kiss on your forehead*. Just to let you know you’re safe, cherished, and mine. 🫰🏻" },
    { url: "/kiss3.jpg", caption: "| _Cheeks_  😘| I want to kiss the apples of your cheeks 😚🍎 until they turn that *deep crimson color I love so much. Blush for me, baby. 😚🤭| 💌" },{ url: "/kiss4.jpeg", caption: "| _The Lips_ (a tease) 😜 Finally, the main event. I have a specific hunger today, *Diuu...*❤️ and only the taste of your lips can satisfy it. Counting down the minutes. 😉 I want to taste your lips slowly, deeply, until we both *forget where we are. Deep Connection : It’s not just about the physical; it’s about how our souls touch when our lips meet. *I’m yours, Diuu." }] }
];

// This helper ensures each memory card has a unique index across different sections
let globalIndex = 0;

  // Initial beating heart loader delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const memories = [
    { url: "/mem1.jpg", caption: "Our personal space vibes ✨" },
    { url: "/mem2.jpg", caption: "The Day spent well" },
    { url: "/mem3.jpg", caption: "Adventuring with my person" },
    { url: "/mem4.jpg", caption: "Just us being us(Manifesting some special moments with you) ❤️" }
  ];

  const handleYes = () => {
    setAccepted(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#ffffff']
    });
  };

  const moveNoButton = () => {
    // 1. Get button dimensions (roughly 120px wide, 60px tall)
    const btnWidth = 120;
    const btnHeight = 60;
    
    // 2. Calculate safe boundaries (keeping a 20px margin from edges)
    const maxWidth = window.innerWidth - btnWidth - 20;
    const maxHeight = window.innerHeight - btnHeight - 20;
    
    // 3. Generate random coordinates within those safe bounds
    // We use Math.max to ensure we don't get negative numbers on very small screens
    const x = Math.max(20, Math.random() * maxWidth);
    const y = Math.max(20, Math.random() * maxHeight);
    
    setNoButtonPos({ x, y });

    setYesButtonScale(prev => prev + 0.2);
  };

  const toggleMemory = (index) => {
    const newRevealed = [...revealedMemories];
    newRevealed[index] = !newRevealed[index];
    setRevealedMemories(newRevealed);
    if (!revealedMemories[index]) {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
    }
  };

  // 1. BEATING HEART LOADING SCREEN
  if (loading) {
    return (
      <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center">
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>
          <Heart size={80} fill="#ec4899" className="text-pink-500" />
        </motion.div>
        <p className="mt-4 text-pink-400 font-medium animate-pulse">Loading our love story...</p>
      </div>
    );
  }

  // 2. LANDING PAGE
  if (!accepted) {
    return (
      <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "110vh", x: (i * 10) + "vw" }}
            animate={{ y: "-10vh" }}
            transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, ease: "linear" }}
            className="absolute text-pink-200 opacity-40 z-0"
          >
            <Heart size={20 + Math.random() * 30} fill="currentColor" />
          </motion.div>
        ))}
        
        <div className="relative z-10">
          <motion.h1 className="text-4xl md:text-6xl font-bold text-pink-600 mb-8">
            !! 🌹 !! Will you be mine for NOW , LATER and FOREVER ?  !! 🌹 !!
          </motion.h1>
          <div className="flex gap-4 justify-center items-center min-h-[100px]">
          <motion.button 
  onClick={handleYes} 
  animate={{ scale: yesButtonScale }} // This links the state to the size
  transition={{ type: "spring", stiffness: 300 }} // Makes the growth look "bouncy"
  className="bg-pink-500 text-white px-10 py-4 rounded-full text-2xl font-bold shadow-lg z-10"
>
  Yes! 🥹
</motion.button>
            <motion.button
  onMouseEnter={moveNoButton}
  onTouchStart={moveNoButton} // <--- Add this for mobile users!
  style={{ 
    position: noButtonPos.x ? 'fixed' : 'relative', 
    left: noButtonPos.x, 
    top: noButtonPos.y 
  }}
  className="bg-gray-300 text-gray-700 px-10 py-4 rounded-full text-2xl z-50 transition-all duration-200"
>
  No
</motion.button>
          </div>
        </div>
      </div>
    );
  }
const triggerHeartBurst = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 15,
      spread: 40,
      origin: { x, y },
      colors: ['#ff69b4', '#ff1493'],
      shapes: ['circle'],
      scalar: 0.7
    });
  };
 
return (
  <div className="min-h-screen bg-[#fff0f3] text-pink-900 font-sans pb-20 relative overflow-x-hidden">
    
    {/* 1. SUCCESS HEADER */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto pt-10 px-6 text-center mb-16"
    >
      <h2 className="text-4xl font-bold text-pink-500 mb-2">Good choice babu 🥳</h2>
      <p className="text-sm text-gray-600 mb-6 px-4 italic">You just unlocked the full Valentine's Week experience!</p>
      
      <div className="flex justify-center gap-4 mb-6">
          {/* Make sure these files exist in your /public folder */}
          <img src="/cats1.gif" alt="cats" className="w-24 h-24 rounded-lg shadow-md border-2 border-white" />
          <img src="/cats2.gif" alt="cats" className="w-24 h-24 rounded-lg shadow-md border-2 border-white" />
      </div>
      <h3 className="text-xl font-bold text-pink-600">Now you're stuck with me forever ∞</h3>

      <h3 className="text-xl font-bold text-pink-600 mb-4">Now you're stuck with me forever ∞</h3>
        
         <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-inner border border-pink-100 text-left">
          <p className="font-bold text-gray-800 mb-3 text-center">📜 THE OFFICIAL CONTRACT</p>
         <ul className="space-y-2 text-sm text-gray-700">
             <li className="flex items-center gap-2">❌ No take-backs allowed</li>
             <li className="flex items-center gap-2">❌ You're legally mine now (I checked)</li>
             <li className="flex items-center gap-2">❌ Every "no" from now on = 10 extra kisses</li>
             <li className="flex items-center gap-2">✅ Stuck with your favorite person FOREVER ❤️</li>
           </ul>
         </div>
    </motion.div>

    {/* 2. CHRONOLOGICAL WEEK SECTIONS (Feb 7 - Feb 13) */}
    <div className="max-w-4xl mx-auto px-6 space-y-20">
      {schedule.map((day, dayIdx) => (
        <div key={dayIdx}>
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">{day.date}</span>
            <h2 className="text-2xl font-bold text-pink-600">{day.title}</h2>
          </div>
          <p className="text-gray-700 mb-8 italic border-l-4 border-pink-300 pl-4">{day.wish}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {day.mems.map((mem) => {
              const i = globalIndex++; 
              return (
                <div key={i} className="relative min-h-[300px] h-auto w-full">
                  <AnimatePresence>
                    {!revealedMemories[i] ? (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        onClick={() => toggleMemory(i)}
                        onMouseEnter={triggerHeartBurst} 
                        className="absolute inset-0 z-10 bg-white border-2 border-pink-100 rounded-xl shadow-sm cursor-pointer flex flex-col items-center justify-center"
                      >
                        <Gift size={32} className="text-pink-300 mb-2" />
                        <span className="text-pink-200 text-sm font-medium">Click to unwrap</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 bg-white p-3 pb-10 shadow-xl border border-gray-100 flex flex-col items-center"
                      >
                        <div className="w-full h-44 bg-gray-50 overflow-hidden rounded-sm">
                          <img 
                            src={mem.url} 
                            alt="memory" 
                            className="w-full h-full object-contain"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Photo+Coming+Soon'; }}
                          />
                        </div>
                        <p className="mt-3 text-sm font-serif text-gray-600 italic text-center leading-tight">
                          {mem.caption}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>

    <hr className="border-pink-200 my-20 max-w-xs mx-auto" />

    {/* 3. FINAL VALENTINE'S DAY SECTION */}
    <div className="max-w-4xl mx-auto px-6">
      <h2 className="text-5xl font-black text-pink-600 text-center mb-16">Valentine's Day 💌</h2>
      
      {/* SECRET NOTE */}
      <div className="text-center mb-24">
        <h2 className="text-2xl font-bold text-pink-500 mb-8">A Secret Note For You 💌</h2>
        <div className="flex justify-center min-h-[160px]">
          <AnimatePresence mode="wait">
            {!isEnvelopeOpen ? (
              <motion.div 
                key="closed"
                onClick={() => setIsEnvelopeOpen(true)} 
                className="cursor-pointer bg-pink-400 w-64 h-40 rounded-lg shadow-xl flex items-center justify-center border-4 border-white hover:bg-pink-500 transition-colors"
              >
                <Mail size={64} className="text-white" />
              </motion.div>
            ) : (
              <motion.div 
                key="open"
                initial={{ scale: 0 }} animate={{ scale: 1 }} 
                className="bg-white p-8 rounded-lg shadow-2xl border-t-8 border-pink-400 max-w-md relative"
              >
                <button onClick={() => setIsEnvelopeOpen(false)} className="absolute top-2 right-2 text-pink-300">✕</button>
                <p className="text-lg italic text-gray-700 leading-relaxed">
                  "Every moment with you feels like a dream. You're my favorite person in every universe. Happy Valentine's Day! ❤️"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* RE-ADDED: MAIN MEMORY BOARD (THE BIG PHOTOS) */}
      <h2 className="text-3xl font-bold text-pink-600 text-center mb-12">Our Memory Board 📸</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        {memories.map((mem, memIndex) => {
          const i = globalIndex++; // Continuing the count
          return (
            <div key={i} className="relative h-80 w-full">
              <AnimatePresence>
                {!revealedMemories[i] ? (
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                    onClick={() => toggleMemory(i)}
                    className="absolute inset-0 z-10 bg-white border-2 border-pink-100 rounded-lg shadow-lg cursor-pointer flex flex-col items-center justify-center"
                  >
                    <Gift size={48} className="text-pink-400 mb-2" />
                    <span className="text-pink-300 font-medium">Click to unwrap</span>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: i % 2 === 0 ? -5 : 5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-white p-4 pb-12 shadow-2xl border-[1px] border-gray-200 flex flex-col items-center"
                  >
                    <div className="w-full h-56 bg-gray-100 overflow-hidden shadow-inner border border-gray-100">
                      <img 
                        src={mem.url} 
                        alt="memory" 
                        className="w-full h-full object-contain"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Check+Public+Folder'; }}
                      />
                    </div>
                    <p className="mt-4 text-lg font-serif text-gray-600 italic text-center">
                      {mem.caption}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* VIRTUAL DATE IDEAS */}
      <div className="max-w-md mx-auto mb-20">
        <h3 className="text-2xl font-bold text-center mb-8 text-pink-600">Our Virtual Date Ideas 📱</h3>
        <div className="space-y-4">
          {[
            { icon: <Tv size={18}/>, text: "Netflix party + video call (I'll let you pick)" },
            { icon: <Utensils size={18}/>, text: "Order the same food & judge each other's habits" },
            { icon: <Moon size={18}/>, text: "Late night talks that turn into sleeping together" },
            { icon: <Music size={18}/>, text: "Playlist exchange & argue about music taste" },
            { icon: <Camera size={18}/>, text: "Send me your selfies so I can simp shamelessly" },
            { icon: <Gamepad size={18}/>, text: "Play games together & watch you destroy me" },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
              className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4 border-l-4 border-pink-400"
            >
              <span className="text-pink-500">{item.icon}</span>
              <p className="text-sm font-medium text-gray-700">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    <footer className="text-center py-12 opacity-60">
      <p className="flex items-center justify-center gap-2">
        Made with <Heart size={16} fill="red" color="red"/> just for you
      </p>
    </footer>
  </div>
);
};

export default ValentineSite;






 // 3. MAIN CONTENT
//   return (
//     <div className="min-h-screen bg-[#fff0f3] text-pink-900 font-sans pb-20 relative overflow-hidden">
      
//       {/* SUCCESS MESSAGE SECTION */}
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }} 
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-md mx-auto pt-10 px-6 text-center mb-16"
//       >
//         <h2 className="text-3xl font-bold text-pink-500 mb-2">Good choice babu 🥳</h2>
//         <p className="text-sm text-gray-600 mb-6 px-4">You just unlocked unlimited hugs, kisses, and cuddles (redeemable very soon I promise)</p>
        
//         <div className="flex justify-center gap-4 mb-6">
//             <img src="" alt="cats" className="w-24 h-24 rounded-lg shadow-md" />
//             <img src="" alt="cats" className="w-24 h-24 rounded-lg shadow-md" />
//         </div>

//         <h3 className="text-xl font-bold text-pink-600 mb-4">Now you're stuck with me forever ∞</h3>
        
//         <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-inner border border-pink-100 text-left">
//           <p className="font-bold text-gray-800 mb-3 text-center">📜 THE OFFICIAL CONTRACT</p>
//           <ul className="space-y-2 text-sm text-gray-700">
//             <li className="flex items-center gap-2">❌ No take-backs allowed</li>
//             <li className="flex items-center gap-2">❌ You're legally mine now (I checked)</li>
//             <li className="flex items-center gap-2">❌ Every "no" from now on = 10 extra kisses</li>
//             <li className="flex items-center gap-2">✅ Stuck with your favorite person FOREVER ❤️</li>
//           </ul>
//         </div>
//       </motion.div>

//       {/* VIRTUAL DATE IDEAS */}
//       <div className="max-w-md mx-auto px-6 mb-20">
//         <h2 className="text-2xl font-bold text-center mb-6 text-pink-600">Our Virtual Date Ideas 📱</h2>
//         <div className="space-y-3">
//           {[
//             { icon: <Tv size={18}/>, text: "Netflix party + video call (I'll let you pick... maybe)" },
//             { icon: <Utensils size={18}/>, text: "Order the same food & judge each other's habits" },
//             { icon: <Moon size={18}/>, text: "Late night talks that turn into sleeping together" },
//             { icon: <Music size={18}/>, text: "Playlist exchange & argue about music taste" },
//             { icon: <Camera size={18}/>, text: "Send me your selfies so I can simp shamelessly" },
//             { icon: <Gamepad size={18}/>, text: "Play games together & watch you destroy me" },
//             { icon: <Coffee size={18}/>, text: "Virtual coffee dates where we pretend we're fancy" },
//           ].map((item, i) => (
//             <motion.div 
//               initial={{ x: -20, opacity: 0 }} 
//               whileInView={{ x: 0, opacity: 1 }} 
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.1 }}
//               key={i} 
//               className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4 border-l-4 border-pink-400"
//             >
//               <span className="text-pink-500">{item.icon}</span>
//               <p className="text-sm font-medium text-gray-700">{item.text}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       <hr className="border-pink-200 my-16 max-w-xs mx-auto" />

//       {/* ORIGINAL CUSTOM CONTENT: SECRET NOTE & MEMORY BOARD */}
//       <div className="max-w-4xl mx-auto px-6">
//         <div className="text-center mb-20">
//           <h2 className="text-3xl font-bold text-pink-600 mb-8">A Secret Note For You 💌</h2>
//           <div className="flex justify-center min-h-[160px]">
//             <AnimatePresence mode="wait">
//               {!isEnvelopeOpen ? (
//                 <motion.div 
//                   key="closed"
//                   onClick={() => setIsEnvelopeOpen(true)} 
//                   className="cursor-pointer bg-pink-400 w-64 h-40 rounded-lg shadow-xl flex items-center justify-center border-4 border-white hover:bg-pink-500 transition-colors"
//                 >
//                   <Mail size={64} className="text-white" />
//                 </motion.div>
//               ) : (
//                 <motion.div 
//                   key="open"
//                   initial={{ scale: 0 }} 
//                   animate={{ scale: 1 }} 
//                   className="bg-white p-8 rounded-lg shadow-2xl border-t-8 border-pink-400 max-w-md relative"
//                 >
//                   <button onClick={() => setIsEnvelopeOpen(false)} className="absolute top-2 right-2 text-pink-300">✕</button>
//                   <p className="text-lg italic text-gray-700">"Every moment with you feels like a dream. Happy Valentine's Day! ❤️"</p>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>

//         <h2 className="text-3xl font-bold text-pink-600 text-center mb-12">Our Memory Board 📸</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//           {memories.map((mem, i) => (
//             <div key={i} className="relative h-80 w-full">
//               <AnimatePresence>
//                 {!revealedMemories[i] ? (
//                   <motion.div
//                     whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
//                     onClick={() => toggleMemory(i)}
//                     className="absolute inset-0 z-10 bg-white border-2 border-pink-100 rounded-lg shadow-lg cursor-pointer flex flex-col items-center justify-center"
//                   >
//                     <Gift size={48} className="text-pink-400 mb-2" />
//                     <span className="text-pink-300 font-medium">Click to unwrap</span>
//                   </motion.div>
//                 ) : (
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.8, rotate: i % 2 === 0 ? -5 : 5 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="absolute inset-0 bg-white p-4 pb-12 shadow-2xl border-[1px] border-gray-200 flex flex-col items-center"
//                     style={{ transform: `rotate(${i % 2 === 0 ? -3 : 3}deg)` }}
//                   >
//                     <div className="w-full h-56 bg-gray-100 overflow-hidden shadow-inner border border-gray-100">
//                       <img 
//                         src={mem.url} 
//                         alt="memory" 
//                         className="w-full h-full object-cover"
//                         onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Check+Public+Folder'; }}
//                       />
//                     </div>
//                     <p className="mt-4 text-lg font-serif text-gray-600 italic leading-tight text-center">
//                       {mem.caption}
//                     </p>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           ))}
//         </div>
//       </div>

//       <footer className="text-center py-12 opacity-60">
//         <p className="flex items-center justify-center gap-2">
//           Made with <Heart size={16} fill="red" color="red"/> just for you
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default ValentineSite;
//------------------------------------------------------------
// return (
//   <div className="min-h-screen bg-[#fff0f3] text-pink-900 font-sans pb-20 relative overflow-x-hidden">
    
//     {/* 1. SUCCESS HEADER */}
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//       className="max-w-md mx-auto pt-10 px-6 text-center mb-16"
//     >
//       <h2 className="text-4xl font-bold text-pink-500 mb-2">Good choice babu 🥳</h2>
//       <p className="text-sm text-gray-600 mb-6 px-4 italic">You just unlocked the full Valentine's Week experience!</p>
      
//       <div className="flex justify-center gap-4 mb-6">
//           <img src="/cats1.gif" alt="cats" className="w-24 h-24 rounded-lg shadow-md border-2 border-white" />
//           <img src="/cats2.gif" alt="cats" className="w-24 h-24 rounded-lg shadow-md border-2 border-white" />
//       </div>
//       <h3 className="text-xl font-bold text-pink-600">Now you're stuck with me forever ∞</h3>
//     </motion.div>

//     {/* 2. THE CHRONOLOGICAL VALENTINE'S WEEK */}
//     <div className="max-w-4xl mx-auto px-6 space-y-20">
//       {schedule.map((day, dayIdx) => (
//         <div key={dayIdx} className="relative">
//           <div className="flex items-center gap-4 mb-4">
//             <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">{day.date}</span>
//             <h2 className="text-2xl font-bold text-pink-600">{day.title}</h2>
//           </div>
//           <p className="text-gray-700 mb-8 italic border-l-4 border-pink-300 pl-4">{day.wish}</p>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {day.mems.map((mem) => {
//               const i = globalIndex++; // Increment global index for unique state tracking
//               return (
//                 <div key={i} className="relative h-64 w-full">
//                   <AnimatePresence>
//                     {!revealedMemories[i] ? (
//                       <motion.div
//                         whileHover={{ scale: 1.02 }}
//                         onClick={() => toggleMemory(i)}
//                         className="absolute inset-0 z-10 bg-white border-2 border-pink-100 rounded-xl shadow-sm cursor-pointer flex flex-col items-center justify-center"
//                       >
//                         <Gift size={32} className="text-pink-300 mb-2" />
//                         <span className="text-pink-200 text-sm font-medium">Click to unwrap</span>
//                       </motion.div>
//                     ) : (
//                       <motion.div
//                         initial={{ opacity: 0, scale: 0.9, rotate: i % 2 === 0 ? -2 : 2 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         className="absolute inset-0 bg-white p-3 pb-10 shadow-xl border border-gray-100 flex flex-col items-center"
//                       >
//                         <div className="w-full h-44 bg-gray-50 overflow-hidden rounded-sm">
//                           <img 
//                             src={mem.url} 
//                             alt="memory" 
//                             className="w-full h-full object-cover"
//                             onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Check+Public+Folder'; }}
//                           />
//                         </div>
//                         <p className="mt-3 text-sm font-serif text-gray-600 italic text-center">
//                           {mem.caption}
//                         </p>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       ))}
//     </div>

//     <hr className="border-pink-200 my-20 max-w-xs mx-auto" />

//     {/* 3. FINAL VALENTINE'S DAY SECTION */}
//     <div className="max-w-4xl mx-auto px-6">
//       <h2 className="text-4xl font-black text-pink-600 text-center mb-12">Valentine's Day 💌</h2>
      
//       {/* VIRTUAL DATE IDEAS */}
//       <div className="max-w-md mx-auto mb-20">
//         <h3 className="text-xl font-bold text-center mb-6 text-pink-500">Our Date Ideas 📱</h3>
//         <div className="space-y-3">
//           {[
//             { icon: <Tv size={18}/>, text: "Netflix party + video call" },
//             { icon: <Utensils size={18}/>, text: "Order the same food & judge it" },
//             { icon: <Moon size={18}/>, text: "Late night talks until we sleep" },
//             { icon: <Music size={18}/>, text: "Playlist exchange & music debate" },
//           ].map((item, i) => (
//             <div key={i} className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4 border-l-4 border-pink-400">
//               <span className="text-pink-500">{item.icon}</span>
//               <p className="text-sm font-medium text-gray-700">{item.text}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* SECRET NOTE */}
//       <div className="text-center mb-20">
//         <h2 className="text-2xl font-bold text-pink-600 mb-8">A Secret Note For You 💌</h2>
//         <div className="flex justify-center min-h-[160px]">
//           <AnimatePresence mode="wait">
//             {!isEnvelopeOpen ? (
//               <motion.div 
//                 key="closed"
//                 onClick={() => setIsEnvelopeOpen(true)} 
//                 className="cursor-pointer bg-pink-400 w-64 h-40 rounded-lg shadow-xl flex items-center justify-center border-4 border-white hover:bg-pink-500"
//               >
//                 <Mail size={64} className="text-white" />
//               </motion.div>
//             ) : (
//               <motion.div 
//                 key="open"
//                 initial={{ scale: 0 }} animate={{ scale: 1 }} 
//                 className="bg-white p-8 rounded-lg shadow-2xl border-t-8 border-pink-400 max-w-md relative"
//               >
//                 <button onClick={() => setIsEnvelopeOpen(false)} className="absolute top-2 right-2 text-pink-300">✕</button>
//                 <p className="text-lg italic text-gray-700">"Every moment with you feels like a dream. Happy Valentine's Day! ❤️"</p>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>

//     <footer className="text-center py-12 opacity-60">
//       <p className="flex items-center justify-center gap-2">
//         Made with <Heart size={16} fill="red" color="red"/> just for you
//       </p>
//     </footer>
//   </div>
// );
// };

// export default ValentineSite;
